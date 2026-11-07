---
slug: "spectral-density-linear-systems"
subject: "probability"
unit: "u14"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "平稳过程的谱密度与线性系统"
subtitle: "把相关函数换一个频率坐标来看"
minutes: 16
meta: ["阅读 16 分钟","需要 自相关函数与傅里叶变换","掌握级"]
concepts: ["timeseries", "variance", "expectation"]
prereq: ["timeseries", "variance"]
related: ["regression", "markov"]
---

## 本讲目标

学完这一讲，你能由自相关函数算出谱密度，用 Wiener–Khinchin 关系在时域与频域之间往返，并用 $\lvert H(\omega)\rvert^2$ 求白噪声经过线性系统后的谱密度与方差。

自相关函数回答"相隔多久还相关"，谱密度回答"哪些频率占的方差多"。两者是同一信息的两种坐标，通过傅里叶变换互换。

## 三行回顾

- 谱密度 $S(\omega)$ 是自相关函数的傅里叶变换，非负、为偶函数。
- 方差等于谱密度的积分：$R(0)=\int S(\omega)\,\mathrm d\omega$。
- 线性系统把输入谱密度乘上频率响应模平方：$S_Y(\omega)=\lvert H(\omega)\rvert^2S_X(\omega)$。

## 从自相关到谱密度

对宽平稳过程，若 $\int\lvert R(\tau)\rvert\,\mathrm d\tau<\infty$，定义谱密度

$$
S(\omega)=\frac{1}{2\pi}\int_{-\infty}^{\infty}R(\tau)e^{-i\omega\tau}\,\mathrm d\tau,
\qquad
R(\tau)=\int_{-\infty}^{\infty}S(\omega)e^{i\omega\tau}\,\mathrm d\omega.
$$

这一对变换称为 Wiener–Khinchin 关系。$S(\omega)$ 的物理含义是方差在频率上的分布：在频带 $[\omega_1,\omega_2]$ 内的方差贡献为 $\int_{\omega_1}^{\omega_2}S(\omega)\,\mathrm d\omega$。

| 时域 | 频域 |
| --- | --- |
| $R(\tau)$ | $S(\omega)$ |
| $R(0)=\sigma^2$ | $\int S(\omega)\,\mathrm d\omega$ |
| 快速衰减 | 展宽、平坦 |
| 周期振荡 | 谱线（冲激） |

离散时间序列的积分区间换成 $[-\pi,\pi]$，变换变成求和，其余结构不变。

谐波过程 $R(\tau)=\sigma^2\cos\omega_0\tau$ 的谱密度是两根谱线 $\frac{\sigma^2}{2}[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$。它不满足绝对可积条件，属于广义谱密度，但这正说明"单一频率"在频域就是一个点。

## 谱密度的性质与白噪声

由 $R$ 的偶函数性与半正定性直接得到：

$$
S(\omega)\ge0,\qquad S(-\omega)=S(\omega).
$$

非负性是硬约束。任何在某个频段取负值的函数都不可能是谱密度。

白噪声是最平坦的情形：$R(0)=\sigma^2$，$R(\tau)=0$（$\tau\ne0$），于是 $S(\omega)=\sigma^2/(2\pi)$ 在 $[-\pi,\pi]$ 上为常数。所有频率的方差贡献相同，"白"字由此而来。

| 过程 | $R(\tau)$ | $S(\omega)$ |
| --- | --- | --- |
| 离散白噪声 | $\sigma^2\delta_{\tau0}$ | $\sigma^2/(2\pi)$ |
| AR(1)，参数 $\varphi$ | $\sigma^2\varphi^{\lvert\tau\rvert}/(1-\varphi^2)$ | $\sigma^2/[2\pi(1+\varphi^2-2\varphi\cos\omega)]$ |
| 谐波 | $\sigma^2\cos\omega_0\tau$ | 两根谱线 |

## 线性系统与频率响应

设输入 $X_t$ 宽平稳，系统为线性时不变，输出

$$
Y_t=\sum_{k}h_kX_{t-k},\qquad H(\omega)=\sum_k h_ke^{-ik\omega}.
$$

$H(\omega)$ 称为频率响应，$\lvert H(\omega)\rvert^2$ 称为功率增益。输出仍是宽平稳的，且

$$
S_Y(\omega)=\lvert H(\omega)\rvert^{2}S_X(\omega).
$$

取 $\sigma^2=1$ 的白噪声输入，经过 $Y_t=\frac12(X_t+X_{t-1})$：

$$
H(\omega)=\frac{1+e^{-i\omega}}{2}=e^{-i\omega/2}\cos\frac{\omega}{2},
\qquad
S_Y(\omega)=\frac{1}{2\pi}\cos^{2}\frac{\omega}{2}.
$$

在 $\omega=0$ 处增益为 $1$，在 $\omega=\pi$ 处增益为 $0$——高频被完全抵消。输出方差为

$$
R_Y(0)=\int_{-\pi}^{\pi}\frac{1}{2\pi}\cos^{2}\frac{\omega}{2}\,\mathrm d\omega=\frac12,
$$

与直接计算 $\operatorname{Var}\bigl(\tfrac12(X_t+X_{t-1})\bigr)=\tfrac14(1+1)=\tfrac12$ 一致。

再看 AR(1)：$X_t=0.6X_{t-1}+\varepsilon_t$，$\varepsilon_t$ 为方差 $1$ 的白噪声。此时 $H(\omega)=1/(1-0.6e^{-i\omega})$，故

$$
S_X(\omega)=\frac{1}{2\pi\left(1.36-1.2\cos\omega\right)}.
$$

$\omega=0$ 时 $S=1/(2\pi\times0.16)=0.995$，$\omega=\pi$ 时 $S=1/(2\pi\times2.56)=0.062$。低频能量是高频的 $16$ 倍，序列呈现明显的正相关与平滑走势。对其积分得方差 $1/(1-0.36)=1.5625$，与 AR(1) 的方差公式吻合。

## 三个常见误解

> [!MYTH] 谱密度是概率密度，所以积分等于 $1$。
> 它的积分是方差 $\sigma^2$，不是 $1$。$S(\omega)$ 可以大于 $1$，量纲是"方差每单位频率"。

> [!MYTH] 谱密度可以为负，只要总积分为正。
> 非负性是半正定性的直接推论。负值意味着某个频带的方差贡献为负，不可能出现。

> [!MYTH] 白噪声必须是高斯白噪声。
> 白噪声只要求不相关、谱平坦。高斯性是额外的分布假设，用于写出似然函数或做区间预测。

## 练习

> [!PRACTICE] 1 · 照着做
> 若 $R(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$，求 $S(\omega)$。
>
> > [!ANSWER] 看答案
> > 计算 $\int\sigma^2e^{-\alpha\lvert\tau\rvert}e^{-i\omega\tau}\mathrm d\tau=\sigma^2\cdot\frac{2\alpha}{\alpha^2+\omega^2}$，故 $S(\omega)=\frac{\sigma^2\alpha}{\pi(\alpha^2+\omega^2)}$，是柯西型谱。

> [!PRACTICE] 2 · 变式
> 白噪声方差为 $1$，经过 $Y_t=X_t+0.5X_{t-1}$，求 $S_Y(\omega)$ 与方差。
>
> > [!ANSWER] 看答案
> > $\lvert H\rvert^2=1.25+\cos\omega$，$S_Y=(1.25+\cos\omega)/(2\pi)$，方差 $=1.25$。

> [!PRACTICE] 3 · 迁移
> 若把线性系统的增益整体放大一倍，输出的谱密度与方差如何变化？
>
> > [!ANSWER] 看答案
> > $H$ 变为 $2H$，谱密度乘 $4$，方差也乘 $4$。

## 严格表述

设 $\{X_t\}$ 宽平稳，$R(\tau)=\operatorname{Cov}(X_t,X_{t+\tau})$。若 $\int_{\mathbb R}\lvert R(\tau)\rvert\,\mathrm d\tau<\infty$，则谱密度 $S(\omega)=\frac{1}{2\pi}\int R(\tau)e^{-i\omega\tau}\mathrm d\tau$ 存在，且 $R(\tau)=\int S(\omega)e^{i\omega\tau}\mathrm d\omega$（Wiener–Khinchin）。由 $R$ 的半正定性得 $S(\omega)\ge0$；又 $R(0)=\int S(\omega)\mathrm d\omega=\operatorname{Var}(X_t)$。

对线性时不变系统 $Y_t=\sum_kh_kX_{t-k}$，频率响应 $H(\omega)=\sum_kh_ke^{-ik\omega}$ 满足 $S_Y(\omega)=\lvert H(\omega)\rvert^2S_X(\omega)$。当 $\sum_k\lvert h_k\rvert<\infty$ 时输出宽平稳，且 $E Y_t=\mu\sum_kh_k$。若输入为白噪声，$S_X=\sigma^2/(2\pi)$，输出谱完全由 $\lvert H\rvert^2$ 的形状决定。