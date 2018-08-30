import { IncomingMessage, IncomingHttpHeaders } from "http";
import { Result } from "./result";
import { Request } from "./request";


export class Response {

    readonly request: Request
    readonly headers: IncomingHttpHeaders
    readonly error?: Error

    private incomingMessage?: IncomingMessage

    constructor(err: Error, req: Request, res: IncomingMessage) {
        this.request = req
        if (err) {
            this.error = err
        } else {
            this.headers = res.headers
            this.incomingMessage = res
        }
    }

    result() {
        return new Promise<Result>((resolve, rejcet) => {
            let data: Buffer = Buffer.alloc(0)

            this.incomingMessage.on('data', (chunck: Buffer) => {
                data = Buffer.concat([data, chunck], data.length + chunck.length)
            })

            this.incomingMessage.on('end', () => {
                let result = new Result(data)
                resolve(result)
            })

            this.incomingMessage.on('error', (err) => {
                rejcet(err)
            })
        })
    }
}

