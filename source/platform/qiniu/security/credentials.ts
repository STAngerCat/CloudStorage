import * as Util from "../../../util/string";
import { IPolicy } from "./policy";
import { Key } from "../config";

/**
 * 生成上传凭证
 * 
 * @param policy 上传策略
 * 
 * @returns 上传凭证
 */
export function uploadCredentials(policy: IPolicy): string {

    // 序列化上传策略
    let putPolicy = JSON.stringify(policy)

    // 对策略进行安全的 base64 编码
    let encodedPutPolicy = Util.urlsafeBase64Encode(putPolicy)

    // 生成签名
    let sign = Util.hmacSha1(encodedPutPolicy, Key.secretKey)

    // 对签名进行安全的 base64 编码
    let encodedSign = Util.urlsafeBase64Encode(sign)

    // 生成最后上传凭证
    let uploadToken = `${Key.accessKey}:${encodedSign}:${encodedPutPolicy}`

    return uploadToken
}

/**
 * 生成下载凭证
 * 
 * @param targetUrl 下载 url
 * @param expire  有效期（秒）
 * 
 * @return 下载凭证
 */
export function downloadCredentials(targetUrl: string, expire: number): string {
    let url = new URL(targetUrl)

    // 过期时间时间戳
    let timeStamp = ((new Date()).getTime() + expire / 1000).toFixed(0)
    url.searchParams.append('e', timeStamp)

    // 签名
    let sign = Util.hmacSha1(url.toString(), Key.secretKey)
    let encodedSign = Util.urlsafeBase64Encode(sign)

    // 组成 token
    let token = `${Key.accessKey}:${encodedSign}`
    url.searchParams.append('token', token)

    return url.toString()
}

/**
 * 生成管理凭证
 * 
 * @param url  请求的 url
 * @param body 请求内容（如果有）
 */
export function manageCredentials(url: string, body: string = "") {

    let signingStr = `${url}\n${body}`

    let sign = Util.hmacSha1(signingStr, Key.secretKey)

    let encodedSign = Util.base64ToUrlSafe(sign)

    let accessToken = `${Key.accessKey}:${encodedSign}`

    return accessToken
}


