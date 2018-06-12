// @flow

const range = require("lodash/range");

/**
 * Represents a two-dimensional array of data.
 *
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
   * @param {(x: number, y: number) => ?T} [generator] This function is used to populate table during initialization.
   */
  constructor(width: number, height: number, generator?: (x: number, y: number) => ?T) {
    this._width = width;
    this._height = height;
    this._rows = range(0, height).map(y => range(0, width).map(x => (generator ? generator(x, y) : null)));
  }

  /**
   * Horizontal size of the array
   *
   * @readonly
   * @type {number}
   */
  get width(): number {
    return this._width;
  }

  /**
   * Vertical size of the array.
   *
   * @readonly
   * @type {number}
   */
  get height(): number {
    return this._height;
  }

  /**
   * Returns table data organized by rows.
   *
   * @readonly
   * @type {Array<Array<?T>>}
   */
  get rows(): Array<Array<?T>> {
    return this._rows;
  }

  /**
   * Returns table data organized by columns.
   *
   * @readonly
   * @type {Array<Array<?T>>}
   */
  get cols(): Array<Array<?T>> {
    return range(0, this._width).map(x => this.col(x));
  }

  /**
   * Sets a value at given coordinates.
   *
   * If one of the coordinates equals null, value will be set for the whole row/column.
   *
   * @param {number} x X index.
   * @param {number} y Y index.
   * @param {?T} value Value to be set.
   */
  set(x: ?number, y: ?number, value: ?T): void {
    if (x != null && y != null) {
      this._rows[y][x] = value;
    } else if (x == null && y != null) {
      range(0, this.width).forEach(x => this.set(x, y, value));
    } else if (x != null && y == null) {
      range(0, this.height).forEach(y => this.set(x, y, value));
    } else {
      throw new Error("Invalid arguments, at least one coordinate is required.");
    }
  }

  /**
   * Returns a specific row.
   *
   * @param {number} y Index of a row to be returned.
   */
  row(y: number): Array<?T> {
    return this._rows[y];
  }

  /**
   * Returns a specific column.
   *
   * @param {number} x Index of a column to be returned.
   */
  col(x: number): Array<?T> {
    return this._rows.map(row => row[x]);
  }

  /**
   * Creates new table using this table values.
   *
   * @template U Type of data that will be stored by new table.
   * @param {(value: ?T, x: number, y: number, table: Table<T>) => U} callbackfn This function is used to populate new table using current table values.
   */
  map<U>(callbackfn: (value: ?T, x: number, y: number, table: Table<T>) => U): Table<U> {
    return new Table(this._width, this._height, (x, y) => callbackfn(this.rows[y][x], x, y, this));
  }

  /**
   * Returns a string representation of this table.
   */
  toString(): string {
    const widths = [];
    const texts = this.map((value, x, y, table) => {
      let text = new String(value).toString();
      if (!widths[x]) widths[x] = Math.max(...table.cols[x].map(value => new String(value).length));
      return text + range(0, widths[x] - text.length).reduce(acc => acc + " ", "");
    });
    return `\n${texts.rows.map(row => row.join(" | ")).join("\n")}\n`;
  }
}

module.exports = Table;
