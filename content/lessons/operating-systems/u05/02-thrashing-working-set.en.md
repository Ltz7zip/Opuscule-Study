---
slug: "thrashing-working-set"
subject: "operating-systems"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 10 · Operating Systems · Mastery"
title: "Thrashing, Working Sets, and Demand Segmentation"
subtitle: "Why more frames can mean more faults"
minutes: 16
meta: ["16 min read","Requires page-replacement algorithms","Mastery level"]
concepts: ["virtmem","cache"]
prereq: ["virtmem"]
related: ["memmgmt","sched"]
---

## What you will get

By the end of this lecture you can demonstrate Belady's anomaly, compute a working set for a window and decide whether the system thrashes, distinguish three allocation policies, and explain what demand segmentation adds.

## Three lines back

- Belady's anomaly proves that more frames is not always better; the root cause is that FIFO lacks the stack property.
- Thrashing is what happens when the degree of multiprogramming exceeds what memory can support: processes swap instead of computing.
- A working set estimates locality with a sliding window, and the number of distinct pages inside it is the process's current demand.

## Belady's anomaly and locality

Take the reference string $1,2,3,4,1,2,5,1,2,3,4,5$ under FIFO:

| Frames | Faults | Fault rate |
| --- | --- | --- |
| 3 | 9 | $9/12=75\%$ |
| 4 | 10 | $10/12\approx83\%$ |

With three frames: load 1, 2, 3 (three faults), 4 evicts 1, 1 evicts 2, 2 evicts 3, 5 evicts 4, then 1 and 2 hit, 3 evicts 5, 4 evicts 1, 5 evicts 2 - nine faults. With four frames: load 1, 2, 3, 4 (four faults), 1 and 2 hit, 5 evicts 1, 1 evicts 2, 2 evicts 3, 3 evicts 4, 4 evicts 5 - ten faults. One extra frame, and every access misses.

FIFO is not a stack algorithm: its resident set with $n$ frames need not be a subset of the set with $n+1$. LRU and OPT satisfy the inclusion property and cannot show the anomaly.

Real programs tolerate faults through **locality**: temporal (recent use predicts reuse) and spatial (neighbouring addresses are used together). Every replacement algorithm bets on locality.

## Working sets and thrashing

The **working set** $W(t,\Delta)$ is the set of pages referenced in the $\Delta$ most recent references before time $t$, where $\Delta$ is the window length. Suppose the tail of the reference sequence is $2,6,1,5,7,7,7$ and $\Delta=4$. The window holds $1,5,7,7$, so

$$W(t,4)=\{1,5,7\},\qquad |W(t,4)|=3$$

The size is called the WSS. A process needs at least its WSS in frames to avoid constant faulting.

**Thrashing** means a process spends its time moving pages between memory and disk while the CPU sits idle. The test is

$$\sum_{i=1}^{n}\text{WSS}_i > m$$

where $m$ is the total number of available frames. For four processes with WSS values 60, 80, 70, and 50:

$$60+80+70+50=260>256$$

Four frames over budget: already thrashing. Raising the degree then makes it worse - fewer frames per process, more faults, longer I/O queues, lower CPU use, so the scheduler admits another process: a feedback loop.

Two exits: reduce the degree by suspending processes, or switch to local replacement so each process evicts only its own pages.

## Allocation policies and demand segmentation

| Policy | Allocation | Replacement scope | Character |
| --- | --- | --- | --- |
| Fixed, local | Frame count set at creation | Only this process's frames | Simple, hard to size |
| Variable, global | Take from the free list on demand | Any process's page | Flexible, easily dragged down by others |
| Variable, local | Adjusted dynamically, but local | This process's frames only | Balanced, needs periodic re-estimation |

How many frames under fixed allocation? Allocate in proportion to process size. With 64 frames and three processes of 40, 30, and 30 pages:

$$64\times\frac{40}{100}=25.6\approx26,\quad 64\times\frac{30}{100}=19.2\approx19$$

The third process receives the remaining 19, and the total is 64.

**Demand segmentation** adds a present bit $P$, a reference bit, a dirty bit, and a disk address to each segment-table entry; touching a non-resident segment raises a **segment fault**. If a large enough free area exists the segment loads directly, otherwise the system coalesces neighbouring holes, and if that fails it evicts segments, writing back dirty victims first.

Two difficulties are unique: unequal segments need contiguous space and may require compaction, and growing segments may force a move. The payoff is sharing and protection on units that match program structure.

> [!NOTE]
> A higher degree of multiprogramming is not better. The optimum is bounded by $\sum \text{WSS}_i \le m$; beyond that lies thrashing.

## Three common misconceptions

> [!MYTH] A faster disk cures thrashing.
> Faster storage shortens each fault but leaves the cause - too few frames - untouched. Without lowering the degree of multiprogramming, thrashing persists.

> [!MYTH] A larger working-set window is more accurate.
> Too large counts pages long abandoned and overestimates demand; too small misses active pages. It should span one locality interval.

> [!MYTH] Demand segmentation is equivalent to demand paging.
> Paging moves fixed-size pieces and loads easily; segmentation moves variable-size pieces, needs contiguous space, and may require compaction. The costs differ.

## Practice

> [!PRACTICE] 1 · Compute
> For the sequence 1,2,3,1,2,4,2 with window $\Delta=3$, find the working set at the last instant.
>
> > [!ANSWER] Show answer
> > The last three references are 2, 4, 2, so $W=\{2,4\}$ and the WSS is 2.

> [!PRACTICE] 2 · Decide
> Five processes have WSS values 40, 50, 45, 35, and 40, with 200 frames available. Will the system thrash?
>
> > [!ANSWER] Show answer
> > The sum is $210>200$, ten frames over budget, so the system is in the thrashing region. Suspend a process or lower the degree of multiprogramming.

## Formal statement

The working set $W(t,\Delta)$ is the set of pages touched by the $\Delta$ memory references preceding time $t$, and its cardinality is the WSS. When the sum of the WSS values of all processes exceeds the number of available frames $m$, the system enters thrashing, marked by a sharp rise in fault rate and a fall in CPU utilization. Belady's anomaly is the increase in fault count caused by adding frames under FIFO replacement, and it arises because FIFO fails the inclusion property required of stack algorithms. In demand segmentation the segment-table entry adds a present bit, a reference bit, a dirty bit, and a disk address, and a reference to a non-resident segment raises a segment fault.