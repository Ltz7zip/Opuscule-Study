---
slug: "multimedia-realtime-scheduling"
subject: "operating-systems"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 22 · Operating Systems · Mastery"
title: "Real-Time Scheduling and Storage for Multimedia"
subtitle: "How many 4 Mbps streams fit on a 40 MB/s disk"
minutes: 16
meta: ["16 min read","Requires multimedia files","Mastery level"]
concepts: ["iomgmt","sched","cache"]
prereq: ["iomgmt"]
related: ["sched","disksched"]
---

## What you will get

You will be able to model a stream as a periodic task, test schedulability under RM and EDF, and size a buffer or admission limit from bitrate and disk throughput.

## Three lines back

- Continuous media are periodic tasks with deadlines; a late frame is a lost frame.
- Real-time schedulability asks whether every job meets its deadline in the worst case; utilization is only a necessary condition.
- Storage layout and buffering absorb disk jitter so playback stays within the player's tolerance.

## Continuous media and QoS

Audio and video are **continuous media**: playback rate is constant, and a fixed amount must arrive per unit time. The system models a stream as a periodic task $(p_i,e_i)$ with period $p_i$ and worst-case execution time $e_i$.

At $f=30$ fps the period is $p=1000/30=33.3$ ms. If decoding one frame takes $e=20$ ms worst case, one stream uses

$$U_i=\frac{e_i}{p_i}=\frac{20}{33.3}\approx0.60$$

For $n$ streams $U=\sum e_i/p_i$, and $U\le1$ is necessary: beyond 1 some frame must miss.

**QoS** is described by four parameters: throughput (bitrate), latency (request to first frame), jitter (variation in frame spacing), and loss (fraction of late frames). Players absorb jitter with a buffer, paying in startup delay.

| QoS parameter | Meaning | Conferencing | Video on demand |
| --- | --- | --- | --- |
| Throughput | Average bitrate | 1–4 Mbps | 4–15 Mbps |
| Latency | End-to-end delay | Under 150 ms | Under 2 s with buffer |
| Jitter | Arrival spacing deviation | Under 30 ms | Absorbed by buffer |
| Loss | Late or missing frames | Under 1% | Under 0.1% |

## RM and EDF

**Rate-monotonic scheduling** gives shorter periods higher priority. Priorities are static, which keeps implementation simple. A sufficient condition for $n$ periodic tasks is

$$U\le n\left(2^{1/n}-1\right)$$

which evaluates to $1.0$, $0.828$, $0.780$, and $0.693$ for $n=1,2,3,\infty$.

Take three streams: $(p,e)=(100,20)$, $(200,30)$, and $(500,50)$ ms. Then

$$U=\frac{20}{100}+\frac{30}{200}+\frac{50}{500}=0.2+0.15+0.1=0.45$$

For $n=3$ the bound is $3(2^{1/3}-1)=0.7797$, and $0.45<0.7797$, so RM schedules the set. This is only sufficient: a set above the bound may still be schedulable, provable by response-time analysis.

**Earliest-deadline-first** assigns priorities dynamically, always running the job with the nearest deadline. Its condition relaxes to $U\le1$, also necessary, but it must reorder the ready queue on every arrival and behaves badly under overload: everything misses at once, whereas RM predictably starves low-priority tasks.

| Algorithm | Priority | Schedulability | Overload behavior | Cost |
| --- | --- | --- | --- | --- |
| RM | Static, shorter period first | $U\le n(2^{1/n}-1)$ sufficient | Low priority starves predictably | Low |
| EDF | Dynamic, nearest deadline first | $U\le1$ necessary and sufficient | All miss, hard to degrade | High |
| Round robin | Fixed quantum | No hard guarantee | Everything late | Lowest |

## Layout and buffering

Continuous media want sequential reads: if a 100 KB frame is scattered, every read pays a seek, and an 8 ms seek consumes a whole frame budget. Multimedia files therefore use **contiguous allocation** or large clusters, placed in playback order and sometimes interleaved to avoid rotational misses.

Buffer size follows bitrate and tolerated delay:

$$B=R\times t_{\text{buffer}}$$

A 4 Mbps stream buffering 0.5 s needs $4\times10^6\times0.5=2\times10^6$ bits $=250$ KB. If the disk delivers 40 MB/s, that is 320 Mbps, so one stream uses $4/320=1.25\%$ of disk bandwidth and the theoretical admission limit is

$$N_{\max}=\left\lfloor\frac{320}{4}\right\rfloor=80\ \text{streams}$$

Real systems reserve headroom for seeks and bursts, using 60% to 70% of that figure, so 48 to 56 streams.

**Double buffering** alternates between two buffers: the decoder consumes one while the disk fills the other, turning intermittent disk service into a continuous playout stream. Deeper buffering tolerates more jitter, at the cost of startup delay and memory.

> [!NOTE]
> Schedulability is about worst cases: a good average means nothing if one run exceeds the period, so $e_i$ must be measured, not averaged.

## Three common misconceptions

> [!MYTH] Utilization below 1 guarantees no missed frames.
> $U\le1$ is only necessary: if releases cluster in phase, even $U=0.8$ can make deadlines collide and be missed.

> [!MYTH] EDF beats RM in every situation.
> EDF has the higher schedulability bound, but under overload every task misses together and graceful degradation is hard. RM predictably sacrifices low-priority work.

> [!MYTH] Bigger buffers are always better.
> Buffer depth buys jitter tolerance and costs startup delay, memory, and seek distance; in live streaming it shows as seconds of lag.

## Practice

> [!PRACTICE] 1 · Compute
> A 25 fps stream needs 30 ms worst-case decode per frame. What is its utilization, and can two such streams run?
>
> > [!ANSWER] Show answer
> > Period $1000/25=40$ ms, so $U_1=30/40=0.75$. Two streams give $U=1.5>1$ and cannot be scheduled; frames will be missed.

> [!PRACTICE] 2 · Decide
> For tasks $(50,10)$, $(100,20)$, $(200,40)$, apply the RM sufficient condition.
>
> > [!ANSWER] Show answer
> > $U=0.2+0.2+0.2=0.6$, and the bound at $n=3$ is 0.7797, so the condition holds and the set is schedulable.

> [!PRACTICE] 3 · Compute
> An 8 Mbps stream buffers 2 s. How large is the buffer, and how many streams fit on a 200 Mbps disk at 70% utilization?
>
> > [!ANSWER] Show answer
> > $B=8\times10^6\times2/8=2$ MB. The raw limit is $200/8=25$ streams; at 70% it is about 17.

## Formal statement

Continuous media are modeled as periodic tasks $(p_i,e_i)$ with per-stream utilization $e_i/p_i$, and $U=\sum e_i/p_i\le1$ is necessary for schedulability. RM assigns static priorities, shorter period first, and is sufficient when $U\le n(2^{1/n}-1)$; EDF assigns dynamic priorities, nearest deadline first, with condition $U\le1$, but degrades unpredictably under overload. Multimedia files need contiguous or large-cluster allocation to limit seeks, buffer size follows $B=R\cdot t_{\text{buffer}}$, and the number of admissible streams is bounded by disk throughput divided by bitrate.