---
slug: "funcseries-def"
subject: "analysis"
unit: "u10"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "函数项级数与一致收敛"
subtitle: "每个点都收敛，不等于整体同步"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["funcseries", "unifconv"]
prereq: ["series"]
related: ["unifconv", "powerseries"]
---

## 本讲目标

学完这一讲，你能区分逐点收敛与一致收敛，用上确界写出判别式，并解释为什么 $\sum x^n$ 在 $[0,1)$ 上逐点收敛却不一致收敛。

数项级数的每一项是数，函数项级数的每一项是函数。收敛性因此有了两个层次：逐点收敛只保证每个位置最终稳定，一致收敛要求所有位置同步稳定。

## 三行回顾

- 函数项级数 $\sum u_n(x)$ 的部分和 $S_N(x)$ 是一个函数，不是数。
- 逐点收敛：对每个固定的 $x$，数列 $S_N(x)$ 收敛，极限记为 $S(x)$。
- 一致收敛：$\sup_x|S_N(x)-S(x)|\to0$，即误差的上界与 $x$ 无关地趋于零。

## 逐点收敛：每点各管各的

设 $u_n$ 定义在区间 $I$ 上。若对每个 $x\in I$，数列 $\sum_{n=1}^{N}u_n(x)$ 收敛，就称级数在 $I$ 上**逐点收敛**，其和函数记为

$$
S(x)=\lim_{N\to\infty}\sum_{n=1}^{N}u_n(x).
$$

例：$\sum_{n=0}^{\infty}x^n$ 在 $(-1,1)$ 上逐点收敛。部分和为

$$
S_N(x)=\frac{1-x^{N+1}}{1-x},\qquad S(x)=\frac{1}{1-x}.
$$

误差是

$$
S(x)-S_N(x)=\frac{x^{N+1}}{1-x}.
$$

对每个固定的 $x$，$x^{N+1}\to0$，所以确实逐点收敛。但在 $x=1$ 附近这个误差可以任意大：$x=0.999$ 时 $\frac{0.999^{N+1}}{0.001}$，要让它小于 $0.01$ 需要 $N$ 超过 $6900$。

## 一致收敛：一个 N 管住所有点

称级数在 $I$ 上**一致收敛**于 $S$，若对任意 $\varepsilon>0$，存在只依赖于 $\varepsilon$ 的 $N$，当 $n>N$ 时

$$
|S_n(x)-S(x)|<\varepsilon\quad\text{对一切 }x\in I\text{ 成立}.
$$

换一种写法，把“所有点”压成一个数：

$$
\|S_n-S\|_\infty=\sup_{x\in I}|S_n(x)-S(x)|\ \longrightarrow\ 0 .
$$

逐点收敛允许 $N$ 依赖 $x$；一致收敛要求 $N$ 与 $x$ 无关。差别就在这一个依赖关系上。

## 用上确界判断

$\sum x^n$ 在 $[0,1)$ 上不一致收敛。因为

$$
\sup_{x\in[0,1)}\frac{x^{N+1}}{1-x}=+\infty ,
$$

上确界根本不有限，更谈不上趋于零。换成闭子区间 $[0,r]$（$r<1$），

$$
\sup_{x\in[0,r]}\frac{x^{N+1}}{1-x}\le\frac{r^{N+1}}{1-r}\ \longrightarrow\ 0,
$$

一致收敛成立。可见一致收敛是局部性质：离开边界就好，靠近边界就坏。

另一个更直观的例子：$f_n(x)=x^n$ 在 $[0,1]$ 上。逐点极限是 $S(x)=0$（$x<1$）、$S(1)=1$。而 $\sup|f_n-S|=1$ 对一切 $n$ 成立，不一致收敛。证据还有一条：每个 $f_n$ 连续，极限函数在 $1$ 处间断——连续函数的极限函数若不连续，收敛一定不一致。

> [!NOTE]
> 判否一致收敛最快的一招：看极限函数是否破坏了连续性。若 $S$ 在某点间断而每个 $S_n$ 连续，则不一致收敛。

## 三个常见误解

> [!MYTH] 每点都收敛，就是一致收敛。
> 逐点收敛的 $N$ 随 $x$ 变化，可能无处不大。$\sum x^n(1-x)$ 在 $[0,1]$ 上部分和为 $1-x^{N+1}$，极限是 $1$（$x<1$）、$0$（$x=1$），而 $\sup|S_N-S|=1$，不一致。

> [!MYTH] 只要每点的误差能小于 $\varepsilon$，就能找到统一的 $N$。
> 每点有各自的 $N(x,\varepsilon)$，$\sup_x N(x,\varepsilon)$ 可能取不到有限值。$f_n(x)=nx(1-x^2)^n$ 在 $[0,1]$ 上逐点趋于 $0$，但最大值在 $x=1/\sqrt{2n+1}$ 处，约为 $\sqrt{n/2}\,e^{-1/2}\to+\infty$，误差界根本不趋于零。

> [!MYTH] 一致收敛只是技术上的加强，用起来没区别。
> 它决定了极限能否与积分、求导交换。$\sum x^n$ 在 $[0,1)$ 上逐点收敛，但逐项积分得到的 $\sum\frac{1}{n+1}$ 发散，与 $\int_0^1\frac{\mathrm{d}x}{1-x}$ 的发散恰好对上，却无法用级数求和；而一致收敛的级数可以直接换序。

## 练习

> [!PRACTICE] 1 · 求上确界
> $f_n(x)=\dfrac{x}{1+nx^2}$ 在 $[0,1]$ 上是否一致收敛到 $0$？
>
> > [!ANSWER] 看答案
> > $f_n$ 的最大值在 $x=1/\sqrt n$ 处，值为 $\frac{1}{2\sqrt n}$（若 $1/\sqrt n\le1$）。$\sup|f_n|=\frac{1}{2\sqrt n}\to0$，一致收敛。

> [!PRACTICE] 2 · 判断否
> $f_n(x)=nx(1-x^2)^n$ 在 $[0,1]$ 上是否一致收敛？
>
> > [!ANSWER] 看答案
> > 逐点趋于 $0$。但最大值在 $x=1/\sqrt{2n+1}$，值为 $\frac{n}{\sqrt{2n+1}}\big(\frac{2n}{2n+1}\big)^n\sim\sqrt{n/2}\,e^{-1/2}\to+\infty$。不一致收敛。

> [!PRACTICE] 3 · 望远镜
> $\displaystyle\sum_{n=0}^{\infty}\big(x^n-x^{n+1}\big)$ 在 $[0,1]$ 上一致收敛吗？
>
> > [!ANSWER] 看答案
> > 部分和 $S_N=1-x^{N+1}$，极限为 $1$（$x<1$）、$0$（$x=1$）。$\sup|S_N-S|=\sup_{x<1}x^{N+1}=1$，不一致收敛。

> [!PRACTICE] 4 · 闭子区间
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{n}$ 在 $[0,\tfrac12]$ 上一致收敛。
>
> > [!ANSWER] 看答案
> > 余项 $|R_N(x)|\le\sum_{k>N}\big(\tfrac12\big)^k=\big(\tfrac12\big)^{N}$，与 $x$ 无关且趋于 $0$，故一致收敛。

## 严格表述

> [!FORMAL] 严格表述
> 设 $u_n$ 与 $S$ 定义在 $I$ 上，$S_n=\sum_{k=1}^{n}u_k$。逐点收敛：对每个 $x\in I$ 与每个 $\varepsilon>0$，存在 $N(x,\varepsilon)$，当 $n>N$ 时 $|S_n(x)-S(x)|<\varepsilon$。一致收敛：对每个 $\varepsilon>0$ 存在 $N(\varepsilon)$，当 $n>N$ 时对一切 $x\in I$ 都有 $|S_n(x)-S(x)|<\varepsilon$，等价于 $\sup_{x\in I}|S_n(x)-S(x)|\to0$。必要条件（Cauchy 形式）：对任意 $\varepsilon>0$ 存在 $N$，当 $n>m>N$ 时 $\sup_{x\in I}\big|\sum_{k=m+1}^{n}u_k(x)\big|<\varepsilon$。一致收敛蕴含逐点收敛，反之不成立。
