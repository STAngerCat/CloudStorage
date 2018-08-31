import { Base } from "./base";
import { urlsafeBase64Encode } from "../../../util/string";

export type Region = "z0"|"z1"|"z2"|"na0"|"as0"

export class Bucket extends Base {

    list() {
        let url = "http://rs.qbox.me/buckets"
        this.get(url).then(response=>{
            console.log(response.result.json())
        })
    }

    create(bucketName: string, region: Region = "z0") {
        let url = `http://rs.qiniu.com/mkbucketv2/${urlsafeBase64Encode(bucketName)}/region/${region}`
        this.post(url).then(response => {
            console.log(response.result.json())
        })
    }

    delete(bucketName: string) {
        let url = `http://rs.qiniu.com/drop/${urlsafeBase64Encode(bucketName)}`
        this.post(url).then(response => {
            console.log(response.result.json())
        })
    }

    domain(bucketName: string) {
        let url = `http://api.qiniu.com/v6/domain/list?tbl=${urlsafeBase64Encode(bucketName)}`
        this.get(url).then(response => {
            console.log(response.result.json())
        })
    }

    authority(bucketName: string, isPrivate: boolean) {
        let url = `http://uc.qbox.me/private`
        this.post(url,{
            bucket: urlsafeBase64Encode(bucketName),
            private: isPrivate ? 1 : 0
        }).then(response => {
            console.log(response.result.json())
        })
    }
}
// let nb  = new Bucket("pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K", "BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk")
// nb.list()
// nb.create('test-123')