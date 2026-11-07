---
slug: "cpu-structure-instruction-cycle"
subject: "computer-organization"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 15 · Computer Organization · Mastery"
title: "CPU Structure and the Instruction Cycle"
subtitle: "Four work cycles, eleven registers, eight beats per instruction on average"
minutes: 17
meta: ["17 min read","Requires instruction sets and addressing","Mastery level"]
concepts: ["cpustruct","isa"]
prereq: ["isa"]
related: ["controlunit","pipeline"]
---

## What you will get

By the end of this lecture you can give the width and role of each CPU register and separate programmer-visible from hidden ones, trace `ADD X` through a single-bus datapath as a sequence of micro-operations, sketch the fetch, indirect, execute, and interrupt cycles, and derive instruction time and MIPS from the clock rate.

## Three lines back

- The CPU is a datapath plus a control unit, and its registers are the shortest route between them.
- An instruction cycle is assembled from fetch, indirect, execute, and interrupt cycles; the indirect cycle is optional.
- Each work cycle divides into beats, and one beat moves one value across the bus.

## Register organization

| Register | Typical width | Role | Visible to software |
| --- | --- | --- | --- |
| PC | 16/32 bits | Address of the next instruction | Indirectly |
| IR | 16/32 bits | Holds the current instruction | No |
| MAR | 16 bits | Address presented to memory | No |
| MDR | 16/32 bits | Data read or written | No |
| ACC | 16/32 bits | Accumulator, one ALU input | Yes |
| MQ | 16 bits | Multiplier-quotient register | Yes |
| X | 16 bits | Temporary operand storage | No |
| PSW | 8 bits | Z, N, C, V flags | Yes |
| SP | 16 bits | Stack pointer | Yes |
| R0–R15 | 32 bits | General-purpose registers | Yes |

PC and MAR are easy to confuse: PC holds the address of the *next* instruction, MAR holds the address being used *now*. During fetch the PC is copied into MAR and then incremented, so the two differ within the same beat.

## Single-bus datapath and micro-operations

Every register hangs on one internal bus, and only one source may drive it per beat, so one beat performs one transfer. The fetch cycle is fixed:

| Beat | Micro-operation | Purpose |
| --- | --- | --- |
| $T_0$ | $PC\to MAR$ | Present the instruction address |
| $T_1$ | $M(MAR)\to MDR$, $PC+1\to PC$ | Read the word and advance PC |
| $T_2$ | $MDR\to IR$ | Load the instruction register |
| $T_3$ | $OP(IR)\to CU$ | Send the opcode to the control unit |

For `ADD X` with direct addressing:

| Beat | Micro-operation | Purpose |
| --- | --- | --- |
| $T_0$ | $Ad(IR)\to MAR$ | Extract the address field |
| $T_1$ | $M(MAR)\to MDR$ | Read the operand |
| $T_2$ | $ACC+MDR\to ACC$ | Add and write back |

Each beat takes one clock period. At 1 GHz a beat is 1 ns, so fetch costs 4 ns and execute 3 ns. Indirect addressing inserts two more beats that turn the formal address into an effective address.

## The four work cycles and their timing

| Work cycle | When it occurs | Typical beats | Memory accesses |
| --- | --- | --- | --- |
| Fetch | Every instruction | 4 | 1 |
| Indirect | Indirect addressing only | 2 | 1 |
| Execute | Every instruction | 2–4 | 0–1 |
| Interrupt | Request pending and enabled | 3 | 1 |

Laid out on a time axis:

```
fetch 4T           indirect 2T    execute 3T      interrupt 3T
T0 T1 T2 T3  |  T0 T1     |  T0 T1 T2    |  T0 T1 T2
PC->MAR ...     Ad(IR)->MAR   Ad(IR)->MAR    0->MAR
```

A direct `ADD X` takes $4+3=7$ beats, or 7 ns; the indirect form takes $4+2+3=9$ beats, or 9 ns. Running $10^6$ instructions per second at an average of 8 beats consumes $8\times10^6$ clock periods, which is 8 ms at 1 GHz and corresponds to MIPS $=10^9/(8\times10^6)=125$. The interrupt cycle must save the breakpoint: $0\to MAR$, assert write, $PC\to MDR$, $MDR\to M(MAR)$, then load the handler entry into PC, which needs at least 3 beats.

## Three common misconceptions

> [!MYTH] Fetch touches memory once, so it takes one beat.
> Fetch involves sending an address, reading data, loading IR, and decoding. On a single bus only one value moves per beat, so it needs at least three or four.

> [!MYTH] All instructions have the same cycle length.
> A fixed instruction word does not imply a fixed instruction cycle. Indirect addressing adds a cycle, multiplication adds beats, and interrupt handling adds three more.

> [!MYTH] The interrupt cycle belongs to the instruction being executed.
> It happens after that instruction finishes and before the next begins, and it saves the PC of the next instruction, so returning resumes at that new instruction.

## Practice

> [!PRACTICE] 1 · Micro-operations
> Write the execute cycle for `STA X`, which stores ACC into X using direct addressing.
>
> > [!ANSWER] Show answer
> > $T_0$: $Ad(IR)\to MAR$; $T_1$: $ACC\to MDR$; $T_2$: $MDR\to M(MAR)$ with the write line asserted.

> [!PRACTICE] 2 · Timing
> At 2 GHz, with 4 fetch beats, 2 indirect beats, and 4 execute beats, how long is an indirect instruction?
>
> > [!ANSWER] Show answer
> > One beat is 0.5 ns and the total is $4+2+4=10$ beats, so the instruction takes 5 ns.

## Formal statement

The CPU consists of a datapath containing the ALU, ACC, MQ, X, and general registers, and a control section containing PC, IR, MAR, MDR, PSW, and the control logic. The instruction cycle is divided into fetch, indirect, execute, and interrupt cycles. Fetch copies PC to MAR, reads the instruction through MDR into IR, and increments PC. The indirect cycle appears only for indirect addressing, spending one memory access to replace the formal address with an effective address. Execute performs the operation named by the opcode or moves data. The interrupt cycle, when a request is honored, saves the breakpoint and loads the handler entry into PC. Each work cycle is a sequence of beats, and on a single-bus organization one beat performs one register transfer, so instruction time equals the total beat count multiplied by the clock period.