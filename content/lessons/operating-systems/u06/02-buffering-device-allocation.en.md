---
slug: "buffering-device-allocation"
subject: "operating-systems"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 12 · Operating Systems · Mastery"
title: "Buffering and Device Allocation"
subtitle: "150 microseconds single-buffered, 100 double-buffered: where the difference comes from"
minutes: 16
meta: ["16 min read","Requires I/O control methods","Mastery level"]
concepts: ["iomgmt","dma"]
prereq: ["iomgmt"]
related: ["interrupt","iomgmt"]
---

## What you will get

By the end of this lecture you can compute per-block time for single and double buffering, describe the three queues and four states of a buffer pool, and explain how spooling turns an exclusive device into a shared one.

## Three lines back

- Buffering fixes mismatched speeds and granularity; it trades space for parallelism.
- Single buffering overlaps input with computation; double buffering pushes input, computation, and output into deeper overlap.
- Spooling carves wells on disk, turning one exclusive device into many shared ones.

## Single and double buffering

Let $T$ be the time to move a block from the device into the buffer, $C$ the CPU time to process it, and $M$ the time to move it to user space.

**Single buffering**: input and computation cannot fully overlap because they contend for the same buffer. Per block,

$$T'=\max(T,\ C)+M$$

**Double buffering**: two buffers alternate, so the next block can arrive while the current one is processed. Per block,

$$T''=\max(T,\ C+M)$$

With $T=100\ \mu\text{s}$, $C=50\ \mu\text{s}$, and $M=50\ \mu\text{s}$:

$$T'=\max(100,50)+50=150\ \mu\text{s}$$

$$T''=\max(100,\ 50+50)=100\ \mu\text{s}$$

For ten blocks, single buffering needs $10\times150=1500\ \mu\text{s}$ and double buffering $10\times100=1000\ \mu\text{s}$, a 33% saving. The bottleneck has moved to the input side at $T=100\ \mu\text{s}$; more buffers bring nothing, and the correct fix is a faster device.

| Scheme | Time per block | Overlap achieved | Fits |
| --- | --- | --- | --- |
| No buffer | $T+C+M$ | None | Rarely used |
| Single buffer | $\max(T,C)+M$ | Input partially overlaps compute | Slow character devices |
| Double buffer | $\max(T,C+M)$ | All three stages pairwise overlap | Block devices, pipelining |
| Buffer pool | Depends on queue depth | Shared by many processes | General systems |

## Buffer pools and spooling

A buffer pool manages many buffers together in three queues - **free emq**, **input inq**, **output outq** - and each buffer moves through four states: holding input hinq, extracting input sinq, holding output houtq, extracting output soutq.

The flow: a reading process takes a free buffer from emq, marks it hinq, fills it, and appends it to inq; when computing it takes one from inq, marks it sinq, consumes the data, and returns it to emq. Writing mirrors this. Buffer count then scales with concurrency instead of being fixed at two per device.

**Spooling** carves input and output wells out of disk and replaces off-line peripheral machines with input and output processes. For a shared printer, a process writes its output into the well and appends a request; a printing process drains the queue in order.

Twenty users each submit 30 pages and the printer runs at 20 pages per minute. Under exclusive use the twentieth user waits for the first nineteen:

$$t_{\text{wait}}=\frac{19\times30}{20}=28.5\ \text{min}$$

With spooling, that user writes a few hundred KB into the well, about 0.1 s, and returns. Printing still takes 30 minutes, but waiting is decoupled and one printer appears as 20 logical ones.

## Device independence and allocation

**Device independence** means programs name logical devices rather than physical ones. A logical unit table maps names to devices and driver entry points, so swapping hardware needs no program change and load can balance across equivalent devices.

Allocation involves four tables:

| Table | Full name | Contents |
| --- | --- | --- |
| SDT | System device table | Every device in the system with a pointer to its DCT |
| DCT | Device control table | Type, state, wait queue, pointer to COCT |
| COCT | Controller control table | Controller state, queue, pointer to CHCT |
| CHCT | Channel control table | Channel state, queue |

Allocation checks bottom-up: find the device through the SDT, then confirm the controller, then the channel. Only when all three are free is the device granted; otherwise the process joins that level's wait queue. The three form one serial path, so a single busy link blocks the transfer.

Static allocation assigns every device before a job starts: deadlock-free but wasteful. Dynamic allocation requests on demand: efficient but needs avoidance.

> [!NOTE]
> Buffer pools and spooling both trade space for parallelism. The pool buys CPU-device overlap; spooling buys process-device overlap.

## Three common misconceptions

> [!MYTH] Bigger buffers are always better.
> A buffer removes a speed mismatch, not the device's transfer rate. Once $T$ is the bottleneck, extra buffering yields nothing.

> [!MYTH] Spooling makes the printer faster.
> Physical print speed is unchanged. What changes is user waiting time and the way the device is shared.

> [!MYTH] Allocation only needs to check whether the device is free.
> The controller and the channel matter too. A free device behind a busy channel still cannot move data.

## Practice

> [!PRACTICE] 1 · Compute
> With $T=200\ \mu\text{s}$, $C=60\ \mu\text{s}$, and $M=40\ \mu\text{s}$, find per-block time for single and double buffering.
>
> > [!ANSWER] Show answer
> > Single: $\max(200,60)+40=240\ \mu\text{s}$. Double: $\max(200,100)=200\ \mu\text{s}$. The input side is the bottleneck.

> [!PRACTICE] 2 · Decide
> Under double buffering, if $C+M$ far exceeds $T$, which side should be optimized first?
>
> > [!ANSWER] Show answer
> > The compute and transfer side. Here $T''=C+M$, so a faster input device cannot shorten the per-block time at all.

## Formal statement

With single buffering the processing time per block is $\max(T,C)+M$, where $T$ is the input time, $C$ the computation time, and $M$ the transfer time from buffer to user space; with double buffering it is $\max(T,C+M)$. A buffer pool consists of a free-buffer queue, an input queue, and an output queue, and a buffer moves among the four working states of holding input, extracting input, holding output, and extracting output. Spooling uses input and output wells on disk to convert an exclusive device into a logical device shareable by several processes. Device allocation inspects the system device table, the device control table, the controller control table, and the channel control table in that order.