---
slug: "bus-basics"
subject: "computer-organization"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Computer Organization · Mastery"
title: "Bus Fundamentals and Classification"
subtitle: "Why a 32-bit, 66 MHz bus is not 66 MB/s"
minutes: 15
meta: ["15 min read","Requires the hardware block diagram","Mastery level"]
concepts: ["bus","iosys"]
prereq: ["cpustruct"]
related: ["bus","iosys"]
---

## What you will get

By the end of this lecture you can separate on-chip, system, and communication buses by what they connect, state the direction and width meaning of the data, address, and control groups, compute bus bandwidth from width and frequency, and explain why address/data multiplexing halves throughput.

## Three lines back

- A bus is a shared set of wires: one sender at a time, many receivers.
- A system bus has data, address, and control groups that decide how much, where, and how.
- Bandwidth is not width times frequency; divide by 8 and multiply by transfers per cycle.

## Three bus classes and three signal groups

| Class | What it connects | Examples | Traits |
| --- | --- | --- | --- |
| On-chip | Registers, ALU, control unit inside the CPU | Register file to ALU | Short, fast, never leaves the die |
| System | CPU, main memory, I/O interfaces | Data, address, control buses | Shared, expandable, needs arbitration |
| Communication | Computer to computer or to peripherals | USB, PCIe, SATA, Ethernet | Longer distance, standard, mostly serial |

The system bus groups signals by job:

| Group | Direction | Width determines | Typical signals |
| --- | --- | --- | --- |
| Data | Bidirectional | Bits per transfer | D0–D31 |
| Address | Unidirectional, driven by master | Number of addressable locations | A0–A19 |
| Control | Mixed | Control capability and timing | Read, write, interrupt request, bus request, clock |

With $n$ address lines the address space is $2^n$ locations. Twenty lines give 1M locations, or 1 MB with byte addressing; 32 lines give 4G locations, or 4 GB. Address lines are unidirectional because the address always travels from master to slave. Data lines are bidirectional because both reads and writes use them.

## Computing bus bandwidth

Bandwidth is bytes moved per second:

$$B=\frac{W}{8}\times f\times k$$

where $W$ is the number of data lines, $f$ the bus clock, and $k$ the transfers per clock. A single-edge bus has $k=1$; a double-data-rate bus has $k=2$.

A 32-bit, 66 MHz single-edge bus gives

$$B=\frac{32}{8}\times66\times10^6=4\times66\times10^6=264\ \text{MB/s}$$

With double-edge transfer it reaches 528 MB/s. Treating 66 MHz as 66 MB/s confuses bits with bytes and is off by a factor of four.

| Bus | Width | Frequency | Transfers per cycle | Bandwidth |
| --- | --- | --- | --- | --- |
| ISA | 16 bits | 8 MHz | 1 | 16 MB/s |
| PCI | 32 bits | 33 MHz | 1 | 132 MB/s |
| This example | 32 bits | 66 MHz | 1 | 264 MB/s |
| Wide bus | 64 bits | 100 MHz | 1 | 800 MB/s |

## Multiplexing and performance metrics

To save pins, address and data can share one set of wires, called address/data multiplexing. The cost is that each transfer splits into two phases: address first, data second.

Take a 32-bit, 100 MHz bus. With separate lines, each cycle moves 4 bytes:

$$B_{\text{sep}}=4\times100\times10^6=400\ \text{MB/s}$$

With multiplexing, one transfer needs two cycles, one for address and one for data:

$$B_{\text{mux}}=\frac{4}{2}\times100\times10^6=200\ \text{MB/s}$$

The wire count drops from 64 to 32 and bandwidth halves. This is a classic area and pin-count trade against performance.

| Metric | Meaning | Effect |
| --- | --- | --- |
| Bandwidth | Bytes per second | Sets the system throughput ceiling |
| Width | Number of data lines | Sets transfer size and pin cost |
| Clock rate | Bus clock | Limited by signal integrity and power |
| Transfer period | Clocks per complete transfer | Includes address, data, and wait cycles |
| Load capability | Number of attachable devices | Too many raise capacitance and lower frequency |

> [!NOTE]
> A bus is shared, so bandwidth is a ceiling, not a guarantee. When several devices request at once, real throughput also loses cycles to arbitration, waiting, and idle time.

## Three common misconceptions

> [!MYTH] Wider is always better for a bus.
> More width means more pins, package cost, and routing, plus harder synchronization. Many modern high-speed buses use fewer pins with serial differential signaling instead.

> [!MYTH] Bandwidth is simply width times frequency.
> Width is in bits and bandwidth in bytes per second, so divide by 8. DDR doubles the rate, and a multiplexed bus needs several cycles per transfer.

> [!MYTH] The address bus is bidirectional.
> Addresses travel one way, from master to slave, so address lines are unidirectional. Data lines are bidirectional, and control lines vary by signal type.

## Practice

> [!PRACTICE] 1 · Bandwidth
> A bus has 64 data lines, runs at 133 MHz, and uses DDR. What is its bandwidth?
>
> > [!ANSWER] Show answer
> > $B=(64/8)\times133\times10^6\times2=8\times133\times10^6\times2=2.128$ GB/s.

> [!PRACTICE] 2 · Address space
> A byte-addressed machine has 24 address lines. How large is its address space, and what if it uses 16-bit word addressing?
>
> > [!ANSWER] Show answer
> > It has $2^{24}=16{,}777{,}216$ locations. Byte addressing gives 16 MB; 16-bit word addressing gives $16\text{M}\times2$ B = 32 MB.

> [!PRACTICE] 3 · Multiplexing cost
> A 32-bit, 200 MHz bus multiplexes address and data, using two cycles per transfer. What is its bandwidth, compared with separate lines?
>
> > [!ANSWER] Show answer
> > Multiplexed: $(4/2)\times200\times10^6=400$ MB/s. Separate: $4\times200\times10^6=800$ MB/s. Multiplexing halves the wires and halves the bandwidth.

## Formal statement

A bus is a shared set of information-transfer wires connecting two or more units. By what it connects, it is classed as on-chip, system, or communication. A system bus carries data, address, and control groups: data lines are bidirectional and their width sets bits per transfer, address lines are unidirectional and their width sets the address space $2^n$, and control lines carry read/write, interrupt, and bus-request signals. Bandwidth is $B=(W/8)fk$, where $W$ is the number of data lines, $f$ the clock frequency, and $k$ the transfers per cycle. Address/data multiplexing reduces wire count but splits each transfer into an address phase and a data phase, lowering bandwidth accordingly. Bandwidth, width, frequency, transfer period, and load capability together determine interconnect performance.