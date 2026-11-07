---
slug: "chain-multi"
subject: "analysis"
unit: "u12"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "复合求导与方向导数"
subtitle: "沿着任意方向，问变化有多快"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["partial"]
prereq: ["partial"]
related: ["partial", "field"]
---

## 本讲目标

学完这一讲，你能用链式法则对复合函数求偏导，计算沿任意单位方向的方向导数，并说出梯度为什么指向函数上升最快的方向。

链式法则把“中间变量”这条路径上的贡献逐项相加；方向导数则把偏导从坐标轴推广到任意方向。两者合起来，就是梯度登场的地方。

## 三行回顾

- 复合函数的偏导，等于各条中间路径贡献之和。
- 方向导数沿单位向量 $l$ 测量变化率；可微时它等于 $\nabla f\cdot l$。
- 梯度的方向是上升最快的方向，模长是最大变化率。

## 链式法则与 Jacobi 矩阵

设 $z=f(u,v)$，$u=u(x,y)$，$v=v(x,y)$，且 $f,u,v$ 有连续偏导。则
$$\frac{\partial z}{\partial x}=f_u\frac{\partial u}{\partial x}+f_v\frac{\partial v}{\partial x},\qquad
\frac{\partial z}{\partial y}=f_u\frac{\partial u}{\partial y}+f_v\frac{\partial v}{\partial y}.$$
矩阵写法更清楚：
$$\begin{pmatrix}\dfrac{\partial z}{\partial x}&\dfrac{\partial z}{\partial y}\end{pmatrix}
=\begin{pmatrix}f_u&f_v\end{pmatrix}
\begin{pmatrix}u_x&u_y\\v_x&v_y\end{pmatrix}.$$
最右边是 $(u,v)$ 对 $(x,y)$ 的 Jacobi 矩阵，链式法则就是 Jacobi 矩阵相乘。

对多条路径要全部相加。若 $w=f(x,y,z)$，$x=x(t)$、$y=y(t)$、$z=z(t)$，则
$$\frac{\mathrm dw}{\mathrm dt}=f_x x'(t)+f_y y'(t)+f_z z'(t).$$
漏掉任何一项，等于漏掉一条通往 $t$ 的路径。连续偏导这个条件不能省：只假设偏导存在时，链式法则可能失效；定理的标准形式要求外层可微、内层可微，做题时应先确认条件再代公式，多项式与初等函数通常自动满足；否则公式可能不成立。

## 手算复合函数

取 $z=u^2v$，$u=x+y$，$v=xy$。则
$$z_x=2uv\cdot1+u^2\cdot y=2(x+y)xy+(x+y)^2y.$$
在 $(1,1)$ 处，$u=2$、$v=1$，得 $z_x=2\cdot2\cdot1+4\cdot1=8$。直接代入 $z=xy(x+y)^2$ 验证：
$$z_x=y(x+y)^2+2xy(x+y),$$
在 $(1,1)$ 为 $4+4=8$，一致。

再看极坐标 $x=r\cos\theta$、$y=r\sin\theta$，$z=f(x,y)$。链式法则给出
$$\frac{\partial z}{\partial r}=f_x\cos\theta+f_y\sin\theta,\qquad
\frac{\partial z}{\partial\theta}=-f_xr\sin\theta+f_y r\cos\theta.$$
这正是“把梯度投影到径向与角向”的坐标形式。

## 方向导数

设 $l=(l_1,l_2)$ 是单位向量，$\|l\|=1$。$f$ 在 $a$ 沿 $l$ 的**方向导数**是
$$D_lf(a)=\lim_{t\to0}\frac{f(a+tl)-f(a)}{t}.$$
若 $f$ 在 $a$ 可微，则
$$D_lf(a)=\nabla f(a)\cdot l=f_x(a)l_1+f_y(a)l_2.$$
例：$f(x,y)=x^2+xy$，$\nabla f=(2x+y,x)$。在 $(1,2)$ 处 $\nabla f=(4,1)$。取 $l=(3/5,4/5)$，则
$$D_lf=(4,1)\cdot(3/5,4/5)=\frac{12+4}{5}=\frac{16}{5}.$$
取 $l=(-1,0)$，得 $D_lf=-4$，说明沿负 $x$ 方向函数下降。

方向导数存在并不要求可微。$g(x,y)=\frac{x^2y}{x^2+y^2}$（原点补 $0$）沿 $l=(\cos\theta,\sin\theta)$：
$$D_lg(0)=\lim_{t\to0}\frac{g(t\cos\theta,t\sin\theta)}{t}=\cos^2\theta\sin\theta.$$
每个方向都存在，但前面已经算过 $g$ 在原点不可微。因此不能把“方向导数都存在”当作可微的判据。

## 梯度：最速上升与等值线

由 Cauchy–Schwarz，
$$|D_lf|=|\nabla f\cdot l|\le\|\nabla f\|\,\|l\|=\|\nabla f\|,$$
等号当且仅当 $l$ 与 $\nabla f$ 同向。因此，当 $\nabla f(a)\ne0$ 时，上升最快的方向是 $\nabla f(a)/\|\nabla f(a)\|$，最大变化率为 $\|\nabla f(a)\|$；下降最快的方向是 $-\nabla f(a)/\|\nabla f(a)\|$；与 $\nabla f(a)$ 垂直的方向变化率为 $0$。

例：$f(x,y)=x^2+xy$ 在 $(1,2)$ 处 $\|\nabla f\|=\sqrt{17}\approx4.12$，最速上升方向为 $(4,1)/\sqrt{17}$。

等值线 $f(x,y)=c$ 上，若 $\gamma(t)$ 沿曲线运动，则
$$\frac{\mathrm d}{\mathrm dt}f(\gamma(t))=\nabla f(\gamma(t))\cdot\gamma'(t)=0,$$
故梯度垂直于等值线的切向，即垂直于等值线。$f=x^2+y^2$ 的等值线是圆，梯度 $(2x,2y)$ 沿半径向外，正好垂直。

> [!NOTE]
> “梯度垂直于等值线”和“$D_lf=\nabla f\cdot l$”都以可微为前提；只存在偏导时，这些几何结论可能失效。

## 三个常见误解

> [!MYTH] 所有方向的方向导数都存在，函数就可微。
> $g(x,y)=\frac{x^2y}{x^2+y^2}$ 在原点沿每个单位方向都有 $D_lg=\cos^2\theta\sin\theta$，却不可微。方向导数逐条检查，仍然只是“一维切片”。

> [!MYTH] 任意方向的导数都等于梯度在该方向的投影。
> 这条公式需要 $f$ 可微。只有偏导或只有方向导数时，投影公式不一定成立；上一条反例中梯度根本不存在。

> [!MYTH] 链式法则就是把偏导相乘。
> 必须沿所有中间路径求和。$z=f(u,v)$ 对 $x$ 求导要写 $f_u u_x+f_v v_x$，只写 $f_u u_x$ 就漏掉了 $v$ 这条路径。

## 练习

> [!PRACTICE] 1 · 链式法则
> $z=u^2+v^2$，$u=x+y$，$v=x-y$，求 $z_x$ 与 $z_y$。
>
> > [!ANSWER] 看答案
> > $z_x=2u\cdot1+2v\cdot1=2(x+y)+2(x-y)=4x$；$z_y=2u\cdot1+2v\cdot(-1)=2(x+y)-2(x-y)=4y$。直接代入 $z=2x^2+2y^2$ 也得到同样结果。

> [!PRACTICE] 2 · 方向导数
> $f(x,y)=x^2y$，求在 $(1,2)$ 沿 $l=(1/\sqrt2,1/\sqrt2)$ 的方向导数。
>
> > [!ANSWER] 看答案
> > $\nabla f=(2xy,x^2)$，在 $(1,2)$ 为 $(4,1)$。$D_lf=(4+1)/\sqrt2=5/\sqrt2\approx3.54$。

> [!PRACTICE] 3 · 最速上升
> $f(x,y)=x^2+y^2-2x$，在 $(2,1)$ 处沿哪个方向上升最快？最大变化率是多少？
>
> > [!ANSWER] 看答案
> > $\nabla f=(2x-2,2y)$，在 $(2,1)$ 为 $(2,2)$。最速上升方向为 $(1,1)/\sqrt2$，最大变化率 $\|\nabla f\|=2\sqrt2\approx2.83$。

> [!PRACTICE] 4 · 多变量链式
> $w=x^2+y^2+z^2$，$x=t$，$y=t^2$，$z=t^3$，求 $\mathrm dw/\mathrm dt$。
>
> > [!ANSWER] 看答案
> > $\mathrm dw/\mathrm dt=2x\cdot1+2y\cdot2t+2z\cdot3t^2=2t+4t^3+6t^5$。直接代入 $w=t^2+t^4+t^6$ 求导也得 $2t+4t^3+6t^5$。

## 严格表述

> [!FORMAL] 严格表述
> 若 $f(u,v)$ 在 $(u_0,v_0)$ 可微，$u(x,y)$、$v(x,y)$ 在 $(x_0,y_0)$ 可微，且 $(u_0,v_0)=(u(x_0,y_0),v(x_0,y_0))$，则 $z=f(u,v)$ 在 $(x_0,y_0)$ 可微，且 $z_x=f_u u_x+f_v v_x$、$z_y=f_u u_y+f_v v_y$。若 $f$ 在 $a$ 可微，则对单位向量 $l$，$D_lf(a)=\nabla f(a)\cdot l$，从而 $|D_lf(a)|\le\|\nabla f(a)\|$，等号当且仅当 $l$ 与 $\nabla f(a)$ 同向。
