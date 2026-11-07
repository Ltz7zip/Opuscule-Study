---
slug: "machine-levels-and-performance"
subject: "computer-organization"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Computer Organization · Mastery"
title: "Machine Levels and Performance Metrics"
subtitle: "1.5 GHz with CPI 1.7: how many MIPS is that?"
minutes: 16
meta: ["16 min read","Requires computer system basics","Mastery level"]
concepts: ["cpustruct","isa","memhier"]
prereq: ["cpustruct"]
related: ["isa","memhier"]
---

## What you will get

By the end of this lecture you can list the machine levels by language and translator, tell machine word length apart from storage word length and capacity, and compute average CPI, MIPS, and program execution time from an instruction mix.

## Three lines back

- A computer is layered by language and translator, and each layer offers the one above a more convenient virtual machine.
- Machine word length is how many bits the CPU handles at once; capacity is the number of locations times bits per location.
- Clock frequency only sets the beat. What decides speed is the product of instruction count and CPI.

## The multi-level hierarchy

A computer does not expose only machine instructions. By language and translation, six levels are usually distinguished:

| Level | Name | Language used | Translator or support |
| --- | --- | --- | --- |
| M5 | Application language machine | Application language | Application packages |
| M4 | High-level language machine | C, Java, and so on | Compiler |
| M3 | Assembly language machine | Assembly language | Assembler |
| M2 | Operating system machine | System calls | Operating system |
| M1 | Conventional machine | Machine instructions | Microprogram or hardwired logic |
| M0 | Microprogram machine | Microinstructions | Hardware |

Each pair of adjacent levels is joined by a translator: a compiler turns a high-level language into assembly or machine code, and an assembler turns mnemonics into machine code. Each level cares only about its own language, and the implementation below is transparent to programmers above. M0 and M1 together form the actual execution machinery of the CPU, while M2 and above are built in software and are often called virtual machines.

The point of the layering is separation of complexity. A high-level programmer need not know how many ways the cache is set-associative, and a CPU designer only answers to the M1 instruction set.

## Word length and storage capacity

**Machine word length** is the number of bits the CPU can process in parallel, usually the width of the arithmetic registers and the internal data path. **Storage word length** is the width of one memory location and may differ. **Storage capacity** is locations times width:

$$C=N\times W$$

where $N=2^n$ for $n$ address lines and $W$ is the storage word length.

With 20 address lines and 16 data lines, word addressing gives

$$2^{20}\times16\ \text{bit}=1\text{M}\times2\ \text{B}=2\ \text{MB}$$

The same 20 lines with byte addressing give 1 MB, because each location now holds only 8 bits. Address lines fix the number of locations; capacity also depends on bytes per location.

| Metric | Definition | Value here |
| --- | --- | --- |
| Address lines | Number of addressable locations | 20 lines, $2^{20}$ locations |
| Storage word length | Bits per location | 16 bits |
| Word-addressed capacity | Locations × width | $1\text{M}\times16$ bits = 2 MB |
| Byte-addressed capacity | Bytes | 1 MB |

## Speed: CPI, MIPS, and execution time

For a program of $I$ instructions where class $i$ has fraction $p_i$ and needs $CPI_i$ cycles, average CPI is

$$\overline{CPI}=\sum_i p_i\cdot CPI_i$$

At clock frequency $f$, execution time is

$$T=\frac{I\cdot\overline{CPI}}{f}$$

and MIPS relates to CPI by

$$\text{MIPS}=\frac{f}{\overline{CPI}\times10^6}$$

Take a program of $10^6$ instructions at 1.5 GHz with this mix:

| Instruction class | Fraction $p_i$ | CPI | Contribution |
| --- | --- | --- | --- |
| Arithmetic and logic | 0.5 | 1 | 0.5 |
| Load and store | 0.3 | 2 | 0.6 |
| Branch | 0.2 | 3 | 0.6 |

Average CPI is $0.5+0.6+0.6=1.7$, so

$$\text{MIPS}=\frac{1.5\times10^9}{1.7\times10^6}=882.4$$

and the program takes

$$T=\frac{10^6\times1.7}{1.5\times10^9}=1.133\ \text{ms}$$

If the compiler cuts branches to 10% and raises arithmetic to 60%, average CPI becomes $0.6+0.6+0.3=1.5$. The speedup is $1.7/1.5=1.133$, about 13.3% faster. Reducing the share of high-CPI instructions is a different lever from raising the clock.

Floating-point throughput is quoted in MFLOPS or GFLOPS. A matrix routine performing $2\times10^9$ floating-point operations in 0.5 s runs at $4\times10^9$ FLOP/s, or 4000 MFLOPS (4 GFLOPS).

> [!NOTE]
> MIPS treats every instruction as equal work, so it is meaningful only within one instruction set and compiler. Cross-architecture claims need measured run time or a standard benchmark.

## Three common misconceptions

> [!MYTH] A higher clock always means a faster machine.
> Clock frequency only sets the number of cycles per second. If the faster-clocked machine has a larger CPI or more cache misses, its run time can be longer. In $T=I\cdot CPI/f$, all three factors matter.

> [!MYTH] MIPS can compare x86 and ARM directly.
> One instruction does different amounts of work in different instruction sets. A higher MIPS figure does not imply a faster program; compare the same benchmark instead.

> [!MYTH] Machine word length is the number of address lines.
> Word length is how many data bits are processed at once; address lines set the address space. A 32-bit machine may have 32 address lines or only 24.

## Practice

> [!PRACTICE] 1 · MIPS and time
> A 2 GHz machine has average CPI 2.5. What is its MIPS rating, and how long does $4\times10^6$ instructions take?
>
> > [!ANSWER] Show answer
> > MIPS $=2\times10^9/(2.5\times10^6)=800$. Time $=4\times10^6\times2.5/2\times10^9=5$ ms.

> [!PRACTICE] 2 · Capacity
> A machine has 32 address lines and 64 data lines. What is the maximum capacity with byte addressing, and with 64-bit word addressing?
>
> > [!ANSWER] Show answer
> > Byte addressing gives $2^{32}$ B = 4 GB. Word addressing gives $2^{32}\times8$ B = 32 GB, eight times larger.

> [!PRACTICE] 3 · Average CPI
> Three classes take 40%, 40%, and 20% of instructions with CPI 1, 2, and 4. The clock is 2.5 GHz. Find average CPI and MIPS.
>
> > [!ANSWER] Show answer
> > $\overline{CPI}=0.4\times1+0.4\times2+0.2\times4=2.0$, so MIPS $=2.5\times10^9/(2\times10^6)=1250$.

## Formal statement

The machine hierarchy is divided by language and translator into the microprogram machine, conventional machine, operating system machine, assembly language machine, high-level language machine, and application language machine, with lower levels transparent to upper ones. Machine word length is the number of bits the CPU processes in parallel, and storage capacity is locations times storage word length, $C=2^nW$. If class $i$ accounts for fraction $p_i$ of instructions and needs $CPI_i$ cycles, average CPI is $\overline{CPI}=\sum_i p_iCPI_i$, execution time is $T=I\overline{CPI}/f$, and instruction throughput is $\text{MIPS}=f/(\overline{CPI}\times10^6)$. Clock rate, CPI, and instruction count jointly determine performance; improving one alone does not necessarily shorten execution time.