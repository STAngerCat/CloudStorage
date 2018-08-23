import { Network } from "../../../request/network";
import * as Config from "../config";
import { RS_HOST, RSF_HOST } from "../defined/host";
import { manageCredentials } from "../security/credentials";

export class Service extends Network {
    private host = 'http://' + RS_HOST

    constructor(secretKey: string, accessKey: string) {
        super()
        Config.Key.secretKey = secretKey
        Config.Key.accessKey = accessKey
    }

    buckets() {
        let url = this.host + '/buckets'
        let credentials = manageCredentials("/buckets")
        return this.request(url, {
            "Authorization": `QBox ${credentials}`
        }).then(response => {
            return new Promise<string[]>((resolve, reject)=>{
                if (response.statusCode == 200) {
                    resolve(response.body)
                } else {
                    reject(response.body)
                }
            })
        })
    }

    list(bucket: string) {
        let path = '/list'
        let url = new URL(RSF_HOST + path)
        url.searchParams.append('bucket', bucket);

        console.log(url)
        let credentials = manageCredentials(url.pathname+url.search)

        return this.request(url.href, {
            "Authorization": `QBox ${credentials}`
        }).then(response => {
            console.log(response.body)
        })
    }
}


let s = new Service("BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk","pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K")


s.list("develop-static")