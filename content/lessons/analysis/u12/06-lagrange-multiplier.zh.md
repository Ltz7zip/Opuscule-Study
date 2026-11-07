---
slug: "lagrange-multiplier"
subject: "analysis"
unit: "u12"
order: 6
mode: "mastery"
lang: "zh"
kicker: "第 6 讲 · 数学分析 · 专业模式"
title: "条件极值与 Lagrange 乘子"
subtitle: "沿着约束曲面找最优点"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["implicit", "extremum-mv"]
prereq: ["implicit"]
related: ["extremum-mv", "implicit"]
---

## 本讲目标

学完这一讲，你能把“在约束 $g=0$ 下优化 $f$”化成解方程组 $\nabla f=\lambda\nabla g$，并用它求几何距离、体积与乘积型最值。最后你会知道乘子 $\lambda$ 本身代表什么。

无约束时最优点处梯度为零；有约束时，最优点可以沿约束面移动，梯度不必为零，但梯度不能有“沿约束面的分量”，否则还能继续改进。这正是 $\nabla f$ 与 $\nabla g$ 平行的几何来源。

## 三行回顾

- 在约束 $g=0$ 上取条件极值，若 $\nabla g\ne0$，则 $\nabla f=\lambda\nabla g$。
- 解法是联立 $f_x=\lambda g_x$、$f_y=\lambda g_y$、$g=0$，再比较各候选点的函数值。
- $\lambda$ 不是极值，而是最优值对约束水平的敏感度。

## 条件极值的几何条件

设约束集 $S=\{x:g(x)=0\}$ 是一条光滑曲线，$a\in S$。若 $f$ 在 $S$ 上于 $a$ 取极值，考虑沿 $S$ 的任意光滑曲线 $\gamma(t)$，$\gamma(0)=a$。则 $t=0$ 是一元函数 $f(\gamma(t))$ 的极值点，故
$$\frac{\mathrm d}{\mathrm dt}f(\gamma(t))\Big|_{t=0}=\nabla f(a)\cdot\gamma'(0)=0.$$
也就是说，$\nabla f(a)$ 垂直于约束曲线在 $a$ 的切向。另一方面，$g(\gamma(t))=0$ 求导得 $\nabla g(a)\cdot\gamma'(0)=0$，故 $\nabla g(a)$ 也垂直于同一条切向。在平面上，两个向量都垂直于同一条直线，就只能平行：
$$\nabla f(a)=\lambda\nabla g(a).$$
前提是 $\nabla g(a)\ne0$，否则 $\nabla g$ 可能退化，无法定义约束曲线的法向。

## Lagrange 乘子法

求 $f$ 在约束 $g(x,y)=0$ 下的极值：

1. 写出方程组
$$f_x=\lambda g_x,\qquad f_y=\lambda g_y,\qquad g(x,y)=0.$$
2. 解出所有 $(x,y,\lambda)$。
3. 把候选点的 $f$ 值放在一起比较；若约束集紧且 $f$ 连续，最大最小值必在候选中。

三元情形完全类似，只是多一个方程 $f_z=\lambda g_z$。

## 两个具体问题

**问题一**：在 $x+y=1$ 上求 $xy$ 的最大值。方程组为
$$y=\lambda,\qquad x=\lambda,\qquad x+y=1,$$
故 $x=y=1/2$，最大值为 $1/4$。也可以用 $xy\le((x+y)/2)^2=1/4$ 验证。

**问题二**：在单位圆 $x^2+y^2=1$ 上求 $xy$ 的极值。方程组为
$$y=2\lambda x,\qquad x=2\lambda y.$$
两式相乘得 $xy=4\lambda^2xy$。若 $xy\ne0$，则 $\lambda=\pm1/2$；再由 $y=2\lambda x$ 得 $y=\pm x$。候选点为 $(1/\sqrt2,1/\sqrt2)$、$(-1/\sqrt2,-1/\sqrt2)$，$xy=1/2$；以及 $(1/\sqrt2,-1/\sqrt2)$、$(-1/\sqrt2,1/\sqrt2)$，$xy=-1/2$。故最大 $1/2$，最小 $-1/2$。

**问题三**：求原点到平面 $x+2y+2z=9$ 的距离。等价于最小化 $f=x^2+y^2+z^2$，约束 $g=x+2y+2z-9=0$。方程组：
$$2x=\lambda,\qquad 2y=2\lambda,\qquad 2z=2\lambda,$$
故 $x=\lambda/2$、$y=z=\lambda$。代入约束：
$$\frac{\lambda}{2}+2\lambda+2\lambda=\frac{9\lambda}{2}=9\ \Longrightarrow\ \lambda=2.$$
点为 $(1,2,2)$，距离 $\sqrt{1+4+4}=3$。

## 乘子的含义与多约束

把约束右端看成参数：$g(x)=c$，最优值为 $M(c)$。可以证明
$$\frac{\mathrm dM}{\mathrm dc}=\lambda.$$
例如在 $x+y=c$ 上最大化 $xy$，由对称性 $x=y=c/2$，$M(c)=c^2/4$，$M'(c)=c/2$，而乘子 $\lambda=c/2$，一致。所以 $\lambda$ 衡量“放松一点约束能换来多少收益”，不是最优值本身。

多个约束 $g_1=0,\dots,g_m=0$ 时，
$$\nabla f=\lambda_1\nabla g_1+\cdots+\lambda_m\nabla g_m,$$
并要求 $\nabla g_1,\dots,\nabla g_m$ 线性无关。几何上，$\nabla f$ 落在约束曲面法空间内，否则它还有切向分量可以改进。

> [!NOTE]
> 约束必须是等式。不等式约束（如 $x\ge0$）要用 KKT 条件，不能直接套 Lagrange 乘子法。

## 三个常见误解

> [!MYTH] Lagrange 方程解出的点一定是最大值点。
> 方程只给出必要条件。候选点可能分别是极大、极小或鞍点；必须比较函数值，并确认约束集上最值确实存在（例如约束集紧、$f$ 连续）。

> [!MYTH] 不必检查 $\nabla g\ne0$。
> 约束规范失效时方法会漏解。最小化 $f=x$ 在 $g=x^2=0$ 上，约束是 $y$ 轴，最优点为 $(0,0)$；但 $\nabla g=(2x,0)$ 在约束上恒为零，方程 $1=2\lambda x$ 无解。

> [!MYTH] 乘子 $\lambda$ 就是条件极值。
> $\lambda$ 是最优值对约束水平的导数。原点到平面 $x+2y+2z=9$ 的距离问题中 $\lambda=2$，而最短距离是 $3$；两者含义不同。

## 练习

> [!PRACTICE] 1 · 乘积型
> 在 $x+y=3$、$x,y>0$ 下求 $x^2y$ 的最大值。
>
> > [!ANSWER] 看答案
> > $2xy=\lambda$，$x^2=\lambda$，故 $x^2=2xy$，$x=2y$（$x>0$）。代入 $x+y=3$ 得 $y=1$、$x=2$，最大值 $4$。边界 $x=0$ 或 $y=0$ 时函数值为 $0$，故 $4$ 为最大。

> [!PRACTICE] 2 · 点到平面
> 求原点到平面 $2x+y-2z=6$ 的距离。
>
> > [!ANSWER] 看答案
> > 最小化 $x^2+y^2+z^2$，约束 $2x+y-2z=6$。由 $2x=2\lambda$、$2y=\lambda$、$2z=-2\lambda$ 得 $x=\lambda$、$y=\lambda/2$、$z=-\lambda$。代入得 $2\lambda+\lambda/2+2\lambda=6$，即 $\lambda=4/3$。点为 $(4/3,2/3,-4/3)$，距离 $\sqrt{16/9+4/9+16/9}=2$。

> [!PRACTICE] 3 · 三个变量
> $x,y,z>0$，$x+y+z=3$，求 $xyz$ 的最大值。
>
> > [!ANSWER] 看答案
> > $yz=\lambda$，$xz=\lambda$，$xy=\lambda$。相减得 $(y-x)z=0$，故 $x=y$；同理 $y=z$。于是 $x=y=z=1$，最大值为 $1$。

> [!PRACTICE] 4 · 乘子的意义
> 在 $x+y=c$ 上最大化 $xy$，求最优值 $M(c)$ 与乘子 $\lambda$，并验证 $M'(c)=\lambda$。
>
> > [!ANSWER] 看答案
> > 对称性给 $x=y=c/2$，$M(c)=c^2/4$。Lagrange 方程 $y=\lambda$、$x=\lambda$ 给 $\lambda=c/2$。而 $M'(c)=c/2$，确实等于 $\lambda$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $f,g$ 在 $a$ 的邻域内 $C^1$，$g(a)=0$，$\nabla g(a)\ne0$。若 $f$ 在约束集 $\{g=0\}$ 上于 $a$ 取局部极值，则存在 $\lambda\in\mathbb{R}$ 使 $\nabla f(a)=\lambda\nabla g(a)$。多约束情形：若 $g_1(a)=\cdots=g_m(a)=0$，$\nabla g_1(a),\dots,\nabla g_m(a)$ 线性无关，且 $f$ 在约束集上于 $a$ 取局部极值，则存在 $\lambda_1,\dots,\lambda_m$ 使 $\nabla f(a)=\sum_{i=1}^m\lambda_i\nabla g_i(a)$。该条件是必要的，充分性需另行比较候选值。
