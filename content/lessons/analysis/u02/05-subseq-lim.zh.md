---
slug: "subseq-lim"
subject: "analysis"
unit: "u02"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "子列与上下极限"
subtitle: "从一条子列看出整体的摆动范围"
minutes: 15
meta: ["阅读 15 分钟","需要 Cauchy 准则","掌握级"]
concepts: ["subseq", "sup"]
prereq: ["seql"]
related: ["seql", "sup"]
---

## 本讲目标

一个发散数列未必混乱：$(-1)^n$ 只在两个值之间跳，$\sin(n\pi/2)$ 在三个值之间轮转。子列把这种结构拆开，上下极限则用两个数概括整个尾部。

学完你能从子列判断原数列的收敛性，能陈述并应用 Bolzano–Weierstrass 定理，也能算具体数列的 $\limsup$ 与 $\liminf$。

## 三行回顾

- 子列保持原数列的顺序，只挑出一部分项；收敛数列的每个子列收敛到同一极限。
- 有界数列必有收敛子列，这是实数完备性的另一种说法。
- 有界数列的上下极限分别是其所有极限点的最大与最小者；两者相等时数列收敛。

## 子列与极限点

设 $n_1 < n_2 < \cdots$ 是严格递增的正整数列，则 $\{a_{n_k}\}$ 称为 $\{a_n\}$ 的子列。

若 $a_n \to A$，则对任意子列 $a_{n_k} \to A$：取定义中的 $N$，当 $k>N$ 时必有 $n_k \ge k > N$，于是 $|a_{n_k}-A|<\varepsilon$。

反过来，若两个子列极限不同，原数列一定发散。$a_n = (-1)^n$ 的偶数子列恒为 $1$，奇数子列恒为 $-1$，故发散。

$A$ 称为数列的极限点，若存在子列 $a_{n_k} \to A$。一个数列可以没有极限点（$a_n = n$），可以只有一个（收敛数列），也可以有很多个（$\sin(n\pi/2)$ 有 $1,0,-1$ 三个）。

## 有界必有收敛子列

> [!NOTE]
> Bolzano–Weierstrass 定理：有界数列必有收敛子列。

证明用“单调子列”这一手。称下标 $n$ 是峰值点，若对一切 $m>n$ 都有 $a_n \ge a_m$。

若峰值点有无穷多个，按顺序取出 $n_1<n_2<\cdots$，对应的值满足 $a_{n_1} \ge a_{n_2} \ge \cdots$，是单调递减子列；它有下界（原数列有界），故收敛。

若峰值点只有有限个，取最后一个峰值点之后的下标 $n_1$。它不再是峰值，故存在 $n_2>n_1$ 使 $a_{n_2} > a_{n_1}$；$n_2$ 也不是峰值，继续取下去，得到严格递增子列。它单调递增且有上界，故收敛。

两种情形都给出收敛子列。注意有界性不可省：$a_n = n$ 没有任何收敛子列。

## 上极限与下极限

对有界数列 $\{a_n\}$，令

$$
b_n = \sup_{k \ge n} a_k .
$$

$b_n$ 随 $n$ 递减且有下界，故收敛。定义

$$
\limsup_{n\to\infty} a_n = \lim_{n\to\infty} b_n = \inf_{n\ge 1} \sup_{k\ge n} a_k .
$$

把 $\sup$ 换成 $\inf$ 就得到 $\liminf$。直观上，$b_n$ 是“从第 $n$ 项往后能看到的最大高度”，随 $n$ 增大只会下降，其极限就是尾部长期能达到的最高水平。

**例**：$a_n = (-1)^n\left(1+\dfrac{1}{n}\right)$。偶数项为 $1+\dfrac{1}{n} \to 1$，奇数项为 $-\left(1+\dfrac{1}{n}\right) \to -1$。故 $\limsup a_n = 1$，$\liminf a_n = -1$。

**例**：$a_n = \sin\dfrac{n\pi}{2}$ 取值 $1,0,-1,0,\dots$，故 $\limsup = 1$，$\liminf = -1$。

关键结论：$\{a_n\}$ 收敛（有限极限）当且仅当

$$
-\infty < \liminf a_n = \limsup a_n < +\infty .
$$

共同的值就是极限。无界时约定 $\limsup = +\infty$ 或 $\liminf = -\infty$；例如 $a_n = n^{(-1)^n}$ 的偶数项趋于 $+\infty$，奇数项趋于 $0$，故 $\limsup = +\infty$，$\liminf = 0$。

## 三个常见误解

> [!MYTH] 子列一定收敛。
> 子列只是挑出一部分项，不保证更好。$a_n = n$ 的每个子列都无界；$a_n = \sin\dfrac{n\pi}{2}$ 取 $n_k = 2k+1$，得到子列 $(-1)^k$，仍然发散。

> [!MYTH] 有一个收敛子列，原数列就收敛。
> $(-1)^n$ 的偶数子列恒为 $1$，原数列却发散。有收敛子列只说明至少有一个极限点；要推出整体收敛，需要所有子列趋于同一个值。

> [!MYTH] $\limsup a_n$ 就是 $\sup\{a_n\}$。
> $\sup\{a_n\}$ 看的是全部项，$\limsup$ 看的是尾部。$a_n = 1/n$ 的 $\sup$ 是 $1$（第一项），而 $\limsup = 0$。

## 练习

> [!PRACTICE] 1 · 摆动数列
> 求 $a_n = (-1)^n + \dfrac{1}{n}$ 的上下极限。
>
> > [!ANSWER] 看答案
> > 偶数项 $1 + 1/n \to 1$，奇数项 $-1 + 1/n \to -1$，故 $\limsup = 1$，$\liminf = -1$。两者不等，数列发散。

> [!PRACTICE] 2 · 无界情形
> 求 $a_n = n^{(-1)^n}$ 的上下极限。
>
> > [!ANSWER] 看答案
> > $n$ 为偶数时 $a_n = n \to +\infty$，为奇数时 $a_n = 1/n \to 0$。故 $\limsup = +\infty$，$\liminf = 0$。

> [!PRACTICE] 3 · 奇偶子列
> 若 $a_{2k} \to A$ 且 $a_{2k-1} \to A$，证明 $a_n \to A$。
>
> > [!ANSWER] 看答案
> > 给定 $\varepsilon>0$，取 $K_1$ 使 $k>K_1$ 时 $|a_{2k}-A|<\varepsilon$，取 $K_2$ 使 $k>K_2$ 时 $|a_{2k-1}-A|<\varepsilon$。令 $N = \max\{2K_1, 2K_2-1\}$，则 $n>N$ 时无论奇偶都有 $|a_n-A|<\varepsilon$。

> [!PRACTICE] 4 · 三个值
> 求 $a_n = \cos\dfrac{2n\pi}{3}$ 的上下极限。
>
> > [!ANSWER] 看答案
> > 取值按 $1, -\dfrac{1}{2}, -\dfrac{1}{2}$ 循环。故 $\limsup = 1$，$\liminf = -\dfrac{1}{2}$。

> [!FORMAL] 严格表述
> 若 $\{a_n\}$ 有界，定义 $\limsup a_n = \lim_{n\to\infty}\sup_{k\ge n}a_k$，$\liminf a_n = \lim_{n\to\infty}\inf_{k\ge n}a_k$，两极限存在且有限。$\limsup a_n$ 是全体极限点的上确界，$\liminf$ 是下确界。$\{a_n\}$ 收敛当且仅当 $\liminf a_n = \limsup a_n$。Bolzano–Weierstrass 定理：有界数列必有收敛子列，其证明依赖单调有界定理。
