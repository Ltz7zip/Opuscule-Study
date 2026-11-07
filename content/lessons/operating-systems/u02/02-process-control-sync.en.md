---
slug: "process-control-sync"
subject: "operating-systems"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Operating Systems · Mastery"
title: "Process Control and Synchronization"
subtitle: "Primitives, critical sections, and a full trace of PV operations"
minutes: 17
meta: ["17 min read","Requires the process description lecture","Mastery level"]
concepts: ["process","interrupt"]
prereq: ["process"]
related: ["thread","process"]
---

## What you will get

By the end of this lecture you can explain why process-control primitives must be atomic, judge a synchronization scheme against the four critical-section requirements, and write the semaphore solution to the producer-consumer problem while tracing every semaphore value.

## Three lines back

- Process-control primitives are indivisible basic operations, protected by disabling interrupts or by hardware atomic instructions.
- Synchronization is about fusing the condition check and the entry into the critical section into one indivisible action.
- A semaphore packages a resource count together with a wait queue: P requests, V releases.

## Process-control primitives

Process control covers create, terminate, block, wake up, suspend, and activate. They come in pairs: create and terminate, block and wake up, suspend and activate. Omit one of a pair and the state machine loses an exit.

A **primitive** is a basic operation built from several instructions that cannot be interrupted. There are two implementations: on a single processor, disable interrupts, run, then re-enable; on a multiprocessor, protect a flag with a hardware atomic instruction such as `TestAndSet` or `Swap`, because disabling interrupts only masks the local processor.

Creating a process means allocating a free PCB, assigning a PID, allocating resources, initializing the PCB, and linking it into the ready queue. Termination reverses this: release resources, remove the PCB, notify the parent.

> [!NOTE]
> Atomic here means indistinguishable from one step to an outside observer, not that the primitive contains a single instruction.

## Critical sections and four requirements

A **critical resource** admits only one process at a time. A **critical section** is the code that touches it. Any synchronization scheme must satisfy four requirements:

| Requirement | Meaning | What breaks without it |
| --- | --- | --- |
| Mutual exclusion when busy | Only one process inside the section | Corrupted shared data |
| Progress when free | An idle section admits a waiting process | CPU wasted, throughput drops |
| Bounded waiting | A requester enters within finite time | Starvation |
| Yield while waiting | A blocked requester releases the CPU | Busy waiting burns the processor |

Peterson's software solution needs only two shared variables:

```c
flag[i] = true; turn = j;
while (flag[j] && turn == j) ;   /* spin */
/* critical section */
flag[i] = false;
```

It fails the yield requirement: the waiter keeps consuming CPU. A hardware `TestAndSet` lock has the same defect. Semaphores are what actually remove busy waiting.

## Semaphores and PV operations

A semaphore $S$ is an integer reachable only through two atomic operations:

$$P(S):\ S\mathrel{-}=1;\ \text{block and enqueue if } S<0$$

$$V(S):\ S\mathrel{+}=1;\ \text{wake one waiter if } S\le 0$$

The initial value counts available resources. When $S<0$, $|S|$ is the number of queued waiters.

The producer-consumer problem is the standard drill: buffer capacity $n=4$, `mutex` guarding the buffer, `empty` and `full` counting slots.

```c
producer:  P(empty); P(mutex); put(item); V(mutex); V(full);
consumer:  P(full);  P(mutex); get(item); V(mutex); V(empty);
```

Start from `empty=4, full=0, mutex=1` and run two producers and two consumers:

| Step | empty | full | mutex | Buffer |
| --- | --- | --- | --- | --- |
| Initial | 4 | 0 | 1 | empty |
| P1 puts x | 3 | 1 | 1 | [x] |
| P2 puts y | 2 | 2 | 1 | [x, y] |
| C1 takes x | 3 | 1 | 1 | [y] |
| C2 takes y | 4 | 0 | 1 | empty |

Swap the two P operations to `P(mutex); P(empty);` and consider a full buffer with `empty=0`. The producer seizes `mutex`, then blocks on `empty`. A consumer needs `mutex` before it can drain the buffer. Each waits for the other: deadlock. The order of P operations is not a matter of taste.

## Three common misconceptions

> [!MYTH] A semaphore is just a counter.
> A counter only stores a number. A semaphore adds a wait queue and wake-up semantics; a negative value has magnitude equal to the number of blocked processes.

> [!MYTH] Critical sections should be short, so P and V can be split up.
> P and V must bracket the same section. A P without its V leaves `mutex` at zero forever and blocks everyone after it.

> [!MYTH] Spinning is free.
> On a single processor, spinning consumes the CPU that the awaited process needs. Spinning pays off only on multiprocessors with very short critical sections.

## Practice

> [!PRACTICE] 1 · Trace
> Buffer capacity 2, initially `empty=2, full=0, mutex=1`. Three producers insert a, b, c in order. Where does the third one stop?
>
> > [!ANSWER] Show answer
> > After a: `empty=1, full=1`. After b: `empty=0, full=2`. The third blocks in `P(empty)`, which drops to $-1$, meaning one waiter.

> [!PRACTICE] 2 · Decide
> Does `while (lock==0) lock=1;` provide mutual exclusion?
>
> > [!ANSWER] Show answer
> > No. The test and the set are not atomic, so two processes can both read 0 and enter together. An atomic instruction such as `TestAndSet` is required.

> [!PRACTICE] 3 · Compute
> A semaphore starts at 3 and receives P, P, P, P, V, V. Find the final value and the number of blocked processes.
>
> > [!ANSWER] Show answer
> > Three P operations bring it to 0; the fourth makes it $-1$ with one blocked process. Two V operations raise it to 1 and wake that process; finally $S=1$ with no waiters.

## Formal statement

A primitive is a basic operation that cannot be interrupted during execution. A critical section is the code in a process that accesses a critical resource, and a correct synchronization mechanism must provide mutual exclusion when busy, progress when free, bounded waiting, and yielding while waiting. A semaphore $S$ may be modified only by the atomic operations $P$ and $V$: $P(S)$ decrements $S$ and blocks the caller into the wait queue of $S$ if the result is negative; $V(S)$ increments $S$ and wakes one queued process if the result is not positive. The initial value of $S$ equals the number of available resources, and the magnitude of a negative value equals the number of waiting processes.