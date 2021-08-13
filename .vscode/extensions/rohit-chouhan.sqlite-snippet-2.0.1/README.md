<p align="center">
<img width="250" src="https://media.charlesleifer.com/blog/photos/sqlite-and-python.png"><br>
Simle Easy MySQL + SQLite Snippet for  Python, Developed by <a href="https://rohitchouhan.com">Rohit Chouhan</a>
</p>

### For SQLite Connection
| Prefix   |Description   |
| ------------ | ------------ |
|  sl-import | import sqlite3   |
|  sl-createConnection, sl-createDb | create connection code   |

### For MySQL Connection
| Prefix   |Description   |
| ------------ | ------------ |
|  sql-import | import mysql.connector      |
|  sql-createConnection | create MySQL connection code   |
|  sql-createDBConnection | create MySQL connection with Database   |

### For Both
| Prefix   |Description   |
| ------------ | ------------ |
|  sl-select | retrive data code   |
|  sl-selectAll | retrive all data code   |
|  sl-insert | insert data code   |
|  sl-update | update data code   |
|  sl-updateAll | update all data code   |
|  sl-delete | delete data code   |
|  sl-deleteAll |delete all data code   |

#### - Example
```python
#input
	sl-select
	
#output
	c = conn.cursor()
	c.execute("SELECT * FROM table WHERE column='value'")
	rows = c.fetchall()
	for row in rows:
		print(row)
```
