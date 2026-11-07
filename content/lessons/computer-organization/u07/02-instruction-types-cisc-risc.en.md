---
slug: "instruction-types-cisc-risc"
subject: "computer-organization"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 14 · Computer Organization · Mastery"
title: "Instruction Types and CISC versus RISC"
subtitle: "Summing 1 to 10: 43 cycles in one style, 82 in the other"
minutes: 15
meta: ["15 min read","Requires instruction formats and addressing","Mastery level"]
concepts: ["isa","cpustruct"]
prereq: ["isa"]
related: ["alu","cpustruct"]
---

## What you will get

By the end of this lecture you can sort instructions into data transfer, arithmetic-logic, control transfer, and I/O classes with an example of each, compare CISC and RISC along instruction count, format, addressing, and CPI, read an assembly listing with labels and comments, and compute its cycle count in both styles.

## Three lines back

- Instruction types answer three questions: where data moves, what operation runs, and where control goes next.
- CISC shortens programs with heavy instructions; RISC spends instructions to keep the pipeline full.
- Assembly syntax has four parts: label, mnemonic, operands, comment.

## Four functional classes

| Class | Typical instructions | Operand locations | Effect on flags |
| --- | --- | --- | --- |
| Data transfer | `MOV`, `LOAD`, `STORE`, `PUSH`, `POP` | Registers, memory, stack | Usually none |
| Arithmetic-logic | `ADD`, `SUB`, `AND`, `OR`, `CMP` | Registers and memory | Sets Z, N, C, V |
| Shift | `SHL`, `SHR`, `ROL`, `ROR` | Registers | Last bit out enters C |
| Control transfer | `JMP`, `JZ`, `CALL`, `RET` | Target address | Conditional jumps read flags |
| Input/output | `IN`, `OUT` | Port and register | Usually none |

Data transfer performs no computation but dominates real programs. Arithmetic-logic instructions are the ALU's client. Control transfer is the only way a program branches, because it writes the program counter. I/O instructions disappear into ordinary loads and stores on a memory-mapped machine, while port-mapped machines need a separate address space.

## The CISC/RISC trade-off

| Dimension | CISC | RISC |
| --- | --- | --- |
| Instruction count | Hundreds | Tens to about a hundred |
| Instruction length | Variable | Fixed |
| Addressing modes | Many, combinable within one instruction | Few; only `LOAD`/`STORE` touch memory |
| General registers | Fewer | More |
| CPI | Above 1, varies by instruction | Close to 1 |
| Control unit | Often microprogrammed | Often hardwired |
| Pipeline | Hard to deepen | Easy to deepen |
| Code size | Smaller | Larger |

CISC makes each instruction do more and interprets complex operations as microinstruction sequences; programs shrink but each instruction costs many cycles. RISC makes each instruction cheap, pushing complexity into the compiler and buying throughput with registers and pipelining. Both produce correct answers; they differ in where the cost lands.

## Assembly format and a loop

An assembly line has four parts:

```
label:  mnemonic  operands   ; comment
```

The label is a symbolic target for branches, the mnemonic names the operation, operands may be registers, immediates (often marked with `#`), or memory addresses, and everything after the semicolon is a comment. This RISC-style program sums $1$ through $10$:

```
        MOV  R1, #0          ; running sum
        MOV  R2, #10         ; counter
LOOP:   ADD  R1, R1, R2
        SUB  R2, R2, #1
        CMP  R2, #0
        BNE  LOOP
        MOV  R3, R1
```

The four-instruction body runs ten times, plus two instructions before the loop and one after, for $2+4\times10+1=43$ instructions. With ideal CPI=1 at 1 GHz the run takes $43\times1\ \text{ns}=43$ ns and `R1` ends at 55.

The same job in CISC style:

```
        MOV  CX, 10
        XOR  AX, AX
L:      ADD  AX, CX
        LOOP L
```

Only $2+2\times10=22$ instructions, but `ADD` takes 3 cycles and `LOOP` takes 5. The loop costs $10\times(3+5)=80$ cycles, plus 2 for the setup: 82 cycles, or 82 ns. Half the instruction count, nearly twice the time, because each instruction carries more work.

## Three common misconceptions

> [!MYTH] Fewer instructions in RISC must mean shorter, faster programs.
> RISC code is longer, but each instruction is about one cycle. Here 43 instructions at 43 ns beat 22 instructions at 82 ns.

> [!MYTH] CISC is obsolete.
> x86 is still a CISC instruction set; internally it decodes complex instructions into RISC-like micro-operations, so both ideas meet in the same pipeline.

> [!MYTH] Assembly labels are stored in the object code.
> A label is a symbolic name for an address. The assembler converts it to an offset or absolute address; only numbers reach the machine code.

## Practice

> [!PRACTICE] 1 · Count
> If the RISC loop sums 1 to 100 instead, how many instructions run, and how long at CPI=1 and 1 GHz?
>
> > [!ANSWER] Show answer
> > The body runs 100 times, so $2+400+1=403$ instructions and 403 ns.

> [!PRACTICE] 2 · Cycles
> A CISC machine takes 4 cycles for `ADD` and 6 for `LOOP`. With 20 iterations and 5 cycles of setup, what is the total?
>
> > [!ANSWER] Show answer
> > The loop costs $20\times(4+6)=200$ cycles; adding the setup gives 205 cycles, or 205 ns at 1 GHz.

## Formal statement

Instructions fall into functional classes including data transfer, arithmetic-logic, shift, control transfer, and input/output. Data transfer moves values among registers, memory, and the stack without changing flags; arithmetic-logic instructions execute in the ALU and set the zero, sign, carry, and overflow flags; control-transfer instructions modify the program counter, with conditional branches reading flags; I/O instructions use a port address space when ports are separately addressed. A CISC instruction set has many variable-length instructions, rich addressing, and usually a microprogrammed control unit with CPI above 1. A RISC instruction set has few fixed-length instructions, only `LOAD` and `STORE` access memory, many general registers, usually hardwired control, and an ideal CPI near 1, which suits deep pipelining. An assembly statement consists of a label, a mnemonic, operands, and a comment, and the assembler resolves each label into an address.