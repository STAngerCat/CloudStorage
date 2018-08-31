/**
 * 公共头部
 */
export interface Header {
    /**
     * 用于验证请求合法性的认证信息。该头部应严格按照管理凭证或上传凭证格式进行填充，否则会返回 401 错误码。例如Authorization: QBox j853F3bLkWl59I5BOkWm6q1Z1 ...或Authorization: UpToken QNJi_bYJlmO5LeY08FfoNj9w_r...。
     */
    Authorization: string;
    /**
     * 请求或响应内容长度，单位字节。例如Content-Length: 299
     */
    'Content-Length' : string;
    /**
     * 请求或响应内容的 MIME 类型。例如Content-Type: application/json。
     */
    'Content-Type': TContentType;
    /**
     * 上传服务器域名。例如Host: rsf.qbox.me。
     */
    Host: string;
    /**
     * 标明客户端与服务器之间的通信状态。例如Connection: keep-alive。
     */
    Connection: string;
    /**
     * 服务器端响应时间。例如Date: Wed, 22 Nov 2017 01:52:39 GMT。
     */
    Date: string;
    /**
     * Etag 是 Object 被创建时用于标识 Object 内容的。ETag 值反映 Object 内容是否发生变化，ETag 返回值根据不同请求的情况选择。例如ETag: "lrMxbjcfPyC7F1siA6tF78B1IMAq"。
     */
    Etag: string;
    /**
     * 生成响应的服务器名称。例如Server: nginx。
     */
    Server: string;
    /**
     * 上传请求的唯一 ID。通过该 ID 可快速定位用户请求的相关日志。在联系技术支持时提供该 ID 可快速解决问题。例如X-Reqid: BlcAAAFP_Hx-RfkU。
     */
    'X-Reqid': string;
    /**
     * 用于快速定位问题的参考信息。例如X-Log: RSF:102;RSF:103;ZONEPROXY:105。
     */
    'X-Log': string;
}

export type TContentType = string | 'application/x-www-form-urlencoded' | 'application/json' | 'multipart/form-data' | 'application/xml' | 'text/javascript' | 'text/css' | 'text/plain' | 'text/html' | 'application/octet-stream'