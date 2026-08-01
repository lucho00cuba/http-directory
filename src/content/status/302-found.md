---
code: 302
title: "Found"
slug: "302-found"
category: "redirection"
description: "Learn what the HTTP 302 Found status code means, how it differs from 307 Temporary Redirect, and how it relates to search engine optimization (SEO)."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/302-found"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 302 status code means a target resource has temporarily moved to a different URL, indicated in the `Location` header.

Unlike with [301](../301-moved-permanently) and [307](../307-temporary-redirect) status codes, 302 signals to clients not to update their links and to keep hitting this endpoint.

    HTTP/2 302 Found
    Location: https://example.com/new

## POST requests

Like with [`301 Moved Permanently`](../301-moved-permanently), some browsers have been incorrectly converting POST requests to GET requests upon encountering a 302 status code. In such cases, POST data is discarded during a redirect, which goes against the HTTP spec, which states that the client should repeat the request with the same method and body.

If you want to be sure that the request will be retried with the same method and body, use [`307 Temporary Redirect`](../307-temporary-redirect).

| Request Method                |            Permanent             |            Temporary             |
| ----------------------------- | :------------------------------: | :------------------------------: |
| Can change from POST to GET   | [301](../301-moved-permanently)  |               302                |
| Can't change from POST to GET | [308](../308-permanent-redirect) | [307](../307-temporary-redirect) |

## Search engines

Upon encountering 302, search engines will not replace the page from their indexes, and this status code doesn't pass the _domain authority_ to a new page. Consider using [`301 Moved Permanently`](../301-moved-permanently) if you want to move a URL to a new location.

Redirects have performance implications, which might negatively impact search engine rankings.
