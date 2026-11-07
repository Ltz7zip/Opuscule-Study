---
slug: "bus-arbitration-and-transfer"
subject: "computer-organization"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Computer Organization · Mastery"
title: "Bus Arbitration and Bus Communication"
subtitle: "Eight devices fighting for one bus: lines and latency in three schemes"
minutes: 16
meta: ["16 min read","Requires bus fundamentals","Mastery level"]
concepts: ["bus","interrupt","iosys"]
prereq: ["bus"]
related: ["iosys","interrupt"]
---

## What you will get

By the end of this lecture you can compare three arbitration schemes by control-line count and response time, compute worst-case delay for a given device count, and separate the timing costs of synchronous, asynchronous, and semi-synchronous transfer.

## Three lines back

- Arbitration settles which master gets the bus when several ask at once; centralized arbitration puts the decision in one controller.
- Daisy chain uses few wires but slows with distance; independent request is fastest but wire-heavy; counter polling sits between.
- Synchronous transfer uses a common clock, asynchronous uses handshakes, and semi-synchronous inserts wait states.

## Three centralized arbitration schemes

Say $n$ masters share a bus. **Daisy-chain arbitration** uses only a bus-request line $BR$ and a bus-grant line $BG$ that passes through each device in turn. A requesting device raises $BR$; the controller asserts $BG$; the first requesting device on the chain captures the grant, otherwise it passes $BG$ onward. **Counter polling** uses device-address lines. The controller counts from zero and compares the count with each request; when it matches a requesting device, the grant is issued. **Independent request** gives every device its own request and grant line, and the controller arbitrates with a priority encoder.

| Scheme | Control lines ($n=8$) | Worst-case response | Reliability | Flexibility |
| --- | --- | --- | --- | --- |
| Daisy chain | 2 ($BR$, $BG$) | Grows linearly with position | One broken link kills all downstream devices | Priority fixed by wiring |
| Counter polling | $1+\lceil\log_2 n\rceil=4$ | Depends on start count, at most $n$ slots | Fairly good | Priority changeable in software |
| Independent request | $2n=16$ | One encoder delay | A single line fault affects one device | Programmable priority |

Numbers help. If each daisy-chain device adds 10 ns of gate delay, the farthest device waits $8\times10=80$ ns. A 50 MHz counter gives 20 ns per slot, so eight slots take 160 ns. An independent-request priority encoder takes about 20 ns. If the transfer itself takes 100 ns, a complete transfer costs

$$T_{\text{chain}}=80+100=180\ \text{ns},\quad T_{\text{counter}}=160+100=260\ \text{ns},\quad T_{\text{indep}}=20+100=120\ \text{ns}$$

Throughput ceilings are $1/180\ \text{ns}=5.56$ M transfers/s, $3.85$ M/s, and $8.33$ M/s. Daisy chain uses the fewest wires, but the latency gap between highest and lowest priority devices reaches 70 ns.

## Synchronous, asynchronous, and semi-synchronous transfer

**Synchronous transfer** is paced by a common bus clock. A transfer occupies a fixed number of cycles, and every device must run at the same frequency. **Asynchronous transfer** has no common clock; request and acknowledge handshakes let a slow device stretch the cycle naturally. **Semi-synchronous transfer** keeps the clock but lets a device insert wait cycles, balancing speed and compatibility.

| Scheme | Clock | Speed | Tolerates slow devices | Cost |
| --- | --- | --- | --- | --- |
| Synchronous | Common clock | Fastest, fixed overhead | Poor, limited by the slowest device | Clock skew, frequency capped by the slowest device |
| Asynchronous | None | Depends on handshake | Good | More control lines, complex protocol |
| Semi-synchronous | Clock plus waits | Close to synchronous | Fairly good | Needs wait and timeout logic |

Take a 100 MHz bus. A synchronous read takes a fixed 3 clocks, or 30 ns. If a device actually needs 50 ns, semi-synchronous transfer inserts two wait cycles and stretches the read to 5 clocks, 50 ns. An asynchronous handshake with 20 ns propagation each way plus the 50 ns device time takes about 90 ns. Synchronous is fastest when devices match; asynchronous is steadier when they differ.

## Bus standards and selection

A bus standard defines mechanical dimensions, pinout, electrical characteristics, timing, and protocol. Selection depends on bandwidth, topology, distance, and ecosystem.

| Standard | Topology | Typical bandwidth | Use |
| --- | --- | --- | --- |
| ISA | Shared parallel | 16-bit, 8 MHz, 16 MB/s | Early PC expansion |
| PCI | Shared parallel | 32-bit, 33 MHz, 132 MB/s | General peripherals |
| PCIe 3.0 ×1 | Point-to-point serial | About 984 MB/s | Graphics cards, NVMe SSDs |
| USB 3.0 | Host-polled serial | 5 Gbit/s, about 500 MB/s after coding | Mobile peripherals |
| SATA 3.0 | Point-to-point serial | 6 Gbit/s, about 600 MB/s | Hard drives, optical drives |

PCIe sounds like PCI but is a point-to-point serial link: each device owns its lane, so shared-bus arbitration does not arise. USB 3.0 uses 8b/10b coding, so only 8 of every 10 bits carry data; its effective rate is $5\times10^9\times8/10=4$ Gbit/s, or 500 MB/s.

> [!NOTE]
> Arbitration decides who goes first; it does not change the electrical speed of one transfer. With many devices, arbitration overhead is charged to every transfer, so evaluate both together.

## Three common misconceptions

> [!MYTH] Daisy chain is fastest because its logic is simplest.
> The grant passes device by device, so latency grows with distance. With many devices the worst case reaches $n$ gate delays, slower than independent request.

> [!MYTH] Asynchronous transfer must be slower because it has no clock.
> Handshaking adapts well when speeds differ, and a slow device does not slow the whole bus. Synchronous wins only when devices are fast and matched.

> [!MYTH] A bus standard is just pinout and voltage.
> A standard also covers timing, protocol, arbitration, error handling, and mechanical form. Matching voltages without protocol still leaves devices unable to communicate.

## Practice

> [!PRACTICE] 1 · Count lines
> With 16 masters, how many control lines do the three arbitration schemes need?
>
> > [!ANSWER] Show answer
> > Daisy chain needs 2. Counter polling needs $1+\lceil\log_2 16\rceil=5$. Independent request needs $2\times16=32$.

> [!PRACTICE] 2 · Insert wait states
> A 100 MHz synchronous bus uses a fixed 4-clock read, but the device needs 70 ns. How many wait cycles does semi-synchronous transfer add?
>
> > [!ANSWER] Show answer
> > Four clocks are 40 ns, leaving 30 ns. Each clock is 10 ns, so 3 wait cycles are added, for 7 clocks and 70 ns total.

## Formal statement

Bus arbitration decides which master gets the bus when several request it at once. Centralized arbitration has three forms. Daisy chain passes a request and grant line device to device, so worst-case delay grows linearly with position. Counter polling uses a request line and $\lceil\log_2 n\rceil$ address lines and scans devices in time slots. Independent request gives each of $n$ devices its own request and grant lines, $2n$ total, and uses a priority encoder: lowest latency, highest wire cost. Communication is synchronous when a common clock fixes the cycle count, asynchronous when handshakes adapt to device speed, and semi-synchronous when wait cycles are inserted. A bus standard unifies mechanical, electrical, timing, and protocol specifications.