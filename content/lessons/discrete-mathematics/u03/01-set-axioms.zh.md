---
slug: "set-axioms"
subject: "discrete-mathematics"
unit: "u03"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 离散数学 · 专业模式"
title: "集合的公理与基本运算"
subtitle: "先规定集合怎么生出来"
minutes: 15
meta: ["阅读 15 分钟","需要 命题逻辑","掌握级"]
concepts: ["axiomset", "set", "setops"]
prereq: ["proplogic"]
related: ["cartesian", "relation"]
---

## 本讲目标

学完这一讲，你能说清为什么"具有某性质的对象的全体"不能再当定义，能列出生成集合的几条基本公理，并能熟练计算并、交、差、补与幂集。

三件事：公理约束了什么，五种运算怎么算，幂集为什么有 $2^n$ 个元素。

## 三行回顾

- 命题逻辑提供了"并且""或者""并非"的精确用法，集合运算沿用同一套连接词。
- 直观上，集合就是一堆对象；但"一堆"的边界必须说清楚。
- 一旦允许"所有不满足自身的集合"这种自指描述，系统立刻矛盾。

## 为什么需要公理

朴素概括原理说：对任意性质 $P$，都存在集合 $S=\{x\mid P(x)\}$。令 $P(x)$ 为 $x\notin x$，得到

$$
R=\{x\mid x\notin x\}
$$

于是 $R\in R\Leftrightarrow R\notin R$，两边互为否定，矛盾。这就是 Russell 悖论。

问题不在集合本身，而在"任意性质都能圈出一个集合"这条规则太强。公理化集合论的做法是：不预设集合存在，只规定几条生成规则，每一步新集合都由已有集合造出。

| 公理 | 内容 | 作用 |
| --- | --- | --- |
| 外延公理 | $A=B$ 当且仅当 $\forall x(x\in A\leftrightarrow x\in B)$ | 确定集合相等 |
| 空集公理 | 存在不含任何元素的集合 $\varnothing$ | 给出起点 |
| 无序对公理 | 对任意 $a,b$，存在 $\{a,b\}$ | 造二元集 |
| 并集公理 | 对集合族 $\mathcal{F}$，存在 $\bigcup\mathcal{F}$ | 把成员合并 |
| 幂集公理 | 对任意 $A$，存在 $\mathcal{P}(A)=\{X\mid X\subseteq A\}$ | 造子集全体 |
| 分离公理 | 对集合 $A$ 与性质 $P$，存在 $\{x\in A\mid P(x)\}$ | 有范围地筛选 |

关键差别在最后一条：分离公理只允许从**已经存在的集合**里筛元素，不允许凭空用性质圈出全集。$R$ 的构造因此被挡住——要先有"所有集合的集合"，而那本身不允许。

## 基本运算

设 $A=\{1,2,3\}$，$B=\{3,4\}$，全集 $U=\{1,2,3,4,5\}$。

| 运算 | 定义 | 结果 |
| --- | --- | --- |
| 并 $A\cup B$ | $\{x\mid x\in A\lor x\in B\}$ | $\{1,2,3,4\}$ |
| 交 $A\cap B$ | $\{x\mid x\in A\land x\in B\}$ | $\{3\}$ |
| 差 $A-B$ | $\{x\mid x\in A\land x\notin B\}$ | $\{1,2\}$ |
| 补 $\overline{A}$ | $\{x\in U\mid x\notin A\}$ | $\{4,5\}$ |
| 对称差 $A\oplus B$ | $(A-B)\cup(B-A)$ | $\{1,2,4\}$ |

集合运算与逻辑联结词一一对应：并对应析取，交对应合取，补对应否定。因此命题逻辑的等值式可以直接搬过来：

$$
\overline{A\cup B}=\overline{A}\cap\overline{B},\qquad \overline{A\cap B}=\overline{A}\cup\overline{B}
$$

以及分配律 $A\cap(B\cup C)=(A\cap B)\cup(A\cup C)$。验证时只看元素 $x$ 属于哪一边，把"$x\in A$"当成命题变元，就回到上一章的真值表。

## 幂集与计数

幂集是全部子集组成的集合：

$$
\mathcal{P}(\{1,2,3\})=\{\varnothing,\{1\},\{2\},\{3\},\{1,2\},\{1,3\},\{2,3\},\{1,2,3\}\}
$$

共 8 个。理由是对每个元素独立决定"放入"或"不放入"，$3$ 个元素给出 $2^3=8$ 种选择。一般地，$|A|=n$ 时 $|\mathcal{P}(A)|=2^n$。这条结论在计数一章会反复用到。

注意 $\varnothing\subseteq A$ 对任何 $A$ 成立，但 $\varnothing\in A$ 一般不成立。前者说空集的每个元素都在 $A$ 里，后者说空集本身是 $A$ 的一个成员，两件事不同。

> [!MYTH] $\{\varnothing\}$ 就是空集。
> $\{\varnothing\}$ 含一个元素，即 $\varnothing$，所以基数为 1；空集不含任何元素，基数为 0。$\mathcal{P}(\varnothing)=\{\varnothing\}$。

## 三个常见误解

> [!MYTH] 空集是任何集合的元素。
> 空集是任何集合的**子集**。只有当集合明确把 $\varnothing$ 列为成员时，才有 $\varnothing\in A$，例如 $\mathcal{P}(\varnothing)$。

> [!MYTH] 集合运算的分配律和算术一样只有一种。
> 并、交互相分配：$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$ 也成立，这是算术里加乘没有的性质。

> [!MYTH] 只要性质写得清楚，就能定义一个集合。
> 分离公理要求先有宿主集合。没有宿主，"所有集合""所有序数"这类整体会引发悖论。

## 练习

> [!PRACTICE] 1 · 算运算
> $A=\{1,2,3,4\}$，$B=\{2,4,6\}$，$U=\{1,\dots,6\}$。求 $A\cap B$、$A-B$、$\overline{A\cup B}$。
>
> > [!ANSWER] 看答案
> > $A\cap B=\{2,4\}$；$A-B=\{1,3\}$；$A\cup B=\{1,2,3,4,6\}$，补集为 $\{5\}$。

> [!PRACTICE] 2 · 幂集
> 求 $|\mathcal{P}(\{a,b,c,d\})|$，并写出 $\mathcal{P}(\varnothing)$。
>
> > [!ANSWER] 看答案
> > $2^4=16$；$\mathcal{P}(\varnothing)=\{\varnothing\}$，基数为 1。

> [!PRACTICE] 3 · 判断
> 判断真假：① $\varnothing\subseteq\{1\}$；② $\varnothing\in\{1\}$；③ $\{1\}\subseteq\{\{1\},2\}$。
>
> > [!ANSWER] 看答案
> > ① 真；② 假，空集不是 $\{1\}$ 的元素；③ 假，$\{1\}$ 是右边集合的元素而不是子集，其元素 $1$ 不在右边。

## 严格表述

外延公理：$\forall A\forall B(A=B\leftrightarrow\forall x(x\in A\leftrightarrow x\in B))$。空集公理：$\exists A\forall x(x\notin A)$。无序对公理：$\forall a\forall b\exists A\forall x(x\in A\leftrightarrow x=a\lor x=b)$。并集公理：$\forall\mathcal{F}\exists A\forall x(x\in A\leftrightarrow\exists B(B\in\mathcal{F}\land x\in B))$。幂集公理：$\forall A\exists B\forall X(X\in B\leftrightarrow X\subseteq A)$。分离公理模式：对每个公式 $P(x)$，$\forall A\exists B\forall x(x\in B\leftrightarrow x\in A\land P(x))$。由外延公理，这些公理断言的集合唯一，因此可以给它命名。
