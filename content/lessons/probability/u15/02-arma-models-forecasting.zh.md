---
slug: "arma-models-forecasting"
subject: "probability"
unit: "u15"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "ARMA 模型与预测"
subtitle: "把今天的值写成昨天与误差的函数"
minutes: 17
meta: ["阅读 17 分钟","需要 自相关分析与回归","掌握级"]
concepts: ["timeseries", "regression", "variance"]
prereq: ["timeseries", "regression"]
related: ["markov", "variance"]
---

## 本讲目标

学完这一讲，你能写出 AR、MA、ARMA 的表达式，用特征根判断平稳性，由 Yule–Walker 方程解出理论自相关，并对 AR(1) 给出带误差方差的逐步预测。

上一讲的 ACF/PACF 给出阶数线索，这一讲把线索变成方程：参数怎么估、平稳性怎么验、未来怎么算。

## 三行回顾

- AR($p$) 用过去的观测解释现在，MA($q$) 用过去的误差解释现在。
- 平稳性由 AR 特征方程 $1-\varphi_1z-\cdots-\varphi_pz^p=0$ 的根全在单位圆外保证。
- 预测取条件期望，$h$ 步预测误差方差随 $h$ 增大，趋于无条件方差。

## AR、MA 与 ARMA 的表示

三种基本形式：

$$
\text{AR}(p):\quad X_t=c+\sum_{i=1}^{p}\varphi_iX_{t-i}+\varepsilon_t,
$$

$$
\text{MA}(q):\quad X_t=\mu+\varepsilon_t+\sum_{j=1}^{q}\theta_j\varepsilon_{t-j},
$$

$$
\text{ARMA}(p,q):\quad X_t=c+\sum_{i=1}^{p}\varphi_iX_{t-i}+\varepsilon_t+\sum_{j=1}^{q}\theta_j\varepsilon_{t-j}.
$$

其中 $\varepsilon_t$ 为白噪声，方差 $\sigma^2$。引入滞后算子 $B$（$BX_t=X_{t-1}$），ARMA 可写成 $\Phi(B)X_t=c+\Theta(B)\varepsilon_t$，$\Phi(z)=1-\varphi_1z-\cdots-\varphi_pz^p$，$\Theta(z)=1+\theta_1z+\cdots+\theta_qz^q$。

| 模型 | 参数 | 记忆来源 | 平稳性 |
| --- | --- | --- | --- |
| AR($p$) | $\varphi_1,\dots,\varphi_p$ | 过去的观测 | 需特征根条件 |
| MA($q$) | $\theta_1,\dots,\theta_q$ | 过去的冲击 | 有限阶恒平稳 |
| ARMA($p,q$) | 两者 | 两者 | 只看 $\Phi$ 的根 |

MA 的平稳性自动成立，因为它是有限个白噪声的线性组合；但 MA 还有可逆性要求，即 $\Theta(z)$ 的根也在单位圆外，否则无法写成无穷阶 AR。

## 平稳性条件与 Yule–Walker 方程

AR(1) 迭代得 $X_t=\frac{c}{1-\varphi}+\sum_{j\ge0}\varphi^{j}\varepsilon_{t-j}$，收敛当且仅当 $\lvert\varphi\rvert<1$。一般 AR($p$) 要求 $\Phi(z)=0$ 的根全部满足 $\lvert z\rvert>1$。直观上，特征根离单位圆越远，过去冲击衰减得越快；根接近 $1$ 时记忆很长，序列近似随机游走。

注意"每个系数都小于 $1$"并不充分。AR(2) 取 $\varphi_1=0.8$、$\varphi_2=0.3$，方程 $1-0.8z-0.3z^2=0$ 的根为 $0.927$ 与 $-3.59$，有一个落在单位圆内，过程不平稳。

把 AR 方程两边乘 $X_{t-k}$ 取期望，得 Yule–Walker 方程

$$
\rho(k)=\varphi_1\rho(k-1)+\cdots+\varphi_p\rho(k-p),\qquad k\ge1.
$$

对 AR(2)，$k=1$ 给出 $\rho(1)=\varphi_1+\varphi_2\rho(1)$，故

$$
\rho(1)=\frac{\varphi_1}{1-\varphi_2},\qquad \rho(2)=\varphi_1\rho(1)+\varphi_2.
$$

取 $\varphi_1=0.5$、$\varphi_2=0.3$，则 $\rho(1)=0.5/0.7=0.714$，$\rho(2)=0.5\times0.714+0.3=0.657$。ACF 从 $0.714$ 缓慢衰减，与上一讲"AR 拖尾"的判断一致。

## 一步预测与 AR(1) 算例

设 $X_t=3+0.5X_{t-1}+\varepsilon_t$，$\sigma^2=1$，已观测到 $x_n=10$。最小均方误差预测就是条件期望

$$
\hat x_{n+h}=E[X_{n+h}\mid X_n=x_n].
$$

一步：$\hat x_{n+1}=3+0.5\times10=8$。两步：$E[X_{n+2}\mid x_n]=3+0.5\hat x_{n+1}=7$。递推得 $6.5,\,6.25,\dots$，极限为无条件均值

$$
\mu=\frac{c}{1-\varphi}=\frac{3}{0.5}=6.
$$

| 步长 $h$ | 1 | 2 | 3 | 4 | $\infty$ |
| --- | --- | --- | --- | --- | --- |
| 预测 $\hat x_{n+h}$ | 8.000 | 7.000 | 6.500 | 6.250 | 6.000 |
| 误差方差 | 1.000 | 1.250 | 1.3125 | 1.328 | 1.333 |

$h$ 步误差为 $e_{n+h}=\sum_{j=0}^{h-1}\varphi^{j}\varepsilon_{n+h-j}$，故方差为

$$
\operatorname{Var}(e_{n+h})=\sigma^{2}\frac{1-\varphi^{2h}}{1-\varphi^{2}},
$$

随 $h$ 单调增至 $\sigma^2/(1-\varphi^2)=1.333$。误差方差每增加一步就多累加一项，来源是尚未观测到的新冲击。预测值向均值回落、不确定性向无条件方差增长，是平稳 AR 预测的两个固定特征。

> [!NOTE]
> 若 $\varphi$ 接近 $1$，回落极慢，长期预测几乎等于当前值；这正是"随机游走没有可预测的均值"的另一种说法。

## 三个常见误解

> [!MYTH] AR 模型的系数绝对值都小于 $1$，过程就平稳。
> 只有 AR(1) 如此。AR(2) 的 $\varphi_1=0.8,\varphi_2=0.3$ 全部小于 $1$，仍有一个特征根在单位圆内。

> [!MYTH] MA 模型总可逆，所以不必检查。
> 有限阶 MA 恒平稳，但可逆性要求 $\Theta(z)$ 的根在单位圆外。$\theta=1.5$ 的 MA(1) 不可逆，其 ACF 与 $\theta=2/3$ 的模型完全相同，无法从数据区分。

> [!MYTH] 预测步长越大，模型掌握的信息越多，结果越准。
> 信息只会随步长减少。预测值收敛到无条件均值，误差方差收敛到无条件方差，$h$ 步之后基本没有增量信息。

## 练习

> [!PRACTICE] 1 · 照着做
> 设 $X_t=2+0.8X_{t-1}+\varepsilon_t$，$x_n=5$，求 $\hat x_{n+1}$、$\hat x_{n+2}$ 与长期均值。
>
> > [!ANSWER] 看答案
> > $\hat x_{n+1}=2+4=6$，$\hat x_{n+2}=2+0.8\times6=6.8$，均值为 $2/0.2=10$。

> [!PRACTICE] 2 · 变式
> 判断 AR(2) 模型 $\varphi_1=0.8$、$\varphi_2=0.3$ 是否平稳。
>
> > [!ANSWER] 看答案
> > 解 $0.3z^2+0.8z-1=0$ 得 $z=0.927$ 与 $z=-3.59$，前者模小于 $1$，不平稳。

> [!PRACTICE] 3 · 迁移
> MA(1) 模型 $X_t=\varepsilon_t+0.5\varepsilon_{t-1}$，求 $\rho(1)$ 与 $\rho(2)$。
>
> > [!ANSWER] 看答案
> > $\rho(1)=\theta/(1+\theta^2)=0.5/1.25=0.4$，$\rho(2)=0$，一阶截尾。

## 严格表述

设 $\{\varepsilon_t\}$ 为白噪声，方差 $\sigma^2$。ARMA($p,q$) 过程满足 $\Phi(B)X_t=c+\Theta(B)\varepsilon_t$，其中 $\Phi(z)=1-\sum_{i=1}^{p}\varphi_iz^i$，$\Theta(z)=1+\sum_{j=1}^{q}\theta_jz^j$。过程存在唯一宽平稳解的充要条件是 $\Phi(z)\neq0$ 对一切 $\lvert z\rvert\le1$ 成立；此时 $X_t=\mu+\Psi(B)\varepsilon_t$，$\Psi=\Theta/\Phi$ 在单位圆内解析，$\mu=c/\Phi(1)$。

自相关满足 Yule–Walker 方程 $\Gamma_p\boldsymbol\varphi=\boldsymbol\gamma_p$，其中 $(\Gamma_p)_{ij}=\rho(\lvert i-j\rvert)$，$\boldsymbol\gamma_p=(\rho(1),\dots,\rho(p))^{\mathsf T}$。最小均方误差预测为条件期望 $\hat X_{n+h}=E[X_{n+h}\mid X_n,X_{n-1},\dots]$，误差 $e_{n+h}=\sum_{j=0}^{h-1}\psi_j\varepsilon_{n+h-j}$，故 $\operatorname{Var}(e_{n+h})=\sigma^2\sum_{j=0}^{h-1}\psi_j^2$，当 $h\to\infty$ 时趋于 $\gamma(0)$。