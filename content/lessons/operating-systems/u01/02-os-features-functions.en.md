---
slug: "os-features-functions"
subject: "operating-systems"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Operating Systems · Mastery"
title: "Core Properties and Main Functions"
subtitle: "Concurrency, sharing, virtuality, asynchrony, and the kernel-mode threshold"
minutes: 15
meta: ["15 min read","Requires an introduction to operating systems","Mastery level"]
concepts: ["osintro","osif"]
prereq: ["osintro"]
related: ["process","interrupt"]
---

## What you will get

By the end of this lecture you can summarize the behaviour of an operating system in four words, list what each of the four management subsystems owns, and explain what happens during a system call and what it costs.

## Three lines back

- Concurrency means simultaneous at the macro scale and alternating at the micro scale; parallelism means genuinely simultaneous. They are not synonyms.
- Sharing splits into mutually exclusive sharing, which creates critical resources, and simultaneous sharing, which allows concurrent readers.
- Virtuality turns one physical resource into several logical ones; asynchrony is the resulting unpredictability of progress.

## The four defining properties

**Concurrency** means two or more events occur within the same time interval. On a single processor, processes advance together at the macro scale but alternate at the micro scale. **Parallelism** requires events to occur at the same instant, which demands multiple processors or dedicated units. The difference is quantifiable: four processes needing 100 ms of CPU each finish in $4\times100=400$ ms concurrently on one core, with only one running at any instant, but in about $\max(200,200)=200$ ms in parallel on two cores.

**Sharing** means resources are used jointly by concurrent processes. A mutually exclusive resource, such as a printer or a shared counter, admits one process at a time. A simultaneously shared resource, such as a read-only code segment or a data file opened for reading, admits many.

**Virtuality** turns one physical entity into several logical ones. Time slicing creates virtual processors; paging with replacement creates virtual memory. If the logical address space is $2^{32}=4$ GB while physical memory is 256 MB, virtual memory multiplies the usable space by $4096/256=16$.

**Asynchrony** means processes advance at unpredictable speeds. It is not a defect but a consequence of concurrency and sharing; the operating system must guarantee identical results regardless of the interleaving.

| Property | One-line definition | Depends on | Counterexample |
| --- | --- | --- | --- |
| Concurrency | Alternating progress within one interval | Several programs, timer interrupts | Uniprogrammed batch |
| Sharing | Joint use of resources | Mutual exclusion, synchronization | Exclusive device left unlocked |
| Virtuality | One physical resource, many logical views | Time slicing, paging, replacement | A machine with no MMU |
| Asynchrony | Unpredictable speed of progress | Concurrency plus sharing | Single-task environment |

## Four management subsystems and the user interface

| Subsystem | Concrete work | Key data structures |
| --- | --- | --- |
| Processor management | Process control, synchronization, communication, scheduling | PCB, ready queue |
| Memory management | Allocation and release, address mapping, extension, protection | Page table, segment table |
| Device management | Buffering, allocation, drivers, virtual devices | DCT, SDT, buffer pool |
| File management | Space management, directories, read and write, access control | FCB, directory entry, inode |

All four record who holds what, keep allocation and release consistent, and stop processes from damaging each other; only the resource granularity differs.

The user interface comes in three forms: command, program (system calls), and graphical. Only the program interface can be called directly by a program.

## System calls: the only front door into the kernel

The CPU has at least two privilege levels. User mode may execute only non-privileged instructions; kernel mode may execute everything, including changing page tables, masking interrupts, and touching device registers. To read a file, a user program must ask the kernel through a system call.

A typical `read(fd, buf, 4096)` walks this path: the program loads the call number and arguments into agreed registers, executes a trap instruction that raises a software interrupt, the hardware switches to kernel mode and jumps through the interrupt vector, the kernel validates the arguments and the descriptor, starts the device transfer, copies the data back into the user buffer, and returns.

Each entry and exit includes one mode switch. With a 0.5 μs switch and 1 μs for validation and copying, the fixed cost of one call is roughly

$$t_{\text{syscall}}=2\times0.5+1=2\ \mu\text{s}$$

Reading one byte amortizes this to $2\ \mu\text{s}$ per byte; reading 4 KB brings it to $2\ \mu\text{s}/4096\approx0.49$ ns, a factor of 4096. That is why library functions buffer and batch their reads.

> [!NOTE]
> A system call is not a function call. A function call only changes the stack frame; a system call switches privilege level, switches stacks, and may switch address spaces.

## Three common misconceptions

> [!MYTH] Concurrency is parallelism.
> Concurrency alternates within one interval and works on a single core. Parallelism requires simultaneous execution and therefore multiple execution units.

> [!MYTH] Fewer system calls are always better.
> What must shrink is the one-call-per-byte pattern, not the call itself. Bulk transfer cuts both the number of traps and the device idle time.

> [!MYTH] A user program can touch device registers directly.
> It cannot. Device registers are privileged resources reached only by a driver in kernel mode; otherwise any process could wreck I/O.

## Practice

> [!PRACTICE] 1 · Compute
> Six processes need 80 ms of CPU each. Find the total time with concurrency on one core and with parallelism on three cores, ignoring switch overhead.
>
> > [!ANSWER] Show answer
> > One core: $6\times80=480$ ms. Three cores: two processes per core, $2\times80=160$ ms.

> [!PRACTICE] 2 · Decide
> Does asynchrony imply unreliable results?
>
> > [!ANSWER] Show answer
> > No. Asynchrony only says the speed of progress is unknown. With correct synchronization, every legal interleaving yields the same result.

## Formal statement

Concurrency means two or more events occur within the same time interval; parallelism means they occur at the same instant. Sharing means resources are used jointly by concurrently executing processes and is classified as mutually exclusive or simultaneous according to whether overlapping access is permitted. Virtuality means turning one physical entity into several logical counterparts. Asynchrony means processes advance independently at unpredictable speeds. A system call is the only legal entry through which a user-mode program requests kernel service, and its execution always involves at least one transition from user mode to kernel mode.