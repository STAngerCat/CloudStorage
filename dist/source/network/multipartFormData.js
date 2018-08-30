"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let crlf = "\r\n";
var BoundaryType;
(function (BoundaryType) {
    BoundaryType[BoundaryType["initial"] = 0] = "initial";
    BoundaryType[BoundaryType["encapsulated"] = 1] = "encapsulated";
    BoundaryType[BoundaryType["final"] = 2] = "final";
})(BoundaryType || (BoundaryType = {}));
class BoundaryGenerator {
    static randomBoundary() {
        return `STNetwork.boundary.${Math.random().toFixed(12).slice(2)}`;
    }
    static boundaryString(boundaryType, boundary) {
        let boundaryText = "";
        switch (boundaryType) {
            case BoundaryType.initial:
                boundaryText = `--${boundary}${crlf}`;
                break;
            case BoundaryType.encapsulated:
                boundaryText = `${crlf}--${boundary}${crlf}`;
                break;
            case BoundaryType.final:
                boundaryText = `${crlf}--${boundary}--${crlf}`;
                break;
        }
        return boundaryText;
    }
}
class BodyPart {
    constructor(headers, bodyBuffer, bodyContentLength) {
        this.hasInitialBoundary = false;
        this.hasFinalBoundary = false;
        this.headers = headers;
        this.bodyBuffer = bodyBuffer;
        this.bodyContentLength = bodyContentLength;
    }
}
class MultipartFormData {
    constructor() {
        this.boundary = BoundaryGenerator.randomBoundary();
        this.bodyParts = [];
        this.contentType = `multipart/form-data; boundary=${this.boundary}`;
    }
    encode() {
        this.bodyParts[0].hasInitialBoundary = true;
        this.bodyParts[this.bodyParts.length - 1].hasFinalBoundary = true;
        let data = Buffer.alloc(0);
        this.bodyParts.forEach((bodyPart, index) => {
            let buffer = this.encodeBodyPart(bodyPart);
            data = Buffer.concat([data, buffer]);
        });
        return data;
    }
    appendParameters(parameters) {
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                const value = parameters[key];
                this.appendString(value, key);
            }
        }
    }
    appendString(data, name) {
        let headers = this.contentHeaders(name);
        let buffer = new Buffer(data);
        let bodyPary = new BodyPart(headers, buffer, buffer.byteLength);
        this.bodyParts.push(bodyPary);
    }
    appendData(data, name, fileName, mimeType) {
        let headers = this.contentHeaders(name, fileName, mimeType);
        let bodyPary = new BodyPart(headers, data, data.byteLength);
        this.bodyParts.push(bodyPary);
    }
    contentHeaders(name, fileName, mimeType) {
        let disposition = `form-data; name=${name}`;
        if (fileName) {
            disposition += `; filename=${fileName}`;
        }
        let headers = { 'Content-Disposition': disposition };
        if (mimeType) {
            headers['Content-Type'] = mimeType;
        }
        return headers;
    }
    encodeBodyPart(bodyPart) {
        let bufferArray = [];
        let initialBuffer = bodyPart.hasInitialBoundary ? this.initialBoundaryBuffer() : this.encapsulatedBoundaryBuffer();
        bufferArray.push(initialBuffer);
        let headerBuffer = this.encodeHeaders(bodyPart.headers);
        bufferArray.push(headerBuffer);
        let bodyBuffer = bodyPart.bodyBuffer;
        bufferArray.push(bodyBuffer);
        if (bodyPart.hasFinalBoundary) {
            bufferArray.push(this.finalBoundaryBuffer());
        }
        return Buffer.concat(bufferArray);
    }
    encodeHeaders(headers) {
        let headerText = "";
        for (var key in headers) {
            let value = headers[key];
            headerText += `${key}: ${value}${crlf}`;
        }
        headerText += crlf;
        return new Buffer(headerText);
    }
    initialBoundaryBuffer() {
        return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.initial, this.boundary));
    }
    encapsulatedBoundaryBuffer() {
        return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.encapsulated, this.boundary));
    }
    finalBoundaryBuffer() {
        return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.final, this.boundary));
    }
}
exports.MultipartFormData = MultipartFormData;
