---
slug: "multi-limit"
subject: "analysis"
unit: "u11"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "多元函数的极限与连续"
subtitle: "路径都通向同一点，极限才存在"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["multi", "euclid"]
prereq: ["euclid"]
related: ["cont", "multi"]
---

## 本讲目标

学完这一讲，你能写出多元极限的 $\varepsilon$-$\delta$ 定义，会用一条路径构造“极限不存在”的反例，也能用极坐标或不等式把极限算出来。判断多元极限的关键不再是左右两侧，而是平面上无穷多条趋近路线。

一元极限只有左右两个方向，多元极限却有无数条路径。定义必须一次性管住所有路径，这正是它看起来更绕的原因。

## 三行回顾

- 多元极限要求：不管从哪条路径靠近，函数值都趋于同一个数。
- 因此证明极限存在要用不等式或极坐标，证明不存在只需两条路径给出两个值。
- 连续就是极限值等于函数值；四则运算与复合保持连续。

## 极限的定义与点列刻画

设 $f$ 定义在 $D\subset\mathbb{R}^n$ 上，$a$ 是 $D$ 的聚点。若存在 $L$，使得
$$\forall\varepsilon>0\ \exists\delta>0:\ 0<\|x-a\|<\delta,\ x\in D\ \Longrightarrow\ |f(x)-L|<\varepsilon,$$
则称 $x\to a$ 时 $f(x)$ 的极限为 $L$，记 $\lim_{x\to a}f(x)=L$。这里 $0<$ 排除了 $x=a$ 本身，函数在 $a$ 处有没有定义不影响极限。

极限若存在则唯一。证明用 $\varepsilon/2$：两个候选值 $L_1,L_2$ 同时满足定义，则 $|L_1-L_2|\le|L_1-f(x)|+|f(x)-L_2|<\varepsilon$ 对任意 $\varepsilon$ 成立，故 $L_1=L_2$。

点列刻画：$\lim_{x\to a}f(x)=L$ 当且仅当对每个满足 $x^{(k)}\to a$、$x^{(k)}\ne a$ 的点列，都有 $f(x^{(k)})\to L$。否定版本正是反例工具：找到两个点列，极限不同，多元极限就不存在。

## 路径反例：直线与抛物线

先看
$$f(x,y)=\frac{xy}{x^2+y^2}\quad((x,y)\ne(0,0)),\qquad f(0,0)=0.$$
沿直线 $y=kx$ 趋近原点：
$$f(x,kx)=\frac{kx^2}{x^2+k^2x^2}=\frac{k}{1+k^2}.$$
这个值随 $k$ 改变：$k=0$ 时是 $0$，$k=1$ 时是 $1/2$，$k=-1$ 时是 $-1/2$。沿两条不同直线得到两个不同的极限，故 $\lim_{(x,y)\to(0,0)}f$ 不存在，$f$ 在原点不连续。

注意 $f$ 在每条过原点的直线上都趋于一个确定值，但这些值彼此不同。只要路径给出的数不一致，极限就已经失败，无需再找更奇怪的曲线。

直线还不够。再看
$$g(x,y)=\frac{x^2y}{x^4+y^2}\quad((x,y)\ne(0,0)),\qquad g(0,0)=0.$$
沿任意直线 $y=mx$：
$$g(x,mx)=\frac{mx^3}{x^4+m^2x^2}=\frac{mx}{x^2+m^2}\longrightarrow0.$$
所有直线都给出 $0$，容易误判极限存在。改沿抛物线 $y=kx^2$：
$$g(x,kx^2)=\frac{kx^4}{x^4+k^2x^4}=\frac{k}{1+k^2},$$
又随 $k$ 变化。取 $k=1$ 得 $1/2$，取 $k=0$（即 $y=0$）得 $0$，故极限仍不存在。这个例子说明：验证了全部直线，也不足以证明多元极限存在。

## 极坐标与夹逼

若能把 $|f(x,y)-L|$ 写成只依赖 $r=\sqrt{x^2+y^2}$ 且趋于 $0$ 的量，极限就成立。例如
$$\left|\frac{x^2y}{x^2+y^2}\right|\le|y|\le r\longrightarrow0,$$
因为 $\frac{x^2}{x^2+y^2}\le1$。更一般地，
$$\left|\frac{xy}{\sqrt{x^2+y^2}}\right|=r|\cos\theta\sin\theta|\le\frac{r}{2}\longrightarrow0.$$
极坐标代入后，若余下的角部因子有界，整个式子就被 $Cr$ 控制。要小心：极坐标下 $\theta$ 可以随 $r$ 变化，必须对**所有** $\theta$ 一致地估计，不能只固定一个 $\theta$。

反例也常用极坐标：$f=\frac{xy}{x^2+y^2}=\cos\theta\sin\theta$，与 $r$ 无关，沿不同 $\theta$ 得到不同值，极限不存在。

## 连续与连续性运算

$f$ 在 $a$ 处**连续**，指 $a\in D$、极限存在且 $\lim_{x\to a}f(x)=f(a)$。等价地：
$$\forall\varepsilon>0\ \exists\delta>0:\ \|x-a\|<\delta,\ x\in D\ \Longrightarrow\ |f(x)-f(a)|<\varepsilon.$$
多项式、$\sin$、$\cos$、$\exp$ 在 $\mathbb{R}^n$ 上连续；连续函数的和、差、积、商（分母不为零）与复合仍连续。

判断连续性时先看分母：$\frac{x^2y}{x^2+y^2}$ 在原点可补定义为 $0$ 而连续，因为 $|f|\le|y|$；$\frac{xy}{x^2+y^2}$ 则无论原点取什么值都不连续，因为极限不存在。这说明“可去间断”在多元情形未必可去。

> [!NOTE]
> 连续只看 $x=a$ 附近的行为：$|f(x)-f(a)|$ 能被任意小的 $\varepsilon$ 控制，与函数在远处的取值无关。

## 三个常见误解

> [!MYTH] 沿所有直线趋近的极限相同，多元极限就存在。
> 不够。$g(x,y)=\frac{x^2y}{x^4+y^2}$ 沿每条直线都趋于 $0$，沿抛物线 $y=x^2$ 却趋于 $1/2$。路径集合比直线大得多。

> [!MYTH] 对每个变量分别连续，就联合连续。
> $f(x,y)=\frac{xy}{x^2+y^2}$（原点补 $0$）固定 $y=0$ 时恒为 $0$，固定 $x=0$ 时也恒为 $0$，两个一元函数都连续；但沿 $y=x$ 有 $f\to1/2\ne f(0,0)$，联合不连续。偏连续弱于连续。

> [!MYTH] 极限存在要求函数在 $a$ 处有定义。
> 定义里写的是 $0<\|x-a\|<\delta$，$a$ 本身被排除。$\frac{\sin(x^2+y^2)}{x^2+y^2}$ 在原点无定义，极限仍为 $1$；连续才额外要求函数值与极限相等。

## 练习

> [!PRACTICE] 1 · 算极限
> 求 $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}$。
>
> > [!ANSWER] 看答案
> > 因为 $\frac{x^2}{x^2+y^2}\le1$，所以 $\left|\frac{x^2y}{x^2+y^2}\right|\le|y|\to0$，极限为 $0$。

> [!PRACTICE] 2 · 证明不存在
> 说明 $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x+y}{x-y}$ 不存在。
>
> > [!ANSWER] 看答案
> > 沿 $y=0$ 得 $\frac{x}{x}=1$；沿 $x=0$ 得 $\frac{y}{-y}=-1$。两个路径极限不同，故极限不存在。

> [!PRACTICE] 3 · 极坐标
> 求 $\displaystyle\lim_{(x,y)\to(0,0)}(x^2+y^2)\ln(x^2+y^2)$。
>
> > [!ANSWER] 看答案
> > 令 $r^2=x^2+y^2$，原式为 $r^2\ln r^2=2r^2\ln r$。由 $r^2\ln r\to0$（$r\to0^+$），极限为 $0$。

> [!PRACTICE] 4 · 延拓
> $f(x,y)=\frac{\sin(xy)}{xy}$ 在 $xy\ne0$ 上有定义。它在原点能否连续延拓？延拓值是多少？
>
> > [!ANSWER] 看答案
> > 能。令 $t=xy$，则 $t\to0$，$\frac{\sin t}{t}\to1$，故延拓值为 $f(0,0)=1$。这里 $(x,y)\to(0,0)$ 时必有 $xy\to0$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $D\subset\mathbb{R}^n$，$a$ 是 $D$ 的聚点，$f:D\to\mathbb{R}$。$\lim_{x\to a}f(x)=L$ 指：$\forall\varepsilon>0\ \exists\delta>0$，使得当 $x\in D$ 且 $0<\|x-a\|<\delta$ 时，$|f(x)-L|<\varepsilon$。极限唯一。$f$ 在 $a$ 连续指 $a\in D$ 且 $\lim_{x\to a}f(x)=f(a)$。若 $f,g$ 在 $a$ 连续，则 $f\pm g$、$fg$、$f/g$（$g(a)\ne0$）在 $a$ 连续；若 $g$ 在 $a$ 连续、$f$ 在 $g(a)$ 连续，则 $f\circ g$ 在 $a$ 连续。
