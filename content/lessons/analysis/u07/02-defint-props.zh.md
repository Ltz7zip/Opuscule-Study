---
slug: "defint-props"
subject: "analysis"
unit: "u07"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "定积分的性质"
subtitle: "不行就把区间切开，不精确就上下夹住"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["defint"]
prereq: ["defint"]
related: ["defint", "indefint"]
---

## 本讲目标

学完这一讲，你能熟练使用定积分的线性、区间可加性与保序性，能对没有初等原函数的积分给出上下界，并正确使用积分中值定理。

定积分的性质不多，但每一条都有明确的适用条件。用好它们的关键是分清两种场合：算得出原函数时用 Newton-Leibniz，算不出时用不等式夹逼。

## 三行回顾

- 定积分是上下 Darboux 和的公共极限，因此对函数取线性组合、对区间作拆分都保持可积。
- 积分把“逐点比较”变成“整体比较”，这给出保序性与绝对值估计。
- 连续函数取遍最小值与最大值之间的所有值，这给出积分中值定理。

## 线性与区间可加

若 $f,g$ 在 $[a,b]$ 上可积，则对任意常数 $\alpha,\beta$，

$$\int_a^b\bigl(\alpha f+\beta g\bigr)=\alpha\int_a^b f+\beta\int_a^b g .$$

对任意 $c\in[a,b]$，

$$\int_a^b f=\int_a^c f+\int_c^b f .$$

反向与零长度靠约定补齐：$\int_a^a f=0$，$\int_a^b f=-\int_b^a f$。有了这两条约定，可加性对 $a,b,c$ 的任意次序都成立，不必再讨论谁在中间。

> [!NOTE]
> 区间可加性要求 $f$ 在涉及的每个子区间上都可积。若 $f$ 在 $c$ 附近无界，这条性质不能直接套用。

## 保序、绝对值与估值

若在 $[a,b]$ 上 $f\le g$，则 $\int_a^b f\le\int_a^b g$。由此得到两条常用估计：

$$\left|\int_a^b f\right|\le\int_a^b|f|,\qquad m(b-a)\le\int_a^b f\le M(b-a),$$

其中 $m,M$ 分别是 $f$ 在 $[a,b]$ 上的下确界与上确界。第二条在不知道原函数时特别有用。

**例**：估计 $\int_0^1\dfrac{dx}{1+x}$。在 $[0,1]$ 上 $\dfrac12\le\dfrac{1}{1+x}\le1$，故

$$\frac12\le\int_0^1\frac{dx}{1+x}\le1 .$$

而真值是 $\ln2\approx0.693$，落在区间中部。想更紧，就把 $[0,1]$ 分成两段分别估值，或直接用单调性给出更细的分点。

**例**：$\int_0^1 e^{-x^2}dx$。被积函数在 $[0,1]$ 上从 $1$ 降到 $e^{-1}\approx0.368$，所以

$$0.368<\int_0^1e^{-x^2}dx<1 .$$

这个积分没有初等原函数，夹逼是唯一能立刻写出的信息。

## 积分中值定理

若 $f$ 在 $[a,b]$ 上连续，则存在 $\xi\in[a,b]$，使

$$\int_a^b f=f(\xi)(b-a).$$

证明只用最值定理与介值定理：设 $m,M$ 为 $f$ 的最小值与最大值，则 $m\le\dfrac{1}{b-a}\int_a^b f\le M$，这个平均值介于 $m$ 与 $M$ 之间，连续函数必在某点取到。

手算一例：$f(x)=x^2$ 在 $[0,3]$ 上，$\int_0^3x^2dx=9$，故 $9=3\xi^2$，$\xi=\sqrt3\approx1.732$，落在 $[0,3]$ 内。

几何意义是：曲边梯形的面积等于某个同底矩形的面积，矩形高度就是函数在 $\xi$ 处的值。

## 三个常见误解

> [!MYTH] 积分的乘积等于乘积的积分。
> 不成立。在 $[0,1]$ 上取 $f=g=x$：左边 $\int_0^1x^2dx=\frac13$，右边 $\left(\frac12\right)^2=\frac14$。两者不同，乘积型积分要用分部积分处理。

> [!MYTH] 若 $\int_a^b f\ge0$，则 $f\ge0$。
> 积分只反映总体，不反映局部。$\int_0^1(2x-1)dx=0$，而 $f$ 在 $[0,\frac12)$ 上为负。除非附加 $f$ 连续且不恒为零等条件，才能推出严格不等式。

> [!MYTH] 积分中值定理对可积函数都成立。
> 需要连续性。取 $f(x)=0$（$0\le x\le\frac12$）、$f(x)=1$（$\frac12<x\le1$），积分为 $\frac12$，但 $f$ 只取 $0$ 与 $1$，没有 $\xi$ 使 $f(\xi)=\frac12$。

## 练习

> [!PRACTICE] 1 · 用线性
> 计算 $\int_0^1(3x^2+2x)\,dx$。
>
> > [!ANSWER] 看答案
> > $3\cdot\frac13+2\cdot\frac12=1+1=2$。

> [!PRACTICE] 2 · 估一个对数
> 证明 $\frac12\le\int_1^2\dfrac{dx}{x}\le1$。
>
> > [!ANSWER] 看答案
> > 在 $[1,2]$ 上 $\frac12\le\frac1x\le1$，由保序性，积分介于 $\frac12\cdot1$ 与 $1\cdot1$ 之间。真值是 $\ln2\approx0.693$。

> [!PRACTICE] 3 · 用最大值夹
> 证明 $\int_0^1x(1-x)\,dx\le\frac14$。
>
> > [!ANSWER] 看答案
> > 在 $[0,1]$ 上 $x(1-x)\le\frac14$，因为 $\frac14-x(1-x)=\left(x-\frac12\right)^2\ge0$。故积分不超过 $\frac14\cdot1$。精确值是 $\frac16$。

> [!PRACTICE] 4 · 找中点
> 对 $f(x)=x^2$ 在 $[0,3]$ 上求积分中值定理中的 $\xi$。
>
> > [!ANSWER] 看答案
> > $\int_0^3x^2dx=9=3\xi^2$，故 $\xi=\sqrt3\approx1.732\in[0,3]$。

> [!FORMAL] 严格表述
> 设 $f,g$ 在 $[a,b]$ 上 Riemann 可积，则 $\alpha f+\beta g$ 与 $|f|$ 也可积，并满足上面的线性与绝对值不等式。对任意 $c\in[a,b]$，$\int_a^b f=\int_a^c f+\int_c^b f$。若 $m\le f\le M$，则 $m(b-a)\le\int_a^b f\le M(b-a)$。若再有 $f$ 连续，则存在 $\xi\in[a,b]$ 使 $\int_a^b f=f(\xi)(b-a)$；数值 $\frac{1}{b-a}\int_a^b f$ 称为 $f$ 在 $[a,b]$ 上的平均值。
