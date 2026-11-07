---
slug: "improper-tests"
subject: "analysis"
unit: "u08"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "反常积分的判别法"
subtitle: "不比积分，只比阶"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["impropint", "posseries"]
prereq: ["impropint"]
related: ["posseries", "paramint"]
---

## 本讲目标

学完这一讲，你能看到一个新的反常积分，在三步之内决定它的敛散性：先看瑕点类型，再估被积函数的阶，最后选一个已知收敛的积分作参照。

大部分反常积分算不出原函数，所以判断敛散性不能靠“算出来看”。判别法的作用就是：不解方程，只比速度。

## 三行回顾

- $\int_1^{+\infty}x^{-p}\mathrm{d}x$ 在 $p>1$ 时收敛，$\int_0^1x^{-p}\mathrm{d}x$ 在 $p<1$ 时收敛。
- 只要把待判积分夹在两个已知积分之间，或者证明它与某个 $p$ 积分同阶，就能判。
- 变号函数要单独处理：先看绝对值收不收敛，再谈条件收敛。

## 比较判别法：只看阶

设 $0\le f(x)\le g(x)$ 对一切充分大的 $x$ 成立。

- 若 $\int_a^{+\infty}g$ 收敛，则 $\int_a^{+\infty}f$ 收敛。
- 若 $\int_a^{+\infty}f$ 发散，则 $\int_a^{+\infty}g$ 发散。

理由只有一句：$\int f$ 关于上限单调递增，被一个收敛的积分控制住就必须有界。

例：$\displaystyle\int_1^{+\infty}\frac{x+1}{x^3+2}\mathrm{d}x$。当 $x$ 很大时分子像 $x$，分母像 $x^3$，整体像 $x^{-2}$。严格写：

$$
\frac{x+1}{x^3+2}\Big/\frac{1}{x^2}=\frac{x^3+x^2}{x^3+2}\ \longrightarrow\ 1 .
$$

比值有正的有限极限，说明两者同阶。这个积分收敛，而且不需要知道它的值。

## 极限比较的三种情形

设 $f,g>0$，$\lim_{x\to+\infty}f(x)/g(x)=L$（$L$ 可以是 $0$ 或 $+\infty$）。

| $L$ | 结论 | 例 |
| --- | --- | --- |
| $0<L<+\infty$ | $f$ 与 $g$ 同敛散 | $\frac{1}{x^2+3x}$ 对 $\frac1{x^2}$ |
| $L=0$ | $g$ 收敛 $\Rightarrow$ $f$ 收敛 | $\frac{1}{x^3e^{x}}$ 对 $\frac1{x^3}$ |
| $L=+\infty$ | $g$ 发散 $\Rightarrow$ $f$ 发散 | $\frac{1}{\sqrt{x}\ln x}$ 对 $\frac1{\sqrt x}$ |

第三行常被用错：$L=+\infty$ 只保证“$f$ 比 $g$ 大得多”，所以 $g$ 发散时 $f$ 才跟着发散；此时若 $g$ 收敛，$f$ 的敛散性无从判断。同理，$L=0$ 时 $g$ 发散也给不出任何结论。

> [!NOTE]
> 记忆方式：$L=\infty$ 表示 $f$ 更“重”，坏消息（发散）可以从 $g$ 传给 $f$；$L=0$ 表示 $f$ 更“轻”，好消息（收敛）可以从 $g$ 传给 $f$。

## 绝对收敛与条件收敛

若 $\int_a^{+\infty}|f|$ 收敛，称 $\int_a^{+\infty}f$ **绝对收敛**；若 $\int_a^{+\infty}f$ 收敛而 $\int_a^{+\infty}|f|$ 发散，称**条件收敛**。

绝对收敛必收敛：由 Cauchy 判据与 $\big|\int_{A_1}^{A_2}f\big|\le\int_{A_1}^{A_2}|f|$ 立得。

反过来的经典例子是 $\displaystyle\int_1^{+\infty}\frac{\sin x}{x}\mathrm{d}x$：它收敛（上一讲用分部积分证过），但

$$
\frac{|\sin x|}{x}\ge\frac{\sin^2 x}{x}=\frac{1}{2x}-\frac{\cos 2x}{2x}.
$$

右端第一项的积分是 $\tfrac12\ln A\to+\infty$，第二项的积分收敛，所以 $\int_1^{+\infty}\frac{\sin^2x}{x}$ 发散，从而 $\int\frac{|\sin x|}{x}$ 发散。这就是条件收敛：靠正负抵消换来的收敛，一取绝对值就没了。

## Dirichlet 与 Abel 判别法

**Dirichlet（积分版）**：设 $F(A)=\int_a^A f$ 有界，$g$ 单调且 $g(x)\to0$（$x\to+\infty$），则 $\int_a^{+\infty}fg$ 收敛。

**Abel（积分版）**：设 $\int_a^{+\infty}f$ 收敛，$g$ 单调有界，则 $\int_a^{+\infty}fg$ 收敛。

核心工具是第二中值定理：$g$ 单调时，$\int_{A_1}^{A_2}fg$ 可以被 $|F|$ 的上界乘上 $g(A_1)$ 控制，于是 Cauchy 判据成立。

例：$\displaystyle\int_1^{+\infty}\frac{\sin x}{x^p}\mathrm{d}x$ 对任意 $p>0$ 收敛。因为 $\big|\int_1^A\sin x\,\mathrm{d}x\big|\le2$，而 $x^{-p}$ 单调递减到 $0$。$p=1$ 时这正是一个条件收敛的积分；$p>1$ 时它其实绝对收敛。两套判别法给出一致结论，但 Dirichlet 覆盖了 $0<p\le1$ 这一段。

## 三个常见误解

> [!MYTH] 比较判别法对变号函数也能直接比较。
> 直接比较需要 $0\le f\le g$。对 $\frac{\sin x}{x}$ 说“它比 $\frac1x$ 小所以收敛”是无效推理，因为函数会变号，部分积分不单调。正确路线是先取绝对值或改用 Dirichlet。

> [!MYTH] 绝对值积分发散，原积分就发散。
> 这正是条件收敛的定义场景。$\int_1^{+\infty}\frac{\sin x}{x}\mathrm{d}x$ 收敛，而 $\int_1^{+\infty}\frac{|\sin x|}{x}\mathrm{d}x$ 发散。

> [!MYTH] 极限比较里 $L=0$ 就说明两个积分同敛散。
> $L=0$ 只把收敛性从 $g$ 单向传给 $f$。取 $f=1/x^2$、$g=1/x$，则 $L=0$，$f$ 收敛而 $g$ 发散，并不“同敛散”。

## 练习

> [!PRACTICE] 1 · 极限比较
> 判断 $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{x\sqrt{x^2+1}}$ 的敛散性。
>
> > [!ANSWER] 看答案
> > 当 $x\to+\infty$ 时被积函数与 $x^{-2}$ 同阶：比值 $x^2/(x\sqrt{x^2+1})\to1$。$p=2>1$，收敛。

> [!PRACTICE] 2 · 积分判别法
> 判断 $\displaystyle\int_2^{+\infty}\frac{\mathrm{d}x}{x\ln x}$ 与 $\displaystyle\int_2^{+\infty}\frac{\mathrm{d}x}{x(\ln x)^2}$。
>
> > [!ANSWER] 看答案
> > 前者原函数 $\ln\ln x$，趋于 $+\infty$，发散；后者原函数 $-1/\ln x$，值为 $1/\ln 2\approx1.443$，收敛。

> [!PRACTICE] 3 · Dirichlet
> 判断 $\displaystyle\int_1^{+\infty}\frac{\sin x}{\sqrt x}\,\mathrm{d}x$ 是否绝对收敛。
>
> > [!ANSWER] 看答案
> > 收敛：Dirichlet，$\big|\int_1^A\sin x\,\mathrm{d}x\big|\le2$，$x^{-1/2}\downarrow0$。不绝对收敛：与上面积分同样用 $|\sin x|\ge\sin^2x$ 比较，得 $\int \frac{|\sin x|}{\sqrt x}$ 发散。故为条件收敛。

> [!PRACTICE] 4 · 排除干扰
> 判断 $\displaystyle\int_1^{+\infty}e^{-x}x^{10}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > 收敛。$e^{-x}x^{10}\le C/x^2$ 对充分大的 $x$ 成立（指数衰减快于任何幂），与 $\int_1^{+\infty}x^{-2}$ 比较即可。事实上它的值为 $10!$ 的截断，约 $1.3\times10^6$ 中的绝大部分由前几十项贡献。

## 严格表述

> [!FORMAL] 严格表述
> 设 $f,g$ 在 $[a,+\infty)$ 上局部可积且 $g\ge0$。若 $|f|\le g$ 且 $\int_a^{+\infty}g$ 收敛，则 $\int_a^{+\infty}f$ 绝对收敛。若 $\lim_{x\to+\infty}f/g=L$ 且 $0<L<+\infty$，则两积分同敛散。Dirichlet：若存在 $M$ 使 $\big|\int_a^A f\big|\le M$ 对一切 $A>a$ 成立，$g$ 单调且 $\lim_{x\to+\infty}g=0$，则 $\int_a^{+\infty}fg$ 收敛。Abel：若 $\int_a^{+\infty}f$ 收敛且 $g$ 单调有界，则 $\int_a^{+\infty}fg$ 收敛。两判别法的证明都用第二中值定理：存在 $\xi\in(A_1,A_2)$ 使 $\int_{A_1}^{A_2}fg=g(A_1)\int_{A_1}^{\xi}f+g(A_2)\int_{\xi}^{A_2}f$。
