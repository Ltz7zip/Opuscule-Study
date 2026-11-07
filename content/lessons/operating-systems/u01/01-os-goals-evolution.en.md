---
slug: "os-goals-evolution"
subject: "operating-systems"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Operating Systems · Mastery"
title: "Goals, Roles, and Generations of Operating Systems"
subtitle: "From vacuum tubes to embedded chips: what this layer actually solves"
minutes: 15
meta: ["15 min read","Requires computer organization basics","Mastery level"]
concepts: ["osintro","cpustruct"]
prereq: ["cpustruct"]
related: ["osintro","osif"]
---

## What you will get

By the end of this lecture you can place the operating system in the machine, state which problems it removes, tell batch, time-sharing, real-time, network, and embedded systems apart by goal, response style, and scheduling policy, and compute the CPU-utilization gap between uniprogramming and multiprogramming.

## Three lines back

- A bare machine executes instructions and nothing else; nobody allocates resources or controls concurrency until the operating system adds that layer.
- Its four goals are convenience, efficiency, extensibility, and openness. Efficiency shows up directly as overlap between CPU work and I/O.
- The history of system types is a history of shifting gears between throughput and response time.

## Where the operating system sits

The operating system is the first software layer above the hardware. It turns CPU, memory, and devices into reusable resources and offers a friendlier interface than raw machine instructions.

Four goals: **convenience** (a usable interface), **efficiency** (higher CPU and I/O utilization, higher throughput), **extensibility** (a modular structure that accepts new functions), and **openness** (standards that allow interconnection).

Three roles: **resource manager**, keeping records of and allocating processors, memory, devices, and files; **interface between user and hardware**, offering command, program, and graphical interfaces; and **virtual machine**, presenting a bare machine as something more capable and easier to use.

> [!NOTE]
> Resource management is exactly four jobs: processor management, memory management, device management, and file management.

## From uniprogramming to multiprogrammed batch

A uniprogrammed batch system keeps one job in memory, so CPU and I/O run strictly in sequence: the device idles while the job computes, and the CPU idles while the job waits on I/O.

Multiprogramming loads several jobs at once. When one job blocks on I/O, the CPU switches to another. Take three jobs:

| Job | CPU time | I/O time | Total |
| --- | --- | --- | --- |
| A | 40 ms | 60 ms | 100 ms |
| B | 50 ms | 50 ms | 100 ms |
| C | 30 ms | 70 ms | 100 ms |

Run one at a time, the total is $100+100+100=300$ ms, with the CPU busy for $40+50+30=120$ ms, so

$$\eta_{\text{uni}}=\frac{120}{300}=40\%$$

Run together, and assuming the I/O phases can overlap, the makespan is set by the longer side:

$$T_{\text{multi}}=\max\left(\sum \text{CPU},\ \sum \text{I/O}\right)=\max(120,\ 180)=180\ \text{ms}$$

$$\eta_{\text{multi}}=\frac{120}{180}\approx 66.7\%$$

The price of higher utilization is longer turnaround per job and no user control over a running program. That is precisely why batch systems favor throughput over interaction.

## Time-sharing, real-time, and the rest

A **time-sharing system** slices the CPU into short quanta and rotates them among terminal users. With $n$ users and quantum $q$, ignoring switch overhead, the worst-case gap between two turns of the same user is about $nq$. At $n=20$ and $q=50$ ms the wheel turns in roughly 1 s, which is what "responsive" means numerically. Simultaneity, interactivity, and independence are its three defining properties.

A **real-time system** must respond before a definite deadline, and is classed as hard or soft. If a periodic task arrives every 20 ms and needs 5 ms of execution, its utilization is

$$U=\frac{5}{20}=25\%$$

As long as the utilizations of all periodic tasks sum to at most 1, a single processor still has slack.

| Type | Main goal | Scheduling basis | Typical setting | Main drawback |
| --- | --- | --- | --- | --- |
| Batch | High throughput | Arrival order, run time | Payroll, bulk computation | No interaction, long turnaround |
| Time-sharing | Fast, fair response | Round-robin quanta | Multi-terminal hosts | Switch overhead, low per-user power |
| Real-time | Guaranteed deadlines | Priority, period | Control, avionics, automotive | Redundant capacity, narrow use |
| Network/distributed | Shared resources, coordination | Location transparency | Clusters, cloud | Consistency and message cost |
| Embedded | Small and reliable | Event-driven | Appliances, industrial control | Tight resources, hard to upgrade |

A network operating system lets machines share resources over a network while each stays autonomous, so users must name the machine they want. A distributed operating system makes many machines behave as one logical computer, hiding placement. Embedded systems trim the kernel, drop disk and display support, and emphasize timeliness.

## Three common misconceptions

> [!MYTH] The operating system is the graphical desktop.
> The desktop is a shell. Strip away the window system and the kernel still schedules processes, allocates memory, and drives devices.

> [!MYTH] More programs in memory always means faster.
> Only overlap of I/O waits helps. With purely computational jobs, multiprogramming merely lengthens every job's turnaround by contending for the CPU.

> [!MYTH] A real-time system is simply a fast system.
> Real-time means predictable deadlines, not high average speed. A system that is fast on average but occasionally late fails hard real-time requirements.

## Practice

> [!PRACTICE] 1 · Compute
> Job A needs 40 ms of CPU and 20 ms of I/O; job B needs 30 ms of CPU and 30 ms of I/O. Find the CPU utilization under uniprogramming and under ideal multiprogramming.
>
> > [!ANSWER] Show answer
> > Uniprogrammed: total $60+60=120$ ms with 70 ms of CPU work, so $70/120\approx 58.3\%$. Multiprogrammed: makespan $\max(70,50)=70$ ms, so $70/70=100\%$.

> [!PRACTICE] 2 · Decide
> In a time-sharing system, is a larger quantum always better?
>
> > [!ANSWER] Show answer
> > No. Too large a quantum degenerates into first-come-first-served and hurts interactivity; too small a quantum makes switching overhead dominant. Size it from the terminal count and the acceptable response time.

## Formal statement

An operating system is the collection of programs that controls and manages the hardware and software resources of a computer system, organizes and schedules jobs and user programs, and provides the user interface and environment. Throughput of a batch system is the number of jobs completed per unit time. The response-time bound of a time-sharing system is determined jointly by the user count $n$ and the quantum $q$, and is approximately $nq$. Schedulability of a real-time system requires the utilization of all periodic tasks to satisfy $\sum_i C_i/T_i \le 1$, where $C_i$ is the execution time and $T_i$ the period of task $i$.