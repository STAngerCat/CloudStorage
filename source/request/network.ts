import * as request from 'request'


export class Network {
    protected request(url: string, headers?: request.Headers, body?: any): Promise<request.Response> {
        return new Promise((resolve, reject)=>{
            request(url, {
                headers: headers,
                body: body
            }, (err, response, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            })
        })
    }
}