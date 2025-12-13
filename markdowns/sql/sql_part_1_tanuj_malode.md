>#### create database
```sql
CREATE DATABASE <_dbName_>
```

>#### Remove database
```sql
DROP DATABASE <_dbName_>  [risky]
```

>#### To Use Created Database
```sql
Use <_dbName_>
```

>#### To Create Table
```sql
CREATE TABLE <_tableName_> ( 
    <_columnName_> <_dataType_> 
)

-- EX

CREATE TABLE bands(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE albums(
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL,
    release_year INT, 
    
    band_id INT NOT NULL [ NOT NULL is very important here ]
    PRIMARY KEY(id)
    FOREIGN KEY(band_id) REFERENCES bands(id)
    [ei table er foreign key konta sheta bolte hobe... band_id
    hocche ei table er foreign key. and what table reference..
    shetao bolte hobe ]
)

```

> change property of created table which is called alter table
```sql
ALTER TABLE <_tableName_> ADD <_colName_> <_dataType_>
```

> delete table / drop table
```sql
DROP TABLE <_tableName_>
```

> adding / insert data into a table
```sql
INSERT INTO <_tableName_> (
    <_columnName_>
) VALUES(
    '<_columnValue_>'
)

Another Way ----

INSERT INTO <_tableName_> ( <_columnName_> ) 
VALUES  ( '<_columnValue1_>' ) , ( '<_columnValue2_>' ) 
```

---
>#### Query
---

>
```sql
SELECT * FROM <_tableName_>

[return only 2 data]

SELECT * FROM <_tableName_> LIMIT <_limitValue_>

[get certain column]

SELECT <_columnName_> FROM <_tableName_> 

[rename column to make this easier to read]

SELECT <_columnName_> as <_differentColumnName_> FROM <_tableName_>   

```

---
>#### Where
---

```sql
SELECT 
```

>#### Order By
```sql

    select * from <_tableName_> ORDER BY <_columnName_>
    select * from <_tableName_> ORDER BY <_columnName_> DESC

    -- get unique 

    select DISTINCT(*) from <_tableName_> ORDER BY <_columnName_>

    -- for specific column
    select DISTINCT( <_columnName_> ) from <_tableName_> ORDER BY <_columnName_> 

```

>#### COUNT
```sql

    select COUNT(*) from <_tableName_>

    -- for specific field 

    select COUNT( <_columnName_> ) AS <_nameYouWantToShowAsColumnName_> from <_tableName_>

    --EX

    Question One : 
    
    Retrieve the top 10 unique airport codes(airport_code)
    from the airports_data table,
    ordered in descending order of their codes.
    --
    SELECT DISTINCT(airport_code) FROM airports_data ORDER BY airport_code DESC LIMIT 10 

    Question Two : 

    Count the total number of unique seat_no values in the seats table.
    --
    SELECT DISTINCT(COUNT(seat_no)) as num_seats FROM seats

```

>#### FILTER
```sql

    SELECT * FROM <_tableName_> WHERE <_columnName_> < 1000

    -- want to check between two values

    SELECT * FROM <_tableName_> WHERE <_columnName_> = 'arived' or <_columnName_> = 'delayed'  

    -- dont want NULL values
    SELECT * FROM <_tableName_> WHERE <_columnName_> IS NOT NULL

    -- between two number

    SELECT * FROM <_tableName_> WHERE <_columnName_> BETWEEN 10 AND 20
 
    -- check for specific values

    SELECT * FROM <_tableName_> WHERE <_columnName_> IN ('ValueOne', 'ValueTwo', 'ValueThree');

    --- we can cascade another operator here 

    SELECT * FROM <_tableName_> WHERE <_columnName_> IN ('ValueOne', 'ValueTwo', 'ValueThree') AND <_columnName2_>  < 100

    -- get those who starts with specific letter
    
    SELECT * FROM <_tableName_> WHERE <_columnName_> LIKE 'J%' -- anything after J and i dont care .. 
    SELECT * FROM <_tableName_> WHERE <_columnName_> LIKE '%J%' -- its just contains J 
    SELECT * FROM <_tableName_> WHERE <_columnName_> LIKE '__' -- any value which contains exact two letter
    SELECT * FROM <_tableName_> WHERE <_columnName_> LIKE 'B%__' -- start with B and after that any value which contains exact two letter  
    

    -------- solve problem 32:39 https://youtu.be/jdRt8Cw8l40?t=1959 

    --EX

    Question One : Retrieve flights that are departing from DME and arriving at LED

        SELECT * FROM <_tableName_> WHERE <_columnName_> = 'DME'  AND <_columnName2_> = 'LED' 

    Question Two : Find flights where the flight number starts with AA
        SELECT * FROM <_tableName_> WHERE <_columnName_> LIKE 'AA%'

    Question Three : List flights schedules to depart between "2017-08-13" and "2017-08-13"
        SELECT * FROM <_tableName_> WHERE <_columnName_> BETWEEN  "2017-08-13" and "2017-08-13"

    Question Four : Retrieve flights departing from any of the following airports "trt" , "wew" or "rer"

    Question Five : Find flights departing from DME with flight number containing 03 anywhere in the number 

```

> #### Aggregation  - some amount of calculation with in a particular column
```sql

    -- move to ticket flights table to perform some aggregation
    SELECT SUM(<_columnName_>) FROM <_tableName_> LIMIT 100  
    SELECT AVG(<_columnName_>) FROM <_tableName_> LIMIT 100  
    SELECT ROUND(AVG(<_columnName_>), 2) FROM <_tableName_> LIMIT 100  

    -- calculate min and max ticket price
    SELECT MIN(<_columnName_>) FROM <_tableName_> LIMIT 100 
    SELECT MAX(<_columnName_>) as <_newName_> FROM <_tableName_> LIMIT 100 


    --EX

    Question One : Find the average ticket price and the total revenue for tickets sold for
        flight ID 9907

        SELECT * FROM <_tableName_> WHERE <_columnName_> = 9907  
        SELECT AVG(<_columnName2_>), SUM(<_columnName2_>) FROM <_tableName_> WHERE <_columnName_> = 9907  


    Question Two : What is the total revenue, the lowest ticket price, and the number of
        tickets sold for fare conditions business

    SELECT SUM(<_columnName2_>), MIN(<_columnName2_>), COUNT(<_columnName2_>) FROM <_tableName_>
    WHERE <_columnName_> = 'Business'  


```

>####  GROUP BY  -- its part of aggregation -- group aggregation based on column
```sql

    -- for every fare condition .. we calculate total amount
    SELECT <_columnName_>, SUM(<_columnName2_>) from <_tableName_> GROUP BY <_columnName_> 
    
    -- how many flights for every fare condition
    SELECT <_columnName_>, COUNT(*) from <_tableName_> GROUP BY <_columnName_>


    --- GROUP BY is not only limited to one column .. we can also GROUP BY many column

    --for every flight_id and for every fare_condition we can perform some aggregation on the amount

    SELECT <_columnName_>, <_columnName2_>, COUNT(*) from <_tableName_> GROUP BY <_columnName_>,  <_columnName2_> 
    ORDER BY COUNT(*);

    --- i want to filter out the data.. after i group them .. WHERE is usually done before grouping ..
    --- after GROUPING as we have different set of data .. so we use HAVING .

    -- we want the count greater then 100

    SELECT <_columnName_>, <_columnName2_>, COUNT(*) from <_tableName_> GROUP BY <_columnName_>,  <_columnName2_> 
    HAVING COUNT(*) > 100 AND <_columnName2_> > 1000
    ORDER BY COUNT(*)

    --- having should before the ORDER BY


    --EX  .. from seats table

    Question One : How many seats are available for each fare condition on each aircraft ?

        SELECT * FROM <_tableName_>

        SELECT <_columnName_>, <_columnName2_>, COUNT(*) FROM <_tableName_> GROUP BY <_columnName_>, <_columnName2_>
        ORDER BY COUNT(*)

    Question Two : Find the total number of seats for each aircraft and identify the aircraft with the most seats.

        SELECT <_columnName_>, COUNT(*) FROM <_tableName_> 
        GROUP BY <_columnName_>
        ORDER BY COUNT(*) DESC LIMIT 1   


```

>#### Substring function  
```sql

    SELECT SUBSTRING(<_columnName_> FROM 2 FOR 4), <_columnName_> FROM <_tableName_> 

    https://youtu.be/jdRt8Cw8l40?t=3157
    
    52:37

```

>####
```sql


```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```

> 
```

```