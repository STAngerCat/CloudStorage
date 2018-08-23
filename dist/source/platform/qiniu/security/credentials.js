"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("../../../util/string");
const config_1 = require("../config");
/**
 * 生成上传凭证
 *
 * @param policy 上传策略
 *
 * @returns 上传凭证
 */
function uploadCredentials(policy) {
    // 序列化上传策略
    let putPolicy = JSON.stringify(policy);
    // 对策略进行安全的 base64 编码
    let encodedPutPolicy = Util.urlsafeBase64Encode(putPolicy);
    // 生成签名
    let sign = Util.hmacSha1(encodedPutPolicy, config_1.Key.secretKey);
    // 对签名进行安全的 base64 编码
    let encodedSign = Util.urlsafeBase64Encode(sign);
    // 生成最后上传凭证
    let uploadToken = `${config_1.Key.accessKey}:${encodedSign}:${encodedPutPolicy}`;
    return uploadToken;
}
exports.uploadCredentials = uploadCredentials;
/**
 * 生成下载凭证
 *
 * @param targetUrl 下载 url
 * @param expire  有效期（秒）
 *
 * @return 下载凭证
 */
function downloadCredentials(targetUrl, expire) {
    let url = new URL(targetUrl);
    // 过期时间时间戳
    let timeStamp = ((new Date()).getTime() + expire / 1000).toFixed(0);
    url.searchParams.append('e', timeStamp);
    // 签名
    let sign = Util.hmacSha1(url.toString(), config_1.Key.secretKey);
    let encodedSign = Util.urlsafeBase64Encode(sign);
    // 组成 token
    let token = `${config_1.Key.accessKey}:${encodedSign}`;
    url.searchParams.append('token', token);
    return url.toString();
}
exports.downloadCredentials = downloadCredentials;
/**
 * 生成管理凭证
 *
 * @param url  请求的 url
 * @param body 请求内容（如果有）
 */
function manageCredentials(url, body = "") {
    let signingStr = `${url}\n${body}`;
    let sign = Util.hmacSha1(signingStr, config_1.Key.secretKey);
    let encodedSign = Util.base64ToUrlSafe(sign);
    let accessToken = `${config_1.Key.accessKey}:${encodedSign}`;
    return accessToken;
}
exports.manageCredentials = manageCredentials;
