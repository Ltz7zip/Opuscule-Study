---
slug: "stochastic-process-basics"
subject: "probability"
unit: "u12"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 概率论与数理统计 · 专业模式"
title: "随机过程的概念与有限维分布"
subtitle: "把一族随机变量看成一个整体"
minutes: 16
meta: ["阅读 16 分钟","需要 随机变量与数字特征","掌握级"]
concepts: ["markov", "expectation", "variance"]
prereq: ["randvar", "expectation"]
related: ["timeseries", "jointdist"]
---

## 本讲目标

学完这一讲，你能写出随机过程、样本函数、均值函数与协方差函数的定义，用有限维分布描述一个过程，并判断它是否严平稳或宽平稳。

## 三行回顾

- 随机过程是给定参数集 $T$ 后的一族随机变量 $\{X_t:t\in T\}$，固定 $\omega$ 得到一条样本函数。
- 有限维分布族 $\{F_{t_1,\dots,t_n}\}$ 完全决定过程的概率规律。
- 均值函数 $m(t)=E[X_t]$，协方差函数 $R(s,t)=\operatorname{Cov}(X_s,X_t)$。

## 随机过程与样本函数

随机过程是概率空间上的二元函数 $X(t,\omega)$。固定时刻 $t$，它是随机变量；固定样本点 $\omega$，它是 $t$ 的普通函数，称为样本函数或轨道。一次观测记录到的就是一条轨道。

| 过程 | 参数集 $T$ | 状态空间 | 典型样本函数 |
| --- | --- | --- | --- |
| 泊松计数过程 | $[0,\infty)$ | $\{0,1,2,\dots\}$ | 右连续、跳跃为 1 的阶梯 |
| 随机游走 | $\{0,1,2,\dots\}$ | 整数 | 每步上下跳动的折线 |
| 正弦波 $A\cos\omega t+B\sin\omega t$ | $(-\infty,\infty)$ | $\mathbb R$ | 振幅随机的光滑曲线 |
| 维纳过程 | $[0,\infty)$ | $\mathbb R$ | 连续但处处不可微的曲线 |

参数集离散时称离散参数过程（随机序列），连续时称连续参数过程。状态空间可以是实数、整数、向量，甚至函数空间。

## 有限维分布、均值与协方差函数

对任意 $n$ 与任意 $t_1<\dots<t_n$，随机向量 $(X_{t_1},\dots,X_{t_n})$ 的联合分布函数

$$
F_{t_1,\dots,t_n}(x_1,\dots,x_n)=P\left(X_{t_1}\le x_1,\dots,X_{t_n}\le x_n\right)
$$

称为过程的有限维分布。这一族分布满足相容性条件（边缘化后回到低维分布），并由 Kolmogorov 扩张定理保证可以构造出对应的过程。换句话说，过程的全部概率信息都在有限维分布里。

均值函数与协方差函数是两条最常用的摘要曲线：

$$
m(t)=E[X_t],\qquad R(s,t)=\operatorname{Cov}(X_s,X_t)=E[(X_s-m(s))(X_t-m(t))]
$$

$R(t,t)=\operatorname{Var}(X_t)$ 是方差函数。例：强度 $\lambda=2$ 的泊松过程，$m(t)=2t$，$R(s,t)=2\min(s,t)$，于是 $E[N_3]=6$，$\operatorname{Var}(N_3)=6$，$\operatorname{Cov}(N_1,N_3)=2$。

再看 $X_t=A\cos\omega t+B\sin\omega t$，其中 $A,B$ 独立同分布 $N(0,\sigma^2)$。由对称性 $m(t)=0$，而

$$
R(s,t)=\sigma^2(\cos\omega s\cos\omega t+\sin\omega s\sin\omega t)=\sigma^2\cos\omega(t-s)
$$

取 $\sigma^2=4$、$\omega=\pi/6$、$s=0$、$t=2$，得 $R(0,2)=4\cos(\pi/3)=2$，而 $\operatorname{Var}(X_t)=R(t,t)=4$ 与 $t$ 无关。相关系数为 $2/4=0.5$。

## 严平稳与宽平稳

**严平稳**要求任意平移不改变有限维分布：

$$
F_{t_1+h,\dots,t_n+h}(x_1,\dots,x_n)=F_{t_1,\dots,t_n}(x_1,\dots,x_n),\qquad \forall h
$$

**宽平稳**（弱平稳）只要求前两阶矩满足

$$
m(t)\equiv m,\qquad R(s,t)=R(s-t,0)\ \text{只依赖时间差}
$$

二阶矩过程下，严平稳推出宽平稳，反之不然；对高斯过程，两者等价，因为高斯分布由均值与协方差完全决定。

| 过程 | 均值 | 协方差 | 结论 |
| --- | --- | --- | --- |
| 泊松过程 | $2t$，随时间变 | $2\min(s,t)$ | 都不平稳 |
| 随机游走 $S_n=\sum_{i\le n}\xi_i$ | 0 | $\sigma^2\min(m,n)$ | 都不平稳 |
| 正弦波 | 0 | $4\cos\omega(t-s)$ | 严平稳且宽平稳 |
| $X_t=\varepsilon_t+0.5\varepsilon_{t-1}$ | 0 | 仅与滞后有关 | 宽平稳（若 $\varepsilon$ 独立同分布） |

随机游走是"看起来像噪声却不平稳"的典型：均值恒为 0，但方差 $\sigma^2n$ 随时间线性增长，协方差依赖绝对时刻，所以不能当平稳序列处理。

> [!MYTH] 均值恒定就是平稳。
> 平稳还要求协方差只依赖时间差。随机游走均值恒为 0，方差却随时间膨胀，是最常见的反例。

> [!NOTE]
> 宽平稳只约束一、二阶矩，因此对重尾或方差无穷的过程不适用。检验平稳性时先看时序图与自相关图，再用单位根或分段比较确认。

## 三个常见误解

> [!MYTH] 有限维分布相同就等于过程相同。
> 对给定参数集，相容的有限维分布族确实决定过程。但只比较某几个时刻的边缘分布远远不够，联合结构才是关键。

> [!MYTH] 协方差函数 $R(s,t)$ 必须非负。
> 协方差可正可负，可以振荡（正弦波就是）。真正必须成立的是非负定性：对任意 $t_1,\dots,t_n$ 与系数 $a_i$，$\sum_{i,j}a_ia_jR(t_i,t_j)\ge0$。

> [!MYTH] 样本函数一定连续。
> 连续性不是过程的定义要求。泊松过程的轨道处处右连续但含跳跃，维纳过程的轨道连续却处处不可微。

## 练习

> [!PRACTICE] 1 · 照着做
> 强度 $\lambda=3$ 的泊松过程，求 $m(2)$、$\operatorname{Var}(N_2)$ 与 $\operatorname{Cov}(N_1,N_2)$。
>
> > [!ANSWER] 看答案
> > $m(2)=6$，$\operatorname{Var}(N_2)=6$，$\operatorname{Cov}(N_1,N_2)=3\min(1,2)=3$。

> [!PRACTICE] 2 · 变式
> 上题中 $\operatorname{Corr}(N_1,N_2)$ 是多少？
>
> > [!ANSWER] 看答案
> > $\sqrt{3\times6}=\sqrt{18}=4.243$，相关系数 $3/4.243=0.707$，等于 $\sqrt{1/2}$。

> [!PRACTICE] 3 · 迁移
> $X_t=a+\varepsilon_t$，$\varepsilon_t$ 独立同分布、均值 0、方差 $\sigma^2$，判断平稳性。
>
> > [!ANSWER] 看答案
> > $m(t)=a$ 恒定；$R(s,t)=\sigma^2\delta_{s,t}$，仅依赖 $s-t$。故宽平稳；若 $\varepsilon$ 同分布，则严平稳。

## 严格表述

设概率空间 $(\Omega,\mathcal F,P)$、参数集 $T\subseteq\mathbb R$，随机过程是映射 $X:T\times\Omega\to\mathbb R$，使每个 $t$ 的 $X_t$ 为随机变量。对 $t_1<\dots<t_n$，有限维分布 $F_{t_1,\dots,t_n}$ 满足相容性：对任意置换 $\pi$ 与 $m<n$，

$$
F_{t_{\pi(1)},\dots,t_{\pi(n)}}(x_{\pi(1)},\dots,x_{\pi(n)})=F_{t_1,\dots,t_n}(x_1,\dots,x_n),\qquad F_{t_1,\dots,t_m}(x_1,\dots,x_m)=\lim_{x_{m+1},\dots,x_n\to\infty}F_{t_1,\dots,t_n}(x_1,\dots,x_n)
$$

Kolmogorov 扩张定理断言：任意满足相容性的有限维分布族，都存在一个过程以其为有限维分布。均值函数 $m(t)=E[X_t]$ 要求 $E|X_t|<\infty$；协方差函数要求二阶矩有限，且必须非负定：$\sum_{i,j=1}^n a_ia_jR(t_i,t_j)=\operatorname{Var}\left(\sum_i a_iX_{t_i}\right)\ge0$。宽平稳即 $m(t)\equiv m$ 且 $R(s,t)=R(s-t)$；严平稳即分布对平移不变。二者在高斯过程上等价。