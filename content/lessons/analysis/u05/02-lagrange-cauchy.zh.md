---
slug: "lagrange-cauchy"
subject: "analysis"
unit: "u05"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "Lagrange 与 Cauchy 中值定理"
subtitle: "把两端的差摊到中间的某一点上"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["mvt"]
prereq: ["mvt"]
related: ["mvt", "lhopital"]
---

## 本讲目标

学完这一讲，你能写出 Lagrange 中值定理的辅助函数证明，用它证明单调性、常数判定和一组不等式，并说清 Cauchy 中值定理多出来的那个分母为什么不能省。

Lagrange 定理说：一段路上的平均变化率，必然在某一点被瞬时变化率兑现。它把“整体”与“局部”连起来，是本章真正开工的地方。

## 三行回顾

- Rolle 定理处理的是两端等高这一特殊情形。
- 一般情形两端不等高，但只要把函数减去连接两端的直线，两端就重新等高。
- 这条直线就是辅助函数 $L(x)=f(a)+\frac{f(b)-f(a)}{b-a}(x-a)$。

## Lagrange 中值定理

设 $f$ 在 $[a,b]$ 上连续、在 $(a,b)$ 内可导，则存在 $\xi\in(a,b)$，使

$$f(b)-f(a)=f'(\xi)(b-a).$$

令 $F(x)=f(x)-\dfrac{f(b)-f(a)}{b-a}(x-a)$。则 $F$ 满足 Rolle 定理的三个条件，且 $F(a)=F(b)=f(a)$，于是存在 $\xi$ 使 $F'(\xi)=0$，即 $f'(\xi)=\dfrac{f(b)-f(a)}{b-a}$。

手算一例：$f(x)=\ln x$ 在 $[1,e]$ 上。$\ln e-\ln 1=1$，而 $f'(x)=1/x$，所以 $1=\frac{1}{\xi}(e-1)$，解得 $\xi=e-1\approx 1.718$，确实落在 $(1,e)$ 内。

注意定理只说“存在”，不给公式。$f(x)=x^2$ 在 $[0,1]$ 上解得 $\xi=1/2$，这是巧合；换成 $[0,2]$，$\xi=1$ 就不再是中点。

## 三个直接推论

| 推论 | 条件 | 结论 |
| --- | --- | --- |
| 常函数判定 | 区间内 $f'\equiv 0$ | $f$ 在该区间上为常数 |
| 单调性判定 | 区间内 $f'\ge 0$（或 $\le 0$） | $f$ 单调不减（或单调不增） |
| Lipschitz 估计 | 区间内 $\|f'\|\le M$ | 对任意两点，$\|f(x)-f(y)\|\le M\|x-y\|$ |

三条都靠同一句话：任取 $x<y$，在 $[x,y]$ 上用 Lagrange 定理，得 $f(y)-f(x)=f'(\xi)(y-x)$，再对 $f'(\xi)$ 的符号或大小作判断。

用第二条看 $f(x)=x-\sin x$：$f'(x)=1-\cos x\ge 0$，所以 $f$ 单调不减；又 $f(0)=0$，故 $x\ge 0$ 时 $x\ge \sin x$。

用第三条看 $\sin$：$|\cos\xi|\le 1$，于是

$$|\sin x-\sin y|\le |x-y| .$$

这条估计对一切实数 $x,y$ 成立，因为任取两点都能套一次中值定理。

## Cauchy 中值定理

设 $f,g$ 在 $[a,b]$ 上连续、在 $(a,b)$ 内可导，且 $g'(x)\ne 0$，则存在 $\xi\in(a,b)$，使

$$\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)} .$$

做法仍是辅助函数，只是把“减去直线”换成“减去 $f$ 关于 $g$ 的线性插值”：

$$F(x)=f(x)-f(a)-\frac{f(b)-f(a)}{g(b)-g(a)}\bigl(g(x)-g(a)\bigr).$$

$F(a)=F(b)=0$，用 Rolle 定理即得。分母不为零由 $g'\ne 0$ 保证：若 $g(b)=g(a)$，Rolle 定理会给出 $g'$ 的一个零点，矛盾。

取 $g(x)=x$ 就退回 Lagrange 定理。所以 Lagrange 是特例，Cauchy 是把“自变量”换成“另一把尺子”。这把尺子正是下一讲 L'Hôpital 法则需要的。

举个能算的例子：$f(x)=x^2$，$g(x)=x^3$ 在 $[1,2]$ 上。左端为 $(4-1)/(8-1)=3/7$，右端为 $2\xi/(3\xi^2)=2/(3\xi)$，解得 $\xi=14/9\approx 1.556$，落在 $(1,2)$ 内。

## 三个常见误解

> [!MYTH] 中值定理能告诉我们 $\xi$ 具体在哪里。
> 不能。定理是存在性的，证明里没有任何构造。同一个 $f$ 换一个区间，$\xi$ 的位置就变；$f(x)=x^2$ 在 $[0,1]$ 上 $\xi=1/2$，在 $[0,2]$ 上 $\xi=1$。

> [!MYTH] Cauchy 中值定理只是 Lagrange 定理的改写，没有新内容。
> 取 $g(x)=x$ 确实是 Lagrange，但 Cauchy 允许分母由 $g'$ 提供，因此能处理 $\frac{f(b)-f(a)}{g(b)-g(a)}$ 这种“两个函数增量之比”。L'Hôpital 法则正是靠它把 $\frac{0}{0}$ 转成导数之比。

> [!MYTH] 只要 $f$ 在 $(a,b)$ 内可导，就能用 Lagrange 定理。
> 还要求 $f$ 在闭区间 $[a,b]$ 上连续。$f(x)=1/x$ 在 $(0,1)$ 内可导，但它在 $0$ 附近无界，$[0,1]$ 上不连续，定理无从谈起。

## 练习

> [!PRACTICE] 1 · 求 $\xi$
> 对 $f(x)=x^3$ 在 $[0,1]$ 上写出 Lagrange 定理，并解出 $\xi$。
>
> > [!ANSWER] 看答案
> > $f(1)-f(0)=1=f'(\xi)(1-0)=3\xi^2$，所以 $\xi=1/\sqrt{3}\approx 0.577$，在 $(0,1)$ 内。

> [!PRACTICE] 2 · 证不等式
> 证明对任意实数 $x\ne 0$，有 $e^x>1+x$。
>
> > [!ANSWER] 看答案
> > 设 $f(t)=e^t$。在 $0$ 与 $x$ 之间用 Lagrange 定理，得 $e^x-1=e^{\xi}x$。若 $x>0$，则 $\xi>0$，$e^{\xi}>1$，故 $e^x-1>x$；若 $x<0$，则 $\xi<0$，$e^{\xi}<1$，乘以负数后不等号翻转，同样得 $e^x-1>x$。$x=0$ 时取等号。

> [!PRACTICE] 3 · 常数判定
> 设 $f$ 在 $(0,+\infty)$ 内可导且 $f'(x)=0$，证明 $f$ 为常数。
>
> > [!ANSWER] 看答案
> > 任取 $0<x<y$，在 $[x,y]$ 上用 Lagrange 定理：$f(y)-f(x)=f'(\xi)(y-x)=0$，故 $f(y)=f(x)$。由 $x,y$ 任意，$f$ 恒为常数。

> [!PRACTICE] 4 · Cauchy 定理
> $f(x)=\sin x$，$g(x)=\cos x$ 在 $[0,\pi/2]$ 上验证 Cauchy 中值定理。
>
> > [!ANSWER] 看答案
> > 左端 $\dfrac{1-0}{0-1}=-1$；右端 $\dfrac{\cos\xi}{-\sin\xi}=-\cot\xi$。令 $-\cot\xi=-1$ 得 $\xi=\pi/4\in(0,\pi/2)$。

> [!FORMAL] 严格表述
> Lagrange 中值定理：若 $f\in C[a,b]$ 且 $f$ 在 $(a,b)$ 内可导，则存在 $\xi\in(a,b)$ 使 $f(b)-f(a)=f'(\xi)(b-a)$。Cauchy 中值定理：若 $f,g\in C[a,b]$，在 $(a,b)$ 内可导，且对一切 $x\in(a,b)$ 有 $g'(x)\ne 0$，则存在 $\xi\in(a,b)$ 使 $\bigl(f(b)-f(a)\bigr)g'(\xi)=\bigl(g(b)-g(a)\bigr)f'(\xi)$。两者的证明都归结为对适当的辅助函数使用 Rolle 定理。
