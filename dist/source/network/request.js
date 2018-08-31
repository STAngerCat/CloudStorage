"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defined_1 = require("./defined");
const multipartFormData_1 = require("./multipartFormData");
const parameterEncoding_1 = require("./parameterEncoding");
class Request {
    constructor(url, method = defined_1.Method.GET, headers) {
        this.method = defined_1.Method.GET;
        this.timeout = 30;
        if (typeof url === "string") {
            this.url = new URL(url);
        }
        else {
            this.url = url;
        }
        this.method = method;
        this.headers = headers;
        if (method == defined_1.Method.POST && headers['Content-Type'] == "multipart/form-data") {
            this.multipartFormData = new multipartFormData_1.MultipartFormData();
            this.headers['Content-Type'] = this.multipartFormData.contentType;
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = "application/x-www-form-urlencoded";
        }
    }
    get data() {
        let data = parameterEncoding_1.ParametersEncoding(this._data, this);
        return data;
    }
    query(serach) {
        for (const key in serach) {
            if (serach.hasOwnProperty(key)) {
                const value = serach[key];
                this.url.searchParams.set(key, value);
            }
        }
    }
    body(data) {
        this._data = data;
    }
}
exports.Request = Request;
class UploadRequest extends Request {
    get data() {
        return this.multipartFormData.encode();
    }
    constructor(url, method = defined_1.Method.GET, headers) {
        headers['Content-Tpye'] = "multipart/form-data";
        super(url, method, headers);
    }
}
exports.UploadRequest = UploadRequest;
