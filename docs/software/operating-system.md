# Operating System

## Ubuntu

Pros:

- Faster updates because of more mirrors in India
- More up-to-date packages and kernel than Debian
- Good documentation and support
- LTS versions have longer support than Debian's support cycle

Cons:

- Can have some bloatware, such as snap
- Can cause breaking changes in RARE cases because of kernel updates
 
## Debian

Pros:

- Very stable
- Good documentation and support

Cons:

- Packages are usually 2 years old
 
## Flatcar / CoreOS

Flatcar is a Free and Open Source Operating System sponsored and developed by Microsoft which is designed to run
containers.

It is a declarative operating system, meaning it does not have a package manager and everything should run in containers.

The OS is treated as cattle not pets, meaning you keep destroying the VM and recreating it. There is no chance of configuration drift.
Data should be stored in a separate disk.

Pros:

- Infrastructure as Code and configs can be stored in GitHub
- Sharing issues with people online is as simple as giving your config link
- OS & Containers are auto updated
- Deploy and forget, i.e. low maintenance
- Secure by default because of fewer binaries on the system and SELinux available

Cons:

- Learning curve and time to deploy a new app is higher due to recreating the OS
- Documentation is not as good
- Community is much smaller than Ubuntu or Debian

## Talos Linux

Lightweight, immutable Kubernetes distribution.

Pros:

- API driven config and update
- Very fast and easy upgrades
- Large community
- High security.

Cons:

- No official way to store Talos Configs in GitHub
- Highest learning curve of the options listed
