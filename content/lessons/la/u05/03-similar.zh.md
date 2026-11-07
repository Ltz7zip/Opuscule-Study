---
slug: "similar"
subject: "la"
unit: "u05"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 线性代数 · 专业模式"
title: "相似矩阵"
subtitle: "同一个变换的两套写法"
minutes: 13
meta: ["阅读 13 分钟","需要 特征值与特征向量","掌握级"]
concepts: ["similar", "eigens"]
prereq: ["eigens"]
related: ["coordchange", "quadratic"]
---

## 本讲目标

学完这一讲，你能判断两个矩阵是否相似、说出相似矩阵共享哪些量，并判断一个矩阵能不能对角化；能对角化时，你要能把过渡矩阵 $P$ 写出来。

这一讲的核心只有一句话：相似矩阵是同一个线性变换在两套基下的两套写法。

## 三行回顾

- 特征值描述的是变换在某个特殊方向上的伸缩倍数。
- 同一个变换，换一组基，矩阵就会变，但它描述的事情没有变。
- 还没解决的问题是：哪些矩阵可以换成对角形，换的时候那组基怎么找。

## 问题

矩阵不是变换本身，而是变换在某一组基下的坐标写法。基一换，矩阵就换。于是自然要问：同一个变换的两套写法之间，差的是什么？

答案是一个可逆矩阵。设旧基下变换的矩阵是 $A$，新基下的矩阵是 $B$，两组基之间的过渡矩阵是 $P$，则

$$
B=P^{-1}AP.
$$

满足这个关系的 $A$、$B$ 称为相似，记作 $A\sim B$。$P$ 的每一列，就是新基向量在旧基下的坐标。

既然只是换了写法，那么与“写法”无关的量就应该保持不变。特征多项式首当其冲：

$$
|B-\lambda E|=|P^{-1}AP-\lambda E|=|P^{-1}(A-\lambda E)P|=|A-\lambda E|.
$$

行列式因子 $|P^{-1}|\,|P|=1$，中间的 $P^{-1}$ 与 $P$ 正好抵消。于是相似矩阵有相同的特征多项式、相同的特征值、相同的迹、相同的行列式，秩也相同。

## 直觉

把矩阵想成一份说明书，基想成一种语言。同一台机器，用中文写一遍、用英文写一遍，文字不同，机器不变。

换基就是翻译。翻译不会改变机器的参数，只会改变参数写在哪一页。所以特征值、行列式、秩这些“机器本身的参数”必须保持一致。

那什么样的写法最省事？对角线写法。对角矩阵把每个坐标轴独立地伸缩，没有互相牵连。如果一个变换能找到一组基，使每个基向量都只被伸缩、不被转弯，那么这组基就是特征向量，矩阵就变成对角形。

所以“可对角化”翻译过来就是：**能找到 $n$ 个线性无关的特征向量**。把它们按列排成 $P$，则

$$
P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

## 手算一次

判断

$$
A=\begin{pmatrix}3&1\\0&2\end{pmatrix}
$$

是否可对角化，并写出 $P$。

先求特征值。上三角矩阵的特征值就在对角线上：$\lambda_1=3$，$\lambda_2=2$。

求 $\lambda=3$ 的特征向量：

$$
A-3E=\begin{pmatrix}0&1\\0&-1\end{pmatrix},
$$

只有 $x_2=0$，取 $p_1=(1,0)^{\mathsf{T}}$。求 $\lambda=2$ 的特征向量：

$$
A-2E=\begin{pmatrix}1&1\\0&0\end{pmatrix},
$$

即 $x_1+x_2=0$，取 $p_2=(1,-1)^{\mathsf{T}}$。两个特征值不同，特征向量自动线性无关，所以可对角化。

令

$$
P=(p_1,p_2)=\begin{pmatrix}1&1\\0&-1\end{pmatrix},\qquad
P^{-1}=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
$$

直接验算：

$$
AP=\begin{pmatrix}3&1\\0&2\end{pmatrix}\begin{pmatrix}1&1\\0&-1\end{pmatrix}
=\begin{pmatrix}3&2\\0&-2\end{pmatrix},
$$

$$
P^{-1}AP=\begin{pmatrix}1&1\\0&-1\end{pmatrix}\begin{pmatrix}3&2\\0&-2\end{pmatrix}
=\begin{pmatrix}3&0\\0&2\end{pmatrix}.
$$

对角线上正好是两个特征值。作为对照，$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 的特征值只有 $1$，而 $A-E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ 的秩为 $1$，只能解出一维特征子空间，凑不出两个独立特征向量，所以它不可对角化。

## 三个常见误解

> [!MYTH] 相似就是相等，或者至少长得很像。
> 相似矩阵常常一点都不像。$\begin{pmatrix}3&0\\0&2\end{pmatrix}$ 与 $\begin{pmatrix}3&1\\0&2\end{pmatrix}$ 相似，但一个是对角形，一个不是。相似说的是“同一个变换”，不是“同一堆数字”。

> [!MYTH] 相似矩阵的特征向量也相同。
> 特征值相同，特征向量要跟着基一起换。若 $Ax=\lambda x$，则 $B(P^{-1}x)=\lambda(P^{-1}x)$：新矩阵的特征向量是旧特征向量在新基下的坐标。

> [!MYTH] 只要特征值有 $n$ 个（计重数），就一定可对角化。
> 重根时几何重数可能小于代数重数。$\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 有两个计重数的特征值 $1$，却只有一个独立特征向量，仍然不可对角化。

## 练习

> [!PRACTICE] 1 · 不变量
> 设 $B=P^{-1}AP$，证明 $|B|=|A|$ 且 $\operatorname{tr}(B)=\operatorname{tr}(A)$。
>
> > [!ANSWER] 看答案
> > $|B|=|P^{-1}||A||P|=|A|$。迹用 $\operatorname{tr}(XY)=\operatorname{tr}(YX)$：$\operatorname{tr}(P^{-1}AP)=\operatorname{tr}(APP^{-1})=\operatorname{tr}(A)$。

> [!PRACTICE] 2 · 写过渡矩阵
> 把 $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ 对角化。
>
> > [!ANSWER] 看答案
> > 特征值为 $3$ 与 $-1$，对应特征向量 $(1,1)^{\mathsf{T}}$ 与 $(1,-1)^{\mathsf{T}}$。取 $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，则 $P^{-1}AP=\operatorname{diag}(3,-1)$。

> [!PRACTICE] 3 · 判断不可对角化
> 说明 $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 不可对角化。
>
> > [!ANSWER] 看答案
> > 特征值只有 $\lambda=1$。$A-E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ 的秩为 $1$，特征子空间维数为 $2-1=1$，凑不出两个线性无关的特征向量。

## 严格表述

> [!FORMAL] 严格表述
> 设 $A,B$ 是 $n$ 阶方阵。若存在可逆矩阵 $P$ 使 $B=P^{-1}AP$，则称 $A$ 与 $B$ 相似。相似是一个等价关系，且相似矩阵有相同的特征多项式、特征值、迹、行列式与秩。$A$ 可对角化，当且仅当 $A$ 有 $n$ 个线性无关的特征向量；此时以它们为列构成 $P$，便有 $P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。等价地，每个特征值的几何重数等于代数重数。
