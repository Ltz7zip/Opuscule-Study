---
slug: "eigen"
subject: "la"
unit: "u05"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 线性代数 · 专业模式"
title: "特征值与特征向量"
subtitle: "哪些方向不会被扳弯"
minutes: 15
meta: ["阅读 15 分钟","需要 行列式","掌握级"]
concepts: ["eigens", "det"]
prereq: ["det"]
related: ["similar", "quadratic"]
---

## 本讲目标

学完这一讲，你能写出特征方程 $|A-\lambda E|=0$、手算 $2\times2$ 与 $3\times3$ 矩阵的特征值，并为每个特征值求出一组特征向量。

更重要的是，你要能读出特征值的含义：它衡量一个方向被拉长或压短了多少，而方向本身没有改变。

## 三行回顾

- 行列式为零，等价于矩阵把某个非零向量压成了零，也等价于矩阵不可逆。
- 线性相关说的是：一组向量里有一个是其余的线性组合。
- 矩阵是一个线性变换，它把整个空间搬到另一个位置。

## 问题

大多数向量经过一个线性变换后，方向都会改变。但总有一些特殊方向，变换只把它们沿原方向伸缩，不转弯。

这样的方向就是特征向量，伸缩倍数就是特征值。找到它们，等于找到了这个变换的“骨架”：在由特征向量组成的基下，变换的矩阵变成对角形，所有动作只是各个方向独立地伸缩。

问题于是落成一个方程：

$$
A x=\lambda x,\qquad x\neq 0.
$$

移项得 $(A-\lambda E)x=0$。要让这个齐次方程组有非零解，系数矩阵必须不可逆，于是

$$
|A-\lambda E|=0.
$$

这就是特征方程。它是一个关于 $\lambda$ 的 $n$ 次多项式方程，解出来的 $\lambda$ 就是特征值；把每个 $\lambda$ 代回去解 $(A-\lambda E)x=0$，得到的就是对应的特征向量。

## 直觉

把矩阵想成一台机器。输入一个向量，输出另一个向量。多数向量进去再出来，方向偏了；特征向量进去再出来，只是变长或变短。

特征值的符号也有意思：正的表示同向伸缩，负的表示反向伸缩，零表示这个方向被压扁了。所以只要有一个特征值为零，矩阵就不可逆——它把某个非零方向压没了。

还有两条几乎不用算就能用的检查：

$$
\lambda_1+\lambda_2+\cdots+\lambda_n=\operatorname{tr}(A),\qquad
\lambda_1\lambda_2\cdots\lambda_n=|A|.
$$

特征值之和等于迹（对角元之和），之积等于行列式。手算完特征值，拿这两条对一遍，能抓住大部分算术错误。

## 手算一次

先看一个 $2\times2$ 的例子：

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

特征方程为

$$
|A-\lambda E|=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-1)(\lambda-3)=0,
$$

所以 $\lambda_1=1$，$\lambda_2=3$。求特征向量：$\lambda=1$ 时，

$$
A-E=\begin{pmatrix}1&1\\1&1\end{pmatrix},
$$

方程 $x_1+x_2=0$，取 $x=(1,-1)^{\mathsf{T}}$。$\lambda=3$ 时，

$$
A-3E=\begin{pmatrix}-1&1\\1&-1\end{pmatrix},
$$

方程 $x_1=x_2$，取 $x=(1,1)^{\mathsf{T}}$。验算：迹 $=4=1+3$，行列式 $=3=1\times3$。

再看一个 $3\times3$ 的例子：

$$
A=\begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}.
$$

$$
|A-\lambda E|=\begin{vmatrix}-\lambda&1&1\\1&-\lambda&1\\1&1&-\lambda\end{vmatrix}
=-\lambda(\lambda^2-1)+(\lambda+1)+(\lambda+1)
=-\lambda^3+3\lambda+2.
$$

令它为零，即 $\lambda^3-3\lambda-2=0$。分解：

$$
\lambda^3-3\lambda-2=(\lambda-2)(\lambda+1)^2,
$$

所以特征值是 $2,-1,-1$。$\lambda=2$ 时，$A-2E$ 的三行都在说 $x_1=x_2=x_3$，取 $(1,1,1)^{\mathsf{T}}$。$\lambda=-1$ 时，$A+E$ 是三行全为 $1$ 的矩阵，只有一个方程 $x_1+x_2+x_3=0$，可以取两个线性无关的解 $(1,-1,0)^{\mathsf{T}}$ 与 $(1,0,-1)^{\mathsf{T}}$。

检查：迹 $=0=2-1-1$，行列式 $=2=2\times(-1)\times(-1)$。

## 三个常见误解

> [!MYTH] 实矩阵的特征值一定是实数。
> 旋转 $90^\circ$ 的矩阵 $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ 的特征方程是 $\lambda^2+1=0$，特征值为 $\pm\mathrm{i}$。实矩阵完全可以有复特征值。

> [!MYTH] 一个 $n$ 阶矩阵一定有 $n$ 个线性无关的特征向量。
> 重根时可能不够。$\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 只有 $\lambda=1$，而 $A-E$ 的秩为 $1$，只有一个独立特征向量。

> [!MYTH] 零向量也是特征向量。
> 定义要求 $x\neq 0$。零向量对任何 $\lambda$ 都满足 $A0=\lambda0$，若允许它，特征值就失去意义了。

## 练习

> [!PRACTICE] 1 · 上三角矩阵
> 求 $A=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ 的特征值与特征向量。
>
> > [!ANSWER] 看答案
> > $|A-\lambda E|=(1-\lambda)(2-\lambda)$，特征值 $1,2$。$\lambda=1$ 时 $x_2=0$，取 $(1,0)^{\mathsf{T}}$；$\lambda=2$ 时 $x_1=x_2$，取 $(1,1)^{\mathsf{T}}$。

> [!PRACTICE] 2 · 用迹与行列式检查
> $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$，求特征值。
>
> > [!ANSWER] 看答案
> > 迹为 $6$，行列式为 $8$，解 $\lambda^2-6\lambda+8=0$ 得 $\lambda=4,2$。对应特征向量为 $(1,1)^{\mathsf{T}}$ 与 $(1,-1)^{\mathsf{T}}$。

> [!PRACTICE] 3 · 零特征值
> 证明：$\lambda=0$ 是 $A$ 的特征值，当且仅当 $A$ 不可逆。
>
> > [!ANSWER] 看答案
> > $\lambda=0$ 是特征值，等价于存在 $x\neq0$ 使 $Ax=0$，即齐次方程有非零解，等价于 $|A|=0$，也就是 $A$ 不可逆。

## 严格表述

> [!FORMAL] 严格表述
> 设 $A$ 是 $n$ 阶实方阵。若存在数 $\lambda$ 与非零向量 $x$ 使 $Ax=\lambda x$，则称 $\lambda$ 为 $A$ 的特征值，$x$ 为属于 $\lambda$ 的特征向量。特征值是特征多项式 $p(\lambda)=|A-\lambda E|$ 的根；属于 $\lambda$ 的特征向量加上零向量构成特征子空间 $N(A-\lambda E)$。特征多项式展开后，$\lambda^{n-1}$ 的系数为 $-\operatorname{tr}(A)$，常数项为 $(-1)^n|A|$，由此得到特征值之和等于迹、之积等于行列式。
