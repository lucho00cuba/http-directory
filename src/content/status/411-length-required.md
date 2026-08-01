---
code: 411
title: "Length Required"
slug: "411-length-required"
category: "client-error"
description: "Learn what the HTTP 411 Length Required status code means and how it relates to Content-Length HTTP header."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/411-length-required"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 411 status code indicates that a request lacks a `Content-Length` header.

The `Content-Length` HTTP header contains the size of the request body (in bytes) and should be sent with all requests that have a request body (payload), typically POST, PUT, and PATCH requests.

    Content-Length: 42

`Content-Length` header is ignored when the data `Transfer-Encoding` header is present.
