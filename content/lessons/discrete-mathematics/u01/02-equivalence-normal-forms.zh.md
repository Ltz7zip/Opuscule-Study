---
slug: "equivalence-normal-forms"
subject: "discrete-mathematics"
unit: "u01"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "等值演算、范式与推理理论"
subtitle: "把「看起来不同」变成「确实相同」"
minutes: 15
meta: ["阅读 15 分钟","需要 命题与真值表","掌握级"]
concepts: ["proplogic", "disc"]
prereq: ["proplogic"]
related: ["predlogic", "axiomset"]
---

## 本讲目标

学完这一讲，你能用等值式把一个公式化简，能写出它的主析取范式与主合取范式，并能用推理规则证明一个论证形式有效。

三件事：哪些改写是合法的，怎样把公式化成标准形，以及"前提推出结论"到底在断言什么。

## 三行回顾

- 两个公式等值，指它们在所有赋值下真值相同，记作 $A\Leftrightarrow B$。
- 等值式可以逐条替换，替换不改变真值，于是能像代数一样化简。
- 推理有效，指前提全真时结论不可能为假。

## 等值式与演算

常用的等值式不多，但必须熟到不用查表：

| 名称 | 等值式 |
| --- | --- |
| 双重否定 | $\neg\neg p\Leftrightarrow p$ |
| De Morgan 律 | $\neg(p\land q)\Leftrightarrow\neg p\lor\neg q$；$\neg(p\lor q)\Leftrightarrow\neg p\land\neg q$ |
| 分配律 | $p\land(q\lor r)\Leftrightarrow(p\land q)\lor(p\land r)$；$p\lor(q\land r)\Leftrightarrow(p\lor q)\land(p\lor r)$ |
| 蕴含等值式 | $p\to q\Leftrightarrow\neg p\lor q$ |
| 假言易位 | $p\to q\Leftrightarrow\neg q\to\neg p$ |
| 等价等值式 | $p\leftrightarrow q\Leftrightarrow(p\to q)\land(q\to p)$ |
| 吸收律 | $p\lor(p\land q)\Leftrightarrow p$；$p\land(p\lor q)\Leftrightarrow p$ |

演算的做法是"找形状、套等值式、继续化简"。例如化简 $\neg(\neg p\lor q)\lor(p\land q)$：

$$
\neg(\neg p\lor q)\lor(p\land q)\Leftrightarrow(p\land\neg q)\lor(p\land q)\Leftrightarrow p\land(\neg q\lor q)\Leftrightarrow p
$$

第一步用 De Morgan 律，第二步提取公因子 $p$，第三步用排中律 $\neg q\lor q\Leftrightarrow T$ 与同一律。三步都是等价替换，所以原式与 $p$ 等值。

> [!NOTE]
> 演算时每一步都要能说出用了哪条等值式。说不出来，通常意味着这一步只是"看起来对"。

## 范式与主范式

析取范式是若干合取式的析取，合取范式是若干析取式的合取。它们不唯一：$p$ 可以写成 $p$，也可以写成 $p\land(q\lor\neg q)$。

主范式把"不唯一"消掉。$n$ 个变元共有 $2^n$ 个极小项，每个极小项是全部变元各出现一次的合取，且在每个赋值下恰好有一个极小项为真。把公式为真的那些行对应的极小项析取起来，就得到唯一的主析取范式。

以 $p\to q$ 为例：

| 赋值 | 极小项 | $p\to q$ |
| --- | --- | --- |
| $p=T,q=T$ | $p\land q$ | T |
| $p=T,q=F$ | $p\land\neg q$ | F |
| $p=F,q=T$ | $\neg p\land q$ | T |
| $p=F,q=F$ | $\neg p\land\neg q$ | T |

为真的三行对应 $m_3,m_1,m_0$，所以

$$
p\to q\Leftrightarrow(\neg p\land\neg q)\lor(\neg p\land q)\lor(p\land q)
$$

主合取范式则由为假的行决定：只有 $p=T,q=F$ 一行，对应的极大项是 $\neg p\lor q$，恰好就是 $p\to q$ 本身。同一公式的主析取范式与主合取范式描述同一张真值表，只是分别从"真行"和"假行"入手。

## 推理理论

推理形式从前提 $A_1,\dots,A_n$ 推出结论 $B$，记作 $A_1,\dots,A_n\vdash B$。它有效，当且仅当蕴含式

$$
(A_1\land\cdots\land A_n)\to B
$$

是重言式。注意这里断言的是"前提真时结论必真"，不断言前提真的成立。

常用的推理规则：

| 规则 | 形式 |
| --- | --- |
| 假言推理 | $p,\ p\to q\ \vdash\ q$ |
| 拒取式 | $\neg q,\ p\to q\ \vdash\ \neg p$ |
| 假言三段论 | $p\to q,\ q\to r\ \vdash\ p\to r$ |
| 析取三段论 | $p\lor q,\ \neg p\ \vdash\ q$ |

一个具体证明：前提为 $p\to q$、$q\to r$、$p$，结论为 $r$。

1. $p$（前提）
2. $p\to q$（前提）
3. $q$（1、2 假言推理）
4. $q\to r$（前提）
5. $r$（3、4 假言推理）

如果结论是蕴含式，还可以用附加前提法：把结论的前件临时当前提，推出后件后再收回。例如证 $p\to(q\to r)$、$p$、$q\vdash r$，把 $q$ 之外的 $p$ 先用假言推理得到 $q\to r$，再与 $q$ 做假言推理得到 $r$。

> [!MYTH] 前提是假的，这个推理就无效。
> 有效性只问"前提真时结论会不会假"。前提事实上为假，推理仍可能有效，只是得不出可用的结论。

## 三个常见误解

> [!MYTH] 原命题与逆命题等值。
> $p\to q$ 只与逆否命题 $\neg q\to\neg p$ 等值。逆命题 $q\to p$ 与否命题 $\neg p\to\neg q$ 彼此等值，但一般不等于原命题。

> [!MYTH] 一个公式的析取范式只有一种。
> 一般的析取范式、合取范式都不唯一；唯一的是一直化到极小项或极大项的主范式。

> [!MYTH] 范式只能用来做题。
> 主析取范式给出公式为真的全部赋值，等价于一张压缩的真值表，也是判定等值、可满足性的标准手段。

## 练习

> [!PRACTICE] 1 · 演算
> 用等值演算证明 $\neg(p\to q)\Leftrightarrow p\land\neg q$。
>
> > [!ANSWER] 看答案
> > $\neg(p\to q)\Leftrightarrow\neg(\neg p\lor q)\Leftrightarrow\neg\neg p\land\neg q\Leftrightarrow p\land\neg q$，依次用了蕴含等值式、De Morgan 律、双重否定律。

> [!PRACTICE] 2 · 主范式
> 求 $p\lor(q\land\neg p)$ 的主析取范式。
>
> > [!ANSWER] 看答案
> > 补全缺失变元：$p\Leftrightarrow(p\land q)\lor(p\land\neg q)$，$q\land\neg p$ 已是极小项。结果为 $m_1\lor m_2\lor m_3$，即 $(\neg p\land q)\lor(p\land\neg q)\lor(p\land q)$。

> [!PRACTICE] 3 · 推理
> 前提为 $p\to q$ 与 $\neg q$，能推出什么？用了哪条规则？
>
> > [!ANSWER] 看答案
> > 推出 $\neg p$，用的是拒取式。它本质上是假言推理作用在逆否命题 $\neg q\to\neg p$ 上。

## 严格表述

设 $A,B$ 为命题公式。若对每个赋值 $v$ 都有 $v(A)=v(B)$，称 $A$ 与 $B$ 等值，记 $A\Leftrightarrow B$。等值关系是公式集上的等价关系，且对替换封闭：若 $A\Leftrightarrow B$，则把 $A$ 在公式 $C$ 中的出现替换为 $B$ 所得公式与 $C$ 等值。含 $n$ 个变元的极小项是 $m_i=\bigwedge_{j=1}^{n}L_j$，其中 $L_j=p_j$ 或 $\neg p_j$，由下标 $i$ 的二进制位唯一决定；任一公式 $A$ 等值于其所有成真赋值对应极小项的析取，这就是 $A$ 的主析取范式，且在同构意义下唯一。推理形式 $A_1,\dots,A_n\vdash B$ 有效，当且仅当 $(A_1\land\cdots\land A_n)\to B$ 是重言式。
