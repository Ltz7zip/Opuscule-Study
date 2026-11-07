---
slug: "variance-covariance-correlation"
subject: "probability"
unit: "u04"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "方差、协方差与相关系数"
subtitle: "两个数刻画波动，一个数刻画线性关系"
minutes: 16
meta: ["阅读 16 分钟","需要 数学期望","掌握级"]
concepts: ["variance", "expectation", "jointdist"]
prereq: ["expectation"]
related: ["clt", "regression"]
---

## 本讲目标

学完这一讲，你能用 $E[X^2]-E[X]^2$ 算方差，用协方差判断两个变量同向还是反向变动，并说清楚相关系数 $\pm1$ 意味着什么。

期望回答"中心在哪"，方差回答"离中心多远"，协方差回答"两个变量是否一起偏"。

## 三行回顾

- $\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2$，标准差是它的算术平方根。
- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$，$X=Y$ 时退化为方差。
- 相关系数 $\rho=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ 落在 $[-1,1]$，只衡量线性关系。

## 方差与标准差

方差是"偏离均值距离的平方的期望"。平方让正负偏差都贡献正值，也放大了大偏差的权重。

展开平方即可得到计算式：

$$
\operatorname{Var}(X)=E[X^2]-2E[X]E[X]+E[X]^2=E[X^2]-E[X]^2
$$

方差有两个常用性质：

$$
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X),\qquad \operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)
$$

平移不改变波动，所以 $b$ 消失；缩放按平方放大，所以系数 $1$ 变成 $a^2$。若 $X,Y$ 独立，协方差为 0，方差可以直接相加。

## 协方差与相关系数

协方差的定义与计算式：

$$
\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])]=E[XY]-E[X]E[Y]
$$

当 $X$ 偏大时 $Y$ 也偏大，乘积多为正，协方差为正；反向变动则为负。但协方差带着量纲，换个单位数值就变，所以再标准化：

$$
\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}
$$

| 量 | 公式 | 取值范围 |
| --- | --- | --- |
| 方差 | $E[X^2]-E[X]^2$ | $[0,+\infty)$ |
| 协方差 | $E[XY]-E[X]E[Y]$ | $(-\infty,+\infty)$ |
| 相关系数 | $\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ | $[-1,1]$ |
| 独立 | $f(x,y)=f_X(x)f_Y(y)$ | 推出 $\rho=0$ |

$\rho=\pm1$ 当且仅当 $Y=aX+b$ 几乎必然成立（$a\ne0$），即两者严格线性相关。$\rho=0$ 只说明没有线性关系，不能推出独立。

## 一个联合表例子

| $X\backslash Y$ | 0 | 1 |
| --- | --- | --- |
| 0 | 0.3 | 0.2 |
| 1 | 0.2 | 0.3 |

两个边缘都是 $(0.5,0.5)$，所以 $E[X]=E[Y]=0.5$，$E[X^2]=0.5$，$\operatorname{Var}(X)=0.5-0.25=0.25$，标准差 $0.5$。同理 $Y$ 的方差也是 $0.25$。

$$
E[XY]=1\cdot1\cdot0.3=0.3
$$

$$
\operatorname{Cov}(X,Y)=0.3-0.5\times0.5=0.05,\qquad \rho=\frac{0.05}{0.5\times0.5}=0.2
$$

两者正相关但不强。若令 $W=2X+3$，则 $\operatorname{Var}(W)=4\times0.25=1$，$\operatorname{Cov}(W,Y)=2\times0.05=0.1$。

> [!MYTH] 相关系数为 0 就是独立。
> 只有联合正态等特殊情形才等价。取 $X\sim U(-1,1)$、$Y=X^2$，$\operatorname{Cov}(X,Y)=E[X^3]=0$，但 $Y$ 完全由 $X$ 决定。

> [!NOTE]
> 相关系数衡量线性关联的强度和方向。非线性单调关系（如 $Y=e^X$）的 $\rho$ 可能很小，尽管两者高度依赖。

## 三个常见误解

> [!MYTH] 方差可以直接相加，不管是否独立。
> 一般要加 $2\operatorname{Cov}(X,Y)$。只有协方差为 0 时才能省略。

> [!MYTH] 方差越大，期望越大。
> 两者描述不同侧面。方差可以很大而期望为 0，也可以方差为 0 而期望任意。

> [!MYTH] 标准差和方差可以互换使用。
> 方差单位是原单位的平方，标准差才与原数据同量纲。做区间、误差报告时用标准差。

## 练习

> [!PRACTICE] 1 · 照着做
> $X$ 的分布为 $P(0)=0.2$，$P(1)=0.5$，$P(2)=0.3$，求方差。
>
> > [!ANSWER] 看答案
> > $E[X]=1.1$，$E[X^2]=1.7$，$\operatorname{Var}(X)=1.7-1.21=0.49$。

> [!PRACTICE] 2 · 变式
> 上题中令 $Y=2X-1$，求 $E[Y]$ 与 $\operatorname{Var}(Y)$。
>
> > [!ANSWER] 看答案
> > $E[Y]=2(1.1)-1=1.2$，$\operatorname{Var}(Y)=4\times0.49=1.96$。

> [!PRACTICE] 3 · 迁移
> $\operatorname{Var}(X)=4$，$\operatorname{Var}(Y)=9$，$\rho=0.5$，求 $\operatorname{Var}(X+Y)$。
>
> > [!ANSWER] 看答案
> > $\operatorname{Cov}=0.5\times2\times3=3$，故 $\operatorname{Var}(X+Y)=4+9+6=19$。

## 严格表述

设 $E[X^2]<\infty$，$E[Y^2]<\infty$。方差 $\operatorname{Var}(X)=E[(X-E[X])^2]$ 有限，且由柯西—施瓦茨不等式 $|\operatorname{Cov}(X,Y)|\le\sigma_X\sigma_Y$，故 $|\rho|\le1$。等号成立当且仅当 $Y-E[Y]=c(X-E[X])$ 几乎必然成立。协方差是双线性型，对应半正定矩阵；$\operatorname{Var}(\sum_i a_iX_i)=\sum_{i,j}a_ia_j\operatorname{Cov}(X_i,X_j)$。
