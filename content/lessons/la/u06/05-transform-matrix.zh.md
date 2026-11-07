---
slug: "transform-matrix"
subject: "la"
unit: "u06"
order: 5
mode: "mastery"
lang: "zh"
kicker: "第 5 讲 · 线性代数 · 专业模式"
title: "线性变换的矩阵表示"
subtitle: "一个变换，一张矩阵"
minutes: 16
meta: ["阅读 16 分钟","需要 线性变换与矩阵","掌握级"]
concepts: ["lintransform", "matrix"]
prereq: ["linmap", "matrix"]
related: ["coordchange", "similar"]
---

## 本讲目标

第 4 讲把线性变换定义为保持加法与数乘的映射，但一直没给它一个可计算的外壳。这一讲补上：固定一组基，线性变换就变成一张矩阵；变换的复合变成矩阵乘法；换一组基，矩阵做相似变换。

学完这一讲，你能写出线性变换在给定基下的矩阵，能解释为什么复合对应乘法，能区分线性变换的秩与核，也能看懂相似矩阵为什么描述的是同一个变换。

## 三行回顾

- 线性变换保持加法与数乘：$T(u+v) = Tu + Tv$，$T(ku) = kTu$。
- 线性变换由它在基上的取值完全决定。
- 同一个变换在不同基下的矩阵互为相似。

## 问题

设 $T$ 是平面上的线性变换。它把 $(1,0)$ 送到 $(2,1)$，把 $(0,1)$ 送到 $(1,-3)$。那么它把任意 $(x,y)$ 送到哪里？

因为 $T$ 线性，$(x,y) = x(1,0) + y(0,1)$，所以 $T(x,y) = xT(1,0) + yT(0,1) = x(2,1) + y(1,-3) = (2x+y, x-3y)$。这说明：只要知道基向量被送到哪里，整个变换就确定了。把这些像按列排起来，就得到矩阵。

问题是，如果基不是标准基，矩阵该怎么写？换了基之后，同一张矩阵还会一样吗？

## 直觉

设 $T: V \to V$ 是线性变换，$B = (b_1, \dots, b_n)$ 是一组基。把每个基向量的像 $Tb_j$ 用 $B$ 表示：

$$
Tb_j = a_{1j}b_1 + a_{2j}b_2 + \cdots + a_{nj}b_n
$$

把系数按列排成矩阵 $A = (a_{ij})$，就称 $A$ 为 $T$ 在基 $B$ 下的矩阵。它的第 $j$ 列就是 $Tb_j$ 的坐标。于是对任意向量 $v = (b_1,\dots,b_n)x$，

$$
Tv = (b_1,\dots,b_n) A x
$$

也就是说，**坐标的变换由左乘 $A$ 完成**：$[Tv]_B = A [v]_B$。矩阵不是变换本身，而是变换在某组基下的照片。

为什么复合对应矩阵乘法？设 $S$ 的矩阵为 $B$，$T$ 的矩阵为 $A$。先作用 $S$ 再作用 $T$，坐标为

$$
x \xrightarrow{B} Bx \xrightarrow{A} A(Bx) = (AB)x
$$

所以 $T \circ S$ 的矩阵是 $AB$。顺序不能反，因为矩阵乘法一般不交换，而变换的复合本来就依赖先后。

换基时，若过渡矩阵为 $P$，则新矩阵为

$$
A' = P^{-1} A P
$$

这与第 3 讲的结论一致。$A$ 与 $A'$ 称为相似。相似矩阵的行列式、秩、迹都相同，因为它们描述同一个变换，只是换了观察角度。

线性变换的**核**是全体被送到零的向量，$\ker T = \{v : Tv = 0\}$；**像**是全体输出，$\operatorname{im} T = \{Tv\}$。核的维数叫零度，像的维数叫秩。矩阵版本就是 $n - r(A)$ 与 $r(A)$，且

$$
\dim \ker T + \dim \operatorname{im} T = \dim V
$$

> [!NOTE]
> 写变换矩阵时，定义域与陪域要用同一组基，列才是“像的坐标”。若两边基不同，得到的是另一类矩阵，公式要相应调整。

## 手算一次

设 $T(x,y) = (2x + y, x - 3y)$，取基

$$
b_1 = (1,1), \qquad b_2 = (1,-1)
$$

先算像：

$$
Tb_1 = (2 \cdot 1 + 1, 1 - 3 \cdot 1) = (3, -2)
$$

$$
Tb_2 = (2 \cdot 1 - 1, 1 - 3 \cdot (-1)) = (1, 4)
$$

再把它们用 $b_1, b_2$ 表示。设 $Tb_1 = \alpha b_1 + \beta b_2$，则

$$
\alpha + \beta = 3, \qquad \alpha - \beta = -2
$$

两式相加得 $2\alpha = 1$，$\alpha = \tfrac12$；相减得 $2\beta = 5$，$\beta = \tfrac52$。所以 $Tb_1$ 的坐标是 $(\tfrac12, \tfrac52)$。

再设 $Tb_2 = \gamma b_1 + \delta b_2$：

$$
\gamma + \delta = 1, \qquad \gamma - \delta = 4
$$

得 $\gamma = \tfrac52$、$\delta = -\tfrac32$。按列排起来：

$$
A' = \begin{pmatrix}
\tfrac12 & \tfrac52 \\[2pt]
\tfrac52 & -\tfrac32
\end{pmatrix}
$$

用相似公式复核。标准基下的矩阵是 $A = \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix}$，过渡矩阵 $P = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$，其逆为 $P^{-1} = \tfrac12 \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$。计算

$$
AP = \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} = \begin{pmatrix} 3 & 1 \\ -2 & 4 \end{pmatrix}
$$

$$
P^{-1}AP = \frac12 \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} 3 & 1 \\ -2 & 4 \end{pmatrix} = \frac12 \begin{pmatrix} 1 & 5 \\ 5 & -3 \end{pmatrix}
$$

与 $A'$ 完全一致。

最后看秩与核。$\det A = 2 \cdot (-3) - 1 \cdot 1 = -7 \neq 0$，所以 $A$ 可逆，$r(A) = 2$。于是 $\ker T = \{(0,0)\}$，零度为 $0$，像的维数为 $2$，整个平面都是像。若换成 $T(x,y) = (x+y, 2x+2y)$，矩阵行列式为 $0$，核是直线 $x + y = 0$，零度为 $1$，秩为 $1$，像也是一条直线。

## 三个常见误解

> [!MYTH] 线性变换的矩阵是唯一的。
> 不唯一。固定一组基才唯一。换基后矩阵变为 $P^{-1}AP$，一般不同，但描述的是同一个变换。

> [!MYTH] 不同基下的矩阵一定不相等。
> 可能相等。若 $A$ 与所有可逆 $P$ 都交换，例如数量矩阵 $cI$，则换任何基矩阵都不变。

> [!MYTH] 线性变换的秩等于矩阵元素的个数。
> 秩是像空间的维数，也就是矩阵的秩。它不可能超过定义域的维数 $n$，与元素个数 $mn$ 无关。

## 练习

> [!PRACTICE] 1 · 标准基下的矩阵
> $T(x,y) = (3x - y, 2y)$，写出它在标准基下的矩阵。
>
> > [!ANSWER] 看答案
> > $T(1,0) = (3,0)$，$T(0,1) = (-1,2)$，故 $A = \begin{pmatrix} 3 & -1 \\ 0 & 2 \end{pmatrix}$。

> [!PRACTICE] 2 · 复合顺序
> $S$ 的矩阵为 $B$，$T$ 的矩阵为 $A$。先 $T$ 后 $S$ 的矩阵是什么？
>
> > [!ANSWER] 看答案
> > 先 $T$ 后 $S$ 是 $S \circ T$，坐标为 $x \mapsto Ax \mapsto B(Ax) = (BA)x$，矩阵为 $BA$。

> [!PRACTICE] 3 · 核与秩
> $T(x,y,z) = (x-y, y-z, x-z)$，求核的维数与秩。
>
> > [!ANSWER] 看答案
> > 矩阵行向量满足第三行等于前两行之和，秩为 $2$。定义域维数为 $3$，故零度为 $3 - 2 = 1$。核由 $x = y = z$ 给出，基为 $(1,1,1)$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $T: V \to V$ 线性，$B = (b_1, \dots, b_n)$ 为基，$Tb_j = \sum_i a_{ij}b_i$，则 $A = (a_{ij})$ 为 $T$ 在 $B$ 下的矩阵，且 $[Tv]_B = A[v]_B$。若 $S$ 的矩阵为 $B$，则 $T \circ S$ 的矩阵为 $AB$。换基 $P$ 后 $A' = P^{-1}AP$。核 $\ker T$ 与像 $\operatorname{im}T$ 满足 $\dim\ker T + \dim\operatorname{im}T = \dim V$，其中 $\dim\operatorname{im}T = r(A)$。
