---
code: 426
title: "Upgrade Required"
slug: "426-upgrade-required"
category: "client-error"
description: "Learn what the HTTP 426 Upgrade Required status code means and how it relates to WebSocket connections."
updated: "2026-08-02"
created: "2026-08-02"
seeAlso:
  - "101-switching-protocols"
referenceUrl: "https://httpguides.com/status/426-upgrade-required"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 426 status code means a server doesn't want to accept the current protocol and wants the client to switch to a different protocol (for example, HTTP/1.1 to WebSocket) or a newer version of the same protocol (for example, HTTP/2 to HTTP/3).

The server responds with the `Upgrade` header indicating the protocol they are willing to accept:

    HTTP/1.1 426 Upgrade Required
    Connection: Upgrade
    Upgrade: WebSocket

## WebSocket

A server is supposed to return `426 Upgrade Required` when the WebSocket <a href="https://datatracker.ietf.org/doc/html/rfc6455#section-4.2.2" target="_blank" rel="noopener">handshake fails due to an incorrect protocol version</a>
(as presented in the `Sec-WebSocket-Version` HTTP header).

Typically, a WebSocket server will respond with the supported version(s) of the protocol:

    Sec-WebSocket-Version: 13, 8, 7
