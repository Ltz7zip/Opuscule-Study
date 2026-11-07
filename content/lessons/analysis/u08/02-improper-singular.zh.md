---
slug: "improper-singular"
subject: "analysis"
unit: "u08"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "无界函数的反常积分"
subtitle: "端点跑向无穷，面积仍可能有限"
minutes: 13
meta: ["阅读 13 分钟","需要 初等数学","掌握级"]
concepts: ["impropint"]
prereq: ["impropint"]
related: ["impropint", "paramint"]
---

## 本讲目标

学完这一讲，你能认出积分里的瑕点，把瑕积分写成极限，判断它收敛还是发散，并避开“直接代上下限”这个最常见的计算事故。

上一讲让区间右端跑到无穷，这一讲让函数在端点竖起来。两件事的数学结构完全相同：都是把定积分写成一个极限。

## 三行回顾

- $\int_0^1 x^{-1/2}\mathrm{d}x$ 的被积函数在 $0$ 附近无界，但它照样有意义。
- 做法是把下限抬起来：先算 $\int_\eta^1$，再令 $\eta\to0^+$。
- 极限存在且有限就收敛；否则发散。收敛与否与“函数无界”无关，只与无界的速度有关。

## 瑕点：把端点让出来

设 $f$ 在 $(a,b]$ 上有定义，在 $a$ 附近无界，且对每个 $\eta>0$ 在 $[a+\eta,b]$ 上可积。定义

$$
\int_a^b f(x)\,\mathrm{d}x=\lim_{\eta\to0^+}\int_{a+\eta}^{b}f(x)\,\mathrm{d}x .
$$

点 $a$ 称为**瑕点**。若瑕点在右端，就写 $\lim_{\eta\to0^+}\int_a^{b-\eta}f$；若瑕点在内部 $c$，就必须拆成 $\int_a^c+\int_c^b$ 两段，两段都收敛才算收敛。

最简单的计算：

$$
\int_\eta^1\frac{\mathrm{d}x}{\sqrt x}=2-2\sqrt\eta\ \longrightarrow\ 2 .
$$

所以 $\int_0^1x^{-1/2}\mathrm{d}x=2$。再看一个对数型的例子：对 $\varepsilon>0$，

$$
\int_\varepsilon^1\ln x\,\mathrm{d}x=[x\ln x-x]_\varepsilon^1=-1-\varepsilon\ln\varepsilon+\varepsilon\ \longrightarrow\ -1 .
$$

这里用了 $\varepsilon\ln\varepsilon\to0$。被积函数在 $0$ 处是 $-\infty$，积分值却是普通的负数 $-1$。

## 瑕积分的 p 判别

同样的换元与计算给出

$$
\int_0^1\frac{\mathrm{d}x}{x^p}\ \text{收敛}\iff p<1,\qquad \text{收敛时值为}\ \frac{1}{1-p}.
$$

| 积分 | 指数 | 值或结论 |
| --- | --- | --- |
| $\int_0^1 x^{-1/2}\mathrm{d}x$ | $p=\tfrac12$ | $2$ |
| $\int_0^1 \mathrm{d}x/x$ | $p=1$ | 发散（$\ln\frac1\eta$） |
| $\int_0^1 x^{-2}\mathrm{d}x$ | $p=2$ | 发散（$\frac1\eta-1$） |

把两张表放在一起看：$\int_1^{+\infty}$ 要 $p>1$，$\int_0^1$ 要 $p<1$。方向正好相反，因为换元 $x=1/t$ 会把 $0$ 附近的瑕点搬到 $+\infty$。不要背反，记“谁增长得快谁说了算”：在 $0$ 附近，$x^{-p}$ 只要比 $1/x$ 更温和就收敛。

## 两个瑕点要拆开

$\displaystyle\int_0^1\frac{\mathrm{d}x}{\sqrt{x(1-x)}}$ 在 $0$ 与 $1$ 都无界，必须先拆：

$$
\int_0^{1/2}\frac{\mathrm{d}x}{\sqrt{x(1-x)}}+\int_{1/2}^{1}\frac{\mathrm{d}x}{\sqrt{x(1-x)}}.
$$

在 $[0,\tfrac12]$ 上，$\sqrt{x(1-x)}\ge \sqrt{x/2}$，被积函数不超过 $\sqrt2\,x^{-1/2}$；右半段同理。两段都收敛。值用换元 $x=\sin^2\theta$ 求：$\mathrm{d}x=2\sin\theta\cos\theta\,\mathrm{d}\theta$，$\sqrt{x(1-x)}=\sin\theta\cos\theta$，于是

$$
\int_0^1\frac{\mathrm{d}x}{\sqrt{x(1-x)}}=\int_0^{\pi/2}2\,\mathrm{d}\theta=\pi .
$$

> [!NOTE]
> 只要有一段发散，整个积分就发散。$\int_0^1\frac{\mathrm{d}x}{x(1-x)}$ 两段都是 $p=1$ 型，整体发散，尽管它在中间完全正常。

## 直接代上下限会算错

把 $\int_{-1}^{1}\frac{\mathrm{d}x}{x^2}$ 当作普通定积分，套 Newton–Leibniz：

$$
\Big[-\frac1x\Big]_{-1}^{1}=-1-1=-2 .
$$

这是错的。被积函数在 $0$ 处无界，而且

$$
\int_\eta^1\frac{\mathrm{d}x}{x^2}=\frac1\eta-1\to+\infty .
$$

正确的答案是发散。错误出在跳过定义：原函数 $-\frac1x$ 在 $0$ 处本身无定义，不具备在整个闭区间上使用公式的资格。

> [!NOTE]
> 用 Newton–Leibniz 之前先扫一遍区间：有没有让分母为零、让对数取零、让根号内为零的点。有，就先拆极限，再代。

## 三个常见误解

> [!MYTH] 函数无界，就不能积分。
> 无界只说明不能用原来那套有界函数的定积分定义，并不妨碍极限存在。$\int_0^1x^{-1/2}\mathrm{d}x=2$ 是个正常的有限数。

> [!MYTH] 有瑕点就意味着积分发散。
> 发散只发生在无界速度太快时。$\int_0^1x^{-1/2}\mathrm{d}x$ 收敛，$\int_0^1x^{-2}\mathrm{d}x$ 发散，区别只在指数是否小于 $1$。

> [!MYTH] 原函数能写出来，直接代上下限就行。
> $\int_{-1}^1x^{-2}\mathrm{d}x$ 这样算得 $-2$，实际发散。原函数在瑕点无定义时，代换公式的适用前提已经破了。

## 练习

> [!PRACTICE] 1 · 计算
> 求 $\displaystyle\int_0^1\frac{\mathrm{d}x}{\sqrt{1-x}}$。
>
> > [!ANSWER] 看答案
> > 原函数 $-2\sqrt{1-x}$，在 $1$ 处为 $0$，在 $0$ 处为 $-2$，值 $2$。对应 $p=\tfrac12$。

> [!PRACTICE] 2 · 换元
> 求 $\displaystyle\int_0^{\pi/2}\frac{\cos x}{\sqrt{\sin x}}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > 令 $u=\sin x$，$\mathrm{d}u=\cos x\,\mathrm{d}x$，化为 $\int_0^1u^{-1/2}\mathrm{d}u=2$。

> [!PRACTICE] 3 · 对数型
> 求 $\displaystyle\int_0^1\frac{\ln x}{\sqrt x}\,\mathrm{d}x$。
>
> > [!ANSWER] 看答案
> > 原函数为 $\sqrt x\,(2\ln x-4)$。在 $1$ 处为 $-4$，在 $0$ 处 $\sqrt x\ln x\to0$，故值为 $-4$。

> [!PRACTICE] 4 · 双瑕点
> 判断 $\displaystyle\int_0^2\frac{\mathrm{d}x}{(x-1)^2}$ 的敛散性。
>
> > [!ANSWER] 看答案
> > 瑕点在 $x=1$。左段 $\int_0^{1-\eta}(1-x)^{-2}\mathrm{d}x=\frac1\eta-1\to+\infty$，已经发散，无需再看右段。整体发散。

## 严格表述

> [!FORMAL] 严格表述
> 设 $f$ 在 $(a,b]$ 上有定义，在 $a$ 的任一右邻域内无界，且对每个 $\eta\in(0,b-a)$ 在 $[a+\eta,b]$ 上可积。若极限 $\lim_{\eta\to0^+}\int_{a+\eta}^{b}f$ 存在且有限，则称 $\int_a^b f$ 收敛，该极限为积分值。等价判据（Cauchy）：对任意 $\varepsilon>0$ 存在 $\delta>0$，当 $0<\eta_1<\eta_2<\delta$ 时 $\big|\int_{a+\eta_1}^{a+\eta_2}f\big|<\varepsilon$。若瑕点在内部 $c$，则定义 $\int_a^b f=\int_a^c f+\int_c^b f$，右端两项都收敛时左端才收敛。
