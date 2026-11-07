---
slug: "combinational-control-design"
subject: "computer-organization"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 19 · Computer Organization · Mastery"
title: "Combinational Control Design"
subtitle: "Five instructions, three beats, eleven control signals"
minutes: 17
meta: ["17 min read","Requires control-unit function and timing","Mastery level"]
concepts: ["controlunit","microprogram"]
prereq: ["controlunit"]
related: ["cpustruct","isa"]
---

## What you will get

By the end of this lecture you can design a hardwired controller in five steps, write the eleven Boolean control signals for a five-instruction subset, estimate gate levels and beat-generator states, and say when hardwired control stops paying off.

## Three lines back

- A hardwired controller decodes "instruction plus beat" directly into control signals with gates.
- Each signal is an OR of product terms, each term an instruction decoder line ANDed with a beat.
- A beat generator supplies $T_0$, $T_1$, $T_2$, and together with instruction decoding forms the inputs to every expression.

## Five design steps and the micro-operation table

The steps are: fix the instruction set and list every micro-operation; assign operations to beats; write a Boolean expression for each operation; simplify and check mutual exclusion; implement with gates. Take the subset `ADD X`, `STA X`, `LDA X`, `JMP X`, and `CLA`, with three common fetch beats and three execute beats:

| Instruction | $T_0$ | $T_1$ | $T_2$ |
| --- | --- | --- | --- |
| Fetch (common) | $PC\to MAR$ | $M(MAR)\to MDR$, $PC+1\to PC$ | $MDR\to IR$ |
| `ADD X` | $Ad(IR)\to MAR$ | $M(MAR)\to MDR$ | $ACC+MDR\to ACC$ |
| `STA X` | $Ad(IR)\to MAR$ | $ACC\to MDR$ | $MDR\to M(MAR)$ |
| `LDA X` | $Ad(IR)\to MAR$ | $M(MAR)\to MDR$ | $MDR\to ACC$ |
| `JMP X` | $Ad(IR)\to PC$ | — | — |
| `CLA` | $0\to ACC$ | — | — |

Each row is one instruction's beat schedule. Operations sharing a column run in the same beat, so they must not conflict.

## Signal synthesis and Boolean expressions

Let $FE$ be the fetch flag, $ADD$, $STA$, $LDA$, $JMP$, and $CLA$ the decoder lines, and $T_0$ to $T_2$ the beats. Then

$$PC\to MAR=FE\cdot T_0$$

$$M(MAR)\to MDR=(FE+ADD+LDA)\cdot T_1$$

$$PC+1\to PC=FE\cdot T_1,\qquad MDR\to IR=FE\cdot T_2$$

$$Ad(IR)\to MAR=(ADD+STA+LDA)\cdot T_0$$

$$ACC+MDR\to ACC=ADD\cdot T_2,\qquad ACC\to MDR=STA\cdot T_1$$

$$MDR\to M(MAR)=STA\cdot T_2,\qquad MDR\to ACC=LDA\cdot T_2$$

$$Ad(IR)\to PC=JMP\cdot T_0,\qquad 0\to ACC=CLA\cdot T_0$$

That is 11 signals. Factoring the shared beat inside each signal drops the product terms from 15 to 11: each signal needs one AND gate combining an instruction OR with a beat, then one OR gate for the final drive. For instance, $M(MAR)\to MDR$ occurs only in $T_1$, so $FE+ADD+LDA$ can be ORed first and then ANDed with $T_1$, saving two gates.

## Beats and gate implementation

The beat generator is a modulo-3 counter or a three-bit ring shifter producing mutually exclusive $T_0$, $T_1$, $T_2$. The instruction decoder turns the opcode into five instruction lines. Both feed an AND-OR array whose outputs are the 11 commands.

| Block | Inputs | Outputs | Size |
| --- | --- | --- | --- |
| Instruction decoder | 3-bit opcode | 5 instruction lines | 5 AND gates |
| Beat generator | Clock, reset | $T_0$ to $T_2$ | 3 flip-flops |
| AND array | Instruction lines, beats | 11 product terms | 11 AND gates |
| OR array | Product terms | 11 commands | 11 OR gates |

The path is one decode level, one AND level, one OR level, roughly three gate delays. At 1 GHz with six beats per instruction, an instruction takes 6 ns, for a theoretical $1/6\ \text{ns}\approx166.7$ MIPS. Hardwired control is fast, but expressions grow with the instruction set: doubling the instruction count nearly doubles the AND array, and changing one instruction can mean redrawing the circuit. That is the problem microprogramming addresses.

## Three common misconceptions

> [!MYTH] A hardwired controller needs no timing signals.
> It still needs a beat generator to distinguish $T_0$, $T_1$, $T_2$. "Combinational" means the signals come from gates, not from a microprogram store.

> [!MYTH] Longer Boolean expressions are more complete.
> Conditions sharing a beat should be factored. In the example, factoring cut the product terms from 15 to 11 and reduced the gate count.

> [!MYTH] Any number of micro-operations can share a beat.
> On a single bus one beat allows one transfer, and no register may be driven by two sources at once. Beat assignment must respect both.

## Practice

> [!PRACTICE] 1 · Write it
> Add a memory-read signal $MEMR$ that is active during fetch and during `LDA`'s $T_1$. Give its expression.
>
> > [!ANSWER] Show answer
> > $MEMR=(FE+LDA)\cdot T_1$, asserted together with $M(MAR)\to MDR$.

> [!PRACTICE] 2 · Count gates
> If `SUB X` is added with the same execute schedule as `ADD X`, how much do the arrays grow?
>
> > [!ANSWER] Show answer
> > The number of product terms stays the same: add one $SUB$ input to the OR gates for $M(MAR)\to MDR$ and $ACC+MDR\to ACC$. The AND array does not grow; the decoder gains one line.

## Formal statement

A hardwired control unit consists of an instruction decoder, a beat generator, and an AND-OR array. Its design proceeds by listing instructions and micro-operations, assigning beats, writing a Boolean expression per signal, simplifying and checking mutual exclusion, and implementing with gates. Every signal is a sum of products, each product an instruction decoder term ANDed with a beat, for example $PC\to MAR=FE\cdot T_0$ and $Ad(IR)\to MAR=(ADD+STA+LDA)\cdot T_0$. The beat generator produces mutually exclusive $T_0$ to $T_2$, the decoder produces the instruction lines, and the two arrays form product terms and then commands. Signal delay is about three gate levels, so the controller is fast, but circuit size grows quickly with the instruction set and modifications are costly.