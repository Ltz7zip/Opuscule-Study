---
slug: "multiple-integral-applications"
subject: "calculus"
unit: "u10"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 高等数学 · 专业模式"
title: "重积分的应用"
subtitle: "曲面面积、质心、转动惯量"
minutes: 32
meta: ["阅读 32 分钟","需要 二重积分与三重积分","掌握级"]
concepts: ["multipleint", "areavol"]
prereq: ["multipleint"]
related: ["areavol", "lineint", "partial"]
---

## 本讲目标

重积分的应用看上去公式很多，其实只有一个动作：**把要求的量拆成小块上的近似值，再累加**。前两讲解决了积分"怎么算"，这一讲解决"算什么、为什么这样写"。

这一讲处理三类量：曲面面积、质心（形心）、转动惯量。三者的小块贡献各不相同：面积的小块贡献是一个倾斜的面积元，质心的小块贡献是"质量乘坐标"，惯量的小块贡献是"质量乘到轴的距离平方"。共同点是它们都能写成一个密度函数乘几何因子的积分，而几何因子由小块的方向或位置决定。

学完这一讲，你应该能够：

- 写出曲面面积公式，并说明 $1+z_x^{2}+z_y^{2}$ 的来源；
- 判断曲面能否写成 $z=z(x,y)$ 的单值图，不能时知道如何拆分或换变量；
- 用对称性把质心坐标砍到只剩一个，并说明理由；
- 分清转动惯量是对轴、对点还是对平面，写出对应的距离平方；
- 在算出结果后用体积、投影面积或上下界做一次量级校验。

## 三行回顾

- 二重积分在平面区域上累加，三重积分在空间区域上累加，两者的计算都化为累次积分。
- 平面薄片的质量是密度乘面积再累加，即 $m=\iint_D\rho\,d\sigma$；空间物体把 $d\sigma$ 换成 $dV$。
- 对称区域上奇函数的积分为零；偶函数在对称区域上的积分，等于一半区域上积分的两倍。

## 统一的模式

先看一个最熟悉的量。薄片的密度为 $\rho(x,y)$，把它分成小片 $\Delta\sigma_i$，在第 $i$ 片上取一点 $(\xi_i,\eta_i)$，则这一片的质量近似为 $\rho(\xi_i,\eta_i)\Delta\sigma_i$。累加并令最大直径趋于零：

$$
m=\iint_D \rho(x,y)\,d\sigma
$$

这个式子里有三件事：分割、近似、取极限。它们就是所有应用的模板。换一个量，只需换"小块贡献"：

- 面积：每块贡献 $1\cdot\Delta\sigma$，所以 $A=\iint_D d\sigma$；
- 质心：每块贡献 $x\cdot\Delta m$，所以一阶矩 $M_y=\iint_D x\rho\,d\sigma$；
- 惯量：每块贡献 $r^{2}\cdot\Delta m$，$r$ 是到轴的距离。

所以"把几何量写成积分"不是背公式，而是回答两个问题：小块上这个量近似等于什么？这个近似在小块缩小时误差是否趋于零？第二个问题由密度与几何因子的连续性保证，这也是严格表述里要求 $\rho$ 连续的原因。

> [!NOTE]
> 先想清楚"小块贡献"，再写积分。公式记混时，回到这一步重新推，比对照表更可靠。

## 曲面面积

平面区域的面积可以直接累加面积元；曲面弯了，投影会丢信息。最直观的对比是一块倾斜的平板：它在水平面上的影子比板本身小，缩小的比例由板与水平面的夹角决定。曲面面积要做的，就是把每个"影子"按倾斜程度放大回去。

设曲面 $\Sigma$ 由 $z=z(x,y)$ 给出，在 $xOy$ 面上的投影为 $D$，$z$ 在 $D$ 上有连续偏导数。把 $(x,y)$ 看成参数，曲面有参数表示 $\mathbf r(x,y)=(x,y,z(x,y))$，两个切向量是

$$
\mathbf r_x=(1,0,z_x),\qquad \mathbf r_y=(0,1,z_y)
$$

曲面上一小块 $dS$ 与参数平面上对应的一块 $d\sigma$ 之比，等于这两个切向量张成的平行四边形面积 $|\mathbf r_x\times\mathbf r_y|$。计算叉积：

$$
\mathbf r_x\times\mathbf r_y=\left(-z_x,-z_y,1\right), \qquad
\left|\mathbf r_x\times\mathbf r_y\right|=\sqrt{1+z_x^{2}+z_y^{2}}
$$

于是

$$
dS=\sqrt{1+z_x^{2}+z_y^{2}}\;d\sigma,\qquad
A=\iint_D\sqrt{1+z_x^{2}+z_y^{2}}\;dx\,dy
$$

另一种读法用夹角。曲面法向量 $\mathbf n=(-z_x,-z_y,1)$ 与 $z$ 轴的夹角 $\gamma$ 满足

$$
\cos\gamma=\frac{1}{\sqrt{1+z_x^{2}+z_y^{2}}}
$$

投影关系是 $d\sigma=dS\cos\gamma$，所以 $dS=d\sigma/\cos\gamma$。两种读法给出同一个因子，这个因子恒不小于 $1$，正是"影子不会比实物大"。

## 例 1：抛物面的面积

求旋转抛物面 $z=x^{2}+y^{2}$ 在 $x^{2}+y^{2}\le1$ 上的面积。

**第一步，求偏导。** $z_x=2x$、$z_y=2y$，所以

$$
\sqrt{1+z_x^{2}+z_y^{2}}=\sqrt{1+4\left(x^{2}+y^{2}\right)}=\sqrt{1+4r^{2}}
$$

**第二步，判断坐标。** 被积函数只依赖 $r$，投影是单位圆盘，极坐标是唯一合理的选择，且 $d\sigma=r\,dr\,d\theta$。

**第三步，算内层。** 令 $u=1+4r^{2}$，则 $du=8r\,dr$，$r$ 从 $0$ 到 $1$ 对应 $u$ 从 $1$ 到 $5$：

$$
\int_0^1\sqrt{1+4r^{2}}\;r\,dr=\frac18\cdot\frac23\left[u^{3/2}\right]_1^5=\frac{1}{12}\left(5^{3/2}-1\right)
$$

**第四步，乘上角度。**

$$
A=2\pi\cdot\frac{1}{12}\left(5^{3/2}-1\right)=\frac{\pi}{6}\left(5\sqrt5-1\right)\approx5.33
$$

**校验。** 投影面积是 $\pi\approx3.14$，曲面比影子更"展开"，$5.33>3.14$ 合理；比值约 $1.70$，与抛物面在单位圆上最大斜率 $2$ 的量级相符。若改用直角坐标，被积函数含 $\sqrt{1+4x^{2}+4y^{2}}$，几乎无法处理——选坐标本身就是解题的一半。

## 曲面面积的边界情形

公式的前提是"曲面是 $z=z(x,y)$ 的单值图"。三种情形要特别注意。

**第一，投影重叠。** 整个球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 不能写成单值图，投影会被上下两片各盖一次。正确做法是拆成 $z=\pm\sqrt{a^{2}-x^{2}-y^{2}}$ 两片分别算再相加，或者改用 $x$ 作函数：$x=\pm\sqrt{a^{2}-y^{2}-z^{2}}$。

**第二，切平面竖直。** 柱面 $x^{2}+y^{2}=a^{2}$ 在 $x=\pm a$ 处 $z_x$ 无界，投影法在这些点失效；把曲面写成 $x=x(y,z)$ 或 $y=y(x,z)$ 即可绕开。相应地，

$$
dS=\sqrt{1+x_y^{2}+x_z^{2}}\;dy\,dz,\qquad
dS=\sqrt{1+y_x^{2}+y_z^{2}}\;dx\,dz
$$

都是同一个面积元的另一种写法。

**第三，参数曲面。** 若曲面由 $\mathbf r(u,v)$ 给出，则 $dS=|\mathbf r_u\times\mathbf r_v|\,du\,dv$；上面的公式正是 $u=x$、$v=y$ 的特例。

还要分清"曲面面积"与"曲面上的积分"：后者是被积函数乘 $dS$，只有被积函数恒为 $1$ 时才退化为面积。

## 质心与形心

质心是"把整个质量压缩成一个点"的位置：在这个点上支撑，薄片保持平衡。它由一阶矩决定：

$$
m=\iint_D\rho\,d\sigma,\qquad
\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma,\qquad
\bar y=\frac{1}{m}\iint_D y\rho\,d\sigma
$$

分子分别是薄片关于 $y$ 轴与 $x$ 轴的一阶矩。一阶矩的意义是"质量乘力臂"：把全部质量搬到 $(\bar x,\bar y)$，关于任意轴的一阶矩都不变，这正是质心的定义性质。

$\rho$ 为常数时，$\rho$ 在分子分母中约掉，质心只由形状决定，称为形心。这个区别在应用题里很重要：形状定形心，密度定质心。

两条常用性质。**可加性**：把区域分成两块，总质心是两块质心按质量加权的平均。**对称性**：若 $D$ 关于 $y$ 轴对称且 $\rho$ 关于 $x$ 为偶函数，则

$$
\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma=0
$$

因为 $x\rho$ 关于 $x$ 是奇函数，而区域对称。空间物体把二重换三重、$d\sigma$ 换 $dV$：

$$
m=\iiint_\Omega\rho\,dV,\qquad
\bar x=\frac{1}{m}\iiint_\Omega x\rho\,dV,\qquad
\bar z=\frac{1}{m}\iiint_\Omega z\rho\,dV
$$

## 例 2：上半圆盘的形心

求 $x^{2}+y^{2}\le a^{2}$、$y\ge0$ 的均匀薄片的形心。

**第一步，用对称性。** 区域关于 $y$ 轴对称，密度为常数，故 $\bar x=0$，只剩 $\bar y$。

**第二步，算质量。** 半圆面积 $m=\dfrac{\pi a^{2}}{2}$。

**第三步，算一阶矩。** 极坐标下 $y=r\sin\theta$、$d\sigma=r\,dr\,d\theta$，$\theta$ 从 $0$ 到 $\pi$：

$$
\iint_D y\,d\sigma=\int_0^{\pi}d\theta\int_0^{a}r\sin\theta\cdot r\,dr
=\frac{a^{3}}{3}\Big[-\cos\theta\Big]_0^{\pi}=\frac{a^{3}}{3}\cdot2=\frac{2a^{3}}{3}
$$

**第四步，相除。**

$$
\bar y=\frac{2a^{3}/3}{\pi a^{2}/2}=\frac{4a}{3\pi}\approx0.424a
$$

**校验。** $\bar y$ 必须落在 $0$ 与 $a$ 之间，$0.424a$ 满足；它小于 $a/2=0.5a$，因为半圆的大部分面积靠近直边，重心被拉向底边。若区域换成第一象限的四分之一圆盘，对称性给出 $\bar x=\bar y=\dfrac{4a}{3\pi}$：同一个数值，因为面积与力矩都按同一比例缩小了一半。

## 例 3：抛物面围成体的质心

设 $\Omega$ 由 $z=x^{2}+y^{2}$ 与 $z=1$ 围成，密度为 $1$，求质心。

**第一步，用对称性。** 区域绕 $z$ 轴旋转对称，故 $\bar x=\bar y=0$，只需 $\bar z$。

**第二步，算体积。** 固定 $z\in[0,1]$，截面是半径 $\sqrt z$ 的圆盘，面积 $\pi z$：

$$
V=\int_0^1\pi z\,dz=\frac{\pi}{2}
$$

**第三步，算关于 $xOy$ 面的一阶矩。** 被积函数只依赖 $z$，用截面法：

$$
\iiint_\Omega z\,dV=\int_0^1 z\cdot\pi z\,dz=\frac{\pi}{3}
$$

**第四步，相除。**

$$
\bar z=\frac{\pi/3}{\pi/2}=\frac23
$$

**校验。** $\bar z=\dfrac23$ 高于中位高度 $\dfrac12$，因为截面面积随 $z$ 增大（$\pi z$），上半部分的质量更多。这也说明"质心不在体积中点"是常态。

**边界情形。** 若密度改为 $\rho=z$（下轻上重），则

$$
m=\int_0^1 z\cdot\pi z\,dz=\frac{\pi}{3},\qquad
\iiint_\Omega z\cdot z\,dV=\int_0^1 z^{2}\cdot\pi z\,dz=\frac{\pi}{4}
$$

于是 $\bar z=\dfrac{\pi/4}{\pi/3}=\dfrac34$，比均匀时更靠上。密度的变化只改权重，不改"用截面法算"这条路线。

## 转动惯量

转动惯量是转动里的"质量"：同样大小的力矩，惯量越大角加速度越小，转动动能是 $\frac12I\omega^{2}$。定义是"质量乘到轴的距离平方"的累加：

$$
I=\iint_D r^{2}\rho\,d\sigma
$$

其中 $r$ 是点到**轴**的距离。对 $z$ 轴，$r^{2}=x^{2}+y^{2}$；对 $x$ 轴，$r^{2}=y^{2}+z^{2}$；对原点的极惯量，$r^{2}=x^{2}+y^{2}+z^{2}$。薄片在 $xOy$ 平面内时 $z=0$，于是对 $x$ 轴的 $r^{2}=y^{2}$，对 $y$ 轴的 $r^{2}=x^{2}$。

惯量与质心的区别要记牢：质心用的是一阶矩（坐标的一次方），惯量用的是二阶矩（坐标的平方）。所以惯量恒为正，且离轴越远越大；这也解释了为什么同一个物体换一条轴，惯量可以差好几倍。

## 例 4：圆盘的转动惯量

密度为 $1$、半径 $a$ 的圆盘 $x^{2}+y^{2}\le a^{2}$，求绕一条直径（取 $x$ 轴）与绕垂直盘面的中心轴（$z$ 轴）的惯量。

**绕 $x$ 轴：$r^{2}=y^{2}$。** 极坐标下 $y=r\sin\theta$：

$$
I_x=\iint_D y^{2}\,d\sigma
=\int_0^{2\pi}\sin^{2}\theta\,d\theta\int_0^{a}r^{3}\,dr
=\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4}
$$

**绕 $z$ 轴：$r^{2}=x^{2}+y^{2}$。** 注意体积元里还有一个 $r$：

$$
I_z=\iint_D\left(x^{2}+y^{2}\right)d\sigma
=\int_0^{2\pi}d\theta\int_0^{a}r^{2}\cdot r\,dr
=2\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{2}
$$

两者相差一倍，不是巧合。圆盘关于 $x$ 轴与 $y$ 轴对称，所以 $I_x=I_y$；而对平面图形，垂直轴定理给出 $I_z=I_x+I_y$，于是 $I_z=2I_x$。这正是"距离平方"在不同轴上的体现。

**边界情形。** 若区域是圆环 $a\le r\le b$，则

$$
I_z=2\pi\int_a^b r^{3}\,dr=2\pi\cdot\frac{b^{4}-a^{4}}{4}=\frac{\pi\left(b^{4}-a^{4}\right)}{2}
$$

令 $a\to0$ 就回到圆盘。若圆盘偏心、绕不过圆心的轴转动，则要用平行轴定理 $I=I_C+md^{2}$，其中 $d$ 是两轴的距离、$m$ 是总质量——它把"换轴"的问题化归为"过质心"的情形。

## 一张对照表

| 量 | 平面薄片 | 空间物体 | 小块贡献 |
| --- | --- | --- | --- |
| 质量 | $\iint_D\rho\,d\sigma$ | $\iiint_\Omega\rho\,dV$ | $\rho\,\Delta V$ |
| 质心 $\bar x$ | $\frac{1}{m}\iint_D x\rho\,d\sigma$ | $\frac{1}{m}\iiint_\Omega x\rho\,dV$ | $x\,\Delta m$ |
| 对 $z$ 轴惯量 | $\iint_D(x^{2}+y^{2})\rho\,d\sigma$ | $\iiint_\Omega(x^{2}+y^{2})\rho\,dV$ | $(x^{2}+y^{2})\Delta m$ |
| 对 $x$ 轴惯量 | $\iint_D y^{2}\rho\,d\sigma$ | $\iiint_\Omega(y^{2}+z^{2})\rho\,dV$ | $(y^{2}+z^{2})\Delta m$ |
| 极惯量 | $\iint_D(x^{2}+y^{2})\rho\,d\sigma$ | $\iiint_\Omega(x^{2}+y^{2}+z^{2})\rho\,dV$ | $(x^{2}+y^{2}+z^{2})\Delta m$ |

表格的读法：空间物体的距离平方总比薄片多一个坐标的平方，因为薄片被限制在 $z=0$ 上。写公式前先问"距离量到哪条轴"，再决定平方里有哪些项。

## 三个常见误解

> [!MYTH] 一 · 曲面面积就是它在坐标面上的投影面积。
> 只有曲面平行于坐标面时两者才相等。倾斜会放大面积，放大倍数就是 $\sqrt{1+z_x^{2}+z_y^{2}}$，它恒不小于 $1$；单位圆上抛物面的面积约为投影的 $1.70$ 倍。

> [!MYTH] 二 · 质心的纵坐标等于区域最高点的一半。
> 质心是加权平均，不是几何中点。上半圆盘的 $\bar y=\dfrac{4a}{3\pi}\approx0.424a$，既不是 $\dfrac a2$，也不能只由最高点 $a$ 决定。

> [!MYTH] 三 · 转动惯量对哪条轴都一样。
> 同一个物体对不同轴的惯量可以差几倍。写公式前先确认距离量到哪条轴，圆盘的 $I_z=2I_x$ 就是警示。

## 练习

> [!PRACTICE] 1 · 平面片的面积
> 求平面 $z=1-x-y$ 在 $x\ge0$、$y\ge0$、$x+y\le1$ 上的面积。
>
> > [!ANSWER] 看答案
> > $z_x=z_y=-1$，故 $\sqrt{1+1+1}=\sqrt3$；投影是面积为 $\dfrac12$ 的三角形，所以 $A=\dfrac{\sqrt3}{2}$。

> [!PRACTICE] 2 · 形心的横坐标
> 求由 $y=x^{2}$ 与 $y=x$ 围成的均匀薄片的形心横坐标。
>
> > [!ANSWER] 看答案
> > 面积 $\displaystyle\int_0^1(x-x^{2})dx=\frac16$，一阶矩 $\displaystyle\iint x\,d\sigma=\int_0^1x(x-x^{2})dx=\frac1{12}$，故 $\bar x=\dfrac{1/12}{1/6}=\dfrac12$。同法可得 $\bar y=\dfrac25$。

> [!PRACTICE] 3 · 矩形的惯量
> 密度为 $1$ 的矩形 $0\le x\le a$、$0\le y\le b$，求绕 $x$ 轴的转动惯量。
>
> > [!ANSWER] 看答案
> > $\displaystyle I_x=\int_0^{a}dx\int_0^{b}y^{2}dy=a\cdot\frac{b^{3}}{3}=\frac{ab^{3}}{3}$。若绕 $y$ 轴，交换 $a,b$ 得 $\dfrac{a^{3}b}{3}$。

> [!PRACTICE] 4 · 半球体的质心
> 求密度为 $1$ 的上半球体 $x^{2}+y^{2}+z^{2}\le a^{2}$、$z\ge0$ 的质心高度。
>
> > [!ANSWER] 看答案
> > 体积 $V=\dfrac{2\pi a^{3}}{3}$；球面坐标下 $\displaystyle\iiint z\,dV=\int_0^{2\pi}d\theta\int_0^{\pi/2}\cos\varphi\sin\varphi\,d\varphi\int_0^{a}\rho^{3}d\rho=\pi\cdot\frac12\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4}$，故 $\bar z=\dfrac{3a}{8}$。

> [!PRACTICE] 5 · 球面的面积
> 用投影法求球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 的面积。
>
> > [!ANSWER] 看答案
> > 取上半球 $z=\sqrt{a^{2}-x^{2}-y^{2}}$，则 $\sqrt{1+z_x^{2}+z_y^{2}}=\dfrac{a}{\sqrt{a^{2}-r^{2}}}$，故半球的面积为 $\displaystyle\int_0^{2\pi}d\theta\int_0^{a}\frac{a\,r\,dr}{\sqrt{a^{2}-r^{2}}}=2\pi a\cdot a=2\pi a^{2}$，整个球面为 $4\pi a^{2}$。

## 严格表述

> [!FORMAL] 严格表述
> 设曲面 $\Sigma$ 由 $z=z(x,y)$ 给出，$z$ 在闭区域 $D$ 上有连续偏导数。把 $D$ 分割成小区域 $\Delta\sigma_i$，在每块上取点 $(\xi_i,\eta_i)$，则 $\Sigma$ 的面积定义为
> $$A=\lim_{\lambda\to0}\sum_i\sqrt{1+z_x^{2}(\xi_i,\eta_i)+z_y^{2}(\xi_i,\eta_i)}\;\Delta\sigma_i=\iint_D\sqrt{1+z_x^{2}+z_y^{2}}\;d\sigma$$
> 其中 $\lambda$ 是所有小区域直径的最大值。
>
> 设薄片占据 $D$，面密度 $\rho$ 在 $D$ 上连续且 $m=\iint_D\rho\,d\sigma>0$，则质心与转动惯量为
> $$\bar x=\frac1m\iint_D x\rho\,d\sigma,\quad \bar y=\frac1m\iint_D y\rho\,d\sigma,\quad I_x=\iint_D y^{2}\rho\,d\sigma,\quad I_y=\iint_D x^{2}\rho\,d\sigma,\quad I_z=\iint_D\left(x^{2}+y^{2}\right)\rho\,d\sigma$$
> 空间物体的公式把 $D$ 换成 $\Omega$、$d\sigma$ 换成 $dV$，并把距离平方换成到相应坐标轴的垂直距离平方。

## 与其他讲次的联系

- **二重积分**给出面积元 $d\sigma$ 与极坐标下的 $r\,dr\,d\theta$，本讲的所有面积与形心计算都建立在它上面。
- **三重积分**提供截面法与球面坐标，例 3 的 $\bar z$ 与练习 4 的半球体都靠它完成。
- **偏导数与切平面**决定曲面面积因子 $\sqrt{1+z_x^{2}+z_y^{2}}$：它正是切平面法向量长度的倒数读法。
- **曲线积分**里的弧长元 $ds=\sqrt{x'^{2}+y'^{2}}\,dt$ 与 $dS$ 同源，都是用参数化的切向量长度把"弯的量"拉直。
- **概率与统计**中期望是加权平均、方差是二阶矩，与本讲的质心与惯量是同一套"矩"的语言。
