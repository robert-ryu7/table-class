// @flow

const indexes = require("./utils/indexes");

/**
 * Represents a two-dimensional array of data.
 *
 * @class Table
 * @template T Type of data that will be stored by this table.
 */
class Table<T> {
  _width: number;
  _height: number;
  _rows: Array<Array<?T>>;

  /**
   * Creates an instance of Table.
   * @param {number} width Horizontal size of the array.
   * @param {number} height Vertical size of the array.
   * @param {(x: number, y: number) => ?T} [callbackfn] This function is used to populate table during initialization.
   * @memberof Table
   */
  constructor(width: number, height: number, callbackfn?: (x: number, y: number) => ?T) {
    this._width = width;
    this._height = height;
    this._rows = indexes(height).map(y => indexes(width).map(x => (callbackfn ? callbackfn(x, y) : null)));
  }

  /**
   * Horizontal size of the array
   *
   * @readonly
   * @type {number}
   * @memberof Table
   */
  get width(): number {
    return this._width;
  }

  /**
   * Vertical size of the array.
   *
   * @readonly
   * @type {number}
   * @memberof Table
   */
  get height(): number {
    return this._height;
  }

  /**
   * Table data organized by rows.
   *
   * @readonly
   * @type {Array<Array<?T>>}
   * @memberof Table
   */
  get rows(): Array<Array<?T>> {
    return this._rows;
  }

  /**
   * Table data organized by columns.
   *
   * @readonly
   * @type {Array<Array<?T>>}
   * @memberof Table
   */
  get cols(): Array<Array<?T>> {
    return indexes(this._width).map(x => this.col(x));
  }

  /**
   * Sets a value at given coordinates.
   *
   * If one of the coordinates equals null, value will be set for the whole row/column.
   *
   * @param {?number} x X index.
   * @param {?number} y Y index.
   * @param {?T} value Value to be set.
   * @returns {Table<T>} This table.
   * @memberof Table
   */
  set(x: ?number, y: ?number, value: ?T): Table<T> {
    if (x != null && y != null) {
      this._rows[y][x] = value;
    } else if (x == null && y != null) {
      indexes(this.width).forEach(x => this.set(x, y, value));
    } else if (x != null && y == null) {
      indexes(this.height).forEach(y => this.set(x, y, value));
    } else {
      throw new Error("Invalid arguments, at least one coordinate is required.");
    }
    return this;
  }

  /**
   * Returns value at given coordinates.
   *
   * @param {number} x X index.
   * @param {number} y Y index.
   * @returns {?T} Value at given coordinates.
   * @memberof Table
   */
  get(x: number, y: number): ?T {
    return this._rows[y][x];
  }

  /**
   * Returns a specific row.
   *
   * @param {number} y Index of a row to be returned.
   * @returns {Array<?T>} Row of data.
   * @memberof Table
   */
  row(y: number): Array<?T> {
    return this._rows[y];
  }

  /**
   * Returns a specific column.
   *
   * @param {number} x Index of a column to be returned.
   * @returns {Array<?T>} Column of data.
   * @memberof Table
   */
  col(x: number): Array<?T> {
    return this._rows.map(row => row[x]);
  }

  /**
   * Creates new table using this table values.
   *
   * @template U Type of data that will be stored by new table.
   * @param {(value: ?T, x: number, y: number, table: Table<T>) => ?U} callbackfn This function is used to populate new table using current table values.
   * @returns {Table<U>} New table.
   * @memberof Table
   */
  map<U>(callbackfn: (value: ?T, x: number, y: number, table: Table<T>) => ?U): Table<U> {
    return new Table(this._width, this._height, (x, y) => callbackfn(this.rows[y][x], x, y, this));
  }

  /**
   * Calls the specified callback function for all table values and returns accumulation result.
   *
   * @template U Type of accumulation result.
   * @param {(previousValue: U, currentValue: ?T, currentX: number, currentY: number, table: Table<T>) => U} callbackfn The reduce method calls this function one time for each value of the table.
   * @param {U} initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a table value.
   * @returns {U} Accumulation result.
   * @memberof Table
   */
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: ?T, currentX: number, currentY: number, table: Table<T>) => U,
    initialValue: U
  ): U {
    let acc = initialValue;
    this.forEach((value, x, y) => {
      acc = callbackfn(acc, value, x, y, this);
    });
    return acc;
  }

  /**
   * Performs the specified action for each element in a table.
   *
   * @param {(value: ?T, x: number, y: number, table: Table<T>) => void} callbackfn Function called one time for each element in the table.
   * @param {*} [thisArg] An object to which the this keyword can refer in the callbackfn function.
   * @memberof Table
   */
  forEach(callbackfn: (value: ?T, x: number, y: number, table: Table<T>) => void, thisArg?: any): void {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        callbackfn.call(thisArg, this._rows[y][x], x, y, this);
      }
    }
  }

  /**
   * Returns a string representation of this table.
   *
   * @returns {string} String representation of table.
   * @memberof Table
   */
  toString(): string {
    const widths = [];
    const texts = this.map((value, x, y, table) => {
      let text = new String(value).toString();
      if (!widths[x]) widths[x] = Math.max(...table.cols[x].map(value => new String(value).length));
      return text + indexes(widths[x] - text.length).reduce(acc => acc + " ", "");
    });
    return `\n${texts.rows.map(row => row.join(" | ")).join("\n")}\n`;
  }

  /**
   * Rotates table clockwise.
   *
   * @returns {Table<T>} New table.
   * @memberof Table
   */
  cw(): Table<T> {
    return new Table(this._height, this._width, (x, y) => this.get(y, this._height - 1 - x));
  }

  /**
   * Rotates table counterclockwise.
   *
   * @returns {Table<T>} New table.
   * @memberof Table
   */
  ccw(): Table<T> {
    return new Table(this._height, this._width, (x, y) => this.get(this._width - 1 - y, x));
  }

  /**
   * Flips table horizontally.
   *
   * @returns {Table<T>} New table.
   * @memberof Table
   */
  flipX(): Table<T> {
    return new Table(this._width, this._height, (x, y) => this.get(this._width - 1 - x, y));
  }

  /**
   * Flips table vertically.
   *
   * @returns {Table<T>} New table.
   * @memberof Table
   */
  flipY(): Table<T> {
    return new Table(this._width, this._height, (x, y) => this.get(x, this._height - 1 - y));
  }

  /**
   * Returns a new table populated with values from given array.
   *
   * It handles variable rows length by setting null for missing values.
   *
   * @static
   * @template U Type of data that will be stored by new table.
   * @param {Array<Array<?U>>} rows Table data organized by rows.
   * @returns {Table<U>} New table with given values.
   * @memberof Table
   */
  static fromRows<U>(rows: Array<Array<?U>>): Table<U> {
    const height = rows.length;
    const width = Math.max(...rows.map(row => row.length));
    return new Table(width, height, (x, y) => rows[y][x] || null);
  }

  /**
   * Returns a new table populated with values from given array.
   *
   * It handles variable columns length by setting null for missing values.
   *
   * @static
   * @template U Type of data that will be stored by new table.
   * @param {Array<Array<?U>>} cols Table data organized by columns.
   * @returns {Table<U>} New table with given values.
   * @memberof Table
   */
  static fromCols<U>(cols: Array<Array<?U>>): Table<U> {
    const width = cols.length;
    const height = Math.max(...cols.map(col => col.length));
    return new Table(width, height, (x, y) => cols[x][y] || null);
  }
}

module.exports = Table;
