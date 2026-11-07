---
slug: "implicit-function"
subject: "analysis"
unit: "u12"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "隐函数定理"
subtitle: "方程藏着一条曲线，只要偏导不为零"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["implicit", "partial"]
prereq: ["partial"]
related: ["implicit", "extremum-mv"]
---

## 本讲目标

学完这一讲，你能用隐函数定理判断方程 $F(x,y)=0$ 能否在一点附近解出 $y=\varphi(x)$，并用公式 $\varphi'=-F_x/F_y$ 求导，包括二阶导与方程组情形。

很多曲线以方程形式出现：$x^2+y^2=1$ 是圆，$e^y+xy=e$ 在某点附近也是一条曲线。定理回答的不是“能不能写出公式”，而是“局部是否有一条唯一的、可导的曲线”。

## 三行回顾

- 若 $F(a,b)=0$ 且 $F_y(a,b)\ne0$，则在 $(a,b)$ 附近可唯一解出 $y=\varphi(x)$。
- 求导公式是 $\varphi'=-F_x/F_y$，由 $F(x,\varphi(x))=0$ 两边对 $x$ 求导得到。
- 方程组情形把 $F_y$ 换成 Jacobi 行列式 $\partial(F,G)/\partial(y,z)$，要求它非零。

## 一个方程：定理与公式

设 $F(x,y)$ 在 $(a,b)$ 的邻域内有连续偏导，$F(a,b)=0$，且
$$F_y(a,b)\ne0.$$
则存在 $a$ 的一个邻域 $U$ 与唯一的连续可导函数 $\varphi:U\to\mathbb{R}$，使 $\varphi(a)=b$，且对 $x\in U$，
$$F(x,\varphi(x))=0,\qquad \varphi'(x)=-\frac{F_x(x,\varphi(x))}{F_y(x,\varphi(x))}.$$
公式的来历：把 $F(x,\varphi(x))=0$ 对 $x$ 求导，链式法则给出
$$F_x+F_y\varphi'=0,$$
再解出 $\varphi'$。$F_y\ne0$ 保证分母不为零。

几何上，$F_y\ne0$ 说明曲线在 $(a,b)$ 处不竖直，可以写成 $y$ 关于 $x$ 的函数；若 $F_x\ne0$，则可以反过来解 $x=\psi(y)$。

## 手算隐函数导数

例 1：$x^2+y^2=1$ 在 $(0,1)$ 附近。$F=x^2+y^2-1$，$F_y=2y$，在 $(0,1)$ 为 $2\ne0$，故可解出 $y=\sqrt{1-x^2}$。求导：
$$y'=-\frac{F_x}{F_y}=-\frac{2x}{2y}=-\frac xy.$$
在 $(0,1)$ 处 $y'=0$，切线水平。在 $(\sqrt3/2,1/2)$ 处 $y'=-\sqrt3$，切线很陡。

再求二阶导。对 $y'=-x/y$ 用商法则，注意 $y$ 是 $x$ 的函数：
$$y''=-\frac{y-xy'}{y^2}=-\frac{y+x^2/y}{y^2}=-\frac{1}{y^3}.$$
在 $(0,1)$ 处 $y''=-1$，曲线在最高点向下弯，符合圆的形状。

例 2：$e^y+xy=e$ 在 $(0,1)$ 附近。$F=e^y+xy-e$，$F(0,1)=e+0-e=0$，$F_y=e^y+x$，在 $(0,1)$ 为 $e\ne0$。于是
$$y'=-\frac{y}{e^y+x},\qquad y'(0)=-\frac1e\approx-0.368.$$
切线因此是 $y=1-x/e$；在 $x=0.1$ 处给出 $y\approx0.963$，可作为一阶近似。隐函数定理保证这条切线确实是曲线的局部近似。这也说明导数公式给出的斜率可以直接用于作图，在局部范围内可靠。

切线也可直接写出：
$$F_x(a,b)(x-a)+F_y(a,b)(y-b)=0.$$
对圆在 $(\sqrt3/2,1/2)$ 处：$\sqrt3(x-\sqrt3/2)+(y-1/2)=0$，化简为 $\sqrt3x+y=2$。

## 方程组与 Jacobi 行列式

设 $F(x,y,z)=0$、$G(x,y,z)=0$，在 $(a,b,c)$ 处 $F=G=0$。若 Jacobi 行列式
$$\frac{\partial(F,G)}{\partial(y,z)}=\det\begin{pmatrix}F_y&F_z\\G_y&G_z\end{pmatrix}\ne0,$$
则可在 $x=a$ 附近唯一解出 $y=y(x)$、$z=z(x)$，且
$$y'=-\frac{\partial(F,G)}{\partial(x,z)}\Big/\frac{\partial(F,G)}{\partial(y,z)},\qquad
z'=-\frac{\partial(F,G)}{\partial(y,x)}\Big/\frac{\partial(F,G)}{\partial(y,z)}.$$
不必死记分子：把 $F,G$ 对 $x$ 求全导，得到两个线性方程
$$F_y y'+F_z z'=-F_x,\qquad G_y y'+G_z z'=-G_x,$$
再用 Cramer 法则解出 $y',z'$。

例：$y+z=x$、$y-z=x^2$。记 $F=y+z-x$、$G=y-z-x^2$，则
$$\frac{\partial(F,G)}{\partial(y,z)}=\det\begin{pmatrix}1&1\\1&-1\end{pmatrix}=-2\ne0.$$
直接解出 $y=(x+x^2)/2$、$z=(x-x^2)/2$，故 $y'=1/2+x$、$z'=1/2-x$，在 $x=0$ 处都为 $1/2$。

## 条件失效与反例

$F_y(a,b)\ne0$ 是充分条件，不是必要条件。

反例 1：$F(x,y)=x^2-y^2$ 在 $(0,0)$。$F(0,0)=0$，但 $F_y=-2y$ 在原点为 $0$。方程 $x^2=y^2$ 的解是两条直线 $y=\pm x$，在原点附近无法唯一解出 $y$。条件失效，结论也确实不成立。

反例 2：$F(x,y)=y^3-x$ 在 $(0,0)$。$F_y=3y^2$ 在原点为 $0$，条件失效，但方程仍唯一给出 $y=x^{1/3}$。这说明定理只是充分条件；不过 $y=x^{1/3}$ 在 $0$ 处不可导，定理所保证的“连续可导”确实丢失了。

> [!NOTE]
> 定理保证的是局部存在、唯一与连续可导，不保证能写出初等公式，也不保证在整个定义域上唯一。

## 三个常见误解

> [!MYTH] $F_y\ne0$ 是隐函数存在的必要条件。
> 只是充分条件。$y^3-x=0$ 在原点 $F_y=0$，仍有唯一的连续隐函数 $y=x^{1/3}$，只是它在原点不可导。

> [!MYTH] 隐函数定理能给出 $y=\varphi(x)$ 的显式表达式。
> 定理只断言局部存在唯一的可导函数，并给出导数公式。多数方程无法用初等函数解出，定理的价值正在于不必解出也能求导。

> [!MYTH] 对 $F(x,y)=0$ 求导时，把 $y$ 当常数。
> $y$ 是 $x$ 的函数，必须用链式法则：$F_x+F_y y'=0$，故 $y'=-F_x/F_y$。把 $y$ 当常数会直接得到 $F_x=0$，丢掉了整条曲线。

## 练习

> [!PRACTICE] 1 · 圆上求斜率
> $x^2+y^2=1$ 在 $(\sqrt3/2,1/2)$ 处的 $y'$ 是多少？
>
> > [!ANSWER] 看答案
> > $y'=-x/y=-(\sqrt3/2)/(1/2)=-\sqrt3$。这也与切线 $\sqrt3x+y=2$ 的斜率 $-\sqrt3$ 一致。

> [!PRACTICE] 2 · 指数方程
> $e^y+xy=e$ 在 $(0,1)$ 处求 $y'$。
>
> > [!ANSWER] 看答案
> > $F_x=y$，$F_y=e^y+x$，故 $y'=-y/(e^y+x)$。在 $(0,1)$ 处 $y'=-1/e\approx-0.368$。

> [!PRACTICE] 3 · 二阶导
> 对 $x^2+y^2=1$ 求 $y''$，并给出在 $(0,1)$ 的值。
>
> > [!ANSWER] 看答案
> > 由 $y'=-x/y$ 得 $y''=-(y-xy')/y^2=-(y+x^2/y)/y^2=-1/y^3$。在 $(0,1)$ 处 $y''=-1$。

> [!PRACTICE] 4 · 方程组
> 由 $y+z=x$、$y-z=x^2$ 解出 $y(x),z(x)$，并求 $x=0$ 处的 $y',z'$。
>
> > [!ANSWER] 看答案
> > 两式相加得 $2y=x+x^2$，相减得 $2z=x-x^2$，故 $y=(x+x^2)/2$、$z=(x-x^2)/2$，于是 $y'=1/2+x$、$z'=1/2-x$，在 $x=0$ 处都为 $1/2$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $F:U\subset\mathbb{R}^2\to\mathbb{R}$ 在 $(a,b)$ 的邻域内 $C^1$，$F(a,b)=0$，$F_y(a,b)\ne0$。则存在 $a$ 的邻域 $I$ 与唯一 $C^1$ 函数 $\varphi:I\to\mathbb{R}$，使 $\varphi(a)=b$、$F(x,\varphi(x))=0$，且 $\varphi'(x)=-F_x(x,\varphi(x))/F_y(x,\varphi(x))$。方程组情形：若 $F,G$ 在 $(a,b,c)$ 附近 $C^1$，$F=G=0$，且 $\partial(F,G)/\partial(y,z)\ne0$，则存在唯一 $C^1$ 的 $y(x),z(x)$ 满足方程组，其导数由对 $x$ 全微分后解线性方程组得到。
