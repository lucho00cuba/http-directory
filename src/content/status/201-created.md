---
code: 201
title: "Created"
slug: "201-created"
category: "success"
description: "Learn what the HTTP 201 Created status code means, why API developers use it, and how it differs from 200 OK."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/201-created"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 201 status code means a request was successful, and a new resource has been created.

`201 Created` status code is commonly used as a response to POST and PUT requests that create new resources. For example, if you interact with a billing API, 201 is an appropriate code if your request creates a new subscription.

With PUT requests, you specify the new location yourself, while with POST requests, the server takes care of it.

    POST /websites
    Content-Type: application/json

In response to POST requests, the server will also include a `Location` header containing the URL of a newly created resource:

    HTTP/2 201 Created
    Location: /websites/42

## 201 vs 200

Both [200](../200-ok) and 201 status codes signal that the resource was successfully created.

The only difference is that with [`200 OK`](../200-ok), you would return <a href="https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1" target="_blank" rel="noopener">the resource in the response body</a> (for requests that create a resource), while with 201, <a href="https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2" target="_blank" rel="noopener">only the reference would be sufficient</a>.
