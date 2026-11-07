---
slug: "r-estimation-and-tests"
subject: "probability"
unit: "u11"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 概率论与数理统计 · 专业模式"
title: "用 R 完成参数估计与假设检验"
subtitle: "t.test、chisq.test、lm 与 aov 的调用与读法"
minutes: 17
meta: ["阅读 17 分钟","需要 假设检验与回归","掌握级"]
concepts: ["estimation", "hypothesistest", "regression"]
prereq: ["estimation", "hypothesistest"]
related: ["regression", "sampling"]
---

## 本讲目标

学完这一讲，你能正确调用 `t.test`、`chisq.test`、`lm`、`aov`，并从输出里读出统计量、自由度、$p$ 值与区间，而不是只看一个"显著"。

## 三行回顾

- `t.test` 给出统计量、自由度、$p$ 值与置信区间，`var.equal` 决定是否合并方差。
- `chisq.test` 默认做Pearson 卡方，`correct = TRUE` 会对 $2\times2$ 表做连续性校正。
- `lm` 与 `aov` 共用公式接口 `y ~ x`，`summary` 给出系数与 $F$ 检验。

## t.test：一个样本与两个样本

十个观测 $3,4,4,5,6,6,7,8,9,12$，检验 $H_0:\mu=5$：

```r
x <- c(3, 4, 4, 5, 6, 6, 7, 8, 9, 12)
t.test(x, mu = 5)
```

输出要点：`t = 1.6336`，`df = 9`，`p-value = 0.1366`，$95\%$ 置信区间 $[4.456,\,8.344]$。均值 $6.4$、标准误 $0.859$，与手算一致：

$$
t=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{6.4-5}{0.859}=1.63
$$

两样本时用公式 `y ~ group`。取两组：$5,6,7,6$ 与 $7,8,8,9$，两组均值 $6$ 与 $8$，合并方差 $s_p^2=0.667$，

$$
t=\frac{6-8}{\sqrt{0.667\left(\frac14+\frac14\right)}}=\frac{-2}{0.577}=-3.46,\qquad df=6
$$

`t.test(y ~ g, var.equal = TRUE)` 给出 $p=0.0135$，拒绝。默认 `var.equal = FALSE` 走 Welch 校正，自由度变成小数；两组方差相等时两种结果接近，方差悬殊时差异可达数倍，报告时必须说明用的是哪一种。

| 参数 | 默认 | 何时要改 |
| --- | --- | --- |
| `mu` | 0 | 单样本检验的零假设值 |
| `var.equal` | `FALSE` | 明确方差齐时设 `TRUE` |
| `paired` | `FALSE` | 配对数据设 `TRUE` |
| `alternative` | `"two.sided"` | 有方向时改 `"less"` / `"greater"` |
| `conf.level` | 0.95 | 需要其他置信水平时 |

## chisq.test：拟合优度与列联表

掷骰子 60 次，六面计数为 $8,9,10,11,10,12$，检验是否均匀。期望频数都是 $10$：

$$
\chi^2=\sum_{i=1}^6\frac{(O_i-E_i)^2}{E_i}=\frac{4+1+0+1+0+4}{10}=1.0
$$

```r
obs <- c(8, 9, 10, 11, 10, 12)
chisq.test(obs)
```

输出 `X-squared = 1`，`df = 5`，`p-value = 0.9626`，不拒绝"均匀"。注意自由度是 $6-1=5$：总和固定为 60，最后一个格子不自由。

列联表用 `table()` 先生成，再交给 `chisq.test`。$2\times2$ 表默认加 Yates 校正，`correct = FALSE` 关闭。期望频数小于 5 的格子超过两成时，卡方近似不可靠，应改用 `fisher.test`。

## lm 与 aov：回归与方差分析

回归沿用 $x=1,\dots,5$、$y=2,4,5,8,11$：

```r
fit <- lm(y ~ x)
summary(fit)
confint(fit)
```

输出中 `(Intercept) = -0.6`、`x = 2.2`，与手算的 $b_0,b_1$ 一致；`Residual standard error: 0.730 on 3 degrees of freedom` 即 $s=\sqrt{1.6/3}$；`Multiple R-squared: 0.968`；`F-statistic: 90.75 on 1 and 3 DF`，`p-value: 0.002523`。`confint` 给出斜率的 $95\%$ 区间，比单看 $p$ 值更有信息。

| 输出行 | 含义 | 本例数值 |
| --- | --- | --- |
| `Estimate` | 系数估计 | $-0.6$ 与 $2.2$ |
| `Std. Error` | 系数标准误 | 截距 $0.766$，斜率 $0.231$ |
| `t value` | 系数除以标准误 | $-0.78$ 与 $9.53$ |
| `Pr(>\|t\|)` | 双侧 $p$ 值 | $0.491$ 与 $0.0025$ |

方差分析用 `aov`，数据必须是长格式（一列数值、一列组别）：

```r
fit2 <- aov(value ~ group, data = df_long)
summary(fit2)
```

对三组 $5,6,7,6$；$7,8,8,9$；$6,7,7,8$，输出 `Df` 为 $2$ 与 $9$，`Sum Sq` 为 $8.0$ 与 $6.0$，`Mean Sq` 为 $4.0$ 与 $0.667$，`F value = 6`，`Pr(>F) = 0.0221`。这与手算的方差分析表逐格对应。

> [!MYTH] `p < 0.05` 就是 R 认为"有显著差异"。
> R 只做算术，不做判断。$p$ 值、效应量、区间宽度与实验设计要一起读，结论由你负责。

> [!NOTE]
> `lm` 与 `aov` 在底层是同一个线性模型。`aov` 只是把输出整理成方差分析表；对单因素数据，`summary(lm(y ~ g))` 的 $F$ 与 `summary(aov(y ~ g))` 的 $F$ 完全相同。

## 三个常见误解

> [!MYTH] `t.test` 默认假设方差相等。
> 默认是 Welch 检验（`var.equal = FALSE`），自由度由数据算出，可能不是整数。要合并方差必须显式写 `var.equal = TRUE`。

> [!MYTH] 卡方检验的 $p$ 值小就说明关联强。
> $p$ 值受样本量放大，关联强度要看 Cramér's $V$ 或列联表的条件比例。大样本下微弱关联也会显著。

> [!MYTH] `summary(lm)` 里的 `R²` 高就说明模型可用于预测。
> 样本内 $R^2$ 会随变量增加而上升。预测能力要用交叉验证或调整 $R^2$ 评估，且外推范围不能超出数据。

## 练习

> [!PRACTICE] 1 · 照着做
> 用 `t.test` 检验数据 $10,12,9,11,13$ 的均值是否为 $10$，写出代码与结论。
>
> > [!ANSWER] 看答案
> > `t.test(c(10,12,9,11,13), mu = 10)` 得 $\bar x=11$、$s=1.581$、$se=0.707$、$t=1.414$、$df=4$、$p=0.230$，不拒绝。

> [!PRACTICE] 2 · 变式
> 上题改为单侧 $H_1:\mu>10$，$p$ 值如何变化？
>
> > [!ANSWER] 看答案
> > 加 `alternative = "greater"`，$p$ 值减半为 $0.115$，仍不拒绝。单侧只改变尾部面积，不改变统计量。

> [!PRACTICE] 3 · 迁移
> `chisq.test` 警告 "Chi-squared approximation may be incorrect"，应如何处理？
>
> > [!ANSWER] 看答案
> > 说明有期望频数小于 5。合并类别、增大样本，或改用 `fisher.test` 精确检验；不要忽略警告直接报 $p$ 值。

## 严格表述

`t.test` 在单样本情形计算 $T=\sqrt n(\bar X-\mu_0)/S$，在 $H_0$ 与正态总体下服从 $t(n-1)$；两样本合并方差情形下 $S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$，统计量服从 $t(n_1+n_2-2)$，Welch 情形自由度由 Satterthwaite 近似给出。`chisq.test` 计算 $\sum(O-E)^2/E$，在独立性与期望频数条件下渐近服从 $\chi^2((r-1)(c-1))$，拟合优度情形自由度为类别数减一。`lm` 求解 $\hat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y$，残差平方和 $y^{\mathsf T}(I-H)y$ 与 $H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$ 相关；`aov` 对单因素模型把总平方和分解为组间与组内，$F$ 统计量服从 $F(k-1,n-k)$。R 输出的 `Pr(>|t|)` 与 `Pr(>F)` 都是右尾概率，双侧检验已自动乘 2。