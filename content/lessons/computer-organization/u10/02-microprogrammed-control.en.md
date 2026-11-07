---
slug: "microprogrammed-control"
subject: "computer-organization"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 20 · Computer Organization · Mastery"
title: "Microprogrammed Control"
subtitle: "A 25-bit microinstruction, an 800-byte control store, and a fetch routine"
minutes: 16
meta: ["16 min read","Requires combinational control design","Mastery level"]
concepts: ["microprogram","controlunit"]
prereq: ["controlunit"]
related: ["cpustruct","isa"]
---

## What you will get

By the end of this lecture you can split a microinstruction into its control and sequencing fields, compare horizontal, vertical, and mixed formats, compute how many bits 24 micro-commands need under field encoding, describe how the controller fetches a microinstruction and forms the next address, and read a short fetch microprogram.

## Three lines back

- Microprogramming interprets each machine instruction as a sequence of microinstructions, whose fields or bits drive the micro-commands.
- A microinstruction has two parts: the control field says what happens, the sequencing field says where to go next.
- Microprograms live in a control store addressed by the microprogram counter $\mu PC$.

## Microinstruction formats

| Type | Parallelism | Word length | Microprogram length | Character |
| --- | --- | --- | --- | --- |
| Horizontal | Several micro-commands per microinstruction | Long | Short | Fast, but the control field is sparsely used |
| Vertical | One micro-command per microinstruction | Short | Long | Machine-instruction-like, more decoding |
| Mixed | Some fields parallel, some serial | Medium | Medium | Common in real machines |

A microinstruction normally contains a control field plus a sequencing field, which itself splits into a condition-select field and a next-address field. The condition field chooses sequential increment, unconditional jump, opcode dispatch, or a condition-code branch; the address field supplies the target.

## Encoding and bit counting

| Encoding | Method | Strength | Weakness |
| --- | --- | --- | --- |
| Direct control | One bit per micro-command | No decoding, fastest | Widest word |
| Direct field encoding | Mutually exclusive commands grouped and binary-coded | Much shorter word | No parallelism within a group |
| Indirect field encoding | One field reinterprets another | Further compression | Extra decode level |
| Minimal encoding | Every command gets a global code | Shortest word | Worst parallelism |

Take 24 micro-commands split into mutually exclusive groups of 6, 5, 5, 4, and 4. Each group needs one code for "no operation", so each gets $\lceil\log_2(n+1)\rceil$ bits:

$$3+3+3+3+3=15\ \text{bits}$$

Adding a 2-bit condition field and an 8-bit next-address field gives $15+2+8=25$ bits. Direct control would need $24+2+8=34$ bits, so field encoding saves 9 bits, about 26%. With 256 microinstructions the control store holds

$$256\times25=6400\ \text{bit}=800\ \text{B}$$

## Operation and a fetch microprogram

Every beat the controller performs $\mu PC\to CMAR$, reads the control store, and loads the microinstruction into $\mu IR$. The control field is decoded into micro-commands, and the sequencing field is resolved into the next $\mu PC$. The fetch routine has a fixed entry at 00, while each instruction's execute routine is reached through an opcode-to-microaddress mapper.

| Microaddress | Micro-commands | Condition | Next address |
| --- | --- | --- | --- |
| `00` | $PC\to MAR$, assert read | Sequential | `01` |
| `01` | $M(MAR)\to MDR$, $PC+1\to PC$ | Sequential | `10` |
| `10` | $MDR\to IR$, $OP(IR)$ to decoder | By opcode | Execute entry |

For `ADD X`, the execute routine might occupy `20` to `22`:

| Microaddress | Micro-commands | Next address |
| --- | --- | --- |
| `20` | $Ad(IR)\to MAR$, assert read | `21` |
| `21` | $M(MAR)\to MDR$ | `22` |
| `22` | $ACC+MDR\to ACC$ | `00`, back to fetch |

Three microinstructions complete one addition, and the last returns unconditionally to the fetch entry, closing the loop. Compared with hardwired control, the microprogrammed version pays one control-store access per beat, so it is slower, but adding an instruction means appending a microprogram rather than rewiring gates.

## Three common misconceptions

> [!MYTH] Microinstructions are machine instructions.
> A machine instruction is what software sees; a microinstruction is an internal bundle of control signals that software cannot execute directly.

> [!MYTH] Field encoding costs no parallelism.
> Commands in one field are mutually exclusive, so only one can be selected per beat. Putting commands that could run together into one group lengthens the microprogram.

> [!MYTH] Microprogrammed control is always much slower.
> The cost is the control-store read. On-chip fast ROM or register-speed storage narrows the gap, though it usually remains slower than pure gates.

## Practice

> [!PRACTICE] 1 · Bits
> Thirty micro-commands are split into groups of 8, 8, 7, and 7, with a 2-bit condition field and a 10-bit next address. How wide is a microinstruction under direct field encoding?
>
> > [!ANSWER] Show answer
> > The groups need $\lceil\log_2 9\rceil=4$, $4$, $\lceil\log_2 8\rceil=3$, and $3$ bits, for 14; adding 2 and 10 gives 26 bits.

> [!PRACTICE] 2 · Capacity
> If that control store holds 512 microinstructions, what is its size in bytes?
>
> > [!ANSWER] Show answer
> > $512\times26=13{,}312$ bits, or 1664 B.

## Formal statement

Microprogrammed control decomposes each machine instruction into a sequence of microinstructions. A microinstruction consists of a control field that generates micro-commands and a sequencing field containing a condition-select field and a next-address field. Formats are horizontal, vertical, or mixed: horizontal issues many commands at once with a long word and a short microprogram, vertical issues one command with a short word and a long microprogram. The control field may use direct control, direct field encoding, indirect field encoding, or minimal encoding; direct field encoding groups mutually exclusive commands and allocates $\lceil\log_2(n+1)\rceil$ bits per group. At run time $\mu PC$ addresses the control store, the microinstruction loads into $\mu IR$, the control field is decoded into commands, and the sequencing field determines the next microaddress. The fetch routine has a fixed entry and each execute routine is reached by opcode mapping. Microprogramming is flexible and easy to extend, at the cost of a control-store access on every beat.