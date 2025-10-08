# RAID

## Filesystems

We only recommend these filesystems because they are being used in production and have good cli and documentation. They also have good recovery procedures.

## ZFS

We recommend ZFS if you can buy identical drives, TrueNAS is more polished than any other NAS operating system.

## BTRFS

!!! danger

    We do not recommend RAID5 & RAID6 with BTRFS, check BTRFS docs to know when it is safe.

We recommend BTRFS for its less RAM requirments, ability to mix match drives and faster speed than ZFS.
