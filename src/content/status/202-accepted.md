---
code: 202
title: "Accepted"
slug: "202-accepted"
category: "success"
description: "Learn what the HTTP 202 Accepted status code means and when it is used."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/202-accepted"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 202 status code means a request was accepted, but the server can't know for sure when or if the processing of the request will take place.

While rarely used, this status code can come in handy when a server accepts jobs for asynchronous or batch processing (for example, creating reports).

Since HTTP doesn't have a mechanism for asynchronous communication like webhooks (_non-committal_ is the term-of-art), clients should resort to polling to find out the final result of their query.

Keep in mind that not all clients can handle this status code properly.
