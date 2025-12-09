> create database
```sql
CREATE DATABASE <_dbName_>
```

> Remove database
```sql
DROP DATABASE <_dbName_>  [risky]
```

> To Use Created Database
```sql
Use <_dbName_>
```

> To Create Table
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
> Query
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
> Where
---

```sql
SELECT 
```

> Order By
```sql

    select * from <_tableName_> ORDER BY <_columnName_>
    select * from <_tableName_> ORDER BY <_columnName_> DESC

    -- get unique 

    select DISTINCT(*) from <_tableName_> ORDER BY <_columnName_>

    -- for specific column
    select DISTINCT( <_columnName_> ) from <_tableName_> ORDER BY <_columnName_> 

```

> COUNT
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

> FILTER
```sql

    SELECT * FROM <_tableName_> WHERE <_columnName_> < 1000

    -- want to check between two values

    SELECT * FROM <_tableName_> WHERE <_columnName_> = 'arived' or <_columnName_> = 'delayed'  

    -- dont want NULL values
    SELECT * FROM <_tableName_> WHERE <_columnName_> IS NOT NULL

    - between two number

    SELECT * FROM <_tableName_> BETWEEN 10 AND 20
 

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