---
slug: "riemann-def"
subject: "analysis"
unit: "u07"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "定积分的定义"
subtitle: "用有限多个矩形去逼近一块曲边面积"
minutes: 17
meta: ["阅读 17 分钟","需要 初等数学","掌握级"]
concepts: ["defint", "sup"]
prereq: ["contprop"]
related: ["defint", "indefint"]
---

## 本讲目标

学完这一讲，你能写出分割、Darboux 和与可积的完整定义，能用等分分割亲手算出 $\int_0^1 x^2dx=\frac13$，并能判断一个有界的间断函数是否可积。

定积分不是“原函数之差”，那是后面才有的计算工具。定义阶段只有一件事：把区间切碎，用矩形面积去夹逼，看上下两串和能否挤到同一个数。

## 三行回顾

- 连续函数在闭区间上有最值，这是上一章反复使用的性质。
- 把区间分成若干小段，每段取一个矩形，面积和就能近似曲边梯形。
- 分割越细，近似越好；如果所有足够细的分割都挤向同一个数，这个数就是积分。

## 分割与 Darboux 和

设 $f$ 在 $[a,b]$ 上有界。取分割

$$T:\ a=x_0<x_1<\cdots<x_n=b,\qquad \Delta x_i=x_i-x_{i-1}.$$

在每个小区间上取

$$M_i=\sup_{[x_{i-1},x_i]}f,\qquad m_i=\inf_{[x_{i-1},x_i]}f .$$

定义**上和**与**下和**：

$$S(T)=\sum_{i=1}^{n}M_i\Delta x_i,\qquad s(T)=\sum_{i=1}^{n}m_i\Delta x_i .$$

分割加细时，上和只减不增，下和只增不减。于是所有上和有下界、所有下和有上界，可以取

$$\overline{\int_a^b}f=\inf_T S(T),\qquad \underline{\int_a^b}f=\sup_T s(T).$$

**可积**的定义是二者相等：$\overline{\int}=\underline{\int}=I$，此时记 $I=\int_a^b f(x)\,dx$。

> [!NOTE]
> 等价说法：任给 $\varepsilon>0$，存在分割 $T$ 使 $S(T)-s(T)<\varepsilon$。

## 用定义算一个积分

取 $f(x)=x^2$ 在 $[0,1]$ 上，用 $n$ 等分，$\Delta x_i=\frac1n$。

在上和里，$M_i=\left(\frac{i}{n}\right)^2$，所以

$$S_n=\frac{1}{n^3}\sum_{i=1}^{n}i^2=\frac{(n+1)(2n+1)}{6n^2}\ \longrightarrow\ \frac{1}{3}.$$

在下和里，$m_i=\left(\frac{i-1}{n}\right)^2$，所以

$$s_n=\frac{1}{n^3}\sum_{j=0}^{n-1}j^2=\frac{(n-1)(2n-1)}{6n^2}\ \longrightarrow\ \frac{1}{3}.$$

两串极限相同，且对每个 $n$ 都有 $s_n\le\frac13\le S_n$。由夹逼，上下积分都等于 $\frac13$，故 $\int_0^1x^2dx=\frac13$。

具体数字能看出收敛速度：$n=10$ 时 $S_{10}=\frac{11\cdot21}{600}=0.385$，$s_{10}=\frac{9\cdot19}{600}=0.285$，误差约 $0.05$；$n=100$ 时误差约 $0.005$，与 $\frac{1}{n}$ 同阶。

## 哪些函数可积

| 条件 | 是否可积 | 说明 |
| --- | --- | --- |
| 闭区间上连续 | 可积 | 一致连续保证细分割的振幅整体变小 |
| 闭区间上单调 | 可积 | 振幅之和可裂项相消 |
| 有界、只有有限个间断点 | 可积 | 把间断点附近单独圈出 |
| 有界、间断点无穷多 | 不一定 | 要看间断点集合的“大小” |

经典的不可积例子是 Dirichlet 函数：

$$D(x)=\begin{cases}1,&x\in\mathbb{Q},\\0,&x\notin\mathbb{Q}.\end{cases}$$

在任何小区间里都同时有有理数与无理数，所以每个 $M_i=1$、$m_i=0$，从而 $S(T)=1$、$s(T)=0$ 对一切分割成立。上下积分分别为 $1$ 与 $0$，不相等，故不可积。

## 三个常见误解

> [!MYTH] 可积函数必须连续。
> 不必。$f(x)=\operatorname{sgn}x$ 在 $[-1,1]$ 上只有一个间断点，仍然可积，积分为 $0$。阶梯函数、单调函数都可能有跳跃。

> [!MYTH] 间断点有无穷多个就一定不可积。
> 不一定。Thomae 函数在有理点取值 $\frac1q$（$p/q$ 为最简分数）、无理点取值 $0$，它在每个有理点间断，却仍然 Riemann 可积，积分等于 $0$。关键是间断点能否被总长度任意小的区间覆盖。

> [!MYTH] 不同的分割与取点会得到不同的积分值。
> 单个 Riemann 和当然随分割与取点而变，但可积时所有这些和的极限唯一。定义要求的是“极限存在”，不是“每个和相等”。

## 练习

> [!PRACTICE] 1 · 等分计算
> 用 $n$ 等分与定义计算 $\int_0^1 x\,dx$。
>
> > [!ANSWER] 看答案
> > $M_i=\frac{i}{n}$，$S_n=\frac{1}{n^2}\cdot\frac{n(n+1)}{2}=\frac{n+1}{2n}\to\frac12$；$s_n=\frac{n-1}{2n}\to\frac12$。故积分为 $\frac12$。

> [!PRACTICE] 2 · 线性函数
> 用定义计算 $\int_0^1(2x+1)\,dx$。
>
> > [!ANSWER] 看答案
> > $M_i=2\cdot\frac{i}{n}+1$，$S_n=\frac{2}{n^2}\cdot\frac{n(n+1)}{2}+1=\frac{n+1}{n}+1\to2$；下和同样趋于 $2$。积分为 $2$。

> [!PRACTICE] 3 · 判定可积性
> 判断 Dirichlet 函数在 $[0,1]$ 上是否可积。
>
> > [!ANSWER] 看答案
> > 不可积。任意小区间内既有有理点又有无理点，故 $M_i=1$、$m_i=0$，上和恒为 $1$，下和恒为 $0$，上下积分不相等。

> [!PRACTICE] 4 · 间断点
> $f(x)=\operatorname{sgn}x$ 在 $[-1,1]$ 上是否可积？积分等于多少？
>
> > [!ANSWER] 看答案
> > 可积。除 $x=0$ 外连续且有界。把 $0$ 放进一个长度任意小的小区间，其余部分连续，可算出被该小区间贡献的面积不超过其长度；故 $\overline{\int}=\underline{\int}=0$，积分为 $0$。

> [!FORMAL] 严格表述
> 设 $f$ 在 $[a,b]$ 上有界，$T$ 为分割，$S(T),s(T)$ 如上。称 $f$ 在 $[a,b]$ 上 Riemann 可积，若 $\inf_T S(T)=\sup_T s(T)=I$，并记 $I=\int_a^b f$。等价条件：对任意 $\varepsilon>0$ 存在分割 $T$ 使 $S(T)-s(T)<\varepsilon$；也等价于对任意 $\varepsilon>0$ 存在 $\delta>0$，使当分割的细度 $\|T\|<\delta$ 且 $\xi_i\in[x_{i-1},x_i]$ 任意时，$\left|\sum f(\xi_i)\Delta x_i-I\right|<\varepsilon$。
