---
code: 412
title: "Precondition Failed"
slug: "412-precondition-failed"
category: "client-error"
description: "Learn what the HTTP 412 Precondition Failed status code means and how it relates to conditional HTTP requests."
updated: "2026-08-02"
created: "2026-08-02"
seeAlso:
  - "428-precondition-required"
referenceUrl: "https://httpguides.com/status/412-precondition-failed"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 412 status code happens when a client can't meet a precondition in a conditional request.

HTTP supports conditional requests (requests that contain one or more `If-*` headers), which are often used in caching. Conditional requests can also be used to verify the integrity of files via checksums.

If a client doesn't meet one of the preconditions, the server returns `412 Precondition Failed`.

    GET /git HTTP/2

    HTTP/2 200 OK
    ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

When a client wants to update a resource, it can include the `If-Match` to make sure no one has updated the resource in the interim; otherwise, that update would be lost (_lost update problem_ is the term-of-art).

    PUT /git
    If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

If the current hash of the resource (`ETag`) doesn't match the hash in the `If-Match` header, the server will respond with `412 Precondition Failed`.
