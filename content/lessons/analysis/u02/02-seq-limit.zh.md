---
slug: "seq-limit"
subject: "analysis"
unit: "u02"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "数列极限的定义"
subtitle: "把“越来越接近”写成不等式"
minutes: 15
meta: ["阅读 15 分钟","需要 确界原理","掌握级"]
concepts: ["seql", "seq"]
prereq: ["sup"]
related: ["seq", "seql", "cauchy"]
---

## 本讲目标

“越来越接近”是一句日常话，不能用来证明定理。这一讲把它换成一个可检验的不等式：对任意 $\varepsilon>0$，从某项之后，所有项都落在 $A$ 的 $\varepsilon$ 邻域里。

学完你能用 $\varepsilon$–$N$ 语言验证具体极限，能证明极限唯一、收敛必有界，也能说清一个数列为什么不收敛。

## 三行回顾

- 极限不是“最后一项”，数列没有最后一项；它描述的是尾部整体进入任意小的邻域。
- $\varepsilon$ 是任意给定的误差，$N$ 是随之确定的起点，$N$ 可以依赖 $\varepsilon$。
- 验证极限的固定动作：写差、放大、解出 $n$、取整。

## ε–N 语言

数列 $\{a_n\}$ 收敛到 $A$，若对任意 $\varepsilon>0$，存在正整数 $N$，使当 $n>N$ 时

$$
|a_n - A| < \varepsilon .
$$

记作 $\lim_{n\to\infty} a_n = A$，或 $a_n \to A$。不收敛的数列叫发散数列。

三个细节值得停一下。$\varepsilon$ 是任给的，不是我们挑一个小的；$N$ 由 $\varepsilon$ 决定，通常写成 $N(\varepsilon)$；条件只对 $n>N$ 提出，前面有限多项是什么样无关紧要。

几何上，$|a_n - A|<\varepsilon$ 就是 $a_n \in (A-\varepsilon, A+\varepsilon)$。定义说的是：任给一个以 $A$ 为中心的窄带，数列从某一项起全部落在带内。

## 用定义验证三个极限

**例 1**：$a_n = \dfrac{2n+1}{n}$，证明 $a_n \to 2$。先写差：

$$
\left|\frac{2n+1}{n} - 2\right| = \frac{1}{n}.
$$

要让 $1/n < \varepsilon$，只需 $n > 1/\varepsilon$。取 $N = \left\lfloor 1/\varepsilon \right\rfloor$，则 $n>N$ 时 $n > 1/\varepsilon$，差小于 $\varepsilon$。

**例 2**：$a_n = \dfrac{(-1)^n}{n} \to 0$。绝对值把符号抹掉：$|a_n - 0| = 1/n$，与例 1 同一个估计。

**例 3**：$0<q<1$ 时 $q^n \to 0$。写 $q = 1/(1+h)$，其中 $h = 1/q - 1 > 0$。由 Bernoulli 不等式 $(1+h)^n \ge 1+nh$，得

$$
q^n \le \frac{1}{1+nh} < \frac{1}{nh}.
$$

取 $N = \lfloor 1/(h\varepsilon) \rfloor$ 即可。以 $q = 0.9$ 为例，$h = 1/9$，若要求误差小于 $0.01$，取 $n > 900$。

## 极限唯一与有界

**唯一性**：若 $a_n \to A$ 且 $a_n \to B$，则 $A = B$。反设 $A \ne B$，取 $\varepsilon = |A-B|/2$。存在 $N_1, N_2$，使 $n>N_1$ 时 $|a_n-A|<\varepsilon$，$n>N_2$ 时 $|a_n-B|<\varepsilon$。取 $n$ 同时大于两者，则

$$
|A-B| \le |A-a_n| + |a_n-B| < 2\varepsilon = |A-B|,
$$

矛盾。

**有界性**：收敛数列必有界。取 $\varepsilon = 1$，得到 $N$，使 $n>N$ 时 $|a_n| < |A|+1$。前 $N$ 项只有有限个，令

$$
M = \max\{|a_1|, \dots, |a_N|, |A|+1\},
$$

则一切 $n$ 都有 $|a_n| \le M$。

反过来不成立。$a_n = (-1)^n$ 有界，却不收敛：取 $\varepsilon = 1$，若它收敛到 $A$，奇偶两项都须落在 $(A-1, A+1)$ 内，但这两项距离为 $2$，不可能同时落在长度为 $2$ 的开区间里。

## 三个常见误解

> [!MYTH] 取一个很小的 $\varepsilon$ 验证过，就算证明了极限。
> 定义要求对一切 $\varepsilon>0$ 成立。验证 $\varepsilon = 0.01$ 只说明尾部进入了这一个窄带，换成 $10^{-6}$ 可能失效。证明必须对一般 $\varepsilon$ 给出 $N$。

> [!MYTH] 收敛数列一定单调，或者从某项起越来越接近极限。
> $a_n = 1 + \dfrac{(-1)^n}{n}$ 在 $0.5,\,1.25,\,0.75,\,1.125,\dots$ 之间摆动，仍然收敛到 $1$。定义只管尾部是否整体进入邻域，不管走的路线。

> [!MYTH] 有界数列一定收敛。
> $(-1)^n$ 有界但发散。有界只是收敛的必要条件；要得到收敛，还需单调性或 Cauchy 条件。

## 练习

> [!PRACTICE] 1 · 定义验证
> 用定义证明 $\lim_{n\to\infty} \dfrac{3n+1}{n+2} = 3$。
>
> > [!ANSWER] 看答案
> > 差为 $\dfrac{|3n+1-3n-6|}{n+2} = \dfrac{5}{n+2} < \dfrac{5}{n}$。取 $N = \lfloor 5/\varepsilon \rfloor$，则 $n>N$ 时差小于 $\varepsilon$。

> [!PRACTICE] 2 · 放大
> 求 $\lim_{n\to\infty} \dfrac{n^2+1}{2n^2+n}$。
>
> > [!ANSWER] 看答案
> > 极限为 $1/2$。差为 $\dfrac{|2-n|}{2(2n^2+n)}$，当 $n \ge 2$ 时不超过 $\dfrac{n}{4n^2} = \dfrac{1}{4n}$，故取 $N = \max\{2, \lfloor 1/(4\varepsilon) \rfloor\}$。

> [!PRACTICE] 3 · 发散
> 证明 $a_n = (-1)^n$ 发散。
>
> > [!ANSWER] 看答案
> > 取 $\varepsilon = 1$。若 $a_n \to A$，则存在 $N$，使 $n>N$ 时 $|a_n - A|<1$。取偶数 $n>N$ 与奇数 $m>N$，得 $2 = |a_n - a_m| \le |a_n-A| + |A-a_m| < 2$，矛盾。

> [!PRACTICE] 4 · 绝对值
> 若 $a_n \to A$，证明 $|a_n| \to |A|$；并说明逆命题不成立。
>
> > [!ANSWER] 看答案
> > 由反向三角不等式 $\big||a_n|-|A|\big| \le |a_n-A|$，取同一个 $N$ 即可。逆命题的反例是 $a_n = (-1)^n$：$|a_n| = 1$ 收敛，原数列发散。

> [!FORMAL] 严格表述
> $a_n \to A$ 定义为：$\forall \varepsilon>0\ \exists N \in \mathbb{N}^*\ \forall n>N$，$|a_n-A|<\varepsilon$。否定形式为：$\exists \varepsilon_0>0\ \forall N\ \exists n>N$，$|a_n-A| \ge \varepsilon_0$。收敛数列的极限唯一、有界；有界数列未必收敛。$0<q<1$ 时 $q^n \to 0$，估计式为 $q^n < 1/(nh)$，其中 $h = 1/q - 1$。
