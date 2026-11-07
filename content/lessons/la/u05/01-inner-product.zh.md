---
slug: "inner-product"
subject: "la"
unit: "u05"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 线性代数 · 专业模式"
title: "内积、长度与正交性"
subtitle: "把几何搬进 n 维空间"
minutes: 14
meta: ["阅读 14 分钟","需要 向量组的线性相关性","掌握级"]
concepts: ["innerprod", "lindep"]
prereq: ["lindep"]
related: ["similar", "vecspace"]
---

## 本讲目标

学完这一讲，你能在 $n$ 维空间里计算长度与夹角、判断一组向量是否两两正交，并把任意一组线性无关的向量整理成标准正交基。

这一讲只做三件事：用内积把几何搬进代数、用正交矩阵识别“不变形”的变换、用施密特正交化把一组普通基换成好用的基。

## 三行回顾

- 线性相关性问的是：有没有不全为零的系数，让向量组的组合变成零向量。
- 矩阵乘法里“行乘列再求和”得到的那个数，其实就是内积的坐标写法。
- 还没解决的问题是：在 $n$ 维空间里，“长度”和“垂直”应该怎么定义。

## 问题

平面上，长度靠勾股定理，夹角靠余弦定理。到了 $\mathbb{R}^n$，图已经画不出来，但计算不能停。我们需要一个只依赖坐标、又能保留几何直觉的装置。

内积就是这个装置。对 $\alpha=(a_1,\dots,a_n)^{\mathsf{T}}$、$\beta=(b_1,\dots,b_n)^{\mathsf{T}}$，定义

$$
(\alpha,\beta)=a_1b_1+a_2b_2+\cdots+a_nb_n.
$$

它满足三条性质：对称 $(\alpha,\beta)=(\beta,\alpha)$；对第一变量线性 $(\alpha+\gamma,\beta)=(\alpha,\beta)+(\gamma,\beta)$、$(k\alpha,\beta)=k(\alpha,\beta)$；正定 $(\alpha,\alpha)\ge 0$，且等号只在 $\alpha=0$ 时成立。

有了内积，长度就是 $\|\alpha\|=\sqrt{(\alpha,\alpha)}$，距离就是 $\|\alpha-\beta\|$，夹角由

$$
\cos\theta=\frac{(\alpha,\beta)}{\|\alpha\|\,\|\beta\|}
$$

给出。当 $(\alpha,\beta)=0$ 时，称 $\alpha$ 与 $\beta$ 正交，记作 $\alpha\perp\beta$。

## 直觉

内积在量的是“一个向量在另一个方向上投影了多少”。两个向量越同向，内积越大；方向差 $90^\circ$，投影为零，内积为零。

这件事在 $n$ 维里依然成立。正交就是“投影为零”，不需要看得见。于是我们能在高维里谈垂直、谈直角三角形、谈勾股定理。

Cauchy–Schwarz 不等式把这件事说成一句精确的话：

$$
|(\alpha,\beta)|\le \|\alpha\|\,\|\beta\|.
$$

等号成立当且仅当两个向量线性相关。它保证余弦的绝对值不超过 $1$，也保证三角不等式 $\|\alpha+\beta\|\le\|\alpha\|+\|\beta\|$ 成立。

若一组非零向量两两正交，它们一定线性无关；再单位化，就得到标准正交组。把标准正交组的向量按列排成 $Q$，则 $Q^{\mathsf{T}}Q=E$，这样的 $Q$ 叫正交矩阵。它保持内积、长度与夹角不变：$(Q\alpha,Q\beta)=(\alpha,\beta)$。

## 手算一次

取

$$
\alpha_1=\begin{pmatrix}1\\1\\0\end{pmatrix},\quad
\alpha_2=\begin{pmatrix}1\\0\\1\end{pmatrix},\quad
\alpha_3=\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

它们线性无关，但不正交。用施密特正交化，一步一步来。

第一步，直接取第一个：

$$
\beta_1=\alpha_1=\begin{pmatrix}1\\1\\0\end{pmatrix},\qquad \|\beta_1\|^2=2.
$$

第二步，从 $\alpha_2$ 里减去它在 $\beta_1$ 上的投影：

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=\begin{pmatrix}1\\0\\1\end{pmatrix}-\frac12\begin{pmatrix}1\\1\\0\end{pmatrix}
=\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix}.
$$

此时 $(\beta_2,\beta_1)=\frac12-\frac12+0=0$，且 $\|\beta_2\|^2=\frac14+\frac14+1=\frac32$。

第三步，从 $\alpha_3$ 里减去它在 $\beta_1$、$\beta_2$ 上的投影。先算两个内积：

$$
(\alpha_3,\beta_1)=1,\qquad (\alpha_3,\beta_2)=\frac12.
$$

于是

$$
\beta_3=\alpha_3-\frac{1}{2}\beta_1-\frac{1/2}{3/2}\beta_2
=\begin{pmatrix}0\\1\\1\end{pmatrix}-\begin{pmatrix}1/2\\1/2\\0\end{pmatrix}-\frac13\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix}
=\begin{pmatrix}-2/3\\2/3\\2/3\end{pmatrix}.
$$

验算：$(\beta_3,\beta_1)=-\frac23+\frac23=0$，$(\beta_3,\beta_2)=-\frac13-\frac13+\frac23=0$。最后单位化：

$$
e_1=\frac{1}{\sqrt2}\begin{pmatrix}1\\1\\0\end{pmatrix},\quad
e_2=\frac{1}{\sqrt6}\begin{pmatrix}1\\-1\\2\end{pmatrix},\quad
e_3=\frac{1}{\sqrt3}\begin{pmatrix}-1\\1\\1\end{pmatrix}.
$$

三个向量两两正交、长度都是 $1$，而且张成的空间与原来完全一样。

## 三个常见误解

> [!MYTH] 内积就是对应位置相乘再相加，没有别的含义。
> 那只是标准内积的坐标公式。内积的本质是一个满足三条公理的二元函数；换一组基，坐标公式会变，几何结论不变。

> [!MYTH] 正交就是垂直，只对三维空间有意义。
> 正交的定义只有一条：内积为零。它在任意维数、甚至函数空间里都成立，只是画不出来。

> [!MYTH] 施密特正交化会改变向量张成的空间。
> 每一步只是从原向量里减去已有方向的投影，新向量仍在原来的空间里，并且不减少维数。张成的子空间始终不变。

## 练习

> [!PRACTICE] 1 · 长度与夹角
> $\alpha=(1,2,2)^{\mathsf{T}}$，$\beta=(2,2,-1)^{\mathsf{T}}$，求 $\|\alpha\|$、$\|\beta\|$ 与 $\cos\theta$。
>
> > [!ANSWER] 看答案
> > $\|\alpha\|=\sqrt{1+4+4}=3$，$\|\beta\|=\sqrt{4+4+1}=3$，$(\alpha,\beta)=2+4-2=4$，所以 $\cos\theta=\frac49$。

> [!PRACTICE] 2 · 验证 Cauchy–Schwarz
> 用上一题的向量验证 $|(\alpha,\beta)|\le\|\alpha\|\,\|\beta\|$。
>
> > [!ANSWER] 看答案
> > 左边是 $4$，右边是 $3\times3=9$，成立。等号要求两向量线性相关，这里显然不是。

> [!PRACTICE] 3 · 正交化一步
> 对 $\alpha_1=(1,0)^{\mathsf{T}}$、$\alpha_2=(1,1)^{\mathsf{T}}$ 做一步施密特正交化，并单位化。
>
> > [!ANSWER] 看答案
> > $\beta_1=(1,0)^{\mathsf{T}}$，$\beta_2=\alpha_2-(\alpha_2,\beta_1)\beta_1=(1,1)^{\mathsf{T}}-(1,0)^{\mathsf{T}}=(0,1)^{\mathsf{T}}$。单位化后就是 $e_1=(1,0)^{\mathsf{T}}$、$e_2=(0,1)^{\mathsf{T}}$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $V$ 是实线性空间。内积是 $V\times V\to\mathbb{R}$ 的二元函数，满足对称性、对第一变量的线性性与正定性。由 $\|\alpha\|=\sqrt{(\alpha,\alpha)}$ 定义范数，Cauchy–Schwarz 不等式 $|(\alpha,\beta)|\le\|\alpha\|\|\beta\|$ 成立。若 $(\alpha,\beta)=0$，称 $\alpha$ 与 $\beta$ 正交。有限维空间中，任意线性无关组都可通过 Gram–Schmidt 过程化为标准正交组，且不改变张成的子空间。满足 $Q^{\mathsf{T}}Q=E$ 的实方阵称为正交矩阵，它保持内积不变。
