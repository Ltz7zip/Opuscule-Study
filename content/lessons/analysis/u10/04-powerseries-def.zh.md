---
slug: "powerseries-def"
subject: "analysis"
unit: "u10"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "幂级数"
subtitle: "一个半径，管住整条数轴"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["powerseries", "unifconv"]
prereq: ["unifconv"]
related: ["powerseries", "taylor"]
---

## 本讲目标

学完这一讲，你能算出幂级数的收敛半径，确定收敛区间（包括两个端点），并说明为什么它在开区间内不一致收敛、在任何闭子区间上一致收敛。

幂级数 $\sum a_n(x-x_0)^n$ 是函数项级数里最规矩的一类：收敛区域永远是一个以 $x_0$ 为中心的区间，只差端点的情况。

## 三行回顾

- 幂级数在 $|x-x_0|<R$ 内绝对收敛，在 $|x-x_0|>R$ 外发散。
- $R$ 叫收敛半径，可能为 $0$、正数或 $+\infty$。
- 端点 $x=x_0\pm R$ 必须代回原级数，单独判断。

## Abel 定理与收敛半径

设 $\sum a_n(x-x_0)^n$。若它在某点 $x_1\ne x_0$ 收敛，则对一切 $|x-x_0|<|x_1-x_0|$ 绝对收敛；若在某点发散，则对一切更远的点发散。由此存在唯一的 $R\in[0,+\infty]$，使得

$$
|x-x_0|<R\ \text{收敛},\qquad |x-x_0|>R\ \text{发散}.
$$

$R$ 的计算（Cauchy–Hadamard）：

$$
\frac1R=\limsup_{n\to\infty}\sqrt[n]{|a_n|}.
$$

用上极限而不是极限，是因为 $\sqrt[n]{|a_n|}$ 可能不收敛。系数有零项时，比值公式会失效，上极限公式仍然有效。

## 收敛半径的三种算法

| 方法 | 公式 | 例 |
| --- | --- | --- |
| Cauchy–Hadamard | $R=1/\limsup\sqrt[n]{\|a_n\|}$ | $\sum\big(1+\frac1n\big)^{n^2}x^n$，$R=\frac1e$ |
| 比值 | $R=\lim\big|\frac{a_n}{a_{n+1}}\big|$ | $\sum\frac{x^n}{n!}$，$R=+\infty$ |
| 换元 | 把 $x^k$ 看成新变量 | $\sum(2x)^n$，$R=\frac12$ |

例：$\sum\frac{x^n}{n!}$。比值 $\frac{a_n}{a_{n+1}}=n+1\to+\infty$，故 $R=+\infty$，级数在全实轴收敛，和为 $e^x$。

例：$\sum n!x^n$。比值 $\frac{n!}{(n+1)!}=\frac{1}{n+1}\to0$，故 $R=0$，只在 $x=0$ 收敛。

例：$\sum x^{2n}$。令 $t=x^2$，得 $\sum t^n$，$R_t=1$，故 $|x|<1$，$R=1$。此时 $\sqrt[n]{|a_n|}$ 在 $0$ 与 $1$ 之间跳动，用上极限得 $1$。

## 端点必须单独检查

$R$ 只负责开区间，两个端点各是一个数项级数。

| 幂级数 | $R$ | $x=R$ | $x=-R$ | 收敛区间 |
| --- | --- | --- | --- | --- |
| $\sum\frac{x^n}{n}$ | $1$ | $\sum\frac1n$ 发散 | $\sum\frac{(-1)^n}{n}$ 收敛 | $[-1,1)$ |
| $\sum\frac{x^n}{n^2}$ | $1$ | $\sum\frac{1}{n^2}$ 收敛 | $\sum\frac{(-1)^n}{n^2}$ 收敛 | $[-1,1]$ |
| $\sum x^n$ | $1$ | 发散 | 发散 | $(-1,1)$ |

三个级数的半径完全相同，收敛区间却三种样子。这说明半径不含端点信息，端点必须代回去用数项级数的方法判断。

## 收敛区间内的一致收敛

在 $(-R,R)$ 内，幂级数不一定一致收敛；但在任何闭子区间 $[-r,r]$（$0<r<R$）上，它一致收敛。理由是取 $q=r/R<1$，由根值上极限可推出 $|a_n|r^n\le q^n$ 对充分大的 $n$ 成立，于是 $\sum|a_n|r^n$ 收敛，优级数判别法生效。

$\sum x^n$ 在 $(-1,1)$ 内不一致收敛：余项为 $\frac{x^{N+1}}{1-x}$，在 $x\to1^-$ 时无界，上确界为 $+\infty$。而在 $[-0.9,0.9]$ 上，余项不超过 $\frac{0.9^{N+1}}{0.1}$，一致收敛。

> [!NOTE]
> 记住这个层级：开区间内逐点绝对收敛，闭子区间上一致收敛，端点单独算。三级不能混为一谈。

## 三个常见误解

> [!MYTH] 半径内的点都收敛，端点自然也收敛。
> 端点恰好是最容易出事的地方。$\sum\frac{x^n}{n}$ 在 $x=1$ 处成为调和级数，发散；$\sum x^n$ 两个端点都发散，只有 $(-1,1)$。

> [!MYTH] 收敛半径总能用 $R=\lim|a_n/a_{n+1}|$ 算。
> 系数有零时比值不存在。$\sum x^{2n}$ 的系数是 $1,0,1,0,\dots$，比值在 $0$ 与 $\infty$ 之间跳，只能用上极限，得 $R=1$。

> [!MYTH] 在收敛区间 $(-R,R)$ 内，幂级数一致收敛。
> 只有闭子区间才保证一致。$\sum x^n$ 在 $(-1,1)$ 内逐点收敛，但余项上确界为 $+\infty$，不一致收敛。

## 练习

> [!PRACTICE] 1 · 半径与端点
> 求 $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{n\,3^n}$ 的收敛区间。
>
> > [!ANSWER] 看答案
> > $R=\lim\frac{n3^n}{(n+1)3^{n+1}}=3$。$x=3$ 时为 $\sum\frac1n$，发散；$x=-3$ 时为 $\sum\frac{(-1)^n}{n}$，收敛。收敛区间 $[-3,3)$。

> [!PRACTICE] 2 · 比值
> 求 $\displaystyle\sum_{n=1}^{\infty}\frac{(n!)^2}{(2n)!}x^n$ 的收敛半径。
>
> > [!ANSWER] 看答案
> > $\frac{a_{n+1}}{a_n}=\frac{(n+1)^2}{(2n+2)(2n+1)}=\frac{n+1}{2(2n+1)}\to\frac14$，故 $R=4$。

> [!PRACTICE] 3 · 根值
> 求 $\displaystyle\sum_{n=1}^{\infty}\Big(1+\frac1n\Big)^{n^2}x^n$ 的收敛半径。
>
> > [!ANSWER] 看答案
> > $\sqrt[n]{a_n}=\big(1+\frac1n\big)^n\to e$，故 $R=\frac1e$。

> [!PRACTICE] 4 · 平移
> 求 $\displaystyle\sum_{n=1}^{\infty}\frac{(x-1)^n}{n\,2^n}$ 的收敛区间。
>
> > [!ANSWER] 看答案
> > 令 $t=x-1$，$R_t=2$，即 $|x-1|<2$，得 $-1<x<3$。$x=3$ 时 $\sum\frac1n$ 发散；$x=-1$ 时 $\sum\frac{(-1)^n}{n}$ 收敛。收敛区间 $[-1,3)$。

## 严格表述

> [!FORMAL] 严格表述
> 对幂级数 $\sum a_n(x-x_0)^n$，令 $\rho=\limsup_{n\to\infty}\sqrt[n]{|a_n|}$，$R=1/\rho$（$\rho=0$ 时 $R=+\infty$，$\rho=+\infty$ 时 $R=0$）。则 $|x-x_0|<R$ 时级数绝对收敛，$|x-x_0|>R$ 时发散。Abel 定理：若级数在 $x_1$ 收敛，则它在 $[x_0,x_1]$（或 $[x_1,x_0]$）上一致收敛，从而和函数在 $x_1$ 处单侧连续。对任意 $0<r<R$，级数在 $[x_0-r,x_0+r]$ 上一致收敛：取 $q\in(r/R,1)$，由 $\limsup$ 的定义得 $|a_n|r^n\le q^n$ 对充分大的 $n$ 成立。
