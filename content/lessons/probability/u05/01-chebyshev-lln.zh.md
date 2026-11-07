---
slug: "chebyshev-lln"
subject: "probability"
unit: "u05"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 概率论与数理统计 · 专业模式"
title: "切比雪夫不等式与大数定律"
subtitle: "只知道方差，也能给概率上锁"
minutes: 16
meta: ["阅读 16 分钟","需要 方差与协方差","掌握级"]
concepts: ["variance", "expectation", "clt"]
prereq: ["variance"]
related: ["clt", "sampling"]
---

## 本讲目标

学完这一讲，你能在不知道分布形状的情况下用方差给概率定出上界，并说清楚"频率稳定"为什么不是玄学而是定理。

前面几讲都要求知道完整分布才能算概率。这一讲反过来：只给均值和方差，就能得到不依赖分布形状的保守估计。

## 三行回顾

- 马尔可夫不等式：非负变量满足 $P(X\ge a)\le E[X]/a$。
- 切比雪夫不等式：$P(|X-\mu|\ge\varepsilon)\le\sigma^2/\varepsilon^2$。
- 大数定律：样本均值 $\bar X_n$ 依概率收敛到总体均值 $\mu$。

## 从马尔可夫到切比雪夫

马尔可夫不等式只用了一件事：如果 $X$ 非负且平均值是 $\mu$，那么超过 $a$ 的部分不可能太多。

$$
P(X\ge a)\le\frac{E[X]}{a},\qquad a>0
$$

把 $X$ 换成 $(X-\mu)^2$，就得到切比雪夫不等式：

$$
P(|X-\mu|\ge\varepsilon)=P\big((X-\mu)^2\ge\varepsilon^2\big)\le\frac{E[(X-\mu)^2]}{\varepsilon^2}=\frac{\sigma^2}{\varepsilon^2}
$$

等价写法是给"落在 $\varepsilon$ 以内"一个下界：

$$
P(|X-\mu|<\varepsilon)\ge 1-\frac{\sigma^2}{\varepsilon^2}
$$

两个不等式都**不看分布**，代价是界很松。

| 不等式 | 前提 | 结论 |
| --- | --- | --- |
| 马尔可夫 | $X\ge0$ | $P(X\ge a)\le E[X]/a$ |
| 切比雪夫 | 方差有限 | $P(|X-\mu|\ge\varepsilon)\le\sigma^2/\varepsilon^2$ |
| 大数定律 | 独立同分布、方差有限 | $\bar X_n\xrightarrow{P}\mu$ |
| 中心极限定理 | 独立同分布、方差有限 | $(\bar X_n-\mu)/(\sigma/\sqrt n)\Rightarrow N(0,1)$ |

## 大数定律

对独立同分布且方差有限的序列，切比雪夫直接作用在 $\bar X_n$ 上。因为 $E[\bar X_n]=\mu$、$\operatorname{Var}(\bar X_n)=\sigma^2/n$，

$$
P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}\to0
$$

这就是弱大数定律。它说的是：样本量越大，样本均值偏离总体均值超过任意固定 $\varepsilon$ 的可能性趋于 0。注意它并不保证每一次实验都更接近，只保证"大幅偏离"的概率越来越小。

辛钦大数定律把条件放宽到只需期望存在，不再要求方差有限，但证明要用特征函数，超出本讲范围。

## 一个算得出来的例子

设 $X\sim\mathrm{Bin}(100,0.4)$，则 $E[X]=40$，$\operatorname{Var}(X)=100\times0.4\times0.6=24$。问 $X$ 偏离 40 至少 10 的概率上界。

$$
P(|X-40|\ge10)\le\frac{24}{10^2}=0.24
$$

也就是说，至少有 $1-0.24=0.76$ 的概率落在 $(30,50)$ 内。若把 $\varepsilon$ 放宽到 20：

$$
P(|X-40|\ge20)\le\frac{24}{400}=0.06
$$

真实的二项概率约为 $0.00004$，远小于上界。这说明切比雪夫的用途是**保证**而非**精确计算**：结论永远成立，但通常很保守。

> [!MYTH] 切比雪夫不等式给出的就是真实概率。
> 它只是上界。真实值可能小几个数量级。要精确值必须知道分布，或者用中心极限定理做近似。

> [!NOTE]
> 切比雪夫不等式是可以取到等的：构造一个只取 $\mu-\varepsilon$、$\mu$、$\mu+\varepsilon$ 三点且两端各占 $\sigma^2/(2\varepsilon^2)$ 的分布即可。所以它不是"证明太粗糙"，而是这个信息量下的最优界。

## 三个常见误解

> [!MYTH] 大数定律说明"次数多了就该出现"。
> 它只保证均值收敛，不保证任何一次试验的结果。连开十次正面后，第十一次正面的概率仍是 $1/2$（若硬币公平）。

> [!MYTH] 样本量翻倍，误差就减半。
> 由 $\sigma/\sqrt n$ 可知，误差按 $\sqrt n$ 缩小。要把误差减半，样本量需要变成四倍。

> [!MYTH] 方差有限是任何分布都成立的前提。
> 柯西分布连期望都不存在，大数定律对它的样本均值不成立。条件是必须检查的。

## 练习

> [!PRACTICE] 1 · 照着做
> $X\sim\mathrm{Bin}(100,0.4)$，用切比雪夫估计 $P(20<X<60)$ 的下界。
>
> > [!ANSWER] 看答案
> > $\varepsilon=20$，上界 $24/400=0.06$，故下界为 $0.94$。

> [!PRACTICE] 2 · 变式
> 某变量均值 5、方差 4。要保证 $P(|X-5|<1)\ge0.9$，切比雪夫给不出这个结论，为什么？需要多大的 $\varepsilon$？
>
> > [!ANSWER] 看答案
> > $\varepsilon=1$ 时下界只有 $1-4= -3$，无意义。要求 $1-4/\varepsilon^2\ge0.9$ 需 $\varepsilon^2\ge40$，即 $\varepsilon\ge6.32$。

> [!PRACTICE] 3 · 迁移
> 用切比雪夫说明：$n$ 次独立重复试验中，频率 $f_n$ 与真实概率 $p$ 的偏差超过 $0.05$ 的概率不超过多少？设 $p=0.5$，$n=400$。
>
> > [!ANSWER] 看答案
> > $\operatorname{Var}(f_n)=p(1-p)/n=0.25/400=0.000625$，故上界 $0.000625/0.0025=0.25$。这个界偏松，实际二项计算约为 $0.046$。

## 严格表述

设 $X_1,X_2,\dots$ 独立同分布，$E[X_i]=\mu$，$\operatorname{Var}(X_i)=\sigma^2<\infty$。则对任意 $\varepsilon>0$，

$$
\lim_{n\to\infty}P\left(\left|\frac{1}{n}\sum_{i=1}^{n}X_i-\mu\right|\ge\varepsilon\right)=0
$$

即 $\bar X_n\xrightarrow{P}\mu$（弱大数定律，辛钦版本只需 $E|X_1|<\infty$）。若进一步 $\sum_n P(|X_n-\mu|>\varepsilon)<\infty$，则由 Borel–Cantelli 引理得到几乎必然收敛，即强大数定律。切比雪夫不等式是上述证明的初等工具，其一般形式由马尔可夫不等式对非负增函数 $g$ 给出：$P(g(X)\ge g(a))\le E[g(X)]/g(a)$。
