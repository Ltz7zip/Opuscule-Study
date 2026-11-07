---
slug: "unifcont-def"
subject: "analysis"
unit: "u03"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "一致连续"
subtitle: "一个 δ 管住整个区间"
minutes: 15
meta: ["阅读 15 分钟","需要 闭区间上的连续函数","掌握级"]
concepts: ["unifcont", "contprop"]
prereq: ["cont", "contprop"]
related: ["cont", "unifconv"]
---

## 本讲目标

连续是逐点的：对每个 $x_0$ 各有一个 $\delta$。一致连续把它加强为：整个区间共用一个 $\delta$，只要两点足够近，函数值就近，不论这两点在哪里。

学完你能写出定义与否定的量化形式，能用两列点证明不一致连续，也能用 Lipschitz 条件或 Cantor 定理判定一致连续。

## 三行回顾

- 一致连续要求 $\delta$ 只依赖 $\varepsilon$，不依赖具体位置。
- 连续不一定一致连续：$1/x$ 在 $(0,1)$ 上连续，却越靠近 $0$ 越陡。
- 闭区间上的连续函数一定一致连续，这是 Cantor 定理。

## 一致连续的定义

设 $f$ 在区间 $I$ 上有定义。若对任意 $\varepsilon>0$，存在 $\delta>0$，使对任意 $x,y\in I$，只要 $|x-y|<\delta$，就有

$$
|f(x)-f(y)|<\varepsilon,
$$

称 $f$ 在 $I$ 上一致连续。

与普通连续对照：普通连续的 $\delta$ 依赖于 $\varepsilon$ 和 $x_0$；一致连续的 $\delta$ 只依赖 $\varepsilon$。量词顺序说明了区别：

$$
\text{连续：}\ \forall x_0\ \forall\varepsilon\ \exists\delta; \qquad
\text{一致连续：}\ \forall\varepsilon\ \exists\delta\ \forall x,y.
$$

否定形式同样重要：$f$ 在 $I$ 上不一致连续，当且仅当存在 $\varepsilon_0>0$，使对任意 $\delta>0$，都能找到 $x,y\in I$，满足 $|x-y|<\delta$ 但 $|f(x)-f(y)|\ge\varepsilon_0$。

## 一个反例与一个证明

**反例**：$f(x)=\dfrac{1}{x}$ 在 $(0,1)$ 上不一致连续。取 $\varepsilon_0=1$，对任意 $\delta>0$，取 $n$ 足够大，令

$$
x_n=\frac{1}{n}, \qquad y_n=\frac{1}{n+1}.
$$

则 $|x_n-y_n|=\dfrac{1}{n(n+1)}\to 0$，可以小于任何 $\delta$；但

$$
|f(x_n)-f(y_n)| = |n-(n+1)| = 1 \ge \varepsilon_0 .
$$

两点可以任意接近，函数值却始终差 $1$。原因是斜率在 $0$ 附近无界。

**证明**：$f(x)=x^2$ 在 $(0,1)$ 上一致连续。对任意 $x,y\in(0,1)$，

$$
|x^2-y^2| = |x+y|\,|x-y| \le 2|x-y|.
$$

取 $\delta=\varepsilon/2$，与 $x,y$ 的位置无关。

同一个函数在 $\mathbb{R}$ 上不一致连续。取 $x_n=n$，$y_n=n+\dfrac{1}{n}$，则 $|x_n-y_n|=\dfrac{1}{n}\to 0$，而

$$
|x_n^2-y_n^2| = 2+\frac{1}{n^2} \ge 2 .
$$

区间变大后，同样的 $\delta$ 管不住远处。

## Cantor 定理与判别法

> [!NOTE]
> Cantor 定理：若 $f$ 在闭区间 $[a,b]$ 上连续，则 $f$ 在 $[a,b]$ 上一致连续。

证明用反证与 Bolzano–Weierstrass。若不一致连续，存在 $\varepsilon_0>0$ 与两列 $x_n,y_n$，使 $|x_n-y_n|<1/n$ 而 $|f(x_n)-f(y_n)|\ge\varepsilon_0$。有界数列 $\{x_n\}$ 有收敛子列 $x_{n_k}\to x_0\in[a,b]$；由 $|x_{n_k}-y_{n_k}|<1/n_k$ 得 $y_{n_k}\to x_0$。连续性给出 $f(x_{n_k})-f(y_{n_k})\to f(x_0)-f(x_0)=0$，矛盾。

两个常用判别法。**Lipschitz 条件**：若存在 $L$，使 $|f(x)-f(y)|\le L|x-y|$，则 $f$ 一致连续，取 $\delta=\varepsilon/L$。**导数有界**：若 $f$ 在区间上可导且 $|f'|\le L$，由中值定理得 Lipschitz 条件。

导数有界只是充分条件。$\sqrt{x}$ 在 $[0,1]$ 上一致连续（Cantor 定理），但 $f'(x)=\dfrac{1}{2\sqrt{x}}$ 在 $0$ 附近无界。

## 三个常见误解

> [!MYTH] 连续函数在其定义域上一定一致连续。
> $1/x$ 在 $(0,1)$ 上每点连续，却随着 $x\to 0^+$ 越来越陡，取 $x_n=1/n$、$y_n=1/(n+1)$ 即知不一致连续。定义域不是闭区间时，Cantor 定理不适用。

> [!MYTH] 一致连续等价于导数有界。
> 导数有界能推出一致连续，反之不然。$\sqrt{x}$ 在 $[0,1]$ 上一致连续，导数却在 $0$ 处无界；$\sin x$ 在 $\mathbb{R}$ 上一致连续，导数有界，但这只是巧合式的充分条件。

> [!MYTH] 每点连续时，把各点的 $\delta$ 取最小就得到一致的 $\delta$。
> 无穷多个正数未必有正下界。$1/x$ 在 $(0,1)$ 上各点的 $\delta$ 随 $x\to 0^+$ 趋于 $0$，最小值不存在，也无法取到正数。

## 练习

> [!PRACTICE] 1 · 线性函数
> 证明 $f(x)=3x+2$ 在 $\mathbb{R}$ 上一致连续。
>
> > [!ANSWER] 看答案
> > $|f(x)-f(y)|=3|x-y|$。任给 $\varepsilon>0$，取 $\delta=\varepsilon/3$，与位置无关。

> [!PRACTICE] 2 · 倒数
> 证明 $f(x)=\dfrac{1}{x}$ 在 $(0,1)$ 上不一致连续。
>
> > [!ANSWER] 看答案
> > 取 $\varepsilon_0=1$，$x_n=1/n$，$y_n=1/(n+1)$。距离趋于 $0$，函数值之差恒为 $1$，故任何 $\delta$ 都被破坏。

> [!PRACTICE] 3 · 区间依赖
> 证明 $x^2$ 在 $(0,1)$ 上一致连续，但在 $\mathbb{R}$ 上不一致连续。
>
> > [!ANSWER] 看答案
> > 在 $(0,1)$ 上 $|x^2-y^2|\le 2|x-y|$，取 $\delta=\varepsilon/2$。在 $\mathbb{R}$ 上取 $x_n=n$、$y_n=n+1/n$，距离趋于 $0$ 而函数值之差至少为 $2$。

> [!PRACTICE] 4 · 正弦
> 证明 $\sin x$ 在 $\mathbb{R}$ 上一致连续。
>
> > [!ANSWER] 看答案
> > 由和差化积，$|\sin x-\sin y| = 2\left|\cos\dfrac{x+y}{2}\right|\left|\sin\dfrac{x-y}{2}\right| \le |x-y|$。取 $\delta=\varepsilon$ 即可。

> [!FORMAL] 严格表述
> $f$ 在 $I$ 上一致连续，若 $\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in I$，$|x-y|<\delta \Rightarrow |f(x)-f(y)|<\varepsilon$。否定：$\exists\varepsilon_0>0\ \forall\delta>0\ \exists x,y\in I$，$|x-y|<\delta$ 且 $|f(x)-f(y)|\ge\varepsilon_0$。Cantor 定理：$C[a,b]$ 中的函数在 $[a,b]$ 上一致连续。Lipschitz 条件 $|f(x)-f(y)|\le L|x-y|$ 是充分条件，导数有界是它的特例。
