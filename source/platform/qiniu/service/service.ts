import { RS_HOST, RSF_HOST } from "../defined/host";
import { manageCredentials } from "../security/credentials";

// import { Host, Path, Body } from "../../../request/decorator";
import { Bucket } from "./bucket";

class Service {
    private secretKey: string
    private accessKey: string

    private _bucket: Bucket
    
    public get bucket(): Bucket {
        if (!this._bucket) {
            this._bucket = new Bucket(this.accessKey, this.secretKey)
        }
        return this._bucket
    }


    constructor(accessKey: string, secretKey: string) {
        this.accessKey = accessKey
        this.secretKey = secretKey
    }
    
}

// export class Service {
//     private host = 'http://' + RS_HOST

//     constructor(secretKey: string, accessKey: string) {

//         Config.Key.secretKey = secretKey
//         Config.Key.accessKey = accessKey
//     }
    
//     @Host(RS_HOST)
//     @Path('/buckets')
//     buckets() {
        
//         // let url = this.host + '/buckets'
//         // let credentials = manageCredentials("/buckets")
//         // return this.request(url, {
//         //     "Authorization": `QBox ${credentials}`
//         // }).then(response => {
//         //     return new Promise<string[]>((resolve, reject)=>{
//         //         if (response.statusCode == 200) {
//         //             resolve(response.body)
//         //         } else {
//         //             reject(response.body)
//         //         }
//         //     })
//         // })
//     }

//     @Host(RSF_HOST)
//     @Path('/list')
//     list(bucket: string) {
//         // let url = new URL('http://'+RSF_HOST + path)
//         // url.searchParams.append('bucket', bucket);
//         // let credentials = manageCredentials(url.pathname+url.search)
//         console.log('list call')
//         // return this.request(url.href, {
//         //     "Authorization": `QBox ${credentials}`
//         // }).then(response => {
//         //     console.log(response.body)
//         // })
//     }
// }


// let s = new Service("BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk","pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K")


// s.list("develop-static")