---
slug: "defint-application"
subject: "analysis"
unit: "u07"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "定积分的应用"
subtitle: "面积、体积、弧长，都是同一个微元"
minutes: 17
meta: ["阅读 17 分钟","需要 初等数学","掌握级"]
concepts: ["defint"]
prereq: ["defint"]
related: ["defint", "multipleint"]
---

## 本讲目标

学完这一讲，你能用定积分求平面图形面积、旋转体体积和曲线弧长，能写出变力做功与平均值的积分表达式，并说清每个公式里微元是怎么来的。

这些公式不必死记。它们全部来自同一个动作：把整体切成小片，写出小片的近似量，再让分割趋于无穷。

## 三行回顾

- 定积分是微元求和的极限，面积、体积、弧长、功都套这个结构。
- 面积用 $\int(\text{上}-\text{下})$，体积用截面积分，弧长用 $\int\sqrt{1+y'^2}$。
- 公式的差别只在“微元长什么样”，不在积分本身。

## 平面图形的面积

若在 $[a,b]$ 上 $g\le f$，则两曲线之间的面积为

$$A=\int_a^b\bigl(f(x)-g(x)\bigr)dx .$$

**例**：$y=x$ 与 $y=x^2$ 在 $[0,1]$ 上围成的图形，$A=\int_0^1(x-x^2)dx=\frac12-\frac13=\frac16\approx0.167$。

交点必须先求：$x=x^2$ 给出 $x=0,1$，积分限由此确定。图形上下关系翻转时要分段，例如 $y=x^3$ 与 $y=x$ 在 $[-1,1]$ 上围成两块，须算 $\int_{-1}^0(x^3-x)dx+\int_0^1(x-x^3)dx=\frac14+\frac14=\frac12$。

极坐标下，曲边扇形面积由微元 $\frac12r^2d\theta$ 累加：

$$A=\frac12\int_\alpha^\beta r^2(\theta)\,d\theta .$$

**例**：$r=2\cos\theta$，$\theta\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$ 是半径 $1$ 的圆，$A=\frac12\int4\cos^2\theta\,d\theta=2\cdot\frac{\pi}{2}=\pi$。

## 旋转体的体积

绕 $x$ 轴旋转，用垂直于轴的薄片作微元，截面积是 $\pi y^2$，故

$$V=\pi\int_a^b y^2\,dx .$$

**例**：$y=x^2$ 在 $[0,1]$ 上绕 $x$ 轴，$V=\pi\int_0^1x^4dx=\frac{\pi}{5}\approx0.628$。

绕 $y$ 轴时若用柱壳法，微元是周长乘高再乘厚度：

$$V=2\pi\int_a^b x\,y\,dx .$$

**例**：同一条曲线绕 $y$ 轴，$V=2\pi\int_0^1x\cdot x^2dx=\frac{\pi}{2}\approx1.571$。两个数不同很正常——绕的轴不同，扫出的立体不同。

## 弧长、平均值与做功

若 $y=f(x)$ 在 $[a,b]$ 上连续可导，则弧长为

$$L=\int_a^b\sqrt{1+f'(x)^2}\,dx .$$

**例**：$y=\frac{x^2}{2}$ 在 $[0,1]$ 上，$f'=x$，

$$L=\int_0^1\sqrt{1+x^2}\,dx=\frac{\sqrt2}{2}+\frac12\ln\bigl(1+\sqrt2\bigr)\approx1.148 .$$

而两端间的弦长只有 $\sqrt{1+0.25}\approx1.118$，弧长略大于弦长，符合直觉。

平均值由积分中值定理给出：$\bar f=\dfrac{1}{b-a}\int_a^b f$。$f=x^2$ 在 $[0,3]$ 上的平均值是 $\frac13\cdot9=3$。

变力做功按微元 $F(x)dx$ 累加：$W=\int_a^bF(x)\,dx$。弹簧满足 $F=kx$，拉长 $L$ 做功 $W=\int_0^Lkx\,dx=\frac12kL^2$。取 $k=100\ \mathrm{N/m}$、$L=0.2\ \mathrm{m}$，得 $W=2\ \mathrm{J}$。

## 三个常见误解

> [!MYTH] 面积就是 $\int_a^b f$，不用管正负。
> 积分给的是代数和。$\int_0^{2\pi}\sin x\,dx=0$，但 $y=\sin x$ 与 $x$ 轴围成的面积是 $4$。被积函数变号时必须分段或取绝对值。

> [!MYTH] 绕 $y$ 轴旋转也用 $\pi\int y^2dx$。
> 公式跟着轴走。绕 $y$ 轴用圆盘法是 $\pi\int x^2dy$，用柱壳法是 $2\pi\int xy\,dx$。把绕 $x$ 轴的公式套过来，量纲对不上，结果也错。

> [!MYTH] 弧长就是两端点之间的距离。
> 弦长只是下界。$y=\frac{x^2}{2}$ 在 $[0,1]$ 上弦长约 $1.118$，弧长约 $1.148$，曲线比直线长。

## 练习

> [!PRACTICE] 1 · 面积
> 求 $y=x$ 与 $y=x^2$ 围成的面积。
>
> > [!ANSWER] 看答案
> > 交点为 $0,1$，$A=\int_0^1(x-x^2)dx=\frac16\approx0.167$。

> [!PRACTICE] 2 · 体积
> $y=\sqrt x$ 在 $[0,4]$ 上绕 $x$ 轴旋转，求体积。
>
> > [!ANSWER] 看答案
> > $V=\pi\int_0^4x\,dx=\pi\cdot8=8\pi\approx25.13$。

> [!PRACTICE] 3 · 弧长
> 求 $y=\frac23x^{3/2}$ 在 $[0,3]$ 上的弧长。
>
> > [!ANSWER] 看答案
> > $y'=\sqrt x$，$L=\int_0^3\sqrt{1+x}\,dx=\frac23(1+x)^{3/2}\Big|_0^3=\frac23(8-1)=\frac{14}{3}\approx4.667$。

> [!PRACTICE] 4 · 平均值
> 求 $f(x)=x^2$ 在 $[0,3]$ 上的平均值。
>
> > [!ANSWER] 看答案
> > $\frac13\int_0^3x^2dx=\frac13\cdot9=3$。

> [!FORMAL] 严格表述
> 设 $f$ 在 $[a,b]$ 上连续且 $f\ge0$，则曲线 $y=f(x)$、$x$ 轴与 $x=a,b$ 围成的面积 $A=\int_a^b f$；绕 $x$ 轴的旋转体体积 $V=\pi\int_a^b f^2$。若 $f$ 在 $[a,b]$ 上连续可导，弧长 $L=\int_a^b\sqrt{1+f'^2}$。这些公式都是对微元作 Riemann 和再取极限的结果，不是新的定义。
