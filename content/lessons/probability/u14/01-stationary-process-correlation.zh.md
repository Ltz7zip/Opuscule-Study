---
slug: "stationary-process-correlation"
subject: "probability"
unit: "u14"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 概率论与数理统计 · 专业模式"
title: "平稳过程的定义与相关函数"
subtitle: "用一条样本轨道估计整族随机变量"
minutes: 15
meta: ["阅读 15 分钟","需要 期望与方差","掌握级"]
concepts: ["timeseries", "variance", "expectation"]
prereq: ["variance", "jointdist"]
related: ["markov", "regression"]
---

## 本讲目标

学完这一讲，你能区分严平稳与宽平稳，写出并验证自相关函数的四条性质，并说明遍历性为什么是"用时间平均代替集合平均"的依据。

随机过程在每个时刻都是一个随机变量。平稳性假设把这些变量之间的关系统一成"只与时间差有关"，从而把无穷多个参数压缩成一个函数。

## 三行回顾

- 严平稳：任意有限维联合分布对时间平移不变。
- 宽平稳：均值恒定、方差有限，协方差只依赖时间差 $\tau$。
- 自相关函数 $\rho(\tau)=R(\tau)/R(0)$ 满足偶函数、$\rho(0)=1$、$\lvert\rho\rvert\le1$。

## 严平稳与宽平稳

设 $\{X_t,\,t\in\mathbb R\}$（或 $t\in\mathbb Z$）为随机过程。若对任意 $n$、任意 $t_1,\dots,t_n$ 与任意 $h$，$(X_{t_1},\dots,X_{t_n})$ 与 $(X_{t_1+h},\dots,X_{t_n+h})$ 同分布，称过程严平稳。这个条件很强：它约束了所有阶的联合分布。

宽平稳只要求前两阶矩：

$$
E[X_t]=\mu\quad(\text{与 }t\text{ 无关}),\qquad
\operatorname{Cov}(X_t,X_{t+\tau})=R(\tau)\quad(\text{只与 }\tau\text{ 有关}).
$$

| 条件 | 严平稳 | 宽平稳 |
| --- | --- | --- |
| 均值 | 自动恒定 | 必须恒定 |
| 方差 | 自动有限且恒定 | 必须有限且恒定 |
| 协方差 | 由联合分布决定 | 只依赖 $\tau$ |
| 高斯过程 | 严平稳 $\Leftrightarrow$ 宽平稳 | 同左 |

二阶矩过程里，宽平稳是更常用的假设，因为它只需要均值和协方差，而这两者可以从数据估计。

## 自相关函数的性质

记 $R(\tau)=\operatorname{Cov}(X_t,X_{t+\tau})$，$R(0)=\operatorname{Var}(X_t)=\sigma^2$，定义

$$
\rho(\tau)=\frac{R(\tau)}{R(0)}=\frac{R(\tau)}{\sigma^{2}}.
$$

由协方差的对称性与柯西–施瓦茨不等式，

$$
\rho(0)=1,\qquad \rho(-\tau)=\rho(\tau),\qquad \lvert\rho(\tau)\rvert\le1.
$$

第四条性质是半正定：对任意 $n$、任意 $t_1,\dots,t_n$ 与实数 $a_1,\dots,a_n$，有 $\sum_{i,j}a_ia_jR(t_i-t_j)\ge0$。这条约束排除了很多"看起来合理"的函数，比如一个三角形脉冲不能作自相关函数。

谐波过程是标准例子：$X_t=A\cos\omega t+B\sin\omega t$，其中 $A,B$ 不相关，$E A=E B=0$，$\operatorname{Var}A=\operatorname{Var}B=\sigma^2$。则 $E X_t=0$，且

$$
R(\tau)=\sigma^{2}\bigl(\cos\omega t\cos\omega(t+\tau)+\sin\omega t\sin\omega(t+\tau)\bigr)=\sigma^{2}\cos\omega\tau.
$$

取 $\sigma^2=4$、$\omega=\pi/6$，则 $R(\tau)=4\cos(\pi\tau/6)$。

| $\tau$ | 0 | 2 | 3 | 6 |
| --- | --- | --- | --- | --- |
| $R(\tau)$ | 4 | 2 | 0 | $-4$ |
| $\rho(\tau)$ | 1 | 0.5 | 0 | $-1$ |

$\tau=6$ 时相关系数为 $-1$，说明相隔半周期的两个时刻完全负相关。自相关函数可以取负值，也可以振荡，这与"相关性随时间衰减"的直觉不同。

## 遍历性

平稳性说的是同一时刻的分布不随 $t$ 变，遍历性说的是**一条足够长的样本轨道**能代表整个分布。若

$$
\frac1T\int_0^T X_t\,\mathrm dt \xrightarrow[T\to\infty]{}\mu
$$

依均方收敛，称过程对均值遍历。此时可以用时间平均估计 $\mu$，而不需要重复观测很多条轨道。

判别条件与自相关函数直接相关：若 $R(\tau)\to0$（$\tau\to\infty$），则均值遍历成立。谐波过程的 $R(\tau)=\sigma^2\cos\omega\tau$ 不趋于零，因此不均值遍历——沿一条轨道做时间平均，得到的是与相位有关的随机量，不是 $0$。

> [!NOTE]
> 实际数据只有一条轨道。没有遍历性，任何"用样本估计参数"的做法都缺少依据。这也是时间序列分析必须先检验平稳性的原因。

## 三个常见误解

> [!MYTH] 宽平稳一定也是严平稳。
> 一般不对。宽平稳只固定前两阶矩，高阶分布可以随时间改变。例外是高斯过程：联合分布由均值与协方差完全决定，两者等价。

> [!MYTH] 自相关函数随滞后增大必须单调衰减。
> 谐波过程的 $\rho(\tau)=\cos(\pi\tau/6)$ 周期振荡，取到 $-1$。衰减只是很多实际序列的特征，不是定义的一部分。

> [!MYTH] 只要过程平稳，时间平均就能估计均值。
> 平稳只保证分布不随时间漂移，不保证单条轨道遍历。周期成分会让时间平均停留在某个随机相位上。

## 练习

> [!PRACTICE] 1 · 照着做
> 承上例，求 $\tau=4$ 时的 $R(\tau)$ 与 $\rho(\tau)$。
>
> > [!ANSWER] 看答案
> > $\cos(4\pi/6)=\cos(2\pi/3)=-0.5$，故 $R(4)=-2$，$\rho(4)=-0.5$。

> [!PRACTICE] 2 · 变式
> 设 $X_t=Z_t+t$，$Z_t$ 为零均值宽平稳序列，判断 $X_t$ 是否宽平稳。
>
> > [!ANSWER] 看答案
> > $E X_t=t$ 随时间变化，不是常数，故不宽平稳。差分 $\nabla X_t=Z_t-Z_{t-1}+1$ 的均值恒定，才可能平稳。

> [!PRACTICE] 3 · 迁移
> 若 $R(\tau)=9e^{-0.2\lvert\tau\rvert}$，求方差与 $\rho(5)$。
>
> > [!ANSWER] 看答案
> > $R(0)=9$ 即方差；$\rho(5)=e^{-1}\approx0.368$。

## 严格表述

称二阶矩过程 $\{X_t\}$ 宽平稳，若 $E X_t=\mu$ 为常数、$E X_t^2<\infty$，且 $R(s,t)=\operatorname{Cov}(X_s,X_t)$ 只依赖 $s-t$。此时 $R(\tau)=R(-\tau)$、$\lvert R(\tau)\rvert\le R(0)$，且 $R$ 为半正定函数：对任意有限组 $t_1,\dots,t_n$ 与复数 $a_1,\dots,a_n$，$\sum_{i,j}a_i\bar a_jR(t_i-t_j)\ge0$。反之，Herglotz 定理与 Bochner 定理保证任何这样的半正定函数都是某个宽平稳过程的协方差函数。

严平稳指任意有限维分布对时间平移不变。严平稳且二阶矩有限蕴含宽平稳，反之不然；对高斯过程两者等价。若 $\frac1T\int_0^TR(\tau)\,\mathrm d\tau\to0$，则均值遍历，即时间平均依均方收敛到 $\mu$。