import http = require("http")
import fs = require("fs")
import path = require("path")

import { Request, UploadRequest } from "./request";
import { Response } from "./response";
import { Method, Parameters, Headers } from "./defined";


let converRequest = (req: Request): http.RequestOptions => {
    return {
        hostname: req.url.hostname,
        port: req.url.port,
        path: req.url.pathname + req.url.search,
        method: req.method,
        headers: req.headers
    }
}

let createClientRequest = (request: Request, then:(response: Response)=>void): http.ClientRequest => {
    let option = converRequest(request)
    let clientRequest = http.request(option, (res) => {
        let response = new Response(null, request, res)
        then(response)
    })

    clientRequest.on('error', (err) => {
        let response = new Response(err, request, null)
        then(response)
    })
    return clientRequest
}

export function request(url: string, 
    method: Method = Method.GET, 
    parameters?: Parameters, 
    headers?: Headers) {
    let request = new Request(url, method, headers)
    
    if (request.method == Method.GET) {
        request.query(parameters)
    } else {
        request.body(parameters)
    }
    return new Promise<Response>((resolve, reject) => {
        let clientRequest = createClientRequest(request, (response) => {
            resolve(response)
        })

        if (request.method == Method.POST) {
            clientRequest.write(request.data)
        }

        clientRequest.end()
    })
}

export function upload(filePath: string, 
    fileKey: string, 
    url: string, 
    method: Method = Method.POST, 
    parameters: Parameters, 
    headers: Headers = {}) {

    let request = new UploadRequest(url, method, headers)
    return new Promise<Response>((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let filename = path.basename(filePath)
                request.multipartFormData.appendParameters(parameters)
                request.multipartFormData.appendData(data, fileKey, filename)
                let clientRequest = createClientRequest(request, (response) => {
                    resolve(response)
                })
                clientRequest.write(request.data)
                clientRequest.end()
            }
        })
    })
}

/**
formData = "multipart/form-data",
    urlencoded = "application/x-www-form-urlencoded",
    json = "application/json"
 */

let a = request("http://localhost:3000/post", Method.POST, {
    test1: "text2"
}, {
    "Content-Type": "multipart/form-data"
})

