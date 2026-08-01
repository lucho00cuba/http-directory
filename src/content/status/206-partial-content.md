---
code: 206
title: "Partial Content"
slug: "206-partial-content"
category: "success"
description: "Learn what the HTTP 206 Partial Content status code means and how it relates to range requests."
updated: "2026-08-02"
created: "2026-08-02"
seeAlso:
  - "416-range-not-satisfiable"
referenceUrl: "https://httpguides.com/status/206-partial-content"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 206 is a response code servers use for successful range requests.

For example, when streaming a video, you may want to receive it in chunks (to save bandwidth if you only need a small fraction of the file). You can request a portion of the file by including the `Range` HTTP header:

    Range: bytes=0-

The above header requests the server to send a slice of the data starting from the 0th byte and beyond. This is also known as byte serving or range requests.

If the range is valid and the server supports range requests, you will receive the requested chunk with a `206 Partial Content` status code. When responding to a range request, the server includes the `Content-Range` header indicating which bytes server is responding with:

    HTTP/2 206 Partial Content
    Accept-Ranges: bytes
    Content-Range: bytes 0-1459/4242
    Content-Length: 1500

The above `Content-Range` header means that the server returned the first 1500 bytes of the file, and the total file size is 4242 bytes.

Servers are free to ignore the `Range` header, in which case they will return the entire resource in one swoop with a [`200 OK`](../200-ok) status code.

## Transport layer

Range requests happen on the application layer (HTTP).

Regardless of whether a client uses a range request, the data will be broken down into small chunks and transported in <abbr title="Transmission Control Protocol">TCP</abbr> or <abbr title="User Datagram Protocol">UDP</abbr> packets.

## Try it yourself

    curl --verbose -H 'Range: bytes=0-' https://example.com
