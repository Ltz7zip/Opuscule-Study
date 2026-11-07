---
slug: "instruction-pipeline"
subject: "computer-organization"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 16 · Computer Organization · Mastery"
title: "Instruction Pipelining"
subtitle: "Five stages, 100 instructions: 208 ns and a speedup of 4.81"
minutes: 16
meta: ["16 min read","Requires CPU structure and the instruction cycle","Mastery level"]
concepts: ["pipeline","cpustruct"]
prereq: ["cpustruct"]
related: ["controlunit","isa"]
---

## What you will get

By the end of this lecture you can draw the space-time diagram for $k$ stages and $n$ instructions, compute total time, speedup, and efficiency from the formulas, distinguish structural, data, and control hazards with a remedy for each, and estimate how much a stall costs.

## Three lines back

- A pipeline splits instruction execution into stages that work on different instructions at once.
- Ideally one result leaves per clock, but filling and draining cost $k-1$ extra beats.
- Hazards make a later instruction wait, and waiting is exactly lost speedup.

## Space-time diagram and performance formulas

With $k$ stages of duration $\tau$ and $n$ consecutive instructions, the first instruction traverses all $k$ stages and one more instruction completes each beat thereafter:

$$T=(k+n-1)\tau$$

Serial execution would need $nk\tau$, so

$$S=\frac{nk}{k+n-1},\qquad E=\frac{S}{k}=\frac{n}{k+n-1}$$

Take $k=5$, $n=100$, $\tau=2$ ns: $T=(5+99)\times2=208$ ns against $100\times5\times2=1000$ ns serial, giving $S=500/104\approx4.81$ and $E=100/104\approx96.2\%$.

| Instructions $n$ | Pipelined time | Serial time | Speedup $S$ | Efficiency $E$ |
| --- | --- | --- | --- | --- |
| 1 | 10 ns | 10 ns | 1.00 | 20.0% |
| 10 | 28 ns | 100 ns | 3.57 | 71.4% |
| 100 | 208 ns | 1000 ns | 4.81 | 96.2% |
| 1000 | 2008 ns | 10000 ns | 4.98 | 99.6% |

As $n\to\infty$, $S\to k=5$. Stage count sets the ceiling; program length decides how close you get. For very short runs the fill time dominates and pipelining may not pay at all.

## Three kinds of hazards

| Hazard | Typical situation | Effect | Remedy |
| --- | --- | --- | --- |
| Structural | Fetch and a memory operand compete for one memory | One stall | Split instruction and data caches, add buffers |
| Data | A later instruction needs a result not yet written back | Reads stale data | Forwarding, bubbles, compiler scheduling |
| Control | A branch's direction is unknown while fetching ahead | Wrong instructions fetched | Branch prediction, delay slots, earlier condition resolution |

The hardest data hazard is load-use: a `LOAD` result is not available until the end of its memory stage, so the very next arithmetic instruction must stall one beat even with forwarding. Suppose 20 of the 100 instructions above hit a load-use stall of one beat each:

$$T'=208+20\times2=248\ \text{ns},\qquad S'=\frac{1000}{248}\approx4.03$$

Speedup falls from 4.81 to 4.03 and efficiency from 96.2% to 80.6%. That is why hazard handling matters more than merely adding stages.

## Classification and superscalar issue

By level, component pipelines split an operation (floating-point addition into align, add, and normalize), processor pipelines split instructions into fetch, decode, execute, memory, and write-back, and inter-processor pipelines chain several processors on one task. By flexibility, a static pipeline allows only one functional combination at a time, while a dynamic pipeline lets different stages perform different operations concurrently.

A superscalar machine issues several instructions per clock. With 4 stages, 2-way issue, and 100 instructions, 50 issue groups give

$$T=(4+50-1)\tau=53\tau$$

Against $400\tau$ serial, the speedup is $400/53\approx7.55$, close to but below the ideal 8; efficiency is $100/(53\times2)\approx94.3\%$. Once issue width doubles, dependency checking, register ports, and cache bandwidth become the new limits.

## Three common misconceptions

> [!MYTH] More stages always mean a larger speedup.
> Extra stages add per-stage overhead and hazard stalls. The ceiling is $k$, and clock skew plus latch delay keeps real designs below it.

> [!MYTH] Forwarding removes the need for stalls.
> Forwarding can only pass a value that already exists. In a load-use hazard the data appears only after the memory stage, so one stall is unavoidable.

> [!MYTH] Pipeline efficiency equals speedup.
> Efficiency is speedup divided by stage count, $E=S/k$. In the example $S=4.81$ but $E$ is 96.2%; they measure different things.

## Practice

> [!PRACTICE] 1 · Metrics
> A 6-stage pipeline with 1.5 ns per stage runs 200 instructions. Find total time, speedup, and efficiency.
>
> > [!ANSWER] Show answer
> > $T=(6+199)\times1.5=307.5$ ns against $200\times6\times1.5=1800$ ns serial, so $S=1800/307.5\approx5.85$ and $E=200/205\approx97.6\%$.

> [!PRACTICE] 2 · Stalls
> If 30 data hazards each add one beat to the previous problem, what is the new speedup?
>
> > [!ANSWER] Show answer
> > Thirty beats cost 45 ns, so $T'=352.5$ ns and $S'=1800/352.5\approx5.11$, about 13% lower.

## Formal statement

An instruction pipeline divides execution into $k$ serial stages, each with its own hardware, all clocked together so that several instructions occupy different stages simultaneously. Running $n$ instructions takes $T=(k+n-1)\tau$, where $\tau$ is one stage period. Relative to serial execution the speedup is $S=nk/(k+n-1)$ and the efficiency is $E=n/(k+n-1)=S/k$; as $n$ grows they approach $k$ and 1. Stalls arise from structural, data, and control hazards. Structural hazards come from resource conflicts and are removed by separate caches or extra hardware. Data hazards are mitigated by forwarding, bubbles, and compiler scheduling, and a load-use hazard costs at least one beat. Control hazards are handled by branch prediction, delay slots, and earlier resolution of branch conditions. A superscalar machine issues multiple instructions per clock, raising the speedup ceiling to the widened issue width.