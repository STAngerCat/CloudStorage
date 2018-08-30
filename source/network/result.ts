export class Result {

    private data: Buffer

    constructor(data: Buffer) {
        this.data = data
    }

    json() {
        let resultString = this.data.toString('utf-8')
        return JSON.parse(resultString)
    }

    text() {
        return this.data.toString('utf-8')
    }
}