---
slug: "multiprocessor-structure"
subject: "operating-systems"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 19 · Operating Systems · Mastery"
title: "Multiprocessor Structures and Process Synchronization"
subtitle: "Eight cores, 10% serial code, a speedup of only 4.7"
minutes: 16
meta: ["16 min read","Requires process synchronization","Mastery level"]
concepts: ["multiproc","thread"]
prereq: ["process"]
related: ["sched","memhier"]
---

## What you will get

You will be able to classify multiprocessors by memory model, explain how spin locks rest on atomic instructions and when spinning beats blocking, and compute a speedup ceiling with Amdahl's law.

## Three lines back

- Multiprocessors are classified by whether memory is shared and whether latency is uniform.
- Hardware atomic instructions are the foundation of all multicore synchronization.
- The serial fraction of a program caps its speedup, and the cap tightens as cores are added.

## UMA, NUMA, and loosely coupled systems

In **UMA** all processors reach one physical memory through a bus or crossbar at the same cost; SMP is the standard case. **NUMA** gives each processor local memory, so local access is fast and remote access slower, with nodes joined by an interconnect. A **loosely coupled** system has no shared memory: each node is a separate computer cooperating by messages, as in clusters and MPPs.

| Structure | Memory | Access latency | Scalability | Programming model |
| --- | --- | --- | --- | --- |
| UMA / SMP | Fully shared | About 100 ns everywhere | Bus-limited, usually up to 32 sockets | Shared variables plus locks |
| NUMA | Distributed shared | About 80 ns local, 220 ns remote | Hundreds of nodes | Shared variables, locality matters |
| Loosely coupled | None | Microseconds per message | Tens of thousands of nodes | Message passing (MPI) |

The number that matters is the ratio: remote access costs $220/80=2.75$ times local. Hence first-touch allocation: whichever processor first writes a page gets it locally. Sharing one structure across nodes makes performance fall as nodes grow.

## Atomic operations and spin locks

Two processors executing `lock = true` concurrently lose updates because read-modify-write is not atomic. Hardware supplies **atomic instructions**, most simply test-and-set:

```
bool test_and_set(bool *target) {   // atomic in hardware
    bool old = *target;
    *target = true;
    return old;
}

void lock(bool *l)   { while (test_and_set(l)) ; }
void unlock(bool *l) { *l = false; }
```

The empty loop is **spinning**: it refuses to give up the processor, which pays off only if the lock is released soon. Compare the section with two context switches: at $5\ \mu\text{s}$ per switch and a $1\ \mu\text{s}$ section, blocking pays ten times the section, so spinning wins; at $1\ \text{ms}$ spinning burns a core and blocking is right.

Spinning also stresses cache coherence: **MESI** marks each line modified, exclusive, shared, or invalid, and a write must invalidate other copies. Every failed attempt consumes interconnect bandwidth, so eight cores on one lock can generate $O(n^2)$ traffic.

The subtler problem is **false sharing**: two unrelated variables sit in one 64 B line, two cores write their own copies, and the line bounces. Padding each to 64 B can take an update from about 100 ns to a few nanoseconds.

| Mechanism | Waiting | Fits | Cost |
| --- | --- | --- | --- |
| Spin lock | Busy-wait | Very short, below two switches | Wasted CPU and bandwidth |
| Blocking lock / semaphore | Sleep and wake | Longer or blocking sections | Two context switches |
| Atomic CAS | Lock-free retry | Single-variable updates | Retry storms under contention |

## The speedup ceiling

With parallel fraction $p$ and $n$ processors, Amdahl's law gives

$$S(n)=\frac{1}{(1-p)+\dfrac{p}{n}}$$

For $p=0.9$ and $n=8$:

$$S(8)=\frac{1}{0.1+0.1125}=\frac{1}{0.2125}\approx4.71$$

Eight cores buy 4.71 times, because the 10% serial code runs in order however many cores exist; even as $n\to\infty$ the ceiling is $1/0.1=10$.

The same formula explains why kernels remove global locks: a global lock serializes what could run in parallel, lowering $p$; per-processor or per-structure locks keep $p$ alive as cores grow.

> [!NOTE]
> Amdahl's law assumes a fixed problem size; if it grows with the processor count, Gustafson's law applies and speedup can approach linear, though no single task finishes proportionally sooner.

## Three common misconceptions

> [!MYTH] Doubling cores doubles program speed.
> Only a fully parallel program with no synchronization overhead approaches linear. A 10% serial fraction caps eight cores at 4.71 times.

> [!MYTH] A spin lock is always faster than a blocking lock.
> Spinning wins only for very short sections. Longer than two context switches, it burns a whole time slice and worsens bus contention.

> [!MYTH] Threads writing different variables cannot contend.
> If the variables share a cache line, false sharing keeps invalidating the line and can make the program slower than single-threaded code.

## Practice

> [!PRACTICE] 1 · Compute
> With a parallel fraction of 0.95, find the speedup at 4 and 16 cores, plus the ceiling.
>
> > [!ANSWER] Show answer
> > $S(4)=1/(0.05+0.0125)=16$; $S(16)=1/(0.05+0.003125)\approx18.8$; the ceiling is $1/0.05=20$. Quadrupling cores adds only 2.8 times.

> [!PRACTICE] 2 · Compute
> A critical section runs 2 μs and a context switch costs 6 μs. What does each lock cost, and which wins?
>
> > [!ANSWER] Show answer
> > Spinning waits about 2 μs if the lock is released promptly; blocking needs two switches, 12 μs. Spinning wins at roughly one sixth the cost.

> [!PRACTICE] 3 · Decide
> Four cores each increment `int cnt[4]` at its own index. Is there false sharing, and how is it fixed?
>
> > [!ANSWER] Show answer
> > Yes. Four ints occupy 16 B and usually share one 64 B line. Pad each element to 64 B, for example with `char pad[60]`, or use an alignment attribute.

## Formal statement

Multiprocessors split into UMA, NUMA, and loosely coupled: UMA shares one memory with uniform latency, NUMA gives local memory with slower remote access, and loosely coupled systems share nothing and cooperate by messages. Synchronization rests on atomic instructions; test-and-set yields a spin lock, which beats a blocking lock when the section is shorter than two switches but consumes bus traffic. Amdahl's law gives $S(n)=1/((1-p)+p/n)$ with upper bound $1/(1-p)$.