---
slug: "surface-integral-1"
subject: "analysis"
unit: "u14"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "第一类曲面积分"
subtitle: "在弯曲的薄壳上累加密度"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["lineint"]
prereq: ["lineint"]
related: ["lineint", "multipleint"]
---

## 本讲目标

第一类曲面积分把曲面上的密度累加成质量，或者把常数 $1$ 累加成曲面面积。学完这一讲，你能写出 $dS$ 的两种算法，在显式曲面与参数曲面上正确计算，并用对称性判断积分为零。

## 三行回顾

- 第一类曲线积分沿弧长累加，第一类曲面积分沿曲面面积累加。
- 关键量是曲面面积元素 $dS$，它不是 $dx\,dy$，而是 $dx\,dy$ 乘一个放大因子。
- 曲面没有“正反”，所以第一类曲面积分与曲面的侧无关。

## 曲面面积元素

设 $\Sigma$ 是一块光滑曲面，$f$ 在 $\Sigma$ 上有界。把 $\Sigma$ 分成 $n$ 小块，第 $i$ 块面积记作 $\Delta S_i$，在其上取点 $P_i$，作和 $\sum f(P_i)\Delta S_i$。当最大直径趋于零时，若和趋于同一个数，就记

$$\iint_\Sigma f\,dS.$$

取 $f\equiv1$ 得曲面面积。若 $f$ 是面密度，积分就是薄壳的质量。

显式曲面 $z=z(x,y)$，$(x,y)\in D$：曲面上一小块的投影面积为 $dx\,dy$，法向量与 $z$ 轴夹角的余弦为 $1/\sqrt{1+z_x^2+z_y^2}$，所以

$$dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy.$$

参数曲面 $\mathbf r(u,v)=(x(u,v),y(u,v),z(u,v))$：两条切向量张成一小块平行四边形，面积是 $|\mathbf r_u\times\mathbf r_v|\,du\,dv$，所以

$$dS=|\mathbf r_u\times\mathbf r_v|\,du\,dv.$$

两种写法是同一件事：显式曲面取参数 $(x,y)$ 时，$|\mathbf r_x\times\mathbf r_y|=\sqrt{1+z_x^2+z_y^2}$。

## 显式曲面上的计算

例：$\Sigma$ 是上半球面 $z=\sqrt{R^2-x^2-y^2}$，求 $\iint_\Sigma z\,dS$。

由 $z_x=-x/z$、$z_y=-y/z$，

$$dS=\sqrt{1+\frac{x^2+y^2}{z^2}}\,dx\,dy=\frac{R}{z}\,dx\,dy.$$

于是 $z\,dS=R\,dx\,dy$，被积函数中的 $z$ 恰好被放大因子抵消：

$$\iint_\Sigma z\,dS=R\iint_{x^2+y^2\le R^2}dx\,dy=R\cdot\pi R^2=\pi R^3.$$

这种“抵消”不是巧合：球面上 $z\,dS$ 就是投影面积乘 $R$，这是球面面积元素的一个常用性质。

例：$\Sigma$ 为平面 $z=1-x-y$ 在第一卦限被 $x=0,y=0,z=0$ 截出的三角形，求 $\iint_\Sigma z\,dS$。这里 $z_x=-1,z_y=-1$，$dS=\sqrt3\,dx\,dy$，投影 $D$ 是 $x\ge0,y\ge0,x+y\le1$：

$$\iint_\Sigma z\,dS=\sqrt3\iint_D(1-x-y)\,dx\,dy=\sqrt3\cdot\frac16=\frac{\sqrt3}{6}.$$

## 参数曲面与对称性

例：圆柱侧面 $\Sigma:x=R\cos\theta,\ y=R\sin\theta,\ 0\le z\le1$。计算

$$\mathbf r_\theta=(-R\sin\theta,R\cos\theta,0),\qquad \mathbf r_z=(0,0,1),$$

$$\mathbf r_\theta\times\mathbf r_z=(R\cos\theta,R\sin\theta,0),\qquad |\mathbf r_\theta\times\mathbf r_z|=R.$$

故 $dS=R\,d\theta\,dz$，且

$$\iint_\Sigma z\,dS=\int_0^{2\pi}\int_0^1 zR\,dz\,d\theta=\pi R.$$

这里 $R\,d\theta\,dz$ 的几何意义是：把圆柱剪开摊平，得到一个 $2\pi R\times1$ 的矩形。

**对称性**：若 $\Sigma$ 关于 $xy$ 平面对称，而 $f$ 关于 $z$ 是奇函数，则积分为零。球面 $\Sigma:x^2+y^2+z^2=R^2$ 上，$\iint_\Sigma z\,dS=0$，而 $\iint_\Sigma z^2\,dS=\frac{1}{3}\iint_\Sigma R^2\,dS=\frac{4\pi R^4}{3}$。

**球面的参数化。** 取 $\mathbf r(\varphi,\theta)=(R\sin\varphi\cos\theta,\ R\sin\varphi\sin\theta,\ R\cos\varphi)$，$\varphi\in[0,\pi]$，$\theta\in[0,2\pi]$，则 $|\mathbf r_\varphi\times\mathbf r_\theta|=R^2\sin\varphi$，故 $dS=R^2\sin\varphi\,d\varphi\,d\theta$，总面积为 $4\pi R^2$。

用它算 $\iint_\Sigma(x^2+y^2)\,dS$：被积函数是 $R^2\sin^2\varphi$，

$$\iint_\Sigma(x^2+y^2)\,dS=R^4\int_0^{2\pi}d\theta\int_0^\pi\sin^3\varphi\,d\varphi=R^4\cdot2\pi\cdot\frac43=\frac{8\pi R^4}{3}.$$

**先看对称性再参数化**，能省掉一半积分。反过来，若曲面由显式方程给出、投影区域又简单，直接用 $dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$ 通常更快。

**旋转曲面。** $y=f(x)\ge0$（$a\le x\le b$）绕 $x$ 轴旋转，取参数 $(x,\theta)$，则 $dS=f(x)\sqrt{1+f'(x)^2}\,dx\,d\theta$，面积为 $2\pi\int_a^bf(x)\sqrt{1+f'(x)^2}dx$。例如 $y=\sqrt{x}$ 在 $0\le x\le1$ 上绕 $x$ 轴旋转：

$$2\pi\int_0^1\sqrt{x}\sqrt{1+\frac{1}{4x}}\,dx=\pi\int_0^1\sqrt{4x+1}\,dx=\frac{\pi}{6}\left(5\sqrt5-1\right).$$

曲面积分容易出错的地方不在被积函数，而在面积元素。动手前先问一句：这块曲面用显式方程还是参数方程更省事？显式方程下面积元素只含两个偏导数，参数方程下要算叉积的模；两条路都对，选短的那条。算完再检查量纲：面积必须是长度的平方，$dS$ 里少了一次长度就是漏了因子。

## 三个常见误解

> [!MYTH] 曲面积分就是把 $dS$ 换成 $dx\,dy$。
> 只有曲面平行于 $xy$ 平面时才成立。一般要乘 $\sqrt{1+z_x^2+z_y^2}$；对参数曲面则乘 $|\mathbf r_u\times\mathbf r_v|$。

> [!MYTH] 第一类曲面积分要区分曲面的正侧。
> 它按面积累加，与选哪一侧无关。区分侧的是第二类曲面积分（通量）。

> [!MYTH] 参数域的面积就是曲面面积。
> 参数域的一小块 $du\,dv$ 被放大 $|\mathbf r_u\times\mathbf r_v|$ 倍。圆柱用 $(\theta,z)$ 作参数时，参数域面积是 $2\pi$，真实侧面积是 $2\pi R$。

## 练习

> [!PRACTICE] 1 · 锥面
> $\Sigma$ 为锥面 $z=\sqrt{x^2+y^2}$，$0\le z\le1$，求 $\iint_\Sigma z\,dS$。
>
> > [!ANSWER] 看答案
> > $z_x=x/z$，$z_y=y/z$，$dS=\sqrt2\,dx\,dy$。投影为单位圆盘，$\iint_\Sigma z\,dS=\sqrt2\int_0^{2\pi}\int_0^1 r\cdot r\,dr\,d\theta=\frac{2\sqrt2\pi}{3}$。

> [!PRACTICE] 2 · 球面
> $\Sigma$ 为球面 $x^2+y^2+z^2=R^2$，求 $\iint_\Sigma(x^2+y^2+z^2)\,dS$。
>
> > [!ANSWER] 看答案
> > 在球面上被积函数恒为 $R^2$，面积为 $4\pi R^2$，故积分 $=4\pi R^4$。

> [!PRACTICE] 3 · 柱面
> 圆柱侧面 $x^2+y^2=R^2$，$0\le z\le1$，求 $\iint_\Sigma z\,dS$。
>
> > [!ANSWER] 看答案
> > $dS=R\,d\theta\,dz$，积分 $=\int_0^{2\pi}\int_0^1 zR\,dz\,d\theta=\pi R$。

> [!PRACTICE] 4 · 平面片
> $\Sigma$ 为 $z=1-x-y$ 在第一卦限的部分，求 $\iint_\Sigma z\,dS$。
>
> > [!ANSWER] 看答案
> > $dS=\sqrt3\,dx\,dy$，投影三角形上 $\iint(1-x-y)\,d\sigma=\frac16$，故积分 $=\frac{\sqrt3}{6}$。

> [!FORMAL] 严格表述
> 设 $\Sigma$ 为光滑曲面，$f$ 在 $\Sigma$ 上有界。对 $\Sigma$ 的分割，记第 $i$ 块面积为 $\Delta S_i$，若 $\sum f(P_i)\Delta S_i$ 在最大直径趋于零时对一切取点收敛到 $I$，则记 $I=\iint_\Sigma f\,dS$。若 $\Sigma$ 是 $C^1$ 参数曲面 $\mathbf r(u,v)$，$(u,v)\in D$，且 $\mathbf r_u\times\mathbf r_v\neq0$，则 $\iint_\Sigma f\,dS=\iint_D f(\mathbf r(u,v))|\mathbf r_u\times\mathbf r_v|\,du\,dv$，该值与参数化无关。
