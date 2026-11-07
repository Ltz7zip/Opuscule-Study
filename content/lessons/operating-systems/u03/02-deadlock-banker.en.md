---
slug: "deadlock-banker"
subject: "operating-systems"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Operating Systems · Mastery"
title: "Deadlock: Necessary Conditions, Banker's Algorithm, and Recovery"
subtitle: "Working a 5-process, 3-resource matrix to the end"
minutes: 18
meta: ["18 min read","Requires processor scheduling","Mastery level"]
concepts: ["deadlock","sched"]
prereq: ["sched"]
related: ["process","deadlock"]
---

## What you will get

By the end of this lecture you can name the four necessary conditions, say which one each prevention strategy breaks, run a Banker's safety check, decide whether a request can be granted, and explain detection and recovery.

## Three lines back

- Deadlock is a standoff in which processes wait on one another for resources and no external force can restart progress.
- Prevention breaks a necessary condition; avoidance checks safety before every allocation; detection lets deadlock happen and cleans up afterwards.
- Banker's algorithm is one sentence: grant a request only if some safe sequence still exists afterwards.

## Four necessary conditions and the resource-allocation graph

| Condition | Meaning | How to break it |
| --- | --- | --- |
| Mutual exclusion | A resource serves one process at a time | Make resources shareable where possible, as with read-only files |
| Hold and wait | Holds resources while requesting more | Require one request for everything |
| No preemption | Allocated resources cannot be seized | Allow preemption, with rollback on failure |
| Circular wait | A cycle of processes and resources exists | Number resources and request them in order |

The first three follow from the nature of resources; the fourth is the one a system can break by design, since numbering induces a total order that forbids cycles.

In a **resource-allocation graph**, circles are processes, boxes are resource classes, and dots are instances. Repeatedly find a process whose requests can be met, let it finish, and release its holdings; if reduction empties the graph there is no deadlock. This is the deadlock theorem.

## Banker's algorithm

The system has resources A, B, C totalling $(10,5,7)$ and five processes. Need = Max minus Allocation.

| Process | Max (A B C) | Allocation (A B C) | Need (A B C) |
| --- | --- | --- | --- |
| P0 | 7 5 3 | 0 1 0 | 7 4 3 |
| P1 | 3 2 2 | 2 0 0 | 1 2 2 |
| P2 | 9 0 2 | 3 0 2 | 6 0 0 |
| P3 | 2 2 2 | 2 1 1 | 0 1 1 |
| P4 | 4 3 3 | 0 0 2 | 4 3 1 |

Total allocated is $(7,2,5)$, so Available $=(10,5,7)-(7,2,5)=(3,3,2)$.

Safety check: set Work $=$ Available, then repeatedly pick a process with Need $\le$ Work, let it finish, and add its allocation back.

| Step | Chosen | Work before | Need | Work after |
| --- | --- | --- | --- | --- |
| 1 | P1 | (3,3,2) | (1,2,2) | (5,3,2) |
| 2 | P3 | (5,3,2) | (0,1,1) | (7,4,3) |
| 3 | P4 | (7,4,3) | (4,3,1) | (7,4,5) |
| 4 | P0 | (7,4,5) | (7,4,3) | (7,5,5) |
| 5 | P2 | (7,5,5) | (6,0,0) | (10,5,7) |

All five reduce, so $\langle P1,P3,P4,P0,P2\rangle$ is a safe sequence and the state is safe.

Now P1 requests $(1,0,2)$: it is within Need $(1,2,2)$ and Available $(3,3,2)$, and after a trial allocation Available becomes $(2,3,0)$ while P1's Need becomes $(0,2,0)$. Work then runs $(2,3,0)\to(5,3,2)\to(7,4,3)\to(7,4,5)\to(7,5,5)\to(10,5,7)$, so the safe sequence survives and the request may be granted.

Now let P0 request $(0,2,0)$, which fits Need and Available; after trial allocation Available becomes $(3,1,2)$. P1 needs 2 units of B but only 1 remains, P4 needs 3 and P0 needs 4, so only P3 can finish. P3 returns $(2,1,1)$, leaving $(5,2,3)$ - still only 2 units of B, satisfying neither P1 nor P4. Reduction stalls, so the state is unsafe and P0 must wait.

> [!NOTE]
> A safe state does not guarantee zero risk, but an unsafe state can deadlock. Banker's algorithm is deliberately conservative.

## Detection and recovery

Detection suits systems that permit deadlock: build the resource-allocation graph periodically or when CPU utilization drops, and reduce it. Processes left in the reduced graph are deadlocked.

Recovery costs rise across three options. **Resource preemption** seizes resources and rolls victims back to a checkpoint. **Process termination** kills victims chosen by priority or time spent - cheap but destructive. **Process rollback** returns processes to a pre-deadlock state, which requires checkpoints.

## Three common misconceptions

> [!MYTH] Unsafe means deadlocked.
> Unsafe only means a path to deadlock exists. Actual progress may avoid it, so unsafe is not the same as deadlocked.

> [!MYTH] Banker's algorithm handles every resource type.
> It assumes fixed instance counts and known maximum demands. With dynamic demand or hot-pluggable devices, Max cannot be stated.

> [!MYTH] Ordered requests hurt concurrency, so they are not worth it.
> Ordering does restrict how resources are held, but eliminates circular wait outright - usually a good trade for lock-like resources.

## Practice

> [!PRACTICE] 1 · Decide
> From the table above, can P2's request $(2,0,1)$ be granted?
>
> > [!ANSWER] Show answer
> > No. P2's Need is $(6,0,0)$, so the C component 1 exceeds Need's 0: it asks for a resource it declared it would never use. Reject before consulting Available.

> [!PRACTICE] 2 · Explain
> Why does a single all-at-once request break hold and wait?
>
> > [!ANSWER] Show answer
> > Because a process either obtains every resource it needs before running or holds nothing while it waits. The intermediate state of holding some and requesting more never occurs.

## Formal statement

Deadlock is a situation in which every process of a set waits for an event that only another process in that set can cause, so none can advance. The four necessary conditions are mutual exclusion, hold and wait, no preemption, and circular wait. A state is safe if and only if there exists a sequence $\langle P_1,\dots,P_n\rangle$ such that for each $P_i$ the remaining need does not exceed current availability plus all resources held by $P_j$ with $j<i$. Banker's algorithm performs a trial allocation and safety check before every allocation, granting only if the check succeeds.