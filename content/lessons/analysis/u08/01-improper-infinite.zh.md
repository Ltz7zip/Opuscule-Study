---
slug: "improper-infinite"
subject: "analysis"
unit: "u08"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "无穷区间上的反常积分"
subtitle: "把上限推到无穷，看极限还在不在"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["impropint", "defint"]
prereq: ["defint"]
related: ["impropint", "posseries"]
---

## 本讲目标

学完这一讲，你能把 $\int_a^{+\infty} f(x)\,\mathrm{d}x$ 翻译成一个极限，判断它收敛还是发散，并手算出 $p$ 积分与两个典型值。

这一讲只做三件事：把定义写清楚、把 $p$ 积分算一遍、把“收敛”和“被积函数趋于零”这两件事彻底分开。

## 三行回顾

- 定积分 $\int_a^b f$ 默认区间有界、函数有界，缺一个就不能直接定义。
- 把上限 $b$ 换成变量 $A$，$\int_a^A f$ 就是一个关于 $A$ 的普通定积分，是 $A$ 的函数。
- 让 $A \to +\infty$，如果这个函数有有限极限，就说反常积分收敛，极限值就是积分的值。

## 定义：用极限替掉无穷

设 $f$ 在 $[a,+\infty)$ 上有定义，且对每个 $A>a$ 都在 $[a,A]$ 上可积。定义

$$
\int_a^{+\infty} f(x)\,\mathrm{d}x=\lim_{A\to+\infty}\int_a^A f(x)\,\mathrm{d}x .
$$

右端极限存在且有限时称积分**收敛**，否则称**发散**。注意发散不等于“等于无穷大”：$\int_1^{+\infty}\sin x\,\mathrm{d}x$ 的部分积分是 $1-\cos A$，在 $0$ 与 $2$ 之间振荡，极限根本不存在。

最基础的一次计算：

$$
\int_1^A \frac{\mathrm{d}x}{x^2}=1-\frac{1}{A}\ \longrightarrow\ 1 .
$$

所以 $\int_1^{+\infty}x^{-2}\,\mathrm{d}x=1$。区域向右无限延伸，面积却是有限的 $1$。这就是反常积分与“面积无穷”的分水岭。

## p 积分：一条分界线

对 $p\ne 1$，

$$
\int_1^A \frac{\mathrm{d}x}{x^p}=\frac{A^{1-p}-1}{1-p},
$$

而 $p=1$ 时该积分为 $\ln A$。由此得到完整结论：

$$
\int_1^{+\infty}\frac{\mathrm{d}x}{x^p}\ \text{收敛}\iff p>1,\qquad \text{且收敛时值为}\ \frac{1}{p-1}.
$$

| $p$ | 部分积分 | 极限 | 结论 |
| --- | --- | --- | --- |
| $p=\tfrac12$ | $2\sqrt{A}-2$ | $+\infty$ | 发散 |
| $p=1$ | $\ln A$ | $+\infty$ | 发散 |
| $p=2$ | $1-\tfrac1A$ | $1$ | 收敛 |

分界点只有 $p=1$ 一个。$p$ 比 $1$ 大一点点就收敛（哪怕只大 $0.001$），小一点点就发散。这条线来自 $\int x^{-p}\,\mathrm{d}x$ 的原函数是 $x^{1-p}$ 还是 $\ln x$ 的区别。

## 两个要会手算的值

**第一例**：$\displaystyle\int_1^{+\infty}\frac{\ln x}{x^2}\,\mathrm{d}x$。取 $u=\ln x$、$\mathrm{d}v=x^{-2}\mathrm{d}x$，则 $v=-1/x$，

$$
\int_1^A \frac{\ln x}{x^2}\mathrm{d}x=\Big[-\frac{\ln x}{x}\Big]_1^A+\int_1^A\frac{\mathrm{d}x}{x^2}
=-\frac{\ln A}{A}+1-\frac1A\ \longrightarrow\ 1 .
$$

这里 $-\ln A/A\to 0$ 是关键：对数增长慢于任何正幂。

**第二例**：$\displaystyle\int_0^{+\infty}e^{-x}\sin x\,\mathrm{d}x$。原函数为 $-\tfrac12 e^{-x}(\sin x+\cos x)$，代入得

$$
\Big[-\tfrac12 e^{-x}(\sin x+\cos x)\Big]_0^{A}\ \longrightarrow\ 0-\Big(-\tfrac12\Big)=\frac12 .
$$

上限处能直接代 $+\infty$，是因为 $e^{-x}$ 把三角函数压成了 $0$。

## 收敛不要求被积函数趋于零

在 $[n,\ n+4^{-n}]$ 上取高度为 $1$ 的三角形尖峰（$n=2,3,\dots$），其余处取 $0$。每个尖峰的面积是 $\tfrac12\cdot 4^{-n}$ 的两倍之内，总之不超过 $4^{-n}$，而

$$
\sum_{n=2}^{\infty}4^{-n}=\frac{1}{16}\cdot\frac{1}{1-\frac14}=\frac{1}{12}.
$$

于是 $\int_1^{+\infty}f$ 收敛，可 $f(n)=1$ 对所有整数 $n$ 成立，$f$ 根本不趋于 $0$。反过来也不成立：$1/x\to 0$，但 $\int_1^{+\infty}\mathrm{d}x/x$ 发散。

> [!NOTE]
> 反常积分只统计“累积的面积”，不管被积函数在个别点或稀疏的高峰上取值多大。因此 $f\to 0$ 既不是收敛的充分条件，也不是必要条件。

## 三个常见误解

> [!MYTH] 无穷区间上的积分，面积一定是无穷大。
> 区域无界不代表面积无界。$\int_1^{+\infty}x^{-2}\mathrm{d}x=1$，这条曲线下的面积和一个边长 1 的正方形一样大。

> [!MYTH] 被积函数趋于零，积分就收敛。
> $\tfrac1x\to0$，但 $\int_1^{A}\tfrac{\mathrm{d}x}{x}=\ln A\to+\infty$。趋于零的速度决定了收敛性，$p$ 积分给的就是这条速度线。

> [!MYTH] 积分收敛，被积函数就一定趋于零。
> 在整数点放一串越来越窄、高度恒为 1 的尖峰，总面积可小于 $1/12$，积分收敛而 $f(n)=1$ 恒成立。积分对稀疏的高峰不敏感。

## 练习

> [!PRACTICE] 1 · 直接计算
> 求 $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{(x+1)^3}$。
>
> > [!ANSWER] 看答案
> > 原函数为 $-\tfrac{1}{2(x+1)^2}$，代入得 $0-\big(-\tfrac18\big)=\tfrac18$。收敛。

> [!PRACTICE] 2 · 分部积分
> 求 $\displaystyle\int_0^{+\infty}xe^{-x}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > $\int_0^A xe^{-x}\mathrm{d}x=[-xe^{-x}-e^{-x}]_0^A=1-(A+1)e^{-A}\to 1$。

> [!PRACTICE] 3 · 判断
> $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{\sqrt{x}}$ 与 $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{x\sqrt{x}}$ 哪个收敛？
>
> > [!ANSWER] 看答案
> > 前者 $p=\tfrac12\le1$，部分积分为 $2\sqrt A-2\to+\infty$，发散；后者 $p=\tfrac32>1$，收敛，值为 $2$。

> [!PRACTICE] 4 · 条件收敛
> 说明 $\displaystyle\int_1^{+\infty}\frac{\sin x}{x}\,\mathrm{d}x$ 收敛。
>
> > [!ANSWER] 看答案
> > 分部积分：$\int_1^A\frac{\sin x}{x}\mathrm{d}x=\Big[\frac{-\cos x}{x}\Big]_1^A-\int_1^A\frac{\cos x}{x^2}\mathrm{d}x$。第一项趋于 $\cos 1$；第二项被 $\int_1^{+\infty}x^{-2}\mathrm{d}x=1$ 控制，绝对收敛。故原积分收敛。它不是绝对收敛，这一点下一讲展开。

## 严格表述

> [!FORMAL] 严格表述
> 设 $f$ 在 $[a,+\infty)$ 上局部可积。称 $\int_a^{+\infty}f$ 收敛，若存在实数 $I$，使得对任意 $\varepsilon>0$，存在 $A_0>a$，当 $A>A_0$ 时 $\big|\int_a^A f-I\big|<\varepsilon$。等价地（Cauchy 收敛原理）：对任意 $\varepsilon>0$，存在 $A_0$，当 $A_2>A_1>A_0$ 时 $\big|\int_{A_1}^{A_2}f\big|<\varepsilon$。由定义立得：若 $\int_a^{+\infty}|f|$ 收敛，则 $\int_a^{+\infty}f$ 收敛，因为 $\big|\int_{A_1}^{A_2}f\big|\le\int_{A_1}^{A_2}|f|$。
