---
slug: "field-theory"
subject: "analysis"
unit: "u14"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 数学分析 · 专业模式"
title: "场论初步"
subtitle: "梯度、散度、旋度，三个导数各管一件事"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["field", "partial"]
prereq: ["field"]
related: ["field", "lineint"]
---

## 本讲目标

前几讲的三个积分公式，被三个微分算子串起来：梯度、散度、旋度。学完这一讲，你能计算这三个量，证明两个基本恒等式，判断一个向量场是否有势函数，并说清“旋度为零”离“保守场”还差什么条件。

## 三行回顾

- 梯度作用在数量场上，得到一个向量场，指向增长最快的方向。
- 散度作用在向量场上，得到一个数量，衡量源的强弱。
- 旋度作用在向量场上，得到一个向量，衡量局部的旋转。

## 梯度、散度、旋度

设 $f$ 是数量场，$\mathbf F=(P,Q,R)$ 是向量场，分量都有连续偏导数。

$$\nabla f=(f_x,f_y,f_z),$$

$$\nabla\cdot\mathbf F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z},$$

$$\nabla\times\mathbf F=\begin{vmatrix}\mathbf i & \mathbf j & \mathbf k\\ \partial_x & \partial_y & \partial_z\\ P & Q & R\end{vmatrix}=\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right).$$

三个算子的“输入输出类型”必须记清：梯度把数量变向量，散度把向量变数量，旋度把向量变向量。

例：$\mathbf F=(x^2y,\ yz,\ x+z^2)$。

$$\nabla\cdot\mathbf F=2xy+z+2z=2xy+3z,$$

$$\nabla\times\mathbf F=(0-y,\ 0-1,\ 0-x^2)=(-y,\ -1,\ -x^2).$$

散度是一个数，旋度是一个向量，不要混。

## 两个恒等式

对 $C^2$ 函数与 $C^2$ 向量场，

$$\nabla\times(\nabla f)=0,\qquad \nabla\cdot(\nabla\times\mathbf F)=0.$$

第一个说：梯度场没有旋。第二个说：旋度场没有源。证明只用混合偏导数相等：例如

$$(\nabla\times\nabla f)_x=(f_z)_y-(f_y)_z=f_{zy}-f_{yz}=0.$$

第二个恒等式同样逐分量展开，每一项都是一对相消的混合偏导。

这两个恒等式给出必要条件：若 $\mathbf F=\nabla u$，则 $\nabla\times\mathbf F=0$；若 $\mathbf F=\nabla\times\mathbf A$，则 $\nabla\cdot\mathbf F=0$。它们不是充分条件，下一节说明差在哪里。

## 保守场与势函数

若存在 $u$ 使 $\mathbf F=\nabla u$，称 $\mathbf F$ 为**保守场**，$u$ 为**势函数**。此时

$$\int_A^B\mathbf F\cdot d\mathbf r=u(B)-u(A),$$

沿任何路径都成立；等价地，沿任何闭曲线的环量为零。

在**单连通**区域上，$\nabla\times\mathbf F=0$ 与“存在势函数”等价。求势函数的固定动作：先由 $u_x=P$ 对 $x$ 积分，得到 $u=\int P\,dx+\varphi(y,z)$，再用 $u_y=Q$、$u_z=R$ 定出 $\varphi$。

例：$\mathbf F=(y+z,\ x+z,\ x+y)$。由 $u_x=y+z$ 得 $u=xy+xz+\varphi(y,z)$；$u_y=x+\varphi_y=x+z$ 给出 $\varphi_y=z$，故 $\varphi=yz+\psi(z)$；$u_z=x+y+\psi'(z)=x+y$ 给出 $\psi'=0$。取 $u=xy+xz+yz$。验证 $\nabla u=\mathbf F$。

## 涡场反例与区域形状

在 $\mathbb{R}^3$ 去掉 $z$ 轴的区域上取

$$\mathbf F=\left(\frac{-y}{x^2+y^2},\ \frac{x}{x^2+y^2},\ 0\right).$$

直接计算可得 $\nabla\times\mathbf F=0$。但沿 $z=0$ 平面上的单位圆逆时针一周，

$$\oint\mathbf F\cdot d\mathbf r=\int_0^{2\pi}dt=2\pi\neq0.$$

所以它在穿孔区域上没有单值势函数；局部势函数是极角 $\theta$，绕一圈增加 $2\pi$。这说明“旋度为零”只在单连通区域上才等价于保守。

这也解释了为什么物理里“无旋”与“保守”常被当成同义词：默认区域没有洞。一旦区域是环形或穿孔的，必须单独检查绕洞的环量。

于是判断保守场有一张固定检查表：先算旋度是否恒为零，再看区域是否单连通，最后验一条闭合路径的环量。三步都通过，才有资格说“存在势函数”。

## 三个常见误解

> [!MYTH] 散度是一个向量。
> 散度是数量，衡量单位体积内源的强度；旋度才是向量。把 $\nabla\cdot\mathbf F$ 写成向量是类型错误。

> [!MYTH] 旋度处处为零，就一定有势函数。
> 还需要区域单连通。穿孔平面上的涡场旋度为零，绕原点的环量却是 $2\pi$。

> [!MYTH] 梯度、散度、旋度是三个互不相关的公式。
> 它们由同一个向量微分算子 $\nabla$ 产生：梯度是 $\nabla f$，散度是 $\nabla\cdot\mathbf F$，旋度是 $\nabla\times\mathbf F$。Gauss 与 Stokes 公式正是把这三个算子与边界积分连接起来。

## 练习

> [!PRACTICE] 1 · 算三个量
> $\mathbf F=(x^2y,\ yz,\ x+z^2)$，求散度与旋度。
>
> > [!ANSWER] 看答案
> > $\nabla\cdot\mathbf F=2xy+3z$；$\nabla\times\mathbf F=(-y,-1,-x^2)$。

> [!PRACTICE] 2 · 求势函数
> 证明 $\mathbf F=(y+z,\ x+z,\ x+y)$ 保守，并求势函数。
>
> > [!ANSWER] 看答案
> > 旋度为零且区域为全空间。由 $u_x=y+z$ 积分得 $u=xy+xz+\varphi(y,z)$，再定出 $u=xy+xz+yz$。

> [!PRACTICE] 3 · 验证恒等式
> $f=x^2yz$，验证 $\nabla\times\nabla f=0$。
>
> > [!ANSWER] 看答案
> > $\nabla f=(2xyz,\ x^2z,\ x^2y)$，其旋度为 $(x^2-x^2,\ 2xy-2xy,\ 2xz-2xz)=(0,0,0)$。

> [!PRACTICE] 4 · 环量
> 对涡场 $\mathbf F=\left(\frac{-y}{x^2+y^2},\frac{x}{x^2+y^2},0\right)$，求沿单位圆逆时针的环量，并说明它为何不违反 Stokes 公式。
>
> > [!ANSWER] 看答案
> > 参数化后 $\mathbf F\cdot d\mathbf r=dt$，环量为 $2\pi$。圆盘包含原点，场在原点无定义，不满足 Stokes 公式在曲面上连续可导的条件。

> [!FORMAL] 严格表述
> 设 $f\in C^2$，$\mathbf F=(P,Q,R)\in C^2$。则 $\nabla\times\nabla f=0$ 且 $\nabla\cdot(\nabla\times\mathbf F)=0$，证明只需 $f_{xy}=f_{yx}$ 等混合偏导相等。若区域 $D$ 单连通且 $\mathbf F\in C^1(D)$，则 $\nabla\times\mathbf F=0$ 等价于存在 $u\in C^2(D)$ 使 $\mathbf F=\nabla u$，等价于 $\int_C\mathbf F\cdot d\mathbf r$ 路径无关，等价于沿任意闭曲线环量为零。
