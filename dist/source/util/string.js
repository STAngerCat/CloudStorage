"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
/**
 * 将base64字符串转换成 url 安全的 base64
 *
 * @param str base64 字符串
 *
 * @returns base64 字符串
 */
function base64ToUrlSafe(str) {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}
exports.base64ToUrlSafe = base64ToUrlSafe;
/**
 * 将字符串转换成 url 安全的 base64 字符串
 *
 * @param str 普通字符串
 *
 * @returns base64 字符串
 */
function urlsafeBase64Encode(str) {
    var encoded = new Buffer(str).toString('base64');
    return base64ToUrlSafe(encoded);
}
exports.urlsafeBase64Encode = urlsafeBase64Encode;
/**
 * Sha1 加密
 *
 * @param encodeString 加密字段
 * @param secretKey 加密 key
 *
 * @returns base64 字符串
 */
function hmacSha1(encodeString, secretKey) {
    let hmac = Crypto.createHmac('sha1', secretKey);
    hmac.update(encodeString);
    return hmac.digest('base64');
}
exports.hmacSha1 = hmacSha1;
