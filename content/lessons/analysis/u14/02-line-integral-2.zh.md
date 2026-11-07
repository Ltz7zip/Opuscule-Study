---
slug: "line-integral-2"
subject: "analysis"
unit: "u14"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "第二类曲线积分与 Green 公式"
subtitle: "沿坐标方向做功，把边界积分换成二重积分"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["lineint", "field"]
prereq: ["lineint"]
related: ["field", "lineint"]
---

## 本讲目标

第二类曲线积分算的是力沿有向曲线做的功：每一点只取力在切线方向的分量。学完这一讲，你能写出 $\int_C P\,dx+Q\,dy$ 的定义，判断正向边界，熟练使用 Green 公式把闭曲线积分化成二重积分，并分清“路径无关”成立与不成立的条件。

## 三行回顾

- 第一类曲线积分按弧长累加，与方向无关。
- 第二类曲线积分按坐标增量累加，方向反过来，积分变号。
- Green 公式说：闭曲线上的第二类积分，等于内部区域上的一个二重积分。

## 有向曲线与第二类曲线积分

设 $C$ 是一条有向光滑曲线，从起点到终点。把 $C$ 分成小弧段，第 $i$ 段的坐标增量为 $\Delta x_i=x_i-x_{i-1}$、$\Delta y_i=y_i-y_{i-1}$，在其上取点 $(\xi_i,\eta_i)$，作和

$$\sum_{i=1}^n\left[P(\xi_i,\eta_i)\Delta x_i+Q(\xi_i,\eta_i)\Delta y_i\right].$$

极限存在时记作

$$\int_C P\,dx+Q\,dy.$$

若曲线的单位切向量为 $(\cos\alpha,\cos\beta)$，则它等于 $\int_C(P\cos\alpha+Q\cos\beta)\,ds$：第二类积分是第一类积分给被积函数加了“切向投影”的权重，再乘上有向性。

基本事实：

- **方向**：$\int_{-C}P\,dx+Q\,dy=-\int_CP\,dx+Q\,dy$。
- **参数化**：$x=x(t),y=y(t)$ 从 $\alpha$ 到 $\beta$，则 $\int_C P\,dx+Q\,dy=\int_\alpha^\beta\left[P x'(t)+Q y'(t)\right]dt$。这里下限到上限必须按曲线方向走。

例：$C$ 为从 $(0,0)$ 到 $(1,1)$ 的直线段，求 $\int_C x\,dy-y\,dx$。取 $x=t,y=t$：

$$\int_0^1(t\cdot1-t\cdot1)\,dt=0.$$

沿这条射线，$x\,dy-y\,dx$ 恰好为零，这与该微分形式是角度形式的倍数有关。

## Green 公式

设 $D$ 是由分段光滑简单闭曲线 $\partial D$ 围成的有界闭区域，$P,Q$ 在 $D$ 上有连续偏导数，$\partial D$ 取**正向**——沿曲线走时区域在左手边（逆时针）。则

$$\oint_{\partial D}P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dx\,dy.$$

右端的被积函数是一个标量，称为该向量场的“二维旋度”。

例：$C$ 为单位圆，逆时针，求

$$\oint_C(x^2-y)\,dx+(x+y^2)\,dy.$$

这里 $P=x^2-y$，$Q=x+y^2$，$Q_x=1$，$P_y=-1$，故 $Q_x-P_y=2$，区域面积为 $\pi$，积分等于 $2\pi$。直接参数化也能算，但 Green 公式一行完成。

Green 公式还有“挖洞”版本：若 $D$ 内有洞，外边界逆时针、内边界顺时针，公式仍然成立，右端是环形区域上的二重积分。这个版本专门处理被积函数在洞内无定义的情形。

## 用 Green 公式算面积

在 Green 公式中取 $P=-y/2$，$Q=x/2$，则 $Q_x-P_y=\frac12+\frac12=1$，于是

$$A=\iint_D d\sigma=\frac12\oint_{\partial D}x\,dy-y\,dx.$$

例：椭圆 $x=a\cos t$，$y=b\sin t$，$0\le t\le2\pi$。$dx=-a\sin t\,dt$，$dy=b\cos t\,dt$，故

$$x\,dy-y\,dx=ab\cos^2t\,dt+ab\sin^2t\,dt=ab\,dt,$$

面积 $=\frac12\int_0^{2\pi}ab\,dt=\pi ab$。这与换元法得到的结果一致，且计算更短。

## 路径无关与保守场

若 $\int_C P\,dx+Q\,dy$ 只依赖起点和终点，就称积分**路径无关**。在**单连通**区域 $D$ 上，以下三条等价：

- $Q_x=P_y$ 在 $D$ 内处处成立；
- 积分路径无关；
- 存在势函数 $u$，使 $P=u_x$、$Q=u_y$，此时 $\int_C P\,dx+Q\,dy=u(\text{终点})-u(\text{起点})$。

例：$P=2xy$，$Q=x^2$。$P_y=2x=Q_x$，全平面单连通，故路径无关；势函数 $u=x^2y$。从 $(0,0)$ 到 $(1,2)$ 的积分为 $1^2\cdot2-0=2$。

反例说明“单连通”不能丢。取

$$P=\frac{-y}{x^2+y^2},\qquad Q=\frac{x}{x^2+y^2},$$

在去掉原点的平面上 $Q_x=P_y$ 处处成立。但沿单位圆逆时针一周，

$$\oint P\,dx+Q\,dy=\int_0^{2\pi}1\,dt=2\pi\neq0.$$

所以在穿孔平面上积分并不路径无关；它的势函数是极角 $\theta$，绕一圈增加 $2\pi$，不是单值函数。Green 公式在这个区域也不能直接用在整条闭曲线围成的圆盘上，因为原点是奇点。

## 三个常见误解

> [!MYTH] Green 公式对任意方向的闭曲线都成立。
> 必须取正向（区域在左）。若沿顺时针，右端要加负号；把方向弄反是最常见的符号错误。

> [!MYTH] 只要 $Q_x=P_y$，积分就路径无关。
> 还需要区域单连通。上面的涡场在穿孔平面上处处满足 $Q_x=P_y$，绕原点一圈却是 $2\pi$。

> [!MYTH] $\int_C P\,dx+Q\,dy$ 就是 $\int_C(P+Q)\,ds$。
> 前者是有向的坐标积分，后者是无向的弧长积分。正确关系是 $\int_C P\,dx+Q\,dy=\int_C(P\cos\alpha+Q\cos\beta)\,ds$。

## 练习

> [!PRACTICE] 1 · Green 公式
> $C$ 为单位圆逆时针，求 $\oint_C(x^2-y)\,dx+(x+y^2)\,dy$。
>
> > [!ANSWER] 看答案
> > $Q_x-P_y=1-(-1)=2$，区域面积 $\pi$，积分 $=2\pi$。

> [!PRACTICE] 2 · 面积
> 用曲线积分求椭圆 $x^2/a^2+y^2/b^2\le1$ 的面积。
>
> > [!ANSWER] 看答案
> > 取 $x=a\cos t$，$y=b\sin t$，$A=\frac12\int_0^{2\pi}ab\,dt=\pi ab$。

> [!PRACTICE] 3 · 路径无关
> 计算 $\int_{(0,0)}^{(1,2)}2xy\,dx+x^2\,dy$。
>
> > [!ANSWER] 看答案
> > $P_y=2x=Q_x$，势函数 $u=x^2y$，积分 $=u(1,2)-u(0,0)=2$。也可沿折线验证。

> [!PRACTICE] 4 · 奇点
> 对 $P=\frac{-y}{x^2+y^2}$、$Q=\frac{x}{x^2+y^2}$，沿单位圆逆时针求积分，并解释为何不能用 Green 公式得零。
>
> > [!ANSWER] 看答案
> > 参数化 $x=\cos t$，$y=\sin t$，$P\,dx+Q\,dy=1\cdot dt$，积分为 $2\pi$。原点处 $P,Q$ 无定义，不满足 Green 公式在闭圆盘上连续可导的条件。

> [!FORMAL] 严格表述
> 设 $D$ 为有界闭区域，边界 $\partial D$ 由有限条分段光滑简单闭曲线组成，取正向。若 $P,Q\in C^1(D)$，则 $\oint_{\partial D}P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dx\,dy$。当 $D$ 单连通且 $P,Q\in C^1(D)$ 时，$Q_x=P_y$ 等价于积分路径无关，等价于存在 $u\in C^2(D)$ 使 $\nabla u=(P,Q)$；此时 $\int_C P\,dx+Q\,dy=u(B)-u(A)$。
