"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multipartFormData_1 = require("./multipartFormData");
var EncodeType;
(function (EncodeType) {
    EncodeType["formData"] = "multipart/form-data";
    EncodeType["urlencoded"] = "application/x-www-form-urlencoded";
    EncodeType["json"] = "application/json";
})(EncodeType = exports.EncodeType || (exports.EncodeType = {}));
function ParametersEncoding(parameters, request) {
    let conetntType = request.headers['Content-Type'];
    if (conetntType == EncodeType.json) {
        return JSONEncoding(parameters);
    }
    else if (conetntType == EncodeType.urlencoded) {
        return URLEncoding(parameters);
    }
    else if (conetntType == EncodeType.formData) {
        let multipartFormData = multipartFormDataEncoding(parameters);
        return multipartFormData.encode();
    }
    else if (!conetntType) {
        request.headers['Content-Type'] = "application/x-www-form-urlencoded";
        return URLEncoding(parameters);
    }
    else {
        return null;
    }
}
exports.ParametersEncoding = ParametersEncoding;
function multipartFormDataEncoding(parameters) {
    let multipartFormData = new multipartFormData_1.MultipartFormData();
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            multipartFormData.appendString(value, key);
        }
    }
    return multipartFormData;
}
exports.multipartFormDataEncoding = multipartFormDataEncoding;
function URLEncoding(parameters) {
    let parametersArray = [];
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            parametersArray.push(`${key}=${value}`);
        }
    }
    return Buffer.from(parametersArray.join('&'));
}
exports.URLEncoding = URLEncoding;
function JSONEncoding(parameters) {
    let jsonString = JSON.stringify(parameters);
    return Buffer.from(jsonString);
}
exports.JSONEncoding = JSONEncoding;
