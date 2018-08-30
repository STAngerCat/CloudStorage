import { Parameters } from "./defined";
import { Request } from "./request";
import { MultipartFormData } from "./multipartFormData";

export enum EncodeType {
    formData = "multipart/form-data",
    urlencoded = "application/x-www-form-urlencoded",
    json = "application/json"
}

export function ParametersEncoding(parameters: Parameters, request: Request): Buffer {
    let conetntType = request.headers['Content-Type']
    if (conetntType == EncodeType.json) {
        return JSONEncoding(parameters)
    } else if (conetntType == EncodeType.urlencoded) {
        return URLEncoding(parameters)
    } else if (conetntType == EncodeType.formData) {
        let  multipartFormData = multipartFormDataEncoding(parameters)
        return multipartFormData.encode()
    } else if (!conetntType) {
        request.headers['Content-Type'] = "application/x-www-form-urlencoded"
        return URLEncoding(parameters)
    } else {
        return null
    }
}

export function multipartFormDataEncoding(parameters: Parameters): MultipartFormData {
    let multipartFormData = new MultipartFormData()
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            multipartFormData.appendString(value, key)
        }
    }
    return multipartFormData
}


export function URLEncoding(parameters: Parameters): Buffer {
    let parametersArray: string[] = []
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            parametersArray.push(`${key}=${value}`)
        }
    }

    return new Buffer(parametersArray.join('&'))
}

export function JSONEncoding(parameters: Parameters): Buffer {
    let jsonString = JSON.stringify(parameters)
    return new Buffer(jsonString)
}
