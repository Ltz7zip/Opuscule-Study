---
slug: "interpretation-equivalence"
subject: "discrete-mathematics"
unit: "u02"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "谓词公式的解释、等价与推理"
subtitle: "同一个公式，换个世界就不一样"
minutes: 16
meta: ["阅读 16 分钟","需要 个体、谓词与量词","掌握级"]
concepts: ["predlogic", "proplogic"]
prereq: ["predlogic"]
related: ["axiomset", "set"]
---

## 本讲目标

学完这一讲，你能给一个谓词公式指定解释并算出真值，能判断哪些量词等值式成立、哪些只有单向蕴含，并能用四条量词推理规则写出证明。

三件事：解释由什么组成，量词能怎么搬动，量词推理的每一步依据什么。

## 三行回顾

- 谓词公式含有个体域、常元、函数与谓词符号，这些符号本身没有含义。
- 解释就是给它们各指派一个具体的集合、元素、函数与关系。
- 公式在解释下才有真值；换一个解释，真值可以翻转。

## 解释与真值计算

一个解释 $I=(D,I)$ 包含：非空个体域 $D$；每个个体常元指派 $D$ 中一个元素；每个 $n$ 元函数符号指派 $D^n\to D$ 的函数；每个 $n$ 元谓词符号指派 $D^n$ 上的关系，即一个真值函数。

例：取 $D=\{1,2,3\}$，$P(x)$ 指派为"$x$ 是偶数"，$Q(x)$ 指派为"$x>1$"。逐项检查：

| $x$ | $P(x)$ | $Q(x)$ | $P(x)\to Q(x)$ |
| --- | --- | --- | --- |
| 1 | F | F | T |
| 2 | T | T | T |
| 3 | F | T | T |

于是 $\forall x(P(x)\to Q(x))$ 为真，$\exists x(P(x)\land\neg Q(x))$ 为假。注意第二个式子的读法：要找一个既是偶数又不大于 1 的数，域里没有。

同一个 $\forall x(P(x)\to Q(x))$，若把 $P(x)$ 改指派为"$x>1$"、$Q(x)$ 改指派为"$x$ 是偶数"，则 $x=3$ 使前件真后件假，公式变为假。符号没变，解释变了。

## 量词等值式

量词与联结词的交换并不对称：

| 等值式 | 是否成立 |
| --- | --- |
| $\forall x(P(x)\land Q(x))\Leftrightarrow\forall xP(x)\land\forall xQ(x)$ | 成立 |
| $\exists x(P(x)\lor Q(x))\Leftrightarrow\exists xP(x)\lor\exists xQ(x)$ | 成立 |
| $\forall x(P(x)\lor Q(x))\Leftrightarrow\forall xP(x)\lor\forall xQ(x)$ | 不成立，只有 $\Leftarrow$ |
| $\exists x(P(x)\land Q(x))\Leftrightarrow\exists xP(x)\land\exists xQ(x)$ | 不成立，只有 $\Rightarrow$ |

反例都很小。取 $D=\{1,2\}$，$P(x)$ 表示 $x=1$，$Q(x)$ 表示 $x=2$。每个元素都满足 $P$ 或 $Q$，所以 $\forall x(P\lor Q)$ 为真；但 $\forall xP$ 与 $\forall xQ$ 都为假，右边为假。

另一个方向的反例：$D=\{1,2\}$，$P(x)$ 表示 $x=1$，$Q(x)$ 表示 $x=2$。$\exists xP$ 与 $\exists xQ$ 都真，但不存在同时满足两者的元素，$\exists x(P\land Q)$ 为假。

还有两条把量词和否定、蕴含连起来的等值式：

$$
\neg\forall xP(x)\Leftrightarrow\exists x\neg P(x),\qquad \forall x(P(x)\to Q(x))\Leftrightarrow\neg\exists x(P(x)\land\neg Q(x))
$$

第二式说明"所有 $P$ 都是 $Q$"与"不存在是 $P$ 却不是 $Q$ 的东西"是同一句话。这也是反证法证明全称命题的常用起点。

> [!NOTE]
> 约束变元可以改名，条件是改名后不把自由变元吸进辖域。$\forall xP(x,y)$ 与 $\forall zP(z,y)$ 等值，但与 $\forall yP(y,y)$ 不等值。

## 量词推理

四条基本规则：

| 规则 | 形式 | 限制 |
| --- | --- | --- |
| 全称例示 | $\forall xP(x)\vdash P(c)$ | $c$ 为任意个体 |
| 全称推广 | 若 $P(c)$ 对任意 $c$ 成立，则 $\vdash\forall xP(x)$ | $c$ 必须任意 |
| 存在推广 | $P(c)\vdash\exists xP(x)$ | 无 |
| 存在例示 | $\exists xP(x)\vdash P(c)$ | $c$ 必须是新常元 |

用它们证明 $\forall x(P(x)\to Q(x)),\ \exists xP(x)\vdash\exists xQ(x)$：

1. $\exists xP(x)$（前提）
2. $P(c)$（1，存在例示，$c$ 为新常元）
3. $\forall x(P(x)\to Q(x))$（前提）
4. $P(c)\to Q(c)$（3，全称例示）
5. $Q(c)$（2、4，假言推理）
6. $\exists xQ(x)$（5，存在推广）

关键是第 2 步选一个全新的 $c$：它除了"满足 $P$"之外不带任何其他信息，否则结论会超出前提。

> [!MYTH] 存在例示可以随便挑一个已知对象。
> 若挑的 $c$ 还满足其他性质，第 6 步推出的就不只是 $\exists xQ(x)$。新常元的作用是屏蔽这些额外信息。

## 三个常见误解

> [!MYTH] 全称量词对析取也分配。
> $\forall x(P\lor Q)$ 只保证每个元素至少满足一个，不保证全体统一满足某一个。反例只需两个元素。

> [!MYTH] 存在量词对合取也分配。
> $\exists xP$ 与 $\exists xQ$ 可能由不同元素见证，$\exists x(P\land Q)$ 要求同一个元素同时满足两者。

> [!MYTH] 约束变元可以随便改名。
> 改名必须避开自由变元。把 $\forall xP(x,y)$ 改成 $\forall yP(y,y)$，自由变元 $y$ 被捕获，公式含义完全变了。

## 练习

> [!PRACTICE] 1 · 算真值
> $D=\{1,2,3\}$，$P(x)$：$x<3$，$Q(x)$：$x$ 是奇数。求 $\forall x(P(x)\to Q(x))$ 与 $\exists x(P(x)\land\neg Q(x))$ 的真值。
>
> > [!ANSWER] 看答案
> > $P$ 在 $x=1,2$ 时为真。$x=2$ 不是奇数，所以全称句为假；$x=2$ 同时满足 $P$ 与非 $Q$，存在句为真。

> [!PRACTICE] 2 · 构造反例
> 用 $D=\{1,2\}$ 说明 $\exists x(P(x)\land Q(x))\not\Leftrightarrow\exists xP(x)\land\exists xQ(x)$。
>
> > [!ANSWER] 看答案
> > 令 $P(1)$ 真、$P(2)$ 假，$Q(1)$ 假、$Q(2)$ 真。两个存在句都真，但没有元素同时满足 $P$ 与 $Q$，左边为假。

> [!PRACTICE] 3 · 证明
> 用推理规则证明 $\forall x(P(x)\to Q(x)),\ \forall xP(x)\vdash\forall xQ(x)$。
>
> > [!ANSWER] 看答案
> > 任取新常元 $c$；由 $\forall xP(x)$ 得 $P(c)$，由 $\forall x(P\to Q)$ 得 $P(c)\to Q(c)$，假言推理得 $Q(c)$；$c$ 任意，全称推广得 $\forall xQ(x)$。

## 严格表述

一个解释是二元组 $(D,I)$，其中 $D\neq\varnothing$，$I$ 为每个常元指定 $D$ 中元素、为每个 $n$ 元函数符号指定 $D^n\to D$ 的映射、为每个 $n$ 元谓词符号指定 $D^n$ 的子集。项的值按 $I$ 递归求值；原子公式 $P(t_1,\dots,t_n)$ 为真当且仅当 $(t_1^I,\dots,t_n^I)\in P^I$。公式的真值按联结词与量词的语义递归定义。若公式 $A$ 在解释 $I$ 下为真，记 $I\models A$；若 $A$ 在所有解释下为真，称 $A$ 为永真式（有效式）。若 $A\leftrightarrow B$ 永真，称 $A$ 与 $B$ 等值。推理 $A_1,\dots,A_n\vdash B$ 有效，当且仅当每个使所有前提为真的解释也使 $B$ 为真。
