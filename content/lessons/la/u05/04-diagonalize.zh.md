---
slug: "diagonalize"
subject: "la"
unit: "u05"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 线性代数 · 专业模式"
title: "对称矩阵的对角化"
subtitle: "正交矩阵把对称矩阵摆平"
minutes: 14
meta: ["阅读 14 分钟","需要 相似矩阵 · 内积","掌握级"]
concepts: ["similar", "innerprod"]
prereq: ["similar", "innerprod"]
related: ["quadratic", "eigens"]
---

## 本讲目标

学完这一讲，你能说清实对称矩阵为什么一定能对角化、为什么它的特征向量可以选成两两正交，并手算一个 $2\times2$ 对称矩阵的正交对角化。

最后你会看到 $A=Q\Lambda Q^{\mathsf{T}}$ 这个分解，它是下一讲二次型标准形的直接工具。

## 三行回顾

- 相似矩阵是同一个变换在不同基下的写法，特征值完全相同。
- 可对角化等价于有 $n$ 个线性无关的特征向量。
- 内积为零就是正交；正交矩阵满足 $Q^{\mathsf{T}}Q=E$，保持长度与夹角。

## 问题

一般的实矩阵可能有两个麻烦：特征值跑出实数范围，或者重根时特征向量不够。

实对称矩阵把这两个麻烦一起解决。它有两个强得出奇的结论：

- 特征值全是实数；
- 属于不同特征值的特征向量自动正交。

第二条值得推一遍。设 $Ap_1=\lambda_1p_1$，$Ap_2=\lambda_2p_2$，且 $A^{\mathsf{T}}=A$。那么

$$
\lambda_1(p_1,p_2)=(Ap_1,p_2)=(p_1,Ap_2)=\lambda_2(p_1,p_2).
$$

中间那步用了对称性。移项得 $(\lambda_1-\lambda_2)(p_1,p_2)=0$；只要 $\lambda_1\neq\lambda_2$，就必须 $(p_1,p_2)=0$。

于是不同特征值的特征向量天然正交；同一个特征值内部若有多个方向，再用施密特正交化整理一下。把所有特征向量单位化后按列排成 $Q$，就得到

$$
Q^{\mathsf{T}}AQ=\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\qquad
A=Q\Lambda Q^{\mathsf{T}}.
$$

## 直觉

对称矩阵对应的变换是“自伴”的：它在任何方向上的作用，都和对面的方向对称。几何上，它把单位球压成一个椭球，而椭球的几条主轴恰好互相垂直。

对角化就是在找这几条主轴。$Q$ 的列是主轴方向，$\Lambda$ 的对角元是主轴长度平方的倒数（或伸缩倍数）。因为主轴天生垂直，所以 $Q$ 是正交矩阵，不需要额外凑。

写成 $A=\sum_i\lambda_iq_iq_i^{\mathsf{T}}$，就是把这些主轴的作用一条条加起来。每一项 $q_iq_i^{\mathsf{T}}$ 是一个秩一投影，把向量投到第 $i$ 条主轴上，再乘上对应的伸缩倍数。

## 手算一次

取

$$
A=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

它是对称矩阵。特征方程：

$$
|A-\lambda E|=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-3)(\lambda-1)=0,
$$

所以 $\lambda_1=3$，$\lambda_2=1$。

$\lambda=3$ 时，

$$
A-3E=\begin{pmatrix}-1&-1\\-1&-1\end{pmatrix},
$$

方程 $x_1+x_2=0$，取 $p_1=(1,-1)^{\mathsf{T}}$。$\lambda=1$ 时，

$$
A-E=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
$$

方程 $x_1-x_2=0$，取 $p_2=(1,1)^{\mathsf{T}}$。两者内积 $1-1=0$，确实正交。

单位化：

$$
q_1=\frac{1}{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix},\qquad
q_2=\frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},\qquad
Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}.
$$

验算 $Q^{\mathsf{T}}Q=E$：两列长度都是 $1$，内积为 $0$。再验算对角化：

$$
Aq_1=\frac{1}{\sqrt2}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}
=\frac{3}{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix}=3q_1,
$$

同理 $Aq_2=q_2$，所以 $Q^{\mathsf{T}}AQ=\operatorname{diag}(3,1)$。最后检查谱分解：

$$
3q_1q_1^{\mathsf{T}}+1q_2q_2^{\mathsf{T}}
=\frac32\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
+\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}
=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

## 三个常见误解

> [!MYTH] 所有实矩阵都能正交对角化。
> 只有实对称矩阵才有这个保证。$\begin{pmatrix}1&1\\0&2\end{pmatrix}$ 有实特征值 $1,2$，但特征向量不正交，$Q^{\mathsf{T}}AQ$ 做不到对角。

> [!MYTH] 实对称矩阵的特征向量一定两两正交。
> 不同特征值的特征向量才自动正交。重根时，同一个特征子空间里可以任取一组基，它们未必正交，需要再做一次施密特正交化。

> [!MYTH] 正交矩阵就是行列式等于 $1$ 的矩阵。
> 正交矩阵的行列式只能是 $\pm1$；反过来不成立。$\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 的行列式为 $1$，但两列并不正交。

## 练习

> [!PRACTICE] 1 · 正交对角化
> 把 $A=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ 正交对角化。
>
> > [!ANSWER] 看答案
> > 特征值为 $2$ 与 $0$，对应特征向量 $(1,1)^{\mathsf{T}}$ 与 $(1,-1)^{\mathsf{T}}$。取 $Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，则 $Q^{\mathsf{T}}AQ=\operatorname{diag}(2,0)$。

> [!PRACTICE] 2 · 直接写结果
> 设 $A$ 是 $3$ 阶实对称矩阵，特征值为 $-2,5,5$。写出 $Q^{\mathsf{T}}AQ$。
>
> > [!ANSWER] 看答案
> > $\operatorname{diag}(-2,5,5)$。$Q$ 的列要按这个顺序排列；重根 $5$ 的两个特征向量还需在特征子空间内正交化。

> [!PRACTICE] 3 · 验证正交性
> 判断 $Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ 是否为正交矩阵，并求 $\det Q$。
>
> > [!ANSWER] 看答案
> > 两列长度为 $1$，内积 $\frac12(1-1)=0$，所以 $Q^{\mathsf{T}}Q=E$，是正交矩阵。$\det Q=\frac12(-1-1)=-1$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $A$ 是 $n$ 阶实对称矩阵。则 $A$ 的特征值全为实数，且属于不同特征值的特征向量互相正交。存在正交矩阵 $Q$ 使 $Q^{\mathsf{T}}AQ=\Lambda$，其中 $\Lambda$ 是实对角矩阵；等价地 $A=Q\Lambda Q^{\mathsf{T}}=\sum_{i=1}^{n}\lambda_iq_iq_i^{\mathsf{T}}$，$q_i$ 是 $Q$ 的第 $i$ 列。这就是实对称矩阵的谱定理。
