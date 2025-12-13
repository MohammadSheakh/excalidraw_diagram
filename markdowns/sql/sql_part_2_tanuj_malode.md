
>#### Sql
---

#### Types of SQL joins

>#### Inner Join 
```sql
// Return only the records that have matching values in both tables.
---
SELECT <_tableOne_>.<_columnName_> , <_tableOne_>.<_columnName_>
FROM <_tableOne_> 
INNER JOIN <_tableTwo_>
ON <_tableOne_>.<_columnName_> = <_tableOne_>.<_columnName_>  

---
so we selecting from the <_tableOne_>
and we referencing from <_tableTwo_>

```

>#### Left Join or Left outer join
```sql

--- Returns all rows from the left table, and matching rows from the right table .. If no match exists, NULL is shows


SELECT <_tableOne_>.<_columnName_> , <_tableOne_>.<_columnName_>
FROM <_tableOne_> 
LEFT JOIN <_tableTwo_>
ON <_tableOne_>.<_columnName_> = <_tableOne_>.<_columnName_>  

```

>#### Full outer join
```sql

--- Returns all records from the both tables,maching where possible. If theres no match missing side shows NULL 


SELECT <_tableOne_>.<_columnName_> , <_tableOne_>.<_columnName_>
FROM <_tableOne_> 
FULL OUTER JOIN <_tableTwo_>
ON <_tableOne_>.<_columnName_> = <_tableOne_>.<_columnName_>  

```

```sql
we have
  ┌───────────── ticket_flights table ───┐
  │ id   
  │ ticket_no
  │ flight_id ------------------ FK
  │ fare_conditions
  │ amount
  └───────────────┘
  ┌───────────── flights table ───┐
  │ id   
  │ flight_id ----------------- PK
  │ flight_no
  │ scheduled_departure
  │ departure_airport
  │ arrival_airport
  │ status
  └───────────────┘
 
SELECT * FROM FLIGHTS f INNER JOIN TICKET_FLIGHTS tf
ON f.flight_id = tf.flight_id

-- if we want specific field

SELECT f.flight_no, tf.ticket_no, tf.amount 
FROM FLIGHTS f INNER JOIN TICKET_FLIGHTS tf
ON f.flight_id = tf.flight_id
--
SELECT f.flight_no, tf.ticket_no, tf.amount 
FROM FLIGHTS f 
LEFT JOIN TICKET_FLIGHTS tf
ON f.flight_id = tf.flight_id
WHERE tf.flight_id is null

-- find all flights that have tickets costing more than 80000

SELECT f.flight_no, tf.amount 
FROM flights f
INNER JOIN ticket_flights tf
ON f.flight_id = tf.flight_id
WHERE tf.amount > 80000


-- retrieve all airports and any flights departing from them

```
>#### SQL Union and sub queries https://youtu.be/IXbL5N9uKLY?t=1395
```sql

  ┌───────────── customers table ───┐
  │ customer_id   
  │ customer_name
  │ city 
  └───────────────┘
  ┌───────────── sales table ───┐
  │ sale_id   
  │ customer_id ----------------- PK
  │ amount
  │ sale_date
  │ city
  └───────────────┘

  --- UNION -> returning unique rows only (remove duplicates)

  SELECT <_columnName_> FROM <_tableName1_>
  UNION
  SELECT <_columnName_> FROM <_tableName2_>
  
  --- if you want to include duplicates .. use UNION ALL

  SELECT <_columnName_> FROM <_tableName1_>
  UNION ALL
  SELECT <_columnName_> FROM <_tableName2_>

   --EX  .. from flights table

    Question One :

    -- list both scheduled and actual departure time (including duplicates) for each flight

    SELECT flight_id, scheduled_departure AS flight_time, 'Scheduled' from flights
    UNION ALL
    SELECT flight_id, actual_departure AS flight_time, 'actual' from flights
  

```
>#### Subqueries in WHERE Clause
```sql

  query nested inside another query. when used in WHERE, it filters rows based on the result of 
  another query.


  Question One :

  -- find customers who made purchases above the average sale amount:

  SELECT customer_id FROM sales WHERE amount > (SELECT AVG(amount) FROM sales)

  ┌───────────── aircrafts table ───┐
  │ id   
  │ aircraft_code
  │ model
  │ range
  └───────────────┘
  ┌───────────── bookings table ───┐
  │ booking_id   
  │ book_ref
  │ book_date
  │ total_amount
  └───────────────┘
  ┌───────────── flights table ───┐
  │ flight_id   
  │ flight_id ----------------- PK
  │ flight_no
  │ scheduled_departure
  │ scheduled_arrival
  │ departure_airport
  │ arrival_airport
  │ status
  │ aircraft_code
  └───────────────┘
  Question Two :

  -- find flights that used the aircraft with the longest range

  SELECT flight_id, flight_no, aircraft_code FROM flights WHERE
  aircraft_code = (
    SELECT aircraft_code FROM aircraft_data ORDER BY range DESC LIMIT 1
  ) LIMIT 10

  Question Three :

  -- find tickets that belong to bookings with a total amount greater that 1000.

  SELECT ticket_no, passenger_name FROM tickets
  WHERE book_ref IN (
    SELECT book_ref FROM bookings WHERE total_amount > 1000
  )

```
>#### https://youtu.be/IXbL5N9uKLY?t=2436    40:37
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```
>####
```sql


```














