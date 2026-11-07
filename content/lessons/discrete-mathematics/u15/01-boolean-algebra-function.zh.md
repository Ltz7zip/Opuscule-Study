---
slug: "boolean-algebra-function"
subject: "discrete-mathematics"
unit: "u15"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 离散数学 · 专业模式"
title: "布尔代数与布尔函数"
subtitle: "把逻辑写成等式"
minutes: 15
meta: ["阅读 15 分钟","需要 命题逻辑与集合运算","掌握级"]
concepts: ["boolean", "proplogic"]
prereq: ["proplogic"]
related: ["algebra-struct", "boolean"]
---

## 本讲目标

学完这一讲，你能对照布尔代数的公理验证一个系统，能写出 $n$ 元布尔函数的真值表与析取范式，能用分配律、吸收律与 De Morgan 律把表达式变形，并知道 $n$ 元布尔函数一共有多少个。

布尔代数做的事情是把"真/假""属于/不属于""通/断"统一成同一套等式，于是逻辑推理可以像代数一样演算。

## 三行回顾

- 命题逻辑里 $\land,\lor,\lnot$ 的运算表只有四行，却满足交换、结合、分配与补余律。
- 集合的 $\cap,\cup$ 与补集有完全相同的运算规律，$0$ 对应 $\varnothing$，$1$ 对应全集。
- 把这些共同规律抽出来作为公理，得到的就是布尔代数。

## 布尔代数：一组等式

集合 $B$ 上有两个二元运算 $\lor,\land$、一元运算 $\lnot$ 与两个常元 $0,1$。若对任意 $a,b,c\in B$：

| 公理 | 形式 |
| --- | --- |
| 交换律 | $a\lor b=b\lor a$，$a\land b=b\land a$ |
| 结合律 | $(a\lor b)\lor c=a\lor(b\lor c)$，$\land$ 同理 |
| 分配律 | $a\lor(b\land c)=(a\lor b)\land(a\lor c)$，$\land$ 对 $\lor$ 同理 |
| 单位元 | $a\lor0=a$，$a\land1=a$ |
| 补余律 | $a\lor\lnot a=1$，$a\land\lnot a=0$ |

则称 $(B,\lor,\land,\lnot,0,1)$ 为**布尔代数**。两条分配律都成立，这是布尔代数区别于普通环的显著特征：在 $\mathbb{Z}$ 中 $a+(b\cdot c)\ne(a+b)(a+c)$。

最基本的模型是 $B=\{0,1\}$，$\lor$ 是"或"、$\land$ 是"与"、$\lnot$ 是"非"。另一个模型是幂集代数 $(P(S),\cup,\cap,\complement,\varnothing,S)$，其中"补"是相对于 $S$ 取补。两个模型元素完全不同，却满足同一组公理。

由公理可以推出常用的**吸收律** $a\lor(a\land b)=a$ 与 **De Morgan 律** $\lnot(a\lor b)=\lnot a\land\lnot b$。以后化简表达式时可以直接调用。

## 布尔函数与真值表

从 $\{0,1\}^n$ 到 $\{0,1\}$ 的映射称为 $n$ 元**布尔函数**。因为自变量只有 $2^n$ 种取值、每种取值对应一个输出，函数完全由真值表决定。于是 $n$ 元布尔函数的个数是

$$
2^{2^{n}}
$$

$n=1$ 时有 $4$ 个，$n=2$ 时有 $16$ 个，$n=3$ 时已有 $256$ 个。

取三变量的**多数函数**：三个输入中至少两个为 $1$ 时输出 $1$。它的表达式是

$$
f(x,y,z)=xy\lor yz\lor xz
$$

真值表如下：

| $x$ | $y$ | $z$ | $f$ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

验证一行：$x=1,y=0,z=1$ 时，$xy=0$、$yz=0$、$xz=1$，故 $f=1$，与表一致。

## 析取范式：从真值表直接写出表达式

真值表里每一个输出为 $1$ 的行，都对应一个**极小项**：该行取 $1$ 的变量取原形，取 $0$ 的变量取否定，全部用 $\land$ 连起来。把所有极小项用 $\lor$ 连接，就得到**析取范式**（DNF）。

多数函数的四个 $1$ 行是 $011,101,110,111$，对应极小项 $\lnot x\land y\land z$、$x\land\lnot y\land z$、$x\land y\land\lnot z$、$x\land y\land z$。把它们或起来是一个正确的 DNF，但它不是最简形式。用分配律与吸收律合并：

$$
\lnot xyz\lor xyz=yz,\qquad x\lnot yz\lor xyz=xz,\qquad xy\lnot z\lor xyz=xy
$$

于是得到 $f=xy\lor yz\lor xz$，从 $4$ 个三变量项压到 $3$ 个二变量项。DNF 保证存在，不保证最短；化简是另一件事。

对偶地，把输出为 $0$ 的行写成极大项再用 $\land$ 连接，得到**合取范式**（CNF）。多数函数的 CNF 是 $(x\lor y)(y\lor z)(x\lor z)$。

## 三个常见误解

> [!MYTH] 布尔代数只研究 $0$ 和 $1$。
> $\{0,1\}$ 只是最小的模型。幂集代数 $(P(S),\cup,\cap,\complement)$ 在 $|S|>1$ 时元素远多于两个，同样满足全部公理。

> [!MYTH] 布尔代数的分配律和普通代数差不多，只是写法不同。
> 布尔代数里两条分配律都成立：$a\lor(b\land c)=(a\lor b)\land(a\lor c)$ 与 $a\land(b\lor c)=(a\land b)\lor(a\land c)$。普通整数的加法对乘法不满足第一条。

> [!MYTH] 两个布尔函数只要前几行真值相同就相等。
> 相等要求 $2^n$ 行全部一致。$x$ 与 $x\lor y$ 在 $10,11$ 两行相同，在 $01$ 行就分开了：前者为 $0$，后者为 $1$。少核一行就会把两个不同的函数当成一个。

## 练习

> [!PRACTICE] 1 · 照着做
> 用真值表验证吸收律 $x\lor(x\land y)=x$。
>
> > [!ANSWER] 看答案
> > $00$：$0\lor0=0$；$01$：$0\lor0=0$；$10$：$1\lor0=1$；$11$：$1\lor1=1$。四行都与 $x$ 相同，故等式成立。

> [!PRACTICE] 2 · 变式
> 写出异或 $x\oplus y$ 的析取范式。
>
> > [!ANSWER] 看答案
> > 输出为 $1$ 的行为 $01$ 与 $10$，极小项为 $\lnot x\land y$ 与 $x\land\lnot y$，故 $x\oplus y=(\lnot x\land y)\lor(x\land\lnot y)$。

> [!PRACTICE] 3 · 迁移
> 三元布尔函数共有多少个？四元呢？
>
> > [!ANSWER] 看答案
> > 三元：$2^{2^3}=2^8=256$ 个。四元：$2^{2^4}=2^{16}=65536$ 个。增长是双指数的。

## 严格表述

布尔代数是一个六元组 $(B,\lor,\land,\lnot,0,1)$，其中 $\lor,\land$ 是 $B$ 上的二元运算，$\lnot$ 是一元运算，且对任意 $a,b,c\in B$ 满足交换律、结合律、两条分配律、单位元律 $a\lor0=a$、$a\land1=a$ 以及补余律 $a\lor\lnot a=1$、$a\land\lnot a=0$。

由此可导出幂等律 $a\lor a=a$、吸收律 $a\lor(a\land b)=a$、De Morgan 律 $\lnot(a\lor b)=\lnot a\land\lnot b$ 与对合律 $\lnot\lnot a=a$。在 $\{0,1\}$ 上，$0<1$ 使其成为二元布尔代数，且任意有限布尔代数都同构于某个幂集代数。

$n$ 元布尔函数是映射 $f:\{0,1\}^n\to\{0,1\}$，共 $2^{2^n}$ 个。每个布尔函数都能写成析取范式：对每个使 $f=1$ 的赋值取极小项 $m_i=\bigwedge_{j}(x_j\ \text{或}\ \lnot x_j)$，则 $f=\bigvee_{i:f(i)=1}m_i$。对偶地有合取范式。
