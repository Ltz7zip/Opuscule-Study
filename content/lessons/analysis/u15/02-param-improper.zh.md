---
slug: "param-improper"
subject: "analysis"
unit: "u15"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "含参变量的反常积分"
subtitle: "一致收敛：让极限与积分可以交换"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["paramint", "impropint"]
prereq: ["paramint"]
related: ["paramint", "fourier"]
---

## 本讲目标

含参反常积分多了一个无穷端点，逐点收敛已经不够用：要让积分对参数连续、可导、可积，需要**一致收敛**。学完这一讲，你能写出一致收敛的定义，用 Weierstrass、Dirichlet、Abel 三个判别法验证，并用参数求导算出 Dirichlet 积分 $\int_0^\infty\frac{\sin x}{x}dx=\frac{\pi}{2}$。

## 三行回顾

- 反常积分是取上限的极限，含参时这个极限可能对不同 $y$ 速度不同。
- 一致收敛要求“尾巴”对所有 $y$ 同时变小。
- 只有一致收敛，才能把极限、导数、积分与积分号交换。

## 一致收敛的定义

设 $f(x,y)$ 在 $[a,\infty)\times Y$ 上有定义，且对每个 $y\in Y$，$\int_a^\infty f(x,y)\,dx$ 收敛。若对任意 $\varepsilon>0$，存在 $A>0$，使得当 $A'>A$ 时

$$\left|\int_{A'}^\infty f(x,y)\,dx\right|<\varepsilon$$

对**所有** $y\in Y$ 同时成立，就称该积分在 $Y$ 上**一致收敛**。

差别只在量词顺序。逐点收敛是：对每个 $y$ 和每个 $\varepsilon$，存在 $A(y,\varepsilon)$。一致收敛是：对每个 $\varepsilon$，存在统一的 $A(\varepsilon)$，之后对所有 $y$ 都管用。

例：$\int_0^\infty e^{-xy}dx=\frac1y$（$y>0$）。在 $[\delta,\infty)$ 上，尾巴 $\int_A^\infty e^{-xy}dx=\frac{e^{-Ay}}{y}\le\frac{e^{-A\delta}}{\delta}$，可以一致地压小，故一致收敛。在 $(0,\infty)$ 上不一致：给定 $A$，取 $y=1/A$，尾巴约为 $\frac{e^{-1}}{1/A}=Ae^{-1}$，不趋于零。

## 三个判别法

**Weierstrass 判别法**：若 $|f(x,y)|\le M(x)$，且 $\int_a^\infty M(x)dx$ 收敛，则 $\int_a^\infty f(x,y)dx$ 在 $Y$ 上一致且绝对收敛。它最好用，但要求绝对收敛。

**Dirichlet 判别法**：若 $\left|\int_a^A f(x,y)dx\right|\le K$ 对所有 $A$、$y$ 成立，且 $g(x,y)$ 对每个 $y$ 关于 $x$ 单调、当 $x\to\infty$ 时对 $y$ 一致趋于 $0$，则 $\int_a^\infty f(x,y)g(x,y)dx$ 一致收敛。

**Abel 判别法**：若 $\int_a^\infty f(x,y)dx$ 一致收敛，$g(x,y)$ 对每个 $y$ 关于 $x$ 单调且对 $x,y$ 一致有界，则 $\int_a^\infty fg\,dx$ 一致收敛。

Dirichlet 判别法专门处理条件收敛，例如 $\int_1^\infty\frac{\sin x}{x^y}dx$ 在 $y\ge\delta>0$ 上一致收敛。

## 一致收敛下的性质

设 $\int_a^\infty f(x,y)dx$ 在 $Y$ 上一致收敛，且 $f$ 连续，则 $I(y)=\int_a^\infty f(x,y)dx$ 在 $Y$ 上连续。

若 $f_y$ 连续，$\int_a^\infty f_y(x,y)dx$ 在 $Y$ 上一致收敛，且 $\int_a^\infty f(x,y_0)dx$ 对某个 $y_0$ 收敛，则

$$I'(y)=\int_a^\infty f_y(x,y)\,dx.$$

若 $f$ 连续且积分在 $Y=[c,d]$ 上一致收敛，则

$$\int_c^d dy\int_a^\infty f(x,y)\,dx=\int_a^\infty dx\int_c^d f(x,y)\,dy.$$

三条结论的共同结构：一致收敛负责把“极限”与“积分/求导”交换。

## 经典例子：Dirichlet 积分

令

$$J(y)=\int_0^\infty e^{-xy}\frac{\sin x}{x}\,dx,\qquad y>0.$$

在 $[\delta,\infty)$ 上，$|e^{-xy}\sin x/x|\le e^{-\delta x}$，由 Weierstrass 判别法，原积分与对 $y$ 求导后的积分 $\int_0^\infty -e^{-xy}\sin x\,dx$ 都一致收敛。于是可以求导：

$$J'(y)=-\int_0^\infty e^{-xy}\sin x\,dx=-\frac{1}{1+y^2}.$$

又 $|J(y)|\le\int_0^\infty e^{-xy}dx=\frac1y\to0$（$y\to\infty$），所以

$$J(y)=\int_\infty^y-\frac{dt}{1+t^2}=\frac{\pi}{2}-\arctan y.$$

令 $y\to0^+$。被积函数被可积函数 $\left|\frac{\sin x}{x}\right|$ 控制，可用控制收敛（或对 $[0,\infty)$ 上的一致性单独论证），得

$$\int_0^\infty\frac{\sin x}{x}\,dx=J(0^+)=\frac{\pi}{2}.$$

这个积分本身条件收敛，不能拆成两个发散积分，也不能用 Weierstrass 判别法直接处理 $y=0$。

**不一致收敛的例子。** 对每个 $y>0$，$\int_0^\infty ye^{-xy}dx=1$。但令 $y\to0^+$，积分的极限是 $1$，而极限函数（$y=0$ 时被积函数恒为零）的积分是 $0$。两个数不相等，说明积分与极限不能交换；根源正是在 $(0,1]$ 上不一致收敛：无论 $y$ 多小，$ye^{-xy}$ 在 $x\approx1/y$ 处的“峰”始终贡献一段不可忽略的面积。

## 三个常见误解

> [!MYTH] 每个 $y$ 都收敛，就能保证 $I(y)$ 连续。
> 需要一致收敛。逐点收敛时，尾巴变小的速度依赖 $y$，极限函数可能不连续。

> [!MYTH] 一致收敛等于绝对收敛。
> Dirichlet 判别法给出的往往只是条件一致收敛。$\int_0^\infty\frac{\sin x}{x}dx$ 一致收敛但不绝对收敛。

> [!MYTH] 只要原积分收敛，就能在积分号下求导。
> 还需要 $\int f_y$ 一致收敛。否则求导后的积分可能发散，或与原函数的导数不相等。

## 练习

> [!PRACTICE] 1 · 一致性
> 证明 $\int_0^\infty e^{-xy}dx$ 在 $[\delta,\infty)$ 上一致收敛，在 $(0,\infty)$ 上不一致。
>
> > [!ANSWER] 看答案
> > 尾巴为 $\frac{e^{-Ay}}{y}\le\frac{e^{-A\delta}}{\delta}\to0$，与 $y$ 无关。在 $(0,\infty)$ 上取 $y=1/A$，尾巴 $=Ae^{-1}$，不趋于零。

> [!PRACTICE] 2 · 求导
> 用求导法计算 $\int_0^\infty xe^{-xy}dx$，$y>0$。
>
> > [!ANSWER] 看答案
> > $\int_0^\infty e^{-xy}dx=\frac1y$，对 $y$ 求导得 $-\frac1{y^2}=\int_0^\infty(-x)e^{-xy}dx$，故原积分 $=\frac1{y^2}$。

> [!PRACTICE] 3 · M 判别
> 证明 $\int_0^\infty e^{-xy}\cos x\,dx$ 在 $[\delta,\infty)$ 上一致收敛。
>
> > [!ANSWER] 看答案
> > $|e^{-xy}\cos x|\le e^{-\delta x}$，而 $\int_0^\infty e^{-\delta x}dx=\frac1\delta$ 收敛，由 Weierstrass 判别法得一致收敛。

> [!PRACTICE] 4 · 数值
> 利用 $J(y)=\frac{\pi}{2}-\arctan y$，求 $J(0)$ 与 $J(1)$。
>
> > [!ANSWER] 看答案
> > $J(0)=\frac{\pi}{2}$，$J(1)=\frac{\pi}{2}-\frac{\pi}{4}=\frac{\pi}{4}$，即 $\int_0^\infty e^{-x}\frac{\sin x}{x}dx=\frac{\pi}{4}$。

> [!FORMAL] 严格表述
> 设 $f(x,y)$ 在 $[a,\infty)\times Y$ 上连续，$\int_a^\infty f(x,y)dx$ 对每个 $y\in Y$ 收敛。若对任意 $\varepsilon>0$ 存在 $A$，使 $A'>A$ 时 $\left|\int_{A'}^\infty f(x,y)dx\right|<\varepsilon$ 对一切 $y\in Y$ 成立，则称积分在 $Y$ 上一致收敛。此时 $I(y)$ 连续；若 $f_y$ 连续且 $\int_a^\infty f_y\,dx$ 在 $Y$ 上一致收敛，则 $I'(y)=\int_a^\infty f_y\,dx$；若 $Y=[c,d]$，则两个累次积分可交换。
