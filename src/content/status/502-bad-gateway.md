---
code: 502
title: "Bad Gateway"
slug: "502-bad-gateway"
category: "server-error"
description: "Learn what the HTTP 502 Bad Gateway status code means, when it happens, and how to go about debugging it."
updated: "2026-08-02"
created: "2026-08-02"
referenceUrl: "https://httpguides.com/status/502-bad-gateway"
---

The <abbr title="Hypertext Transfer Protocol">HTTP</abbr> 502 status code means a proxy server (also known as a gateway) didn't receive a _valid_ response from the upstream server (also known as the origin server).

Having a proxy server in front of the application (upstream) server is a common pattern in production web apps. Web servers (acting as reverse proxies) are more efficient at and capable of terminating <abbr title="Transport Layer Security">TLS</abbr> connections, dealing with slow clients, compressing requests, and serving static files quickly. Some popular open-source software used as proxies are Apache, Nginx, HAProxy, Varnish, and Caddy.

Make sure that the upstream server:

- can respond to HTTP requests
- isn't blocked by a firewall
- isn't overloaded with too many requests
- and its hostname can be resolved

## Traefik

<a href="https://traefik.io" target="_blank" rel="noopener">Traefik</a> returns `502 Bad Gateway` when it can't establish a connection to the backend at all — the service is down, the address is wrong, or the connection is refused. The relevant setting is <a href="https://doc.traefik.io/traefik/reference/routing-configuration/http/load-balancing/serverstransport/" target="_blank" rel="noopener">`serversTransport.forwardingTimeouts.dialTimeout`</a> (30 seconds by default), which controls how long Traefik waits for that initial connection before giving up.

    http:
      serversTransports:
        mytransport:
          forwardingTimeouts:
            dialTimeout: 10s
      services:
        my-service:
          loadBalancer:
            serversTransport: mytransport
            servers:
              - url: "http://backend:8080"

If the backend does accept the connection but is slow to respond, you'll get [504 Gateway Timeout](../504-gateway-timeout) instead.
