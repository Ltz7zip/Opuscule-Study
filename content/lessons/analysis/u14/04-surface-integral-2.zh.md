---
slug: "surface-integral-2"
subject: "analysis"
unit: "u14"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "第二类曲面积分与 Gauss、Stokes 公式"
subtitle: "穿过曲面的流量，绕着边界的环量"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["lineint", "field"]
prereq: ["lineint"]
related: ["field", "lineint"]
---

## 本讲目标

第二类曲面积分算的是流体穿过曲面的流量，它依赖曲面的侧。学完这一讲，你能写出通量的两种形式，判断闭曲面的外侧，用 Gauss 公式把通量换成三重积分，用 Stokes 公式把空间环量换成旋度的通量。

## 三行回顾

- 第一类曲面积分按面积累加，不分侧；第二类按有向面积累加，换侧变号。
- 通量衡量“穿过”曲面的多少，散度衡量“从一点冒出”的多少。
- 环量衡量沿边界的旋转，旋度衡量每一点的局部旋转。

## 有向曲面与通量

给曲面 $\Sigma$ 选一侧，即选定单位法向量 $\mathbf n=(\cos\alpha,\cos\beta,\cos\gamma)$，它随点连续变化。第二类曲面积分定义为

$$\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iint_\Sigma(P\cos\alpha+Q\cos\beta+R\cos\gamma)\,dS.$$

右端是第一类曲面积分，所以计算时可以先算 $dS$ 再投影。若 $\Sigma$ 由 $z=z(x,y)$ 给出并取上侧，则

$$dx\,dy=\cos\gamma\,dS,\qquad \cos\gamma=\frac{1}{\sqrt{1+z_x^2+z_y^2}},$$

于是 $R\,dx\,dy$ 这一项化作 $\iint_D R(x,y,z(x,y))\,dx\,dy$。

**换侧变号**：$\iint_{-\Sigma}=-\iint_\Sigma$。闭曲面默认取外侧。

## Gauss 公式

设 $\Omega$ 是由分片光滑闭曲面 $\partial\Omega$ 围成的有界闭区域，$P,Q,R$ 在 $\Omega$ 上有连续偏导数，$\partial\Omega$ 取外侧，则

$$\oiint_{\partial\Omega}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV.$$

右端的被积函数是散度 $\nabla\cdot\mathbf F$。

例：$\mathbf F=(x,y,z)$，$\Sigma$ 为球面 $x^2+y^2+z^2=R^2$ 的外侧。散度为 $3$，故通量 $=3\cdot\frac{4\pi R^3}{3}=4\pi R^3$。直接算也不难：$\mathbf F\cdot\mathbf n=R$ 在球面上为常数，通量 $=R\cdot4\pi R^2=4\pi R^3$，两者一致。

例：$\mathbf F=(x^2,y^2,z^2)$，$\Omega=[0,1]^3$。散度 $=2x+2y+2z$，逐项积分各得 $1$，故总通量 $=3$。

**物理解释。** $\nabla\cdot\mathbf F$ 是单位体积内“源”的强度，Gauss 公式说区域内的总源等于穿过边界的净流量。若 $\nabla\cdot\mathbf F=0$，则流出任何闭曲面的净通量为零——不可压缩流体的速度场就是如此。

## Stokes 公式

设 $\Sigma$ 是光滑有向曲面，其边界 $\Gamma=\partial\Sigma$ 为分段光滑闭曲线，$\Gamma$ 的方向与 $\Sigma$ 的法向量按右手法则相容，则

$$\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma\left(\nabla\times\mathbf F\right)\cdot\mathbf n\,dS.$$

旋度为

$$\nabla\times\mathbf F=\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right).$$

例：$\mathbf F=(y,z,x)$，$\Gamma$ 为 $z=0$ 平面上的单位圆，从 $+z$ 方向看逆时针，$\Sigma$ 取圆盘、法向量 $\mathbf k$。则

$$\nabla\times\mathbf F=(-1,-1,-1),$$

通量 $=(-1)\cdot\pi=-\pi$。直接验证：在 $z=0$ 上 $dz=0$，$\oint y\,dx$ 沿逆时针单位圆等于 $-\pi$，一致。

## 三个公式其实是一件事

- **Green 公式**是 Stokes 公式在平面上的特例：取 $\mathbf F=(P,Q,0)$，旋度的 $z$ 分量为 $Q_x-P_y$。
- **Gauss 公式**把闭曲面上的通量换成散度的体积分，是“边界—内部”关系在三维的版本。
- **微积分基本定理**是一维版本：区间端点上的取值差等于导数的积分。

三个公式统一成一句话：**边界上的积分等于内部某个导数的积分**。区别只在维数和导数的形式。

## 三个常见误解

> [!MYTH] 通量与曲面的侧无关。
> 换侧时法向量反向，通量变号。只有第一类曲面积分才与侧无关。

> [!MYTH] Gauss 公式对任何曲面都成立。
> 曲面必须是闭曲面，且围成有界区域；$P,Q,R$ 要在整个区域上有连续偏导数。开曲面要先补面再用。

> [!MYTH] 旋度为零就能推出场是保守场。
> 还需要区域没有“洞”。在去掉 $z$ 轴的区域内，绕 $z$ 轴的涡场旋度为零，但绕一圈的环量不为零。

## 练习

> [!PRACTICE] 1 · Gauss
> $\mathbf F=(x,y,z)$，$\Sigma$ 为球面 $x^2+y^2+z^2=R^2$ 的外侧，求通量。
>
> > [!ANSWER] 看答案
> > 散度为 $3$，球体积 $\frac{4\pi R^3}{3}$，通量 $=4\pi R^3$。

> [!PRACTICE] 2 · 散度积分
> $\mathbf F=(x^3,y^3,z^3)$，$\Sigma$ 为单位球面外侧，求通量。
>
> > [!ANSWER] 看答案
> > 散度 $=3(x^2+y^2+z^2)=3r^2$。$\iiint r^2\,dV=\int_0^{2\pi}\int_0^\pi\int_0^1\rho^4\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac{4\pi}{5}$，故通量 $=\frac{12\pi}{5}$。

> [!PRACTICE] 3 · Stokes
> $\mathbf F=(-y,x,z)$，$\Gamma$ 为 $z=0$ 平面上单位圆逆时针，求环量。
>
> > [!ANSWER] 看答案
> > $\nabla\times\mathbf F=(0,0,2)$，圆盘法向量 $\mathbf k$，通量 $=2\cdot\pi=2\pi$。直接算：$\oint(-y\,dx+x\,dy)=\int_0^{2\pi}dt=2\pi$，一致。

> [!PRACTICE] 4 · 补面
> 求 $\mathbf F=(0,0,z)$ 穿过上半球面 $z=\sqrt{1-x^2-y^2}$ 上侧的通量。
>
> > [!ANSWER] 看答案
> > 补上底面圆盘取外侧，闭曲面内散度为 $1$，总体积 $\frac{2\pi}{3}$。底面法向量 $-\mathbf k$，$\mathbf F\cdot\mathbf n=-z=0$，底面通量为 $0$。故上半球面通量 $=\frac{2\pi}{3}$。

> [!FORMAL] 严格表述
> 设 $\Omega$ 为有界闭区域，$\partial\Omega$ 为分片光滑闭曲面取外侧，$P,Q,R\in C^1(\Omega)$。则 $\oiint_{\partial\Omega}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$。设 $\Sigma$ 为光滑有向曲面，边界 $\Gamma$ 分段光滑并与法向按右手法则定向，$P,Q,R\in C^1$，则 $\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(R_y-Q_z)\,dy\,dz+(P_z-R_x)\,dz\,dx+(Q_x-P_y)\,dx\,dy$。
