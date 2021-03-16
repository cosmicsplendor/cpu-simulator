"use strict";
exports.__esModule = true;
var CPU = /** @class */ (function () {
    function CPU() {
        this.mathOperations = ["add", "sub", "mul", "div", "mod"];
    }
    CPU.prototype.clear = function () {
        this.stack = [];
        this.R = null;
    };
    CPU.prototype.setInstructions = function (value) {
        this.instructions = value;
        return this;
    };
    CPU.prototype.jump = function (to) {
        var lineToJumpTo;
        if (typeof to === "number") { // if the to represents the line number
            lineToJumpTo = to;
        }
        else if (typeof to === "string") { // if the to represents the label
            lineToJumpTo = this.instructions.findIndex(function (_a) {
                var label = _a.label;
                return label === to;
            }) + 1;
        }
        this.run(this.instructions.slice(lineToJumpTo - 1));
    };
    CPU.prototype.run = function (instructions) {
        if (instructions === void 0) { instructions = this.instructions; }
        this.clear();
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            var name_1 = instruction.name, param = instruction.param;
            if (this.mathOperations.includes(name_1)) {
                var num2 = this.stack.pop();
                var num1 = this.stack.pop();
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
                        this.stack.push(Number(param));
                        break;
                    case "pop":
                        this.stack.pop();
                        break;
                    case "load":
                        this.R = this.stack.pop();
                        break;
                    case "store":
                        this.stack.push(this.R);
                        break;
                    case "jump":
                        return this.jump(param);
                        break;
                    case "jumpz":
                        if (this.stack[this.stack.length - 1] === 0) {
                            return this.jump(param);
                        }
                        break;
                    case "jumpnz":
                        if (this.stack[this.stack.length - 1] !== 0) {
                            return this.jump(param);
                        }
                        break;
                    case "print":
                        console.log(this.stack[this.stack.length - 1]);
                        break;
                    case "stack":
                        console.log(this.stack);
                        break;
                }
            }
        }
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
