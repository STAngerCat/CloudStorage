"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../../../network/network");
const credentials_1 = require("../security/credentials");
const parameterEncoding_1 = require("../../../network/parameterEncoding");
class Base {
    constructor(accessKey, secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.credentials = new credentials_1.Credentials(accessKey, secretKey);
    }
    get(urlString, parameters, headers = {}) {
        let url = new URL(urlString);
        let accessToken = this.credentials.manageCredentials(url.pathname + url.search);
        headers = Object.assign(headers, {
            "Authorization": `QBox ${accessToken}`
        });
        return network_1.request(urlString, network_1.Method.GET, parameters, headers);
    }
    post(urlString, parameters, headers = {}) {
        let url = new URL(urlString);
        let accessToken = this.credentials.manageCredentials(url.pathname + url.search, parameterEncoding_1.URLEncoding(parameters).toString('utf-8'));
        headers = Object.assign(headers, {
            "Authorization": `QBox ${accessToken}`
        });
        return network_1.request(urlString, network_1.Method.POST, parameters, headers);
    }
}
exports.Base = Base;
