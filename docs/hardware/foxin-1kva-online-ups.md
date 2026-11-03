# Foxin 1kVA Online UPS Review and NUT Graceful Shutdown Guide

I bought the Foxin 1kVA online UPS in May 2026 for **₹14,400 after Amazon discounts**. The main reason was to keep workstation and networking equipment running through power cuts. Some of that equipment could restart during the changeover on a home inverter.

The UPS handled those transitions well. It also turned out to support Network UPS Tools (NUT) over USB, making it useful for monitoring and automatic shutdown of Linux and Proxmox systems.

The measured backup time was **15–20 minutes at approximately 400–450W**. Fan noise is the main drawback: it is noticeable even when mains power is available.

## What you are buying

This review concerns the Foxin **1000VA/800W online UPS**, rather than the company's similarly rated line-interactive models. Foxin advertises double-conversion operation, pure sine wave output, zero transfer time, two 12V/9Ah batteries, a front status display and a two-year warranty including the battery. Check the exact model and warranty terms when ordering. [Foxin product specifications](https://foxin.in/products/ups-1000va-online)

The ₹14,400 figure is the price I paid in May 2026, rather than a current price quotation.

## Experience in use

### Power cuts and inverter changeover

Connected equipment stayed running during power cuts. This was the most useful improvement over the home inverter arrangement, where some devices could restart during changeover.

That experience is specific to the equipment and inverter involved. For a buyer, the practical question is whether the UPS can keep their own load stable through the power conditions at their location.

### Build and display

The unit feels substantial, and the front display is useful for checking operating mode, battery level and load without opening a monitoring application.

### Measured backup time

At a load of approximately **400–450W**, I measured **15–20 minutes of backup**. This gives a useful window for riding through short outages or shutting down equipment during a longer one.

Runtime will vary with load, battery condition and temperature. Size the shutdown margin around the time your systems actually need to stop, rather than planning to use every remaining minute.

### Fan noise

This is an important consideration for home use. The fan is audible on mains power as well as on battery. Despite the manufacturer's description of a silent cooling system, I would account for the noise before placing it in a bedroom, quiet office or media room.

## The FSP and Fortron connection

The most interesting discovery came while exploring the UPS through NUT. The reviewed unit was identified with:

| Item | Observed value |
| --- | --- |
| Model string | `WPHVT1K0` |
| USB vendor and product ID | `0665:5161` |
| Working NUT driver | `nutdrv_qx` |
| Reported capacity | 1000VA |
| Reported topology | Online |

NUT's device database lists a **Fortron UPS Champ 1000VA Tower** with the same model string, USB identifiers and driver, together with a Voltronic protocol implementation. That is a more specific connection than a similar enclosure or headline capacity. [NUT Fortron device report](https://networkupstools.org/ddl/FSP/Fortron_UPS_Champ_1000VA_Tower.html)

Taken together, these findings suggest a **strong possibility that this is a white-label FSP/Fortron unit, or a closely related unit built on the same underlying platform**. This is an inference from the hardware identification and NUT features, rather than confirmation of the manufacturer or supply chain.

FSP's current Champ 1K specifications also include variants rated at 900W, whereas this Foxin is rated at 800W. The connection therefore should not be used to assume identical ratings, firmware, accessories or warranty support. [FSP Champ range](https://www.fsplifestyle.com/PROP161000119/)

For buyers, the useful finding is that the reviewed Foxin unit works with NUT. Check the USB identity and reported features on your own unit before relying on the same configuration.

## What NUT adds

NUT lets a Linux machine communicate with the UPS, publish its status over the network and coordinate shutdown when battery reserve becomes low. The USB integration was tested with NUT 2.8.1, including coordinated shutdown of Proxmox hosts and a Linux client.

A typical arrangement is:

| Component | Role |
| --- | --- |
| UPS connected by USB to one Linux or Proxmox host | Supplies status to the NUT driver |
| NUT server and primary monitor on that host | Publish status and coordinate shutdown |
| Secondary monitors on other protected hosts | Monitor the server and shut down their own systems |
| Home Assistant | Provides a dashboard and notifications |

Keep the NUT server and the network equipment needed by its clients on backed-up power. Each host should run its own shutdown monitor; Home Assistant can provide visibility without being a dependency in the shutdown sequence.

## Set up the USB-connected NUT server

The examples below target Debian-based Linux and Proxmox with NUT 2.8.x. They describe a single UPS supplying all monitored systems. Package names, service units and shutdown integration can differ on other distributions.

Use the example **30% charge / 300 seconds remaining** policy only after confirming it leaves enough time for your workload to stop. These are configurable starting values, rather than a guarantee for every installation.

The address `192.0.2.10` is a documentation example. Replace it with your NUT server's address. All password values below are placeholders.

### Install and identify the UPS

Run as root, or use `sudo` where required:

```bash
apt update
apt install nut-server nut-client usbutils
lsusb -d 0665:5161
```

Connect the UPS by USB to this host. The reviewed unit used `0665:5161`; if yours differs, inspect its identity and driver support first.

Set `/etc/nut/nut.conf`:

```ini
MODE=netserver
```

### Configure the driver

Add this definition to `/etc/nut/ups.conf`:

```ini
maxretry = 3
pollinterval = 5

[foxin]
    driver = nutdrv_qx
    port = auto
    desc = "Foxin 1kVA Online UPS"
    ignorelb
    override.battery.charge.low = 30
    override.battery.runtime.low = 300
    offdelay = 180
    ondelay = 180
```

With `ignorelb`, NUT calculates low battery from reported charge or runtime, instead of using the UPS firmware's low-battery flag. Either reading dropping below its configured threshold can set low battery. This depends on reliable readings from the unit. [NUT threshold configuration](https://networkupstools.org/docs/man/ups.conf.html)

The `300` value means **estimated seconds of battery runtime remaining**, not a five-minute timer starting when mains fails.

The delay options serve a different purpose: `offdelay` controls the delay after the driver sends the UPS power-off command; `ondelay` controls output restart in the supported shutdown-and-return sequence. The off-delay does not necessarily start when a host first begins shutting down. Actual behaviour depends on the UPS firmware. [Driver delay documentation](https://networkupstools.org/docs/man/nutdrv_qx.html)

### Listen on the local and management interfaces

In `/etc/nut/upsd.conf`:

```ini
LISTEN 127.0.0.1 3493
LISTEN 192.0.2.10 3493
```

Allow TCP port 3493 only from the trusted hosts that need it. Keep the NUT service on the trusted management network.

### Create monitoring accounts

In `/etc/nut/upsd.users`, create separate accounts for the local primary and remote secondary monitors:

```ini
[localmon]
    password = REPLACE_WITH_UNIQUE_LOCAL_PASSWORD
    upsmon primary

[remotemon]
    password = REPLACE_WITH_UNIQUE_REMOTE_PASSWORD
    upsmon secondary
```

These roles provide the permissions needed for shutdown monitoring. A general administrative account with all instant commands is unnecessary for this setup. [NUT account roles](https://networkupstools.org/docs/man/upsd.users.html)

### Configure the primary monitor

In `/etc/nut/upsmon.conf`, keep one active `MONITOR` entry for this UPS and set:

```ini
RUN_AS_USER nut
MONITOR foxin@localhost 1 localmon REPLACE_WITH_UNIQUE_LOCAL_PASSWORD primary

MINSUPPLIES 1
SHUTDOWNCMD "/sbin/shutdown -h now"
POWERDOWNFLAG /etc/killpower

POLLFREQ 5
POLLFREQALERT 5
DEADTIME 15
HOSTSYNC 15
FINALDELAY 5

NOTIFYFLAG ONLINE SYSLOG+WALL
NOTIFYFLAG ONBATT SYSLOG+WALL
NOTIFYFLAG LOWBATT SYSLOG+WALL
NOTIFYFLAG FSD SYSLOG+WALL
NOTIFYFLAG SHUTDOWN SYSLOG+WALL
```

Use the password assigned to `localmon`. Debian packages normally provide the `nut` account. NUT retains a small privileged process for shutdown while its monitoring process runs with fewer privileges, so `RUN_AS_USER root` is not required simply to execute the shutdown command.

The `POWERDOWNFLAG` path must match the distribution's late-shutdown hook. The example uses `/etc/killpower`; retain the package's intended path if it differs. This hook is what allows the driver to command UPS output off late in shutdown. [NUT monitor configuration](https://networkupstools.org/docs/man/upsmon.conf.html)

Protect the credential files:

```bash
chown root:nut /etc/nut/upsd.users /etc/nut/upsmon.conf
chmod 640 /etc/nut/upsd.users /etc/nut/upsmon.conf
```

### Start and verify

On installations providing the per-device `nut-driver@` service template:

```bash
systemctl enable --now nut-driver@foxin.service
systemctl enable --now nut-server.service nut-monitor.service
systemctl restart nut-server.service nut-monitor.service
```

Some packages manage driver instances through `nut-driver-enumerator`. Follow the installed package's service layout if the named units differ; avoid running a second driver manually alongside the managed instance. [NUT service management](https://networkupstools.org/docs/user-manual.chunked/_installation_instructions.html)

Check the reported values:

```bash
upsc foxin@localhost ups.status
upsc foxin@localhost battery.charge
upsc foxin@localhost battery.runtime
upsc foxin@localhost battery.charge.low
upsc foxin@localhost battery.runtime.low
upsc foxin@localhost ups.delay.shutdown
upsc foxin@localhost ups.delay.start
```

Verify that the configured thresholds and supported delays are reflected in the output, and that charge and runtime readings are available. Typical status flags include `OL` for online, `OB` for on battery and `LB` for low battery.

## Add the other protected hosts

On each Debian or Proxmox client:

```bash
apt update
apt install nut-client
```

Set `/etc/nut/nut.conf`:

```ini
MODE=netclient
```

In `/etc/nut/upsmon.conf`:

```ini
RUN_AS_USER nut
MONITOR foxin@192.0.2.10 1 remotemon REPLACE_WITH_UNIQUE_REMOTE_PASSWORD secondary

MINSUPPLIES 1
SHUTDOWNCMD "/sbin/shutdown -h now"

POLLFREQ 5
POLLFREQALERT 5
DEADTIME 15
HOSTSYNC 15
FINALDELAY 5

NOTIFYFLAG ONLINE SYSLOG+WALL
NOTIFYFLAG ONBATT SYSLOG+WALL
NOTIFYFLAG LOWBATT SYSLOG+WALL
NOTIFYFLAG FSD SYSLOG+WALL
NOTIFYFLAG SHUTDOWN SYSLOG+WALL
```

Replace the address and use the password assigned to `remotemon`. A secondary host does not need to command UPS output off.

Protect the configuration, then start the monitor:

```bash
chown root:nut /etc/nut/upsmon.conf
chmod 640 /etc/nut/upsmon.conf
systemctl enable --now nut-monitor.service
systemctl restart nut-monitor.service
upsc foxin@192.0.2.10 ups.status
```

A successful `upsc` query proves that status is reachable. Also check the monitor's service and logs to confirm it authenticated successfully:

```bash
systemctl status nut-monitor.service --no-pager
journalctl -u nut-monitor.service -n 30 --no-pager
```

## Proxmox shutdown and recovery

For Proxmox, allow time for guests and their applications to stop before host power disappears. Measure the slowest host's shutdown time and account for every protected system when choosing battery reserve and UPS output delays.

A secondary monitor disconnecting does not prove its host has finished shutting down. The primary's `HOSTSYNC` setting waits for monitor disconnections, so it is not a substitute for a sufficient output delay.

Clusters using Proxmox HA also need a deliberate cluster-wide shutdown and recovery policy. Account for quorum, fencing and resource relocation, and use procedures supported by the installed Proxmox version. A fixed sleep followed by an HA re-arm command does not establish that the cluster is ready. [Proxmox HA documentation](https://github.com/proxmox/pve-docs/blob/master/ha-manager.adoc)

For automatic recovery, check each machine's firmware setting for restoring power after AC returns. UPS output returning and a server automatically booting are separate behaviours.

## Home Assistant monitoring

Home Assistant's NUT integration connects to the NUT server over the network; it does not communicate directly with the UPS over USB.

In **Settings → Devices & services**, add **Network UPS Tools (NUT)** and enter the server address and port `3493`. Use a fixed address, DHCP reservation or stable DNS name for the server.

Useful entities can include battery charge, estimated runtime, load, input and output voltage, operating status and supported delay values. Availability depends on what the unit exposes, and some diagnostic entities may need enabling. Credentials are optional for basic monitoring where the server permits it; control functions require appropriate permissions. [Home Assistant NUT integration](https://www.home-assistant.io/integrations/nut/)

For example, the following automation creates a Home Assistant notification when the raw NUT status contains `OB`. Replace `sensor.ups_status_data` with your actual **Status data** entity:

```yaml
alias: UPS on battery
triggers:
  - trigger: template
    value_template: >
      {{ 'OB' in states('sensor.ups_status_data').split() }}
actions:
  - action: persistent_notification.create
    data:
      title: UPS on battery
      message: Mains power is unavailable. The UPS is supplying battery power.
mode: single
```

This creates a notification in Home Assistant. A phone alert can use your configured mobile notification action instead. Keep automatic host shutdown in NUT so it continues to work independently of Home Assistant.

## Test before relying on automatic shutdown

Start with the battery charged and all systems reporting healthy status.

1. Briefly interrupt mains input to the UPS while leaving its USB connection and protected loads connected. Confirm that status changes from `OL` to `OB`.
2. Restore mains before reaching the shutdown threshold. Confirm that status returns to `OL` and all clients remain connected.
3. During a planned maintenance window, test the complete shutdown sequence. Confirm that clients begin shutdown, guests stop cleanly and UPS output remains available until every host has finished.
4. Verify UPS output-off behaviour, restart delay and host boot behaviour after mains returns.

NUT can also initiate a coordinated shutdown with `upsmon -c fsd` on the primary. **That command causes a real shutdown of participating systems; it is not a monitoring check.** Returning mains alone does not cancel a latched forced-shutdown sequence. [NUT shutdown behaviour](https://sources.debian.org/src/nut/2.8.1-5/docs/man/upsmon.txt)

The reviewed setup completed a full low-battery shutdown test successfully. Readers should validate their own load, readings, thresholds and shutdown integration before depending on the same outcome.

## Who this UPS suits

At the ₹14,400 purchase price, the combination of stable power-cut handling, measured 15–20 minute backup at 400–450W and working USB/NUT support made this a useful option for a small homelab or workstation setup.

The strongest reason to consider it is the combination of online operation and graceful shutdown support. The main compromise is fan noise. Long-term battery life and after-sales service remain considerations beyond the power-cut and integration testing covered here.

For anyone buying this model, I would check the exact online variant, current warranty terms and USB compatibility, then set up and test NUT early. That is what turns the UPS into a practical way to protect running services during an extended outage.

*AI assistance was used to improve formatting, wording and sentence structure. The review, opinions, measurements and usage experiences are my own.*

