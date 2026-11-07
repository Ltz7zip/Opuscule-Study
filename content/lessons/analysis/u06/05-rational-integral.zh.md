---
slug: "rational-integral"
subject: "analysis"
unit: "u06"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "有理函数与三角有理式的积分"
subtitle: "先拆成最简分式，再逐项套表"
minutes: 17
meta: ["阅读 17 分钟","需要 初等数学","掌握级"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint"]
---

## 本讲目标

学完这一讲，你能把有理函数拆成部分分式并逐项积分，能处理不可约二次因式对应的对数与反正切项，也能用万能代换把三角有理式化成有理函数。

有理函数的积分在理论上没有障碍：任何有理函数都能拆成四类最简分式，每一类都有闭式原函数。剩下的只是算术是否耐心。

## 三行回顾

- 有理函数是两个多项式的商 $\dfrac{P(x)}{Q(x)}$。
- 若分子次数不低于分母，先做多项式除法，把假分式拆成多项式加真分式。
- 真分式按分母的因式分解逐项拆开，每一项都能套基本积分表。

## 部分分式的四种项

设 $\dfrac{P(x)}{Q(x)}$ 是真分式，$Q$ 已在实数范围内分解为一次因式与不可约二次因式的乘积。分解后只出现四种项：

| 分母中的因式 | 对应的项 |
| --- | --- |
| $(x-a)$ | $\dfrac{A}{x-a}$ |
| $(x-a)^k$ | $\dfrac{A_1}{x-a}+\cdots+\dfrac{A_k}{(x-a)^k}$ |
| $x^2+px+q$（$p^2<4q$） | $\dfrac{Bx+C}{x^2+px+q}$ |
| $(x^2+px+q)^k$ | 各次幂各一项，分子均为一次式 |

待定系数由通分后比较同次幂系数确定，或代入特殊值快速求解。

## 三类基本积分

$$\int\frac{A}{x-a}dx=A\ln|x-a|+C .$$

对不可约二次因式，先把分子拆成“分母导数 + 常数”：

$$\int\frac{Bx+C}{x^2+px+q}dx=\frac{B}{2}\ln(x^2+px+q)+\left(C-\frac{Bp}{2}\right)\int\frac{dx}{x^2+px+q} .$$

最后一项配方后用反正切：

$$\int\frac{dx}{x^2+px+q}=\frac{2}{\sqrt{4q-p^2}}\arctan\frac{2x+p}{\sqrt{4q-p^2}}+C .$$

例如 $\int\dfrac{dx}{x^2+2x+5}$：配方得 $(x+1)^2+4$，故结果为 $\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$。

## 两个完整例子

**例一**：$\int\dfrac{dx}{x^2-1}$。分解 $\dfrac{1}{(x-1)(x+1)}=\dfrac{1}{2}\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$，于是

$$\int\frac{dx}{x^2-1}=\frac{1}{2}\ln\left|\frac{x-1}{x+1}\right|+C .$$

**例二**：$\int\dfrac{2x+3}{x^2+3x+2}dx$。分母分解为 $(x+1)(x+2)$，设

$$\frac{2x+3}{(x+1)(x+2)}=\frac{A}{x+1}+\frac{B}{x+2} .$$

通分比较得 $A+B=2$、$2A+B=3$，解得 $A=B=1$。于是积分为

$$\ln|x+1|+\ln|x+2|+C=\ln|(x+1)(x+2)|+C .$$

这里有个巧合可以用：分子恰好是分母的导数，$\bigl(x^2+3x+2\bigr)'=2x+3$，直接得 $\ln|x^2+3x+2|+C$。做之前先看一眼分子，能省一半工夫。

## 三角有理式与万能代换

由 $\sin x$、$\cos x$ 与常数经四则运算得到的式子叫三角有理式。令

$$t=\tan\frac{x}{2},\qquad \sin x=\frac{2t}{1+t^2},\quad \cos x=\frac{1-t^2}{1+t^2},\quad dx=\frac{2\,dt}{1+t^2},$$

任何三角有理式都化为 $t$ 的有理函数，再用部分分式处理。

**例**：$\int\dfrac{dx}{1+\sin x}$。代入得

$$\int\frac{\frac{2\,dt}{1+t^2}}{1+\frac{2t}{1+t^2}}=\int\frac{2\,dt}{(1+t)^2}=-\frac{2}{1+t}+C=-\frac{2}{1+\tan\frac{x}{2}}+C .$$

万能代换一定有效，但常常把式子变复杂。若被积函数只含 $\sin^2x$、$\cos^2x$ 或 $\tan x$，改用 $t=\tan x$ 往往更省事。

## 三个常见误解

> [!MYTH] 假分式可以直接拆部分分式。
> 必须先做多项式除法。$\dfrac{x^2}{x+1}$ 若不除就设 $\dfrac{A}{x+1}$，次数对不上，永远解不出系数。正确写法是 $x-1+\dfrac{1}{x+1}$。

> [!MYTH] 不可约二次因式对应的分子也是常数。
> 应为一次式 $Bx+C$。写成常数会丢失一个自由度，导致分解失败。例如 $\dfrac{1}{(x^2+1)(x-1)}$ 必须设 $\dfrac{Bx+C}{x^2+1}+\dfrac{A}{x-1}$。

> [!MYTH] 三角有理式一律用万能代换最快。
> 它保证可行，不保证简洁。$\int\dfrac{dx}{1+\sin^2x}$ 若用 $t=\tan\frac{x}{2}$ 会出现四次多项式；改用 $u=\tan x$ 只需两步。

## 练习

> [!PRACTICE] 1 · 分子是分母导数
> 求 $\int\dfrac{2x+3}{x^2+3x+2}dx$。
>
> > [!ANSWER] 看答案
> > 分子正是分母的导数，故原式 $=\ln|x^2+3x+2|+C$。若走部分分式，得 $\ln|x+1|+\ln|x+2|+C$，两者相同。

> [!PRACTICE] 2 · 平方差
> 求 $\int\dfrac{dx}{x^2-1}$。
>
> > [!ANSWER] 看答案
> > $\dfrac{1}{x^2-1}=\dfrac{1}{2}\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$，积分得 $\dfrac{1}{2}\ln\left|\dfrac{x-1}{x+1}\right|+C$。

> [!PRACTICE] 3 · 配方
> 求 $\int\dfrac{dx}{x^2+4x+13}$。
>
> > [!ANSWER] 看答案
> > 配方得 $(x+2)^2+9$，故原式 $=\dfrac{1}{3}\arctan\dfrac{x+2}{3}+C$。

> [!PRACTICE] 4 · 万能代换
> 求 $\int\dfrac{dx}{1+\sin x}$。
>
> > [!ANSWER] 看答案
> > 令 $t=\tan\frac{x}{2}$，得 $\int\dfrac{2\,dt}{(1+t)^2}=-\dfrac{2}{1+t}+C=-\dfrac{2}{1+\tan\frac{x}{2}}+C$。

> [!FORMAL] 严格表述
> 设 $P,Q$ 为实系数多项式，$Q$ 在实数范围内分解为一次因式与不可约二次因式之积。若 $\deg P<\deg Q$，则 $\dfrac{P}{Q}$ 可唯一地写成上述四种最简分式之和，系数由通分后比较同次幂确定。每个最简分式的原函数都是初等函数：一次因式给出对数，不可约二次因式给出对数与反正切。若 $\deg P\ge\deg Q$，先用带余除法写成多项式与真分式之和。
