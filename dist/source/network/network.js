"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const path = require("path");
const request_1 = require("./request");
const response_1 = require("./response");
const defined_1 = require("./defined");
let converRequest = (req) => {
    return {
        hostname: req.url.hostname,
        port: req.url.port,
        path: req.url.pathname + req.url.search,
        method: req.method,
        headers: req.headers
    };
};
let createClientRequest = (request, then) => {
    let option = converRequest(request);
    let clientRequest = http.request(option, (res) => {
        let response = new response_1.Response(null, request, res);
        then(response);
    });
    clientRequest.on('error', (err) => {
        let response = new response_1.Response(err, request, null);
        then(response);
    });
    return clientRequest;
};
function request(url, method = defined_1.Method.GET, parameters, headers) {
    let request = new request_1.Request(url, method, headers);
    if (request.method == defined_1.Method.GET) {
        request.query(parameters);
    }
    else {
        request.body(parameters);
    }
    return new Promise((resolve, reject) => {
        let clientRequest = createClientRequest(request, (response) => {
            resolve(response);
        });
        if (request.method == defined_1.Method.POST) {
            clientRequest.write(request.data);
        }
        clientRequest.end();
    });
}
exports.request = request;
function upload(filePath, fileKey, url, method = defined_1.Method.POST, parameters, headers = {}) {
    let request = new request_1.UploadRequest(url, method, headers);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                let filename = path.basename(filePath);
                request.multipartFormData.appendParameters(parameters);
                request.multipartFormData.appendData(data, fileKey, filename);
                let clientRequest = createClientRequest(request, (response) => {
                    resolve(response);
                });
                clientRequest.write(request.data);
                clientRequest.end();
            }
        });
    });
}
exports.upload = upload;
/**
formData = "multipart/form-data",
    urlencoded = "application/x-www-form-urlencoded",
    json = "application/json"
 */
let a = request("http://localhost:3000/post", defined_1.Method.POST, {
    test1: "text2",
    test2: "text3",
    test3: "text5",
}, {
    "Content-Type": "multipart/form-data"
});
