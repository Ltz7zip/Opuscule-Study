---
slug: "posseries-tests"
subject: "analysis"
unit: "u09"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "正项级数的判别法"
subtitle: "单调有界，四个字的全部威力"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["posseries", "series"]
prereq: ["series"]
related: ["posseries", "impropint"]
---

## 本讲目标

学完这一讲，你能面对一个正项级数，按“比较、比值、根值、积分”的顺序快速选定判别法，并在判别法失效时知道该换哪一条。

正项级数是整个级数理论的地基。原因很朴素：部分和单调递增，因此收敛等价于有界。所有判别法都是这一句话的不同包装。

## 三行回顾

- 若 $a_n\ge0$，则 $S_n$ 单调递增，收敛 $\iff$ $\{S_n\}$ 有上界。
- 比较判别法把待判级数夹进一个已知级数；极限形式只比阶。
- 比值与根值判别法处理“通项本身带 $n$ 次幂或阶乘”的情形，$p$ 级数是所有比较的终点。

## 有界即收敛

设 $a_n\ge0$，$S_n=\sum_{k=1}^n a_k$。则 $S_1\le S_2\le\cdots$。单调递增数列要么收敛，要么趋于 $+\infty$，没有第三种可能。于是

$$
\sum_{n=1}^{\infty}a_n\ \text{收敛}\iff \{S_n\}\ \text{有上界}.
$$

这条结论把“求和”问题变成了“估计上界”问题。比如 $\sum\frac{1}{n!}$：由 $n!\ge2^{n-1}$ 得 $S_n\le1+1=2$，立刻收敛，和为 $e\approx2.718$。

## 比较与极限比较

**比较判别法**：$0\le a_n\le b_n$。若 $\sum b_n$ 收敛则 $\sum a_n$ 收敛；若 $\sum a_n$ 发散则 $\sum b_n$ 发散。

**极限比较**：$a_n,b_n>0$，$\lim a_n/b_n=L\in(0,+\infty)$，则两级数同敛散。

| 级数 | 参照 | 比值极限 | 结论 |
| --- | --- | --- | --- |
| $\sum\frac{1}{n^2+3n}$ | $\sum\frac1{n^2}$ | $1$ | 收敛 |
| $\sum\frac{1}{2n+1}$ | $\sum\frac1n$ | $\tfrac12$ | 发散 |
| $\sum\frac{\ln n}{n^3}$ | $\sum\frac{1}{n^{2.5}}$ | $0$ | 收敛 |
| $\sum\frac{1}{n\ln(n+1)}$ | $\sum\frac1n$ | $+\infty$ | 发散 |

第三行的 $\frac{\ln n}{n^3}$ 与 $n^{-2.5}$ 之比是 $\frac{\ln n}{\sqrt n}\to0$，$L=0$ 且参照级数收敛，故收敛。这里选 $2.5$ 而不是 $3$，是因为 $\ln n$ 需要一点余量。

## 比值与根值判别法

**比值（d'Alembert）**：设 $a_n>0$，$\rho=\lim_{n\to\infty}\frac{a_{n+1}}{a_n}$。则 $\rho<1$ 收敛，$\rho>1$ 发散，$\rho=1$ 失效。

**根值（Cauchy）**：设 $\rho=\lim_{n\to\infty}\sqrt[n]{a_n}$。结论相同。

例一：$a_n=\frac{n!}{n^n}$，

$$
\frac{a_{n+1}}{a_n}=\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!}=\Big(\frac{n}{n+1}\Big)^n\longrightarrow\frac1e\approx0.368<1,
$$

收敛。

例二：$a_n=\Big(1-\frac1n\Big)^{n^2}$，

$$
\sqrt[n]{a_n}=\Big(1-\frac1n\Big)^{n}\longrightarrow\frac1e<1,
$$

收敛。两例都靠同一个极限 $(1+1/n)^n\to e$。

> [!NOTE]
> $\rho=1$ 时判别法完全不说话。$\sum\frac1n$（发散）与 $\sum\frac{1}{n^2}$（收敛）都满足 $\rho=1$。

## 积分判别法与 p 级数

设 $f$ 在 $[1,+\infty)$ 上非负、单调递减。则

$$
\sum_{n=1}^{\infty}f(n)\ \text{收敛}\iff\int_1^{+\infty}f(x)\,\mathrm{d}x\ \text{收敛}.
$$

理由是 $\int_n^{n+1}f\le f(n)\le\int_{n-1}^{n}f$，两边一夹就得到部分和与积分互相控制。

取 $f(x)=x^{-p}$ 得 **$p$ 级数**：$\sum\frac{1}{n^p}$ 在 $p>1$ 时收敛，$p\le1$ 时发散。$p=1$ 是调和级数，$p=2$ 时和为 $\pi^2/6\approx1.645$。

取 $f(x)=\frac{1}{x(\ln x)^q}$：积分化为 $\int\frac{\mathrm{d}t}{t^q}$，于是 $q>1$ 时收敛，$q\le1$ 时发散。所以 $\sum\frac{1}{n\ln n}$ 发散，而 $\sum\frac{1}{n(\ln n)^2}$ 收敛。

## 三个常见误解

> [!MYTH] 比值判别法算出 $\rho=1$，就说明级数收敛。
> $\rho=1$ 是失效，不是收敛。$\sum 1/n$ 与 $\sum 1/n^2$ 的 $\rho$ 都等于 $1$，一个发散一个收敛。

> [!MYTH] 比值判别法失效后就没有办法了。
> 失效只说明这个工具看不到差异，此时应换比较或积分判别法。$\sum\frac{1}{n(\ln n)^2}$ 的比值极限也是 $1$，但积分判别立刻给出收敛。

> [!MYTH] 比较判别法必须逐项验证不等式。
> 极限形式只需 $\lim a_n/b_n$ 是正的有限数，不必真的找到逐项不等式。$\sum\frac{1}{n^2+3n}$ 就不必去证 $\frac{1}{n^2+3n}\le\frac{1}{n^2}$ 之外的任何东西。

## 练习

> [!PRACTICE] 1 · 比值
> 判断 $\displaystyle\sum_{n=1}^{\infty}\frac{2^n n!}{n^n}$。
>
> > [!ANSWER] 看答案
> > $\frac{a_{n+1}}{a_n}=2\big(\frac{n}{n+1}\big)^n\to\frac{2}{e}\approx0.736<1$，收敛。

> [!PRACTICE] 2 · 根值
> 判断 $\displaystyle\sum_{n=1}^{\infty}\Big(\frac{n}{2n+1}\Big)^n$。
>
> > [!ANSWER] 看答案
> > $\sqrt[n]{a_n}=\frac{n}{2n+1}\to\frac12<1$，收敛。

> [!PRACTICE] 3 · 积分判别
> 判断 $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n\ln n}$ 与 $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n(\ln n)^2}$。
>
> > [!ANSWER] 看答案
> > 前者对应 $\int_2^{\infty}\frac{\mathrm{d}x}{x\ln x}=\ln\ln x\big|_2^{\infty}=+\infty$，发散；后者对应 $\big[-\frac{1}{\ln x}\big]_2^{\infty}=\frac{1}{\ln2}\approx1.443$，收敛。

> [!PRACTICE] 4 · 等价无穷小
> 判断 $\displaystyle\sum_{n=1}^{\infty}\sin\frac{1}{n^2}$。
>
> > [!ANSWER] 看答案
> > $\sin\frac{1}{n^2}\sim\frac{1}{n^2}$，比值极限为 $1$，与收敛的 $p$ 级数（$p=2$）同敛散，故收敛。

## 严格表述

> [!FORMAL] 严格表述
> 设 $a_n\ge0$。则 $\sum a_n$ 收敛当且仅当部分和数列有上界。比较判别法：若 $0\le a_n\le b_n$ 且 $\sum b_n$ 收敛，则 $\sum a_n$ 收敛。极限形式：若 $a_n,b_n>0$ 且 $\lim a_n/b_n=L\in(0,+\infty)$，则两级数同敛散；$L=0$ 时 $\sum b_n$ 收敛蕴含 $\sum a_n$ 收敛；$L=+\infty$ 时 $\sum b_n$ 发散蕴含 $\sum a_n$ 发散。比值判别法：若 $\lim a_{n+1}/a_n=\rho$，则 $\rho<1$ 收敛，$\rho>1$ 发散，$\rho=1$ 无结论。根值判别法用 $\lim\sqrt[n]{a_n}$，结论相同。积分判别法：$f$ 非负单调递减时 $\sum f(n)$ 与 $\int_1^{+\infty}f$ 同敛散。由此 $\sum n^{-p}$ 在 $p>1$ 时收敛，$p\le1$ 时发散。
