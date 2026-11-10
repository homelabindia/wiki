---
icon: 'material/server-security'
---

# VPS

We only recommend high uptime VPS and good reliability.

## Hyperscalers

Very expensive providers but offers lot of features like S3 compatible storage, serverless computing, CDNs, etc.

- AWS
- GCP
- Azure

## Big Providers

Cheaper than Hyperscalers but better pricing, support and easy of use.

- Vultr (Highest performance of the three in Geekbench & offers 3 datacenters in India)
- Linode (Akamai)
- Digital Ocean

## Small Providers

HostDZire (LeaseWeb reseller), GreenCloud

## Finding an affordable VPS

*By techno*

Look for a public IP, support for the required tunnel traffic and a good route to your home and users. CPU and RAM matter, but so do transfer limits and the provider's recovery tools. For a Pangolin gateway, start with [Pangolin's VPS selection guidance](https://docs.pangolin.net/self-host/choosing-a-vps) for sizing and requirements.

### OCI Always Free

OCI can keep the gateway's hosting cost at **US$0 within the applicable free allowances**. Domain registration and any chargeable resources are separate expenses. Free compute capacity is not guaranteed.

Use these official guides in order:

1. **[Register for Oracle Cloud](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingup_topic-Sign_Up_for_Free_Oracle_Cloud_Promotion.htm).** Choose the home region carefully because it cannot be changed later. Check whether Mumbai or Hyderabad is offered and suitable. Signup includes payment verification; a temporary card hold may appear.
2. **[Check Always Free eligibility and limits](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).** Verify the compute shape, memory, boot volume and transfer allowances against your existing usage. Trial credit and Always Free are different; a resource covered by trial credit may become chargeable later.
3. **[Create and connect to a Linux instance](https://docs.oracle.com/en-us/iaas/Content/Compute/tutorials/first-linux-instance/overview.htm).** Use an eligible image and shape, with a public IP and working internet routing. The tutorial explains networking and SSH access; select resources within your free allowance.

If capacity is unavailable, waiting or trying another offered availability domain may help. A paid upgrade does not guarantee free capacity. Review the [upgrade terms](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm) before changing account type. On a paid account, [budget alerts](https://docs.oracle.com/en-us/iaas/Content/Billing/Concepts/budgetsoverview.htm) provide notifications rather than a hard spending cap.

### Discounted VPS hosting in India

The forum usually shortened to **LET** is [LowEndTalk](https://lowendtalk.com/categories/offers). [LowEndBox](https://lowendbox.com/) is a related deals site. Black Friday and Cyber Monday are useful times to look for annual offers.

**Around US$20–30 per year is a sale-shopping target**, subject to stock, exchange rates and additional charges. As an example, an early Black Friday offer checked on **4 November 2026** advertised a Mumbai VPS at **€21/year**, with 2 vCPUs, 4 GB RAM and 40 GB NVMe storage. This is a dated provider advertisement, not a reliability recommendation. [Original offer and terms](https://lowendtalk.com/discussion/222164/early-black-friday-sale-vps-dedicated-server-deals-starting-at-just-18-year)

Check the actual server location, public IPv4 inclusion, permitted Docker/UDP use, renewal price, taxes, transfer accounting and recovery console. Read independent customer reports as well as the offer. An Indian provider can also sell servers located overseas.

Transfer accounting deserves particular attention for a gateway. If a provider counts both incoming and outgoing traffic, relaying 10 GB through the VPS can consume roughly 20 GB of its allowance, before overhead. Confirm the provider's definition, overage policy and final checkout total before ordering.

*AI assistance was used for drafting, formatting and sentence structure.*
