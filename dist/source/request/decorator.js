"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Path(url) {
    return function (target, propertyKey, descriptor) {
    };
}
exports.Path = Path;
function Host(host) {
    return (target, propertyKey, descriptor) => {
    };
}
exports.Host = Host;
function HeaderParam() {
    return (target, propertyKey, paramIndex) => {
    };
}
exports.HeaderParam = HeaderParam;
function QueryParam(key) {
    return (target, propertyKey, paramIndex) => {
    };
}
exports.QueryParam = QueryParam;
function Body() {
    return (target, propertyKey, paramIndex) => {
    };
}
exports.Body = Body;
