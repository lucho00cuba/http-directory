---
code: 410
title: "Gone"
slug: "410-gone"
category: "client-error"
description: "Learn what the HTTP 410 Gone status code means, when it is an appropriate code to return, and how it differs from 404 Not Found."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/410-gone"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 410 status code means a resource is gone forever.

`410 Gone` implies that the resource was intentionally removed, and clients shouldn't look for it in the future. Think of it as a more specific version of [`404 Not Found`](../404-not-found), which doesn't imply anything about the future availability of the resource.

When in doubt, use [404](../404-not-found).

## Search engines

Search engines <a href="https://www.youtube.com/watch?v=xp5Nf8ANfOw" target="_blank" rel="noopener">remove the page from their indexes</a> upon encountering the `410 Gone` status code (generally faster than they do with 404s).
