const Table = require("./Table");

describe("Table", () => {
  it("respects given table dimensions when creating data structure", () => {
    const instance = new Table(8, 8);
    expect(instance.rows.length).toEqual(8);
    expect(instance.cols.length).toEqual(8);
  });

  it("has width property which returns width provided during initialization", () => {
    const instance = new Table(4, 16);
    expect(instance.width).toEqual(4);
  });

  it("has height property which returns height provided during initialization", () => {
    const instance = new Table(4, 16);
    expect(instance.height).toEqual(16);
  });

  it("has set method that allows us to set a value at given coordinates", () => {
    const instance = new Table(3, 3, () => "-");
    instance.set(1, 1, "X");
    const expectedResult = [["-", "-", "-"], ["-", "X", "-"], ["-", "-", "-"]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has set method that allows us to set a value at given row", () => {
    const instance = new Table(3, 3, () => "-");
    instance.set(null, 1, "X");
    const expectedResult = [["-", "-", "-"], ["X", "X", "X"], ["-", "-", "-"]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has set method which throws when there are no coordinates given", () => {
    const instance = new Table(3, 3);
    expect(() => instance.set(null, null, "X")).toThrow();
  });

  it("has set method that allows us to set a value at given column", () => {
    const instance = new Table(3, 3, () => "-");
    instance.set(1, null, "X");
    const expectedResult = [["-", "X", "-"], ["-", "X", "-"], ["-", "X", "-"]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has a map function which produces a new table with each value being a result of mapping function", () => {
    const instanceA = new Table(3, 3, (x, y) => x + 1);
    const instanceB = instanceA.map(value => value * value);
    const expectedResult = [[1, 4, 9], [1, 4, 9], [1, 4, 9]];
    expect(instanceB.rows).toEqual(expectedResult);
  });

  it("has a map function which provides cell value, cell coordinates, and current table as arguments", () => {
    const instanceA = new Table(3, 3, (x, y) => x + 1);
    const instanceB = instanceA.map((value, x, y) => ({ value, x, y }));
    const expectedResult = [
      [{ value: 1, x: 0, y: 0 }, { value: 2, x: 1, y: 0 }, { value: 3, x: 2, y: 0 }],
      [{ value: 1, x: 0, y: 1 }, { value: 2, x: 1, y: 1 }, { value: 3, x: 2, y: 1 }],
      [{ value: 1, x: 0, y: 2 }, { value: 2, x: 1, y: 2 }, { value: 3, x: 2, y: 2 }]
    ];
    expect(instanceB.rows).toEqual(expectedResult);
  });

  it("has cols property which returns data organized by columns", () => {
    const instance = new Table(3, 3, (x, y) => x + 1);
    const expectedResult = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has col method which returns a specific column", () => {
    const instance = new Table(3, 3, (x, y) => x + 1);
    expect(instance.col(1)).toEqual([2, 2, 2]);
  });

  it("has rows property which returns data organized by rows", () => {
    const instance = new Table(3, 3, (x, y) => x + 1);
    const expectedResult = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
    expect(instance.cols).toEqual(expectedResult);
  });

  it("has row method which returns a specific row", () => {
    const instance = new Table(3, 3, (x, y) => x + 1);
    expect(instance.row(1)).toEqual([1, 2, 3]);
  });

  it("uses a generator function provided as a third constructor argument", () => {
    const generator = (x, y) => x * y;
    const instance = new Table(3, 3, generator);
    const expectedResult = [[0, 0, 0], [0, 1, 2], [0, 2, 4]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has toString method which returns a string representing data in tabular format", () => {
    const generator = (x, y) => {
      let text = "";
      while (text.length < x + y + 1) text += ".";
      return text;
    };
    const instance = new Table(3, 3, generator);
    const expectedResult = [
      "\n",
      ".   | ..   | ...  ",
      "\n",
      "..  | ...  | .... ",
      "\n",
      "... | .... | .....",
      "\n"
    ].join("");
    expect(instance.toString()).toEqual(expectedResult);
  });

  it("has toString method which stringifies data when its type isn't a string", () => {
    const generator = (x, y) => {
      switch (y) {
        case 1:
          return {};
        default:
          return null;
      }
    };
    const instance = new Table(3, 3, generator);
    const expectedResult = [
      "\n",
      "null            | null            | null           ",
      "\n",
      "[object Object] | [object Object] | [object Object]",
      "\n",
      "null            | null            | null           ",
      "\n"
    ].join("");
    expect(instance.toString()).toEqual(expectedResult);
  });

  it("has get method which returns value at given coordinates", () => {
    const instance = new Table(3, 3, (x, y) => `${x}-${y}`);
    const expectedResult = "1-0";
    expect(instance.get(1, 0)).toEqual(expectedResult);
  });

  it("has reduce method which accumulates all table values using given callback function", () => {
    const instance = new Table(10, 20, () => 0.5);
    const expectedResult = 101;
    expect(instance.reduce((acc, value) => acc + value, 1)).toEqual(expectedResult);
  });

  it("has forEach method which calls given function for each table element", () => {
    const mockFn = jest.fn();
    const instance = new Table(3, 3, (x, y) => `${x}-${y}`);
    instance.forEach(mockFn);
    expect(mockFn.mock.calls.length).toBe(9);
  });

  it("has forEach methow which passes current value as well as coordinates to callback function", () => {
    const mockFn = jest.fn((value, x, y) => `${value}-${x}-${y}`);
    const instance = new Table(3, 3, (x, y) => x + y);
    const expectedResult = ["0-0-0", "1-1-0", "2-2-0", "1-0-1", "2-1-1", "3-2-1", "2-0-2", "3-1-2", "4-2-2"];
    instance.forEach(mockFn);
    expect(mockFn.mock.results.map(result => result.value)).toEqual(expectedResult);
  });

  it("has forEach method which accepts second argument used for this value in callback function", () => {
    const instance = new Table(3, 3, (x, y) => "-");
    const thisArg = { a: 1, b: 2, c: 3 };
    const mockFn = jest.fn(function() {
      return this === thisArg;
    });
    const expectedResult = [true, true, true, true, true, true, true, true, true];
    instance.forEach(mockFn, thisArg);
    expect(mockFn.mock.results.map(result => result.value)).toEqual(expectedResult);
  });

  it("has fromRows method which creates table out of rows array", () => {
    const rows = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has fromRows method which handles variable rows length by setting null for missing values", () => {
    const rows = [[1, 2], [1, 2, 3], [1, 2]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[1, 2, null], [1, 2, 3], [1, 2, null]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has fromCols method which creates table out of columns array", () => {
    const cols = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const instance = Table.fromCols(cols);
    const expectedResult = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has fromCols method which handles variable columns length by setting null for missing values", () => {
    const cols = [[1, 2], [1, 2, 3], [1, 2]];
    const instance = Table.fromCols(cols);
    const expectedResult = [[1, 1, 1], [2, 2, 2], [null, 3, null]];
    expect(instance.rows).toEqual(expectedResult);
  });

  it("has cw method which rotates table clockwise", () => {
    const rows = [[1, 2], [10, 20], [100, 200]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[100, 10, 1], [200, 20, 2]];
    expect(instance.cw().rows).toEqual(expectedResult);
  });

  it("has ccw method which rotates table counterclockwise", () => {
    const rows = [[1, 2], [10, 20], [100, 200]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[2, 20, 200], [1, 10, 100]];
    expect(instance.ccw().rows).toEqual(expectedResult);
  });

  it("has flipX method which flips table horizontally", () => {
    const rows = [[1, 2], [10, 20], [100, 200]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[2, 1], [20, 10], [200, 100]];
    expect(instance.flipX().rows).toEqual(expectedResult);
  });

  it("has flipY method which flips table vertically", () => {
    const rows = [[1, 2], [10, 20], [100, 200]];
    const instance = Table.fromRows(rows);
    const expectedResult = [[100, 200], [10, 20], [1, 2]];
    expect(instance.flipY().rows).toEqual(expectedResult);
  });
});
