---
code: 416
title: "Range Not Satisfiable"
slug: "416-range-not-satisfiable"
category: "client-error"
description: "Learn what the HTTP 416 Range Not Satisfiable status code means, when it happens, and how it relates to 206 Partial Content."
updated: "2026-08-02"
created: "2026-08-02"
seeAlso:
  - "206-partial-content"
referenceUrl: "https://httpguides.com/status/416-range-not-satisfiable"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 416 status code means a range request is invalid.

For example, when streaming a video, you might want to receive it in chunks (to save bandwidth if you only need a small fraction of the file). You can request a portion of the file by including the `Range` HTTP header:

    Range: bytes=1337-1842

The above header asks the server to send the slice of the data starting from the 1337th byte up to the 1842nd byte.

If the file doesn't have the requested range (for example, requesting the 100-200 kilobyte range from a 50-kilobyte file), the server will return the `416 Range Not Satisfiable` status code.

If the `Range` header is syntactically invalid, the server will most likely ignore it and return [`200 OK`](../200-ok).

If a `Range` header is valid, but you still get this error, clear your cache and delete your cookies, and try again.

## Try it yourself

Try requesting a range that exceeds the `Content-Length` of a page:

    curl -H 'Range: bytes=4242-5151' https://example.com
