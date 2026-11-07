---
slug: "deriv-rules"
subject: "analysis"
unit: "u04"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "求导法则"
subtitle: "把复杂函数拆成基本块"
minutes: 14
meta: ["阅读 14 分钟","需要 导数与微分","掌握级"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["deriv", "taylor"]
---

## 本讲目标

每次都用定义算导数不现实。这一讲给出和、差、积、商的求导公式，并说明乘积法则为什么多出一项。

学完你能对有理函数、三角函数与多项式组合直接求导，能复述乘积法则的证明，也能识别两类常见的错误公式。

## 三行回顾

- 和差逐项求导：$(u\pm v)'=u'\pm v'$。
- 乘积法则：$(uv)'=u'v+uv'$，不是 $u'v'$。
- 商法则：$\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2}$，分母必须非零。

## 和差积商

设 $u,v$ 在 $x$ 处可导，则

$$
(u\pm v)' = u' \pm v', \qquad (uv)' = u'v + uv', \qquad
\left(\frac{u}{v}\right)' = \frac{u'v-uv'}{v^2}\ (v\ne 0).
$$

前两条由极限的四则运算直接得到。乘积法则多出交叉项，是因为两个因子同时变化，一阶增量包含两部分：$u$ 变而 $v$ 不变，以及 $v$ 变而 $u$ 不变。

商法则可以由乘积法则推出：把 $u/v$ 写成 $u\cdot v^{-1}$，再用链式法则，或者直接对 $\dfrac{u(x+h)/v(x+h)-u(x)/v(x)}{h}$ 通分。结论中分子的顺序不能交换，否则差一个负号。

## 乘积法则的证明

关键是把增量拆成两块：

$$
u(x+h)v(x+h)-u(x)v(x)
= u(x+h)\big(v(x+h)-v(x)\big) + v(x)\big(u(x+h)-u(x)\big).
$$

两边除以 $h$：

$$
\frac{\Delta(uv)}{h}
= u(x+h)\frac{\Delta v}{h} + v(x)\frac{\Delta u}{h}.
$$

因为 $u$ 可导，故连续，$u(x+h)\to u(x)$；两个差商分别趋于 $v'(x)$ 与 $u'(x)$。取极限得

$$
(uv)' = u v' + v u' .
$$

证明中用到“可导蕴含连续”，这是上一讲的结论。

## 三个算例

**有理函数**：$y=\dfrac{x^2+1}{x-1}$。

$$
y' = \frac{2x(x-1)-(x^2+1)}{(x-1)^2} = \frac{x^2-2x-1}{(x-1)^2}.
$$

**三角函数的商**：$y=\tan x=\dfrac{\sin x}{\cos x}$。

$$
y' = \frac{\cos x\cos x - \sin x(-\sin x)}{\cos^2 x}
= \frac{\cos^2 x+\sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x}.
$$

结果记作 $\sec^2 x$，在 $\cos x\ne 0$ 的点成立。

**乘积**：$y=x^2\sin x$。

$$
y' = 2x\sin x + x^2\cos x .
$$

三项多项式 $y=x^3-3x+2$ 则逐项求导：$y'=3x^2-3$。这些公式可以反复组合，不需要回到定义。

## 三个常见误解

> [!MYTH] $(uv)'=u'v'$。
> 取 $u=v=x$，左边 $(x^2)'=2x$，右边 $1\cdot 1=1$。正确公式是 $u'v+uv'$，两项分别记录一个因子变化、另一个保持的贡献。

> [!MYTH] $\left(\dfrac{u}{v}\right)'=\dfrac{u'}{v'}$。
> 取 $u=x^2$、$v=x$，左边 $(x)'=1$，右边 $\dfrac{2x}{1}=2x$。商法则的分子是 $u'v-uv'$，分母是 $v^2$，与 $u'/v'$ 无关。

> [!MYTH] 商法则分子中 $u'v$ 与 $uv'$ 可以交换。
> 交换会改变符号。以 $u=\sin x$、$v=x$ 为例，正确导数为 $\dfrac{x\cos x-\sin x}{x^2}$；交换后变成 $\dfrac{\sin x-x\cos x}{x^2}$，正好相差一个负号。

## 练习

> [!PRACTICE] 1 · 多项式
> 求 $y=x^3-3x+2$ 的导数。
>
> > [!ANSWER] 看答案
> > 逐项求导：$y'=3x^2-3$。

> [!PRACTICE] 2 · 商
> 求 $y=\dfrac{x^2+1}{x-1}$ 的导数。
>
> > [!ANSWER] 看答案
> > $y'=\dfrac{2x(x-1)-(x^2+1)}{(x-1)^2}=\dfrac{x^2-2x-1}{(x-1)^2}$，定义域为 $x\ne 1$。

> [!PRACTICE] 3 · 乘积
> 求 $y=x^2\sin x$ 的导数。
>
> > [!ANSWER] 看答案
> > $y'=2x\sin x+x^2\cos x$。

> [!PRACTICE] 4 · 正切
> 求 $y=\tan x$ 的导数。
>
> > [!ANSWER] 看答案
> > 写成 $\dfrac{\sin x}{\cos x}$，得 $y'=\dfrac{\cos^2 x+\sin^2 x}{\cos^2 x}=\sec^2 x$。

> [!FORMAL] 严格表述
> 若 $u,v$ 在 $x$ 可导，则 $(u\pm v)'(x)=u'(x)\pm v'(x)$，$(uv)'(x)=u'(x)v(x)+u(x)v'(x)$，且当 $v(x)\ne 0$ 时 $\left(\dfrac{u}{v}\right)'(x)=\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)^2}$。乘积法则的证明把 $\Delta(uv)$ 拆为 $u(x+h)\Delta v+v(x)\Delta u$，并利用可导蕴含连续。
