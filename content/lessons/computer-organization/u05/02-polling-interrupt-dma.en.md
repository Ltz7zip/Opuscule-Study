---
slug: "polling-interrupt-dma"
subject: "computer-organization"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 10 · Computer Organization · Mastery"
title: "Programmed Polling, Interrupts, and DMA"
subtitle: "Same 4 MB/s disk, CPU use drops from 40% to 0.05%"
minutes: 18
meta: ["18 min read","Requires I/O interfaces and ports","Mastery level"]
concepts: ["interrupt","dma","iosys"]
prereq: ["iosys"]
related: ["dma","interrupt","cache"]
---

## What you will get

By the end of this lecture you can trace the data path of polling, interrupt-driven I/O, and DMA, explain how interrupt response differs from service and how a vector locates the handler, distinguish the three DMA modes, and compute each CPU utilization.

## Three lines back

- Polling makes the CPU read status in a loop: simple, but wasteful.
- Interrupts let a device notify the CPU when ready, so the CPU acts only during service.
- DMA moves data directly between device and main memory, leaving the CPU one interrupt per block.

## Polling and interrupt-driven I/O

Programmed polling runs a fixed loop: start the device, read the status port, test READY, loop if not ready, read the data port when ready, update the address and counter, and check whether the transfer is complete. The CPU executes every step, so it waits as long as the device is slow.

Interrupts hand the waiting to hardware. When a device is ready it raises an interrupt request. The CPU responds after finishing the current instruction: it disables interrupts, saves the breakpoint and state, fetches the interrupt vector, and enters the handler. The handler performs one transfer, restores the state, enables interrupts, and returns. **Interrupt response** is the hardware context switch; **interrupt service** is the software work. They are not the same thing. The vector table holds handler entry addresses, and the interrupt number times the vector size gives the table entry.

| Method | Data path | CPU involvement | Timeliness | Use |
| --- | --- | --- | --- | --- |
| Polling | Device to interface to CPU to memory | Loops the whole time | Poor, depends on poll rate | Slow, simple devices |
| Interrupt | Device to interface to CPU to memory | Once per transfer | Fair, handles urgent events | Medium and slow, random events |
| DMA | Device to memory through a DMA controller | Only at block start and end | Good, hardware moves the data | Fast block devices |

Take a 4 MB/s disk and a 1 GHz CPU. If every byte causes an interrupt and each service takes 200 cycles, there are four million interrupts per second and utilization is

$$U=\frac{4\times10^6\times200}{10^9}=0.8$$

or 80%, so the CPU drowns in interrupts. Interrupting every four bytes cuts it to 20%. Service cost sets the maximum event rate interrupts can sustain.

## The three DMA transfer modes

A DMA controller holds a memory address register, a word counter, a data buffer, and a control/status register. The CPU initializes them and starts the transfer; the controller then moves data directly between device and memory, incrementing the address and decrementing the counter per word, and raises one interrupt at zero.

| Mode | Bus use | Effect on CPU | Suitable for |
| --- | --- | --- | --- |
| CPU halt | DMA owns the bus for the whole block | CPU cannot access memory, large impact | Fast, large transfers |
| Cycle stealing | DMA takes one or a few bus cycles at a time | Short delays, small impact | Disks, network cards |
| Interleaved | DMA and CPU share the bus in fixed slots | Nearly invisible to CPU | Systems with a clear bus-cycle split |

The difference is when DMA takes the bus. CPU halt is simplest but blocks memory access for the whole block. Cycle stealing breaks the transfer into single cycles, delaying the CPU only briefly. Interleaved assigns fixed time slots and works when CPU and DMA speeds match.

## Comparing the three quantitatively

Again use a 4 MB/s disk and 1 GHz CPU. Polling for 100 cycles gives 40%. Interrupts at 200 cycles per byte give 80%, and every four bytes gives 20%. DMA with 4 KB blocks and 500 cycles of setup plus completion gives

$$U_{\text{DMA}}=\frac{(4\times10^6/4096)\times500}{10^9}=\frac{1000\times500}{10^9}=0.0005$$

or 0.05%, 1600 times lower than per-byte interrupts.

| Method | Intervention rate | Cost each | CPU utilization |
| --- | --- | --- | --- |
| Polling | Once per byte | 100 cycles | 40% |
| Interrupt, per byte | $4\times10^6$ per second | 200 cycles | 80% |
| Interrupt, per 4 bytes | $10^6$ per second | 200 cycles | 20% |
| DMA, 4 KB blocks | 1000 per second | 500 cycles | 0.05% |

Cycle stealing also has a hidden cost. If DMA takes one of every four bus cycles during a transfer, memory performance drops about 25% for that interval. If the transfer lasts 1 ms every 10 ms, the average drop is $0.1\times0.25=2.5\%$, still far below polling's 40%.

> [!NOTE]
> DMA does not remove the CPU: it still initializes the controller and handles the completion interrupt, turning one intervention per byte into one per block. Larger blocks amortize the cost further.

## Three common misconceptions

> [!MYTH] DMA transfers use no CPU at all.
> The CPU still initializes the controller and services completion interrupts, and cycle stealing takes bus cycles. DMA reduces how often the CPU intervenes, not to zero.

> [!MYTH] Interrupt response means running the handler.
> Response is hardware: disable interrupts, save the breakpoint, fetch the vector. Service is software: move the data and handle the device. Response usually takes only tens of cycles.

> [!MYTH] DMA is always faster than interrupts.
> DMA suits large, fast blocks but has fixed startup cost. For one byte, DMA setup costs far more than an interrupt, so small slow devices suit interrupts.

## Practice

> [!PRACTICE] 1 · Polling utilization
> A device runs at 8 MB/s, one poll takes 100 cycles, and the CPU is 2 GHz. What is CPU utilization?
>
> > [!ANSWER] Show answer
> > $U=8\times10^6\times100/2\times10^9=0.4$, or 40%.

> [!PRACTICE] 2 · DMA utilization
> DMA uses 8 KB blocks at 8 MB/s, with 400 cycles of setup and completion per block on a 2 GHz CPU. Find utilization.
>
> > [!ANSWER] Show answer
> > Blocks per second $=8\text{M}/8\text{K}=1000$, total cycles $=1000\times400=4\times10^5$, so $U=4\times10^5/2\times10^9=0.0002$, or 0.02%.

## Formal statement

I/O control is polling, interrupt-driven I/O, or DMA. Polling loops the CPU over status and data; with device rate $R$, $c$ cycles per poll, and clock $f$, utilization is $U=Rc/f$. Interrupt-driven I/O raises a request when the device is ready, and the CPU responds after the current instruction: hardware disables interrupts, saves the breakpoint, and fetches the vector, while software performs the service. DMA uses a controller to move data directly between memory and device, in CPU-halt, cycle-stealing, or interleaved mode. With $B$ bytes per block and $c$ cycles per block, utilization is $U=(R/B)\cdot c/f$. Larger blocks lower overhead, while small slow devices suit interrupts.