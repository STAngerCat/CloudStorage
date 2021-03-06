"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(data, err) {
        this.data = data;
        this.error = err;
    }
    json() {
        let resultString = this.data.toString('utf-8');
        return JSON.parse(resultString);
    }
    text() {
        return this.data.toString('utf-8');
    }
}
exports.Result = Result;
