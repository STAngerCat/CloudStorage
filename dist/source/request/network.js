"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class Network {
    request(url, headers, body) {
        return new Promise((resolve, reject) => {
            request(url, {
                headers: headers,
                body: body
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
}
exports.Network = Network;
