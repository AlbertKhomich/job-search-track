"use strict";

const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const result = excelToJson({
  sourse: fs.readFileSync("Bewerbungen.xlsx"),
});

console.log(result);
