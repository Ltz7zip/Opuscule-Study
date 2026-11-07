---
slug: "line-integral-1"
subject: "analysis"
unit: "u14"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "第一类曲线积分"
subtitle: "沿着曲线称重，与走向无关"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["lineint"]
prereq: ["multipleint"]
related: ["lineint", "defint"]
---

## 本讲目标

第一类曲线积分把“曲线上的密度”累加起来，得到质量、弧长或平均值。学完这一讲，你能写出它的分割定义，把曲线参数化后正确写出弧长元素 $ds$，并利用对称性把一些积分直接判为零。

## 三行回顾

- 定积分沿一条直线段累加，曲线积分沿一条弯曲的线累加。
- 累加的依据是弧长，不是坐标增量。
- 弧长没有方向，所以第一类曲线积分与曲线的走向无关。

## 弧长与第一类曲线积分

设 $C$ 是平面上一条可求长的曲线，$f$ 在 $C$ 上有界。把 $C$ 从一端到另一端依次分成 $n$ 段小弧，第 $i$ 段弧长记作 $\Delta s_i$，在其上任取一点 $(\xi_i,\eta_i)$，作和

$$\sum_{i=1}^n f(\xi_i,\eta_i)\,\Delta s_i.$$

当最大弧长趋于零时，若和趋于同一个数，就称此数为 $f$ 沿 $C$ 的**第一类曲线积分**，记作

$$\int_C f(x,y)\,ds.$$

当 $f\equiv1$ 时，$\int_C ds$ 就是曲线的弧长。当 $f$ 是线密度时，积分就是曲线的质量。三维情形完全一样，把点写成 $(x,y,z)$，弧长元素记作 $ds$。

## 参数化计算

若曲线由 $C:x=x(t),\ y=y(t)$（$\alpha\le t\le\beta$）给出，且 $x,y$ 有连续导数、$x'^2+y'^2\neq0$，则

$$ds=\sqrt{x'(t)^2+y'(t)^2}\,dt,$$

于是

$$\int_C f\,ds=\int_\alpha^\beta f\big(x(t),y(t)\big)\sqrt{x'(t)^2+y'(t)^2}\,dt.$$

右端是一个普通定积分，下限必须小于上限，不必管曲线朝哪边走。

例：$C$ 是从 $(0,0)$ 到 $(1,1)$ 的直线段，求 $\int_C(x+y)\,ds$。取 $x=t,\ y=t$，$0\le t\le1$，$ds=\sqrt2\,dt$：

$$\int_0^1 2t\cdot\sqrt2\,dt=\sqrt2.$$

例：$C$ 是圆 $x^2+y^2=R^2$，求 $\int_C(x^2+y^2)\,ds$。在圆上 $x^2+y^2=R^2$ 是常数，弧长为 $2\pi R$，所以积分等于 $R^2\cdot2\pi R=2\pi R^3$，不需要参数化。

三维例子：螺旋线 $x=a\cos t,\ y=a\sin t,\ z=bt$，$0\le t\le2\pi$。此时 $ds=\sqrt{a^2+b^2}\,dt$，且

$$\int_C z\,ds=\int_0^{2\pi}bt\sqrt{a^2+b^2}\,dt=2\pi^2b\sqrt{a^2+b^2}.$$

## 性质与对称性

第一类曲线积分是“对弧长的积分”，具有与定积分相同的线性与区域可加性：

- $\int_C(\alpha f+\beta g)\,ds=\alpha\int_C f\,ds+\beta\int_C g\,ds$。
- 若 $C=C_1\cup C_2$ 只在端点相接，则 $\int_C f\,ds=\int_{C_1}f\,ds+\int_{C_2}f\,ds$。
- $\left|\int_C f\,ds\right|\le\int_C|f|\,ds\le M\cdot L$，其中 $M=\max_C|f|$，$L$ 是弧长。

**与方向无关**：把参数从 $\beta$ 走到 $\alpha$，$ds$ 仍是正的弧长微元，积分值不变。这一点与下一讲的第二类曲线积分形成对照。

**对称性**很好用。若 $C$ 关于 $y$ 轴对称，而 $f$ 关于 $x$ 是奇函数（即 $f(-x,y)=-f(x,y)$），则 $\int_C f\,ds=0$。单位圆上 $\int_C x\,ds=0$，而 $\int_C x^2\,ds=\int_C y^2\,ds=\pi$，两者相加得 $\int_C(x^2+y^2)\,ds=2\pi$，与直接算 $1\cdot2\pi$ 一致。

**手算一例。** $C$ 是圆 $x^2+y^2=R^2$ 上从 $(R,0)$ 到 $(0,R)$ 的弧。取 $x=R\cos\theta$、$y=R\sin\theta$，$\theta\in[0,\frac{\pi}{2}]$，$ds=R\,d\theta$：

$$\int_C(x+y)\,ds=R\int_0^{\pi/2}(\cos\theta+\sin\theta)R\,d\theta=2R^2 .$$

**几何意义。** 把 $f$ 看成线密度，积分就是曲线的总质量；$f\equiv1$ 时积分退化为弧长。

**参数化不唯一。** 同一条曲线换成另一种参数方程，结果必须相同。算完之后换个参数再算一遍，是检查误差的免费工具。

**摆线。** $x=a(t-\sin t)$、$y=a(1-\cos t)$，$0\le t\le2\pi$。由 $ds=a\sqrt{(1-\cos t)^2+\sin^2t}\,dt=2a\sin\frac t2\,dt$，一拱的弧长为

$$\int_0^{2\pi}2a\sin\frac t2\,dt=8a .$$

弧长与 $a$ 成正比：$a$ 加倍，弧长加倍。这类比例关系可以先做量纲检查，再动手积分。

曲线积分只用到曲线上的信息，这是它与重积分的根本区别：前者沿一维对象累加，后者在二维或三维区域上累加。

## 三个常见误解

> [!MYTH] 第一类曲线积分要区分正反方向。
> 它按弧长累加，弧长恒为正。把曲线反向走一遍，$ds$ 不变，积分值不变。区分方向的是第二类曲线积分。

> [!MYTH] $ds$ 就是 $dx$ 或 $dy$。
> $ds=\sqrt{x'^2+y'^2}\,dt$，是弧长元素。只有在水平线段上才有 $ds=|dx|$，一般情况下 $ds\ge|dx|$。

> [!MYTH] 换一种参数化会改变积分值。
> 只要参数化是一一到上的 $C^1$ 映射，积分值不变。换参数只是把同一个弧长重新分配，和式极限不变。

## 练习

> [!PRACTICE] 1 · 直线段
> $C$ 从 $(0,0)$ 到 $(1,2)$，求 $\int_C(x+y)\,ds$。
>
> > [!ANSWER] 看答案
> > 取 $x=t,\ y=2t$，$0\le t\le1$，$ds=\sqrt{1+4}\,dt=\sqrt5\,dt$。积分 $=\int_0^1 3t\sqrt5\,dt=\frac{3\sqrt5}{2}$。

> [!PRACTICE] 2 · 圆
> $C$ 是圆 $x^2+y^2=4$，求 $\int_C x^2\,ds$。
>
> > [!ANSWER] 看答案
> > 由对称性 $\int_C x^2\,ds=\int_C y^2\,ds=\frac12\int_C(x^2+y^2)\,ds=\frac12\cdot4\cdot4\pi=8\pi$。也可用 $2\pi R^3=16\pi$ 再取一半。

> [!PRACTICE] 3 · 螺旋线
> 螺旋线 $x=\cos t,\ y=\sin t,\ z=t$，$0\le t\le2\pi$，求 $\int_C z\,ds$。
>
> > [!ANSWER] 看答案
> > $ds=\sqrt{1+1}\,dt=\sqrt2\,dt$，积分 $=\sqrt2\int_0^{2\pi}t\,dt=\sqrt2\cdot2\pi^2=2\sqrt2\pi^2$。

> [!PRACTICE] 4 · 估计
> $C$ 是半径 $R$ 的圆，估计 $\int_C\frac{ds}{1+x^2+y^2}$。
>
> > [!ANSWER] 看答案
> > 在圆上 $x^2+y^2=R^2$，被积函数恒为 $\frac{1}{1+R^2}$，弧长 $2\pi R$，故积分 $=\frac{2\pi R}{1+R^2}$。

> [!FORMAL] 严格表述
> 设 $C$ 是可求长曲线，$f$ 在 $C$ 上有界。对 $C$ 的弧长分割 $0=s_0<s_1<\cdots<s_n=L$，记 $\Delta s_i=s_i-s_{i-1}$，若 $\sum f(\xi_i,\eta_i)\Delta s_i$ 在最大 $\Delta s_i\to0$ 时对一切取点收敛到 $I$，则记 $I=\int_C f\,ds$。若 $C$ 由 $C^1$ 参数化 $r(t)$（$\alpha\le t\le\beta$）给出且 $|r'(t)|\neq0$，则 $\int_C f\,ds=\int_\alpha^\beta f(r(t))|r'(t)|\,dt$，该值与参数化的选取无关。
