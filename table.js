var table = (function () {
  var _debug = 1;

  function Table () {
    this._headers = [];
    this._rows    = [];
    this._tables  = {};
  }

  /**
   * @param {string|HTMLElement} selector
   * @param {HTMLElement} table
   * @return null|void
  **/
  function _draw (selector) {
    if (typeof selector == "string") {
      selector = document.querySelector(selector);
    }

    if (selector == null) {
      return _trace("Selector is null."), null;
    }

    selector.appendChild(
      _getTable(_getThead.call(this), _getTbody.call(this))
    );
  }

  /**
   * Assembles the table from thead and tbody.
   * @param {HTMLElement} thead
   * @param {HTMLElement} tbody
   * @return {HTMLElement}
  **/
  function _getTable (thead, tbody) {
    var __table = document.createElement("table");
    __table.appendChild(thead);
    __table.appendChild(tbody);
    return __table;
  }

  /**
   * Returns thead for the table.
   * @return {HTMLElement}
  **/
  function _getThead () {
    return this._headers.reduce(function (accum, header) {
      var
      ___tr = document.createElement("tr"),
      ___th = document.createElement("th");
      ___th.innerHTML = header;
      ___tr.appendChild(___th);
      return accum.appendChild(___tr), accum;
    }, document.createElement("thead"));
  }

  /**
   * Returns tbody for the table.
   * @return {HTMLElement}
  **/
  function _getTbody () {
    return this._rows.reduce(function (accum, row) {
      var ___tr = row.reduce(function (accum, value) {
        var ___td = document.createElement("td");
        ___td.innerHTML = value;
        return accum.appendChild(___td), accum;
      }, document.createElement("tr"));
      return accum.appendChild(___tr), accum;
    }, document.createElement("tbody"));
  }

  /**
   * Logs a message when debug is turned on. Works like console.log.
   * @return {boolean}
  **/
  function _trace () {
    if (_debug && arguments.length) {
      return console.trace.apply(console, arguments), true;
    }
  }

  /**
   * Adds a row to the array of tbody rows.
   * @param row array
   * @return this
  **/
  Table.prototype.addRow = function (row) {
    if (Array.isArray(row)) {
      this._rows.push(row.map(function (data) {
        return JSON.stringify(data);
      }));
    } else {
      _trace("Couldn't add a row to the table.");
    }
    return this;
  };

  /**
   * Adds a cell to the array of thead cells.
   * @param header string
   * @return {this}
  **/
  Table.prototype.addHeader = function (header) {
    return this._headers.push(header), this;
  };

  /**
   * Deletes virtual table with `name` name.
   * @param {string} name
   * @return {this}
  **/
  Table.prototype.delete = function (name) {
    delete this._tables[name];
    return this;
  };

  /**
   * Draws current table or table under `name` if it exists in `selector`
   * if it exists.
   * @param {string|HTMLElement} selector
   * @param {string} name
  **/
  Table.prototype.draw = function (selector, name) {
    if (arguments.length > 1) {
      if (this._tables[name]) {
        var __tmp     = [this._headers, this._rows];
        this._headers = this._tables[name][0];
        this._rows    = this._tables[name][1];
        _draw.call(this, selector);
        this._headers = __tmp[0];
        this._rows    = __tmp[1];
      } else {
        _trace("There's no data with", name, "name.");
      }
    } else {
      _draw.call(this, selector);
    }
    return this;
  };

  /**
   * Draws all the virtualized tables.
   * @param {string|HTMLElement} selector
   * @return {this}
  **/
  Table.prototype.drawAll = function (selector, withClasses) {
    if (typeof selector == "string") {
      selector = document.querySelector(selector);
    }
    var __keys = Object.keys(this._tables);
    return this._tables.forEach(function (table, index) {
      this.draw(selector, __keys[index]);
    }.bind(this)), this;
  };

  /**
   * Inserts empty rows to the table `times`, or 1 time if `times` is null.
   * @param {number} times
   * @return {this}
  **/
  Table.prototype.split = function (times) {
    times = arguments.length > 0 && typeof times != "number" ? 0 : times;
    do {
      this._rows.push([""]);
    } while (--times > 0)
    return this;
  }

  /**
   * Virtualize current table, that allows you to add another type of data
   * with no afraid of data mixing.
   * @return {this}
  **/
  Table.prototype.virtualize = function (name) {
    this._tables[name] = [this._headers, this._rows];
    this._headers = [];
    this._rows    = [];
    return this;
  };

  return new Table();
})();
