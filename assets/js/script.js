'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// DAX Generator Functionality
const functionTemplates = {
  // Aggregation
  "SUM": (data) => `SUM(${data.tables[0]}[${data.columns[0]}])`,
  "AVERAGE": (data) => `AVERAGE(${data.tables[0]}[${data.columns[0]}])`,
  "MIN": (data) => `MIN(${data.tables[0]}[${data.columns[0]}])`,
  "MAX": (data) => `MAX(${data.tables[0]}[${data.columns[0]}])`,
  "COUNT": (data) => `COUNT(${data.tables[0]}[${data.columns[0]}])`,
  "COUNTA": (data) => `COUNTA(${data.tables[0]}[${data.columns[0]}])`,
  "DISTINCTCOUNT": (data) => `DISTINCTCOUNT(${data.tables[0]}[${data.columns[0]}])`,
  "SUMX": (data) => `SUMX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "AVERAGEX": (data) => `AVERAGEX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "COUNTX": (data) => `COUNTX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "MINX": (data) => `MINX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "MAXX": (data) => `MAXX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,

  // Date & Time
  "DATE": (data) => `DATE(${data.values[0] || "year"}, ${data.values[1] || "month"}, ${data.values[2] || "day"})`,
  "YEAR": (data) => `YEAR(${data.tables[0]}[${data.columns[0]}])`,
  "MONTH": (data) => `MONTH(${data.tables[0]}[${data.columns[0]}])`,
  "DAY": (data) => `DAY(${data.tables[0]}[${data.columns[0]}])`,
  "HOUR": (data) => `HOUR(${data.tables[0]}[${data.columns[0]}])`,
  "MINUTE": (data) => `MINUTE(${data.tables[0]}[${data.columns[0]}])`,
  "SECOND": (data) => `SECOND(${data.tables[0]}[${data.columns[0]}])`,
  "NOW": () => `NOW()`,
  "TODAY": () => `TODAY()`,
  "DATEDIFF": (data) => `DATEDIFF(${data.tables[0]}[${data.columns[0]}], ${data.tables[1]}[${data.columns[1]}], "${data.values[0] || "DAY"}")`,
  "EOMONTH": (data) => `EOMONTH(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "0"})`,
  "EDATE": (data) => `EDATE(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "0"})`,

  // Time Intelligence
  "DATESYTD": (data) => `DATESYTD(${data.tables[0]}[${data.columns[0]}])`,
  "TOTALYTD": (data) => `TOTALYTD(${data.expressions[0] || data.tables[0]}[${data.columns[0]}], ${data.tables[0]}[${data.columns[1] || data.columns[0]}])`,
  "SAMEPERIODLASTYEAR": (data) => `SAMEPERIODLASTYEAR(${data.tables[0]}[${data.columns[0]}])`,
  "TOTALQTD": (data) => `TOTALQTD(${data.expressions[0] || data.tables[0]}[${data.columns[0]}], ${data.tables[0]}[${data.columns[1] || data.columns[0]}])`,
  "TOTALMTD": (data) => `TOTALMTD(${data.expressions[0] || data.tables[0]}[${data.columns[0]}], ${data.tables[0]}[${data.columns[1] || data.columns[0]}])`,
  "PREVIOUSMONTH": (data) => `PREVIOUSMONTH(${data.tables[0]}[${data.columns[0]}])`,
  "NEXTYEAR": (data) => `NEXTYEAR(${data.tables[0]}[${data.columns[0]}])`,
  "STARTOFQUARTER": (data) => `STARTOFQUARTER(${data.tables[0]}[${data.columns[0]}])`,
  "PARALLELPERIOD": (data) => `PARALLELPERIOD(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "1"}, "${data.values[1] || "YEAR"}")`,
  "ENDOFYEAR": (data) => `ENDOFYEAR(${data.tables[0]}[${data.columns[0]}])`,

  // Filter & Lookup
  "FILTER": (data) => `FILTER(${data.tables[0]}, ${data.tables[0]}[${data.columns[0]}] ${data.operators[0] || "="} ${data.valueTypes[0] === "text" ? `"${data.values[0]}"` : data.values[0]})`,
  "CALCULATE": (data) => {
      let filters = "";
      if (data.filters && data.filters.length > 0) {
          filters = data.filters.map(filter => {
              const operator = filter.operator || "=";
              let value = filter.value;
              if (filter.valueType === "text") value = `"${value}"`;
              else if (filter.valueType === "measure") value = `${value}`;
              return `\n    ${filter.table}[${filter.column}] ${operator} ${value}`;
          }).join(",");
      }
      return `CALCULATE(\n    ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}],${filters}\n)`;
  },
  "CALCULATETABLE": (data) => {
      let filters = "";
      if (data.filters && data.filters.length > 0) {
          filters = data.filters.map(filter => {
              const operator = filter.operator || "=";
              let value = filter.value;
              if (filter.valueType === "text") value = `"${value}"`;
              else if (filter.valueType === "measure") value = `${value}`;
              return `\n    ${filter.table}[${filter.column}] ${operator} ${value}`;
          }).join(",");
      }
      return `CALCULATETABLE(\n    ${data.tables[0]},${filters}\n)`;
  },
  "ALL": (data) => `ALL(${data.tables[0]}[${data.columns[0]}])`,
  "ALLSELECTED": (data) => `ALLSELECTED(${data.tables[0]}[${data.columns[0]}])`,
  "ALLEXCEPT": (data) => `ALLEXCEPT(${data.tables[0]}, ${data.columns.map(col => `${data.tables[0]}[${col}]`).join(", ")})`,
  "RELATED": (data) => `RELATED(${data.tables[1]}[${data.columns[0]}])`,
  "RELATEDTABLE": (data) => `RELATEDTABLE(${data.tables[1]})`,
  "CONTAINS": (data) => `CONTAINS(${data.tables[0]}, ${data.tables[0]}[${data.columns[0]}], "${data.values[0]}")`,
  "LOOKUPVALUE": (data) => `LOOKUPVALUE(${data.tables[0]}[${data.columns[0]}], ${data.tables[0]}[${data.columns[1]}], "${data.values[0]}")`,
  "CROSSJOIN": (data) => `CROSSJOIN(${data.tables[0]}, ${data.tables[1]})`,
  "EXCEPT": (data) => `EXCEPT(${data.tables[0]}, ${data.tables[1]})`,
  "INTERSECT": (data) => `INTERSECT(${data.tables[0]}, ${data.tables[1]})`,

  // Logical
  "IF": (data) => `IF(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "ValueIfTrue"}, ${data.values[1] || "ValueIfFalse"})`,
  "SWITCH": (data) => {
      let cases = "";
      if (data.values && data.values.length > 0) {
          cases = data.values.map((val, i) => {
              if (i % 2 === 0) {
                  return `\n    ${val}, ${data.values[i + 1] || "Result"}`;
              }
              return "";
          }).join(",");
      }
      return `SWITCH(${data.expressions[0] || "Expression"},${cases}\n)`;
  },
  "AND": (data) => `AND(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.expressions[1] || data.tables[0]}[${data.columns[1] || "Column"}])`,
  "OR": (data) => `OR(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.expressions[1] || data.tables[0]}[${data.columns[1] || "Column"}])`,
  "NOT": (data) => `NOT(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "ISBLANK": (data) => `ISBLANK(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "ISERROR": (data) => `ISERROR(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "ISNUMBER": (data) => `ISNUMBER(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "ISTEXT": (data) => `ISTEXT(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "HASONEFILTER": (data) => `HASONEFILTER(${data.tables[0]}[${data.columns[0]}])`,
  "HASONEVALUE": (data) => `HASONEVALUE(${data.tables[0]}[${data.columns[0]}])`,

  // Math
  "ABS": (data) => `ABS(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "CEILING": (data) => `CEILING(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "1"})`,
  "FLOOR": (data) => `FLOOR(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "1"})`,
  "ROUND": (data) => `ROUND(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "0"})`,
  "EXP": (data) => `EXP(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "LN": (data) => `LN(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "LOG": (data) => `LOG(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "10"})`,
  "POWER": (data) => `POWER(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}], ${data.values[0] || "2"})`,
  "SQRT": (data) => `SQRT(${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,

  // Statistical
  "STDEV.P": (data) => `STDEV.P(${data.tables[0]}[${data.columns[0]}])`,
  "STDEV.S": (data) => `STDEV.S(${data.tables[0]}[${data.columns[0]}])`,
  "VAR.P": (data) => `VAR.P(${data.tables[0]}[${data.columns[0]}])`,
  "VAR.S": (data) => `VAR.S(${data.tables[0]}[${data.columns[0]}])`,
  "MEDIAN": (data) => `MEDIAN(${data.tables[0]}[${data.columns[0]}])`,
  "PERCENTILE.EXC": (data) => `PERCENTILE.EXC(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "0.5"})`,

  // Financial
  "NPV": (data) => `NPV(${data.values[0] || "0.1"}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "IRR": (data) => `IRR(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "0.1"})`,
  "PMT": (data) => `PMT(${data.values[0] || "0.1"}, ${data.values[1] || "12"}, ${data.values[2] || "1000"})`,
  "FV": (data) => `FV(${data.values[0] || "0.1"}, ${data.values[1] || "12"}, ${data.values[2] || "100"})`,
  "PV": (data) => `PV(${data.values[0] || "0.1"}, ${data.values[1] || "12"}, ${data.values[2] || "100"})`,

  // Text
  "CONCATENATE": (data) => `CONCATENATE("${data.values[0]}", "${data.values[1]}")`,
  "CONCATENATEX": (data) => `CONCATENATEX(${data.tables[0]}, ${data.tables[0]}[${data.columns[0]}], "${data.values[0] || ", "}")`,
  "LEFT": (data) => `LEFT(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "1"})`,
  "RIGHT": (data) => `RIGHT(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "1"})`,
  "MID": (data) => `MID(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "1"}, ${data.values[1] || "1"})`,
  "LEN": (data) => `LEN(${data.tables[0]}[${data.columns[0]}])`,
  "UPPER": (data) => `UPPER(${data.tables[0]}[${data.columns[0]}])`,
  "LOWER": (data) => `LOWER(${data.tables[0]}[${data.columns[0]}])`,
  "TRIM": (data) => `TRIM(${data.tables[0]}[${data.columns[0]}])`,
  "SUBSTITUTE": (data) => `SUBSTITUTE(${data.tables[0]}[${data.columns[0]}], "${data.values[0]}", "${data.values[1]}")`,
  "REPLACE": (data) => `REPLACE(${data.tables[0]}[${data.columns[0]}], ${data.values[0] || "1"}, ${data.values[1] || "1"}, "${data.values[2]}")`,
  "FIND": (data) => `FIND("${data.values[0]}", ${data.tables[0]}[${data.columns[0]}])`,
  "SEARCH": (data) => `SEARCH("${data.values[0]}", ${data.tables[0]}[${data.columns[0]}])`,

  // Table Manipulation
  "ADDCOLUMNS": (data) => `ADDCOLUMNS(${data.tables[0]}, "${data.values[0] || "NewColumn"}", ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "SUMMARIZE": (data) => `SUMMARIZE(${data.tables[0]}, ${data.columns.map(col => `${data.tables[0]}[${col}]`).join(", ")})`,
  "GROUPBY": (data) => `GROUPBY(${data.tables[0]}, ${data.columns.map(col => `${data.tables[0]}[${col}]`).join(", ")})`,
  "GENERATE": (data) => `GENERATE(${data.tables[0]}, ${data.tables[1]})`,
  "UNION": (data) => `UNION(${data.tables[0]}, ${data.tables[1]})`,
  "TOPN": (data) => `TOPN(${data.values[0] || "10"}, ${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,

  // Parent-Child
  "PATH": (data) => `PATH(${data.tables[0]}[${data.columns[0]}], ${data.tables[0]}[${data.columns[1]}])`,
  "PATHITEM": (data) => `PATHITEM(${data.expressions[0] || "PathExpression"}, ${data.values[0] || "1"})`,
  "ISINSCOPE": (data) => `ISINSCOPE(${data.tables[0]}[${data.columns[0]}])`,
  "RANKX": (data) => `RANKX(${data.tables[0]}, ${data.expressions[0] || data.tables[0]}[${data.columns[0] || "Column"}])`,
  "USERELATIONSHIP": (data) => `USERELATIONSHIP(${data.tables[0]}[${data.columns[0]}], ${data.tables[1]}[${data.columns[1]}])`
};


const functionRequirements = {
  // Aggregation
  "SUM": { tables: 1, columns: 1 },
  "AVERAGE": { tables: 1, columns: 1 },
  "MIN": { tables: 1, columns: 1 },
  "MAX": { tables: 1, columns: 1 },
  "COUNT": { tables: 1, columns: 1 },
  "COUNTA": { tables: 1, columns: 1 },
  "DISTINCTCOUNT": { tables: 1, columns: 1 },
  "SUMX": { tables: 1, columns: 1, expressions: 1 },
  "AVERAGEX": { tables: 1, columns: 1, expressions: 1 },
  "COUNTX": { tables: 1, columns: 1, expressions: 1 },
  "MINX": { tables: 1, columns: 1, expressions: 1 },
  "MAXX": { tables: 1, columns: 1, expressions: 1 },

  // Date & Time
  "DATE": { values: ["year", "month", "day"] },
  "YEAR": { tables: 1, columns: 1 },
  "MONTH": { tables: 1, columns: 1 },
  "DAY": { tables: 1, columns: 1 },
  "HOUR": { tables: 1, columns: 1 },
  "MINUTE": { tables: 1, columns: 1 },
  "SECOND": { tables: 1, columns: 1 },
  "NOW": {},
  "TODAY": {},
  "DATEDIFF": { tables: 2, columns: 2, values: ["interval (DAY/MONTH/YEAR)"] },
  "EOMONTH": { tables: 1, columns: 1, values: ["months"] },
  "EDATE": { tables: 1, columns: 1, values: ["months"] },

  // Time Intelligence
  "DATESYTD": { tables: 1, columns: 1 },
  "TOTALYTD": { tables: 1, columns: 2, expressions: 1 },
  "SAMEPERIODLASTYEAR": { tables: 1, columns: 1 },
  "TOTALQTD": { tables: 1, columns: 2, expressions: 1 },
  "TOTALMTD": { tables: 1, columns: 2, expressions: 1 },
  "PREVIOUSMONTH": { tables: 1, columns: 1 },
  "NEXTYEAR": { tables: 1, columns: 1 },
  "STARTOFQUARTER": { tables: 1, columns: 1 },
  "PARALLELPERIOD": { tables: 1, columns: 1, values: ["number", "interval (YEAR/QUARTER/MONTH)"] },
  "ENDOFYEAR": { tables: 1, columns: 1 },

  // Filter & Lookup
  "FILTER": { tables: 1, columns: 1, operators: ["="], values: ["value"], valueTypes: ["text"] },
  "CALCULATE": { tables: 1, columns: 1, expressions: 1, filters: [{ table: "", column: "", operator: "=", value: "", valueType: "text" }], allowAddFilters: true },
  "CALCULATETABLE": { tables: 1, filters: [{ table: "", column: "", operator: "=", value: "", valueType: "text" }], allowAddFilters: true },
  "ALL": { tables: 1, columns: 1 },
  "ALLSELECTED": { tables: 1, columns: 1 },
  "ALLEXCEPT": { tables: 1, columns: -1 },
  "RELATED": { tables: 2, columns: 1 },
  "RELATEDTABLE": { tables: 2 },
  "CONTAINS": { tables: 1, columns: 1, values: ["value"] },
  "LOOKUPVALUE": { tables: 1, columns: 2, values: ["search_value"] },
  "CROSSJOIN": { tables: 2 },
  "EXCEPT": { tables: 2 },
  "INTERSECT": { tables: 2 },

  // Logical
  "IF": { tables: 1, columns: 1, expressions: 1, values: ["value_if_true", "value_if_false"] },
  "SWITCH": { expressions: 1, values: ["value1", "result1", "value2", "result2"] },
  "AND": { tables: 1, columns: 2, expressions: 2 },
  "OR": { tables: 1, columns: 2, expressions: 2 },
  "NOT": { tables: 1, columns: 1, expressions: 1 },
  "ISBLANK": { tables: 1, columns: 1, expressions: 1 },
  "ISERROR": { tables: 1, columns: 1, expressions: 1 },
  "ISNUMBER": { tables: 1, columns: 1, expressions: 1 },
  "ISTEXT": { tables: 1, columns: 1, expressions: 1 },
  "HASONEFILTER": { tables: 1, columns: 1 },
  "HASONEVALUE": { tables: 1, columns: 1 },

  // Math
  "ABS": { tables: 1, columns: 1, expressions: 1 },
  "CEILING": { tables: 1, columns: 1, expressions: 1, values: ["significance"] },
  "FLOOR": { tables: 1, columns: 1, expressions: 1, values: ["significance"] },
  "ROUND": { tables: 1, columns: 1, expressions: 1, values: ["digits"] },
  "EXP": { tables: 1, columns: 1, expressions: 1 },
  "LN": { tables: 1, columns: 1, expressions: 1 },
  "LOG": { tables: 1, columns: 1, expressions: 1, values: ["base"] },
  "POWER": { tables: 1, columns: 1, expressions: 1, values: ["power"] },
  "SQRT": { tables: 1, columns: 1, expressions: 1 },

  // Statistical
  "STDEV.P": { tables: 1, columns: 1 },
  "STDEV.S": { tables: 1, columns: 1 },
  "VAR.P": { tables: 1, columns: 1 },
  "VAR.S": { tables: 1, columns: 1 },
  "MEDIAN": { tables: 1, columns: 1 },
  "PERCENTILE.EXC": { tables: 1, columns: 1, values: ["k"] },

  // Financial
  "NPV": { tables: 1, columns: 1, expressions: 1, values: ["rate"] },
  "IRR": { tables: 1, columns: 1, values: ["guess"] },
  "PMT": { values: ["rate", "nper", "pv"] },
  "FV": { values: ["rate", "nper", "pmt"] },
  "PV": { values: ["rate", "nper", "pmt"] },

  // Text
  "CONCATENATE": { values: ["text1", "text2"] },
  "CONCATENATEX": { tables: 1, columns: 1, values: ["delimiter"] },
  "LEFT": { tables: 1, columns: 1, values: ["num_chars"] },
  "RIGHT": { tables: 1, columns: 1, values: ["num_chars"] },
  "MID": { tables: 1, columns: 1, values: ["start_num", "num_chars"] },
  "LEN": { tables: 1, columns: 1 },
  "UPPER": { tables: 1, columns: 1 },
  "LOWER": { tables: 1, columns: 1 },
  "TRIM": { tables: 1, columns: 1 },
  "SUBSTITUTE": { tables: 1, columns: 1, values: ["old_text", "new_text"] },
  "REPLACE": { tables: 1, columns: 1, values: ["start_num", "num_chars", "new_text"] },
  "FIND": { tables: 1, columns: 1, values: ["find_text"] },
  "SEARCH": { tables: 1, columns: 1, values: ["find_text"] },

  // Table Manipulation
  "ADDCOLUMNS": { tables: 1, columns: 1, expressions: 1, values: ["new_column_name"] },
  "SUMMARIZE": { tables: 1, columns: -1 },
  "GROUPBY": { tables: 1, columns: -1 },
  "GENERATE": { tables: 2 },
  "UNION": { tables: 2 },
  "TOPN": { tables: 1, columns: 1, expressions: 1, values: ["n"] },

  // Parent-Child
  "PATH": { tables: 1, columns: 2 },
  "PATHITEM": { expressions: 1, values: ["position"] },
  "ISINSCOPE": { tables: 1, columns: 1 },
  "RANKX": { tables: 1, columns: 1, expressions: 1 },
  "USERELATIONSHIP": { tables: 2, columns: 2 }
};


// Update input fields based on selected function
function updateInputFields() {
  const functionName = document.getElementById("daxFunction").value;
  const inputFieldsDiv = document.getElementById("inputFields");
  inputFieldsDiv.innerHTML = "";

  if (!functionName) {
      document.getElementById("daxOutput").textContent = "// Select a function to generate DAX.";
      document.getElementById("copyButton").disabled = true;
      return;
  }

  const requirements = functionRequirements[functionName];
  let html = "";

  // Add measure/expression input if needed
  if (requirements.expressions) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Expression</h6>`;
      for (let i = 0; i < requirements.expressions; i++) {
          html += `
              <div class="input-group input-group-sm compact-input-group">
                  <span class="input-group-text input-group-text-sm">Expression ${i + 1}</span>
                  <input type="text" class="form-control form-control-sm expression-input" placeholder="e.g., SUM(Table[Column])">
              </div>
          `;
      }
      html += `</div>`;
  }

  // Add table inputs
  if (requirements.tables > 0) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Tables</h6>`;
      for (let i = 0; i < requirements.tables; i++) {
          html += `
              <div class="input-group input-group-sm compact-input-group">
                  <span class="input-group-text input-group-text-sm">Table ${i + 1}</span>
                  <input type="text" class="form-control form-control-sm table-input" placeholder="e.g., Sales">
              </div>
          `;
      }
      html += `</div>`;
  }

  // Add column inputs (single or multiple)
  if (requirements.columns) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Columns</h6>`;
      if (requirements.columns === -1) {
          // Multiple columns (like ALLEXCEPT)
          html += `
              <div class="input-group input-group-sm compact-input-group">
                  <span class="input-group-text input-group-text-sm">Columns</span>
                  <input type="text" class="form-control form-control-sm columns-input" placeholder="e.g., Category, Region, Year">
              </div>
              <small class="text-muted">Enter column names without table reference, comma separated</small>
          `;
      } else {
          for (let i = 0; i < requirements.columns; i++) {
              html += `
                  <div class="input-group input-group-sm compact-input-group">
                      <span class="input-group-text input-group-text-sm">Column ${i + 1}</span>
                      <input type="text" class="form-control form-control-sm column-input" placeholder="e.g., Revenue">
                  </div>
              `;
          }
      }
      html += `</div>`;
  }

  // Add value inputs (for functions like IF, SWITCH, etc.)
  if (requirements.values) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Parameters</h6>`;
      requirements.values.forEach((label, i) => {
          const valueType = requirements.valueTypes ? requirements.valueTypes[i] : null;
          const inputType = valueType === "number" ? "number" : "text";

          html += `
              <div class="input-group input-group-sm compact-input-group">
                  <span class="input-group-text input-group-text-sm">${label}</span>
                  <input type="${inputType}" class="form-control form-control-sm value-input" 
                         placeholder="e.g., ${label.includes("Operator") ? ">, <, =" : "Value"}" 
                         data-index="${i}" ${valueType ? `data-type="${valueType}"` : ''}>
              </div>
          `;
      });
      html += `</div>`;
  }

  // Add operator inputs (for functions like FILTER)
  if (requirements.operators) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Operators</h6>`;
      requirements.operators.forEach((op, i) => {
          html += `
              <div class="input-group input-group-sm compact-input-group">
                  <span class="input-group-text input-group-text-sm">Operator ${i + 1}</span>
                  <select class="form-select form-select-sm operator-input">
                      <option value="=" ${op === '=' ? 'selected' : ''}>=</option>
                      <option value=">" ${op === '>' ? 'selected' : ''}>></option>
                      <option value="<" ${op === '<' ? 'selected' : ''}><</option>
                      <option value=">=" ${op === '>=' ? 'selected' : ''}>>=</option>
                      <option value="<=" ${op === '<=' ? 'selected' : ''}><=</option>
                      <option value="<>" ${op === '<>' ? 'selected' : ''}><></option>
                  </select>
              </div>
          `;
      });
      html += `</div>`;
  }

  // Add filter inputs for CALCULATE and similar functions
  if (requirements.filters) {
      html += `<div class="param-group">`;
      html += `<h6 class="mb-2">Filters</h6>`;
      html += `<div id="filterInputs">`;

      requirements.filters.forEach((filter, i) => {
          html += createFilterInput(i, filter);
      });

      html += `</div>`;

      if (requirements.allowAddFilters) {
          html += `
              <button class="btn btn-secondary btn-sm mt-2" onclick="addFilter()">+ Add Filter</button>
          `;
      }

      html += `</div>`;
  }

  inputFieldsDiv.innerHTML = html;

  // Add event listeners to all inputs
  document.querySelectorAll("input, select").forEach(input => {
      input.addEventListener("input", generateDAX);
      input.addEventListener("change", generateDAX);
  });

  generateDAX();
}

function createFilterInput(index, filter = {}) {
  return `
      <div class="filter-row row g-2 mb-2" data-index="${index}">
          <div class="col-md-3">
              <div class="input-group input-group-sm">
                  <span class="input-group-text input-group-text-sm">Table</span>
                  <input type="text" class="form-control form-control-sm filter-table-input" placeholder="Table" value="${filter.table || ''}">
              </div>
          </div>
          <div class="col-md-3">
              <div class="input-group input-group-sm">
                  <span class="input-group-text input-group-text-sm">Column</span>
                  <input type="text" class="form-control form-control-sm filter-column-input" placeholder="Column" value="${filter.column || ''}">
              </div>
          </div>
          <div class="col-md-2">
              <div class="input-group input-group-sm">
                  <span class="input-group-text input-group-text-sm">Operator</span>
                  <select class="form-select form-select-sm filter-operator-input">
                      <option value="=" ${filter.operator === '=' ? 'selected' : ''}>=</option>
                      <option value=">" ${filter.operator === '>' ? 'selected' : ''}>></option>
                      <option value="<" ${filter.operator === '<' ? 'selected' : ''}><</option>
                      <option value=">=" ${filter.operator === '>=' ? 'selected' : ''}>>=</option>
                      <option value="<=" ${filter.operator === '<=' ? 'selected' : ''}><=</option>
                      <option value="<>" ${filter.operator === '<>' ? 'selected' : ''}><></option>
                  </select>
              </div>
          </div>
          <div class="col-md-3">
              <div class="input-group input-group-sm">
                  <span class="input-group-text input-group-text-sm">Value</span>
                  <input type="text" class="form-control form-control-sm filter-value-input" placeholder="Value" value="${filter.value || ''}">
              </div>
          </div>
          <div class="col-md-1">
              <div class="input-group input-group-sm">
                  <select class="form-select form-select-sm filter-valuetype-input">
                      <option value="text" ${filter.valueType === 'text' ? 'selected' : ''}>Text</option>
                      <option value="number" ${filter.valueType === 'number' ? 'selected' : ''}>Number</option>
                      <option value="measure" ${filter.valueType === 'measure' ? 'selected' : ''}>Measure</option>
                  </select>
              </div>
          </div>
          <div class="col-md-1 d-flex align-items-center">
              <button class="btn btn-danger btn-sm filter-remove-btn w-100" onclick="removeFilter(this)">×</button>
          </div>
      </div>
  `;
}

// Add new filter
function addFilter() {
  const filterInputs = document.getElementById("filterInputs");
  const index = filterInputs.children.length;
  filterInputs.insertAdjacentHTML("beforeend", createFilterInput(index));

  // Add event listeners to new inputs
  const newFilter = filterInputs.lastElementChild;
  newFilter.querySelectorAll("input, select").forEach(input => {
      input.addEventListener("input", generateDAX);
      input.addEventListener("change", generateDAX);
  });

  generateDAX();
}

// Remove filter
function removeFilter(button) {
  button.closest(".filter-row").remove();
  generateDAX();
}

// Generate DAX based on inputs
function generateDAX() {
  const functionName = document.getElementById("daxFunction").value;
  if (!functionName) return;

  const requirements = functionRequirements[functionName];
  const data = {};

  // Get expressions
  if (requirements.expressions) {
      data.expressions = Array.from(document.querySelectorAll(".expression-input")).map(input => input.value);
  }

  // Get tables
  if (requirements.tables > 0) {
      data.tables = Array.from(document.querySelectorAll(".table-input")).map(input => input.value);
  }

  // Get columns
  if (requirements.columns) {
      if (requirements.columns === -1) {
          // Handle multiple columns (like ALLEXCEPT)
          const columnsInput = document.querySelector(".columns-input");
          if (columnsInput) {
              data.columns = columnsInput.value.split(",").map(col => col.trim()).filter(col => col);
          }
      } else {
          data.columns = Array.from(document.querySelectorAll(".column-input")).map(input => input.value);
      }
  }

  // Get values
  if (requirements.values) {
      data.values = Array.from(document.querySelectorAll(".value-input")).map(input => input.value);
      if (requirements.valueTypes) {
          data.valueTypes = Array.from(document.querySelectorAll(".value-input")).map(input => input.dataset.type);
      }
  }

  // Get operators
  if (requirements.operators) {
      data.operators = Array.from(document.querySelectorAll(".operator-input")).map(select => select.value);
  }

  // Get filters (for CALCULATE, etc.)
  if (requirements.filters) {
      data.filters = Array.from(document.querySelectorAll(".filter-row")).map(filter => {
          return {
              table: filter.querySelector(".filter-table-input").value,
              column: filter.querySelector(".filter-column-input").value,
              operator: filter.querySelector(".filter-operator-input").value,
              value: filter.querySelector(".filter-value-input").value,
              valueType: filter.querySelector(".filter-valuetype-input").value
          };
      });
  }

  // Validate required fields
  let isValid = true;

  if (requirements.expressions) {
      isValid = data.expressions.every(exp => exp) && isValid;
  }

  if (requirements.tables) {
      isValid = data.tables.every(t => t) && isValid;
  }

  if (requirements.columns && requirements.columns !== -1) {
      isValid = data.columns.every(c => c) && isValid;
  } else if (requirements.columns === -1) {
      isValid = data.columns && data.columns.length > 0 && isValid;
  }

  if (requirements.values) {
      isValid = data.values.every(v => v !== undefined) && isValid;
  }

  if (requirements.filters) {
      isValid = data.filters.every(f => f.table && f.column && f.value) && isValid;
  }

  if (!isValid) {
      document.getElementById("daxOutput").textContent = "// Fill all required fields to generate DAX.";
      document.getElementById("copyButton").disabled = true;
      return;
  }

  // Generate the DAX
  try {

      const daxCode = functionTemplates[functionName](data);
      const measureName = document.getElementById("measureName").value.trim();

      const dax = `${measureName} = ${daxCode}`;
      document.getElementById("daxOutput").textContent = dax;
      document.getElementById("copyButton").disabled = false;


      // Apply syntax highlighting
      Prism.highlightAll();

  } catch (e) {
      document.getElementById("daxOutput").textContent = `// Error generating DAX: ${e.message}`;
      document.getElementById("copyButton").disabled = true;
  }
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clipboard for the copy button
    if (document.getElementById("copyButton")) {
        new ClipboardJS("#copyButton", {
            text: () => document.getElementById("daxOutput").textContent
        });
    }

    // Initialize DAX function selector if it exists
    if (document.getElementById("daxFunction")) {
        document.getElementById("daxFunction").addEventListener("change", updateInputFields);
    }

    // Initialize function search if it exists
    const functionSearch = document.getElementById("functionSearch");
    if (functionSearch) {
        functionSearch.addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const options = document.querySelectorAll("#daxFunction option");
            options.forEach(option => {
                if (option.value === "") return;
                const text = option.textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? "" : "none";
            });
        });
    }
});