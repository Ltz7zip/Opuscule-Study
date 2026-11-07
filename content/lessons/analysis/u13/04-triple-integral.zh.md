---
slug: "triple-integral"
subject: "analysis"
unit: "u13"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "三重积分与柱面、球面坐标"
subtitle: "体积元素选对了，积分就成功了一半"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint"]
---

## 本讲目标

三重积分把“面积乘高”换成“体积乘密度”。学完这一讲，你能写出三重积分的分割定义，用投影法和截面法把三重积分化成一次加二重，并在柱面坐标与球面坐标下写出正确的体积元素，算出球、锥等常见立体的体积。

## 三行回顾

- 二重积分切的是平面区域，三重积分切的是空间立体。
- 每一小块贡献“体积 $\Delta V_i$ 乘以该点的函数值”。
- 坐标选得好，边界变成常数，体积元素也只多一个简单因子。

## 三重积分：分割与体积

设 $\Omega\subset\mathbb{R}^3$ 是有界闭区域，体积记作 $V(\Omega)$。把 $\Omega$ 分成 $n$ 小块 $\Delta V_i$，在每块取点 $(\xi_i,\eta_i,\zeta_i)$，作和

$$\sum_{i=1}^n f(\xi_i,\eta_i,\zeta_i)\,\Delta V_i.$$

当最大直径趋于零、且这个和对一切分割与取点都趋于同一个数 $I$ 时，称 $f$ 在 $\Omega$ 上可积，记

$$\iiint_\Omega f\,dV=\iiint_\Omega f(x,y,z)\,dx\,dy\,dz=I.$$

与二重积分完全平行：连续函数在闭立体上可积；有界且间断点集体积为零时也可积。取 $f\equiv1$ 就得到体积 $V(\Omega)=\iiint_\Omega dV$。这说明三重积分首先是“带权体积”。

## 投影法与截面法

**投影法**（先一后二）：若

$$\Omega=\{(x,y,z):(x,y)\in D,\ z_1(x,y)\le z\le z_2(x,y)\},$$

则

$$\iiint_\Omega f\,dV=\iint_D\left(\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)\,dz\right)dx\,dy.$$

先沿一条竖线把 $z$ 积掉，再在投影 $D$ 上做二重积分。

**截面法**（先二后一）：若 $c\le z\le d$，且水平截面 $\Omega_z=\{(x,y):(x,y,z)\in\Omega\}$，则

$$\iiint_\Omega f\,dV=\int_c^d\left(\iint_{\Omega_z}f(x,y,z)\,dx\,dy\right)dz.$$

当截面形状简单（圆、椭圆）而竖线边界复杂时，截面法更省事。

## 柱面坐标

$$x=r\cos\theta,\qquad y=r\sin\theta,\qquad z=z.$$

这个变换的 Jacobi 行列式是 $r$，所以

$$dV=r\,dr\,d\theta\,dz.$$

例：$\Omega$ 为圆柱 $x^2+y^2\le1$，$0\le z\le1$，求 $\iiint_\Omega z\,dV$。

$$\int_0^{2\pi}\int_0^1\int_0^1 z\cdot r\,dz\,dr\,d\theta=2\pi\cdot\frac12\cdot\frac12=\frac{\pi}{2}.$$

柱面坐标适合“绕 $z$ 轴旋转对称、上下由 $z$ 的图形给出”的立体。判断信号：方程里出现 $x^2+y^2$，而 $z$ 单独出现。

**锥体。** $z=\sqrt{x^2+y^2}$ 与平面 $z=H$ 围成的锥：$\theta\in[0,2\pi]$，$0\le z\le H$，$0\le r\le z$，故

$$\iiint_\Omega dV=\int_0^{2\pi}d\theta\int_0^Hdz\int_0^z r\,dr=2\pi\cdot\frac{H^3}{6}=\frac{\pi H^3}{3}.$$

若把 $r$ 的上限误写成常数 $H$，算出的就是圆柱体积 $\pi H^3$，正好大三倍。体积比对是检查上下限最快的办法。

## 球面坐标

$$x=\rho\sin\varphi\cos\theta,\qquad y=\rho\sin\varphi\sin\theta,\qquad z=\rho\cos\varphi,$$

其中 $\rho\ge0$，$\varphi\in[0,\pi]$ 是与正 $z$ 轴的夹角，$\theta\in[0,2\pi]$。Jacobi 行列式为 $\rho^2\sin\varphi$，故

$$dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta.$$

**球体积。** $0\le\rho\le R$，$0\le\varphi\le\pi$，$0\le\theta\le2\pi$：

$$V=\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=2\pi\cdot2\cdot\frac{R^3}{3}=\frac{4\pi R^3}{3}.$$

**球与锥之交。** $\rho\le R$ 且 $\varphi\le\frac{\pi}{4}$（顶角内的“冰淇淋”）：

$$V=\int_0^{2\pi}\int_0^{\pi/4}\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=2\pi\cdot\frac{R^3}{3}\left(1-\frac{\sqrt2}{2}\right).$$

注意 $\varphi$ 从 $0$ 到 $\pi$，不是 $0$ 到 $2\pi$；把 $\varphi$ 当成经度是最常见的错误。

**椭球体积。** 作伸缩 $x=a\rho\sin\varphi\cos\theta$、$y=b\rho\sin\varphi\sin\theta$、$z=c\rho\cos\varphi$，Jacobi 行列式多出因子 $abc$，故 $V=\frac{4\pi abc}{3}$；取 $a=b=c=R$ 就退回球体积。

**球壳。** $R_1\le\rho\le R_2$ 的体积是 $\frac{4\pi}{3}(R_2^3-R_1^3)$：只需改 $\rho$ 的积分限，$dV$ 的表达式照抄。

**只依赖 $\rho$ 的被积函数。** 三个变量可以直接分离。例如

$$\iiint_{\rho\le R}z^2\,dV=\left(\int_0^R\rho^4d\rho\right)\left(\int_0^\pi\cos^2\varphi\sin\varphi\,d\varphi\right)\left(\int_0^{2\pi}d\theta\right)=\frac{R^5}{5}\cdot\frac23\cdot2\pi=\frac{4\pi R^5}{15}.$$

选坐标只看对称轴：区域绕 $z$ 轴旋转对称时，比较边界方程在柱面坐标与球面坐标下哪个是常数，哪个就更好用。做题顺序也要固定：先写 $dV$，再定积分限，最后算；顺序颠倒时最容易漏掉 $r$ 或 $\rho^2\sin\varphi$。算完把结果与几何直觉比一比：锥、柱、球的体积都应当与 $R^3$ 同量级，差出一个数量级就说明积分限写错了。

## 三个常见误解

> [!MYTH] 柱面坐标下 $dV=dr\,d\theta\,dz$。
> 少了 $r$。$x=r\cos\theta$、$y=r\sin\theta$ 的 Jacobi 行列式就是 $r$，面积元素为 $r\,dr\,d\theta$，再乘 $dz$。

> [!MYTH] 球面坐标的 $\varphi$ 是纬度。
> $\varphi$ 是从正 $z$ 轴量起的极角，范围 $[0,\pi]$；纬度从赤道量起，范围 $[-\pi/2,\pi/2]$。两者相差 $\pi/2$，体积元素也不同。

> [!MYTH] 三重积分必须先对 $z$ 积分。
> 积分次序由区域描述决定。投影法是先 $z$ 后二重，截面法是先二重后 $z$，两种都合法，选好算的那个。

## 练习

> [!PRACTICE] 1 · 柱面坐标
> $\Omega$ 为 $x^2+y^2\le1$，$0\le z\le1$，求 $\iiint_\Omega z\,dV$。
>
> > [!ANSWER] 看答案
> > $\int_0^{2\pi}\int_0^1\int_0^1 zr\,dz\,dr\,d\theta=2\pi\cdot\frac12\cdot\frac12=\frac{\pi}{2}$。

> [!PRACTICE] 2 · 球面坐标
> 求上半球 $x^2+y^2+z^2\le R^2$，$z\ge0$ 的体积。
>
> > [!ANSWER] 看答案
> > $\varphi\in[0,\pi/2]$，故 $V=\int_0^{2\pi}\int_0^{\pi/2}\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac{2\pi R^3}{3}$，正好是整个球的一半。

> [!PRACTICE] 3 · 一个对称积分
> 求 $\iiint_\Omega z^2\,dV$，$\Omega$ 为单位球 $x^2+y^2+z^2\le1$。
>
> > [!ANSWER] 看答案
> > 用球面坐标，$z^2=\rho^2\cos^2\varphi$：$\int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cos^2\varphi\cdot\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac15\cdot2\pi\cdot\frac23=\frac{4\pi}{15}$。

> [!PRACTICE] 4 · 只列式
> 圆锥 $\Omega$：$z^2=x^2+y^2$，$0\le z\le1$。用柱面坐标写出体积并计算。
>
> > [!ANSWER] 看答案
> > $0\le r\le z\le1$，故 $V=\int_0^{2\pi}\int_0^1\int_0^z r\,dr\,dz\,d\theta=2\pi\cdot\int_0^1\frac{z^2}{2}dz=\frac{\pi}{3}$。

> [!FORMAL] 严格表述
> 设 $\Omega\subset\mathbb{R}^3$ 为有界闭区域，$f$ 有界。$f$ 在 $\Omega$ 上可积是指存在 $I$，使对任意 $\varepsilon>0$ 有 $\delta>0$，当分割的最大直径小于 $\delta$ 时，$\left|\sum f(\xi_i,\eta_i,\zeta_i)\Delta V_i-I\right|<\varepsilon$ 对一切取点成立。若 $\Omega=\{(x,y,z):(x,y)\in D,\ z_1(x,y)\le z\le z_2(x,y)\}$ 且 $f$ 连续，则三重积分等于 $\iint_D dx\,dy\int_{z_1}^{z_2}f\,dz$。柱面、球面坐标分别取 $dV=r\,dr\,d\theta\,dz$ 与 $dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$。
