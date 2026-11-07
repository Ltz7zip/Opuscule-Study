---
slug: "seq-cauchy"
subject: "analysis"
unit: "u02"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "单调有界定理与 Cauchy 准则"
subtitle: "不知道极限是谁，也能判定收敛"
minutes: 16
meta: ["阅读 16 分钟","需要 收敛数列的性质","掌握级"]
concepts: ["cauchy", "seql"]
prereq: ["seql"]
related: ["seql", "cauchy", "series"]
---

## 本讲目标

前面的判定都要先猜出极限。这一讲给两个不需要极限值的工具：单调有界定理只说“有界就收敛”，Cauchy 准则只看数列内部是否越靠越紧。

学完你能用单调有界证明递推数列收敛，能写出 $e$ 的定义并估计它，也能判断一个数列是不是 Cauchy 列。

## 三行回顾

- 单调递增且有上界的数列收敛，极限就是上确界；单调递减有下界同理。
- Cauchy 列要求从某项起任意两项都任意接近，比“相邻两项接近”强得多。
- 在实数系内，收敛与 Cauchy 等价；这条等价性用到了完备性。

## 单调有界定理

设 $\{a_n\}$ 单调递增且有上界。由确界原理，$S = \{a_n\}$ 有上确界 $\beta$。对任意 $\varepsilon>0$，$\beta-\varepsilon$ 不是上界，故存在 $N$ 使 $a_N > \beta-\varepsilon$。当 $n>N$ 时，单调性给出

$$
\beta - \varepsilon < a_N \le a_n \le \beta,
$$

所以 $|a_n-\beta|<\varepsilon$。结论：$a_n \to \beta = \sup\{a_n\}$。

单调递减的情形对 $-a_n$ 使用，极限为 $\inf\{a_n\}$。定理的两个条件缺一不可：$a_n = n$ 单调但无界，$a_n = (-1)^n$ 有界但不单调。

## 两个经典数列

**$e$ 的存在**。令 $a_n = \left(1+\dfrac{1}{n}\right)^n$。按二项式展开，

$$
a_n = \sum_{k=0}^{n} \frac{1}{k!}\prod_{j=0}^{k-1}\left(1-\frac{j}{n}\right).
$$

每一项都随 $n$ 增大而不减，项数也在增加，故 $\{a_n\}$ 递增。另一方面，每个乘积不超过 $1$，且 $k! \ge 2^{k-1}$（$k \ge 2$），于是

$$
a_n \le 1 + 1 + \frac{1}{2} + \frac{1}{4} + \cdots < 3.
$$

单调有界，故收敛。这个极限记作 $e \approx 2.71828$。

**递推数列**。$a_1 = \sqrt{2}$，$a_{n+1} = \sqrt{2+a_n}$。先用归纳法证明 $a_n < 2$：$a_1 < 2$；若 $a_n < 2$，则 $a_{n+1} < \sqrt{4} = 2$。再证递增：

$$
a_{n+1}^2 - a_n^2 = 2 + a_n - a_n^2 = (2-a_n)(1+a_n) > 0.
$$

两项都为正，故 $a_{n+1} > a_n$。极限存在，设为 $L$；在递推式两边取极限得 $L = \sqrt{2+L}$，即 $L^2 - L - 2 = 0$，正根 $L = 2$。数值上前几项是 $1.414,\ 1.848,\ 1.962,\ 1.990,\dots$。

## Cauchy 准则

数列 $\{a_n\}$ 是 Cauchy 列，若对任意 $\varepsilon>0$，存在 $N$，使当 $m,n>N$ 时

$$
|a_m - a_n| < \varepsilon.
$$

**收敛必 Cauchy**：若 $a_n \to A$，取 $N$ 使 $n>N$ 时 $|a_n-A|<\varepsilon/2$，则 $m,n>N$ 时

$$
|a_m-a_n| \le |a_m-A| + |A-a_n| < \varepsilon.
$$

**Cauchy 必收敛**：先由 Cauchy 性取 $\varepsilon=1$，得 $|a_n| \le |a_N|+1$（$n>N$），故有界。有界数列有收敛子列 $a_{n_k} \to A$（下一讲证明）。对给定 $\varepsilon$，取 $N$ 使 $m,n>N$ 时 $|a_m-a_n|<\varepsilon/2$，再取 $k$ 足够大，使 $n_k>N$ 且 $|a_{n_k}-A|<\varepsilon/2$。则 $n>N$ 时

$$
|a_n-A| \le |a_n-a_{n_k}| + |a_{n_k}-A| < \varepsilon.
$$

**反例**：调和级数的部分和 $H_n = 1 + 1/2 + \cdots + 1/n$ 不是 Cauchy 列。因为

$$
H_{2n} - H_n = \frac{1}{n+1} + \cdots + \frac{1}{2n} \ge n \cdot \frac{1}{2n} = \frac{1}{2},
$$

取 $\varepsilon = 1/2$ 就破坏了 Cauchy 条件。这也说明 $H_n$ 发散。

## 三个常见误解

> [!MYTH] 单调数列一定收敛。
> $a_n = n$ 单调递增却无界，因而不收敛。单调只排除来回摆动，不能阻止跑向无穷；必须有界。

> [!MYTH] 相邻两项越来越近，就是 Cauchy 列。
> Cauchy 要求任意两项，不只相邻两项。$H_n$ 的相邻差 $1/n \to 0$，但 $H_{2n}-H_n \ge 1/2$。$a_n = \sqrt{n}$ 也是相邻差趋于 $0$ 却无界。

> [!MYTH] Cauchy 准则只靠数列自身，因此在有理数系里也成立。
> 充分性用到完备性。取 $\sqrt{2}$ 的不足近似 $1.4,\ 1.41,\ 1.414,\dots$，它在 $\mathbb{Q}$ 中是 Cauchy 列，却在 $\mathbb{Q}$ 内没有极限。准则成立的范围是实数系。

## 练习

> [!PRACTICE] 1 · 开方迭代
> $a_1 = 2$，$a_{n+1} = \dfrac{1}{2}\left(a_n + \dfrac{2}{a_n}\right)$。证明它收敛并求极限。
>
> > [!ANSWER] 看答案
> > 由 AM–GM，$a_{n+1} \ge \sqrt{2}$；且 $a_{n+1} - a_n = \dfrac{2-a_n^2}{2a_n} \le 0$（$n \ge 2$ 时 $a_n^2 \ge 2$），故递减有下界。极限 $L$ 满足 $L = (L + 2/L)/2$，得 $L = \sqrt{2}$。前几项为 $2,\ 1.5,\ 1.4167$。

> [!PRACTICE] 2 · 不是 Cauchy
> 证明 $H_n = 1 + 1/2 + \cdots + 1/n$ 发散。
>
> > [!ANSWER] 看答案
> > $H_{2n}-H_n \ge 1/2$，取 $\varepsilon = 1/2$，任何 $N$ 之后都能找到 $n>N$ 使差值不小于 $1/2$，故不是 Cauchy 列，因而不收敛。

> [!PRACTICE] 3 · 平方倒数和
> 用 Cauchy 准则证明 $s_n = 1 + \dfrac{1}{2^2} + \cdots + \dfrac{1}{n^2}$ 收敛。
>
> > [!ANSWER] 看答案
> > 设 $m>n$，则 $\displaystyle\sum_{k=n+1}^{m}\frac{1}{k^2} < \sum_{k=n+1}^{m}\frac{1}{k(k-1)} = \frac{1}{n} - \frac{1}{m} < \frac{1}{n}$。取 $N = \lfloor 1/\varepsilon \rfloor$ 即可。

> [!PRACTICE] 4 · 黄金比
> $a_1 = 1$，$a_{n+1} = \sqrt{1+a_n}$，证明收敛并求极限。
>
> > [!ANSWER] 看答案
> > 归纳得 $a_n < 2$。又 $a_{n+1}^2 - a_n^2 = 1 + a_n - a_n^2 = (\varphi - a_n)\left(a_n + \dfrac{1}{\varphi}\right) > 0$（当 $a_n < \varphi$ 时），故数列递增有上界。极限满足 $L^2 = 1+L$，取正根 $L = (1+\sqrt{5})/2 \approx 1.618$。

> [!FORMAL] 严格表述
> 单调有界定理：单调递增且有上界的数列收敛于其上确界。Cauchy 准则：$\{a_n\}$ 收敛当且仅当 $\forall \varepsilon>0\ \exists N\ \forall m,n>N$，$|a_m-a_n|<\varepsilon$。必要性只用定义；充分性用有界性与收敛子列，因而依赖确界原理。推论：收敛 $\Rightarrow$ Cauchy $\Rightarrow$ 有界，反向均不成立。
