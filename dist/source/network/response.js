"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
class Response {
    constructor(err, req, res) {
        this.request = req;
        if (err) {
            this.error = err;
        }
        else {
            this.headers = res.headers;
            this.incomingMessage = res;
        }
    }
    result() {
        return new Promise((resolve, rejcet) => {
            let data = Buffer.alloc(0);
            this.incomingMessage.on('data', (chunck) => {
                data = Buffer.concat([data, chunck], data.length + chunck.length);
            });
            this.incomingMessage.on('end', () => {
                let result = new result_1.Result(data);
                resolve(result);
            });
            this.incomingMessage.on('error', (err) => {
                rejcet(err);
            });
        });
    }
}
exports.Response = Response;
