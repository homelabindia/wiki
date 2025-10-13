# How to expose your Home Lab to the Internet

This guide was written for popular ISPs in India not local ISPs. If you are using a local ISP try speaking to the
tech team, they might be able to customize to your requirements.


!!! info
    Decide what you want to expose first. If your use case is just HTTP or remote access any of the following methods could work for you. This guide was written with the following services in mind:

    - TCP/UDP
    - Torrenting (i.e being connectable with your torrent tracker aka port forwarding)
    - Public Access Website (i.e without installing software on client machines)

---

## Static IP

Supports: Everything

By far this is the easiest way to expose your homelab because you don't have to deal with the other challenges that arise with the other methods.

Pros:

- Very stable.
- Easy to diagnose network issues.
- No additional network hops like with ZeroTier.
- Can be used with private torrents.
- Can use your static IP as a whitelist for cloud services.

Cons:

- Pricing can range from ₹299-499 a month, which could have been used to get a VPS instead.

## IPv6

Supports: HTTP/s, TCP/UDP, Public Access Website

This should work with almost any ISP in India but you need to configure DDNS which could result in a **downtime** of 5mins
when the IP prefix changes.

MANY private torrent trackers DO NOT support IPv6 and there are VERY little IPv6 peers.

In OpenWRT you can use the DDNS package and use a script to ONLY update the prefix of the IPv6, you do not need to
run DDNS software on every IPv6 host. SLAAC, DHCP reservation or IPv6 tokens can be used for static suffixes.

Pros:

- High speed without additional hops
- Direct p2p connection without additional hops or NAT.

Cons:

- DNS propogation time.
- Clients NEED to support IPv6. Many businesses, schools and colleges DO NOT have IPv6.
- Downtime of 5mins when IP prefix changes. OpenWRT DDNS supports only 5mins DNS updates.

## Cloudflare Tunnels

Supports: NEED RESEARCH, PRs are welcome

Pros:

- Easiest way to host websites on CG-NAT.
- Automatic TLS certificates.

Cons:

- Does not support every protocol.
- Additional network latency.
- Depends on availability of Cloudflare.
- Cloudflare CAN read traffic if not using HTTPs.

## Selfhosted VPN

Supports: Everything

This category is when your run any kind of VPN software on a VPS like WireGuard, Pangolin, etc.

DO NOT ASSIGN VPN IPs to your home LAN, you will get blocked from many websites because you are using a hosting IP.
Create a subnet for your servers and assign VPN IPs there.

We recommend getting Linode because it gives you free /48 IPv6 prefix but you can get any other provider from LowEndBox also.

Pros:

- Can get proper static IPv6 and IPv4.
- Can assign separate IPv6 /64 prefix to VLANs.
- Can run lightweight services in the Cloud itself for higher uptime.

Cons:

- Additional network latency.
- Bandwidth could be limited.
- Additional cost and management of VPS.

## Commercial VPNs

Supports: Everything

VPNs like ZeroTier, TailScale come into this category, it uses UDP hole punching to achieve direct p2p connection via an intermediate server. If that fails it uses its relay server.
This is often the best method to access administrative tools because its secure and not exposed to the Internet directly.

Pros:

- Easy and secure method to access your home network even behind CG-NAT.

Cons:

- Speeds could be unreliable sometimes due to UDP hole punching.
- Will always get slower speeds than WireGuard hosted on a Static IP.

## Dynamic Public IPv4

Rare in India but if your router gets a public IP, you can just use DDNS. Of course this has the same 5mins DNS update
time disadvantage of IPv6 DDNS.
