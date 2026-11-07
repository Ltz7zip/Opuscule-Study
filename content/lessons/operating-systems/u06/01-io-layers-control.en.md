---
slug: "io-layers-control"
subject: "operating-systems"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 11 · Operating Systems · Mastery"
title: "I/O System Layers and Control Methods"
subtitle: "One 4 KB block: 8 milliseconds of CPU time, or 8 microseconds"
minutes: 17
meta: ["17 min read","Requires an introduction to operating systems","Mastery level"]
concepts: ["iomgmt","interrupt"]
prereq: ["osintro"]
related: ["dma","iomgmt"]
---

## What you will get

By the end of this lecture you can draw the four software layers and one hardware layer of the I/O system, name the registers inside a device controller, and compute the CPU cost of polling, interrupts, DMA, and channels, deciding which one becomes the bottleneck.

## Three lines back

- I/O software has four layers: user-level I/O software, device-independent software, device drivers, and interrupt handlers, sitting above controllers and devices.
- The whole history of control methods is one move: replace per-byte intervention with per-block and per-channel intervention.
- Polling and interrupts work per byte, DMA per block, and channels per group of I/O operations.

## Layered structure and the device controller

The I/O system has four layers from the top down:

| Layer | Responsibility | Interface offered upward |
| --- | --- | --- |
| User-level I/O software | Library calls, the user side of spooling | `read`, `write`, and friends |
| Device-independent software | Naming, buffering, allocation, protection | Logical to physical device mapping |
| Device drivers | Translate abstract commands into register writes | A standard set of driver entry points |
| Interrupt handlers | React to completion, wake waiting processes | Interrupt service entry |

A **device controller** bridges CPU and device. It typically exposes three register groups: a data register holding transferred bytes, a status register with busy and error bits, and a control register carrying start and direction bits. The CPU reaches them through I/O ports or memory-mapped addresses.

Layering pays off at replacement: swap in a new network card of the same class and only the driver changes, while the layers above stay untouched. That is device independence.

## Four control methods

**Programmed I/O with polling**: the CPU issues a start command and then loops reading the status register until the device is ready, then moves one byte at a time. CPU and device run strictly in sequence.

**Interrupt-driven I/O**: the CPU issues the command and switches to another process. The device raises an interrupt after each byte or word, and the handler moves the data.

**DMA**: the CPU programs the memory address, byte count, and direction. A DMA controller moves the entire block between memory and device, raising one interrupt at the end. During the transfer it steals bus cycles from the CPU.

**Channels**: a channel is a dedicated I/O processor that executes a channel program stored in memory. One I/O instruction starts it, it performs a whole group of operations by itself, and it interrupts the CPU only when the group finishes.

| Method | Intervention granularity | Unit | Parallelism | Fits |
| --- | --- | --- | --- | --- |
| Polling | Every byte | Byte | None | Simple embedded devices |
| Interrupt | One interrupt per byte | Byte | CPU overlaps device | Slow character devices |
| DMA | One interrupt per block | Block | Device overlaps memory | Disks, network cards |
| Channel | One interrupt per group | Group of blocks | Several devices at once | Mainframes, storage arrays |

## Estimating CPU cost

Reading 4 KB, or 4096 bytes, from a device running at 1 MB/s takes a pure transfer time of

$$t_{\text{io}}=\frac{4096\ \text{B}}{1\times10^{6}\ \text{B/s}}=4.1\ \text{ms}$$

**Polling**, at 2 μs per byte for status check and move:

$$T_{\text{poll}}=4096\times2\ \mu\text{s}=8192\ \mu\text{s}\approx8.19\ \text{ms}$$

**Interrupts**, at 1.5 μs per byte:

$$T_{\text{int}}=4096\times1.5\ \mu\text{s}=6144\ \mu\text{s}\approx6.14\ \text{ms}$$

**DMA**, with 5 μs of setup and a 3 μs completion interrupt:

$$T_{\text{dma}}=5+3=8\ \mu\text{s}$$

**Channel**, with 5 μs to start and a 1 μs final interrupt:

$$T_{\text{ch}}=5+1=6\ \mu\text{s}$$

Interrupt-driven I/O already costs 6.14 ms against a 4.1 ms transfer, so the CPU is the bottleneck and a faster device changes nothing. DMA cuts cost to 8 μs, about $0.2\%$ of the transfer, leaving the CPU free - a 1024-fold reduction from polling.

> [!NOTE]
> To find the bottleneck, compare CPU cost with transfer time. Cost exceeding transfer time means a CPU-bound system; cost far below means an I/O-bound one.

## Three common misconceptions

> [!MYTH] Interrupt-driven I/O is always faster than polling.
> The transfer itself is unchanged; what improves is CPU utilization. If interrupts arrive extremely often, handler overhead can exceed polling.

> [!MYTH] DMA uses no CPU at all.
> DMA steals bus cycles and competes with the CPU for the memory bus, slowing its accesses. What it removes is instruction-level intervention, not bandwidth contention.

> [!MYTH] A channel is a software mechanism.
> A channel is a separate processor with its own instruction set that executes channel programs. It is not a function inside the kernel.

## Practice

> [!PRACTICE] 1 · Compute
> Transferring 1 KB with polling at 2 μs per byte, interrupts at 1.5 μs per byte, and DMA at a fixed 6 μs: find each CPU cost.
>
> > [!ANSWER] Show answer
> > Polling $1024\times2=2048$ μs, interrupts $1024\times1.5=1536$ μs, DMA 6 μs.

> [!PRACTICE] 2 · Decide
> If the device is upgraded to 10 MB/s, does interrupt-driven I/O still work?
>
> > [!ANSWER] Show answer
> > No. A 4 KB transfer now takes 0.41 ms while handler overhead stays at 6.14 ms, fifteen times the transfer time. DMA is required.

## Formal statement

The I/O system consists of four software layers - user-level I/O software, device-independent software, device drivers, and interrupt handlers - above device controllers and physical devices. In programmed I/O the CPU polls device status in a loop and moves data byte by byte. In interrupt-driven I/O the device raises an interrupt after each data unit is transferred. In DMA the controller moves a whole block between memory and device directly and interrupts the CPU only at completion. In channel I/O a channel processor executes a channel program to complete a group of I/O operations. The CPU intervention granularity of the four methods is, in order, a byte, a byte, a data block, and a group of data blocks.