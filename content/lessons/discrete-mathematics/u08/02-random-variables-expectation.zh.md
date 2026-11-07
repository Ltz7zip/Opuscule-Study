---
slug: "random-variables-expectation"
subject: "discrete-mathematics"
unit: "u08"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "离散随机变量、期望与方差"
subtitle: "把试验结果折算成一个数"
minutes: 16
meta: ["阅读 16 分钟","需要 离散概率空间","掌握级"]
concepts: ["discprob", "counting"]
prereq: ["discprob"]
related: ["counting", "complexity"]
---

## 本讲目标

学完这一讲，你能写出离散随机变量的分布列，用分布列算期望与方差，并在信息不完整时用条件期望把问题拆成几块再拼回去。

这一讲只处理有限取值的情形，所有期望都是有限和，不涉及收敛性问题。

## 三行回顾

- 随机变量是把样本空间映射到实数的函数，它把"结果"换成"数值"。
- 分布列列出每个取值及其概率，概率总和为 $1$。
- 期望是概率加权的平均，方差衡量取值偏离期望的程度。

## 分布列与期望

设 $\Omega$ 有限，$X:\Omega\to\mathbb{R}$ 只取有限个值 $x_1,\dots,x_n$。称

$$
p_k=P(X=x_k)=P(\{\omega\in\Omega\mid X(\omega)=x_k\})
$$

为 $X$ 的分布列，它满足 $p_k\ge0$ 与 $\sum_k p_k=1$。期望定义为

$$
E(X)=\sum_{k=1}^{n}x_kp_k
$$

例：抛 3 枚公平硬币，$X$ 为正面数。四个取值的概率来自组合数 $\binom{3}{k}/8$：

| $x$ | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| $P(X=x)$ | $1/8$ | $3/8$ | $3/8$ | $1/8$ |

于是 $E(X)=0\cdot\frac18+1\cdot\frac38+2\cdot\frac38+3\cdot\frac18=\frac{12}{8}=1.5$。注意 $1.5$ 不是 $X$ 的任何一个取值，期望不必"可能发生"。

再取两枚骰子的点数和。分布列为 $p_2=p_{12}=1/36$，$p_3=p_{11}=2/36$，……，$p_7=6/36$。逐项相乘：

$$
E(X)=\frac{2+6+12+20+30+42+40+36+30+22+12}{36}=\frac{252}{36}=7
$$

期望最重要的性质是线性：对任意常数 $a,b$，

$$
E(aX+b)=aE(X)+b,\qquad E(X+Y)=E(X)+E(Y)
$$

第二式不要求 $X,Y$ 独立，因为求和可以逐项拆开。这一点使它成为"把复杂计数拆成指示变量之和"的依据。

## 方差与线性变换

期望只描述位置，不描述分散程度。方差定义为

$$
\operatorname{Var}(X)=E\bigl[(X-E(X))^2\bigr]=E(X^2)-\bigl[E(X)\bigr]^2
$$

第二个等号由展开 $(X-\mu)^2=X^2-2\mu X+\mu^2$ 并取期望得到，计算时通常更快。

两枚骰子的例子：$E(X^2)=\frac{1974}{36}\approx54.83$，故

$$
\operatorname{Var}(X)=\frac{1974}{36}-49=\frac{35}{6}\approx5.83
$$

3 枚硬币的例子：$E(X^2)=0\cdot\frac18+1\cdot\frac38+4\cdot\frac38+9\cdot\frac18=3$，故 $\operatorname{Var}(X)=3-2.25=0.75$。

| 随机变量 | $E(X)$ | $E(X^2)$ | $\operatorname{Var}(X)$ |
| --- | --- | --- | --- |
| 3 枚硬币的正面数 | $1.5$ | $3$ | $0.75$ |
| 两枚骰子的点数和 | $7$ | $1974/36$ | $35/6$ |
| 一枚骰子的点数 | $3.5$ | $91/6$ | $35/12$ |

方差对线性变换的响应是平方：$\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$。平移不改变分散程度，放大 $a$ 倍则偏差也放大 $a$ 倍，平方后是 $a^2$。

> [!NOTE]
> 方差相加需要条件：$\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$。只有当 $X,Y$ 不相关（独立是充分条件）时协方差项才消失。

## 条件期望

已知事件 $B$ 发生（$P(B)>0$），定义

$$
E(X\mid B)=\sum_k x_k\,P(X=x_k\mid B)
$$

它就是把分布列换成条件分布列后的期望。

例：两枚骰子，$X$ 为点数和，$B$ 为"第一枚是 6"。在 $B$ 下第二枚仍均匀，故

$$
E(X\mid B)=6+3.5=9.5
$$

而 $B$ 不发生时第一枚在 $1,\dots,5$ 中均匀，均值是 $3$，所以 $E(X\mid\overline B)=3+3.5=6.5$。按全期望公式汇总：

$$
E(X)=9.5\cdot\frac16+6.5\cdot\frac56=\frac{9.5+32.5}{6}=7
$$

与直接计算一致。全期望公式的一般形式是：若 $\{B_i\}$ 是 $\Omega$ 的划分，则 $E(X)=\sum_iE(X\mid B_i)P(B_i)$。它的用处在于把"整体平均"换成"分情况平均再加权"，每种情况内部往往更好算。

若把条件换成另一个随机变量 $Y$，$E(X\mid Y)$ 本身也是随机变量：当 $Y=y$ 时取 $E(X\mid Y=y)$。对它再取一次期望，仍得到 $E(X)$。

## 三个常见误解

> [!MYTH] 期望一定是随机变量能取到的值。
> 3 枚硬币的期望是 $1.5$，而正面数只能是 $0,1,2,3$。期望是加权平均，可以落在取值之间。

> [!MYTH] $E(XY)=E(X)E(Y)$ 总是成立。
> 它只在不相关时成立。掷一枚骰子，$X$ 为点数、$Y=X^2$，则 $E(XY)=E(X^3)=\frac{441}{6}=73.5$，而 $E(X)E(Y)=3.5\times\frac{91}{6}\approx53.08$，相差很远。

> [!MYTH] 方差可以直接相加。
> 一般要加上 $2\operatorname{Cov}(X,Y)$。两枚骰子的点数和方差是 $35/6$，恰好等于两个 $35/12$ 相加，那是因为两枚骰子独立；换成同向联动的两个量就不成立。

## 练习

> [!PRACTICE] 1 · 一枚骰子
> $X$ 为掷一枚公平骰子的点数，求 $E(X)$ 与 $\operatorname{Var}(X)$。
>
> > [!ANSWER] 看答案
> > $E(X)=\frac{1+2+3+4+5+6}{6}=3.5$；$E(X^2)=\frac{1+4+9+16+25+36}{6}=\frac{91}{6}$；$\operatorname{Var}(X)=\frac{91}{6}-\frac{49}{4}=\frac{35}{12}\approx2.92$。

> [!PRACTICE] 2 · 带赔率的游戏
> 某游戏赢 $10$ 元的概率为 $0.2$，输 $2$ 元的概率为 $0.8$。求每次的期望收益。
>
> > [!ANSWER] 看答案
> > $E=10\times0.2+(-2)\times0.8=2-1.6=0.4$ 元。期望为正不代表每局都赢，它只说明长期平均。

> [!PRACTICE] 3 · 条件期望
> 掷两枚骰子，已知点数和大于 $9$，求点数和的条件期望。
>
> > [!ANSWER] 看答案
> > 和为 $10,11,12$ 的方案数分别是 $3,2,1$，共 $6$ 种等可能。$E=\frac{10\times3+11\times2+12\times1}{6}=\frac{64}{6}=\frac{32}{3}\approx10.67$。

## 严格表述

设 $(\Omega,\mathcal{F},P)$ 为有限概率空间，$X:\Omega\to\mathbb{R}$ 为随机变量，取值 $x_1,\dots,x_n$，分布列 $p_k=P(X=x_k)$。期望 $E(X)=\sum_k x_kp_k$，它对有限和总存在。期望是线性泛函：$E(aX+bY)=aE(X)+bE(Y)$。方差 $\operatorname{Var}(X)=E(X^2)-E(X)^2\ge0$，且 $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$。对 $P(B)>0$，条件期望 $E(X\mid B)=\sum_kx_kP(X=x_k\mid B)$；若 $\{B_i\}$ 为 $\Omega$ 的有限划分且 $P(B_i)>0$，全期望公式成立：$E(X)=\sum_iE(X\mid B_i)P(B_i)$。若 $X,Y$ 独立，则 $E(XY)=E(X)E(Y)$，从而协方差为零、方差可加。