---
slug: "unifconv-props"
subject: "analysis"
unit: "u10"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "一致收敛级数的性质"
subtitle: "什么时候可以把极限搬进积分号"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["unifconv"]
prereq: ["unifconv"]
related: ["unifconv", "fourier"]
---

## 本讲目标

学完这一讲，你能判断一个函数项级数能否逐项求极限、逐项积分、逐项求导，并能为每条性质举出一个“去掉一致收敛就失效”的反例。

一致收敛之所以重要，全在这一讲：它是三条交换法则的通行证。没有它，极限与积分、求导都不能随便换位置。

## 三行回顾

- 若每项连续且级数一致收敛，则和函数连续。
- 若每项连续且级数一致收敛，则可以在有限区间上逐项积分。
- 逐项求导的要求更高：不仅级数要收敛，而且**求导后的级数**要一致收敛。

## 连续性：极限不跳跃

设 $u_n$ 在 $I$ 上连续，$\sum u_n$ 在 $I$ 上一致收敛于 $S$，则 $S$ 在 $I$ 上连续。即

$$
\lim_{x\to x_0}\sum_{n=1}^{\infty}u_n(x)=\sum_{n=1}^{\infty}\lim_{x\to x_0}u_n(x).
$$

证明用 $\varepsilon/3$ 三段拆分：先取 $N$ 使尾项一致小于 $\varepsilon/3$，再用有限和 $S_N$ 的连续性控制中间段。

反例说明不能省：$f_n(x)=x^n$ 在 $[0,1]$ 上连续，逐点极限在 $1$ 处为 $1$、其余为 $0$，不连续。这也直接证明了收敛不一致。

## 逐项积分

设 $u_n$ 在 $[a,b]$ 上连续，$\sum u_n$ 在 $[a,b]$ 上一致收敛于 $S$，则 $S$ 可积且

$$
\int_a^b S(x)\,\mathrm{d}x=\sum_{n=1}^{\infty}\int_a^b u_n(x)\,\mathrm{d}x .
$$

估计很直接：

$$
\Big|\int_a^b S-\int_a^b S_N\Big|\le\int_a^b|S-S_N|\le (b-a)\sup_{x\in[a,b]}|S-S_N|\to0 .
$$

注意必须有界区间。在 $[0,+\infty)$ 上即使一致收敛，也不能直接换序，因为 $\int_0^{\infty}$ 本身还要取极限。

反例：$f_n(x)=nx(1-x^2)^n$ 在 $[0,1]$ 上。逐点极限是 $0$，但

$$
\int_0^1 nx(1-x^2)^n\,\mathrm{d}x=\frac{n}{2(n+1)}\ \longrightarrow\ \frac12\ne\int_0^1 0\,\mathrm{d}x .
$$

用换元 $u=1-x^2$ 可算出上式。第 $n$ 个函数的“质量”集中在 $x\approx1/\sqrt n$ 附近，越来越窄但高度越来越大，积分不趋于零。这正是上一讲练习里那个 $\sup\to\infty$ 的函数。

## 逐项求导

设 $u_n$ 在 $[a,b]$ 上有连续导数，$\sum u_n(x_0)$ 在某个 $x_0\in[a,b]$ 收敛，且 $\sum u_n'(x)$ 在 $[a,b]$ 上一致收敛，则 $\sum u_n$ 在 $[a,b]$ 上一致收敛，且

$$
\Big(\sum_{n=1}^{\infty}u_n(x)\Big)'=\sum_{n=1}^{\infty}u_n'(x).
$$

三个条件缺一不可，尤其是第三条：原级数一致收敛完全不够。

反例：$f_n(x)=\frac{\sin nx}{n}$ 在 $\mathbb{R}$ 上一致收敛到 $0$（因为 $|f_n|\le\frac1n$）。但 $f_n'(x)=\cos nx$，数列 $\cos nx$ 对 $x\ne0$ 根本不趋于 $0$，不能逐项求导。和函数在 $x=0$ 附近的行为也确实不是“导数为 0”那么简单。

> [!NOTE]
> 求导是唯一需要“对导数级数再判一次”的运算。积分只需原级数一致收敛，求导不行。

## 三条性质的条件对照

| 性质 | 对原级数 | 额外要求 | 结论 |
| --- | --- | --- | --- |
| 连续性 | 一致收敛 | 每项连续 | 和函数连续 |
| 逐项积分 | 一致收敛 | 区间有界，每项连续 | 积分可换序 |
| 逐项求导 | 至少一点收敛 | 导数级数一致收敛 | 导数可换序 |

三行放在一起看：积分最宽松（只要一致收敛），求导最严格（要重新判一次）。这也是为什么很多教材先用一致收敛证积分，再用积分去证求导。

## 三个常见误解

> [!MYTH] 级数逐点收敛且每项连续，就可以逐项积分。
> $f_n=nx(1-x^2)^n$ 逐点趋于 $0$，积分却趋于 $\frac12$。逐点收敛不控制积分的极限。

> [!MYTH] 只要原级数一致收敛，就可以逐项求导。
> $f_n=\frac{\sin nx}{n}$ 一致收敛到 $0$，但 $f_n'=\cos nx$ 不收敛到 $0$。逐项求导要求导数级数本身一致收敛。

> [!MYTH] 连续函数列的逐点极限一定连续。
> $x^n$ 在 $[0,1]$ 上每项连续，极限在 $1$ 处间断。连续性只有在一致收敛时才被继承。

## 练习

> [!PRACTICE] 1 · 积分与极限
> 求 $\displaystyle\lim_{n\to\infty}\int_0^1\frac{x^n}{1+x}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > $\big|\frac{x^n}{1+x}\big|\le x^n$，故积分不超过 $\int_0^1x^n\mathrm{d}x=\frac{1}{n+1}\to0$。极限为 $0$。

> [!PRACTICE] 2 · 判断否
> $f_n(x)=\dfrac{nx}{1+n^2x^2}$ 在 $[0,1]$ 上一致收敛吗？$\int_0^1f_n$ 的极限是多少？
>
> > [!ANSWER] 看答案
> > 逐点趋于 $0$，但最大值在 $x=\frac1n$ 处等于 $\frac12$，不一致收敛。积分 $\int_0^1f_n=\frac{\ln(1+n^2)}{2n}\to0$，极限与逐点极限的积分相同，但这只是巧合，不能由定理保证。

> [!PRACTICE] 3 · 逐项求导
> 由 $\displaystyle\sum_{n=0}^{\infty}\frac{x^n}{n!}=e^x$ 求 $\displaystyle\sum_{n=1}^{\infty}\frac{nx^{n-1}}{n!}$。
>
> > [!ANSWER] 看答案
> > 在任意 $[-r,r]$ 上，导数级数 $\sum\frac{n x^{n-1}}{n!}=\sum\frac{x^{n-1}}{(n-1)!}$ 一致收敛（优级数 $\frac{r^{n-1}}{(n-1)!}$），故可逐项求导，结果为 $e^x$。

> [!PRACTICE] 4 · 逐项积分
> 求 $\displaystyle\int_0^1\sum_{n=1}^{\infty}\frac{x^n}{n^2}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > $\sum\frac{x^n}{n^2}$ 在 $[0,1]$ 上由优级数 $\sum\frac{1}{n^2}$ 一致收敛，可逐项积分：$\sum\frac{1}{n^2(n+1)}$。由 $\frac{1}{n^2(n+1)}=-\frac1n+\frac1{n^2}+\frac1{n+1}$，望远镜部分为 $-1$，故值为 $\frac{\pi^2}{6}-1\approx0.6449$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $u_n\in C(I)$，$\sum u_n$ 在 $I$ 上一致收敛于 $S$。则 $S\in C(I)$。若 $I=[a,b]$，则 $S\in R[a,b]$ 且 $\int_a^bS=\sum\int_a^bu_n$。求导：若 $u_n\in C^1[a,b]$，$\sum u_n$ 在某点 $x_0$ 收敛，且 $\sum u_n'$ 在 $[a,b]$ 上一致收敛，则 $S\in C^1[a,b]$ 且 $S'=\sum u_n'$。证明：令 $V=\sum u_n'$，则 $u_n(x)=u_n(x_0)+\int_{x_0}^{x}u_n'(t)\mathrm{d}t$，对部分和用积分中值估计，再令 $n\to\infty$，得 $S(x)=S(x_0)+\int_{x_0}^{x}V(t)\mathrm{d}t$，由微积分基本定理得 $S'=V$。
