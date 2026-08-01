---
code: 303
title: "See Other"
slug: "303-see-other"
category: "redirection"
description: "Learn what the HTTP 303 (See Other) status code means."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/303-see-other"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 303 status code means a redirect to another location, where an _indirect_ response can be found.

Imagine a case where you want to place an order online. You submit a POST or PUT request, and a server redirects you to a confirmation page. To find out if the order was successfully placed, you will have to send a GET request to an endpoint in the `Location` header:

    HTTP/2 303 See Other
    Location: https://example.com/yolo
