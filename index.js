"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var handleError_1 = require("./helpers/handleError");
var CPU_1 = require("./classes/CPU");
var filename = process.argv[2];
var fileContent;
try {
    fileContent = fs_1.readFileSync(filename, { encoding: "utf-8" });
}
catch (e) {
    handleError_1["default"]("unable to open file " + filename + " (" + e.message + ")");
}
var lines = fileContent.trim().split("\n");
var instructions = lines.map(CPU_1["default"].parseLine);
var cpu = new CPU_1["default"]();
cpu.setInstructions(instructions).run();
