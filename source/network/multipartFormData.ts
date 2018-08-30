import { Headers } from "./defined";
import { Parameters } from "./defined";

let crlf = "\r\n"

enum BoundaryType {
	initial,
	encapsulated,
	final
}

class BoundaryGenerator {
	static randomBoundary(): string {
		return `STNetwork.boundary.${Math.random().toFixed(12).slice(2)}`
	}

	static boundaryString(boundaryType: BoundaryType, boundary: string): string {
		let boundaryText: string = ""
		switch (boundaryType) {
			case BoundaryType.initial:
				boundaryText = `--${boundary}${crlf}`
				break;
			case BoundaryType.encapsulated:
				boundaryText = `${crlf}--${boundary}${crlf}`
				break;
			case BoundaryType.final:
				boundaryText = `${crlf}--${boundary}--${crlf}`
				break;
		}

		return boundaryText
	}
}

class BodyPart {
	headers: Headers
	bodyBuffer: Buffer
	bodyContentLength: number
	hasInitialBoundary = false
	hasFinalBoundary = false

	constructor(headers: Headers, bodyBuffer: Buffer, bodyContentLength: number) {
		this.headers = headers
		this.bodyBuffer = bodyBuffer
		this.bodyContentLength = bodyContentLength
	}
}


export class MultipartFormData {

	private boundary = BoundaryGenerator.randomBoundary()

	private bodyParts: BodyPart[] = []

	readonly contentType = `multipart/form-data; boundary=${this.boundary}`

	readonly bodyPartError?: Error

	constructor() {

	}

	encode(): Buffer {
		this.bodyParts[0].hasInitialBoundary = true
		this.bodyParts[this.bodyParts.length - 1].hasFinalBoundary = true

		let data = Buffer.alloc(0)


		this.bodyParts.forEach((bodyPart, index)=>{
			let buffer = this.encodeBodyPart(bodyPart)
			data = Buffer.concat([data, buffer])
		})

		return data
	}

	appendParameters(parameters: Parameters) {
		for (const key in parameters) {
			if (parameters.hasOwnProperty(key)) {
				const value = parameters[key]
				this.appendString(value, key)
			}
		}
	}

	appendString(data: string, name: string) {
		let headers = this.contentHeaders(name)
		let buffer = new Buffer(data)
		let bodyPary = new BodyPart(headers, buffer, buffer.byteLength)
		this.bodyParts.push(bodyPary)
	}

	appendData(data: Buffer, name: string, fileName?: string, mimeType?: string) {
		let headers = this.contentHeaders(name, fileName, mimeType)
		let bodyPary = new BodyPart(headers, data, data.byteLength)
		this.bodyParts.push(bodyPary)
	}

	private contentHeaders(name: string, fileName?: string, mimeType?: string): Headers {
		let disposition = `form-data; name=${name}`
		if (fileName) {
			disposition += `; filename=${fileName}`
		}
		let headers = { 'Content-Disposition': disposition }
		if (mimeType) {
			headers['Content-Type'] = mimeType
		}

		return headers
	}

	private encodeBodyPart(bodyPart: BodyPart): Buffer {

		let bufferArray: Buffer[] = []

		let initialBuffer = bodyPart.hasInitialBoundary ? this.initialBoundaryBuffer() : this.encapsulatedBoundaryBuffer()
		bufferArray.push(initialBuffer)

		let headerBuffer = this.encodeHeaders(bodyPart.headers)
		bufferArray.push(headerBuffer)

		let bodyBuffer = bodyPart.bodyBuffer
		bufferArray.push(bodyBuffer)

		if (bodyPart.hasFinalBoundary) {
			bufferArray.push(this.finalBoundaryBuffer())
		}

		return Buffer.concat(bufferArray)
	}


	private encodeHeaders(headers: Headers): Buffer {
		let headerText = ""

		for (var key in headers) {
			let value = headers[key]
			headerText += `${key}: ${value}${crlf}`
		}

		headerText += crlf

		return new Buffer(headerText)
	}



	private initialBoundaryBuffer(): Buffer {
		return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.initial, this.boundary))
	}

	private encapsulatedBoundaryBuffer(): Buffer {
		return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.encapsulated, this.boundary))
	}

	private finalBoundaryBuffer(): Buffer {
		return new Buffer(BoundaryGenerator.boundaryString(BoundaryType.final, this.boundary))
	}
}