---
slug: "control-signals-micro-operations"
subject: "computer-organization"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 17 · Computer Organization · Mastery"
title: "What the Control Unit Does, and Micro-Operations"
subtitle: "Nine beats for one ADD @X, written out beat by beat"
minutes: 17
meta: ["17 min read","Requires CPU structure and the instruction cycle","Mastery level"]
concepts: ["controlunit","cpustruct"]
prereq: ["cpustruct"]
related: ["pipeline","microprogram"]
---

## What you will get

By the end of this lecture you can list the control unit's inputs and outputs, write the fixed micro-operation sequences for the fetch and indirect cycles, expand an indirectly addressed `ADD @X` into every beat, count its memory accesses, and state the order in which an interrupt cycle saves the breakpoint.

## Three lines back

- The control unit computes nothing; it translates decoded instructions and timing signals into strings of micro-operations.
- The fetch cycle is identical for every instruction, and the indirect cycle only inserts an address rewrite.
- The execute cycle is where instructions differ, because the opcode decides its micro-operations.

## Inputs and outputs of the control unit

| Input | Source | Purpose |
| --- | --- | --- |
| Clock | Timing system | Divides machine cycles into beats |
| Instruction register | IR | Opcode decode and address extraction |
| Condition flags | PSW | Conditional branches and operations |
| Interrupt request | Device interfaces | Decide whether to enter the interrupt cycle |
| Bus request | DMA interface | Release control of the bus |

| Output | Destination | Example |
| --- | --- | --- |
| Register transfer | CPU internals | $PC\to MAR$, $MDR\to IR$ |
| ALU operation | Datapath | Add, subtract, AND, OR |
| Memory read or write | System bus | Read and write commands |
| Interrupt acknowledge | Interrupt logic | Enable, vector selection |

Each output is a voltage level corresponding to one micro-operation or a small group. Commands must be mutually exclusive or separated in time; otherwise a single bus would be driven by two sources at once.

## Fetch and indirect cycles

The fetch cycle does not depend on the instruction:

| Beat | Micro-operation |
| --- | --- |
| $T_0$ | $PC\to MAR$ |
| $T_1$ | $M(MAR)\to MDR$, $PC+1\to PC$ |
| $T_2$ | $MDR\to IR$, $OP(IR)\to CU$ |

For indirect addressing, an indirect cycle follows fetch and spends one memory access turning the formal address into an effective address:

| Beat | Micro-operation |
| --- | --- |
| $T_0$ | $Ad(IR)\to MAR$ |
| $T_1$ | $M(MAR)\to MDR$ |
| $T_2$ | $MDR\to Ad(IR)$ |

The last step writes the fetched word back into the address field of IR, so the execute cycle already sees an effective address. This is why indirection is said to modify the instruction: without rewriting IR, execute would still use the formal address.

## Every beat of ADD @X

Place `ADD @X` at `200H` as a one-byte instruction with $X=30H$. Memory holds $M(30H)=40H$ and $M(40H)=0007H$; $ACC=0005H$ before execution.

| Cycle | Beat | Micro-operation | Result |
| --- | --- | --- | --- |
| Fetch | $T_0$ | $PC\to MAR$ | $MAR=200H$ |
| Fetch | $T_1$ | $M(MAR)\to MDR$, $PC+1\to PC$ | Instruction in MDR, $PC=201H$ |
| Fetch | $T_2$ | $MDR\to IR$, $OP(IR)\to CU$ | Decoded as indirect add |
| Indirect | $T_0$ | $Ad(IR)\to MAR$ | $MAR=30H$ |
| Indirect | $T_1$ | $M(MAR)\to MDR$ | $MDR=40H$ |
| Indirect | $T_2$ | $MDR\to Ad(IR)$ | Address field becomes $40H$ |
| Execute | $T_0$ | $Ad(IR)\to MAR$ | $MAR=40H$ |
| Execute | $T_1$ | $M(MAR)\to MDR$ | $MDR=0007H$ |
| Execute | $T_2$ | $ACC+MDR\to ACC$ | $ACC=000CH$ |

Nine beats and three memory accesses. At 100 ns per beat the instruction takes 900 ns, yet only three beats actually touch memory; the other six are register transfers. Merging MAR and MDR or adding an internal bus compresses those pure-transfer beats, which is one reason RISC instruction cycles are short.

An interrupt cycle saves the breakpoint in this order: $0\to MAR$ supplies the save address, $1\to R$ asserts write, $PC\to MDR$, $MDR\to M(MAR)$, and finally the handler entry is loaded into $PC$.

## Three common misconceptions

> [!MYTH] Every control signal goes to the ALU.
> Signals also handle register transfers, memory reads and writes, interrupt acknowledge, and bus control; the ALU is only one destination.

> [!MYTH] The indirect cycle just reads memory and leaves the instruction alone.
> It writes the effective address back into the IR address field. Otherwise execute would still fetch from the formal address.

> [!MYTH] Fetch micro-operations change from instruction to instruction.
> Fetch is identical for all instructions, which is exactly why the control unit can share one fetch path and a microprogram can share one fetch routine.

## Practice

> [!PRACTICE] 1 · Write it
> Give the execute-cycle micro-operations of `STA @X`, which stores ACC through an indirect address.
>
> > [!ANSWER] Show answer
> > $T_0$: $Ad(IR)\to MAR$; $T_1$: $ACC\to MDR$; $T_2$: $MDR\to M(MAR)$ with the write line asserted.

> [!PRACTICE] 2 · Count
> If the example used direct addressing and skipped the indirect cycle, how many beats and how many nanoseconds at 1 GHz?
>
> > [!ANSWER] Show answer
> > Three fetch beats plus three execute beats make six beats, and at 1 GHz that is 6 ns.

## Formal statement

The control unit takes the clock, the instruction register, the program status word, and device requests as inputs and produces register-transfer, ALU, memory read/write, and interrupt-acknowledge commands through decode and timing logic. The fetch cycle is fixed: $PC\to MAR$; $M(MAR)\to MDR$ with $PC+1\to PC$; $MDR\to IR$ with $OP(IR)\to CU$. An indirect cycle is inserted for indirect addressing and performs $Ad(IR)\to MAR$, $M(MAR)\to MDR$, and $MDR\to Ad(IR)$, replacing the formal address with an effective address. The execute cycle follows the opcode; for indirect addition it fetches the address, reads the operand, and performs $ACC+MDR\to ACC$. The interrupt cycle saves the breakpoint by supplying a save address, asserting write, transferring PC through MDR to memory, and loading the handler entry into PC. Instruction time is the sum of the beats in all work cycles.