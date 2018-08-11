class TableMaker {
  constructor () {
    this._headRows = [];
    this._bodyRows = [];

    this._table = document.createElement("table");
  }

  /**
   * @param {string[]} row
   * @throws TypeError
  **/
  addHeadRow (row) {
    if (!Array.isArray(row)) {
      throw new TypeError("Row is not an array.");
    }

    this._headRows.push(row);

    return this;
  }

  /**
   * @param {string[]} row
   * @throws TypeError
  **/
  addBodyRow (row) {
    if (!Array.isArray(row)) {
      throw new TypeError("Row is not an array.");
    }

    this._bodyRows.push(row);

    return this;
  }

  free () {
    this._headRows = [];
    this._bodyRows = [];

    return this;
  }

  assemble () {
    const head = this._headRows.map(cells => {
      const assembledCells = `<th>${cells.join("</th><th>")}</th>`;

      return `<tr>${assembledCells}</tr>`;
    }).join("");

    const body = this._bodyRows.map(cells => {
      const assembledCells = `<td>${cells.join("</td><td>")}</td>`;

      return `<tr>${assembledCells}</tr>`;
    }).join("");

    this._table.innerHTML = `<thead>${head}</thead><tbody>${body}</tbody>`;

    return this;
  }

  /**
   * @returns {HTMLTableElement}
  **/
  get () {
    return this._table;
  }
}