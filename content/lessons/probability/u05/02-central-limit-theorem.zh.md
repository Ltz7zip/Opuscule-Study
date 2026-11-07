---
slug: "central-limit-theorem"
subject: "probability"
unit: "u05"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "中心极限定理"
subtitle: "大量微小独立因素之和，为什么长得像正态"
minutes: 17
meta: ["阅读 17 分钟","需要 大数定律","掌握级"]
concepts: ["clt", "distribution", "sampling"]
prereq: ["clt"]
related: ["sampling", "estimation"]
---

## 本讲目标

学完这一讲，你能把样本均值标准化后当作标准正态使用，并用连续性修正把二项概率算到小数点后三位。

大数定律告诉我们均值会收敛，中心极限定理告诉我们**误差有多大**、以什么形状分布。

## 三行回顾

- $\bar X_n$ 的均值是 $\mu$，标准差是 $\sigma/\sqrt n$，与总体分布无关。
- 标准化后 $Z_n=(\bar X_n-\mu)/(\sigma/\sqrt n)$ 的分布函数逐点收敛于 $\Phi$。
- 二项分布在 $np$ 与 $n(1-p)$ 都不太小时可用正态近似，必要时做连续性修正。

## 三种收敛与定理陈述

概率论里"趋近"有几种不同含义，混用会出错：

| 名称 | 记号 | 含义 |
| --- | --- | --- |
| 依分布收敛 | $X_n\Rightarrow X$ | 分布函数在连续点逐点收敛 |
| 依概率收敛 | $X_n\xrightarrow{P}X$ | $P(\lvert X_n-X\rvert>\varepsilon)\to0$ |
| 几乎必然收敛 | $X_n\to X$ a.s. | 除零概率集合外逐点收敛 |

中心极限定理讲的是最弱的一种：依分布收敛。它不保证某次具体的和接近什么，只保证整体形状趋于钟形。

设 $X_1,X_2,\dots$ 独立同分布，$E[X_i]=\mu$，$\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$。则

$$
\frac{\sqrt n(\bar X_n-\mu)}{\sigma}=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}\Rightarrow N(0,1)
$$

等价地说，$n$ 较大时 $\bar X_n$ 近似服从 $N(\mu,\sigma^2/n)$，误差的量级是 $1/\sqrt n$。

## 用正态近似二项分布

设 $X\sim\mathrm{Bin}(n,p)$，把它写成 $n$ 个伯努利变量之和，则 $E[X]=np$，$\operatorname{Var}(X)=np(1-p)$，于是

$$
P(a\le X\le b)\approx\Phi\!\left(\frac{b-np}{\sqrt{np(1-p)}}\right)-\Phi\!\left(\frac{a-np}{\sqrt{np(1-p)}}\right)
$$

## 一个算得出来的例子

设 $X\sim\mathrm{Bin}(1000,0.4)$，求 $P(380\le X\le420)$。均值 $400$，标准差 $\sqrt{240}=15.49$。

$$
z_1=\frac{380-400}{15.49}=-1.29,\qquad z_2=\frac{420-400}{15.49}=1.29
$$

$$
P\approx\Phi(1.29)-\Phi(-1.29)=0.9015-0.0985=0.803
$$

若做连续性修正，把边界改成 $379.5$ 与 $420.5$，得 $z=\pm1.3233$，结果约 $0.814$。样本量越大，修正的影响越小；$n$ 小时它很重要。

反过来，若要求 $P(|\bar X_n-0.4|\le0.01)\ge0.95$，需要 $1.96\times\sqrt{0.24/n}\le0.01$，解得 $n\ge9219$。这就是"误差减半、样本翻四倍"的具体体现。

> [!MYTH] 中心极限定理要求原始数据服从正态分布。
> 恰恰相反，它对任意有限方差的分布都成立。原始数据越偏，需要的 $n$ 越大而已。

> [!NOTE]
> 常用的经验是 $np\ge5$ 且 $n(1-p)\ge5$。$p$ 接近 0 或 1 时正态近似会明显失真，此时宜用泊松近似或精确计算。

## 三个常见误解

> [!MYTH] 中心极限定理说明样本本身会变成正态。
> 变成正态的是样本均值的抽样分布，不是原始数据。原始数据保持原来的偏态与形状。

> [!MYTH] 只要样本量够大，任何统计量都近似正态。
> 定理只对（标准化的）样本均值或独立同分布之和成立。中位数、极值需要各自的极限理论，极值收敛到的是极值分布而非正态。

> [!MYTH] 用正态近似算出概率为负或超过 1 说明定理错了。
> 那说明 $n$ 太小、近似条件不满足。先检查 $np$ 与 $n(1-p)$，必要时改用精确分布。

## 练习

> [!PRACTICE] 1 · 照着做
> $X\sim\mathrm{Bin}(100,0.5)$，用正态近似求 $P(45\le X\le55)$。
>
> > [!ANSWER] 看答案
> > $\mu=50$，$\sigma=5$，$z=\pm1$，故概率约 $0.6827$。精确值为 $0.7287$，近似偏低，因为 $n$ 只有 100。

> [!PRACTICE] 2 · 变式
> 上题加连续性修正后结果如何？
>
> > [!ANSWER] 看答案
> > 边界取 $44.5$ 与 $55.5$，$z=\pm1.1$，概率约 $0.7287$，与精确值吻合得更好。

> [!PRACTICE] 3 · 迁移
> 某产品次品率 $0.02$，抽 1000 件，求次品数超过 25 的近似概率。
>
> > [!ANSWER] 看答案
> > $\mu=20$，$\sigma=\sqrt{19.6}=4.43$，$z=(25.5-20)/4.43=1.24$，概率约 $0.107$。这里 $np=20$ 尚可，泊松近似 $\lambda=20$ 给出相近结果。

## 严格表述

设 $X_1,X_2,\dots$ 独立同分布，$E[X_i]=\mu$，$0<\sigma^2<\infty$，$Z_n=\sqrt n(\bar X_n-\mu)/\sigma$。则对一切 $x$，$\lim_{n\to\infty}P(Z_n\le x)=\Phi(x)$，即 $Z_n\Rightarrow N(0,1)$。证明可用特征函数：$\varphi_{Z_n}(t)=[\varphi(t/(\sigma\sqrt n))]^n\to e^{-t^2/2}$。Berry–Esseen 定理给出定量误差 $|P(Z_n\le x)-\Phi(x)|\le C\rho/(\sigma^3\sqrt n)$，其中 $\rho=E|X_1-\mu|^3$。当 $\sigma^2=\infty$ 时结论可能失效，此时属于稳定分布（广义中心极限定理）的范畴。
