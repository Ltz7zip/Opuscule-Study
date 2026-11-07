---
slug: "vector-algebra-products"
subject: "calculus"
unit: "u08"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 高等数学 · 专业模式"
title: "向量代数：数量积、向量积与混合积"
subtitle: "三种乘法，三种几何意义"
minutes: 30
meta: ["阅读 30 分钟","需要 平面向量基础","掌握级"]
concepts: ["vectorgeo", "matrix"]
prereq: ["vectorgeo"]
related: ["matrix", "la"]
---

## 本讲目标

平面向量只有一种乘法——数量积。到了空间，情况变了：数量积仍在，但它只回答"夹角与投影"；要回答"法向量与面积"，需要第二种乘法；要回答"体积与共面"，需要把前两种乘法组合起来。这三种运算分别返回数、向量、数，几何意义各不相同。

本讲把空间向量的坐标运算固定下来，重点是三件事：用坐标算夹角与投影，用叉积求同时垂直于两个向量的向量，用混合积判断三点或四点是否共面。

学完这一讲，你应该能够：

- 从余弦定理推出数量积的坐标公式，并解释投影的符号；
- 用行列式算叉积，并说出方向、模、垂直性三者的来源；
- 用混合积算平行六面体体积，并把"体积为零"翻译成"共面"；
- 分清每种积的结果是数还是向量，避免把标量当向量继续运算；
- 在坐标退化、向量平行或垂直时，判断哪些结论仍然成立。

## 三行回顾

- 数量积 $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$ 是数，用来算夹角、投影与做功。
- 向量积 $\mathbf a\times\mathbf b$ 是向量，方向由右手法则确定，模等于平行四边形面积。
- 混合积 $(\mathbf a\times\mathbf b)\cdot\mathbf c$ 是数，绝对值等于平行六面体体积，为零当且仅当三向量共面。

## 为什么空间需要三种乘法

在平面里，两个向量张成一个平行四边形，面积是一个数；这个数可以用 $|\mathbf a||\mathbf b|\sin\theta$ 表示，但在二维坐标里它只是一个行列式，不产生新方向。到了三维，平行四边形所在的平面有一个明确的法方向，叉积正好把这个方向编码成一个向量。

三种乘法对应三类几何问题：

- **投影与夹角**：一个向量在另一个方向上有多长？两个方向差多少角度？这需要数量积。
- **法向量与面积**：哪个方向同时垂直于两个已知方向？平行四边形有多大？这需要向量积。
- **体积与共面**：三个方向张成的平行六面体有多大的体积？它们是否躺在一个平面里？这需要混合积。

这三种运算不是彼此独立的技巧，而是一条链：数量积给出投影，叉积给出法向，混合积把叉积的结果再与第三个向量做数量积，于是"底面积乘高"被写成了一个行列式。理解了这条链，就不需要分别背三个公式。

## 坐标、模与单位向量

设

$$
\mathbf a=(a_1,a_2,a_3),\qquad \mathbf b=(b_1,b_2,b_3)
$$

加法与数乘按分量进行：

$$
\mathbf a+\mathbf b=(a_1+b_1,\ a_2+b_2,\ a_3+b_3),\qquad
k\mathbf a=(ka_1,\ ka_2,\ ka_3)
$$

模是

$$
|\mathbf a|=\sqrt{a_1^{2}+a_2^{2}+a_3^{2}}
$$

单位向量是 $\dfrac{\mathbf a}{|\mathbf a|}$，方向与原向量相同，长度为 $1$。若 $\mathbf a\ne\mathbf 0$，记

$$
\mathbf e_{\mathbf a}=\frac{\mathbf a}{|\mathbf a|}
$$

则任何非零向量都可以写成"模乘单位方向"：$\mathbf a=|\mathbf a|\,\mathbf e_{\mathbf a}$。这个分解在求单位法向量、写直线的方向向量时反复用到。

空间中两点 $A(x_1,y_1,z_1)$、$B(x_2,y_2,z_2)$ 的距离是

$$
|AB|=\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}+(z_2-z_1)^{2}}
$$

向量 $\overrightarrow{AB}=(x_2-x_1,\ y_2-y_1,\ z_2-z_1)$。后面所有几何问题，第一步几乎都是"把点变成向量"。

## 数量积：从余弦定理到坐标公式

数量积的几何定义是

$$
\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta
$$

其中 $\theta$ 是两向量之间的夹角，取值范围 $[0,\pi]$。这个定义本身不能直接算，因为夹角通常不知道。坐标公式则给了可计算的形式：

$$
\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3
$$

两者为什么一致？用余弦定理。考虑三角形由 $\mathbf a$、$\mathbf b$、$\mathbf a-\mathbf b$ 构成，则

$$
|\mathbf a-\mathbf b|^{2}=|\mathbf a|^{2}+|\mathbf b|^{2}-2|\mathbf a||\mathbf b|\cos\theta
$$

另一方面，按坐标展开：

$$
|\mathbf a-\mathbf b|^{2}
=(a_1-b_1)^{2}+(a_2-b_2)^{2}+(a_3-b_3)^{2}
=|\mathbf a|^{2}+|\mathbf b|^{2}-2(a_1b_1+a_2b_2+a_3b_3)
$$

比较两式，即得坐标公式。

数量积有三条常用性质：

- **对称**：$\mathbf a\cdot\mathbf b=\mathbf b\cdot\mathbf a$；
- **双线性**：对常数 $\lambda,\mu$，$(\lambda\mathbf a+\mu\mathbf b)\cdot\mathbf c=\lambda\,\mathbf a\cdot\mathbf c+\mu\,\mathbf b\cdot\mathbf c$；
- **正定**：$\mathbf a\cdot\mathbf a=|\mathbf a|^{2}\ge 0$，且等于 $0$ 当且仅当 $\mathbf a=\mathbf 0$。

由定义直接得到

$$
\cos\theta=\frac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}
$$

以及 Cauchy–Schwarz 不等式

$$
|\mathbf a\cdot\mathbf b|\le|\mathbf a||\mathbf b|
$$

等号成立当且仅当两向量平行。

**投影。** 向量 $\mathbf a$ 在 $\mathbf b$ 方向上的**数量投影**是

$$
\mathrm{comp}_{\mathbf b}\mathbf a=\frac{\mathbf a\cdot\mathbf b}{|\mathbf b|}=|\mathbf a|\cos\theta
$$

它是带符号的：夹角为锐角时为正，钝角时为负，垂直时为零。**向量投影**则是

$$
\mathrm{proj}_{\mathbf b}\mathbf a=\frac{\mathbf a\cdot\mathbf b}{|\mathbf b|^{2}}\,\mathbf b
$$

前者是一个长度，后者是一个沿 $\mathbf b$ 方向的向量。做题时要看清题目要的是哪一个。

垂直判据也来自数量积：对非零向量，

$$
\mathbf a\perp\mathbf b\iff\mathbf a\cdot\mathbf b=0
$$

注意"非零"这个前提不能省。零向量与任何向量的数量积都是 $0$，但零向量没有方向，谈不上垂直。

## 完整例题一：夹角、投影与垂直

**（一）垂直判定。**

$$
\mathbf a=(1,2,2),\qquad \mathbf b=(2,-1,0)
$$

计算

$$
\mathbf a\cdot\mathbf b=1\cdot2+2\cdot(-1)+2\cdot0=0
$$

所以两者垂直。模分别为

$$
|\mathbf a|=\sqrt{1+4+4}=3,\qquad |\mathbf b|=\sqrt{4+1+0}=\sqrt5
$$

由于数量积为零，$\mathbf a$ 在 $\mathbf b$ 上的投影为 $0$，这与"垂直"完全一致。

**（二）夹角与投影。**

$$
\mathbf a=(1,0,1),\qquad \mathbf b=(0,1,1)
$$

$$
\mathbf a\cdot\mathbf b=0+0+1=1,\qquad |\mathbf a|=|\mathbf b|=\sqrt2
$$

所以

$$
\cos\theta=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12
\Longrightarrow
\theta=\frac{\pi}{3}
$$

数量投影为

$$
\mathrm{comp}_{\mathbf b}\mathbf a=\frac{1}{\sqrt2}
$$

向量投影为

$$
\mathrm{proj}_{\mathbf b}\mathbf a=\frac{1}{2}(0,1,1)=\left(0,\frac12,\frac12\right)
$$

检验正交分解：$\mathbf a-\mathrm{proj}_{\mathbf b}\mathbf a=\left(1,-\frac12,\frac12\right)$，与 $\mathbf b$ 的数量积为

$$
0-\frac12+\frac12=0
$$

确实垂直于 $\mathbf b$。

**（三）钝角与负投影。**

$$
\mathbf a=(1,0,0),\qquad \mathbf b=(-1,1,0)
$$

$$
\mathbf a\cdot\mathbf b=-1,\qquad |\mathbf a|=1,\ |\mathbf b|=\sqrt2
$$

$$
\cos\theta=-\frac{1}{\sqrt2}
\Longrightarrow
\theta=\frac{3\pi}{4}
$$

数量投影为 $-\dfrac{1}{\sqrt2}$，负号表示投影方向与 $\mathbf b$ 相反。求距离时取绝对值，判断位置时保留符号。

## 向量积：行列式定义与右手法则

向量积的坐标定义是

$$
\mathbf a\times\mathbf b=
\begin{vmatrix}
\mathbf i & \mathbf j & \mathbf k\\
a_{1} & a_{2} & a_{3}\\
b_{1} & b_{2} & b_{3}
\end{vmatrix}
$$

按第一行展开：

$$
\mathbf a\times\mathbf b=
(a_{2}b_{3}-a_{3}b_{2},\ a_{3}b_{1}-a_{1}b_{3},\ a_{1}b_{2}-a_{2}b_{1})
$$

这个行列式只是记忆工具，真正的定义由三条性质刻画：

- **垂直性**：$\mathbf a\cdot(\mathbf a\times\mathbf b)=0$，$\mathbf b\cdot(\mathbf a\times\mathbf b)=0$；
- **模**：$|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$；
- **方向**：右手四指从 $\mathbf a$ 弯向 $\mathbf b$，拇指指向 $\mathbf a\times\mathbf b$。

模与数量积的关系可以通过恒等式看出：

$$
|\mathbf a\times\mathbf b|^{2}
=|\mathbf a|^{2}|\mathbf b|^{2}-(\mathbf a\cdot\mathbf b)^{2}
=|\mathbf a|^{2}|\mathbf b|^{2}\sin^{2}\theta
$$

这个恒等式称为 Lagrange 恒等式。它说明：当两向量垂直时，$\mathbf a\cdot\mathbf b=0$，叉积的模取最大值 $|\mathbf a||\mathbf b|$；当两向量平行时，$\sin\theta=0$，叉积为零向量。

向量积满足**反交换律**：

$$
\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a
$$

也满足分配律，但**不满足结合律**。这一点后面会用具体例子说明。

对上例 $\mathbf a=(1,2,2)$、$\mathbf b=(2,-1,0)$：

$$
\mathbf a\times\mathbf b=
\left(2\cdot0-2\cdot(-1),\ 2\cdot2-1\cdot0,\ 1\cdot(-1)-2\cdot2\right)
=(2,4,-5)
$$

模为

$$
\sqrt{4+16+25}=\sqrt{45}=3\sqrt5
$$

而 $|\mathbf a||\mathbf b|\sin\theta=3\sqrt5\sin\theta$，由于两者垂直，$\sin\theta=1$，正好吻合。

## 向量积的几何：面积与法向量

以 $\mathbf a$、$\mathbf b$ 为邻边的平行四边形，面积为

$$
S=|\mathbf a||\mathbf b|\sin\theta=|\mathbf a\times\mathbf b|
$$

三角形面积是它的一半：

$$
S_{\triangle}=\frac12|\mathbf a\times\mathbf b|
$$

叉积本身给出**有向面积**：方向是法向量，模是面积。取模才得到通常意义下的几何面积；保留方向则可以用来判断定向。

**例：三角形面积。**

$$
A(1,0,0),\quad B(0,1,0),\quad C(0,0,1)
$$

先写边向量：

$$
\overrightarrow{AB}=(-1,1,0),\qquad \overrightarrow{AC}=(-1,0,1)
$$

叉积：

$$
\overrightarrow{AB}\times\overrightarrow{AC}
=\left(1\cdot1-0\cdot0,\ 0\cdot(-1)-(-1)\cdot1,\ (-1)\cdot0-1\cdot(-1)\right)
=(1,1,1)
$$

模为 $\sqrt3$，所以三角形面积为 $\dfrac{\sqrt3}{2}$。

同时，$(1,1,1)$ 是平面 $ABC$ 的一个法向量。单位法向量为

$$
\mathbf n=\pm\frac{1}{\sqrt3}(1,1,1)
$$

正负号对应平面的两个朝向，具体取哪一个由题目要求的定向决定。这个例子把"面积"与"法向量"同时算出来了，这是叉积最重要的用途。

## 混合积：体积、定向与共面

混合积定义为

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c=
\begin{vmatrix}
a_{1} & a_{2} & a_{3}\\
b_{1} & b_{2} & b_{3}\\
c_{1} & c_{2} & c_{3}
\end{vmatrix}
$$

它的绝对值等于以 $\mathbf a,\mathbf b,\mathbf c$ 为棱的平行六面体体积。理由很直接：$\mathbf a\times\mathbf b$ 是底面的法向量，模是底面积；再与 $\mathbf c$ 做数量积，得到"底面积乘高"。

取前面用过的

$$
\mathbf a=(1,2,2),\quad \mathbf b=(2,-1,0),\quad \mathbf c=(1,0,1)
$$

则

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c=2\cdot1+4\cdot0+(-5)\cdot1=-3
$$

体积为 $|-3|=3$，且三向量不共面（若共面，体积应为 $0$）。

混合积有几条重要性质：

- **轮换不变**：$(\mathbf a\times\mathbf b)\cdot\mathbf c=(\mathbf b\times\mathbf c)\cdot\mathbf a=(\mathbf c\times\mathbf a)\cdot\mathbf b$；
- **交换变号**：交换任意两个向量，混合积变号；
- **共面判据**：$(\mathbf a\times\mathbf b)\cdot\mathbf c=0$ 当且仅当三向量共面（或其中有零向量）。

四点 $A,B,C,D$ 共面的判据同理：

$$
\overrightarrow{AB}\cdot\left(\overrightarrow{AC}\times\overrightarrow{AD}\right)=0
$$

写成坐标，就是一个 $3\times3$ 行列式为零。

## 完整例题二：四点共面

判断

$$
A(1,0,0),\quad B(0,1,0),\quad C(0,0,1),\quad D(1,1,1)
$$

是否共面。

先写三个边向量：

$$
\overrightarrow{AB}=(-1,1,0),\quad
\overrightarrow{AC}=(-1,0,1),\quad
\overrightarrow{AD}=(0,1,1)
$$

混合积：

$$
\overrightarrow{AB}\cdot\left(\overrightarrow{AC}\times\overrightarrow{AD}\right)
=
\begin{vmatrix}
-1 & 1 & 0\\
-1 & 0 & 1\\
0 & 1 & 1
\end{vmatrix}
$$

按第一行展开：

$$
-1\begin{vmatrix}0&1\\1&1\end{vmatrix}
-1\begin{vmatrix}-1&1\\0&1\end{vmatrix}
+0
=-1(0-1)-1(-1-0)=1+1=2
$$

结果不为零，所以四点不共面。

也可以从平面方程看：$A,B,C$ 确定的平面是

$$
x+y+z=1
$$

而 $D$ 的坐标和为 $3$，不在该平面上。两种判断互相印证。

若把 $D$ 改成 $(1,1,-1)$，坐标和为 $1$，应落在平面上。此时

$$
\overrightarrow{AD}=(0,1,-1)
$$

混合积为

$$
\begin{vmatrix}
-1 & 1 & 0\\
-1 & 0 & 1\\
0 & 1 & -1
\end{vmatrix}
=-1(0-1)-1(1-0)=1-1=0
$$

确实为零。这个对照说明：混合积为零与"第四点满足平面方程"是同一件事的两种说法。

## 运算律与常用恒等式

| 运算 | 结果 | 交换律 | 几何意义 | 为零的含义 |
| --- | --- | --- | --- | --- |
| $\mathbf a\cdot\mathbf b$ | 数 | 是 | 投影与夹角 | 垂直（非零时） |
| $\mathbf a\times\mathbf b$ | 向量 | 否，反交换 | 法向量，模为面积 | 平行 |
| $(\mathbf a\times\mathbf b)\cdot\mathbf c$ | 数 | 轮换不变，交换变号 | 平行六面体体积 | 共面 |

几个值得记住的恒等式：

**Lagrange 恒等式。**

$$
|\mathbf a\times\mathbf b|^{2}+(\mathbf a\cdot\mathbf b)^{2}=|\mathbf a|^{2}|\mathbf b|^{2}
$$

它把"垂直分量"与"平行分量"的平方和写成了模的乘积。

**向量三重积。**

$$
\mathbf a\times(\mathbf b\times\mathbf c)
=\mathbf b(\mathbf a\cdot\mathbf c)-\mathbf c(\mathbf a\cdot\mathbf b)
$$

这叫 BAC–CAB 公式：结果是 $\mathbf b$ 与 $\mathbf c$ 的线性组合，系数分别是两个数量积。它说明向量三重积一般不等于零，也不满足结合律。

**混合积的轮换。**

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c
=(\mathbf b\times\mathbf c)\cdot\mathbf a
=(\mathbf c\times\mathbf a)\cdot\mathbf b
$$

轮换保持符号，交换任意两个向量则变号。这与行列式的性质完全一致。

## 边界情形与退化

**零向量。** 零向量没有方向，夹角没有定义。虽然 $\mathbf 0\cdot\mathbf a=0$，但不能据此说零向量与 $\mathbf a$ 垂直。叉积 $\mathbf 0\times\mathbf a=\mathbf 0$，同样不能推出"平行"以外的结论。涉及垂直、平行的判据，都要先确认向量非零。

**平行与反向。** 两向量平行时 $\sin\theta=0$，叉积为零向量；同向时 $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|$，反向时为 $-|\mathbf a||\mathbf b|$。数量积只能区分"同向/反向"，不能区分具体方向，方向要靠叉积或坐标判断。

**退化三角形。** 若三点共线，两条边向量平行，叉积为零，面积公式给出 $0$。这不是公式失效，而是三角形确实退化了。

**坐标系手性。** 叉积的行列式公式默认使用右手坐标系。若把坐标系的某个轴反向，公式给出的方向会与实际右手方向相反。做题时不要随意交换坐标轴的顺序。

**二维情形。** 在 $z=0$ 平面内，$\mathbf a=(a_1,a_2,0)$、$\mathbf b=(b_1,b_2,0)$，叉积只剩 $z$ 分量：

$$
\mathbf a\times\mathbf b=(0,0,a_1b_2-a_2b_1)
$$

它的模是平面内平行四边形的面积，符号表示定向。二维叉积常被当作一个数使用，本质上是三维叉积的特殊情形。

## 四个常见误解

> [!MYTH] 数量积为零说明至少有一个向量是零向量。
> 非零向量垂直时数量积也为零。正确说法是：$\mathbf a\cdot\mathbf b=0$ 意味着垂直，或其中至少一个为零向量。

> [!MYTH] 向量积满足交换律。
> $\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a$。上例中交换后得到 $(-2,-4,5)$，方向正好相反。

> [!MYTH] 混合积是向量，可以再与别的向量做数量积。
> $(\mathbf a\times\mathbf b)\cdot\mathbf c$ 已经是数。若写成 $\mathbf a\times(\mathbf b\times\mathbf c)$，那是另一个向量，且一般不等于原混合积。

> [!MYTH] 叉积的模等于两向量模的乘积。
> 只有在两向量垂直时才成立。一般情形是 $|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$，平行时为零。

## 练习

> [!PRACTICE] 1 · 夹角
> 求 $\mathbf a=(1,0,1)$ 与 $\mathbf b=(0,1,1)$ 的夹角。
>
> > [!ANSWER] 看答案
> > $\mathbf a\cdot\mathbf b=1$，$|\mathbf a|=|\mathbf b|=\sqrt2$，$\cos\theta=\dfrac12$，故 $\theta=\dfrac{\pi}{3}$。

> [!PRACTICE] 2 · 单位法向量
> 求同时垂直于 $(1,1,0)$ 与 $(0,1,1)$ 的单位向量。
>
> > [!ANSWER] 看答案
> > 叉积为 $(1\cdot1-0\cdot1,\ 0\cdot0-1\cdot1,\ 1\cdot1-1\cdot0)=(1,-1,1)$，模 $\sqrt3$，单位向量为 $\pm\dfrac{1}{\sqrt3}(1,-1,1)$。

> [!PRACTICE] 3 · 共面
> 判断 $(1,0,0),(0,1,0),(1,1,0)$ 是否共面。
>
> > [!ANSWER] 看答案
> > 混合积行列式的第三行等于前两行之和，值为 $0$，故共面；它们都在 $z=0$ 平面上。

> [!PRACTICE] 4 · 垂直条件
> 求 $\lambda$，使 $\mathbf a=(1,\lambda,2)$ 与 $\mathbf b=(2,1,-1)$ 垂直。
>
> > [!ANSWER] 看答案
> > 令 $\mathbf a\cdot\mathbf b=2+\lambda-2=0$，得 $\lambda=0$。

> [!PRACTICE] 5 · 体积
> 求以 $\mathbf a=(1,2,2)$、$\mathbf b=(2,-1,0)$、$\mathbf c=(1,0,1)$ 为棱的平行六面体体积。
>
> > [!ANSWER] 看答案
> > $\mathbf a\times\mathbf b=(2,4,-5)$，与 $\mathbf c$ 的数量积为 $2-5=-3$，体积为 $|-3|=3$。

> [!PRACTICE] 6 · 三角形面积
> 求 $A(1,0,0)$、$B(0,1,0)$、$C(0,0,1)$ 构成的三角形面积。
>
> > [!ANSWER] 看答案
> > $\overrightarrow{AB}=(-1,1,0)$，$\overrightarrow{AC}=(-1,0,1)$，叉积为 $(1,1,1)$，模 $\sqrt3$，面积为 $\dfrac{\sqrt3}{2}$。

## 严格表述

设 $\mathbf a,\mathbf b,\mathbf c\in\mathbb{R}^{3}$。数量积定义为

$$
\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3
$$

它是对称双线性函数，满足 $\mathbf a\cdot\mathbf a=|\mathbf a|^{2}$，并给出 $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$。非零向量垂直当且仅当数量积为零。

向量积 $\mathbf a\times\mathbf b$ 由上述行列式定义，满足反交换律 $\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a$、分配律，以及

$$
\mathbf a\cdot(\mathbf a\times\mathbf b)=\mathbf b\cdot(\mathbf a\times\mathbf b)=0
$$

其模满足

$$
|\mathbf a\times\mathbf b|^{2}=|\mathbf a|^{2}|\mathbf b|^{2}-(\mathbf a\cdot\mathbf b)^{2}
$$

等于两向量张成的平行四边形面积。方向由右手法则确定。

混合积

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c
$$

等于以三向量为行的行列式，在轮换下不变，在交换任意两向量时变号。其绝对值等于平行六面体体积，为零当且仅当三向量共面。若 $\mathbf a,\mathbf b,\mathbf c$ 非零，这等价于它们线性相关。

## 与其他讲的联系

- **下一讲**把本讲的三种积直接用于平面与直线：平面的法向量来自叉积，直线的方向向量来自两平面法向量之叉积，点到平面的距离来自数量积的投影。
- **线性代数**：混合积就是三阶行列式，叉积的坐标公式也是行列式展开。行列式的性质（交换变号、轮换不变、线性相关则为零）在这里第一次获得几何解释。
- **多元微积分**：曲面的法向量、切平面、面积元、通量，都要用叉积；三重积分的体积元与混合积的几何意义同源。
- **物理**：功是力与位移的数量积，力矩与角动量是叉积，洛伦兹力中的 $\mathbf v\times\mathbf B$ 也是叉积。三种乘法在力学与电磁学里各有固定位置。
- **数值与图形**：计算法向量、判断三角形朝向、剔除背面，都是叉积的直接应用；叉积的模给出面积，符号给出定向。
