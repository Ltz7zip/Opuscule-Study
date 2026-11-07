---
slug: "demand-paging-replacement"
subject: "operating-systems"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 9 · Operating Systems · Mastery"
title: "Demand Paging and Page-Replacement Algorithms"
subtitle: "Twenty references, three frames, three fault rates"
minutes: 18
meta: ["18 min read","Requires paged memory management","Mastery level"]
concepts: ["virtmem","memmgmt"]
prereq: ["memmgmt"]
related: ["cache","virtmem"]
---

## What you will get

By the end of this lecture you can say which fields demand paging adds to a page table, describe how the kernel handles a page fault, hand-compute fault counts for FIFO, LRU, and OPT, and estimate effective access time from a fault rate.

## Three lines back

- Demand paging loads only the pages currently in use, so the page table must record whether a page is resident.
- A page fault is an internal interrupt: not an error, but a branch on the normal memory-access path.
- Replacement exists because frames are finite; the better the victim choice, the lower the fault rate.

## Hardware support for demand paging

A basic page-table entry needs only a frame number. Demand paging adds four fields:

| Field | Purpose | What fails without it |
| --- | --- | --- |
| Present bit $P$ | Whether the page is in memory | Cannot tell if a load is needed |
| Reference field $A$ | Whether it was touched recently | Replacement becomes random |
| Dirty bit $M$ | Whether it was written after loading | Cannot tell whether to write back |
| Disk address | Where the page lives on disk | Nothing to fetch on a fault |

Handling a fault runs in order: the hardware traps on $P=0$; the kernel checks the address is legal; it takes a free frame or, if none, runs replacement to choose a victim, writing it back first if $M=1$; the page is read in; the table is updated with $P=1$ and $A$ cleared; the state is restored and the instruction is **restarted**.

Restart, not resume, matters: the instruction that faulted never completed.

## FIFO, LRU, and OPT

Take the reference string

$$7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1$$

with three physical frames. **FIFO** evicts the page that arrived earliest and needs only a queue pointer:

| Step | Reference | Frame contents | Fault |
| --- | --- | --- | --- |
| 1 | 7 | 7, -, - | yes |
| 2 | 0 | 7, 0, - | yes |
| 3 | 1 | 7, 0, 1 | yes |
| 4 | 2 | 2, 0, 1 | yes, evict 7 |
| 5 | 0 | 2, 0, 1 | no |
| 6 | 3 | 2, 3, 1 | yes, evict 0 |
| 7 | 0 | 2, 3, 0 | yes, evict 1 |
| 8 | 4 | 4, 3, 0 | yes, evict 2 |

That is already 7 faults in the first 8 references. Running all 20 references gives:

| Algorithm | Victim rule | Faults | Fault rate |
| --- | --- | --- | --- |
| FIFO | Earliest loaded | 15 | $15/20=75\%$ |
| LRU | Least recently used | 12 | $12/20=60\%$ |
| OPT | Used farthest in the future | 9 | $9/20=45\%$ |

**LRU** approximates the future by the past and needs a timestamp or access stack per page, costing more hardware than FIFO. **OPT** needs the future, cannot be built, and serves as a lower bound.

## Clock and the price of a fault

**Clock**, or NRU, is a cheap approximation of LRU. Frames form a ring with one reference bit $A$ each. The hand sweeps: if $A=1$, clear it and advance; if $A=0$, evict that page. In the worst case two sweeps find a victim.

Enhanced Clock inspects $(A,M)$ and searches $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$, preferring pages neither referenced nor modified so no write-back is needed.

Fault cost must be quantified:

$$EAT=(1-f)\,t_m+f\,t_{\text{fault}}$$

With $t_m=100$ ns and $t_{\text{fault}}=8$ ms, a rate of $f=0.6$, the figure LRU reaches above, gives

$$EAT=0.4\times100\ \text{ns}+0.6\times8\ \text{ms}=40\ \text{ns}+4.8\ \text{ms}\approx4.8\ \text{ms}$$

about 48,000 times a plain memory access. At $f=0.001$, $EAT=99.9\ \text{ns}+8\ \mu\text{s}\approx8.1\ \mu\text{s}$, still 80 times slower. Even one fault in a thousand is a bottleneck.

> [!NOTE]
> Fault rate is an order-of-magnitude problem, not a percentage problem. Only around $10^{-6}$ does memory access feel close to normal speed.

## Three common misconceptions

> [!MYTH] A page fault means the program is broken.
> Faulting is the normal working mode of virtual memory. Only an illegal address or a permission violation is an error.

> [!MYTH] More frames always mean fewer faults.
> FIFO exhibits Belady's anomaly: adding frames can increase faults. LRU and OPT are stack algorithms and cannot do this.

> [!MYTH] Exact LRU can be implemented cheaply in software.
> Exact LRU updates a timestamp on every memory reference, which is expensive in hardware. Real systems use Clock-style approximations.

## Practice

> [!PRACTICE] 1 · Compute
> Reference string 1,2,3,4,1,2 with three frames: how many faults under LRU and under OPT?
>
> > [!ANSWER] Show answer
> > LRU faults 6 times: four at the start, then 1 evicts 2 and 2 evicts 3. OPT faults 4 times: on reference 4 it evicts 3, which is never used again, and 1 and 2 then hit. The gap comes from LRU looking backward and OPT looking forward.

> [!PRACTICE] 2 · Estimate
> Memory access is 80 ns, fault handling 10 ms, and effective access time must stay under 1 μs. What is the fault-rate ceiling?
>
> > [!ANSWER] Show answer
> > $80(1-f)+10^{7}f\le1000$ ns, so $80+9{,}999{,}920f\le1000$ and $f\le9.2\times10^{-5}$, roughly nine in a hundred thousand.

## Formal statement

In a demand-paging system the page-table entry holds, besides the frame number, a present bit, a reference field, a dirty bit, and a disk address. When the present bit of the referenced page is 0 the hardware raises a page fault; after confirming the address is legal the kernel allocates a frame, or runs the replacement algorithm and writes back the victim if its dirty bit is 1, then loads the required page, updates the table, and restarts the interrupted instruction. The fault rate is $f=F/A$, the ratio of faults to accesses, and effective access time is $EAT=(1-f)t_m+f\,t_{\text{fault}}$. FIFO may exhibit Belady's anomaly; LRU and OPT cannot.