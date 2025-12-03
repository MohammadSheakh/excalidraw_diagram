
> Sql
---

#### Types of SQL joins

> Inner Join 
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

> Left Join or Left outer join
```sql

--- Returns all rows from the left table, and matching rows from the right table .. If no match exists, NULL is shows


SELECT <_tableOne_>.<_columnName_> , <_tableOne_>.<_columnName_>
FROM <_tableOne_> 
LEFT JOIN <_tableTwo_>
ON <_tableOne_>.<_columnName_> = <_tableOne_>.<_columnName_>  

```

> Full outer join
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















