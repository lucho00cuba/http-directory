---
code: 205
title: "Reset Content"
slug: "205-reset-content"
category: "success"
description: "Learn what the HTTP 205 Reset Content status code means and why you shouldn't use it."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/205-reset-content"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 205 status code means a request was successful, and the user agent should _reset_ the document view to its original form.

Theoretically, after a user submits an <abbr title="Hypertext Markup Language">HTML</abbr> form, a browser should clear the form upon receiving the `205 Reset Content` response. Similar to [`204 No Content`](../204-no-content), servers shouldn't include a response body (payload) with `205 Reset Content`.

Most clients don't handle this response code properly, so you're better off using either the [`200 OK`](../200-ok) or [`204 No Content`](../204-no-content) status codes.
