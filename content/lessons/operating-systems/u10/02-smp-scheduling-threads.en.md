---
slug: "smp-scheduling-threads"
subject: "operating-systems"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 20 · Operating Systems · Mastery"
title: "Symmetric Multiprocessor Scheduling and Thread Models"
subtitle: "Twelve tasks on four cores: one bad split doubles the finish time"
minutes: 16
meta: ["16 min read","Requires multiprocessor structures","Mastery level"]
concepts: ["multiproc","sched","thread"]
prereq: ["multiproc"]
related: ["sched","process"]
---

## What you will get

You will be able to compare single and per-processor ready queues, explain affinity and push and pull migration, compute imbalance costs, and choose a thread model from blocking behavior.

## Three lines back

- Multiprocessor scheduling adds two questions: which core runs a thread, and whether to move it later.
- Affinity protects cache locality while balancing pursues fairness; a threshold reconciles them.
- The thread model decides whether one blocking system call stalls the whole process.

## Ready-queue organization and migration

A **single ready queue** is shared: whichever core is free takes the next thread. Balancing is automatic, but the queue becomes a contention point, and a thread may land on any core, losing its cache. **Per-processor queues** give each core its own queue, removing lock contention and preserving locality, but load can drift and needs migration.

| Organization | Contention | Balance | Locality | Migration |
| --- | --- | --- | --- | --- |
| Single queue | Global lock, worse with more cores | Automatic | Poor, threads drift | Frequent and uncontrolled |
| Per-processor queue | Lock-free | Requires active migration | Good | Controlled by threshold |
| Grouped queues | Shared within a group | Migrate between groups | Fair | Moderate |

**Affinity** keeps a thread where it ran: hard affinity binds it to a set of cores, soft affinity is a preference that still permits migration. **Load balancing** works the other way, with **push migration**, where a busy core hands threads to idle ones, or **pull migration**, where an idle core takes work. Migration is signalled by an inter-processor interrupt.

Migration is not free: with a 1 MB working set, a 10 ns L2 hit, and 100 ns memory access, rebuilding it cold costs about $0.5$ ms. If a thread's slice is only $2$ ms, migration consumes a quarter of its budget. Schedulers migrate only when the busiest and idlest cores differ by a threshold, often 25%.

## The cost of imbalance

Four processors, twelve tasks of 10 ms each; ideally three per core:

$$T_{\text{ideal}}=\frac{12\times10}{4}=30\ \text{ms}$$

If the queues hold 6, 2, 2, and 2 tasks, the busiest core runs

$$T_{\text{actual}}=6\times10=60\ \text{ms}$$

twice as long, while three cores sit half idle. Moving one task gives 5, 3, 2, 2 and 50 ms; another gives 4, 3, 3, 2 and 40 ms. Reaching 30 ms needs exactly three per core, so migration must continue while running.

The problem is bin packing: filling $n$ equal bins while minimizing the largest is NP-hard, so schedulers use heuristics. A common one sorts by load and places each task on the lightest core (LPT), within $4/3-1/(3n)$ of optimal.

## Thread models

User-level threads are managed by a library: switches avoid the kernel, but one blocking call stalls the whole process and no core runs in parallel. Kernel-level threads are scheduled by the kernel, truly parallel, at a system call per switch. Combining them gives three models:

| Model | User : kernel threads | Blocking call | Multicore | Examples |
| --- | --- | --- | --- | --- |
| Many-to-one | $n:1$ | Blocks the process | No | Early green threads |
| One-to-one | $1:1$ | Blocks one thread | Yes | Linux NPTL |
| Many-to-many | $m:n$ | Blocks one thread | Yes | Go goroutines |

Many-to-one is lightest: a thread is just a user stack, but one blocking `read` stops everything. One-to-one is simplest: each user thread has a kernel entity, at the price of kernel resources. Many-to-many multiplexes $m$ user threads onto $n$ kernel threads and adjusts $n$; it is the most complex and the most scalable.

> [!NOTE]
> "More threads than cores is pointless" holds only for pure computation. I/O-bound work needs far more threads than cores to hide waiting, and the limit is memory and kernel stacks, not cores.

## Three common misconceptions

> [!MYTH] More cores means more threads is always better.
> For compute-bound work, exceeding the core count adds switching and cache pressure. Size the pool from blocking ratio, not from cores times a constant.

> [!MYTH] Hard affinity always improves performance.
> Pinning a thread to a saturated core just makes it queue. Hard affinity suits real-time work and NUMA locality, not general loads.

> [!MYTH] User-level threads switch fast, so they should be preferred.
> The speed holds only without blocking. One blocking call stops the whole process and wastes every core, costing far more than the switch saves.

## Practice

> [!PRACTICE] 1 · Compute
> Four cores, ten tasks of 20 ms each, distributed 4, 3, 2, 1. Completion time and ideal?
>
> > [!ANSWER] Show answer
> > Actual $4\times20=80$ ms against an ideal $10\times20/4=50$ ms, 60% slower. One migration to 3, 3, 2, 2 gives 60 ms.

> [!PRACTICE] 2 · Choose
> A server blocks 5 ms on a database read and computes 0.5 ms per request. Which thread model?
>
> > [!ANSWER] Show answer
> > One-to-one or many-to-many with kernel threads; many-to-one stalls the whole process on the first blocking read.

> [!PRACTICE] 3 · Decide
> Two threads are pinned to cores 0 and 1 and frequently increment a shared counter. Will performance be good?
>
> > [!ANSWER] Show answer
> > No. Pinning stops drift, but the counter still bounces one cache line; use atomics or sharded counters.

## Formal statement

SMP scheduling uses a single ready queue, balancing automatically but contending globally, or per-processor queues, preserving locality but requiring migration. Affinity is hard when explicit and soft when a preference; balancing uses push or pull migration, signalled by inter-processor interrupts and gated by a load threshold. Imbalance makes completion time the busiest processor's work, against an ideal of total work divided by cores. Thread models are many-to-one, one-to-one, and many-to-many, trading kernel threads, blocking, and parallelism.