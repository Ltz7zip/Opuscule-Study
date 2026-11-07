---
slug: "multiple-change"
subject: "analysis"
unit: "u13"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "重积分的换元"
subtitle: "Jacobi 行列式就是局部的面积放大率"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "partial"]
---

## 本讲目标

换元解决的问题是：区域是圆、椭圆或由曲面围成时，直接在 $x,y$ 下写积分限很痛苦。学完这一讲，你能写出一般的二重换元公式，说明 Jacobi 行列式为什么出现，熟练使用极坐标，并用换元算出椭圆面积与 Gauss 积分。

## 三行回顾

- 一元换元里，$dx=x'(t)\,dt$，导数负责把长度放大或缩小。
- 二元换元把 $(u,v)$ 平面的一小块映到 $(x,y)$ 平面，面积也有一个放大率。
- 这个放大率就是 Jacobi 行列式的绝对值。

## 换元公式与 Jacobi 行列式

设变换

$$x=x(u,v),\qquad y=y(u,v)$$

在 $(u,v)$ 平面的区域 $D'$ 上有连续偏导数，把 $D'$ 一一映到 $D$（至多除去面积为零的集合），且 Jacobi 行列式

$$J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u & x_v\\ y_u & y_v\end{vmatrix}$$

在 $D'$ 内不为零。若 $f$ 在 $D$ 上连续，则

$$\iint_D f(x,y)\,dx\,dy=\iint_{D'}f\big(x(u,v),y(u,v)\big)\,|J|\,du\,dv.$$

$|J|$ 的几何含义：$D'$ 中一个边长 $du,dv$ 的小矩形，被映射成 $D$ 中一个平行四边形，其两条边是 $\mathbf{r}_u\,du$ 与 $\mathbf{r}_v\,dv$，面积等于 $|J|\,du\,dv$。所以换元不是形式技巧，而是把“小块面积”逐块换算。

先看线性变换 $x=2u+v,\ y=u+3v$。$J=2\cdot3-1\cdot1=5$。$uv$ 平面上单位正方形面积 $1$，映过去是一个面积为 $5$ 的平行四边形，与 $|J|$ 一致。

## 极坐标

$$x=r\cos\theta,\qquad y=r\sin\theta,\qquad J=\begin{vmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{vmatrix}=r.$$

于是 $dx\,dy=r\,dr\,d\theta$。这个 $r$ 不是可有可无的因子：离原点越远，同样的 $dr\,d\theta$ 对应的实际面积越大。

例：求单位圆盘上 $\iint_D\sqrt{x^2+y^2}\,d\sigma$。被积函数就是 $r$，区域是 $0\le r\le1$，$0\le\theta\le2\pi$：

$$\int_0^{2\pi}\int_0^1 r\cdot r\,dr\,d\theta=2\pi\cdot\frac13=\frac{2\pi}{3}.$$

如果漏掉 Jacobi 因子 $r$，会错误地得到 $2\pi\cdot\frac12=\pi$。差别就在这一个 $r$。

## 椭圆面积与 Gauss 积分

**椭圆面积。** $D:\frac{x^2}{a^2}+\frac{y^2}{b^2}\le1$。令 $x=ar\cos\theta$，$y=br\sin\theta$，则 $r\in[0,1]$，$\theta\in[0,2\pi]$，且

$$J=\begin{vmatrix}a\cos\theta & -ar\sin\theta\\ b\sin\theta & br\cos\theta\end{vmatrix}=abr.$$

面积 $=\int_0^{2\pi}\int_0^1 abr\,dr\,d\theta=2\pi\cdot\frac{ab}{2}=\pi ab$。$a=b=R$ 时回到 $\pi R^2$。

**Gauss 积分。** 令 $I=\int_{-\infty}^{\infty}e^{-x^2}dx$。则

$$I^2=\iint_{\mathbb{R}^2}e^{-(x^2+y^2)}dx\,dy=\int_0^{2\pi}\int_0^{\infty}e^{-r^2}r\,dr\,d\theta=2\pi\cdot\frac12=\pi.$$

故 $I=\sqrt\pi$。有限圆盘上的版本同样干净：$\iint_{x^2+y^2\le R^2}e^{-(x^2+y^2)}d\sigma=\pi(1-e^{-R^2})$，令 $R\to\infty$ 得 $\pi$。

## 换元的检查清单

写换元之前，按顺序检查四件事：

- **对应**：变换在区域内部是否一一对应？重叠或漏掉的部分面积是否为零？
- **光滑**：偏导数是否连续？$J$ 是否在内部不为零？$J=0$ 的点通常对应退化，要单独看。
- **区域**：新的积分限是否描述的是同一个区域？把边界逐条翻译，别只翻译被积函数。
- **绝对值**：二重换元用 $|J|$。一维换元允许带符号，二维面积不能为负。

一个常见的坑是只换被积函数、不换区域。例如把圆盘写成 $0\le r\le1$、$0\le\theta\le\pi$，那只是上半圆，积分值少一半。

**一个正例。** $D:\ x^2+y^2\le2x$ 是半径 $1$、圆心 $(1,0)$ 的圆盘。极坐标下边界为 $r=2\cos\theta$，由 $r\ge0$ 得 $-\frac{\pi}{2}\le\theta\le\frac{\pi}{2}$，于是

$$\int_{-\pi/2}^{\pi/2}\frac{(2\cos\theta)^2}{2}d\theta=2\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta=\pi .$$

角度范围由不等式 $2\cos\theta\ge0$ 决定，不是想当然的 $0$ 到 $2\pi$；这一步错了，面积会算成零。

## 三个常见误解

> [!MYTH] 极坐标下 $dx\,dy=dr\,d\theta$。
> 少了因子 $r$。正确的面积元素是 $r\,dr\,d\theta$，它正是极坐标变换的 Jacobi 行列式。

> [!MYTH] Jacobi 行列式可以为负，所以直接用它。
> 二重积分换元取 $|J|$。$J$ 的符号只说明映射改变了定向，面积本身非负。

> [!MYTH] 换元只要改被积函数。
> 区域、面积元素、被积函数三者都要换。只改其中一项，算的是另一个积分。

## 练习

> [!PRACTICE] 1 · 线性换元
> 令 $u=x+y$，$v=x-y$。求 $\frac{\partial(x,y)}{\partial(u,v)}$，并求正方形 $0\le u,v\le1$ 在 $xy$ 平面中的像的面积。
>
> > [!ANSWER] 看答案
> > 由 $x=(u+v)/2$，$y=(u-v)/2$，得 $J=\frac{\partial(x,y)}{\partial(u,v)}=-\frac12$，故 $|J|=\frac12$。像的面积为 $1\cdot\frac12=\frac12$。

> [!PRACTICE] 2 · 极坐标
> 求 $\iint_D x^2\,d\sigma$，$D$ 为单位圆盘。
>
> > [!ANSWER] 看答案
> > $\int_0^{2\pi}\int_0^1 r^2\cos^2\theta\cdot r\,dr\,d\theta=\frac14\cdot\pi=\frac{\pi}{4}$。由对称性，$x^2$ 与 $y^2$ 的积分相等，各占 $\frac{\pi}{2}$ 的一半。

> [!PRACTICE] 3 · 椭圆
> 求椭圆 $\frac{x^2}{4}+y^2\le1$ 的面积，并用换元计算 $\iint_D y^2\,d\sigma$。
>
> > [!ANSWER] 看答案
> > 面积 $=\pi\cdot2\cdot1=2\pi$。令 $x=2r\cos\theta$，$y=r\sin\theta$，$|J|=2r$，则 $\int_0^{2\pi}\int_0^1 r^2\sin^2\theta\cdot2r\,dr\,d\theta=2\cdot\frac14\cdot\pi=\frac{\pi}{2}$。

> [!PRACTICE] 4 · 检查
> 有人把单位圆盘上的积分写成 $\int_0^1dr\int_0^{2\pi}f(r\cos\theta,r\sin\theta)\,d\theta$，错在哪？
>
> > [!ANSWER] 看答案
> > 漏了面积元素中的 $r$，应为 $\int_0^1 r\,dr\int_0^{2\pi}f\,d\theta$。此外顺序虽可交换，但 $r$ 必须保留。

> [!FORMAL] 严格表述
> 设 $D'\subset\mathbb{R}^2$ 为有界闭区域，$\Phi(u,v)=(x(u,v),y(u,v))$ 在 $D'$ 上有连续偏导数且在内部一对一，$J=\partial(x,y)/\partial(u,v)$ 在内部非零，$D=\Phi(D')$。若 $f$ 在 $D$ 上连续，则 $\iint_D f(x,y)\,dx\,dy=\iint_{D'}f(\Phi(u,v))\,|J(u,v)|\,du\,dv$。证明思路：在每点用线性化 $\Phi(u+\Delta u,v+\Delta v)\approx\Phi(u,v)+J\cdot(\Delta u,\Delta v)$，局部面积放大率为 $|J|$，再用分割与控制收敛拼接。
