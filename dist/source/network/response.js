"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class Response {
    constructor(err, req, res, result) {
        this.request = req;
        if (err) {
            this.error = new error_1.STError(err);
        }
        else {
            this.headers = res.headers;
        }
        this.code = res.statusCode;
        this.message = res.statusMessage;
        this.httpVersion = res.httpVersion;
        this.result = result;
    }
}
exports.Response = Response;
