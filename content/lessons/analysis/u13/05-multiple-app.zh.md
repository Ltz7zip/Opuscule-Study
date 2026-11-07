---
slug: "multiple-app"
subject: "analysis"
unit: "u13"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "重积分的应用"
subtitle: "面积、质心、转动惯量，都是同一个积分换了被积函数"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "lineint"]
---

## 本讲目标

重积分的应用不需要新理论，只需要把几何量或物理量写成“密度乘微元”的积分。学完这一讲，你能用二重积分算曲面面积，用密度积分算质量、质心与转动惯量，并判断一个量该用一重、二重还是三重积分。

## 三行回顾

- 积分是“微元求和”：先写出一小块的贡献，再让它铺满整个区域。
- 面积微元是 $d\sigma$，体积微元是 $dV$，曲面面积微元是 $dS$。
- 质量、质心、转动惯量的区别只在被积函数，区域和积分本身不变。

## 面积、体积与曲面面积

平面区域面积：$A=\iint_D d\sigma$。曲顶柱体体积：若顶面为 $z=f(x,y)\ge0$，则 $V=\iint_D f\,d\sigma$。

曲面面积需要一个换算。若曲面由 $z=z(x,y)$ 给出，$(x,y)\in D$，则

$$S=\iint_D\sqrt{1+z_x^2+z_y^2}\,dx\,dy.$$

推导要点：曲面上一小块在 $xy$ 平面的投影面积为 $dx\,dy$，而曲面法向量与 $z$ 轴夹角的余弦为 $1/\sqrt{1+z_x^2+z_y^2}$，所以 $dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$。

**球面面积。** 上半球 $z=\sqrt{R^2-x^2-y^2}$，$z_x=-x/z$，$z_y=-y/z$，于是

$$\sqrt{1+z_x^2+z_y^2}=\sqrt{1+\frac{x^2+y^2}{z^2}}=\frac{R}{z}.$$

在圆盘 $x^2+y^2\le R^2$ 上积分：

$$S_{\text{上}}=\int_0^{2\pi}\int_0^R\frac{R}{\sqrt{R^2-r^2}}\,r\,dr\,d\theta=2\pi R\cdot R=2\pi R^2.$$

上下两半合计 $4\pi R^2$，与球面积公式一致。

## 质量、质心与转动惯量

设薄片 $D$ 的面密度为 $\rho(x,y)$，则

$$m=\iint_D\rho\,d\sigma,\qquad \bar x=\frac1m\iint_D x\rho\,d\sigma,\qquad \bar y=\frac1m\iint_D y\rho\,d\sigma.$$

对 $z$ 轴的转动惯量是

$$I_z=\iint_D(x^2+y^2)\rho\,d\sigma.$$

均匀半圆盘（半径 $R$，$\rho\equiv1$）的质心是一个必算例子。$m=\frac{\pi R^2}{2}$，由左右对称 $\bar x=0$，而

$$\iint_D y\,d\sigma=\int_0^\pi\int_0^R r\sin\theta\cdot r\,dr\,d\theta=\frac{R^3}{3}\cdot2=\frac{2R^3}{3}.$$

于是 $\bar y=\frac{2R^3/3}{\pi R^2/2}=\frac{4R}{3\pi}\approx0.424R$。质心不在半圆盘的正中央，也不在弧上。

均匀圆盘对 $z$ 轴的转动惯量：

$$I_z=\int_0^{2\pi}\int_0^R r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac{R^4}{4}=\frac{\pi R^4}{2}.$$

若质量 $m=\pi R^2$，则 $I_z=\frac12mR^2$，与物理课本的圆盘公式一致。

## 平均值与物理量

函数 $f$ 在区域 $D$ 上的平均值定义为

$$\bar f=\frac{1}{\sigma(D)}\iint_D f\,d\sigma.$$

例如 $f(x,y)=x^2+y^2$ 在单位圆盘上的平均值为 $\frac{1}{\pi}\cdot\frac{\pi}{2}=\frac12$，与第 1 讲用极坐标算出的结果吻合。

三重积分的用法完全平行：质量 $m=\iiint_\Omega\rho\,dV$，质心坐标 $\bar z=\frac1m\iiint_\Omega z\rho\,dV$，对 $z$ 轴的转动惯量 $I_z=\iiint_\Omega(x^2+y^2)\rho\,dV$。

判断用几重积分，只看微元：铺在平面上用二重，堆在空间里用三重，沿曲线累加用曲线积分（下一章）。

**例：单位立方体的转动惯量。** 密度为 $1$，取过中心且平行于 $z$ 轴的直线：

$$I=\int_0^1\int_0^1\int_0^1\left[\left(x-\tfrac12\right)^2+\left(y-\tfrac12\right)^2\right]dz\,dy\,dx=\frac1{12}+\frac1{12}=\frac16 .$$

**形心与质心。** 密度均匀时两者重合，只需要几何信息；密度不均匀时必须带上 $\rho$，否则算出的只是几何中心。

**用 Pappus 定理校验。** 平面图形绕不与它相交的轴旋转，体积 $V=2\pi\bar rA$，其中 $\bar r$ 是形心到轴的距离。半径 $R$ 的圆绕距圆心 $d>R$ 的轴旋转，得 $V=2\pi d\cdot\pi R^2$；用二重积分重算一遍，两个结果应当相同——这是检查积分限的免费工具。

## 三个常见误解

> [!MYTH] 曲面面积就是它在 $xy$ 平面上的投影面积。
> 只有曲面平行于 $xy$ 平面时才相等。一般要乘 $\sqrt{1+z_x^2+z_y^2}$，半球面的面积是投影圆面积的两倍。

> [!MYTH] 质心就是区域的几何中心。
> 只有密度均匀且区域对称时才是。密度不均匀时，质心由 $\iint x\rho$ 与 $\iint y\rho$ 决定，会偏向密度大的一侧。

> [!MYTH] 转动惯量的公式是 $\iint r^2\rho$，其中 $r$ 是到原点的距离。
> 对 $z$ 轴转动时，$r$ 是到 $z$ 轴的距离，即 $\sqrt{x^2+y^2}$，所以被积函数是 $x^2+y^2$。绕哪条轴转，就量到哪条轴的距离。

## 练习

> [!PRACTICE] 1 · 体积
> 求抛物面 $z=x^2+y^2$ 与平面 $z=1$ 围成的立体体积。
>
> > [!ANSWER] 看答案
> > $V=\iint_{x^2+y^2\le1}(1-x^2-y^2)\,d\sigma=\int_0^{2\pi}\int_0^1(1-r^2)r\,dr\,d\theta=2\pi\left(\frac12-\frac14\right)=\frac{\pi}{2}$。

> [!PRACTICE] 2 · 质心
> 均匀半圆盘半径 $R$，求质心。
>
> > [!ANSWER] 看答案
> > $m=\frac{\pi R^2}{2}$，$\bar x=0$，$\iint_D y\,d\sigma=\frac{2R^3}{3}$，故 $\bar y=\frac{4R}{3\pi}$。

> [!PRACTICE] 3 · 转动惯量
> 均匀圆盘半径 $R$、面密度 $1$，求对 $z$ 轴的转动惯量，并写成 $kmR^2$ 的形式。
>
> > [!ANSWER] 看答案
> > $I_z=\int_0^{2\pi}\int_0^R r^2\cdot r\,dr\,d\theta=\frac{\pi R^4}{2}$。$m=\pi R^2$，故 $I_z=\frac12mR^2$，即 $k=\frac12$。

> [!PRACTICE] 4 · 曲面面积
> 求锥面 $z=\sqrt{x^2+y^2}$，$0\le z\le1$ 的面积。
>
> > [!ANSWER] 看答案
> > $z_x=x/z$，$z_y=y/z$，$\sqrt{1+z_x^2+z_y^2}=\sqrt2$。投影是单位圆盘，故 $S=\sqrt2\cdot\pi=\sqrt2\pi$。

> [!FORMAL] 严格表述
> 若曲面 $\Sigma$ 由 $C^1$ 函数 $z=z(x,y)$ 给出，$(x,y)\in D$，则其面积定义为 $\iint_D\sqrt{1+z_x^2+z_y^2}\,dx\,dy$；这个值与参数化无关。区域 $D$ 上连续函数 $f$ 的平均值为 $\frac{1}{\sigma(D)}\iint_D f\,d\sigma$。质心与转动惯量的定义分别是 $\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma$ 与 $I_z=\iint_D(x^2+y^2)\rho\,d\sigma$，其中 $m=\iint_D\rho\,d\sigma>0$。
