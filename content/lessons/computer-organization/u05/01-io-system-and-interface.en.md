---
slug: "io-system-and-interface"
subject: "computer-organization"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 9 · Computer Organization · Mastery"
title: "The I/O System and I/O Interfaces"
subtitle: "256 ports or 64K addresses: the line between two addressing schemes"
minutes: 14
meta: ["14 min read","Requires buses and address decoding","Mastery level"]
concepts: ["iosys","interrupt"]
prereq: ["bus"]
related: ["interrupt","dma"]
---

## What you will get

By the end of this lecture you can describe the software and hardware sides of an I/O system, list the four jobs of an I/O interface and its three port registers, compare isolated and memory-mapped addressing in space and instructions, and estimate CPU utilization under polling.

## Three lines back

- An I/O system is I/O software, I/O hardware, and the bus that joins them.
- An interface is the translation layer between bus and device: buffering, addressing, status, and control.
- Port addressing decides which instructions touch a device and whether port numbers consume memory space.

## What an I/O system contains

I/O software includes device drivers, interrupt handlers, device management, and user-level I/O libraries. I/O hardware includes interface circuits, device controllers, the peripherals themselves, and the bus. A driver knows the device registers; the operating system turns read and write requests into port operations on the interface.

| Component | Role | Example |
| --- | --- | --- |
| User I/O library | Provides read/write calls | `fread` in the C library |
| Device management | Queuing, scheduling, buffering | Print queue |
| Driver | Operates registers and interrupts | Network card driver |
| Interface and controller | Electrical and protocol conversion | SATA or USB controller |
| Peripheral | Performs the actual I/O | Keyboard, disk, display |

By data organization, devices are character devices (keyboard, serial port; byte streams) or block devices (disk, SSD; fixed-size blocks). By use they are human-interface, storage, or network devices. Their rates span orders of magnitude: a keyboard moves about 10 B/s, a printer about 1 MB/s, a hard disk about 100 MB/s, and an NVMe SSD several GB/s.

## Interface functions and registers

An I/O interface sits between the system bus and the device and does four jobs: address decoding and device selection, data buffering and format conversion, status reporting, and control commands with interrupt requests. The CPU never touches the device directly; it reads and writes ports in the interface.

| Register | Direction from CPU | Contents | Typical bits |
| --- | --- | --- | --- |
| Data port | Read/write | Data being transferred | D0–D7 |
| Status port | Read | Ready, busy, error | READY, BUSY, ERROR |
| Control port | Write | Start, reset, interrupt enable | START, RESET, IE |

A polled input runs in a loop: read the status port and test READY; if it is 0, read again; if it is 1, read the data port and finish one transfer. This is program-controlled polling, and the CPU spends nearly all its time waiting.

## Port addressing and the device-host link

**Isolated addressing** gives I/O ports a separate address space, and the CPU uses dedicated I/O instructions such as x86 `IN` and `OUT`. **Memory-mapped addressing** places ports in the memory address space, so ordinary load and store instructions reach them.

| Scheme | Address space | Instructions | Strength | Weakness |
| --- | --- | --- | --- | --- |
| Isolated | Separate; 8 bits give 256 ports | `IN`, `OUT` | No memory space consumed, simple decode | Needs special instructions |
| Memory-mapped | Shared with memory | `LOAD`, `STORE` | General instructions and all addressing modes | Consumes memory addresses |

Port address width sets the number of accessible ports: 8 bits give $2^8=256$, and 16 bits give $2^{16}=65536$. With memory-mapped addressing and 20 address lines, the total space is 1 MB, and every port used is subtracted from memory.

Polling cost can be quantified. If one poll takes $c$ clock cycles, the device produces $R$ bytes per second, and the CPU runs at $f$, utilization is

$$U=\frac{R\cdot c}{f}$$

For a keyboard with $R=10$ B/s, $c=100$, and $f=1$ GHz, $U=10\times100/10^9=10^{-6}$, or 0.0001%, which is negligible. For a disk at $R=4$ MB/s, $U=4\times10^6\times100/10^9=0.4$, or 40%, so the CPU idles almost half the time. This is why fast devices need interrupts or DMA.

> [!NOTE]
> Interface buffering is not just temporary storage. It decouples a wide bus word from a narrow device byte stream, so the CPU need not wait for each bit and a speed mismatch does not drop data.

## Three common misconceptions

> [!MYTH] The I/O interface is the peripheral itself.
> The interface is the circuit between bus and device, handling decoding, buffering, status, and control. The peripheral performs the physical function. A disk drive and a SATA controller are different parts.

> [!MYTH] Memory-mapped I/O is always faster than isolated I/O.
> Memory mapping removes special I/O instructions and allows rich addressing modes, but every access still crosses the bus. Speed depends on the bus and device, not on the addressing scheme.

> [!MYTH] A port address is a memory address.
> Ports occupy memory addresses only under memory-mapped addressing. With isolated addressing, port numbers and memory addresses are two unrelated number spaces.

## Practice

> [!PRACTICE] 1 · Port count
> With isolated addressing, how many ports do 10 address bits reach, and how many do 16 bits reach?
>
> > [!ANSWER] Show answer
> > $2^{10}=1024$ ports, and $2^{16}=65{,}536$ ports.

> [!PRACTICE] 2 · Utilization
> A device runs at 2 MB/s, one poll takes 50 clock cycles, and the CPU is 2 GHz. What is polling utilization?
>
> > [!ANSWER] Show answer
> > $U=2\times10^6\times50/2\times10^9=0.05$, or 5%. Ten times the rate would consume half the CPU.

> [!PRACTICE] 3 · Choose a scheme
> A system with 16 address lines has its 64 KB of memory fully used but needs 16 I/O ports. Which addressing scheme fits?
>
> > [!ANSWER] Show answer
> > No memory addresses remain, so memory-mapped addressing has nothing to allocate. Use isolated addressing with a 4-bit port number, which covers 16 ports.

## Formal statement

An I/O system consists of I/O software, I/O hardware, and a bus. The software covers user libraries, device management, drivers, and interrupt handling; the hardware covers interfaces, controllers, peripherals, and the bus. An I/O interface performs address decoding and device selection, data buffering and format conversion, status reporting, and control commands with interrupt requests, and contains data, status, and control ports. Port addressing is either isolated, using dedicated I/O instructions and a separate address space, or memory-mapped, placing ports in memory and using ordinary load/store instructions. An $n$-bit port address reaches $2^n$ ports. Under program-controlled polling, if the device rate is $R$, one poll takes $c$ cycles, and the clock is $f$, CPU utilization is $U=Rc/f$.