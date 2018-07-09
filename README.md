<a name="Table"></a>

## Table
Represents a two-dimensional array of data.

**Kind**: global class  
**Template**: T Type of data that will be stored by this table.  

* [Table](#Table)
    * [new Table(width, height, [callbackfn])](#new_Table_new)
    * _instance_
        * [.width](#Table+width) : <code>number</code>
        * [.height](#Table+height) : <code>number</code>
        * [.rows](#Table+rows) : <code>Array.&lt;Array.&lt;?T&gt;&gt;</code>
        * [.cols](#Table+cols) : <code>Array.&lt;Array.&lt;?T&gt;&gt;</code>
        * [.set(x, y, value)](#Table+set) ⇒ <code>Table.&lt;T&gt;</code>
        * [.get(x, y)](#Table+get) ⇒ <code>T</code>
        * [.row(y)](#Table+row) ⇒ <code>Array.&lt;?T&gt;</code>
        * [.col(x)](#Table+col) ⇒ <code>Array.&lt;?T&gt;</code>
        * [.map(callbackfn)](#Table+map) ⇒ <code>Table.&lt;U&gt;</code>
        * [.reduce(callbackfn, initialValue)](#Table+reduce) ⇒ <code>U</code>
        * [.forEach(callbackfn, [thisArg])](#Table+forEach)
        * [.toString()](#Table+toString) ⇒ <code>string</code>
        * [.cw()](#Table+cw) ⇒ <code>Table.&lt;T&gt;</code>
        * [.ccw()](#Table+ccw) ⇒ <code>Table.&lt;T&gt;</code>
        * [.flipX()](#Table+flipX) ⇒ <code>Table.&lt;T&gt;</code>
        * [.flipY()](#Table+flipY) ⇒ <code>Table.&lt;T&gt;</code>
    * _static_
        * [.fromRows(rows)](#Table.fromRows) ⇒ <code>Table.&lt;U&gt;</code>
        * [.fromCols(cols)](#Table.fromCols) ⇒ <code>Table.&lt;U&gt;</code>
    * _inner_
        * [~constructorCallback](#Table..constructorCallback) ⇒ <code>T</code>
        * [~mapCallback](#Table..mapCallback) ⇒ <code>U</code>
        * [~reduceCallback](#Table..reduceCallback) ⇒ <code>U</code>
        * [~forEachCallback](#Table..forEachCallback) : <code>function</code>

<a name="new_Table_new"></a>

### new Table(width, height, [callbackfn])
Creates an instance of Table.


| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | Horizontal size of the array. |
| height | <code>number</code> | Vertical size of the array. |
| [callbackfn] | [<code>constructorCallback</code>](#Table..constructorCallback) | This function is used to populate table during initialization. |

<a name="Table+width"></a>

### table.width : <code>number</code>
Horizontal size of the array

**Kind**: instance property of [<code>Table</code>](#Table)  
**Read only**: true  
<a name="Table+height"></a>

### table.height : <code>number</code>
Vertical size of the array.

**Kind**: instance property of [<code>Table</code>](#Table)  
**Read only**: true  
<a name="Table+rows"></a>

### table.rows : <code>Array.&lt;Array.&lt;?T&gt;&gt;</code>
Table data organized by rows.

**Kind**: instance property of [<code>Table</code>](#Table)  
**Read only**: true  
<a name="Table+cols"></a>

### table.cols : <code>Array.&lt;Array.&lt;?T&gt;&gt;</code>
Table data organized by columns.

**Kind**: instance property of [<code>Table</code>](#Table)  
**Read only**: true  
<a name="Table+set"></a>

### table.set(x, y, value) ⇒ <code>Table.&lt;T&gt;</code>
Sets a value at given coordinates.

If one of the coordinates equals null, value will be set for the whole row/column.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;T&gt;</code> - This table.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X index. |
| y | <code>number</code> | Y index. |
| value | <code>T</code> | Value to be set. |

<a name="Table+get"></a>

### table.get(x, y) ⇒ <code>T</code>
Returns value at given coordinates.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>T</code> - Value at given coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X index. |
| y | <code>number</code> | Y index. |

<a name="Table+row"></a>

### table.row(y) ⇒ <code>Array.&lt;?T&gt;</code>
Returns a specific row.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Array.&lt;?T&gt;</code> - Row of data.  

| Param | Type | Description |
| --- | --- | --- |
| y | <code>number</code> | Index of a row to be returned. |

<a name="Table+col"></a>

### table.col(x) ⇒ <code>Array.&lt;?T&gt;</code>
Returns a specific column.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Array.&lt;?T&gt;</code> - Column of data.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Index of a column to be returned. |

<a name="Table+map"></a>

### table.map(callbackfn) ⇒ <code>Table.&lt;U&gt;</code>
Creates new table using this table values.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;U&gt;</code> - New table.  
**Template**: U Type of data that will be stored by new table.  

| Param | Type | Description |
| --- | --- | --- |
| callbackfn | [<code>mapCallback</code>](#Table..mapCallback) | This function is used to populate new table using current table values. |

<a name="Table+reduce"></a>

### table.reduce(callbackfn, initialValue) ⇒ <code>U</code>
Calls the specified callback function for all table values and returns accumulation result.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>U</code> - Accumulation result.  
**Template**: U Type of accumulation result.  

| Param | Type | Description |
| --- | --- | --- |
| callbackfn | [<code>reduceCallback</code>](#Table..reduceCallback) | The reduce method calls this function one time for each value of the table. |
| initialValue | <code>U</code> | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a table value. |

<a name="Table+forEach"></a>

### table.forEach(callbackfn, [thisArg])
Performs the specified action for each element in a table.

**Kind**: instance method of [<code>Table</code>](#Table)  

| Param | Type | Description |
| --- | --- | --- |
| callbackfn | [<code>forEachCallback</code>](#Table..forEachCallback) | Function called one time for each element in the table. |
| [thisArg] | <code>\*</code> | An object to which the this keyword can refer in the callbackfn function. |

<a name="Table+toString"></a>

### table.toString() ⇒ <code>string</code>
Returns a string representation of this table.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>string</code> - String representation of table.  
<a name="Table+cw"></a>

### table.cw() ⇒ <code>Table.&lt;T&gt;</code>
Rotates table clockwise.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;T&gt;</code> - New table.  
<a name="Table+ccw"></a>

### table.ccw() ⇒ <code>Table.&lt;T&gt;</code>
Rotates table counterclockwise.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;T&gt;</code> - New table.  
<a name="Table+flipX"></a>

### table.flipX() ⇒ <code>Table.&lt;T&gt;</code>
Flips table horizontally.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;T&gt;</code> - New table.  
<a name="Table+flipY"></a>

### table.flipY() ⇒ <code>Table.&lt;T&gt;</code>
Flips table vertically.

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;T&gt;</code> - New table.  
<a name="Table.fromRows"></a>

### Table.fromRows(rows) ⇒ <code>Table.&lt;U&gt;</code>
Returns a new table populated with values from given array.

It handles variable rows length by setting null for missing values.

**Kind**: static method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;U&gt;</code> - New table with given values.  
**Template**: U Type of data that will be stored by new table.  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>Array.&lt;Array.&lt;?U&gt;&gt;</code> | Table data organized by rows. |

<a name="Table.fromCols"></a>

### Table.fromCols(cols) ⇒ <code>Table.&lt;U&gt;</code>
Returns a new table populated with values from given array.

It handles variable columns length by setting null for missing values.

**Kind**: static method of [<code>Table</code>](#Table)  
**Returns**: <code>Table.&lt;U&gt;</code> - New table with given values.  
**Template**: U Type of data that will be stored by new table.  

| Param | Type | Description |
| --- | --- | --- |
| cols | <code>Array.&lt;Array.&lt;?U&gt;&gt;</code> | Table data organized by columns. |

<a name="Table..constructorCallback"></a>

### Table~constructorCallback ⇒ <code>T</code>
**Kind**: inner typedef of [<code>Table</code>](#Table)  
**Returns**: <code>T</code> - Value for given coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate. |
| y | <code>number</code> | Y coordinate. |

<a name="Table..mapCallback"></a>

### Table~mapCallback ⇒ <code>U</code>
**Kind**: inner typedef of [<code>Table</code>](#Table)  
**Returns**: <code>U</code> - New value for given coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>T</code> | Current value at given coordinates. |
| x | <code>number</code> | X coordinate. |
| y | <code>number</code> | Y coordinate. |
| table | <code>Table.&lt;T&gt;</code> | Current table. |

<a name="Table..reduceCallback"></a>

### Table~reduceCallback ⇒ <code>U</code>
**Kind**: inner typedef of [<code>Table</code>](#Table)  
**Returns**: <code>U</code> - Accumulation result.  

| Param | Type | Description |
| --- | --- | --- |
| previousValue | <code>U</code> | Previous accumulation result. |
| currentValue | <code>T</code> | Value at given coordinates. |
| currentX | <code>number</code> | X coordinate. |
| currentY | <code>number</code> | Y coordinate. |
| table | <code>Table.&lt;T&gt;</code> | Current table. |

<a name="Table..forEachCallback"></a>

### Table~forEachCallback : <code>function</code>
**Kind**: inner typedef of [<code>Table</code>](#Table)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>T</code> | Value at given coordinates. |
| x | <code>number</code> | X coordinate. |
| y | <code>number</code> | Y coordinate. |
| table | <code>Table.&lt;T&gt;</code> | Current table. |

