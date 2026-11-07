---
slug: "scheduling-algorithms"
subject: "operating-systems"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Operating Systems · Mastery"
title: "Classical Processor-Scheduling Algorithms"
subtitle: "One process set, three algorithms, three different answers"
minutes: 17
meta: ["17 min read","Requires processes and states","Mastery level"]
concepts: ["sched","process"]
prereq: ["process"]
related: ["deadlock","sched"]
---

## What you will get

By the end of this lecture you can write the turnaround formulas, hand-compute completion times for FCFS, SJF, and round-robin, and explain why a multilevel feedback queue serves short jobs well without knowing their run times.

## Three lines back

- Scheduling has three levels: job, process, and intermediate. The lower the level, the more often it runs.
- Turnaround is submission to completion; weighted turnaround divides it by service time and exposes how badly long jobs are delayed.
- FCFS is simple but suffers convoy effects, SJF minimizes average turnaround but needs run times in advance, and round-robin is fair but pays for context switches.

## Metrics

For process $i$ with arrival $a_i$, service time $b_i$, and completion $c_i$:

$$T_i=c_i-a_i,\qquad W_i=\frac{T_i}{b_i}=\frac{c_i-a_i}{b_i}$$

$T_i$ is the turnaround time and $W_i$ the weighted turnaround time. The averages are $\bar T=\frac1n\sum T_i$ and $\bar W=\frac1n\sum W_i$. Two more quantities matter: waiting time $T_i-b_i$ and response time, the first moment on the CPU minus the arrival time.

| Metric | Definition | What it exposes |
| --- | --- | --- |
| Turnaround | Completion minus arrival | Total time a user waits |
| Weighted turnaround | Turnaround divided by service time | Fairness between short and long jobs |
| Waiting time | Turnaround minus service time | Loss from CPU idleness |
| Response time | First run minus arrival | Interactive quality |

## FCFS, SJF, and priority

**FCFS** queues by arrival and never preempts. **SJF** picks the shortest service time next; in its non-preemptive form a running job is not interrupted. **Priority scheduling** picks by static or dynamic priority and may preempt.

Take four processes: P1 (arrival 0, service 7), P2 (2, 4), P3 (4, 1), P4 (5, 4).

FCFS runs P1, P2, P3, P4 and completes them at 7, 11, 12, 16. SJF, at $t=7$, picks the shortest of P2, P3, P4, which is P3; the order becomes P1, P3, P2, P4 with completions 7, 8, 12, 16.

| Process | Arrival | Service | FCFS completion | FCFS weighted | SJF completion | SJF weighted |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | 0 | 7 | 7 | 1.00 | 7 | 1.00 |
| P2 | 2 | 4 | 11 | 2.25 | 12 | 2.50 |
| P3 | 4 | 1 | 12 | 8.00 | 8 | 4.00 |
| P4 | 5 | 4 | 16 | 2.75 | 16 | 2.75 |
| Average | - | - | $\bar T=8.75$ | $\bar W=3.50$ | $\bar T=8.00$ | $\bar W=2.56$ |

SJF drops average turnaround from 8.75 to 8.00 at the cost of delaying P2. When all processes arrive together and service times are known, ordering by increasing service time minimizes average turnaround; the obstacle is that service times must be estimated from history.

## Round-robin and multilevel feedback

**Round-robin** keeps the ready queue in arrival order and gives each process one quantum $q$, then sends it to the tail. With $q=4$: P1 runs 0 to 4 and is preempted; P2 runs 4 to 8 and finishes; P3 runs 8 to 9 and finishes; P1 runs 9 to 12 and finishes; P4 runs 12 to 16.

| Algorithm | Average turnaround | Average weighted | Main weakness |
| --- | --- | --- | --- |
| FCFS | 8.75 | 3.50 | Convoy effect, short jobs stuck behind long ones |
| SJF | 8.00 | 2.56 | Needs run times; long jobs may starve |
| RR, q=4 | 8.50 | 2.74 | Switch overhead grows as q shrinks |

Round-robin completes them at 12, 8, 9, 16, averaging 8.50, between the other two. Its response time is better: P2 starts at $t=4$, versus 7 for FCFS and 8 for SJF.

A **multilevel feedback queue** keeps several ready queues with decreasing priority. Queue 1 has the smallest quantum (say 1), queue 2 doubles it, and so on. A new process enters queue 1; if it uses the whole quantum it drops one level, and if it blocks on I/O and yields early it stays. The scheduler always serves the highest non-empty queue, round-robin within a level.

Short jobs finish in level 1 and respond quickly; long jobs sink and receive larger quanta, so switching becomes rare; I/O-bound processes keep high priority by yielding. No run-time knowledge is required, making it an engineering approximation of SJF.

> [!NOTE]
> If level $k$ has quantum $q_k=2^{k-1}$, a job needing $B$ units of CPU sinks no lower than level $k=\lceil\log_2(B+1)\rceil$.

## Three common misconceptions

> [!MYTH] Smaller quanta always improve response, so pick the smallest.
> Response is bounded by switch overhead too. Once the quantum approaches the switch cost, most CPU time goes into saving and restoring context.

> [!MYTH] SJF always beats FCFS.
> SJF wins only on average turnaround. It starves long jobs and depends on accurate service-time estimates.

> [!MYTH] Priority scheduling cannot starve.
> With static priorities and a steady stream of high-priority arrivals, low-priority processes wait forever. Aging fixes this by raising priority with waiting time.

## Practice

> [!PRACTICE] 1 · Compute
> Three processes arrive together with service times 2, 4, 8. Find average turnaround under FCFS and SJF.
>
> > [!ANSWER] Show answer
> > FCFS completes at 2, 6, 14, so $\bar T=(2+6+14)/3\approx7.33$. SJF gives the same order here, since 2, 4, 8 is already ascending. With order 8, 4, 2, FCFS would give $(8+12+14)/3\approx11.33$.

> [!PRACTICE] 2 · Compute
> The same three jobs, $q=2$: what are the completion times?
>
> > [!ANSWER] Show answer
> > 2, 8, and 14, so $\bar T=(2+8+14)/3=8$.

## Formal statement

For process $i$, turnaround is $T_i=c_i-a_i$ and weighted turnaround is $W_i=T_i/b_i$, where $c_i$ is the completion time, $a_i$ the arrival time, and $b_i$ the service time. Average turnaround and average weighted turnaround are $\bar T=\frac1n\sum_{i=1}^{n}T_i$ and $\bar W=\frac1n\sum_{i=1}^{n}W_i$. When all processes arrive together, service times are known, and preemption is disallowed, scheduling in ascending order of service time minimizes $\bar T$.