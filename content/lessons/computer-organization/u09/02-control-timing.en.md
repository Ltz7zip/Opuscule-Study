---
slug: "control-timing"
subject: "computer-organization"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 18 · Computer Organization · Mastery"
title: "Control Methods and Multi-Level Timing"
subtitle: "At 1 GHz: a 4 ns machine cycle and a 16.8 ns average instruction"
minutes: 15
meta: ["15 min read","Requires control-unit functions","Mastery level"]
concepts: ["controlunit"]
prereq: ["cpustruct"]
related: ["pipeline","microprogram"]
---

## What you will get

By the end of this lecture you can compare synchronous, asynchronous, and combined control and say where each fits, relate instruction, machine, and clock cycles hierarchically, derive machine and instruction time from the clock frequency, and estimate MIPS from the average instruction time.

## Three lines back

- A control method answers one question: when does each step start and when is it considered done?
- The timing hierarchy has three levels, each containing the next.
- The clock frequency sets the smallest unit, and every other interval is a multiple of it.

## Three control methods

| Method | Idea | Strength | Weakness | Where it fits |
| --- | --- | --- | --- | --- |
| Synchronous | One clock drives every micro-operation | Simple, easy to design | The slowest step sets the period; fast units idle | Regular CPU internals |
| Asynchronous | The next step starts on a completion signal | No idle time, fast | Needs handshake lines, harder timing | Units with very different speeds |
| Combined | Synchronous inside a unit, asynchronous between units | Good efficiency and feasibility | More complex logic | Most real machines |

The binding constraint in synchronous control is that the machine cycle must equal the slowest step. If four steps take 3, 5, 2, and 4 ns, the machine cycle is 5 ns, leaving $5\times4-14=6$ ns idle and a utilization of only $14/20=70\%$. Asynchronous control would finish those steps in 14 ns, but each path then needs a request/acknowledge pair.

## The multi-level timing system

| Level | Definition | Typical length | Determined by |
| --- | --- | --- | --- |
| Instruction cycle | Fetch plus execution of one instruction | Several machine cycles | Instruction type and addressing |
| Machine cycle | One complete memory or arithmetic step | Several clock cycles | Slowest micro-operation step |
| Clock cycle | Smallest timing unit, the beat | $T=1/f$ | Clock frequency |

The relations are

$$T_{\text{instr}}=\sum_{i}T_{\text{machine},i},\qquad T_{\text{machine}}=mT,\qquad T=\frac{1}{f}$$

At 1 GHz, $T=1$ ns. With four beats per machine cycle, $T_{\text{machine}}=4$ ns; if fetch takes two machine cycles, execute two, and indirect one, a direct instruction takes $4\times4=16$ ns and an indirect one $5\times4=20$ ns.

## From clock frequency to MIPS

Keep 1 GHz and four beats per machine cycle. If 80% of instructions use direct addressing and 20% indirect, the average instruction time is

$$\bar{T}=0.8\times16+0.2\times20=16.8\ \text{ns}$$

so

$$\text{MIPS}=\frac{f}{\overline{CPI}\times10^6}=\frac{1000}{16.8}\approx59.5$$

with an average $CPI=16.8$. Doubling the clock to 2 GHz without changing the structure gives $T=0.5$ ns, a 2 ns machine cycle, 8.4 ns per instruction on average, and about 119 MIPS, nearly double. With CPI fixed, frequency is the most direct throughput lever.

| Clock | Clock cycle | Machine cycle (4 beats) | Average instruction | MIPS |
| --- | --- | --- | --- | --- |
| 500 MHz | 2 ns | 8 ns | 33.6 ns | 29.8 |
| 1 GHz | 1 ns | 4 ns | 16.8 ns | 59.5 |
| 2 GHz | 0.5 ns | 2 ns | 8.4 ns | 119.0 |
| 3 GHz | 0.33 ns | 1.33 ns | 5.6 ns | 178.6 |

Frequency cannot rise forever: a machine cycle shorter than the slowest combinational path lets the next beat capture unstable data, which is precisely why pipelines are split into stages.

## Three common misconceptions

> [!MYTH] A higher clock always means a faster program.
> Frequency only shortens the clock. If CPI rises through memory waits or stalls, time may not fall, and cross-architecture comparisons that rely on clock rate alone are meaningless.

> [!MYTH] A machine cycle is a clock cycle.
> A machine cycle contains several clock cycles. Early machines fixed it at four beats; modern processors often use variable-length machine cycles.

> [!MYTH] Asynchronous control is always faster.
> It removes idle waiting, but request and acknowledge propagation costs time. When steps are many and short, it can be slower, which is why combined control dominates.

## Practice

> [!PRACTICE] 1 · Timing
> At 800 MHz with 5 beats per machine cycle, fetch taking 2 machine cycles and execute taking 3, how long is a direct instruction?
>
> > [!ANSWER] Show answer
> > $T=1.25$ ns, so a machine cycle is 6.25 ns and the instruction takes $5\times6.25=31.25$ ns.

> [!PRACTICE] 2 · Utilization
> Three steps in a machine cycle take 4, 6, and 3 ns under synchronous control. What is the utilization?
>
> > [!ANSWER] Show answer
> > The machine cycle is 6 ns, so 13 ns of 18 ns is useful: $13/18\approx72.2\%$.

## Formal statement

Control methods are synchronous, asynchronous, and combined. Synchronous control generates fixed beats from a common clock and sets the machine cycle to the largest step delay; it is simple but leaves idle time. Asynchronous control starts each step from the previous step's completion signal, needing no fixed beat but requiring request and acknowledge lines. Combined control is synchronous within a unit and asynchronous between units. The timing hierarchy consists of the instruction cycle, the machine cycle, and the clock cycle. An instruction cycle contains one or more machine cycles, a machine cycle contains several clock cycles, and $T=1/f$. Instruction time is the sum of its machine cycles, program time is the average instruction time times the instruction count, and MIPS equals the clock frequency divided by the average CPI and by $10^6$.