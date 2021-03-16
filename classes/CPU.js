"use strict";
exports.__esModule = true;
var CPU = /** @class */ (function () {
    function CPU() {
    }
    CPU.prototype.clear = function () {
        this.stack = [];
        this.R = null;
    };
    CPU.prototype.setInstructions = function (value) {
        this.instructions = value;
        return this;
    };
    CPU.prototype.run = function () {
        this.clear();
        this.instructions.forEach(function (instruction) {
            var name = instruction.name;
            switch (name) {
                case "nop":
                    break;
                case "push":
                    break;
                case "pop":
                    break;
                case "load":
                    break;
                case "store":
                    break;
                case "add":
                    break;
                case "sub":
                    break;
                case "mul":
                    break;
                case "divide":
                    break;
                case "mod":
                    break;
                case "jump":
                    break;
                case "jumpz":
                    break;
                case "jumpnz":
                    break;
                case "print":
                    break;
                case "stack":
                    break;
            }
        });
    };
    CPU.parseLine = function (line, index) {
        var lineNumber = index + 1;
        var lineMinusLabel = line.replace(/^.+:/, "");
        var label = line.replace(lineMinusLabel, "");
        var tokens = lineMinusLabel.split(" ");
        var instruction = {
            name: tokens[0].trim(),
            lineNumber: lineNumber
        };
        if (tokens.length > 1) {
            instruction.param = tokens.length[1];
        }
        if (label !== "") {
            instruction.label = label;
        }
        return instruction;
    };
    return CPU;
}());
exports["default"] = CPU;
