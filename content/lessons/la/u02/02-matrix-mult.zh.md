---
slug: "matrix-mult"
subject: "la"
unit: "u02"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 线性代数 · 专业模式"
title: "矩阵乘法"
subtitle: "行与列握手的那个动作"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["matrix", "la"]
prereq: ["elem"]
related: ["la", "matrix", "backprop"]
---

## 本讲目标

学完这一讲，你能判断两个矩阵能不能相乘、手算任意规模的小矩阵、并说清楚为什么深度学习里的每一次前向与反向，本质都是同一件事。

这一讲只做三件事：把乘法定义成逐项求和、把形状规则变成条件反射、把"乘法 = 列的线性组合"这层理解建立起来。

## 三行回顾

- 矩阵不是一张数字表格，而是一个线性变换：它把向量搬到另一个向量。
- 矩阵乘法就是"先做一个变换，再做另一个变换"。
- 所以乘法不满足交换律，也常常不满足"随便什么形状都能乘"。

## 一个元素怎么算

设 $A$ 是 $m \times n$ 矩阵，$B$ 是 $n \times p$ 矩阵，乘积 $C = AB$ 是 $m \times p$ 矩阵。$C$ 的第 $i$ 行第 $j$ 列，由 $A$ 的第 $i$ 行与 $B$ 的第 $j$ 列"逐项相乘再相加"得到：

$$
c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}
$$

把 $n = 3$ 展开，就是最常见的手算动作：

$$
c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + a_{i3}b_{3j}
$$

注意两件事。第一，求和指标 $k$ 同时走过左矩阵的列和右矩阵的行，所以两者的长度必须相等——这就是形状规则的全部来源。第二，$c_{ij}$ 只跟 $A$ 的第 $i$ 行、$B$ 的第 $j$ 列有关，行与行、列与列之间互不干扰，这正是一次矩阵乘法能被切成许多独立小任务的原因。

## 形状规则与代价

乘法合法，只看一件事：**左矩阵的列数等于右矩阵的行数**。写成 $(m \times n)(n \times p) = m \times p$，中间那个 $n$ 必须对上，结果只剩两端的 $m$ 和 $p$。

| 左矩阵 | 右矩阵 | 能乘吗 | 结果形状 |
| --- | --- | --- | --- |
| $2 \times 3$ | $3 \times 4$ | 能 | $2 \times 4$ |
| $3 \times 2$ | $3 \times 4$ | 不能 | — |
| $3 \times 2$ | $2 \times 3$ | 能 | $3 \times 3$ |
| $1 \times n$ | $n \times 1$ | 能 | $1 \times 1$（一个数） |

最后一行值得单独记住：行向量乘列向量就是**点积**。而 $A$ 乘一个列向量 $x$，相当于把 $A$ 的每一行都跟 $x$ 做一次点积。

代价也要心里有数。算完 $m \times p$ 个元素，每个元素要做 $n$ 次乘法，所以乘法次数是 $mnp$。两个 $1000 \times 1000$ 的矩阵相乘，需要 $10^9$ 次乘法——这就是为什么矩阵库会把这件事切块、并行、再用 Strassen 之类的算法把量级压下来。

## 乘法是列的线性组合

把 $B$ 按列拆成 $b_1, b_2, \dots, b_p$，则 $AB$ 的第 $j$ 列恰好是 $A b_j$：

$$
A B = A\,[\,b_1 \; b_2 \; \cdots \; b_p\,] = [\,A b_1 \; A b_2 \; \cdots \; A b_p\,]
$$

更基本的一层是：$Ax$ 就是把 $A$ 的各列按 $x$ 的分量加权相加。

$$
A x = x_1 \begin{bmatrix} a_{11} \\ a_{21} \\ \vdots \\ a_{m1} \end{bmatrix} + x_2 \begin{bmatrix} a_{12} \\ a_{22} \\ \vdots \\ a_{m2} \end{bmatrix} + \cdots + x_n \begin{bmatrix} a_{1n} \\ a_{2n} \\ \vdots \\ a_{mn} \end{bmatrix}
$$

这条式子解释了矩阵乘法的全部含义：$A$ 的列是"原材料的几个方向"，$x$ 是"每个方向要多少"，$Ax$ 就是按配方调出来的那个向量。它也立刻说明：无论 $A$ 多大，$Ax$ 永远落在 $A$ 的列张成的空间里。

由此还能看出结合律为什么成立、交换律为什么不成立。$(AB)C$ 与 $A(BC)$ 都在描述"依次做三个变换"，只是括号不同；而 $AB$ 与 $BA$ 是两种不同顺序的变换，除非 $A$、$B$ 恰好可交换，否则结果不同。

## 单位矩阵、转置与逆

单位矩阵 $I_n$ 是 $n \times n$ 的对角线上全是 $1$、其余全为 $0$ 的矩阵，它表示的变换是"什么都不做"：

$$
I_n A = A, \qquad A I_n = A, \qquad I_n x = x
$$

转置把行与列互换。它对乘积的作用是**反序**的，这条性质在反向传播里天天用到：

$$
(AB)^{\mathsf{T}} = B^{\mathsf{T}} A^{\mathsf{T}}
$$

逆矩阵 $A^{-1}$ 满足 $A^{-1}A = AA^{-1} = I$，它把变换撤回来。但逆不是万能钥匙：只有方阵才谈得上逆，而且很多方阵（例如把两个不同向量压到同一个向量的变换）根本没有逆。此时只能求 Moore–Penrose 伪逆，或者改用最小二乘。

## 为什么反向传播里全是它

一层神经网络做的事情可以写成

$$
y = W x + b, \qquad L = \ell(y)
$$

其中 $W$ 是 $d_{\text{out}} \times d_{\text{in}}$ 的权重。反向传播要的是损失对权重的梯度。由链式法则，$L$ 对 $W$ 的梯度是一个与 $W$ 同形状的矩阵，它的第 $i$ 行第 $j$ 列等于 $\delta_i x_j$，其中 $\delta = \partial L / \partial y$：

$$
\frac{\partial L}{\partial W} = \delta\, x^{\mathsf{T}}, \qquad \frac{\partial L}{\partial b} = \delta
$$

一个外积，就完成了整个权重的更新方向。批量训练时把 $x$ 堆成 $X \in \mathbb{R}^{n \times d_{\text{in}}}$，前向就是一次形状为 $(n \times d_{\text{in}})(d_{\text{in}} \times d_{\text{out}})$ 的乘法，反向是另一次乘以转置的乘法。所谓"深度学习框架的自动微分"，在矩阵层面就是反复执行本讲第 3 节的那条求和式，再加上一层转置。

> [!MYTH] 形状对不上时先检查谁？
> 先看梯度是不是左乘还是右乘弄反了。$W$ 是 $d_{\text{out}} \times d_{\text{in}}$，那么 $x^{\mathsf{T}}$ 必须在右边，$\delta$ 在左边，结果才回到 $d_{\text{out}} \times d_{\text{in}}$。

## 四个常见误解

> [!MYTH] $AB$ 一定等于 $BA$。
> 一般不成立，甚至常常一个能乘、另一个不能乘。形状就已经说明问题了。

> [!MYTH] 矩阵乘法要对应位置相乘。
> 对应位置相乘叫 Hadamard 积，记作 $A \odot B$，是完全另一回事。矩阵乘法是行乘列再求和。

> [!MYTH] 矩阵就是一堆数字。
> 数字只是表示。同一个变换换一组基，矩阵会变，但它描述的事情没变。

> [!MYTH] 有了逆矩阵就可以随便除。
> 只有可逆方阵才有逆，而且数值上直接求逆往往比解方程更慢、更不稳定。

## 练习

> [!PRACTICE] 1 · 判断形状
> $A$ 是 $4 \times 2$，$B$ 是 $2 \times 5$。$AB$ 与 $BA$ 分别是什么形状，哪个不存在？
>
> > [!ANSWER] 看答案
> > $AB$ 是 $4 \times 5$；$BA$ 要求 $5 = 4$，不成立，所以 $BA$ 不存在。

> [!PRACTICE] 2 · 手算一项
> $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$，$B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$，求 $AB$ 的第 2 行第 1 列。
>
> > [!ANSWER] 看答案
> > $c_{21} = 3 \times 5 + 4 \times 7 = 43$。

> [!PRACTICE] 3 · 用列的组合看
> 设 $A = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}$，$x = \begin{bmatrix} 3 \\ 5 \end{bmatrix}$。$Ax$ 等于 $A$ 的两列怎么组合？
>
> > [!ANSWER] 看答案
> > $Ax = 3 \begin{bmatrix} 1 \\ 0 \end{bmatrix} + 5 \begin{bmatrix} 0 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ 10 \end{bmatrix}$。

> [!PRACTICE] 4 · 梯度形状
> 某层 $W$ 是 $8 \times 3$，$\delta$ 是 $8 \times 1$，$x$ 是 $3 \times 1$。写出 $\partial L / \partial W$ 的表达式并说明形状。
>
> > [!ANSWER] 看答案
> > $\delta x^{\mathsf{T}}$：$(8 \times 1)(1 \times 3) = 8 \times 3$，与 $W$ 同形。

> [!PRACTICE] 5 · 结合律
> 举一个 $2 \times 2$ 的例子，说明 $AB \neq BA$。
>
> > [!ANSWER] 看答案
> > 取 $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$，$B = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}$，则 $AB = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$，$BA = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$。

> [!FORMAL] 严格表述
> 矩阵乘法是线性映射的复合：若 $T_A : \mathbb{R}^n \to \mathbb{R}^m$、$T_B : \mathbb{R}^p \to \mathbb{R}^n$，则 $T_A \circ T_B$ 的矩阵就是 $AB$。结合律来自映射复合的结合律；分配律来自线性性。可乘条件 $n = n$ 正是复合时中间空间必须一致。
