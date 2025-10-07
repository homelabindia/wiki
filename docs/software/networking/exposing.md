# How to expose your HomeLab to the Internet

!!! info
    Decide what you want to expose first. If your usecase is just HTTP or remote access any of the following methods could work for you. This guide was written with the following services in mind:

    - HTTP/s
    - TCP/UDP
    - Torrenting

1. Static IP
2. IPv6
3. Proxying
4. Commercial VPNs (TailScale, ZeroTier)

---

## Static IP

Supports: Everything

By far this is the easiest way to expose your homelab because you don't have to deal with the other challenges that arise with the other methods.

Pros:

- Very stable.
- Easy to diagnose network issues.
- No additional network hops like with ZeroTier.
- Can be used with private torrents.

Cons:

- Pricing can range from ₹299-499 a month, which could have been used to get a VPS instead.

## IPv6

This should work with almost any ISP in India.

## Proxying

Supports: TODO

- Cloudflare Tunnels
- Pangolin

Pros:

Cons:

## Commercial VPNs

Supports: TODO

VPNs like ZeroTier, TailScale come into this category, it uses UDP hole punching to achieve direct p2p connection via an intermediate server. If that fails it uses its relay server.
This is often the best method to access administrative tools because its secure and not exposed to the Internet directly.

Pros:

Cons:
