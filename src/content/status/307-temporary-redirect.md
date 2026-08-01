---
code: 307
title: "Temporary Redirect"
slug: "307-temporary-redirect"
category: "redirection"
description: "Learn what the HTTP 307 Temporary Redirect status code means, how it differs from HTTP 302 Found, and how it relates to the Strict Transport Security (HSTS)."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/307-temporary-redirect"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 307 status code means a requested resource has been temporarily moved to a different location.

The new (relative) URL is indicated by a `Location` header:

    Location: /now

## 307 vs 302

`307 Temporary Redirect` is similar to [`302 Found`](../302-found) in that they both indicate a temporary redirect.

Some browsers, like Mosaic, Netscape, and Internet Explorer, have been incorrectly switching to GET requests upon encountering the [302](../302-found) status code, even if the original request was done with a different HTTP method. With 307, the method and request body of the previous request will be reused for the subsequent request.

| Request Method                |            Permanent             |      Temporary      |
| ----------------------------- | :------------------------------: | :-----------------: |
| Can change from POST to GET   | [301](../301-moved-permanently)  | [302](../302-found) |
| Can't change from POST to GET | [308](../308-permanent-redirect) |         307         |

## Browser support

`307 Temporary Redirect` was introduced in HTTP/1.1, while [`302 Found`](../302-found) first appeared in HTTP/1.0 (1999). If the backward compatibility with ancient clients is a consideration, use [302](../302-found).

## Strict Transport Security (HSTS)

`Strict-Transport-Security` (HSTS) is an HTTP header that protects websites against protocol downgrade and cookie hijacking attacks.

If you add the `preload` directive to your HSTS header and <a href="https://hstspreload.org" target="_blank" rel="noopener">request your domain to be preloaded</a>, your domain will eventually be added to the preload list, which is shared among major browsers.

After your domain is preloaded, whenever someone tries to access your website over an unencrypted connection (`http://`), most modern browsers will issue an internal redirect to an encrypted version (`https://`) of the website with a 307 status code.
