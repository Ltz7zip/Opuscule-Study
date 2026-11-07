---
slug: "memory-partition-paging"
subject: "operating-systems"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 7 · Operating Systems · Mastery"
title: "Contiguous Allocation and Paging"
subtitle: "From the fragmentation trap to the page table"
minutes: 17
meta: ["17 min read","Requires an introduction to operating systems","Mastery level"]
concepts: ["memmgmt","memhier"]
prereq: ["osintro"]
related: ["cache","memmgmt"]
---

## What you will get

By the end of this lecture you can separate internal from external fragmentation, apply three fit strategies to one set of free areas, write the paging address layout, translate a logical address, and compute effective access time with a TLB.

## Three lines back

- Contiguous allocation gives each process one unbroken block: simple and fast, but fragmentation is unavoidable.
- Paging cuts memory into equal frames and processes into equal pages, then uses a page table to stitch scattered frames into one continuous logical space.
- The page table lives in memory, so one memory reference can become two; the TLB exists to remove that extra one.

## Contiguous allocation and three fit strategies

| Scheme | Partitioning | Fragmentation | Character |
| --- | --- | --- | --- |
| Single contiguous | System area plus user area | Internal, at the tail of the user area | One program only, simplest |
| Fixed partitions | Carved into unequal partitions at boot | Internal, leftover inside a partition | Fixed count, large jobs may not fit |
| Dynamic partitions | Cut on demand, merged on release | External, scattered free areas | Flexible, needs coalescing |

Dynamic partitioning tracks holes with a free-list chain or table. Three placement strategies exist: **first fit** takes the first hole large enough, **best fit** takes the smallest hole that fits, and **worst fit** takes the largest hole.

Take free areas A (0, 100 KB), B (100 KB, 500 KB), C (600 KB, 200 KB), D (800 KB, 300 KB), E (1100 KB, 600 KB) and a request of 212 KB:

| Strategy | Chosen | Allocated range | Remaining hole |
| --- | --- | --- | --- |
| First fit | B (500 KB) | 100-312 KB | 288 KB starting at 312 KB |
| Best fit | D (300 KB) | 800-1012 KB | 88 KB starting at 1012 KB |
| Worst fit | E (600 KB) | 1100-1312 KB | 388 KB starting at 1312 KB |

Best fit leaves an 88 KB stub that is nearly unusable, manufacturing more small holes than it removes. Worst fit keeps a large hole now but consumes large holes fastest. None eliminates external fragmentation; compaction works but must pause processes to move data.

## Paging: scattering the contiguous requirement

A **page** is an equal-sized slice of a process's logical space; a **frame** is an equal-sized slice of physical memory, the same size $L$. The logical address splits into two fields:

$$A=(\text{page } P,\ \text{offset } W),\qquad P=\left\lfloor \frac{A}{L}\right\rfloor,\quad W=A\bmod L$$

With a 32-bit address and $L=4$ KB $=2^{12}$, the offset takes the low 12 bits and the page number the high 20, allowing up to $2^{20}$ pages per process.

The **page table** maps page numbers to frame numbers; entries also carry a present bit, a reference bit, a dirty bit, and a disk address. Entry size fixes how many fit per page: with 4 B entries and 4 KB pages, one page holds $4096/4=1024$ entries.

Translation, with $L=1$ KB, logical address 2500, and a page table mapping page 0 to frame 5, page 1 to frame 8, page 2 to frame 3, page 3 to frame 12:

$$P=\left\lfloor 2500/1024\right\rfloor=2,\qquad W=2500-2\times1024=452$$

$$PA=b\times L+W=3\times1024+452=3524$$

Page numbers are logical, frame numbers physical; the two need not coincide.

## Effective access time

The page table sits in memory, so one reference costs two accesses: one for the entry and one for the data. With memory access time $t_m=100$ ns, no TLB gives

$$EAT=2t_m=200\ \text{ns}$$

Adding a TLB with hit rate $\alpha$ and access time $t_c=10$ ns:

$$EAT=\alpha(t_c+t_m)+(1-\alpha)(t_c+2t_m)$$

At $\alpha=0.9$:

$$EAT=0.9\times110+0.1\times210=99+21=120\ \text{ns}$$

That is $200/120\approx1.67$ times faster. Hit rate dominates: at $\alpha=0.98$ the result is $0.98\times110+0.02\times210=112$ ns, while at $\alpha=0$ it degrades to 210 ns, 10 ns worse than no TLB at all - the price of a miss.

> [!NOTE]
> Paging has no external fragmentation, but the last page of a process almost always wastes space internally - on average about half a page.

## Three common misconceptions

> [!MYTH] Best fit minimizes external fragmentation.
> It only minimizes the waste of this single request. Over time it leaves many tiny stubs that are the hardest to reuse.

> [!MYTH] Paging eliminates all fragmentation.
> It removes external fragmentation. Internal fragmentation remains, up to nearly one page per process.

> [!MYTH] Page tables are small enough to keep in registers.
> With 32-bit addresses, 4 KB pages, and 4 B entries, a single-level table is 4 MB. It must live in memory, which is why TLBs and multilevel tables exist.

## Practice

> [!PRACTICE] 1 · Compute
> Page size 2 KB, logical address 5000, page table mapping page 0 to frame 2, page 1 to frame 7, page 2 to frame 4. Find the page number, offset, and physical address.
>
> > [!ANSWER] Show answer
> > $P=\lfloor5000/2048\rfloor=2$, $W=5000-4096=904$, so $PA=4\times2048+904=9096$.

> [!PRACTICE] 2 · Compare
> Free areas are 40 KB, 200 KB, 90 KB, 150 KB and the request is 80 KB. Which hole does each strategy pick?
>
> > [!ANSWER] Show answer
> > First fit picks 200 KB, the first hole large enough. Best fit picks 90 KB. Worst fit picks 200 KB, the largest.

## Formal statement

Contiguous allocation requires giving a process one continuous region of memory. Holes created by dynamic partitioning form a free-list chain ordered by address; first fit takes the first hole long enough, best fit the smallest such hole, and worst fit the largest hole. In paged storage the logical space is divided into pages of size $L$ and physical memory into frames of the same size. A logical address $A$ has page number $P=\lfloor A/L\rfloor$ and offset $W=A\bmod L$; after the page table yields frame number $b$, the physical address is $bL+W$. With a TLB, effective access time is $\alpha(t_c+t_m)+(1-\alpha)(t_c+2t_m)$.