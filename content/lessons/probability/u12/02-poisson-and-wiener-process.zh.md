---
slug: "poisson-and-wiener-process"
subject: "probability"
unit: "u12"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "泊松过程与维纳过程"
subtitle: "两个最基本的连续时间过程：跳跃与连续"
minutes: 17
meta: ["阅读 17 分钟","需要 随机过程与指数分布","掌握级"]
concepts: ["markov", "distribution", "variance"]
prereq: ["markov", "distribution"]
related: ["timeseries", "expectation"]
---

## 本讲目标

学完这一讲，你能用强度写出泊松过程的分布并算事件概率，说明到达间隔为何服从指数分布，并写出维纳过程的定义与基本性质。

## 三行回顾

- 泊松过程是计数过程，独立增量与平稳增量同时成立，$N_t\sim P(\lambda t)$。
- 到达间隔独立同分布 $Exp(\lambda)$，第 $n$ 个到达时刻服从 Gamma$(n,\lambda)$。
- 维纳过程增量独立、平稳、正态，轨道连续，协方差为 $\sigma^2\min(s,t)$。

## 泊松过程：计数与强度

计数过程 $\{N_t:t\ge0\}$ 记录到 $t$ 时刻为止发生的事件数，取值非负整数、单调不减、跳跃为 1。若它满足

1. $N_0=0$；
2. 独立增量：不相交区间上的增量相互独立；
3. 平稳增量：增量分布只依赖区间长度；
4. 小区间内 $P(N_{t+h}-N_t=1)=\lambda h+o(h)$，$P(N_{t+h}-N_t\ge2)=o(h)$，

则称强度为 $\lambda$ 的泊松过程。由这些条件可推出

$$
P(N_t=k)=\frac{(\lambda t)^k}{k!}e^{-\lambda t},\qquad E[N_t]=\operatorname{Var}(N_t)=\lambda t
$$

取 $\lambda=3$（每小时 3 次），$t=2$ 小时：

$$
P(N_2=5)=\frac{6^5}{120}e^{-6}=64.8\times0.002479=0.1606
$$

均值与方差都是 $6$，标准差 $\sqrt6=2.449$。

| 性质 | 表达 | 含义 |
| --- | --- | --- |
| 增量独立 | $N_b-N_a\perp N_d-N_c$ | 不相交区间的计数互不影响 |
| 增量平稳 | $N_{t+h}-N_t\sim N_h$ | 只看长度，不看起点 |
| 叠加 | 独立泊松过程强度相加 | $\lambda_1+\lambda_2$ |
| 稀疏 | 每个事件以概率 $p$ 被保留 | 保留部分强度 $p\lambda$ |

## 到达间隔与等待时间

记 $T_1$ 为第一个事件到达时间，$T_n$ 为第 $n-1$ 到第 $n$ 个事件之间的间隔。由"区间内无事件"的条件：

$$
P(T_1>t)=P(N_t=0)=e^{-\lambda t}
$$

所以 $T_1\sim Exp(\lambda)$，密度 $\lambda e^{-\lambda t}$，均值 $1/\lambda$。独立增量进一步给出 $T_1,T_2,\dots$ 独立同分布 $Exp(\lambda)$。

第 $n$ 个到达时刻 $S_n=T_1+\dots+T_n$ 服从 Gamma$(n,\lambda)$，且事件 $\{S_n\le t\}$ 等价于 $\{N_t\ge n\}$，这条对应关系把间隔语言与计数语言连起来。

$\lambda=3$ 时，平均间隔 $1/3$ 小时即 20 分钟；第一个事件在半小时之后才到的概率

$$
P(T_1>0.5)=e^{-1.5}=0.2231
$$

第 3 个事件在 2 小时内到达的概率

$$
P(S_3\le2)=P(N_2\ge3)=1-e^{-6}\left(1+6+\frac{36}{2}\right)=1-25\times0.002479=0.9380
$$

指数分布的无记忆性在这里有直接解释：已经等了 10 分钟，再等 10 分钟以上的概率与刚从头开始等一样，都是 $e^{-1.5}$。

## 维纳过程

维纳过程（布朗运动）$\{W_t:t\ge0\}$ 满足：

1. $W_0=0$；
2. 独立增量；
3. 对 $s<t$，$W_t-W_s\sim N(0,\sigma^2(t-s))$；
4. 轨道连续。

由定义立得 $W_t\sim N(0,\sigma^2t)$，$E[W_t]=0$，$\operatorname{Var}(W_t)=\sigma^2t$。协方差为

$$
\operatorname{Cov}(W_s,W_t)=\sigma^2\min(s,t)
$$

推导只需假设 $s<t$，把 $W_t$ 拆成 $W_s+(W_t-W_s)$，交叉项因独立增量为零。

取 $\sigma=1$，$W_3-W_1\sim N(0,2)$，于是

$$
P(W_3-W_1>1.5)=1-\Phi\left(\frac{1.5}{\sqrt2}\right)=1-\Phi(1.061)=0.1446
$$

同时 $\operatorname{Cov}(W_1,W_3)=1$，相关系数 $1/\sqrt{1\times3}=0.577$。

| 对照 | 泊松过程 | 维纳过程 |
| --- | --- | --- |
| 取值 | 非负整数 | 实数 |
| 轨道 | 阶梯、有跳跃 | 连续、处处不可微 |
| 增量分布 | 泊松 | 正态 |
| 均值 / 方差 | $\lambda t$ / $\lambda t$ | 0 / $\sigma^2t$ |
| 协方差 | $\lambda\min(s,t)$ | $\sigma^2\min(s,t)$ |

$W_t$ 在任意区间上变差无穷，不能像普通函数那样求导；$\operatorname{Var}(W_t)$ 随时间线性增长，说明它也不是平稳过程。

> [!MYTH] 泊松过程的到达是"均匀分布"的。
> 给定 $N_t=n$，这 $n$ 个到达时刻在 $[0,t]$ 上确实服从均匀分布，但到达间隔服从指数分布，两者不是一回事。

> [!NOTE]
> 维纳过程可由随机游走取极限得到：$n$ 步、每步 $\pm1/\sqrt n$ 的随机游走在 $n\to\infty$ 时趋于标准布朗运动。这正是中心极限定理在函数层面的版本。

## 三个常见误解

> [!MYTH] 泊松过程的强度 $\lambda$ 越大，间隔的方差越小。
> $T\sim Exp(\lambda)$ 的方差是 $1/\lambda^2$，随 $\lambda$ 增大而减小，但标准差 $1/\lambda$ 与均值同比例缩小，变异系数恒为 1。

> [!MYTH] 维纳过程的轨道连续，所以它可微。
> 连续性与可微性无关。布朗轨道几乎必然处处不可微，其二次变差为 $\sigma^2t$ 而非 0。

> [!MYTH] 计数过程只要有平稳增量就是泊松过程。
> 还要求增量独立，以及小区间内最多发生一次事件。缺了独立性，平稳增量只能保证边缘分布，无法保证计数规律。

## 练习

> [!PRACTICE] 1 · 照着做
> $\lambda=4$，求 $P(N_1=2)$ 与 $P(N_1\ge1)$。
>
> > [!ANSWER] 看答案
> > $P(N_1=2)=\frac{4^2}{2}e^{-4}=8\times0.0183=0.1465$；$P(N_1\ge1)=1-e^{-4}=0.9817$。

> [!PRACTICE] 2 · 变式
> 上题中第一个事件在 $0.5$ 小时内到达的概率是多少？
>
> > [!ANSWER] 看答案
> > $P(T_1\le0.5)=1-e^{-2}=0.8647$，因为 $T_1\sim Exp(4)$。

> [!PRACTICE] 3 · 迁移
> 若 $W$ 为标准维纳过程，求 $\operatorname{Var}(W_2-2W_1)$。
>
> > [!ANSWER] 看答案
> > $\operatorname{Var}(W_2)+4\operatorname{Var}(W_1)-4\operatorname{Cov}(W_2,W_1)=2+4-4=2$。

## 严格表述

泊松过程 $\{N_t\}$ 是满足 $N_0=0$、独立平稳增量、$P(N_{t+h}-N_t=1)=\lambda h+o(h)$ 与 $P(N_{t+h}-N_t\ge2)=o(h)$ 的计数过程。由这些条件可得 $N_t\sim P(\lambda t)$，且到达间隔 $T_n$ 独立同分布 $Exp(\lambda)$，$S_n=\sum_{i\le n}T_i\sim\Gamma(n,\lambda)$，并满足 $\{S_n\le t\}=\{N_t\ge n\}$。维纳过程是满足 $W_0=0$、独立增量、$W_t-W_s\sim N(0,\sigma^2(t-s))$ 且轨道连续的高斯过程，等价刻画是 $W$ 为均值 0、协方差 $\sigma^2\min(s,t)$ 的高斯过程。其二次变差 $\sum_i(W_{t_i}-W_{t_{i-1}})^2\to\sigma^2t$ 依概率成立，说明轨道不具有界变差，经典微积分无法直接使用，需借助 Itô 积分。二者都是 Lévy 过程：独立平稳增量、右连续左极限轨道，泊松过程是纯跳的极端，维纳过程是纯连续的极端。