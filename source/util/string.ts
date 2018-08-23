import * as Crypto from "crypto";

/**
 * 将base64字符串转换成 url 安全的 base64
 * 
 * @param str base64 字符串
 * 
 * @returns base64 字符串
 */
export function base64ToUrlSafe(str: string): string {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}

/**
 * 将字符串转换成 url 安全的 base64 字符串
 * 
 * @param str 普通字符串
 * 
 * @returns base64 字符串
 */
export function urlsafeBase64Encode(str: string): string {
    var encoded = new Buffer(str).toString('base64');
    return base64ToUrlSafe(encoded);
}

/**
 * Sha1 加密
 * 
 * @param encodeString 加密字段
 * @param secretKey 加密 key
 * 
 * @returns base64 字符串
 */
export function hmacSha1(encodeString: string, secretKey: string): string {
    let hmac = Crypto.createHmac('sha1', secretKey)
    hmac.update(encodeString)
    return hmac.digest('base64')
}
