---
slug: "shell-syscall-impl"
subject: "operating-systems"
unit: "u09"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 18 讲 · 计算机操作系统 · 专业模式"
title: "Shell 与系统调用的实现"
subtitle: "一次 fork、一次 exec、一次 wait，命令才真正跑完"
minutes: 16
meta: ["阅读 16 分钟","需要 系统调用","掌握级"]
concepts: ["osif","process"]
prereq: ["osif"]
related: ["filesys","process"]
---

## 本讲目标

学完这一讲，你能写出 shell 主循环的伪代码，说明 fork、exec、wait 如何配合跑完一条命令，并讲清重定向与管道在文件描述符层面的实现。

## 三行回顾

- shell 是一个普通的用户态程序，它只做四件事：读、解析、创建进程、等待。
- fork 复制地址空间并返回两次，exec 替换地址空间且成功不返回，wait 回收子进程并取回退出码。
- 重定向与管道不改程序，只改文件描述符表的指向。

## shell 主循环

shell 没有特权，它靠系统调用把工作转交给内核。主循环的逻辑是：

```
for (;;) {
    print_prompt("$ ");
    if (read_line(buf, sizeof buf) <= 0) break;   // Ctrl-D 或读错误
    argv = parse(buf);                            // 分词、展开、去引号
    if (argv[0] == NULL) continue;
    if (is_builtin(argv[0])) {                    // cd、exit、export
        run_builtin(argv);
        continue;
    }
    pid = fork();
    if (pid == 0) {                               // 子进程分支
        execvp(argv[0], argv);                    // 成功则不返回
        perror(argv[0]);
        _exit(127);
    } else if (pid > 0) {                         // 父进程分支
        waitpid(pid, &status, 0);
        last_status = WEXITSTATUS(status);
    } else {
        perror("fork");
    }
}
```

`cd` 必须是内建命令，因为工作目录是进程属性：若在子进程里 `chdir`，改变的只是子进程，父 shell 不受影响。`exit` 同理。所以内建命令不是设计偏好，而是语义要求。

## fork、exec 与 wait 的配合

| 系统调用 | 作用 | 返回值 | 关键细节 |
| --- | --- | --- | --- |
| `fork` | 复制当前进程 | 子进程返回 0，父进程返回子 PID，失败返回 −1 | 地址空间写时复制，页表初值共享 |
| `exec` | 用新程序替换当前映像 | 成功不返回，失败返回 −1 | PID 不变，打开的文件描述符默认保留 |
| `wait` / `waitpid` | 等待子进程结束并回收 | 返回被回收子进程的 PID | 取退出码，释放僵尸项 |

`fork` 返回两次是理解 shell 的关键：同一段代码在父进程与子进程中各执行一次，靠返回值区分分支。现代内核用写时复制（copy-on-write）实现 fork，父子共享物理页并全部标为只读，任一方写入才触发缺页并复制该页。因此 fork 的代价与地址空间大小弱相关，而与之后写入的页数强相关。

`exec` 成功后原程序的代码段、数据段、堆栈全部被替换，但 PID、已打开的文件描述符、当前工作目录保持不变。打开的文件描述符被保留这一点，正是重定向能生效的基础。

`wait` 不只是“等”，它还负责回收。子进程先于父进程退出时进入僵尸状态，保留退出码等待父进程读取。若父进程从不 wait，每秒创建 100 个子进程、每个残留项约 1 KB，一小时就积累

$$100\times3600\times1\ \text{KB}=360\ \text{MB}$$

内核内存被僵尸项占满后无法再创建进程。父进程先于子进程退出则相反，子进程被 init 或 subreaper 收养，不会变成僵尸。

## 重定向与管道的实现

重定向不改变程序，只改变文件描述符表的第 0、1、2 项。`ls > out.txt` 的执行顺序是：shell 以写方式打开 `out.txt` 得到 fd 3，`dup2(3, 1)` 让 1 号描述符指向该文件，关闭 3，然后 fork 与 exec。子进程继承这套描述符表，`ls` 往标准输出写的内容就进了文件。

管道由 `pipe(fd)` 建立，`fd[0]` 读端、`fd[1]` 写端。执行 `ls | wc -l` 时，shell 创建管道后 fork 两次：

| 步骤 | 进程 A（ls） | 进程 B（wc） | 父 shell |
| --- | --- | --- | --- |
| 1 | — | — | `pipe(fd)` 得 `fd[0]`、`fd[1]` |
| 2 | fork | fork | 保存两个子 PID |
| 3 | `dup2(fd[1], 1)` | `dup2(fd[0], 0)` | 关闭自己的 `fd[0]`、`fd[1]` |
| 4 | 关闭 `fd[0]`、`fd[1]` | 关闭 `fd[0]`、`fd[1]` | `waitpid` 两次 |
| 5 | `execvp("ls")` | `execvp("wc")` | 收集退出码 |

关键是第 3、4 步：每个子进程把管道一端接到标准输入或输出，再关闭原始的描述符。若父 shell 不关闭自己持有的写端，`wc` 的读端就永远等不到文件结束符，命令会挂住——这是手写 shell 最常见的 bug。

> [!NOTE]
> 文件描述符只是进程内数组的下标，`dup2` 改变的是数组某一项的指向，不复制文件本身。理解这一点，重定向、管道、`2>&1` 都变成同一件事。

## 三个常见误解

> [!MYTH] shell 是操作系统的一部分，运行在内核态。
> shell 是普通用户态程序，和它启动的命令处于同一特权级。它之所以能“管理”进程，只是因为能调用 fork、exec、wait。

> [!MYTH] fork 会立刻复制整个地址空间。
> 现代实现使用写时复制，父子共享物理页，只有写入才复制单页。fork 本身很便宜，代价推迟到写入时支付。

> [!MYTH] exec 之后是一个新进程。
> exec 不创建进程，只替换映像。PID、父进程、打开的文件、工作目录都保持不变，这也是 shell 能在 exec 前布置好重定向的原因。

## 练习

> [!PRACTICE] 1 · 跟踪
> 父进程 PID 为 4200，执行 `fork()` 后子进程执行 `execvp("date")`。子进程运行 `date` 时的 PID 是多少？`waitpid` 返回什么？
>
> > [!ANSWER] 看答案
> > PID 仍是 4201，exec 不改变 PID。父进程的 `waitpid` 返回 4201，并在 `status` 中带回 `date` 的退出码。

> [!PRACTICE] 2 · 排错
> 手写 shell 执行 `ls | wc -l` 后一直不返回，最可能的原因是什么？
>
> > [!ANSWER] 看答案
> > 父进程没有关闭自己持有的管道写端，`wc` 读端因此收不到 EOF。父进程应在 fork 后立即关闭 `fd[0]` 与 `fd[1]`。

> [!PRACTICE] 3 · 计算
> 每次外部命令的 fork、exec、wait 合计 2 ms，内建命令 0.01 ms。执行 5000 条外部命令与 5000 条内建命令，耗时相差多少？
>
> > [!ANSWER] 看答案
> > 外部命令 $5000\times2\ \text{ms}=10$ s；内建命令 $5000\times0.01\ \text{ms}=0.05$ s。相差约 200 倍，这就是把高频操作做成内建命令的理由。

## 严格表述

shell 是用户态程序，其主循环反复读取命令行、解析参数、判断是否为内建命令；对外部命令先 `fork` 创建子进程，子进程调用 `exec` 替换映像，父进程调用 `wait` 等待并回收。`fork` 返回两次并以写时复制共享地址空间，`exec` 成功不返回且保持 PID 与文件描述符不变，`wait` 回收僵尸并取出退出码。重定向通过 `dup2` 改写描述符 0、1、2 的指向实现，管道通过 `pipe` 加两次 fork 与 `dup2` 实现，父进程必须关闭自己持有的管道端以避免读端等不到 EOF。