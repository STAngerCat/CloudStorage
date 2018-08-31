"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const string_1 = require("../../../util/string");
class Bucket extends base_1.Base {
    list() {
        let url = "http://rs.qbox.me/buckets";
        this.get(url).then(response => {
            console.log(response.result.json());
        });
    }
    create(bucketName, region = "z0") {
        let url = `http://rs.qiniu.com/mkbucketv2/${string_1.urlsafeBase64Encode(bucketName)}/region/${region}`;
        this.post(url).then(response => {
            console.log(response.result.json());
        });
    }
    delete(bucketName) {
        let url = `http://rs.qiniu.com/drop/${string_1.urlsafeBase64Encode(bucketName)}`;
        this.post(url).then(response => {
            console.log(response.result.json());
        });
    }
    domain(bucketName) {
        let url = `http://api.qiniu.com/v6/domain/list?tbl=${string_1.urlsafeBase64Encode(bucketName)}`;
        this.get(url).then(response => {
            console.log(response.result.json());
        });
    }
    authority(bucketName, isPrivate) {
        let url = `http://uc.qbox.me/private`;
        this.post(url, {
            bucket: string_1.urlsafeBase64Encode(bucketName),
            private: isPrivate ? 1 : 0
        }).then(response => {
            console.log(response.result.json());
        });
    }
}
exports.Bucket = Bucket;
let nb = new Bucket("pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K", "BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk");
nb.list()
// [ 'maple-mobile', 'develop-static', 'wordpress', 'test-123' ]
// nb.domain('wordpress')
// nb.delete('test')
// nb.create('test');
