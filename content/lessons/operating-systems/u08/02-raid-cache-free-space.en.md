---
slug: "raid-cache-free-space"
subject: "operating-systems"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 16 · Operating Systems · Mastery"
title: "Disk Fault Tolerance, Caching, and Free-Space Management"
subtitle: "Four drives in RAID 0: a 7.8% chance one fails within a year"
minutes: 16
meta: ["16 min read","Requires disk scheduling","Mastery level"]
concepts: ["disksched","cache"]
prereq: ["disksched"]
related: ["filesys","iomgmt"]
---

## What you will get

You will be able to pick a RAID level from fault tolerance and capacity, estimate annual failure probability, and compute cache effective access time.

## Three lines back

- RAID buys reliability with redundancy and throughput with striping.
- A disk cache turns many small I/Os into fewer large ones; hit rate decides the payoff.
- Free-space management must allocate and free fast with compact metadata.

## RAID levels

RAID combines disks into one logical device using **striping** for parallel transfer and **redundancy** via mirroring or parity.

| Level | Redundancy | Minimum disks | Usable capacity ($n$ disks) | Survives | Write cost |
| --- | --- | --- | --- | --- | --- |
| RAID 0 | None | 2 | $n$ | No failure | None |
| RAID 1 | Mirror | 2 | $n/2$ | Half the disks | Two copies |
| RAID 3 | Bit striping, dedicated parity | 3 | $n-1$ | One disk | Parity disk bottleneck |
| RAID 5 | Block striping, distributed parity | 3 | $n-1$ | One disk | Read-modify-write |
| RAID 6 | Dual parity | 4 | $n-2$ | Two disks | Double parity |
| RAID 10 | Mirror then stripe | 4 | $n/2$ | One per mirror pair | Two copies |

Five 2 TB drives: RAID 0 gives 10 TB unprotected, RAID 5 8 TB surviving one failure, RAID 6 6 TB surviving two, RAID 10 5 TB rebuilding from one mirror.

At 2% annual failure per drive, four RAID 0 drives lose data if any fails:

$$P=1-(1-0.02)^4=1-0.98^4\approx7.8\%$$

RAID 10 over the same drives loses data only if both members of one mirror fail, about $0.02^2=0.04\%$. RAID 5 survives one failure but runs degraded: rebuilding 2 TB at 100 MB/s takes 5.6 hours, and a second failure then loses everything.

## Disk cache, read-ahead, and delayed write

A **disk cache** keeps recently read blocks in memory. With hit rate $h$, cache time $t_c$, and disk time $t_d$,

$$T_{\text{eff}}=h\,t_c+(1-h)\,t_d$$

For $t_c=0.1$ ms, $t_d=10$ ms, and $h=0.8$:

$$T_{\text{eff}}=0.8\times0.1+0.2\times10=2.08\ \text{ms}$$

about $10/2.08\approx4.8$ times faster than disk; at $h=0.5$, $T_{\text{eff}}=5.05$ ms and half the benefit is gone.

**Read-ahead** prefetches following blocks on sequential access: at 4 KB and 100 MB/s, 16 blocks cost 0.64 ms and make the next 16 reads hits.

**Delayed write** flushes dirty blocks on size or timeout, merging random writes into one sequential write; the cost is losing the last seconds on power failure, hence `fsync`.

| Technique | What it optimizes | Source of gain | Risk |
| --- | --- | --- | --- |
| Cache | Repeated reads | Hit rate | Consistency upkeep |
| Read-ahead | Sequential reads | One seek, many blocks | Wasted bandwidth |
| Delayed write | Small random writes | Merging and ordering | Data loss on power cut |

## Free-space management: bitmaps and grouped linking

A **bitmap** spends one bit per block: 1 used, 0 free. With 32-bit words and blocks numbered from 0,

$$\text{word}=\left\lfloor\frac{b}{32}\right\rfloor+1,\qquad \text{bit}=b\bmod 32+1$$

Block 1000 lands in word 32, bit 9. A bitmap finds runs quickly: a 1 TB disk with 4 KB blocks needs 32 MB; the cost is scanning and syncing.

**Grouped linking** packs free blocks into groups whose first block holds the next group's address and count. With 100 slots, 99 hold block numbers and the 100th points onward. Allocation pops the stack; when empty, the block named by slot 100 becomes the new stack. Freeing pushes; when full, the stack is written into the newly freed block as the head.

| Method | Metadata size | Allocate | Free | Fit |
| --- | --- | --- | --- | --- |
| Bitmap | One bit per block | Scan | Set bit | General, easy runs |
| Grouped linking | One block per group | $O(1)$ stack pop | $O(1)$ stack push | UNIX-style systems |

> [!NOTE]
> The group block stores no file content, so a 100-slot group offers 99 usable blocks.

## Three common misconceptions

> [!MYTH] RAID 5 is always safer than RAID 10 because it survives any single disk failure.
> RAID 10 rebuilds by copying a mirror, a short window; RAID 5 reads the whole array, and a second failure in those hours loses everything.

> [!MYTH] An 80% cache hit rate means 80% better performance.
> Effective time falls from 10 ms to 2.08 ms, 4.8 times faster or 380%: a ratio, not the hit rate.

> [!MYTH] Delayed write merely postpones a write and cannot hurt reliability.
> Cached data is unprotected against power loss; writes that must persist need an explicit sync.

## Practice

> [!PRACTICE] 1 · Compute
> Six 4 TB drives in RAID 5 and RAID 6: capacity and failures survived?
>
> > [!ANSWER] Show answer
> > RAID 5: $(6-1)\times4=20$ TB and one failure. RAID 6: $(6-2)\times4=16$ TB and two failures.

> [!PRACTICE] 2 · Compute
> Cache is 0.05 ms, disk 8 ms. Effective time at hit rate 0.9 and 0.6?
>
> > [!ANSWER] Show answer
> > At 0.9: $0.9\times0.05+0.1\times8=0.045+0.8=0.845$ ms. At 0.6: $0.03+3.2=3.23$ ms, nearly four times slower.

> [!PRACTICE] 3 · Compute
> Words are 16 bits and block numbers start at 0. Which word and bit represent block 500?
>
> > [!ANSWER] Show answer
> > Word $=\lfloor500/16\rfloor+1=31+1=32$, bit $=500\bmod16+1=5$.

## Formal statement

RAID uses striping for throughput and mirroring or parity for tolerance: RAID 0 has none, RAID 1 and 10 mirror, RAID 3 uses a dedicated parity disk, RAID 5 distributed parity, RAID 6 dual parity, with usable capacity $n$, $n/2$, $n-1$, $n-2$. Cache time is $T_{\text{eff}}=h\,t_c+(1-h)t_d$. Read-ahead exploits sequentiality; delayed write risks power loss. Free space is tracked by a bitmap mapping block $b$ to word $\lfloor b/32\rfloor+1$ and bit $b\bmod32+1$, or by grouped linking with $O(1)$ allocation.