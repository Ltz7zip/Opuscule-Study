---
slug: "computer-system-overview"
subject: "computer-organization"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Computer Organization · Mastery"
title: "Computer Systems and the Hardware Block Diagram"
subtitle: "Stored program, five units, and one ADD instruction"
minutes: 15
meta: ["15 min read","Requires digital logic basics","Mastery level"]
concepts: ["cpustruct","isa","memhier"]
prereq: ["isa"]
related: ["cpustruct","memhier"]
---

## What you will get

By the end of this lecture you can draw the von Neumann block diagram and state what each of the five units does, explain why the stored-program idea lets a machine run without human intervention, and trace one `ADD` instruction from fetch to write-back while counting its memory accesses and execution time.

## Three lines back

- A computer system is hardware plus software, and software splits into system software and application software.
- The von Neumann design keeps instructions and data in one memory and fetches instructions by address.
- The CPU is the arithmetic unit plus the control unit; memory and I/O attach to it through buses.

## From hardware and software to the von Neumann machine

Hardware is the physical side: the host consists of the CPU and main memory, while peripherals cover input, output, and secondary storage. Software has two layers. System software manages the hardware and gives upper layers an interface, including the operating system, compilers, and database managers. Application software solves a user problem directly.

The von Neumann design, described in the 1945 EDVAC proposal, rests on the **stored-program** concept: instructions and data live in the same binary memory, instructions are laid out in address order, and the control unit automatically fetches the next one and executes it. This replaced the plugboard style of early machines with a program loaded into memory.

| Unit | Responsibility | Typical registers or parts |
| --- | --- | --- |
| Arithmetic unit | Arithmetic and logic operations | ALU, ACC, MQ, X |
| Control unit | Fetch, decode, issue control signals | PC, IR, CU |
| Memory | Hold program and data | MAR, MDR, storage array |
| Input | Bring outside information in | Keyboard, mouse, scanner |
| Output | Send results out | Display, printer |

The arithmetic and control units form the CPU; the CPU plus main memory forms the host. The five units exchange information over buses, with data, address, and control traffic kept separate.

## Tracing one instruction

Take a 16-bit machine with word-addressed memory. Address 20H holds `ADD 30H`, where opcode 10H means add and 30H is the operand address. Before execution ACC=0005H and memory cell 30H holds 0003H.

| Step | Action | Key value |
| --- | --- | --- |
| Fetch | PC to MAR, issue read | MAR=20H |
| Fetch | Memory to MDR to IR | IR=1030H |
| Fetch | Increment PC | PC=21H |
| Decode | Opcode to CU, address to MAR | MAR=30H |
| Operand | Read memory into temporary register | MDR=0003H |
| Execute | Add operand to ACC | ACC=0008H |

The instruction touches memory twice, once for the instruction and once for the operand. At 100 ns per access and no overlap, it takes 200 ns, so the throughput ceiling is $1/(200\ \text{ns})=5\times10^6$ instructions per second, or 5 MIPS. Indirect addressing would add a third access and push the time to 300 ns.

## How the bus ties the units together

The system bus carries three groups of signals. The data bus moves instructions and data, and its width sets how many bits travel at once. The address bus carries a memory or I/O port number, and its width sets the address space. The control bus carries read/write, interrupt request, bus request, and clock signals.

With $n$ address lines the machine can name $2^n$ locations. Sixteen lines give $2^{16}=65536$ locations, which is 64 KB when each location is one byte. With $m$ data lines, one transfer moves $m$ bits.

| Bus | Direction | Width determines | Example |
| --- | --- | --- | --- |
| Data | Bidirectional | Bits per transfer | 16 lines, 16 bits at a time |
| Address | Unidirectional | Number of locations | 20 lines, 1M locations |
| Control | Mixed | Control capability and timing | Read, write, interrupt request |

> [!NOTE]
> A side effect of the stored-program design is that instructions and data look identical in memory. The CPU separates them by the address in PC and by the current machine cycle, not by the bit pattern itself.

## Three common misconceptions

> [!MYTH] The von Neumann design is centered on the arithmetic unit.
> Early machines were arithmetic-centered and routed all traffic through the ALU. The von Neumann design centers on memory, so I/O can move data to and from memory without passing through the CPU.

> [!MYTH] The CPU is the same thing as the host.
> The CPU contains only the arithmetic and control units. The host also includes main memory and the host bus that connects them.

> [!MYTH] Stored program means keeping the program file on a disk.
> It means the program is loaded into main memory and its instructions are fetched by address automatically. A program on disk is not running until it is loaded and PC points into it.

## Practice

> [!PRACTICE] 1 · Trace the data flow
> Address 40H holds `SUB 50H`, ACC=0009H, and cell 50H holds 0004H. Give PC and IR after the fetch, and ACC after execution.
>
> > [!ANSWER] Show answer
> > After the fetch IR holds the SUB opcode combined with 50H, and PC=41H. Execution reads 0004H, so ACC=0009H−0004H=0005H.

> [!PRACTICE] 2 · Size the memory
> A byte-addressed machine has 24 address lines. What is its maximum capacity, and how many bytes can a 32-bit data bus move per transfer?
>
> > [!ANSWER] Show answer
> > It can name $2^{24}=16{,}777{,}216$ locations, or 16 MB. A 32-bit data bus moves 4 bytes per transfer.

> [!PRACTICE] 3 · Time one instruction
> An instruction averages 2.5 memory accesses at 80 ns each, and the clock is 1 GHz. Ignoring overlap, how long does it take, and what is the MIPS rating?
>
> > [!ANSWER] Show answer
> > The accesses take $2.5\times80=200$ ns. At 1 GHz that is 200 clock cycles, so CPI=200 and MIPS $=10^9/(200\times10^6)=5$.

## Formal statement

A von Neumann computer consists of an arithmetic unit, a control unit, a memory, input devices, and output devices. Instructions and data are stored in binary form in the same memory, instructions are arranged in address order, and the control unit fetches, decodes, and issues control signals under the guidance of the program counter. The arithmetic unit performs arithmetic and logic operations, while input and output devices exchange information through interfaces and buses. The stored-program principle lets the machine execute a program automatically and continuously without manual intervention, at the cost of sharing one memory and one bus between instructions and data, the so-called von Neumann bottleneck.