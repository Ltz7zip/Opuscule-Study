---
slug: "generations-and-classes"
subject: "computer-organization"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Computer Organization · Mastery"
title: "Computer Generations and Machine Classes"
subtitle: "Four device eras, one Moore curve, four machine classes"
minutes: 14
meta: ["14 min read","Requires computer system basics","Mastery level"]
concepts: ["cpustruct","complexity"]
prereq: ["cpustruct"]
related: ["complexity","isa"]
---

## What you will get

By the end of this lecture you can name the four generations by their logic devices and the era each covers, estimate transistor growth with Moore's law, and sort machines into supercomputers, minicomputers, microcomputers, and embedded systems.

## Three lines back

- Generations are defined by logic devices: vacuum tubes, transistors, small-scale ICs, then large-scale ICs.
- Moore's law says transistor density doubles about every two years; it is an industry trend, not a law of physics.
- The boundaries between super, mini, micro, and embedded machines depend on compute, size, power, and use.

## Four generations, four device eras

ENIAC, completed in 1946, used 18,000 vacuum tubes, occupied roughly 170 square meters, drew 150 kW, and performed about 5,000 additions per second. Programs were set by plugboards, so it was not yet a stored-program machine. The 1945 EDVAC proposal put instructions and data in one memory and became the template for later von Neumann machines.

| Generation | Years | Main device | Typical traits |
| --- | --- | --- | --- |
| First | 1946–1957 | Vacuum tube | Thousands to tens of thousands of operations per second; machine and assembly language; large and power-hungry |
| Second | 1958–1964 | Transistor | Around 100,000 operations per second; FORTRAN, COBOL, and monitor programs appear |
| Third | 1965–1971 | Small and medium-scale IC | Around one million operations per second; operating systems mature; compatible machine families |
| Fourth | 1972–present | Large and very-large-scale IC | Microcomputers spread; parallelism and multicore; hardware-software co-design |

The compatible family was a key third-generation idea. One vendor offered several models at different performance points while keeping the same instruction set, so customers could upgrade without rewriting software. This separated the instruction set architecture from a particular implementation.

## Moore's law and integration density

In 1965 Gordon Moore observed that transistors per chip roughly doubled every year; the rate was later revised to about every two years. As a formula,

$$N(t)=N_0\cdot2^{t/T}$$

with a doubling time $T$ of two years. Starting from the 2,300 transistors of the Intel 4004, the value after 40 years is

$$N=2300\times2^{40/2}=2300\times2^{20}\approx2.41\times10^9$$

Sandy Bridge in 2011 held about 2.3 billion transistors, within a few percent of the estimate.

| Year | Chip | Transistors | Relative to 4004 |
| --- | --- | --- | --- |
| 1971 | Intel 4004 | 2,300 | 1× |
| 1978 | Intel 8086 | 29,000 | 12.6× |
| 1993 | Pentium | 3.1×10^6 | 1,348× |
| 2011 | Sandy Bridge | 2.3×10^9 | 10^6× |

Higher integration has two consequences. First, the cost per transistor falls. Second, power density rises, and around 2005 clock frequency stopped scaling with each process generation, pushing the industry toward multicore and specialized accelerators. Moore's law has clearly slowed in the last decade; below 7 nm each generation delivers less than it used to.

## Supercomputers, minicomputers, microcomputers, embedded

| Class | Scale and form | Main use | Key metric |
| --- | --- | --- | --- |
| Supercomputer | Rack scale, thousands to tens of thousands of processors | Weather, nuclear simulation, astrophysics | PFLOPS-class throughput, interconnect bandwidth |
| Minicomputer | Departmental server | Transaction processing, databases | Reliability, I/O throughput |
| Microcomputer | Desktop or laptop | Office work, development, entertainment | Single-core performance, efficiency |
| Embedded | Chip scale, MCU or SoC | Appliances, cars, industrial control | Real-time response, power, cost |

The compute gap is easy to quantify with one workload. For $10^{15}$ floating-point operations, a 1 PFLOPS supercomputer needs

$$T=\frac{10^{15}}{10^{15}}=1\ \text{s}$$

while a 100 GFLOPS desktop needs

$$T=\frac{10^{15}}{10^{11}}=10^4\ \text{s}\approx2.78\ \text{h}$$

a factor of ten thousand. Embedded systems take a different route: a 100 MHz microcontroller draws tens of milliwatts, several orders of magnitude less compute than a PC, but can run for years on a battery and has predictable interrupt latency.

> [!NOTE]
> Class boundaries move with technology. A modern phone SoC already beats 1990s multiprocessor supercomputers on peak throughput, yet it is still treated as an embedded or mobile part because power and heat, not peak FLOPS, are the binding constraints.

## Three common misconceptions

> [!MYTH] Moore's law is a law of physics.
> It is an empirical trend driven by process technology, investment, and demand. The doubling period has lengthened; it is not a natural constant.

> [!MYTH] The fourth generation means personal computers.
> The fourth generation means large-scale integration, and it covers PCs along with servers, supercomputers, and embedded systems. The PC is only one form.

> [!MYTH] A supercomputer is simply the largest machine.
> "Super" refers to compute and system scale, not cabinet size. A cluster of ordinary servers joined by a fast network can also reach petascale.

## Practice

> [!PRACTICE] 1 · Project growth
> A 1971 chip holds 2,300 transistors. If the count doubles every two years, what is the theoretical value in 2011?
>
> > [!ANSWER] Show answer
> > Forty years contain 20 doublings, so $2300\times2^{20}=2300\times1{,}048{,}576\approx2.41\times10^9$, about 2.4 billion transistors.

> [!PRACTICE] 2 · Time a job
> A calculation needs $5\times10^{14}$ floating-point operations. How long does a 100 GFLOPS machine take?
>
> > [!ANSWER] Show answer
> > $5\times10^{14}/10^{11}=5000$ s, about 83.3 minutes. A 10 TFLOPS server would finish in 50 s.

> [!PRACTICE] 3 · Classify
> Sort these into a class: a car radar controller, a weather-forecast cluster, and a programmer's laptop.
>
> > [!ANSWER] Show answer
> > The radar controller is embedded, judged by real-time response and low power. The forecast cluster is a supercomputer, judged by floating-point throughput and interconnect. The laptop is a microcomputer, judged by single-core performance and portability.

## Formal statement

Computers are divided into four generations by logic device: vacuum tubes, transistors, small and medium-scale integrated circuits, and large and very-large-scale integrated circuits. The third generation introduced compatible machine families, separating the instruction set architecture from its implementation. Moore's law states that transistors per chip double about every two years, written $N(t)=N_0 2^{t/T}$; its consequences are falling cost per transistor and rising power density. By scale and use, machines are classed as supercomputers, minicomputers, microcomputers, and embedded systems. Supercomputers pursue PFLOPS-class floating-point throughput, microcomputers pursue single-core performance and efficiency, and embedded systems pursue real-time response, low power, and low cost. The boundaries shift as process technology advances.