---
slug: "series-def"
subject: "analysis"
unit: "u09"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "级数的收敛性"
subtitle: "无穷多项相加，先定义再谈和"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["series", "cauchy"]
prereq: ["cauchy"]
related: ["series", "posseries"]
---

## 本讲目标

学完这一讲，你能把“无穷多项相加”翻译成部分和数列的极限，用 Cauchy 收敛原理判断敛散性，并说清为什么调和级数发散而 $\sum 1/n^2$ 收敛。

级数这一章的全部结论，都建立在同一个动作上：把无穷和换成数列。先把这个替换做干净，后面才有东西可谈。

## 三行回顾

- $\sum_{n=1}^{\infty}a_n$ 不是一个可以直接相加的对象，它是一个记号。
- 真正的定义对象是部分和 $S_n=a_1+\cdots+a_n$，它是普通数列。
- 级数收敛 $\iff$ 数列 $\{S_n\}$ 收敛。于是数列的所有工具都能搬过来。

## 部分和：把无穷和变成数列

设 $\{a_n\}$ 是数列，$S_n=\sum_{k=1}^{n}a_k$。若 $\lim_{n\to\infty}S_n=S$ 存在且有限，称级数**收敛**，和为 $S$；否则称**发散**。差 $r_n=S-S_n$ 叫第 $n$ 项后的余项。

等比级数是最完整的一个例子。取 $q=\tfrac12$：

$$
S_n=\sum_{k=1}^{n}\frac{1}{2^k}=1-\frac{1}{2^n}\ \longrightarrow\ 1 .
$$

一般地，$|q|<1$ 时 $\sum_{n=1}^{\infty}q^n=\dfrac{q}{1-q}$。$q=\tfrac12$ 给出 $1$。$|q|\ge1$ 时通项不趋于零，立刻发散。

> [!NOTE]
> 收敛与否只看 $\{S_n\}$ 有没有极限；和是多少是第二个问题。很多级数能判敛散，却写不出和，比如 $\sum 1/n^2=\pi^2/6$。

## 调和级数为什么发散

$\sum_{n\ge1}\frac1n$ 的通项趋于 $0$，但它发散。按 $2$ 的幂分组：

$$
S_{2^m}=1+\Big(\frac12\Big)+\Big(\frac13+\frac14\Big)+\cdots+\Big(\frac{1}{2^{m-1}+1}+\cdots+\frac{1}{2^m}\Big).
$$

第 $j$ 组有 $2^{j-1}$ 项，每项都不小于 $\frac{1}{2^{j}}$，所以整组不小于 $\frac12$。于是 $S_{2^m}\ge1+\frac{m}{2}\to+\infty$。

数值上：$S_4\approx2.083$，$S_8\approx2.718$，$S_{16}\approx3.381$，$S_{1024}\approx7.51$。要凑到 $20$，需要大约 $2^{38}$ 项。

## Cauchy 收敛原理与必要条件

级数收敛的 Cauchy 判据：对任意 $\varepsilon>0$，存在 $N$，当 $n>m>N$ 时

$$
\Big|\sum_{k=m+1}^{n}a_k\Big|<\varepsilon .
$$

取 $n=m+1$ 得到**必要条件** $a_n\to0$。它只是必要：$\frac1n\to0$ 而调和级数发散。所以“通项趋于零”只能用来否定收敛，不能用来肯定。

一个容易漏看的例子：$a_n=\sqrt{n+1}-\sqrt n=\frac{1}{\sqrt{n+1}+\sqrt n}$，通项趋于 $0$，但

$$
S_n=\sqrt{n+1}-1\ \longrightarrow\ +\infty ,
$$

发散。通项趋于零的速度是 $1/(2\sqrt n)$，不够快。

## 望远镜级数：能算出和的一类

若 $a_n=b_n-b_{n+1}$，则 $S_n=b_1-b_{n+1}$。于是级数的和等于 $b_1-\lim b_{n+1}$。

例：

$$
\frac{1}{n(n+1)}=\frac1n-\frac1{n+1},\qquad \sum_{n=1}^{\infty}\frac{1}{n(n+1)}=1-0=1 .
$$

部分和 $S_n=1-\frac{1}{n+1}$，$n=10$ 时已经是 $0.909$。这类级数是少数能写出精确和的，考试里出现的“求级数的和”多半是这个结构或几何级数。

## 三个常见误解

> [!MYTH] 通项趋于零，级数就收敛。
> 调和级数是反例：$1/n\to0$，部分和却像 $\ln n$ 一样增长。必要条件只能用于判定发散。

> [!MYTH] 加括号后收敛，原级数就收敛。
> $(1-1)+(1-1)+\cdots$ 的部分和恒为 $0$，收敛；而 $1-1+1-1+\cdots$ 的部分和在 $0,1$ 之间跳动，发散。加括号改变了部分和的取值方式，只在原级数已收敛时才安全。

> [!MYTH] 收敛级数的项可以任意调换次序。
> 只有绝对收敛的级数可以。调和级数变号后条件收敛，重排可以让它收敛到任意指定的实数，甚至发散。

## 练习

> [!PRACTICE] 1 · 望远镜
> 求 $\displaystyle\sum_{n=1}^{\infty}\frac{1}{4n^2-1}$。
>
> > [!ANSWER] 看答案
> > $\frac{1}{4n^2-1}=\frac12\Big(\frac{1}{2n-1}-\frac{1}{2n+1}\Big)$，部分和为 $\frac12\big(1-\frac{1}{2N+1}\big)$，极限为 $\frac12$。

> [!PRACTICE] 2 · 等比
> 求 $\displaystyle\sum_{n=1}^{\infty}\Big(-\frac12\Big)^n$。
>
> > [!ANSWER] 看答案
> > 首项 $-\frac12$，公比 $-\frac12$，和为 $\frac{-1/2}{1+1/2}=-\frac13$。注意不是 $+\frac13$。

> [!PRACTICE] 3 · 估计
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^2}$ 收敛，并给出一个上界。
>
> > [!ANSWER] 看答案
> > 对 $n\ge2$，$\frac{1}{n^2}\le\int_{n-1}^{n}\frac{\mathrm{d}x}{x^2}$，故部分和不超过 $1+\int_1^{\infty}x^{-2}\mathrm{d}x=2$。单调有界，收敛，且和小于 $2$（真值为 $\pi^2/6\approx1.645$）。

> [!PRACTICE] 4 · 必要条件的用法
> 判断 $\displaystyle\sum_{n=1}^{\infty}\big(\sqrt{n+1}-\sqrt n\big)$ 的敛散性。
>
> > [!ANSWER] 看答案
> > 通项等价于 $\frac{1}{2\sqrt n}\to0$，必要条件满足；但部分和为 $\sqrt{N+1}-1\to+\infty$，发散。这说明必要条件不充分。

## 严格表述

> [!FORMAL] 严格表述
> 设 $\{a_n\}$ 为实数列，$S_n=\sum_{k=1}^{n}a_k$。若 $\{S_n\}$ 收敛于有限数 $S$，称 $\sum_{n=1}^{\infty}a_n$ 收敛且和为 $S$。Cauchy 收敛原理：$\sum a_n$ 收敛当且仅当对任意 $\varepsilon>0$ 存在 $N$，使得当 $n>m\ge N$ 时 $\big|\sum_{k=m+1}^{n}a_k\big|<\varepsilon$。取 $n=m+1$ 得 $a_n\to0$，故通项不趋于零的级数必发散。收敛级数加括号后仍收敛且和不变；反之不成立。绝对收敛级数任意重排后和不变；条件收敛级数重排后可取到任意实数（Riemann 重排定理）。
