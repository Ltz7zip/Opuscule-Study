---
slug: "boolean-simplification"
subject: "discrete-mathematics"
unit: "u15"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "布尔表达式化简与逻辑电路"
subtitle: "少一个门，少一份延迟"
minutes: 16
meta: ["阅读 16 分钟","需要 布尔代数与真值表","掌握级"]
concepts: ["boolean", "disc"]
prereq: ["boolean"]
related: ["proplogic", "complexity"]
---

## 本讲目标

学完这一讲，你能用代数等式把布尔表达式化简，能在 Karnaugh 图上圈出相邻的 $1$ 并读出化简结果，能把表达式翻译成与或非门电路并数出门数与深度，还能说明为什么只用与非门也能搭出任何电路。

化简的目标很具体：用更少的文字面量和更少的门，实现同一张真值表。

## 三行回顾

- 布尔函数由真值表唯一确定，表达式只是它的一种写法，写法可以不唯一。
- 补余律 $a\lor\lnot a=1$、$a\land\lnot a=0$ 是合并项的钥匙。
- 与或两级结构对应"先乘后加"，任何 DNF 都能直接画成这种电路。

## 代数化简：三条最常用的等式

化简靠的是把变量"消掉"。三组等式覆盖了大多数手算场景：

| 名称 | 等式 | 作用 |
| --- | --- | --- |
| 合并 | $xy\lor x\lnot y=x$ | 消去一个变量 |
| 吸收 | $x\lor xy=x$ | 吞掉多余项 |
| De Morgan | $\lnot(x\lor y)=\lnot x\land\lnot y$ | 把或变成与 |

看一个例子：

$$
f=xy\lor x\lnot y\lor \lnot x\,y
$$

前两项用合并律：$xy\lor x\lnot y=x(y\lor\lnot y)=x$。式子变成 $x\lor\lnot x\,y$。再用分配律反向展开：

$$
x\lor\lnot x\,y=(x\lor\lnot x)(x\lor y)=1\cdot(x\lor y)=x\lor y
$$

所以 $f=x\lor y$。用真值表核对：$f$ 在 $01,10,11$ 三行为 $1$，正是"或"。原式 $3$ 个二变量项、$5$ 个文字面量，化简后 $2$ 个文字面量，门数从 $3$ 个与门加 $2$ 个或门降到 $1$ 个或门。

## Karnaugh 图：把相邻项圈起来

$n$ 变量的 Karnaugh 图有 $2^n$ 个格子，按格雷码排列，使相邻格子只差一个变量。圈住相邻的 $1$，被圈住的格子里取值不变的变量保留，变化的变量消去。

三变量图的行是 $x$，列按 $yz=00,01,11,10$ 排列。画 $f=\sum m(0,1,4,5)$，即 $000,001,100,101$ 四格为 $1$：

| $x\backslash yz$ | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 |

四个 $1$ 组成一个 $2\times2$ 方块。块内 $x$ 从 $0$ 变到 $1$，$z$ 从 $0$ 变到 $1$，两者都在变；只有 $y$ 始终为 $0$。所以 $f=\lnot y$。

再看 $f=\sum m(1,3,5,7)$，即 $001,011,101,111$：

| $x\backslash yz$ | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |

中间两列全为 $1$，$z$ 恒为 $1$，$x$ 与 $y$ 都在变，故 $f=z$。四个极小项压缩成一个文字面量。

圈法有两条规矩：圈的大小必须是 $2$ 的幂，圈可以跨边界卷绕（最左列与最右列相邻），圈越大项越短。每个 $1$ 至少被一个圈覆盖，圈可以重叠。

## 从表达式到电路

与或表达式直接对应两级电路：每个乘积项一个与门，最后用一个或门汇总。以多数函数 $f=xy\lor yz\lor xz$ 为例，需要 $3$ 个二输入与门和 $1$ 个三输入或门。

| 实现方式 | 门数 | 深度 |
| --- | --- | --- |
| 未化简 DNF（$4$ 个三变量极小项） | $4$ 个三输入与门 + $1$ 个四输入或门 = $5$ | 2 |
| 化简后 $xy\lor yz\lor xz$ | $3$ 个与门 + $1$ 个或门 = $4$ | 2 |
| 异或的与非门实现 | $4$ 个与非门 | 3 |

门数少不代表一定快：化简成两级与或后，信号要穿过两级门；而多级分解可能门数略多、深度更小。工程上还要看扇入限制与布线。

**与非门是通用门**：$\lnot x=x\uparrow x$，$x\land y=\lnot(x\uparrow y)$，$x\lor y=(\lnot x)\uparrow(\lnot y)$。因此只用与非门就能搭出任何布尔函数。异或的标准四门写法是

$$
x\oplus y=\bigl(x\uparrow(x\uparrow y)\bigr)\uparrow\bigl(y\uparrow(x\uparrow y)\bigr)
$$

令 $n=x\uparrow y=\lnot(xy)$，则 $x\uparrow n=\lnot(x\lnot(xy))=\lnot(x\lnot y)$，$y\uparrow n=\lnot(y\lnot x)$，两者再与非即得 $x\lnot y\lor y\lnot x$。

## 三个常见误解

> [!MYTH] 化简只是让表达式看起来短一些。
> 每个文字面量都对应门与连线。化简直接减少门数、面积与动态功耗，也常常缩短关键路径。

> [!MYTH] 每个布尔函数都有唯一的最简表达式。
> 最简式通常不唯一。$f=xy\lor\lnot x z$ 与 $f=xy\lor\lnot x z\lor yz$ 等价，而不同的圈法会给出不同的最小与或式。

> [!MYTH] 逻辑电路只能用与门、或门、非门搭建。
> 与非门单独就是通用的，或非门同样通用。芯片上常大量使用与非门，就是为了只刻一种门。

## 练习

> [!PRACTICE] 1 · 照着做
> 化简 $\lnot x\,y\lor xy$。
>
> > [!ANSWER] 看答案
> > 提取公因子：$y(\lnot x\lor x)=y\cdot1=y$。对应真值表：只要 $y=1$ 输出就是 $1$，与 $x$ 无关。

> [!PRACTICE] 2 · 变式
> 用 Karnaugh 图化简 $f=\sum m(0,2,4,6)$。
>
> > [!ANSWER] 看答案
> > 这四个极小项都满足 $z=0$，且 $x,y$ 取遍四种组合，故 $f=\lnot z$。图上表现为 $z=0$ 的两列全为 $1$。

> [!PRACTICE] 3 · 迁移
> 用 De Morgan 律改写 $\lnot(xy\lor z)$。
>
> > [!ANSWER] 看答案
> > $\lnot(xy\lor z)=\lnot(xy)\land\lnot z=(\lnot x\lor\lnot y)\land\lnot z$。结果是一个合取范式，可直接用或非门与与门实现。

## 严格表述

设 $f:\{0,1\}^n\to\{0,1\}$。其极小项 $m_i$ 对应赋值 $i$，在 $i$ 处取 $1$、其余处取 $0$；规范析取范式为 $f=\bigvee_{i:f(i)=1}m_i$。若两个极小项只有一个变量取补不同，则它们可合并为一项并消去该变量：

$$
x\,g\lor\lnot x\,g=g
$$

反复应用此规则即得 Karnaugh 图上的圈合并，圈的大小为 $2^{k}$ 时消去 $k$ 个变量。

与或表达式 $f=\bigvee_{j}\bigwedge_{k}\ell_{jk}$（$\ell_{jk}$ 为文字面量）可由两级电路实现：第一级是与门阵列，第二级是一个或门。门数等于乘积项个数加 $1$（不计反相器），深度为 $2$。与非门 $x\uparrow y=\lnot(x\land y)$ 功能完备：$\lnot x=x\uparrow x$，$x\land y=\lnot(x\uparrow y)$，$x\lor y=(\lnot x)\uparrow(\lnot y)$，故任一布尔函数都可由与非门网络实现。
