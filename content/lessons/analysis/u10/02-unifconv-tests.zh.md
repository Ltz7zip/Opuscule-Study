---
slug: "unifconv-tests"
subject: "analysis"
unit: "u10"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "一致收敛的判别法"
subtitle: "优级数是充分条件，不是必要条件"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["unifconv"]
prereq: ["unifconv"]
related: ["unifconv", "series"]
---

## 本讲目标

学完这一讲，你能用 Weierstrass 优级数判别法迅速确认一致收敛，在优级数失效时改用 Dirichlet 或 Abel 的一致版本，并说清为什么失效不等于不一致。

上一讲给出了定义，但直接用定义要算上确界，往往很难。这一讲提供三种可操作的判别法，按“好算程度”排序。

## 三行回顾

- 一致收敛 $\iff$ $\sup_x|R_n(x)|\to0$，$R_n$ 是第 $n$ 项后的余项。
- 优级数判别法：把每一项用一个与 $x$ 无关的 $M_n$ 压住，若 $\sum M_n$ 收敛，则一致收敛。
- 优级数失效只说明这招用不上，还可以用 Dirichlet/Abel 的一致版本。

## sup 判据

级数 $\sum u_n(x)$ 在 $I$ 上一致收敛，当且仅当

$$
\sup_{x\in I}\Big|\sum_{k=n+1}^{\infty}u_k(x)\Big|\ \longrightarrow\ 0 .
$$

这是定义的直接改写，但使用时要注意：先算出余项，再对 $x$ 取上确界，顺序不能反。先取上确界再求极限，得到的是另一个量。

## Weierstrass 优级数

设存在与 $x$ 无关的 $M_n\ge0$，使得

$$
|u_n(x)|\le M_n\quad(x\in I,\ n=1,2,\dots),\qquad \sum_{n=1}^{\infty}M_n<+\infty .
$$

则 $\sum u_n(x)$ 在 $I$ 上一致且绝对收敛。

理由一行写完：余项被 $\sum_{k>n}M_k$ 控制，而这个数不依赖 $x$ 且趋于零。

例一：$\sum_{n\ge1}\frac{\sin nx}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。取 $M_n=\frac{1}{n^2}$，$\sum M_n=\pi^2/6$。注意 $x$ 可以取任意实数，界都一样。

例二：$\sum_{n\ge1}\frac{x^n}{n}$ 在 $[-r,r]$（$0<r<1$）上一致收敛。取 $M_n=\frac{r^n}{n}$，$\sum M_n=-\ln(1-r)<+\infty$。$r$ 越接近 $1$，这个界越大，但每个固定的 $r$ 都有效。

## 优级数失效但仍然一致

考察 $\sum_{n\ge1}(-1)^{n-1}\frac{x^n}{n}$ 在 $[0,1]$ 上。

优级数行不通：每项的 sup 是 $\frac1n$（在 $x=1$ 取到），而 $\sum\frac1n$ 发散。但这不证明不一致。

改用 Dirichlet 的一致版本。$a_n=(-1)^{n-1}$ 的部分和只有 $0$ 与 $1$，界 $M=1$ 与 $x$ 无关；$b_n(x)=\frac{x^n}{n}$ 对每个 $x$ 关于 $n$ 单调递减（$x^n$ 递减，除以 $n$ 仍递减），且

$$
0\le b_n(x)\le\frac1n\ \longrightarrow\ 0
$$

对 $x$ 一致。于是级数在 $[0,1]$ 上一致收敛。$x=1$ 时它成为 $\sum\frac{(-1)^{n-1}}{n}=\ln2$，端点也没有问题。

> [!NOTE]
> 优级数判别法是充分条件。它失效时，级数可能仍然一致收敛；此时应当换 Dirichlet/Abel，而不是下结论说不一致。

## 一致收敛的 Dirichlet 与 Abel

**Dirichlet（一致版）**：若存在与 $x,n$ 无关的 $M$，使 $\big|\sum_{k=1}^{n}a_k(x)\big|\le M$ 对一切 $x\in I$、$n$ 成立；且对每个 $x$，$b_n(x)$ 关于 $n$ 单调，并且 $b_n(x)\rightrightarrows0$（一致趋于零），则 $\sum a_n(x)b_n(x)$ 在 $I$ 上一致收敛。

**Abel（一致版）**：若 $\sum a_n(x)$ 在 $I$ 上一致收敛，且对每个 $x$，$b_n(x)$ 关于 $n$ 单调，并且 $|b_n(x)|\le M$（$M$ 与 $x,n$ 无关），则 $\sum a_n(x)b_n(x)$ 一致收敛。

| 判别法 | 对 $a$ | 对 $b$ | 例 |
| --- | --- | --- | --- |
| 优级数 | 逐项压住 | 无 | $\sum\frac{\sin nx}{n^2}$ |
| Dirichlet | 部分和一致有界 | 单调，一致趋零 | $\sum\frac{(-1)^{n-1}x^n}{n}$ |
| Abel | 一致收敛 | 单调，一致有界 | $\sum\frac{(-1)^n}{n}\big(1+\frac{x}{n}\big)$ |

## 三个常见误解

> [!MYTH] 优级数判别法失效，就说明不一致收敛。
> 它只是充分条件。$\sum(-1)^{n-1}\frac{x^n}{n}$ 的 $\sup$ 是 $\frac1n$，优级数发散，但用 Dirichlet 可证它在 $[0,1]$ 上一致收敛。

> [!MYTH] 逐点绝对收敛且每项连续，就能推出一致收敛。
> 不够。$\sum x^n(1-x)$ 在 $[0,1]$ 上每点绝对收敛、每项连续，但余项 $\sup$ 恒为 $1$，不一致；极限函数在 $1$ 处还断了。

> [!MYTH] 得到 $[-r,r]$ 上一致收敛，就能把 $r$ 推到端点。
> 不能。$\sum x^n$ 在每个 $[-r,r]$（$r<1$）上一致收敛，在 $(-1,1)$ 上不一致，在 $[0,1)$ 上也不一致。端点必须单独处理。

## 练习

> [!PRACTICE] 1 · 优级数
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{\cos nx}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。
>
> > [!ANSWER] 看答案
> > $\big|\frac{\cos nx}{n^2}\big|\le\frac{1}{n^2}$，而 $\sum\frac{1}{n^2}=\frac{\pi^2}{6}$ 收敛。优级数判别法给出一致且绝对收敛。

> [!PRACTICE] 2 · 闭子区间
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{1+x^n}$ 在 $[0,\tfrac12]$ 上一致收敛。
>
> > [!ANSWER] 看答案
> > 在 $[0,\tfrac12]$ 上 $1+x^n\ge1$，故 $\big|\frac{x^n}{1+x^n}\big|\le 2^{-n}$，而 $\sum2^{-n}=1$ 收敛。一致收敛。

> [!PRACTICE] 3 · 优级数失效
> 证明 $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n+x}$ 在 $[0,+\infty)$ 上一致收敛。
>
> > [!ANSWER] 看答案
> > 优级数给不出结论：$\sup\big|\frac{1}{n+x}\big|=\frac1n$，$\sum\frac1n$ 发散。用 Dirichlet：部分和只有 $0,1$，界为 $1$；$b_n=\frac{1}{n+x}$ 关于 $n$ 递减，且 $0<b_n\le\frac1n\to0$ 一致。故一致收敛。

> [!PRACTICE] 4 · 反面
> 说明 $\displaystyle\sum_{n=1}^{\infty}nxe^{-nx}$ 在 $(0,+\infty)$ 上不一致收敛。
>
> > [!ANSWER] 看答案
> > 每项的非负最大值在 $x=\frac1n$ 处，等于 $e^{-1}$，故 $\sum\sup=\infty$，优级数不可用（这本身还不算证明）。真正的理由是：和函数为 $\frac{xe^{-x}}{(1-e^{-x})^2}\sim\frac1x$（$x\to0^+$），在 $(0,+\infty)$ 上无界，而每个部分和有界。一致收敛会保持有界性，矛盾。

## 严格表述

> [!FORMAL] 严格表述
> Weierstrass 判别法：若 $|u_n(x)|\le M_n$ 对一切 $x\in I$ 与 $n$ 成立，且 $\sum M_n$ 收敛，则 $\sum u_n(x)$ 在 $I$ 上一致且绝对收敛。Dirichlet：若存在 $M$ 使 $\big|\sum_{k=1}^{n}a_k(x)\big|\le M$ 对一切 $x,n$ 成立，且 $b_n(x)$ 关于 $n$ 单调、$\sup_{x\in I}|b_n(x)|\to0$，则 $\sum a_nb_n$ 在 $I$ 上一致收敛。Abel：若 $\sum a_n(x)$ 在 $I$ 上一致收敛，$b_n(x)$ 关于 $n$ 单调且一致有界，则 $\sum a_nb_n$ 在 $I$ 上一致收敛。三条判别法的证明都用 Cauchy 判据与分部求和，把余项压成与 $x$ 无关的量。
