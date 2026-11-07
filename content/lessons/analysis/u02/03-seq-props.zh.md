---
slug: "seq-props"
subject: "analysis"
unit: "u02"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "收敛数列的性质"
subtitle: "四则运算、保序与夹逼"
minutes: 14
meta: ["阅读 14 分钟","需要 数列极限的定义","掌握级"]
concepts: ["seql", "subseq"]
prereq: ["seql"]
related: ["seql", "cauchy"]
---

## 本讲目标

定义只告诉我们怎么验证极限，不负责计算。这一讲把极限变成可以运算的对象：和、差、积、商各自取极限，不等关系可以传递，被夹在中间的数列被迫收敛。

学完你能用四则运算拆开复杂数列，用夹逼定理处理带根号与指数的情形，并知道每条法则的适用条件。

## 三行回顾

- 若 $a_n \to a$、$b_n \to b$，则和、差、积、商（分母极限非零）分别趋于 $a+b$、$a-b$、$ab$、$a/b$。
- 保序性只传递 $\le$，不传递 $<$：$0 < 1/n$，极限却是 $0$。
- 夹逼定理把“估计”变成“求值”：上下两个数列夹住它，极限相同就够。

## 四则运算

设 $a_n \to a$，$b_n \to b$，则

$$
a_n \pm b_n \to a \pm b, \qquad a_n b_n \to ab, \qquad \frac{a_n}{b_n} \to \frac{a}{b}\ (b \ne 0).
$$

乘积的证明只有一行关键拆分：

$$
a_nb_n - ab = a_n(b_n-b) + b(a_n-a).
$$

收敛数列有界，故存在 $M$ 使 $|a_n| \le M$；于是

$$
|a_nb_n-ab| \le M|b_n-b| + |b||a_n-a|.
$$

两项都能任意小，和也就任意小。商法则先用 $b_n \to b \ne 0$ 保证从某项起 $|b_n| > |b|/2$，再对 $1/b_n$ 作同样的估计。

这条定理把计算变简单：$\dfrac{n^2+3n}{2n^2-1}$ 上下同除以 $n^2$，得 $\dfrac{1+3/n}{2-1/n^2} \to \dfrac{1}{2}$。分子分母各自的极限都存在，且分母极限 $2 \ne 0$。

## 保序性与夹逼

**保序性**：若存在 $N$，使 $n>N$ 时 $a_n \le b_n$，且 $a_n \to a$、$b_n \to b$，则 $a \le b$。反设 $a>b$，取 $\varepsilon = (a-b)/2$，则从某项起 $a_n > a-\varepsilon > b+\varepsilon > b_n$，与 $a_n \le b_n$ 矛盾。

严格不等号不能保留。$a_n = 0$，$b_n = 1/n$，恒有 $a_n < b_n$，两边极限都是 $0$。

**夹逼定理**：若从某项起 $b_n \le a_n \le c_n$，且 $b_n \to L$、$c_n \to L$，则 $a_n \to L$。证明用定义直接夹：$|a_n-L| \le \max\{|b_n-L|, |c_n-L|\}$。

例：$\left|\dfrac{\sin n}{n}\right| \le \dfrac{1}{n} \to 0$，故 $\dfrac{\sin n}{n} \to 0$。这里不需要知道 $\sin n$ 的任何具体值，只需要它有界。

## 三个具体极限

**根式差**：$\sqrt{n+1}-\sqrt{n} = \dfrac{1}{\sqrt{n+1}+\sqrt{n}} \le \dfrac{1}{2\sqrt{n}} \to 0$。有理化是处理根式差的固定动作。

**指数和**：求 $(2^n+3^n)^{1/n}$。下界直接取最大项：$3 \le (2^n+3^n)^{1/n}$。上界用 $2^n+3^n \le 2 \cdot 3^n$，得

$$
(2^n+3^n)^{1/n} \le 3 \cdot 2^{1/n}.
$$

而 $2^{1/n} \to 1$：写 $2^{1/n} = 1+h_n$，由 $2 = (1+h_n)^n \ge 1+nh_n$ 得 $0 \le h_n \le 1/n$。两端夹住，极限为 $3$。

**递推分式**：$a_1 = 1$，$a_{n+1} = \dfrac{1}{1+a_n}$。若极限存在，设为 $L$，则 $L = 1/(1+L)$，即 $L^2+L-1=0$，取正根 $L = (\sqrt{5}-1)/2 \approx 0.618$。注意这一步只是“若存在”的候选值，存在性要靠单调有界，下一讲处理。

## 三个常见误解

> [!MYTH] 若恒有 $a_n < b_n$，则 $\lim a_n < \lim b_n$。
> 只能得到 $\le$。$a_n = 0$ 与 $b_n = 1/n$ 恒满足 $a_n < b_n$，两个极限都等于 $0$。

> [!MYTH] $\lim \dfrac{a_n}{b_n} = \dfrac{\lim a_n}{\lim b_n}$ 总是成立。
> 需要两个极限都存在，且分母极限不为零、分母从某项起不为零。$a_n = 1$，$b_n = 1/n$ 时右边没有意义，左边的商 $n$ 发散。

> [!MYTH] 两个发散数列之和一定发散。
> $a_n = n$ 与 $b_n = -n$ 都发散，和恒为 $0$。发散性在加法下不稳定，只有一边收敛时才能传递。

## 练习

> [!PRACTICE] 1 · 有理函数
> 求 $\lim_{n\to\infty} \dfrac{n^2+3n}{2n^2-1}$。
>
> > [!ANSWER] 看答案
> > 上下同除以 $n^2$：$\dfrac{1+3/n}{2-1/n^2} \to \dfrac{1}{2}$。分母极限为 $2 \ne 0$，商法则可用。

> [!PRACTICE] 2 · 根式差
> 求 $\lim_{n\to\infty}(\sqrt{n+1}-\sqrt{n})$。
>
> > [!ANSWER] 看答案
> > 有理化得 $\dfrac{1}{\sqrt{n+1}+\sqrt{n}} \le \dfrac{1}{2\sqrt{n}} \to 0$，故极限为 $0$。

> [!PRACTICE] 3 · 指数和
> 求 $\lim_{n\to\infty}(2^n+3^n)^{1/n}$。
>
> > [!ANSWER] 看答案
> > 由 $3^n \le 2^n+3^n \le 2 \cdot 3^n$ 得 $3 \le (2^n+3^n)^{1/n} \le 3 \cdot 2^{1/n}$。而 $2^{1/n} \to 1$，夹逼得极限为 $3$。

> [!PRACTICE] 4 · 平均值
> 若 $a_n \to a$，证明 $\dfrac{a_1+a_2+\cdots+a_n}{n} \to a$。
>
> > [!ANSWER] 看答案
> > 给定 $\varepsilon>0$，取 $N_1$ 使 $n>N_1$ 时 $|a_n-a|<\varepsilon/2$。前 $N_1$ 项之和固定，记为 $S$；取 $N>N_1$ 且 $N>2|S|/\varepsilon$。则 $n>N$ 时平均值与 $a$ 的差不超过 $\dfrac{|S|}{n} + \dfrac{\varepsilon}{2} < \varepsilon$。

> [!FORMAL] 严格表述
> 设 $a_n \to a$，$b_n \to b$。则对任意常数 $\alpha,\beta$，$\alpha a_n + \beta b_n \to \alpha a + \beta b$；$a_nb_n \to ab$；当 $b \ne 0$ 且 $b_n \ne 0$ 时 $a_n/b_n \to a/b$。若从某项起 $a_n \le b_n$，则 $a \le b$。若从某项起 $b_n \le a_n \le c_n$ 且 $b_n,c_n \to L$，则 $a_n \to L$。这些结论都只用到定义与收敛数列的有界性。
