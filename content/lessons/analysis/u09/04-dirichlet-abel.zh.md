---
slug: "dirichlet-abel"
subject: "analysis"
unit: "u09"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "Dirichlet 与 Abel 判别法"
subtitle: "不要求同号，只要求有界与单调"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["series"]
prereq: ["series"]
related: ["series", "funcseries"]
---

## 本讲目标

学完这一讲，你能用分部求和把 $\sum a_nb_n$ 的收敛性拆成“$a$ 的部分和有界”与“$b$ 单调趋零”两件事，并用它判断 $\sum\frac{\sin n}{n}$、$\sum\frac{\cos nx}{n}$ 这类级数。

Leibniz 只处理 $a_n=(-1)^{n-1}$ 这一种振荡。Dirichlet 把它换成任何“部分和有界”的振荡，覆盖面大得多。

## 三行回顾

- 直接比较要求同号，变号级数必须换工具。
- 分部求和（Abel 变换）把 $\sum a_kb_k$ 改写成部分和 $A_k$ 与 $b_k$ 的差分之积。
- 只要 $A_k$ 有界、$b_k$ 单调趋零，改写后的和就被一个收敛的望远镜结构控制。

## 分部求和：把振荡装进部分和

记 $A_k=a_1+\cdots+a_k$，$A_0=0$。则

$$
\sum_{k=1}^{n}a_kb_k=A_nb_n+\sum_{k=1}^{n-1}A_k\,(b_k-b_{k+1}).
$$

验证 $n=2$：右边 $=(a_1+a_2)b_2+a_1(b_1-b_2)=a_1b_1+a_2b_2$。

这个恒等式的作用是转移注意力：右端不再出现单个 $a_k$，只出现累积量 $A_k$。若 $|A_k|\le M$ 且 $b_k$ 递减，则

$$
\Big|\sum_{k=1}^{n}a_kb_k\Big|\le M\Big(b_n+\sum_{k=1}^{n-1}(b_k-b_{k+1})\Big)=Mb_1 .
$$

$b$ 的差分是望远镜求和，总和恰好是 $b_1-b_n\le b_1$。这就是全部机制。

## Dirichlet 判别法

设 $\{A_n\}$ 有界，$\{b_n\}$ 单调且 $b_n\to0$。则 $\sum a_nb_n$ 收敛。

用 Cauchy 判据：对 $n>m$，

$$
\Big|\sum_{k=m+1}^{n}a_kb_k\Big|\le M\,(b_{m+1}+b_{m+1}-b_{n+1})\le 2Mb_{m+1}\to0 .
$$

例：$\sum_{n\ge1}\frac{\sin n\theta}{n}$，$\theta$ 不是 $2\pi$ 的整数倍。先算振荡的部分和：

$$
\sum_{k=1}^{n}\sin k\theta=\frac{\sin\frac{n\theta}{2}\sin\frac{(n+1)\theta}{2}}{\sin\frac{\theta}{2}},
$$

绝对值不超过 $\frac{1}{|\sin(\theta/2)|}$。取 $\theta=\frac{\pi}{3}$，界为 $\frac{1}{\sin(\pi/6)}=2$。而 $\frac1n$ 单调趋零，故级数收敛。

这个例子说明：$\sin n$ 的符号没有规律，但它的部分和被牢牢限制在 $[-2,2]$ 内，振荡不会累积。

## Abel 判别法

设 $\sum a_n$ 收敛，$\{b_n\}$ 单调有界。则 $\sum a_nb_n$ 收敛。

与 Dirichlet 的差别只有两处：把“部分和有界”加强为“级数收敛”，把“$b_n\to0$”放宽为“$b_n$ 单调有界”。

例：$\sum_{n\ge1}(-1)^n\Big(1+\frac1n\Big)$。$\sum(-1)^n$ 收敛，$b_n=1+\frac1n$ 递减且以 $1$ 为下界，故收敛。直接看通项也行：它等于 $(-1)^n+(-1)^n/n$，两项都收敛。Abel 的价值在于不必拆分。

再看 $\sum_{n\ge1}\frac{(-1)^{n-1}}{n}\Big(1+\frac1n\Big)$：$\sum\frac{(-1)^{n-1}}{n}$ 收敛，$b_n=1+\frac1n$ 单调有界，收敛。

## 两个判别法的分工

| 判别法 | 对 $a$ 的要求 | 对 $b$ 的要求 | 典型场景 |
| --- | --- | --- | --- |
| Dirichlet | 部分和有界 | 单调，趋于 $0$ | $\sum\frac{\sin n}{n}$、$\sum\frac{(-1)^n}{\sqrt n}$ |
| Abel | 级数收敛 | 单调，有界 | $\sum\frac{(-1)^n}{n}\big(1+\frac1n\big)$ |

记忆：Dirichlet 管“条件收敛 × 趋零”，Abel 管“收敛 × 有界”。把 $b_n$ 减去它的极限 $b$，就可把 Abel 化归到 Dirichlet：$\sum a_nb_n=b\sum a_n+\sum a_n(b_n-b)$，第一项收敛，第二项用 Dirichlet。

> [!NOTE]
> 两个判别法都要求 $b_n$ 单调。单调性不是装饰，见下面的反例。

## 三个常见误解

> [!MYTH] 只要 $b_n\to0$ 且 $a_n$ 的部分和有界，级数就收敛。
> 单调性不能省。取 $a_n=(-1)^{n-1}$（部分和在 $0,1$ 之间），$b_{2k-1}=\frac1k$、$b_{2k}=\frac{1}{2k}$。则 $\sum a_nb_n=\sum_k\big(\frac1k-\frac1{2k}\big)=\sum\frac{1}{2k}$，发散。而 $b_n\to0$ 且不单调（$b_5=\frac13>b_4=\frac14$）。

> [!MYTH] $\sum\frac{\sin n}{n}$ 收敛，是因为它绝对收敛。
> 绝对收敛不成立。$|\sin n|\ge\sin^2n$，而 $\sum\frac{\sin^2 n}{n}=\sum\frac{1}{2n}-\sum\frac{\cos 2n}{2n}$，第一项发散、第二项收敛，故绝对值级数发散。它只是条件收敛。

> [!MYTH] Abel 判别法要求 $b_n\to0$。
> 不需要。$b_n$ 只需单调有界，极限可以是非零常数。$b_n\equiv1$ 就是最平凡的情形，此时结论退化为 $\sum a_n$ 收敛。

## 练习

> [!PRACTICE] 1 · Dirichlet
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{\sin(n\pi/3)}{n}$ 收敛，并给出部分和的一个界。
>
> > [!ANSWER] 看答案
> > $\big|\sum_{k=1}^{n}\sin\frac{k\pi}{3}\big|\le\frac{1}{\sin(\pi/6)}=2$，$\frac1n\downarrow0$，Dirichlet 给出收敛。

> [!PRACTICE] 2 · Leibniz 或 Abel
> 判断 $\displaystyle\sum_{n=1}^{\infty}(-1)^n\arctan\frac1n$。
>
> > [!ANSWER] 看答案
> > $\arctan\frac1n$ 单调递减趋于 $0$（因为 $\frac1n$ 递减、$\arctan$ 递增），Leibniz 直接给出收敛。也可看作 $\sum(-1)^n\cdot b_n$，$b_n$ 单调有界。

> [!PRACTICE] 3 · 余弦版
> 讨论 $\displaystyle\sum_{n=1}^{\infty}\frac{\cos nx}{n}$ 的敛散性。
>
> > [!ANSWER] 看答案
> > $x\ne2k\pi$ 时，$\big|\sum_{k=1}^{n}\cos kx\big|\le\frac{1}{|\sin(x/2)|}$，Dirichlet 给出收敛。$x=2k\pi$ 时级数为 $\sum\frac1n$，发散。

> [!PRACTICE] 4 · 指数减半
> 判断 $\displaystyle\sum_{n=1}^{\infty}\frac{\sin n}{\sqrt n}$。
>
> > [!ANSWER] 看答案
> > 部分和 $\big|\sum_{k=1}^{n}\sin k\big|\le\frac{1}{\sin(1/2)}\approx2.086$，$n^{-1/2}$ 单调趋零，Dirichlet 给出收敛。取绝对值后与 $\sum n^{-1/2}$ 同阶，发散。条件收敛。

## 严格表述

> [!FORMAL] 严格表述
> 分部求和：记 $A_k=\sum_{i=1}^{k}a_i$，$A_0=0$，则对任意 $1\le m<n$，$\sum_{k=m+1}^{n}a_kb_k=A_nb_n-A_mb_m+\sum_{k=m+1}^{n-1}A_k(b_k-b_{k+1})$。Dirichlet 判别法：若存在 $M$ 使 $|A_k|\le M$ 对一切 $k$ 成立，且 $\{b_k\}$ 单调、$b_k\to0$，则 $\sum a_kb_k$ 收敛。Abel 判别法：若 $\sum a_k$ 收敛且 $\{b_k\}$ 单调有界，则 $\sum a_kb_k$ 收敛。证明均由上式出发，用 $|A_k|\le M$ 与望远镜和 $\sum(b_k-b_{k+1})=b_{m+1}-b_{n+1}$ 控制 Cauchy 片段。两判别法对函数项级数逐点成立；若 $M$ 与 $x$ 无关、$b_k\to0$ 对 $x$ 一致，则结论升级为一致收敛。
