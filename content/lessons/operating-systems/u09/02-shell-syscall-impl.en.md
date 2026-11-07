---
slug: "shell-syscall-impl"
subject: "operating-systems"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 18 · Operating Systems · Mastery"
title: "Shells and How System Calls Are Implemented"
subtitle: "One fork, one exec, one wait: then the command is really done"
minutes: 16
meta: ["16 min read","Requires system calls","Mastery level"]
concepts: ["osif","process"]
prereq: ["osif"]
related: ["filesys","process"]
---

## What you will get

You will be able to write a shell loop in pseudocode, explain how fork, exec, and wait cooperate, and describe redirection and pipes.

## Three lines back

- A shell is an ordinary user program that does four things: read, parse, fork, wait.
- fork copies an address space and returns twice; exec replaces it without returning on success; wait reclaims the child and its status.
- Redirection and pipes do not change programs, only what entries in the descriptor table point to.

## The shell loop

A shell has no privilege; it hands work to the kernel via calls:

```
for (;;) {
    print_prompt("$ ");
    if (read_line(buf, sizeof buf) <= 0) break;   // Ctrl-D or read error
    argv = parse(buf);
    if (is_builtin(argv[0])) {
        run_builtin(argv);
        continue;
    }
    pid = fork();
    if (pid == 0) {                               // child branch
        execvp(argv[0], argv);                    // returns only on failure
        _exit(127);
    } else if (pid > 0) {
        waitpid(pid, &status, 0);
        last_status = WEXITSTATUS(status);
    }
}
```

`cd` must be built in because the working directory is a process attribute: `chdir` in a child leaves the shell untouched, so built-ins are a semantic requirement, not a style choice.

## How fork, exec, and wait cooperate

| Call | Effect | Return value | Detail that matters |
| --- | --- | --- | --- |
| `fork` | Duplicate the current process | 0 in the child, child PID in the parent, −1 on failure | Copy-on-write; page tables start shared |
| `exec` | Replace the image with a new program | Never returns on success, −1 on failure | PID unchanged, open descriptors kept |
| `wait` / `waitpid` | Wait for exit and reclaim | PID of the reaped child | Retrieves exit code, frees the zombie |

fork returns twice: the same code runs in both processes, and the return value selects the branch. Copy-on-write shares read-only physical pages and copies one on first write, so fork cost depends weakly on address-space size and strongly on pages later written.

After a successful exec the code, data, and stack are replaced, but PID, open descriptors, and working directory stay — which makes redirection possible.

A child that exits first becomes a zombie holding its exit status until the parent reads it. A parent that never waits, spawning 100 children per second with about 1 KB per leftover entry, accumulates

$$100\times3600\times1\ \text{KB}=360\ \text{MB}$$

per hour, until memory runs out.

## Redirection and pipes

Redirection rewrites entries 0, 1, and 2 of the descriptor table without touching the program. For `ls > out.txt` the shell opens `out.txt` for writing as fd 3, calls `dup2(3, 1)` so descriptor 1 now names that file, closes 3, then forks and execs. The child inherits the table, so `ls` output lands in the file.

A pipe created with `pipe(fd)` has a read end `fd[0]` and a write end `fd[1]`; for `ls | wc -l` the shell forks twice:

| Step | Process A (`ls`) | Process B (`wc`) | Parent shell |
| --- | --- | --- | --- |
| 1 | — | — | `pipe(fd)` yields `fd[0]`, `fd[1]` |
| 2 | fork | fork | Saves both child PIDs |
| 3 | `dup2(fd[1], 1)` | `dup2(fd[0], 0)` | Closes its own `fd[0]`, `fd[1]` |
| 4 | Closes `fd[0]`, `fd[1]` | Closes `fd[0]`, `fd[1]` | `waitpid` twice |
| 5 | `execvp("ls")` | `execvp("wc")` | Collects exit statuses |

The trick is steps 3 and 4: each child attaches a pipe end to standard input or output, then closes the originals. If the shell keeps its own write end open, the read end never sees end-of-file and the command hangs — the classic shell bug.

> [!NOTE]
> A file descriptor is an index into a per-process array; `dup2` repoints one slot and copies nothing, so redirection, pipes, and `2>&1` are one operation.

## Three common misconceptions

> [!MYTH] The shell is part of the kernel and runs in kernel mode.
> A shell is an ordinary user-mode program at the same privilege level as its commands; it "manages" processes only because it can call fork, exec, and wait.

> [!MYTH] fork copies the entire address space immediately.
> Copy-on-write shares physical pages and copies one on first write, so fork is cheap and the cost deferred.

> [!MYTH] After exec you have a new process.
> exec creates nothing; it replaces the image, so PID, parent, open files, and working directory persist, letting the shell set up redirection first.

## Practice

> [!PRACTICE] 1 · Trace
> A parent has PID 4200. After `fork()` the child calls `execvp("date")`. What PID does `date` have, and what does `waitpid` return?
>
> > [!ANSWER] Show answer
> > The PID stays 4201; exec does not change it. `waitpid` returns 4201 with `date`'s exit status in `status`.

> [!PRACTICE] 2 · Debug
> A hand-written shell hangs after `ls | wc -l`. Why?
>
> > [!ANSWER] Show answer
> > The parent never closed its copy of the write end, so `wc` never sees EOF; it should close `fd[0]` and `fd[1]` right after forking.

> [!PRACTICE] 3 · Compute
> An external command costs 2 ms in fork, exec, and wait; a built-in 0.01 ms. Compare 5000 of each.
>
> > [!ANSWER] Show answer
> > External: $5000\times2\ \text{ms}=10$ s; built-ins: $5000\times0.01\ \text{ms}=0.05$ s, about 200 times apart.

## Formal statement

A shell is a user-mode program whose loop reads and parses commands and checks for built-ins; for an external command it calls `fork`, the child calls `exec` to replace its image, and the parent calls `wait` to reclaim. `fork` returns twice and shares memory copy-on-write, `exec` preserves PID and open descriptors, and `wait` reclaims zombies and returns exit status. Redirection rewrites descriptors 0, 1, and 2 with `dup2`; a pipeline uses `pipe` plus two forks, and the parent must close its own pipe ends.