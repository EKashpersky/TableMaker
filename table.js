var Table = (function () {
  function Table () {
    this._headers = [];
    this._rows    = [];
  }

  function _getHeaders () {
    return this._headers.reduce(function (accum, header) {
      var
      ___tr = document.createElement("tr"),
      ___th = document.createElement("th");

      ___th.innerHTML = header;
      ___tr.appendChild(___th);
      accum.appendChild(___tr);

      return accum;
    }, document.createElement("thead"));
  }

  function _getRows () {
    return this._rows.reduce(function (accum, row) {
      var ___tr = row.reduce(function (accum, value) {
        var ___td = document.createElement("td");
        ___td.innerHTML = value;
        return accum.appendChild(___td), accum;
      }, document.createElement("tr"));
      return accum.appendChild(___tr), accum;
    }, document.createElement("tbody"));
  }

  function _getTable (headers, rows) {
    var __table = document.createElement("table");

    __table.appendChild(headers);
    __table.appendChild(rows);

    return __table;
  }

  Table.prototype.addRow = function (row) {
    if (Array.isArray(row)) {
      row = row.map(function (data) {
        // if (typeof data == "function") {
        //   data = data.name;
        // } else if (typeof data == "object" && data) {
        //   data = JSON.stringify(data);
        // } else if (data == "") {
        //   data == "\"\"";
        // } else if (data === null) {
        //   data = "null";
        // }
        return JSON.stringify(data);
      });
      this._rows.push(row);
    }
    return this;
  };

  Table.prototype.addHeader = function (header) {
    return this._headers.push(header), this;
  };

  Table.prototype.deleteHeaders = function (from, to) {
    if (typeof from != "number") {
      from = 0;
    }

    if (arguments.length == 2) {
      if (typeof to == "number") {
        to == this._headers.length - 1;
      }
    }

    this._headers.splice(from, to);
  };

  Table.prototype.draw = function (selector) {
    if (typeof selector == "string") {
      selector = document.querySelector(selector);
    }

    if (selector == null) {
      return null;
    }

    selector.appendChild(
      _getTable(_getHeaders.call(this), _getRows.call(this))
    );
  };

  return Table;
})();