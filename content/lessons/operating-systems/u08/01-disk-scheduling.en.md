---
slug: "disk-scheduling"
subject: "operating-systems"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 15 · Operating Systems · Mastery"
title: "Disk Performance and Scheduling Algorithms"
subtitle: "Eight requests from track 53: 640, 236, 331, and 382 tracks of head movement"
minutes: 17
meta: ["17 min read","Requires file system basics","Mastery level"]
concepts: ["disksched","iomgmt"]
prereq: ["filesys"]
related: ["iomgmt","cache"]
---

## What you will get

You will be able to split access time into seek, rotational latency, and transfer, estimate it from real numbers, hand-compute head movement for four algorithms, and explain starvation and the LOOK variants.

## Three lines back

- One access costs seek, rotational latency, and transfer; mechanical parts dominate.
- Scheduling changes service order, not the request set, and is judged by total movement and mean response.
- Every shortest-seek policy can starve a request; the SCAN family bounds waiting with a direction rule.

## The three components of access time

One disk read or write takes

$$T_a=T_s+\frac{1}{2r}+\frac{b}{rN}$$

where $T_s$ is seek time, $r$ rotation rate, $N$ bytes per track, and $b$ bytes transferred. Seek time is often $T_s=mn+s$, with $n$ tracks crossed, $m$ time per track, and $s$ startup.

| Component | Formula | Typical value at 7200 rpm, 8 ms average seek |
| --- | --- | --- |
| Seek | $mn+s$ | 8 ms on average |
| Rotational latency | $1/(2r)$ | $1/(2\times120)=4.17$ ms |
| Transfer | $b/(rN)$ | 4 KB at 100 MB/s is about 0.04 ms |

At 7200 rpm, $r=120$ and one revolution is 8.33 ms, so the average wait is half that. The total is $8+4.17+0.04=12.2$ ms, 99.7% mechanical. A 15,000 rpm drive halves rotational latency to 2 ms, about 10 ms total: more than doubling spin rate buys 18%. That gap is why scheduling matters.

## Four scheduling algorithms

Take a 200-cylinder disk (0 to 199), the head at 53, and the queue

$$98,\ 183,\ 37,\ 122,\ 14,\ 124,\ 65,\ 67$$

**FCFS** serves arrivals in order: fair but blind to position. **SSTF** takes the nearest request. **SCAN** sweeps to the edge, then reverses like an elevator. **C-SCAN** serves one direction only and jumps back to 0, equalizing waits.

| Algorithm | Service order | Head movement | Character |
| --- | --- | --- | --- |
| FCFS | 98,183,37,122,14,124,65,67 | $45+85+146+85+108+110+59+2=640$ | Fair, swings widely |
| SSTF | 65,67,37,14,98,122,124,183 | $12+2+30+23+84+24+2+59=236$ | Fastest, can starve |
| SCAN | 65,67,98,122,124,183,199,37,14 | $12+2+31+24+2+59+16+162+23=331$ | No starvation, middle tracks favored |
| C-SCAN | 65,67,98,122,124,183,199,0,14,37 | $130+16+199+14+23=382$ | Uniform waits, empty return |

SSTF needs only 37% of the FCFS movement, but it keeps postponing request 183; as long as near requests keep arriving, a far one may never be served. SCAN bounds waiting with a direction rule, at the cost of sweeping past recent tracks. C-SCAN spends 51 extra tracks on a deadhead return to even out waits.

> [!NOTE]
> Real systems mostly use LOOK and C-LOOK: reverse at the last pending request instead of the physical edge. With LOOK the SCAN case above drops from 331 to 315 tracks.

## Beyond scheduling: rotation and interleaving

Once seeks are optimized, rotational latency is next. If logically adjacent blocks are physically adjacent, the next block has passed by the time the read finishes, costing a full revolution. **Interleaving** with factor $k$ spreads them out: with $k=2$, logical blocks 0, 1, 2 sit in sectors 0, 2, 4.

Take 64 sectors per track and 8.33 ms per revolution, so one sector takes 0.13 ms. Reading 8 consecutive sectors without interleaving takes 8 revolutions, 66.7 ms. With factor 2 the logical block $i$ sits in sector $2i \bmod 64$, leaving almost a full revolution to reach the next block, so 8 blocks need about one revolution plus 7 sectors, roughly 9.2 ms.

Layout and scheduling must be designed together: only when a file occupies a contiguous extent does "nearest" in SSTF mean "sequential".

| Policy | Starvation | Mean response | Where it fits |
| --- | --- | --- | --- |
| FCFS | None | Poor | Light load, few requests |
| SSTF | Possible | Good | Batch work, clustered requests |
| SCAN | None | Good | General time-sharing |
| C-SCAN | None | Good and even | Databases, many users |

## Three common misconceptions

> [!MYTH] Disk scheduling substantially shortens a single access.
> It changes queue order and total seek distance. One access still pays the hardware seek and rotation.

> [!MYTH] SSTF always beats SCAN because its total movement is smaller.
> Lower movement is not fairness: SSTF can postpone a far request indefinitely; SCAN trades movement for bounded waiting.

> [!MYTH] A faster spindle scales performance proportionally.
> Spin rate only compresses rotational latency: doubling it takes 12.2 ms to 10 ms because seek time is unchanged.

## Practice

> [!PRACTICE] 1 · Compute
> The head is at 50, requests are 10, 60, 80, 30, 90, and the disk spans 0 to 99. Find total head movement for FCFS and SSTF.
>
> > [!ANSWER] Show answer
> > FCFS: $|50-10|+|10-60|+|60-80|+|80-30|+|30-90|=40+50+20+50+60=220$. SSTF: 50→60 (10), →80 (20), →90 (10), →30 (60), →10 (20), total 120.

> [!PRACTICE] 2 · Compute
> At 15,000 rpm with 4 ms average seek and 200 MB/s transfer, what is the average time to read 8 KB?
>
> > [!ANSWER] Show answer
> > $r=250$ rev/s, so rotational latency is $1/(2\times250)=2$ ms and transfer is $8\text{ KB}/200\text{ MB/s}=0.04$ ms. Total $4+2+0.04=6.04$ ms.

> [!PRACTICE] 3 · Reason
> One track in the queue is accessed repeatedly. Is it delayed under SSTF? Under SCAN?
>
> > [!ANSWER] Show answer
> > Under SSTF the hot track is served sooner and the distant cold request is delayed. Under SCAN each track is served once per sweep, so the hot track waits a bounded time.

## Formal statement

Access time is $T_a=T_s+\frac{1}{2r}+\frac{b}{rN}$, with seek time $mn+s$. Scheduling reorders service without changing the request set: FCFS follows arrival order; SSTF picks the nearest request and can starve distant ones; SCAN sweeps to the edge and reverses, bounding waiting time; C-SCAN serves one direction and returns to 0, equalizing waits. The queue above moves the head 640, 236, 331, and 382 tracks.