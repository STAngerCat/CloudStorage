import { request, upload, Method, Parameters, Headers } from "../../../network/network";
import { Credentials } from "../security/credentials";
import { URLEncoding } from "../../../network/parameterEncoding";


export class Base {

    private accessKey: string
    private secretKey: string

    private credentials: Credentials

    constructor(accessKey: string, secretKey: string) {
        this.accessKey = accessKey
        this.secretKey = secretKey
        this.credentials = new Credentials(accessKey, secretKey)
    }
    
    protected get(url: URL, parameters?: Parameters, headers: Headers = {}) {
        let accessToken = this.credentials.manageCredentials(url.pathname + url.search)
        headers = Object.assign(headers, {
            "Authorization": `QBox ${accessToken}` 
        })
        return request(url, Method.GET, parameters, headers)
    }

    protected post(url: URL, parameters?: Parameters, headers: Headers = {}) {
        let accessToken = this.credentials.manageCredentials(url.pathname + url.search, URLEncoding(parameters).toString('utf-8'))
        headers = Object.assign(headers, {
            "Authorization": `QBox ${accessToken}`
        })
        return request(url, Method.POST, parameters, headers)
    }
}