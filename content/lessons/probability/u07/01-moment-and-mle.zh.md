---
slug: "moment-and-mle"
subject: "probability"
unit: "u07"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 概率论与数理统计 · 专业模式"
title: "矩估计与极大似然估计"
subtitle: "两条路，同一目标：从数据反推参数"
minutes: 17
meta: ["阅读 17 分钟","需要 三大抽样分布","掌握级"]
concepts: ["estimation", "expectation", "calc"]
prereq: ["sampling"]
related: ["estimation", "hypothesistest"]
---

## 本讲目标

学完这一讲，你能对给定分布写出矩估计量与极大似然估计量，会求对数似然的驻点，并说清楚两个估计量为什么不总相同。

参数估计回答的是：分布的形状已知，只有几个参数不认识，怎么用样本把它们定下来。

## 三行回顾

- 矩估计令样本矩等于总体矩，解方程得到参数。
- 极大似然找使观测数据出现概率最大的参数值。
- 评价估计量看三条：无偏性、相合性、有效性（方差小）。

## 矩估计

若总体有 $k$ 个未知参数，就令前 $k$ 阶样本矩等于总体矩：

$$
\frac1n\sum_{i=1}^nX_i^j=E_\theta[X^j],\qquad j=1,\dots,k
$$

解这个方程组即得 $\hat\theta$。它的优点是几乎不需要计算，缺点是浪费信息、且不保证落在参数空间内。

例如总体均值 $\mu$ 与方差 $\sigma^2$ 都未知时，矩估计给出

$$
\hat\mu=\bar X,\qquad \hat\sigma^2=\frac1n\sum(X_i-\bar X)^2
$$

注意第二个用的是 $n$ 而不是 $n-1$，所以矩估计的方差估计是有偏的。

## 极大似然估计

似然函数把数据看作参数的函数：

$$
L(\theta)=\prod_{i=1}^n f(x_i;\theta),\qquad \ell(\theta)=\ln L(\theta)=\sum_{i=1}^n\ln f(x_i;\theta)
$$

取对数把乘积变成求和，驻点由 $\ell'(\theta)=0$ 给出。若 $\ell$ 严格凹，驻点即最大值点。离散情形把密度换成概率质量函数即可。

| 分布 | 参数 | 矩估计 | 极大似然估计 |
| --- | --- | --- | --- |
| $N(\mu,\sigma^2)$ | $\mu,\sigma^2$ | $\bar X,\ \frac1n\sum(X_i-\bar X)^2$ | $\bar X,\ \frac1n\sum(X_i-\bar X)^2$ |
| $\mathrm{Exp}(\lambda)$ | $\lambda$ | $1/\bar X$ | $1/\bar X$ |
| $U(0,\theta)$ | $\theta$ | $2\bar X$ | $\max X_i$ |
| $\mathrm{Ber}(p)$ | $p$ | $\bar X$ | $\bar X$ |

均匀分布这一行最能说明差别：矩估计给出 $2\bar X$，可能小于样本最大值而成为不可能的取值；极大似然给出 $\max X_i$，一定合法，但系统性偏小。

## 两个算得出来的例子

**例一：正态。** 样本 $2,4,4,6,9$。$\bar x=5$，离差平方和 $28$。

$$
\hat\mu=5,\qquad \hat\sigma^2_{\mathrm{MLE}}=\frac{28}{5}=5.6,\qquad s^2=\frac{28}{4}=7
$$

极大似然低估约 $20\%$，$n=5$ 时不可忽视。用 $n-1$ 修正后才是无偏的。

**例二：指数分布。** 观测 $0.5,1,1.5$，$\bar x=1$。似然为

$$
L(\lambda)=\lambda^3e^{-\lambda(0.5+1+1.5)}=\lambda^3e^{-3\lambda}
$$

求导：$3/\lambda-3=0$，得 $\hat\lambda=1$，恰好等于 $1/\bar x$。二阶导在 $\lambda=1$ 处为 $-3<0$，确认是最大值。

> [!MYTH] 极大似然估计一定无偏。
> 恰恰相反，$\hat\sigma^2_{\mathrm{MLE}}$ 与 $U(0,\theta)$ 的 $\max X_i$ 都有偏。极大似然保证的是相合性与渐近有效性，不是有限样本的无偏。

> [!NOTE]
> 极大似然有不变性：若 $\hat\theta$ 是 $\theta$ 的极大似然估计，则 $g(\hat\theta)$ 是 $g(\theta)$ 的极大似然估计。这让 $\hat\sigma=\sqrt{\hat\sigma^2}$ 无需重新推导。

## 三个常见误解

> [!MYTH] 两种方法结果总是一样。
> 正态与指数分布下确实重合，但均匀分布、混合模型等处差别很大。重合是特例而非规律。

> [!MYTH] 似然越大说明模型越好。
> 似然是参数的函数，不同模型、不同数据集的似然不可直接比较。比较模型要看信息准则或似然比。

> [!MYTH] 矩估计因为简单所以不严谨。
> 它满足相合性（在矩存在的条件下），只是效率通常低于极大似然。简单并不等于错。

## 练习

> [!PRACTICE] 1 · 照着做
> 样本 $1,2,3,4$ 来自均值为 $\theta$ 的泊松分布，求 $\theta$ 的极大似然估计。
>
> > [!ANSWER] 看答案
> > $\ell(\theta)=-4\theta+\ln\theta\sum x_i$，得 $\hat\theta=\bar x=2.5$。

> [!PRACTICE] 2 · 变式
> 样本 $0.2,0.4,0.6$ 来自 $U(0,\theta)$，求 $\theta$ 的矩估计与极大似然估计。
>
> > [!ANSWER] 看答案
> > $\bar x=0.4$，矩估计 $2\bar x=0.8$；极大似然为 $\max=0.6$。前者可能小于 0.6 而不可行。

> [!PRACTICE] 3 · 迁移
> 证明 $U(0,\theta)$ 的 $\hat\theta=\max X_i$ 的期望为 $\frac{n}{n+1}\theta$，并给出无偏修正。
>
> > [!ANSWER] 看答案
> > 最大值的分布为 $F(t)=(t/\theta)^n$，密度 $nt^{n-1}/\theta^n$，故 $E=\int_0^\theta tn t^{n-1}/\theta^n\,dt=\frac{n}{n+1}\theta$。乘以 $\frac{n+1}{n}$ 即无偏。

## 严格表述

设样本来自密度族 $\{f(\cdot;\theta):\theta\in\Theta\}$。极大似然估计 $\hat\theta$ 满足 $L(\hat\theta)=\sup_{\theta\in\Theta}L(\theta)$。在正则条件下（支撑集不依赖 $\theta$、对数似然三阶可导、Fisher 信息 $I(\theta)$ 有限正定），极大似然估计相合且渐近正态：$\sqrt n(\hat\theta-\theta)\Rightarrow N(0,I(\theta)^{-1})$，达到 Cramér–Rao 下界，因而是渐近有效的。矩估计 $\hat\theta$ 由 $\bar{g(X)}=E_\theta[g(X)]$ 定义，由大数定律相合，由中心极限定理渐近正态，但方差一般大于 $I(\theta)^{-1}$。
