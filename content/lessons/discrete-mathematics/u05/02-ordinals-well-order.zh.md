---
slug: "ordinals-well-order"
subject: "discrete-mathematics"
unit: "u05"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "序数、良序与超限归纳"
subtitle: "同一个大小，不同的排列长度"
minutes: 17
meta: ["阅读 17 分钟","需要 可数集与不可数集","掌握级"]
concepts: ["ordinal", "countable", "relation"]
prereq: ["countable"]
related: ["axchoice", "numalg"]
---

## 本讲目标

学完这一讲，你能判断一个全序集是否良序，能写出前几个序数与 $\omega$、$\omega+1$ 的集合表示，能用超限归纳证明命题，并说清序数与基数的区别。

三件事：良序多出哪一条要求，序数怎样用集合表示，序数算术为什么不能交换。

## 三行回顾

- 基数衡量"有多少个"，两个等势的集合基数相同。
- 但同一个集合可以有不同顺序，例如自然数可以按 $0,1,2,\dots$ 排，也可以把偶数全放前面。
- 顺序不同，"排到第几"就不同；序数刻画的正是排列的长度。

## 良序集

全序集 $(A,\le)$ 称为良序的，若 $A$ 的每个非空子集都有最小元。

| 集合与顺序 | 良序？ | 理由 |
| --- | --- | --- |
| $\mathbb{N}$，通常大小 | 是 | 每个非空子集有最小元 |
| $\mathbb{Z}$，通常大小 | 否 | 全集没有最小元 |
| $(0,1)$，通常大小 | 否 | 没有最小元 |
| $\{1/n\mid n\ge1\}$，通常大小 | 否 | 子集本身没有最小元，趋近 0 |

良序比全序强。$\mathbb{Z}$ 是全序，却不良序；把 $\mathbb{Z}$ 重排成 $0,1,-1,2,-2,\dots$ 后，它变成良序，顺序类型是 $\omega$。可见良序不是集合的性质，而是集合加顺序的性质。

## 序数的集合表示

von Neumann 的表示把序数本身也做成集合：

$$
0=\varnothing,\qquad 1=\{0\},\qquad 2=\{0,1\},\qquad 3=\{0,1,2\}
$$

后继操作是 $\alpha+1=\alpha\cup\{\alpha\}$。所有自然数取并，得到第一个无限序数：

$$
\omega=\{0,1,2,\dots\}
$$

$\omega$ 之后还有 $\omega+1=\omega\cup\{\omega\}$，$\omega+2$，直到 $\omega+\omega=\omega\cdot2$。

| 序数 | 作为集合 | 元素个数 |
| --- | --- | --- |
| $0$ | $\varnothing$ | 0 |
| $2$ | $\{0,1\}$ | 2 |
| $\omega$ | $\{0,1,2,\dots\}$ | 可数无限 |
| $\omega+1$ | $\{0,1,\dots,\omega\}$ | 可数无限 |
| $\omega\cdot2$ | $\omega\cup\{\omega+n\mid n<\omega\}$ | 可数无限 |

一个序数是传递的、被 $\in$ 良序的集合。传递指 $\alpha$ 的每个元素也是 $\alpha$ 的子集。在这个定义下，"$\beta<\alpha$"就是"$\beta\in\alpha$"，顺序关系被元素关系直接编码。

## 超限归纳

自然数归纳说：若 $P(0)$ 成立，且 $P(n)\to P(n+1)$，则对所有 $n$ 成立。超限归纳把它扩展到所有序数：

若对每个序数 $\alpha$，在"对所有 $\beta<\alpha$ 都有 $P(\beta)$"的假设下能推出 $P(\alpha)$，则对所有序数 $P(\alpha)$ 成立。

证明模式分三种情形：$0$；后继 $\alpha+1$（用 $P(\alpha)$）；极限序数 $\lambda$（用所有 $\beta<\lambda$）。第三种是新增的，也是超限归纳比普通归纳强的地方。

同样的结构给出超限递归：只要每一步的值由之前所有值确定，就能在全体序数上定义函数。序数算术就是这样定义的。

## 序数算术不交换

加法按第二个变量递归：$\alpha+0=\alpha$，$\alpha+(\beta+1)=(\alpha+\beta)+1$，$\alpha+\lambda=\sup_{\beta<\lambda}(\alpha+\beta)$。

$$
1+\omega=\sup_{n<\omega}(1+n)=\omega,\qquad \omega+1=\omega\cup\{\omega\}\neq\omega
$$

前者是把 $1$ 放在无限列的前面，顺序类型仍是 $\omega$；后者是在无限列后面再接一个元素，长度多了一格。

乘法同理：$2\cdot\omega=\sup_n 2n=\omega$，而 $\omega\cdot2=\omega+\omega$，是两个 $\omega$ 首尾相接。

| 表达式 | 结果 | 说明 |
| --- | --- | --- |
| $1+\omega$ | $\omega$ | 前面加一个元素不改变长度 |
| $\omega+1$ | $\omega+1$ | 后面加一个元素，长度增加 |
| $2\cdot\omega$ | $\omega$ | 每步放 2 个，仍是可数无限 |
| $\omega\cdot2$ | $\omega+\omega$ | 两段 $\omega$ 相接 |

序数与基数在有限集上重合，在无限集上分道。$\omega$、$\omega+1$、$\omega\cdot2$ 的基数都是 $\aleph_0$，但顺序类型不同。基数可以看作"最初的序数"：在所有与 $A$ 等势的序数中取最小的那个。

> [!MYTH] 基数是比序数更细的分类。
> 恰好相反。基数把 $\omega$ 与 $\omega+1$ 合并为同一个大小，序数则保留它们的顺序差异。序数信息更多。

## 三个常见误解

> [!MYTH] 全序集一定是良序集。
> $\mathbb{Z}$ 与 $(0,1)$ 都是全序但不良序。良序要求每个非空子集都有最小元，这比"任意两个元素可比"强得多。

> [!MYTH] 序数加法满足交换律。
> $1+\omega=\omega$，而 $\omega+1\neq\omega$。序数加法刻画的是"首尾相接"的顺序，接在前面与接在后面结果不同。

> [!MYTH] 超限归纳只是自然数归纳换了个名字。
> 它多出极限序数这一步。没有这一步，$\omega$ 之后的结论推不过去；也正因如此，$\omega$ 上的命题不能用普通归纳直接覆盖。

## 练习

> [!PRACTICE] 1 · 判断良序
> 判断 $\{1/n\mid n\ge1\}$ 与 $\mathbb{N}\cup\{-1\}$ 在通常顺序下是否良序。
>
> > [!ANSWER] 看答案
> > 前者不是：集合本身没有最小元，元素趋近 0。后者是：添加 $-1$ 后仍有最小元，且每个非空子集的最小元不变。

> [!PRACTICE] 2 · 写序数
> 写出 $\omega+2$ 的集合表示，并说明它是否可数。
>
> > [!ANSWER] 看答案
> > $\omega+2=\omega\cup\{\omega,\omega+1\}=\{0,1,2,\dots,\omega,\omega+1\}$。它的基数为 $\aleph_0$，仍可数。

> [!PRACTICE] 3 · 算序数
> 比较 $3+\omega$ 与 $\omega+3$。
>
> > [!ANSWER] 看答案
> > $3+\omega=\sup_n(3+n)=\omega$；$\omega+3$ 是在 $\omega$ 后再接三个元素，严格大于 $\omega$。所以 $3+\omega=\omega<\omega+3$。

## 严格表述

全序集 $(A,<)$ 是良序的，若每个非空 $S\subseteq A$ 都有最小元。序数是传递的、被 $\in$ 良序的集合；$0=\varnothing$，后继 $\alpha+1=\alpha\cup\{\alpha\}$，极限序数是不等于 $0$ 且不是后继的序数。全体序数构成的类记为 $\mathrm{On}$，它本身不是集合（Burali-Forti 悖论）。超限归纳原理：若对每个序数 $\alpha$，由 $\forall\beta<\alpha\,P(\beta)$ 可推出 $P(\alpha)$，则 $\forall\alpha\,P(\alpha)$。序数加法由 $\alpha+0=\alpha$、$\alpha+(\beta+1)=(\alpha+\beta)+1$、$\alpha+\lambda=\sup_{\beta<\lambda}(\alpha+\beta)$ 递归定义；乘法由 $\alpha\cdot0=0$、$\alpha\cdot(\beta+1)=\alpha\cdot\beta+\alpha$、$\alpha\cdot\lambda=\sup_{\beta<\lambda}(\alpha\cdot\beta)$ 定义。基数是与 $A$ 等势的最小序数，记 $|A|$；有限序数既是序数又是基数，无限基数从 $\aleph_0$ 开始。
