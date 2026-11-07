---
slug: "defint-technique"
subject: "analysis"
unit: "u07"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "定积分的换元与分部"
subtitle: "换元就换限，分部要带边界项"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["defint"]
prereq: ["defint"]
related: ["indefint", "defint"]
---

## 本讲目标

学完这一讲，你能在定积分里正确换元并及时换限，能用带边界项的分部积分处理乘积型被积函数，并能用奇偶性把对称区间上的计算直接砍半。

不定积分的所有技巧在这里都还能用，但多了两条纪律：换元必须换限，分部必须写边界项。

## 三行回顾

- 定积分换元时，上下限跟着变量一起换，算完不必回代。
- 分部积分在定积分里多出一个边界项 $\bigl[uv\bigr]_a^b$，丢掉它结果必错。
- 对称区间上奇函数积分为零，偶函数积分翻倍。

## 换元：换限不换元

设 $f$ 在 $[a,b]$ 上连续，$x=\varphi(t)$ 在 $[\alpha,\beta]$ 上连续可导，$\varphi(\alpha)=a$，$\varphi(\beta)=b$，则

$$\int_a^b f(x)\,dx=\int_\alpha^\beta f\bigl(\varphi(t)\bigr)\varphi'(t)\,dt .$$

**例**：$\int_0^4\dfrac{dx}{1+\sqrt x}$。令 $x=t^2$，$t\in[0,2]$，$dx=2t\,dt$：

$$\int_0^2\frac{2t}{1+t}\,dt=2\int_0^2\left(1-\frac{1}{1+t}\right)dt=2\bigl(2-\ln3\bigr)\approx1.803 .$$

这里 $t=\sqrt x$ 单调，端点 $0\mapsto0$、$4\mapsto2$，换限一步到位。

两条路只能选一条：要么换限后全程用 $t$ 算到底，要么保留原限、最后把 $t$ 换回 $x$ 再代 $a,b$。混着用是最常见的翻车方式。

## 分部：边界项不能省

设 $u,v$ 在 $[a,b]$ 上连续可导，则

$$\int_a^b u\,dv=\bigl[uv\bigr]_a^b-\int_a^b v\,du .$$

**例**：$\int_0^{\pi/2}x\sin x\,dx$。取 $u=x$，$dv=\sin x\,dx$，则 $v=-\cos x$：

$$\bigl[-x\cos x\bigr]_0^{\pi/2}+\int_0^{\pi/2}\cos x\,dx=0+1=1 .$$

**例**：$\int_0^1\arctan x\,dx$。取 $u=\arctan x$，$dv=dx$：

$$\bigl[x\arctan x\bigr]_0^1-\int_0^1\frac{x}{1+x^2}\,dx=\frac{\pi}{4}-\frac12\ln2\approx0.439 .$$

第二个积分用 $d(1+x^2)=2x\,dx$ 立刻得到。

## 对称区间与周期

若 $f$ 在 $[-a,a]$ 上可积，则

$$\int_{-a}^{a}f=0\quad(f\text{ 为奇函数}),\qquad\int_{-a}^{a}f=2\int_0^{a}f\quad(f\text{ 为偶函数}).$$

**例**：$\int_{-1}^1x^3e^{x^2}dx=0$，因为 $x^3e^{x^2}$ 是奇函数。

**例**：$\int_{-2}^2x^5\cos x\,dx=0$，同样是奇函数。

**例**：$\int_{-1}^1x^2dx=\dfrac23$，偶函数翻倍；若直接写 $0$ 就错了。

$\sin^2x$ 在 $[0,2\pi]$ 上不是奇函数，$\int_0^{2\pi}\sin^2x\,dx=\pi$。判断奇偶看的是 $f(-x)$ 与 $f(x)$ 的关系，不是看区间长得对不对称。

## 三个常见误解

> [!MYTH] 换元后上下限仍写原来的数。
> 变量换了，限也必须换。$\int_0^4\dfrac{dx}{1+\sqrt x}$ 若保留 $0,4$ 直接对 $t$ 积分，得 $2(4-\ln5)\approx4.78$，正确值是 $2(2-\ln3)\approx1.80$。

> [!MYTH] 区间对称，积分就是零。
> 只有奇函数才为零。$\int_{-1}^1x^2dx=\frac23\ne0$，偶函数还要翻倍。

> [!MYTH] 定积分分部时不必写边界项，反正常数会消掉。
> 边界项不是常数项，它是 $uv$ 在两端的差。$\int_0^1xe^xdx$ 丢掉 $[xe^x]_0^1$ 后得到 $-(e-1)\approx-1.718$，正确值是 $1$。

## 练习

> [!PRACTICE] 1 · 凑微分
> 计算 $\int_0^1xe^{x^2}dx$。
>
> > [!ANSWER] 看答案
> > 令 $t=x^2$，$dt=2x\,dx$，得 $\frac12\int_0^1e^t dt=\frac{e-1}{2}\approx0.859$。

> [!PRACTICE] 2 · 根式换元
> 计算 $\int_0^4\dfrac{dx}{1+\sqrt x}$。
>
> > [!ANSWER] 看答案
> > 令 $x=t^2$，得 $2\int_0^2\frac{t}{1+t}dt=2(2-\ln3)\approx1.803$。

> [!PRACTICE] 3 · 分部
> 计算 $\int_0^1\arctan x\,dx$。
>
> > [!ANSWER] 看答案
> > $[x\arctan x]_0^1-\frac12\ln(1+x^2)\Big|_0^1=\frac{\pi}{4}-\frac12\ln2\approx0.439$。

> [!PRACTICE] 4 · 奇偶性
> 计算 $\int_{-2}^{2}x^5\cos x\,dx$。
>
> > [!ANSWER] 看答案
> > $x^5\cos x$ 是奇函数，对称区间上积分为 $0$。

> [!FORMAL] 严格表述
> 换元定理：设 $f$ 在 $[a,b]$ 上连续，$\varphi$ 在 $[\alpha,\beta]$ 上连续可导且 $\varphi([\alpha,\beta])\subseteq[a,b]$，$\varphi(\alpha)=a$，$\varphi(\beta)=b$，则 $\int_a^b f(x)\,dx=\int_\alpha^\beta f(\varphi(t))\varphi'(t)\,dt$。分部公式：若 $u,v$ 在 $[a,b]$ 上连续可导，则 $\int_a^b u\,dv=[uv]_a^b-\int_a^b v\,du$。两者都由 Newton-Leibniz 公式对相应原函数求值得到。
