---
code: 501
title: "Not Implemented"
slug: "501-not-implemented"
category: "server-error"
description: "Learn what the HTTP 501 Not Implemented status code means and how it differs from 405 Method Not Allowed."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/501-not-implemented"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 501 status code means a server can't process the request because it doesn't support a particular feature.

The most common example of this would be sending an unsupported request method to the server.

This status code is similar to [405 Method Not Allowed](../405-method-not-allowed). Semantically, `4xx` are client errors, while `5xx` are server errors. It implies that 405 is appropriate when a client shouldn't have requested the particular method, while 501 means a server doesn't understand the requested method.

## Try it yourself

Send an arbitrary request method using <a href="https://curl.se/docs/manpage.html#-X" target="_blank" rel="noopener">`-X, --request`</a> option in <a href="https://curl.se/" target="_blank" rel="noopener">curl</a>:

    curl -X LOL http://example.com
