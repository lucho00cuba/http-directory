---
code: 400
title: "Bad Request"
slug: "400-bad-request"
category: "client-error"
description: "Learn what the HTTP 400 Bad Request status code means and when it happens."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/400-bad-request"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 400 status code means a server doesn't want to process a request because of a client error.

It's a generic, catch-all status code that's best used when there aren't [more descriptive status codes available](../../#4xx).

Common causes of `400 Bad Request` errors:

- malformed request body (payload)
- bad/malformed URL
- large request body, headers, or cookies ([413](../413-request-entity-too-large) and [431](../431-request-header-fields-too-large) status codes would be more appropriate in those cases)
- invalid or expired cookie
