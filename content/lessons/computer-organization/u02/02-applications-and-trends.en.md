---
slug: "applications-and-trends"
subject: "computer-organization"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Computer Organization · Mastery"
title: "Application Domains and Technology Trends"
subtitle: "From 10^15 floating-point operations to a 9.14× speedup on 16 cores"
minutes: 15
meta: ["15 min read","Requires machine classes and performance metrics","Mastery level"]
concepts: ["cpustruct","complexity"]
prereq: ["cpustruct"]
related: ["pipeline","complexity"]
---

## What you will get

By the end of this lecture you can separate scientific computing, data processing, real-time control, CAD, and AI by task shape, name the key metric for each, and estimate multicore speedup with Amdahl's law as well as the fraction of peak compute that memory bandwidth can support.

## Three lines back

- Different applications hit different walls: floating-point throughput, I/O, or response time.
- Multicore speedup is capped by the serial fraction at $1/(1-p)$.
- Memory bandwidth and power are the two hard constraints today, and specialization is one answer.

## Five application domains and their metrics

| Domain | Task shape | Key metric | Typical scale |
| --- | --- | --- | --- |
| Scientific computing | Large floating-point iteration, compute-bound | FLOPS, double precision, interconnect bandwidth | $10^{12}$–$10^{18}$ FLOP |
| Data processing | Many record operations, I/O-bound | Transactions per second, latency, capacity | $10^3$–$10^5$ TPS |
| Real-time control | Periodic sampling and actuation, hard deadline | Interrupt latency, jitter, reliability | μs–ms response |
| CAD | Geometric modeling and rendering | Triangle throughput, video memory bandwidth | Millions of triangles per frame |
| Artificial intelligence | Matrix multiply and convolution, parallel | TOPS, memory capacity, efficiency | $10^{12}$–$10^{18}$ operations |

The useful discriminator is operations per byte fetched. Scientific computing and AI are compute-bound, so the processor spends most of its time calculating. Data processing is I/O-bound, with the bottleneck in storage or the network. Real-time control cares about the worst-case latency bound; a fast average is worthless if one deadline is missed.

Matrix multiplication makes the arithmetic concrete. Multiplying two $n\times n$ matrices takes about $2n^3$ floating-point operations. For $n=20000$,

$$2n^3=2\times(2\times10^4)^3=1.6\times10^{13}\ \text{FLOP}$$

A 1 TFLOPS server finishes in 16 s, while a 100 GFLOPS desktop needs 160 s. A tenfold compute gap produces a tenfold time gap, which confirms that this workload is governed by floating-point peak.

## Parallelism and multicore: Amdahl's law

Let a fraction $p$ of the program be parallelizable and use $n$ processors, ignoring communication. The speedup is

$$S(n)=\frac{1}{(1-p)+\dfrac{p}{n}}$$

With $p=0.95$:

| Processors $n$ | Parallel term $p/n$ | Speedup $S(n)$ |
| --- | --- | --- |
| 1 | 0.95 | 1.00 |
| 4 | 0.2375 | 3.48 |
| 16 | 0.0594 | 9.14 |
| $\infty$ | 0 | 20.00 |

Sixteen cores deliver 9.14×, not 16×, because the remaining 5% of serial code does not get faster. As $n\to\infty$, $S\to1/(1-p)=20$, the ceiling. If the serial part were 10%, the ceiling would be 10×. Going further requires shrinking or parallelizing the serial code itself.

Real systems add communication, synchronization, and cache-coherence overhead, so measured speedup is usually below the formula. Power is another cost: at a fixed process, a 20% clock increase can raise dynamic power by more than 40%, whereas more cores at lower clock can deliver higher aggregate throughput.

## From single core to heterogeneous design

| Trend | Means | Cost |
| --- | --- | --- |
| More parallelism | Multicore, SIMD, GPU | Harder programming, needs data parallelism |
| Deeper memory hierarchy | Multilevel caches, high-bandwidth memory | More area and cost, hit rate is not guaranteed |
| Specialization | AI accelerators, DPUs, NPUs | Less generality, ecosystem migration cost |

The memory wall can be quantified with a ratio. Suppose a processor peaks at 200 GFLOPS and the program performs 2 floating-point operations per byte fetched from memory. Sustaining peak requires

$$B=\frac{200\times10^9}{2}=100\ \text{GB/s}$$

Dual-channel DDR4-3200 peaks at about $2\times3200\times10^6\times8=51.2$ GB/s, which supports only

$$P=51.2\times10^9\times2=102.4\ \text{GFLOPS}$$

about 51% of peak. This is why matrix multiplication is blocked so reused data fits in cache, and why AI chips use high-bandwidth memory or on-chip SRAM.

> [!NOTE]
> Peak FLOPS is a ceiling, not a typical result. Real programs are limited by memory bandwidth, dependency chains, and synchronization at the same time, so evaluate a machine on measured throughput for the target workload.

## Three common misconceptions

> [!MYTH] Doubling the core count doubles program speed.
> That holds only for fully parallel code with no communication. Amdahl's law ties the ceiling to the serial fraction; 16 cores at 95% parallelism give 9.14×.

> [!MYTH] A GPU is always faster than a CPU.
> GPUs excel at regular, data-parallel floating-point and matrix work. Programs with heavy branching, long dependency chains, or tiny data sets may run slower, and data transfer adds time.

> [!MYTH] Scientific computing depends only on floating-point throughput, not memory.
> The faster the compute, the more bandwidth is needed to feed it. At 200 GFLOPS and 2 FLOP per byte, the workload needs 100 GB/s, beyond ordinary dual-channel memory.

## Practice

> [!PRACTICE] 1 · Speedup
> A program is 90% parallel. What speedup do 8 cores give, and what is the ceiling with infinitely many cores?
>
> > [!ANSWER] Show answer
> > With 8 cores, $S=1/(0.1+0.9/8)=1/0.2125=4.71$. The ceiling is $1/0.1=10$, so more cores cannot go beyond 10×.

> [!PRACTICE] 2 · Matrix time
> A $10000\times10000$ matrix multiply needs about $2\times10^{12}$ FLOP. How long does a machine measured at 500 GFLOPS take?
>
> > [!ANSWER] Show answer
> > $2\times10^{12}/5\times10^{11}=4$ s. At 50% of peak, it would take 8 s.

> [!PRACTICE] 3 · Bandwidth gap
> A 300 GFLOPS processor runs a kernel at 3 FLOP per byte. What bandwidth does it need, and what fraction of peak does 64 GB/s support?
>
> > [!ANSWER] Show answer
> > It needs $300\times10^9/3=100$ GB/s. At 64 GB/s the sustainable rate is $64\times10^9\times3=192$ GFLOPS, or $192/300=64\%$ of peak.

## Formal statement

Computer applications fall into scientific computing, data processing, real-time control, CAD, and artificial intelligence, measured mainly by floating-point throughput, transaction throughput and response time, worst-case latency, graphics throughput, and integer or matrix throughput respectively. If a fraction $p$ of a program is parallelizable and $n$ processors are used, Amdahl's law gives $S(n)=1/[(1-p)+p/n]$, bounded above by $1/(1-p)$. When the processor peak is $P$ and the program performs $q$ operations per byte fetched, the bandwidth needed to sustain peak is $B=P/q$, and the achievable compute is limited by $B_{\text{real}}q$. Multicore scaling, deeper memory hierarchies, and specialized accelerators are the three main development paths, paid for in programming complexity, area cost, and reduced generality.