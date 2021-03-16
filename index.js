"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require("path");
var evaluateSafely_1 = require("./helpers/evaluateSafely");
var CPU_1 = require("./classes/CPU");
var filename = process.argv[2];
var fileContent = evaluateSafely_1["default"]({
    fn: function () {
        var filePath = path.resolve(filename.trim());
        return fs_1.readFileSync(filePath, { encoding: "utf-8" });
    },
    errorMsg: "ERROR unable to open file " + filename + " (ENOENT: no such file or directory, open '" + filename + "')"
});
var lines = fileContent.split("\n");
var instructions = lines.map(CPU_1["default"].parseLine);
var cpu = new CPU_1["default"]();
cpu.setInstructions(instructions).run();
