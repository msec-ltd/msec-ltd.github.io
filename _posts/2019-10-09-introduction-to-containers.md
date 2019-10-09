---
layout: post
title:  "Introduction to Containers"
author: manish
categories: [ containers ]
tags: [oci, containers, virtualisation ]
image: assets/images/chuttersnap-xewrfLD8emE-unsplash.jpg
description: "A brief introduction to containers and how they differ from traditional VMs"
featured: true
hidden: false
---

In recent years, containers have grown in popularity and they have been catching a lot of attention due to the emergence of Docker. Containers are especially useful for microservice architectures and are revolutionising DevOps by providing easy application packaging and deployment capabilities. Docker didn't invent them, but they did make it quite accessible and easy to use.

I have been using Docker for a few years now, mostly to experiment with or trying to study the security implications of insecurely configured application containers. However, to really understand the security implications and secure configurations, you need to look under the hood and study the underlying technologies that make these containers possible.

This series of blog posts are my journey into learning container internals and getting deep into the concepts that enable the creation of containers. For these particular posts, when we refer to containers, we will limit ourselves to Linux containers. Similar container technologies exist for other operating systems. For examples Solaris [Zones](https://docs.oracle.com/cd/E37838_01/html/E61038/zones.intro-2.html#scrolltoc), FreeBSD [Jails](https://www.freebsd.org/doc/handbook/jails.html), etc.


## So what is a Container?

> A container is a collection of software processes unified by one namespace, with access to an operating system kernel that it shares with other containers and little to no access between containers. [^1]

The most popular implementaion of containers is the runC container runtime which implements the [Open Container Initiative (OCI) specification](https://github.com/opencontainers/runtime-spec). Lately, a lot of standardisation effort has been taking place in container technology enabled by the Linux Foundation.



Ok, so as a definition that sounds good, but what does this mean exactly? How is all this possible?



## Container vs Virtual Machine

A container is a virualisation concept, but unlike a virtual machine, it is quite lightweight and fast. The core difference between a container and a traditional virtual machine is that it does not require a full blown guest operating system or hypervisor to emulate the hardware. Containers share the same host operating system kernel. The difference can be visualised as follows: [^2]

![virtualization vs containers]({{ site.baseurl }}/assets/images/virtualization-vs-containers.png)


Under the hood, containers are made possible by the use of [namespaces](http://man7.org/linux/man-pages/man7/namespaces.7.html), [cgroups](http://man7.org/linux/man-pages/man7/cgroups.7.html), [capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html), and filesystem access controls provided by the Linux Kernel. I highly recommend reading the Kernel man pages to understand these concepts in detail.



In this series of blog posts, I will share detailed walkthroughs of these Kernel concepts along with sample source code for experimenting and having fun with these technologies. The next post will begin with exploring Linux namespaces in detail.



## References

[^1]: <a target="_blank" href="https://youtu.be/e5Mz0XElYXk">History of Linux Containers</a>
[^2]: <a target="_blank" href="https://www.redhat.com/en/topics/containers/whats-a-linux-container">What's a Linux container</a>

