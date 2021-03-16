"use strict";
exports.__esModule = true;
var evaluateSafely = function (params) {
    var fn = params.fn, errorMsg = params.errorMsg;
    try {
        return fn();
    }
    catch (e) {
        console.log(errorMsg);
        process.exit(1);
    }
};
exports["default"] = evaluateSafely;
