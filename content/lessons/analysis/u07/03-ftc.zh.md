---
slug: "ftc"
subject: "analysis"
unit: "u07"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "微积分基本定理"
subtitle: "求导与积分在这里握手言和"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["defint", "indefint"]
prereq: ["defint"]
related: ["indefint", "defint"]
---

## 本讲目标

学完这一讲，你能说明变上限积分为什么是原函数，能用 Newton-Leibniz 公式把定积分化为原函数求值，并对变限积分做链式求导。

上一讲我们只会估计积分，这一讲开始真正计算。核心只有一句：连续函数的变上限积分就是它的一个原函数。

## 三行回顾

- 定积分是数，不定积分是函数族，两者靠变上限积分连起来。
- 若 $f$ 在 $[a,b]$ 上连续，则 $\Phi(x)=\int_a^x f(t)\,dt$ 在 $[a,b]$ 上可导，且 $\Phi'(x)=f(x)$。
- 由此得到 $\int_a^b f=F(b)-F(a)$，其中 $F$ 是 $f$ 的任一原函数。

## 变上限积分：先积后导

设 $f$ 在 $[a,b]$ 上连续，令

$$\Phi(x)=\int_a^x f(t)\,dt,\qquad x\in[a,b].$$

$\Phi$ 的几何意义是曲线下方从 $a$ 到 $x$ 的曲边梯形面积。当 $x$ 增加 $\Delta x$ 时，新增的是一条窄条，面积约为 $f(x)\Delta x$，所以 $\Phi'(x)=f(x)$。

严格估计只需一步：由积分中值定理，$\Phi(x+\Delta x)-\Phi(x)=\int_x^{x+\Delta x}f=f(\xi)\Delta x$，其中 $\xi$ 介于 $x$ 与 $x+\Delta x$ 之间。让 $\Delta x\to0$，由 $f$ 连续得 $\xi\to x$，故差商趋于 $f(x)$。

**例**：$\Phi(x)=\int_0^x e^{-t^2}dt$，则 $\Phi'(x)=e^{-x^2}$，且 $\Phi'(1)=e^{-1}\approx0.368$。这个原函数写不成初等函数，但它确实存在且可导。

变限积分还能复合。若 $\Phi(x)=\int_a^{\varphi(x)}f(t)\,dt$，则

$$\Phi'(x)=f\bigl(\varphi(x)\bigr)\varphi'(x).$$

**例**：$\Phi(x)=\int_x^{x^2}\cos t\,dt$，先拆成 $\int_0^{x^2}-\int_0^x$，得 $\Phi'(x)=2x\cos(x^2)-\cos x$。

## Newton-Leibniz 公式

若 $f$ 在 $[a,b]$ 上连续，$F$ 是 $f$ 的任一原函数，则

$$\int_a^b f(x)\,dx=F(b)-F(a).$$

证明只需注意 $\Phi$ 与 $F$ 都是 $f$ 的原函数，故 $\Phi=F+C$，代入 $x=a$ 得 $C=-F(a)$，于是 $F(b)-F(a)=\Phi(b)-\Phi(a)=\int_a^b f$。

**例**：$\int_0^1x^2dx=\frac{x^3}{3}\Big|_0^1=\frac13$。

**例**：$\int_1^e\frac{dx}{x}=\ln e-\ln1=1$。

**例**：$\int_0^2|x-1|dx$ 必须先拆区间：$\int_0^1(1-x)dx+\int_1^2(x-1)dx=\frac12+\frac12=1$。被积函数不连续可导的地方，公式不能跨过去用。

> [!NOTE]
> 公式里 $F$ 取哪个原函数都一样，常数 $C$ 在相减时消掉。

## 公式的适用边界

Newton-Leibniz 需要两个条件同时成立：$f$ 在 $[a,b]$ 上 Riemann 可积，且 $F'=f$ 在 $(a,b)$ 内成立。

反例很典型：$f(x)=\dfrac{1}{x^2}$ 在 $[-1,1]$ 上无界，不可积；而 $F(x)=-\dfrac1x$ 在 $[-1,0)\cup(0,1]$ 上确实是原函数。硬代公式会得到 $-1-1=-2$，可这个积分根本不收敛。所以先检查可积性，再代公式。

另一个方向也要小心：$f$ 有原函数不代表 $f$ 可积。$f(x)=x^2\sin\frac{1}{x^2}$（$x\ne0$）、$f(0)=0$ 处处可导，但导函数在 $0$ 附近无界，不能对它用 Newton-Leibniz。

## 三个常见误解

> [!MYTH] 变上限积分对任何可积函数都处处可导。
> 需要 $f$ 连续。取 $f(x)=\operatorname{sgn}x$ 在 $[-1,1]$ 上，则 $\Phi(x)=|x|-1$，在 $x=0$ 处左右导数分别为 $-1$ 与 $1$，$\Phi$ 在该点不可导。

> [!MYTH] 只要 $f$ 有原函数，就能用 Newton-Leibniz。
> 还要 $f$ 可积。$\dfrac{1}{x^2}$ 在 $[-1,1]$ 上无界，硬代 $-\frac1x$ 会得出 $-2$，而该积分发散。

> [!MYTH] 换一个原函数，积分值就变了。
> 不会。若 $F_1=F_2+C$，则 $F_1(b)-F_1(a)=F_2(b)-F_2(a)$。取 $F_1=\frac{x^2}{2}$ 与 $F_2=\frac{x^2}{2}+7$，在 $[0,1]$ 上都给出 $\frac12$。

## 练习

> [!PRACTICE] 1 · 求导
> 设 $\Phi(x)=\int_0^x e^{-t^2}dt$，求 $\Phi'(1)$。
>
> > [!ANSWER] 看答案
> > $\Phi'(x)=e^{-x^2}$，故 $\Phi'(1)=e^{-1}\approx0.368$。

> [!PRACTICE] 2 · 变限复合
> 设 $\Phi(x)=\int_x^{x^2}\cos t\,dt$，求 $\Phi'(x)$。
>
> > [!ANSWER] 看答案
> > 拆成 $\int_0^{x^2}\cos t\,dt-\int_0^x\cos t\,dt$，得 $\Phi'(x)=2x\cos(x^2)-\cos x$。

> [!PRACTICE] 3 · 带绝对值
> 计算 $\int_0^2|x-1|dx$。
>
> > [!ANSWER] 看答案
> > 在 $x=1$ 处拆开：$\int_0^1(1-x)dx=\frac12$，$\int_1^2(x-1)dx=\frac12$，合计 $1$。

> [!PRACTICE] 4 · 直接求值
> 计算 $\int_1^e\dfrac{dx}{x}$ 与 $\int_0^{\pi/2}\sin x\,dx$。
>
> > [!ANSWER] 看答案
> > $\ln e-\ln1=1$；$[-\cos x]_0^{\pi/2}=0-(-1)=1$。

> [!FORMAL] 严格表述
> 微积分基本定理（第一形式）：若 $f$ 在 $[a,b]$ 上连续，则 $\Phi(x)=\int_a^x f(t)\,dt$ 在 $[a,b]$ 上可导，且 $\Phi'(x)=f(x)$。第二形式（Newton-Leibniz）：若 $F$ 在 $[a,b]$ 上连续、在 $(a,b)$ 内可导且 $F'=f$，而 $f$ 在 $[a,b]$ 上 Riemann 可积，则 $\int_a^b f=F(b)-F(a)$。一般的变限求导公式为 $\dfrac{d}{dx}\int_{\alpha(x)}^{\beta(x)}f(t)\,dt=f(\beta(x))\beta'(x)-f(\alpha(x))\alpha'(x)$，要求 $f$ 连续、$\alpha,\beta$ 可导。
