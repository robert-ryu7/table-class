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
});
