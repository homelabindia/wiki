---
hide:
  - toc
---

<div class="hli-home" markdown>
<section class="hli-hero">
  <div class="hli-hero__content">
    <p class="hli-kicker">Homelab India Wiki</p>
    <h1>Build a useful lab with parts you can actually buy.</h1>
    <p class="hli-lede">
      Practical hardware, networking, storage, and software notes for people running servers at home in India.
      Start with the constraint in front of you, then follow the guides into a working setup.
    </p>
    <ul class="hli-actions">
      <li><a class="md-button md-button--primary" href="hardware/">Browse hardware</a></li>
      <li><a class="md-button" href="software/">Plan software</a></li>
      <li><a class="md-button" href="software/networking/exposing/">Expose services</a></li>
    </ul>
    <ul class="hli-signal">
      <li>ISP routing</li>
      <li>Power and heat</li>
      <li>Local deals</li>
      <li>Storage math</li>
    </ul>
  </div>
  <div class="hli-rig" aria-label="Homelab hardware examples">
    <figure class="hli-rig__primary">
      <img src="assets/images/fujitsu-server-v0-i2xlzflbnl0g1.webp" alt="Rack server with drive bays">
      <figcaption>rack servers</figcaption>
    </figure>
    <figure class="hli-rig__tall">
      <img src="assets/images/47871af3-d7e4-42ae-9933-8d049ad7bfab.jpg" alt="Compact homelab machine on a desk">
      <figcaption>compact builds</figcaption>
    </figure>
    <figure class="hli-rig__small">
      <img src="assets/images/hdd1.webp" alt="Hard drive for homelab storage">
      <figcaption>storage</figcaption>
    </figure>
  </div>
</section>

<section class="hli-band">
  <div class="hli-section-head">
    <h2>Choose the lane you are solving today.</h2>
    <p>
      The wiki is organized around decisions builders repeat: what to buy, how to run it,
      how to reach it from outside, and where to learn from the community.
    </p>
  </div>
  <div class="hli-lanes">
    <a class="hli-lane" href="hardware/">
      <span class="hli-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="6" rx="1"/><rect x="4" y="14" width="16" height="6" rx="1"/><path d="M8 7h.01M8 17h.01M12 7h4M12 17h4"/></svg>
      </span>
      <h3>Hardware</h3>
      <p>Mini PCs, routers, switches, disks, rack servers, and VPS options that make sense in the Indian market.</p>
      <span>Open hardware guides</span>
    </a>
    <a class="hli-lane" href="software/">
      <span class="hli-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 18h8M10 22h4"/><rect x="4" y="3" width="16" height="12" rx="2"/><path d="m9 8 2 2-2 2M13 12h3"/></svg>
      </span>
      <h3>Software</h3>
      <p>Operating systems, RAID and filesystems, deployment tradeoffs, and the foundations for reliable services.</p>
      <span>Open software guides</span>
    </a>
    <a class="hli-lane" href="software/networking/exposing/">
      <span class="hli-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m8.6 10.6 6.8-3.2M8.6 13.4l6.8 3.2"/></svg>
      </span>
      <h3>Networking</h3>
      <p>Expose services, handle IPv6, measure speed, and pick the access pattern that fits your ISP reality.</p>
      <span>Open networking guides</span>
    </a>
    <a class="hli-lane" href="community-guides/">
      <span class="hli-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11a4 4 0 1 0-8 0"/><path d="M3 21a7 7 0 0 1 18 0"/><path d="M17 4a3 3 0 0 1 2 5M7 4a3 3 0 0 0-2 5"/></svg>
      </span>
      <h3>Community</h3>
      <p>Channels, creators, and contribution routes for sharing builds and keeping the wiki grounded.</p>
      <span>Open community guides</span>
    </a>
  </div>
</section>

<section class="hli-feature">
  <div class="hli-feature__inner">
    <div class="hli-section-head">
      <h2>Built for Indian homelab constraints.</h2>
      <p>
        Global guides are useful, but a working home lab depends on local availability,
        last-mile connectivity, electricity, space, and service exposure choices.
      </p>
    </div>
    <div class="hli-checks">
      <div class="hli-check">
        <strong>Start from what is easy to source.</strong>
        <span>Mini PCs, refurbished enterprise hardware, routers, and disks are covered with practical tradeoffs.</span>
      </div>
      <div class="hli-check">
        <strong>Make networking decisions explicit.</strong>
        <span>Cloudflare Tunnels, VPNs, port forwarding, IPv6, and speed testing sit together instead of being scattered.</span>
      </div>
      <div class="hli-check">
        <strong>Keep the setup maintainable.</strong>
        <span>The software section favors repeatable systems, clear storage choices, and boring recovery paths.</span>
      </div>
    </div>
  </div>
</section>

<section class="hli-band">
  <div class="hli-section-head">
    <h2>Useful starting points.</h2>
    <p>Jump into the pages that usually unblock a new build fastest.</p>
  </div>
  <div class="hli-map">
    <div>
      <strong>01</strong>
      <span><a href="hardware/minipc/">Compare mini PCs</a> before buying the first always-on machine.</span>
    </div>
    <div>
      <strong>02</strong>
      <span><a href="software/operating-system/">Pick an operating system</a> around how much maintenance you want.</span>
    </div>
    <div>
      <strong>03</strong>
      <span><a href="software/raid/">Plan storage</a> before a disk failure makes the lesson expensive.</span>
    </div>
    <div>
      <strong>04</strong>
      <span><a href="software/networking/multiple-ipv6-prefixes/">Handle IPv6 prefixes</a> when your network grows up.</span>
    </div>
  </div>
</section>

<section class="hli-community">
  <div class="hli-community__inner">
    <div class="hli-section-head">
      <h2>Contribute what worked in your setup.</h2>
      <p>
        Homelab India Wiki is community-maintained and not affiliated with r/homelabindia.
        Share fixes, buying notes, and build lessons through GitHub.
      </p>
    </div>
    <div class="hli-community__links">
      <a class="md-button md-button--primary" href="https://github.com/homelabindia/wiki">GitHub</a>
      <a class="md-button" href="https://discord.gg/E2vXJBkpWr">Discord</a>
      <a class="md-button" href="https://www.reddit.com/r/HomelabIND/">r/HomelabIND</a>
    </div>
  </div>
</section>
</div>
