---
slug: "process-description-states"
subject: "operating-systems"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Operating Systems · Mastery"
title: "Describing Processes and Their State Transitions"
subtitle: "What the PCB holds, and why the three-state graph lacks one edge"
minutes: 16
meta: ["16 min read","Requires an introduction to operating systems","Mastery level"]
concepts: ["process","thread"]
prereq: ["osintro"]
related: ["process","interrupt"]
---

## What you will get

By the end of this lecture you can state the definition and four characteristics of a process, say exactly what a PCB stores, draw the three-state and five-state diagrams with the trigger for every edge, and compute what context switching costs as a fraction of a time slice.

## Three lines back

- A program is a static set of instructions; a process is one execution of it over a data set, and therefore dynamic.
- The only thing the operating system can see is the PCB, not the code segment.
- The three-state model has no edge from blocked to running, because a woken process only regains eligibility to run.

## Processes and the PCB

A **process** is the running course of a process entity and the independent unit of resource allocation and scheduling. The entity consists of a program segment, an associated data segment, and a PCB. Three characteristics matter: dynamism (a lifecycle of creation, activity, and termination), concurrency (it advances alongside other processes), and independence (it is the unit that obtains resources and gets scheduled).

> [!NOTE]
> Program + data + PCB = process entity; one execution of that entity = process.

The **process control block** is the sole evidence that a process exists. It typically holds four groups of information: identification (PID, parent PID, user ID), processor state (general registers, PC, PSW, stack pointer), scheduling information (state, priority, waiting time, CPU time used), and control information (addresses of code and data, resource list, synchronization and communication state, link pointers).

| Organization | Method | Strength | Weakness |
| --- | --- | --- | --- |
| Linked | PCBs in the same state chained by pointers | Fast insert and remove | Search requires traversal |
| Indexed | Per-state index table pointing at PCBs | Fast location by state | Extra index space |
| Sequential | PCBs stored contiguously | Simple to implement | Fixed capacity, poor growth |

## The three-state model

The minimal states are **ready**, **running**, and **blocked**. Ready means every resource except the CPU has been obtained; running means the CPU is held; blocked means the process waits for an event such as I/O completion or a semaphore.

| Transition | Trigger | Meaning |
| --- | --- | --- |
| Ready to running | The scheduler selects it | CPU acquired |
| Running to ready | Quantum expires or a higher-priority process preempts | CPU lost, still runnable |
| Running to blocked | Issues I/O or fails a P operation | Voluntarily yields the CPU |
| Blocked to ready | I/O completes or a V operation wakes it | Eligibility restored, not execution |

> [!NOTE]
> There is no blocked-to-running edge. Even with an idle CPU, a woken process must enter the ready queue and be selected by the scheduler.

What the three-state model cannot express is a process swapped out to disk.

## The five-state model and the cost of switching

The five-state model splits ready and blocked into suspended variants, giving **ready, running, blocked, ready-suspended, blocked-suspended**.

**Suspend** writes the process image out of memory and frees its frames; **activate** brings it back. A ready-suspended process waits on disk and becomes ready once activated. A blocked-suspended process must first see its event occur, becoming ready-suspended, and then be activated before it can ever run. Suspension is used when memory runs short or when a user pauses a job.

Switching cost is measurable. Suppose a switch saves 12 registers and moves a 1 KB PCB at 10 GB/s, with roughly 0.1 μs for the register work:

$$t_{\text{switch}}=\frac{2\times1024\ \text{B}}{10\times10^{9}\ \text{B/s}}+0.1\ \mu\text{s}\approx0.2+0.1=0.3\ \mu\text{s}$$

With a 10 ms quantum the overhead is $0.3/10000=0.003\%$, negligible. Shrink the quantum to 100 μs and it becomes $0.3/100=0.3\%$; at 10 μs it is 3%. That is why quanta cannot be shrunk indefinitely.

## Three common misconceptions

> [!MYTH] A process is just a running program.
> A program is a static file; a process is a dynamic execution. The same program can run as several processes, each with its own PCB and address space.

> [!MYTH] A woken process can run immediately.
> Waking only moves it from blocked to ready. Whether it runs depends on scheduling; the CPU may belong to someone else.

> [!MYTH] Suspended means blocked.
> Blocked processes wait for an event and remain in memory. Suspended processes have been swapped out and may not run even if the event already occurred; they must be activated first.

## Practice

> [!PRACTICE] 1 · Trace
> A process issues a read call and waits for the disk; the disk interrupt then arrives. Write the full sequence of state changes.
>
> > [!ANSWER] Show answer
> > Running to blocked on issuing the I/O; blocked to ready when the interrupt arrives; ready to running after the scheduler picks it.

> [!PRACTICE] 2 · Compute
> The quantum is 4 ms and switching costs 0.4 μs. Find the nominal overhead share; then find it if processes typically block after 1 ms.
>
> > [!ANSWER] Show answer
> > Nominal: $0.4/4000=0.01\%$. With blocking every 1 ms, a switch occurs every 1 ms, so $0.4/1000=0.04\%$.

> [!PRACTICE] 3 · Design
> If the ready-suspended state were removed, what capability would be lost?
>
> > [!ANSWER] Show answer
> > The system could no longer distinguish waiting in memory from waiting on disk, so it could not safely swap out a blocked process under memory pressure.

## Formal statement

A process is the running course of a process entity and the independent unit of resource allocation and scheduling; the entity comprises a program segment, a data segment, and a process control block. The PCB is the sole marker of a process's existence. In the three-state model the state set is {ready, running, blocked} and the legal transitions are ready to running, running to ready, running to blocked, and blocked to ready. The five-state model adds ready-suspended and blocked-suspended; the suspend primitive writes the process image out of memory and the activate primitive brings it back in.