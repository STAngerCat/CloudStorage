import { STError } from "./error";

export class Result {

    private data: Buffer

    readonly error?: STError


    constructor(data?: Buffer, err?: STError) {
        this.data = data
        this.error = err
    }

    json() {
        let resultString = this.data.toString('utf-8')
        return JSON.parse(resultString)
    }

    text() {
        return this.data.toString('utf-8')
    }
}