import { Method, Headers } from "./defined";
import { MultipartFormData } from "./multipartFormData";
import { Parameters } from "./defined";
import { ParametersEncoding } from "./parameterEncoding";

export class Request {

	readonly method: Method = Method.GET
	readonly url: URL
	readonly headers: Headers
	readonly multipartFormData: MultipartFormData

	timeout: number = 30

	private _data: Parameters

	get data(): Buffer {
		let data = ParametersEncoding(this._data, this)
		return data
	}

	constructor(url: URL | string, method: Method = Method.GET, headers: Headers) {
		if (typeof url === "string") {
			this.url = new URL(url)
		} else {
			this.url = url
		}
		this.method = method
		this.headers = headers

		if (method == Method.POST && headers['Content-Type'] == "multipart/form-data") {
			this.multipartFormData = new MultipartFormData()
			this.headers['Content-Type'] = this.multipartFormData.contentType
		}
		if (!headers['Content-Type']) {
			headers['Content-Type'] = "application/x-www-form-urlencoded"
		}
	}

	query(serach: Parameters) {
		for (const key in serach) {
			if (serach.hasOwnProperty(key)) {
				const value = serach[key];
				this.url.searchParams.set(key, value)
			}
		}
	}

	body(data: Parameters) {
		this._data = data
	}
}


export class UploadRequest extends Request {

	get data(): Buffer {
		return this.multipartFormData.encode()
	}


	constructor(url: URL | string, method: Method = Method.GET, headers: Headers) {
		headers['Content-Tpye'] = "multipart/form-data"
		super(url, method, headers)
	}

}