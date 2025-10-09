# What Do You Need to Set Up a Homelab?

Setting up a homelab depends entirely on the type of services you want to run.

If you’re planning to self-host apps like Nextcloud, Immich, Jellyfin, or qBittorrent, then a setup with at least 4 cores and 8 threads (4C/8T) will work fine.
However, keep in mind that running multiple services at once can quickly lead to CPU and I/O bottlenecks — so performance might not be great on lower-end systems.

---

## Hardware Recommendations

| CPU Cores | Recommended RAM | Ideal Use Case / Services                                                       |
| --------- | --------------- | ------------------------------------------------------------------------------- |
| 1 Core    | 1–2 GB          | Simple DNS server (Pi-hole, AdGuard), small automation tasks using bash scripts |
| 2 Cores   | 2–4 GB          | Lightweight services (Uptime Kuma, Dashboards)                                  |
| 4 Cores   | 8 GB            | Nextcloud, Jellyfin, qBittorrent, Immich                                        |
| 6–8 Cores | 16 GB+          | Above services with better performance and small-scale Kubernetes(k3s)          |
| 12+ Cores | 32 GB+          | Full home server with virtualization (Proxmox, TrueNAS, Docker Swarm, etc.)     |
---
## Can I Start with a Raspberry Pi?
Yes, you absolutely can — it’s cheap, compact, and beginner-friendly.
But there are a few limitations you should know:

* You can’t upgrade the CPU or RAM later — what you buy is what you’re stuck with.
* Storage expansion requires additional adapters or connectors (like SATA or NVMe bridges).
* Limited performance for heavy workloads like media transcoding or Immich ML tasks.

If your goal is to learn, experiment, or run lightweight services, the Pi is a great start.
But if you plan to host heavy workloads — a used mini PC or old laptop might give you a much better experience.
