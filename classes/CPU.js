"use strict";
exports.__esModule = true;
var handleError_1 = require("../helpers/handleError");
var CPU = /** @class */ (function () {
    function CPU() {
        this.stack = {
            content: [],
            getLength: function () {
                return this.content.length;
            },
            getLastElement: function () {
                return this.content[this.getLength() - 1];
            },
            push: function (num) {
                this.content.push(num);
            },
            pop: function (caller) {
                if (this.content.length === 0) {
                    handleError_1["default"]("(" + caller + "): stack underflow");
                }
                return this.content.pop();
            }
        };
        this.R = null;
        this.mathOperations = ["add", "sub", "mul", "div", "mod"];
    }
    CPU.prototype.clear = function () {
        this.stack.content = [];
        this.R = null;
    };
    CPU.prototype.jump = function (to) {
        var lineToJumpTo;
        if (typeof to === "number") { // if the to arg represents the line number
            lineToJumpTo = to;
            if (lineToJumpTo < 1 || lineToJumpTo > this.instructions.length) {
                handleError_1["default"]("ERROR: undefined address " + to);
            }
        }
        else if (typeof to === "string") { // if the to arg represents the label
            lineToJumpTo = this.instructions.findIndex(function (_a) {
                var label = _a.label;
                return label === to;
            }) + 1;
            lineToJumpTo === 0 && handleError_1["default"]("(jump): undefined label " + to);
        }
        this.run(this.instructions.slice(lineToJumpTo - 1));
    };
    CPU.prototype.setInstructions = function (value) {
        this.instructions = value;
        return this;
    };
    CPU.prototype.run = function (instructions) {
        if (instructions === void 0) { instructions = this.instructions; }
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            var name_1 = instruction.name, param = instruction.param;
            if (this.mathOperations.includes(name_1)) {
                var num2 = this.stack.pop(name_1);
                var num1 = this.stack.pop(name_1);
                switch (name_1) {
                    case "add":
                        this.stack.push(num1 + num2);
                        break;
                    case "sub":
                        this.stack.push(num1 - num2);
                        break;
                    case "mul":
                        this.stack.push(num1 * num2);
                        break;
                    case "divide":
                        this.stack.push(num1 / num2);
                        break;
                    case "mod":
                        this.stack.push(num1 % num2);
                        break;
                }
            }
            else {
                switch (name_1) {
                    case "nop":
                        break;
                    case "push":
                        this.stack.push(Math.round(Number(param)));
                        break;
                    case "pop":
                        this.stack.pop(name_1);
                        break;
                    case "load":
                        this.R = this.stack.pop(name_1);
                        break;
                    case "store":
                        this.stack.push(this.R);
                        break;
                    case "jump":
                        return this.jump(param);
                        break;
                    case "jumpz":
                        if (this.stack.getLastElement() === 0) {
                            return this.jump(param);
                        }
                        break;
                    case "jumpnz":
                        if (this.stack.getLastElement() !== 0) {
                            return this.jump(param);
                        }
                        break;
                    case "print":
                        console.log(this.stack.getLastElement());
                        break;
                    case "stack":
                        console.log(this.stack.content);
                        break;
                    default:
                        handleError_1["default"]("(" + name_1 + "): unknown instruction");
                }
            }
        }
        this.clear();
    };
    CPU.parseLine = function (line, index) {
        var lineNumber = index + 1;
        var lineMinusLabel = line.replace(/^.+:/, "");
        var label = line.replace(lineMinusLabel, "").replace(":", "");
        var tokens = lineMinusLabel.trim().split(" ");
        var instruction = {
            name: tokens[0].trim(),
            lineNumber: lineNumber
        };
        if (tokens.length > 1) {
            var param = tokens[1].trim();
            var isNumber = !Number.isNaN(Number(param));
            instruction.param = isNumber ? Number(param) : param;
        }
        if (label !== "") {
            instruction.label = label;
        }
        return instruction;
    };
    return CPU;
}());
exports["default"] = CPU;
