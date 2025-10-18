// sslcommerz.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Booking, PaymentTransaction, User } = require('./models'); // your mongoose models
const { SSL_STORE_ID, SSL_STORE_PASS, SSL_BASE_URL, SERVER_URL } = process.env;

// 1) Create booking and initiate SSL session
router.post('/labtest/create-and-pay', async (req, res) => {
  const { userId, labTestId, appointmentDate, ...addr } = req.body;
  // create booking (transactional if needed)
  const booking = await Booking.create({
    patientId: userId,
    labTestId,
    appointmentDate,
    paymentStatus: 'unpaid',
    paymentTransactionId: null,
    finalAmount: /* load test price */,
    status: 'pending'
  });

  // payload for create_session
  const payload = {
    store_id: SSL_STORE_ID,
    store_passwd: SSL_STORE_PASS,
    total_amount: booking.finalAmount,
    currency: 'BDT',
    tran_id: booking._id.toString(), // Unique
    success_url: `${SERVER_URL}/ssl/success`,
    fail_url: `${SERVER_URL}/ssl/fail`,
    cancel_url: `${SERVER_URL}/ssl/cancel`,
    ipn_url: `${SERVER_URL}/ssl/ipn`,
    cus_name: req.user?.name || 'unknown',
    cus_email: req.user?.email || 'no-reply@example.com',
    // pass any custom fields as product_profile/product_name or optional values
    // SSLCommerz doesn't have a free-form JSON metadata; include what you can (e.g. value_a..value_f)
    value_a: JSON.stringify({ referenceFor: 'LabTestBooking', user: req.user }),
  };

  try {
    const resp = await axios.post(`${SSL_BASE_URL}/gwprocess/v4/api.php?gw_action=create_session`, payload, { timeout: 10000 });
    // resp.data.GatewayPageURL is the checkout URL
    // Save session info for later (optional)
    booking.paymentSession = resp.data; // store raw session
    await booking.save();

    return res.json({ checkoutUrl: resp.data.GatewayPageURL });
  } catch (err) {
    console.error('SSL create session error', err.response?.data || err.message);
    return res.status(500).json({ error: 'create session failed' });
  }
});

// 2) IPN handler (SSL -> your server)
router.post('/ssl/ipn', express.urlencoded({ extended: true }), async (req, res) => {
  // IMPORTANT: ipn will be x-www-form-urlencoded
  console.log('SSL IPN received', req.body);
  const ipn = req.body;
  const tranId = ipn.tran_id;  // your booking id
  const val_id = ipn.val_id;   // used for validation API
  try {
    // Call Order Validation API (server-to-server)
    const params = {
      val_id,
      store_id: SSL_STORE_ID,
      store_passwd: SSL_STORE_PASS,
      format: 'json',
    };
    const validateResp = await axios.post(`${SSL_BASE_URL}/validator/api/validationserverAPI.php`, null, { params, timeout: 10000 });
    const data = validateResp.data;
    // data.status can be VALID / FAILED / CANCELLED
    if (data.status === 'VALID' || data.status === 'VALIDATED') {
      // idempotency: check paymentIntent or val_id or tran_id
      const existing = await PaymentTransaction.findOne({ gatewayResponse: { 'val_id': val_id } });
      if (existing) {
        console.log('Payment already processed', val_id);
        return res.status(200).send('OK');
      }

      // create PaymentTransaction
      const booking = await Booking.findById(tranId);
      if (!booking) {
        console.error('Booking not found for tran', tranId);
        // respond 200 to stop retries, or 400 to let gateway retry depending on your policy
        return res.status(400).send('Booking not found');
      }

      const pgTxn = await PaymentTransaction.create({
        userId: booking.patientId,
        referenceFor: 'LabTestBooking',
        referenceId: booking._id,
        paymentGateway: 'sslcommerz',
        transactionId: data.tran_id || ipn.tran_id, // gateway tran id
        paymentIntent: val_id,
        amount: data.amount || ipn.amount,
        currency: data.currency || ipn.currency,
        paymentStatus: 'completed',
        gatewayResponse: data,
      });

      // update booking
      booking.paymentStatus = 'paid';
      booking.paymentTransactionId = pgTxn._id;
      booking.status = 'confirmed';
      await booking.save();

      // ledger entries, notifications, etc...
      console.log('Payment validated & booking updated', booking._id);
      return res.status(200).send('OK');
    } else {
      console.warn('Validation failed for ipn', data);
      return res.status(400).send('Invalid');
    }
  } catch (err) {
    console.error('validation/api error', err.response?.data || err.message);
    return res.status(500).send('Error');
  }
});
module.exports = router;
