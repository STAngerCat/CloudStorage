import { IncomingMessage, IncomingHttpHeaders } from "http";
import { Result } from "./result";
import { Request } from "./request";
import { STError } from "./error";


export class Response {

    readonly code: number
    readonly message: string
    readonly httpVersion: string
    readonly request: Request
    readonly headers: IncomingHttpHeaders
    readonly error?: STError

    readonly result: Result

    constructor(err: Error, req: Request, res: IncomingMessage, result?: Result) {
        this.request = req
        if (err) {
            this.error = new STError(err) 
        } else {
            this.headers = res.headers
        }
        this.code = res.statusCode
        this.message = res.statusMessage
        this.httpVersion = res.httpVersion
        this.result = result
    }
}

