---
slug: "user-interface-syscall"
subject: "operating-systems"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 17 · Operating Systems · Mastery"
title: "User Interfaces and System Calls"
subtitle: "One read crosses into the kernel and comes back"
minutes: 15
meta: ["15 min read","Requires processes and interrupts","Mastery level"]
concepts: ["osif","process"]
prereq: ["process"]
related: ["interrupt","filesys"]
---

## What you will get

You will be able to separate the three interface types, trace a system call from trap to return, and compare three ways of passing arguments.

## Three lines back

- The user interface is what the OS exposes: commands for people, system calls for programs.
- A system call is the only legitimate door into the kernel, and that door is a trap instruction, not a function call.
- Kernel and user share address-space names but not privilege, so crossing switches stacks and permissions.

## Command and graphical interfaces

A **command interface** works in units of commands: an **online** interface reads, executes, and shows results; an **offline** interface writes a batch as a job control script that a scheduler interprets without intervention.

A **graphical user interface** changes the unit to icons and windows: desktop, windows, icons, menus, a pointer. It does not replace the command interface but wraps it in event handling: a click still becomes process creation or file opening.

| Interface | Unit | Typical form | Strength | Limit |
| --- | --- | --- | --- | --- |
| Online command | One command | Shell, terminal | Composable | Syntax must be learned |
| Offline command | One job | JCL, batch file | No intervention, high throughput | No immediate correction |
| Graphical | One event | Desktop, windows | Low learning cost | Poor for precise bulk work |
| System call | One service request | Library, assembly | Complete expressive power | Programming plus switch cost |

The first three are for people, the last for programs; all higher interfaces land on a system call.

## How a system call is implemented

A system call is not an ordinary function call: one jumps within a privilege level, the other changes processor state:

1. The program places the call number in an agreed register (`rax` on x86-64) and arguments in `rdi`, `rsi`, and so on.
2. It executes a trap instruction (`syscall`, older `int 0x80` on x86, `ecall` on RISC-V); hardware enters kernel mode and saves the return address and status word.
3. The kernel entry saves registers and indexes `sys_call_table[]` with the call number.
4. It validates arguments: user-space range, lengths, and handle permissions, copying with `copy_from_user` and `copy_to_user`.
5. The service routine runs and places its return value in a register.
6. State is restored, and a return instruction resumes after the trap.

The call number indexes the table. On x86-64 Linux `read` is 0, `write` 1, `open` 2, `close` 3, so `read(fd, buf, n)` loads registers, traps, takes entry 0, checks `fd` and `buf`, runs the file system and driver, and returns a byte count.

Arguments arrive in one of three ways:

| Method | Mechanism | Cost | Limit |
| --- | --- | --- | --- |
| Registers | Arguments in general registers | Fastest, no memory access | Few arguments fit |
| Memory block | Arguments packed in a struct, pointer passed | One dereference, any count | Kernel must validate and copy |
| Stack | Pushed on the user stack | Needs guarded user-stack access | Complex and architecture-specific |

Linux uses registers plus pointers: six arguments fit in registers, beyond that a pointer to a block.

## The price of a system call

The crossing is not free: registers are saved and restored, the kernel stack switched, TLB entries disturbed; cost is hundreds of nanoseconds to microseconds. At $1\ \mu\text{s}$ per call, writing 1 MB one byte at a time costs

$$10^6\times1\ \mu\text{s}=1\ \text{s}$$

With 4 KB per write, only $256$ calls are needed, about $256\ \mu\text{s}$. That justifies buffered I/O: **fewer crossings** beats a faster crossing.

> [!NOTE]
> A library function is not a system call: `printf` fills a user buffer and calls `write` only when full or on a newline; `malloc` grabs a region with `brk` or `mmap` and subdivides it in user space.

## Three common misconceptions

> [!MYTH] A system call is a function call whose body happens to live in the kernel.
> It involves privilege switching, stack switching, and address-space checks; calling it casually causes a performance cliff.

> [!MYTH] Graphical interfaces replaced command interfaces.
> Clicks still become system calls, and batch work still needs commands: the layers stack rather than replace.

> [!MYTH] More arguments means the stack is the right channel.
> Many arguments should travel as one pointer to a block: no register limit, one controlled copy, no reliance on the user stack.

## Practice

> [!PRACTICE] 1 · Compute
> A call costs 0.8 μs and transferring 1 MB takes 2 ms. Compare one byte per call with 8 KB per call.
>
> > [!ANSWER] Show answer
> > One byte: $10^6\times0.8\ \mu\text{s}=0.8$ s plus 2 ms, about 0.802 s. 8 KB: 128 calls, $102.4\ \mu\text{s}$ plus 2 ms, about 2.1 ms, a factor of 380.

> [!PRACTICE] 2 · Order
> Put these kernel steps of `read` in order: table lookup, argument validation, trap, return to user mode, driver call.
>
> > [!ANSWER] Show answer
> > Trap, table lookup, argument validation, driver call, return to user mode.

> [!PRACTICE] 3 · Decide
> Can a program read the disk without any system call?
>
> > [!ANSWER] Show answer
> > No. The disk is privileged hardware: user mode has no I/O rights and no device register mapping, so it must ask the kernel via `read`.

## Formal statement

User interfaces are online command, offline command, and graphical, all ultimately requesting kernel service through system calls. A call places a number and arguments in agreed registers and traps into kernel mode; the kernel saves state, indexes the table, validates arguments and addresses, runs the routine, restores state, and returns. Arguments travel in registers, through a block pointer, or on the user stack. Overhead is microseconds, so fewer calls matter more than cheaper calls.