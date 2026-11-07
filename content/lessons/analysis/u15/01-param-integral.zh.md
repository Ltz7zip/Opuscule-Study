---
slug: "param-integral"
subject: "analysis"
unit: "u15"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "含参变量的常义积分"
subtitle: "把参数当常数积完，再研究它对参数的性质"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["paramint"]
prereq: ["defint"]
related: ["paramint", "unifconv"]
---

## 本讲目标

含参变量积分 $I(y)=\int_a^b f(x,y)\,dx$ 是一个新的函数：每取一个 $y$，就得到一个定积分。学完这一讲，你能说明它何时连续、何时可导，正确使用 Leibniz 求导法则，并能通过对参数积分算出一类没有初等原函数的定积分。

## 三行回顾

- 定积分把 $x$ 积掉，剩下一个只依赖 $y$ 的函数。
- 连续性来自 $f$ 在矩形上的一致连续性。
- 求导来自把 $f_y$ 移进积分号，但需要 $f_y$ 连续。

## 连续性与一致有界

设 $f(x,y)$ 在矩形 $R=[a,b]\times[c,d]$ 上连续，令

$$I(y)=\int_a^b f(x,y)\,dx,\qquad y\in[c,d].$$

则 $I$ 在 $[c,d]$ 上连续。证明的关键不是每个 $f(\cdot,y)$ 连续，而是 $f$ 在紧矩形上**一致连续**：对任意 $\varepsilon>0$，存在 $\delta>0$，只要 $|y-y_0|<\delta$，就有 $|f(x,y)-f(x,y_0)|<\varepsilon/(b-a)$ 对**所有** $x$ 同时成立。于是

$$|I(y)-I(y_0)|\le\int_a^b|f(x,y)-f(x,y_0)|\,dx<\varepsilon.$$

“对所有 $x$ 同时成立”这句话是全部要害，它把逐点的连续性升级为积分后的连续性。

## Leibniz 求导法则

若 $f$ 与 $f_y$ 都在 $R$ 上连续，则 $I$ 在 $[c,d]$ 上可导，且

$$I'(y)=\int_a^b\frac{\partial f}{\partial y}(x,y)\,dx.$$

证明用差商与中值定理：$\frac{f(x,y+\Delta y)-f(x,y)}{\Delta y}=f_y(x,\eta)$，再用 $f_y$ 的一致连续性控制误差。

例：$f(x,y)=x^y$，$x\in[0,1]$，$y>0$。先积出

$$I(y)=\int_0^1x^y\,dx=\frac{1}{y+1}.$$

求导得 $I'(y)=-\frac{1}{(y+1)^2}$。另一方面，把 $f_y=x^y\ln x$ 移进积分：

$$\int_0^1x^y\ln x\,dx=-\frac{1}{(y+1)^2}.$$

取 $y=0$ 得 $\int_0^1\ln x\,dx=-1$，与直接计算一致。这个等式在 $y=0$ 处仍然成立，因为 $x^y\ln x$ 在 $[0,1]\times[0,1]$ 上有界可积。

若积分限也依赖参数，Leibniz 公式多出两项：

$$\frac{d}{dy}\int_{a(y)}^{b(y)}f(x,y)\,dx=f(b(y),y)b'(y)-f(a(y),y)a'(y)+\int_{a(y)}^{b(y)}f_y(x,y)\,dx.$$

## 对参数积分

若 $f$ 在矩形上连续，则 $I(y)$ 可积，且

$$\int_c^d I(y)\,dy=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx.$$

这正是 Fubini 定理在一维参数下的版本：两个累次积分可以交换。

它的威力在于把难算的一维积分变成好算的二重积分。设 $a,b>-1$，考虑

$$J=\int_0^1\frac{x^b-x^a}{\ln x}\,dx.$$

被积函数在 $x=0$ 与 $x=1$ 处要按极限理解，但它可以写成

$$\frac{x^b-x^a}{\ln x}=\int_a^b x^y\,dy.$$

交换积分次序：

$$J=\int_0^1dx\int_a^b x^y\,dy=\int_a^b\left(\int_0^1x^y\,dx\right)dy=\int_a^b\frac{dy}{y+1}=\ln\frac{b+1}{a+1}.$$

一个看似无原函数的积分，被参数化之后只剩下一个对数。

## 经典例子与使用边界

**例 1.** $\int_0^1\frac{x^y-1}{\ln x}\,dx=\ln(y+1)$，$y>-1$。因为 $\frac{x^y-1}{\ln x}=\int_0^y x^t\,dt$，交换次序得 $\int_0^y\frac{dt}{t+1}=\ln(y+1)$。

**例 2.** $\int_0^1\frac{x^2-x}{\ln x}\,dx=\ln\frac32$，在**例 1** 的公式中取 $y=2$ 即可。

**例 3.** 设 $I(a)=\int_0^1\frac{\ln(1+ax)}{1+x^2}dx$，$a>0$。对参数求导：

$$I'(a)=\int_0^1\frac{x}{(1+ax)(1+x^2)}dx .$$

在 $a=1$ 处，被积函数拆成 $-\frac{1}{2(1+x)}+\frac{x+1}{2(1+x^2)}$，积分得 $I'(1)=\frac{\pi}{8}-\frac{\ln2}{4}$。

**例 4.** $F(y)=\int_0^1\frac{dx}{1+y^2x^2}$，$y\in[0,2]$。$f$ 与 $f_y=\frac{-2yx^2}{(1+y^2x^2)^2}$ 在闭矩形上连续，故 $F$ 连续可导，且 $F'(y)=\int_0^1\frac{-2yx^2}{(1+y^2x^2)^2}dx$。这里不必算出 $F$ 的初等表达式——需要的只是“可导”这个结论，以及导数仍是一个正常积分。

参数化的作用是让“不会算的积分”变成“含参的积分”，再用连续性、求导或对参数积分把参数消掉。操作顺序固定：先确认 $f$ 与 $f_y$ 在闭矩形上连续，再求导，最后把参数取回需要的值。

使用边界要检查三条：$f$ 在闭矩形上连续；$f_y$ 连续（求导时）；积分限是否也含参数。若 $f_y$ 只在开区域连续，结论可能在边界失效，需要单独讨论。常见的补救办法是先退到闭子矩形上得到结论，再让子矩形逼近原来的区域。

## 三个常见误解

> [!MYTH] 只要 $f(x,y)$ 对每个 $y$ 关于 $x$ 可积，$I(y)$ 就连续。
> 不够。需要 $f$ 在矩形上联合连续（或至少一致连续），否则积分值可能随 $y$ 跳跃。

> [!MYTH] 求导可以无条件把 $d/dy$ 移进积分号。
> 需要 $f_y$ 在矩形上连续，或满足控制收敛条件。否则移进去得到的积分可能不存在，或与原导数不等。

> [!MYTH] 积分限含参时，Leibniz 公式只多一个积分项。
> 还要加上两个边界项 $f(b(y),y)b'(y)$ 与 $-f(a(y),y)a'(y)$。漏掉边界项是最常见的错误。

## 练习

> [!PRACTICE] 1 · 直接验证
> $I(y)=\int_0^1(x+y)^2dx$，先积出 $I(y)$，再求导，并与 $\int_0^1 2(x+y)\,dx$ 比较。
>
> > [!ANSWER] 看答案
> > $I(y)=\frac13+y+y^2$，$I'(y)=1+2y$；而 $\int_0^1 2(x+y)dx=1+2y$，一致。

> [!PRACTICE] 2 · 求导
> 用 Leibniz 法则计算 $\int_0^1x^y\ln x\,dx$。
>
> > [!ANSWER] 看答案
> > $I(y)=\frac{1}{y+1}$，故 $I'(y)=-\frac{1}{(y+1)^2}$。

> [!PRACTICE] 3 · 参数积分
> 计算 $\int_0^1\frac{x^2-x}{\ln x}\,dx$。
>
> > [!ANSWER] 看答案
> > 由公式 $\int_0^1\frac{x^b-x^a}{\ln x}dx=\ln\frac{b+1}{a+1}$，取 $b=2,a=1$，得 $\ln\frac32$。

> [!PRACTICE] 4 · 变限
> $I(y)=\int_0^y e^{-yx}\,dx$，求 $I'(y)$。
>
> > [!ANSWER] 看答案
> > $I(y)=\frac{1-e^{-y^2}}{y}$（$y\neq0$），直接求导得 $I'(y)=\frac{(2y^2+1)e^{-y^2}-1}{y^2}$。用变限 Leibniz 验证：$e^{-y^2}\cdot1-0+\int_0^y(-x)e^{-yx}dx$，结果相同。

> [!FORMAL] 严格表述
> 设 $f,f_y$ 在 $R=[a,b]\times[c,d]$ 上连续。则 $I(y)=\int_a^bf(x,y)dx$ 在 $[c,d]$ 上连续可导，且 $I'(y)=\int_a^bf_y(x,y)dx$；进一步 $\int_c^dI(y)dy=\int_a^b\int_c^df(x,y)\,dy\,dx$。若 $a(y),b(y)\in C^1$ 且 $f,f_y$ 连续，则 $\frac{d}{dy}\int_{a(y)}^{b(y)}f(x,y)dx=f(b(y),y)b'(y)-f(a(y),y)a'(y)+\int_{a(y)}^{b(y)}f_y(x,y)dx$。
