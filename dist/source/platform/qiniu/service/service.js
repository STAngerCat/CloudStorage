"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../../../request/network");
const Config = require("../config");
const host_1 = require("../defined/host");
const credentials_1 = require("../security/credentials");
class Service extends network_1.Network {
    constructor(secretKey, accessKey) {
        super();
        this.host = 'http://' + host_1.RS_HOST;
        Config.Key.secretKey = secretKey;
        Config.Key.accessKey = accessKey;
    }
    buckets() {
        let url = this.host + '/buckets';
        let credentials = credentials_1.manageCredentials("/buckets");
        return this.request(url, {
            "Authorization": `QBox ${credentials}`
        }).then(response => {
            return new Promise((resolve, reject) => {
                if (response.statusCode == 200) {
                    resolve(response.body);
                }
                else {
                    reject(response.body);
                }
            });
        });
    }
    list(bucket) {
        let path = '/list';
        let url = new URL("http://"+host_1.RSF_HOST + path);
        url.searchParams.append('bucket', bucket);
        console.log(url);
        let credentials = credentials_1.manageCredentials(url.pathname + url.search);
        return this.request(url.href, {
            "Authorization": `QBox ${credentials}`
        }).then(response => {
            console.log(response.body);
        });
    }
}
exports.Service = Service;
let s = new Service("BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk", "pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K");
s.list("develop-static");
