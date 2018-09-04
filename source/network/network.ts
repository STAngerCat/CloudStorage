import http = require("http")
import fs = require("fs")
import path = require("path")

import { Request, UploadRequest } from "./request";
import { Response } from "./response";
import { Method, Parameters, Headers } from "./defined";
export * from  "./defined";
import { STError } from "./error";
import { Result } from "./result";


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
        let data: Buffer = Buffer.alloc(0)
        res.on('data', (chunck: Buffer) => {
            data = Buffer.concat([data, chunck], data.length + chunck.length)
        })
        res.on('end', () => {
            let result = new Result(data)
            let response = new Response(null, request, res, result)
            then(response)
        })
        res.on('error', (err) => {
            let result = new Result(null, new STError(err))
            let response = new Response(null, request, res, result)
            then(response)
        })
        
    })

    clientRequest.on('error', (err) => {
        let response = new Response(err, request, null)
        then(response)
    })
    return clientRequest
}

export function request(url: URL, 
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
    url: URL, 
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