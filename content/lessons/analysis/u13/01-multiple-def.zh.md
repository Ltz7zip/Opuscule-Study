---
slug: "multiple-def"
subject: "analysis"
unit: "u13"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "重积分的定义与性质"
subtitle: "把“切碎再求和”搬到平面上"
minutes: 14
meta: ["阅读 14 分钟","需要 初等数学","掌握级"]
concepts: ["multipleint", "defint"]
prereq: ["defint"]
related: ["multipleint", "defint"]
---

## 本讲目标

重积分是把定积分从区间搬到平面与空间：把区域切碎，用小块的“面积乘高”求和，再让最大直径趋于零。学完这一讲，你能写出二重积分的分割定义，判断一个二元函数是否可积，并用性质估计积分值而不必真正计算。

这一讲只做三件事：把分割说清楚，把可积的条件说清楚，把性质用一次手算坐实。

## 三行回顾

- 定积分把 $[a,b]$ 切成小区间，用矩形面积和逼近曲边梯形。
- 二元函数的定义域是平面区域，区间长度换成了区域面积。
- 于是问题变成：怎样让“切碎—求和—取极限”在平面上仍然与切法无关。

## 分割、直径与 Riemann 和

设 $D$ 是有界闭区域，面积记作 $\sigma(D)$。用有限条曲线把 $D$ 分成 $n$ 个小区域，第 $i$ 块的面积记作 $\Delta\sigma_i$，并在其中任意取一点 $(\xi_i,\eta_i)$。称

$$\sum_{i=1}^{n} f(\xi_i,\eta_i)\,\Delta\sigma_i$$

为 $f$ 关于这个分割的 **Riemann 和**。

小区域的**直径**定义为其中任意两点距离的上确界，$d_i=\sup\{|P-Q|:P,Q\in\Delta\sigma_i\}$；分割的**细度**是 $\|T\|=\max_i d_i$。若存在实数 $I$，使得对任意 $\varepsilon>0$ 都有 $\delta>0$，只要 $\|T\|<\delta$，无论怎样分割、怎样取点，都有

$$\left|\sum_{i=1}^n f(\xi_i,\eta_i)\Delta\sigma_i-I\right|<\varepsilon,$$

就称 $f$ 在 $D$ 上**可积**，$I$ 记作 $\iint_D f\,d\sigma$ 或 $\iint_D f(x,y)\,dx\,dy$。

关键在“无论怎样”：换一种切法、换一组取点，和都必须靠近同一个数。只对正方形网格成立，不算可积。

## 可积的必要条件与充分条件

**必要条件**：$f$ 在 $D$ 上有界。若 $f$ 无界，总能在某块小区域上把 $|f|$ 取得任意大，和式无上界，极限不可能有限。

**充分条件**（教材中的常用版本）：

- $f$ 在 $D$ 上连续，则 $f$ 可积。
- $f$ 有界，且间断点全部落在面积为零的集合上，则 $f$ 可积。

后一条解释了为什么“沿一条曲线改掉函数值”不影响积分：一条曲线面积为零。

反例也必须记住。在 $[0,1]^2$ 上令 $f(x,y)=1$（当 $x$ 为有理数），其余为 $0$。任何小块里既有 $x$ 为有理数的点，也有 $x$ 为无理数的点，于是上和恒为 $1$、下和恒为 $0$，差不会趋于零，$f$ 不可积。可见“有界”远不足以保证可积。

## 性质清单

以下性质都可以从定义直接推出，前提是各积分存在：

| 性质 | 表达式 |
| --- | --- |
| 线性 | $\iint_D(\alpha f+\beta g)\,d\sigma=\alpha\iint_D f\,d\sigma+\beta\iint_D g\,d\sigma$ |
| 区域可加 | $D=D_1\cup D_2$ 且内部不交时，$\iint_D f=\iint_{D_1}f+\iint_{D_2}f$ |
| 单调 | $f\le g$ 时 $\iint_D f\le\iint_D g$ |
| 绝对值 | $\left|\iint_D f\right|\le\iint_D|f|$ |
| 中值 | $f$ 连续时存在 $(\xi,\eta)\in D$，使 $\iint_D f=f(\xi,\eta)\sigma(D)$ |

用定义做一次手算。取单位正方形 $D=[0,1]^2$，$f(x,y)=x$，把 $D$ 分成 $n^2$ 个边长 $1/n$ 的小正方形，在第 $(i,j)$ 块取中点 $\left(\frac{i-1/2}{n},\frac{j-1/2}{n}\right)$。和式为

$$\sum_{i,j=1}^{n}\frac{i-1/2}{n}\cdot\frac{1}{n^2}=\frac{1}{n^3}\sum_{i=1}^n\left(i-\frac12\right)=\frac{1}{n^3}\cdot\frac{n^2}{2}=\frac{1}{2}.$$

每个 $n$ 都恰好得到 $1/2$，极限自然是 $1/2$，与“$\iint_D x\,d\sigma$ 等于面积的一半”一致。同理 $\iint_D y=1/2$，所以 $\iint_D(x+y)\,d\sigma=1$。

## 三个常见误解

> [!MYTH] 重积分就是算两次定积分。
> 定义是分割、求和、取极限；累次积分只是把重积分化成两次一元积分的计算方法，需要 Fubini 定理作保证。次序能不能换、边界怎么写，都是独立的问题。

> [!MYTH] 函数连续就一定可积。
> 还需要区域有界、边界面积为零。连续函数在无界区域上的积分属于反常重积分，按定义可能发散。

> [!MYTH] 某一种分割的极限存在，就说明可积。
> 可积要求所有细度趋于零的分割、所有取点方式都收敛到同一个数。只验证正方形网格，等于只检查了一条路。

## 练习

> [!PRACTICE] 1 · 用定义
> 在 $D=[0,1]^2$ 上用分割求和计算 $\iint_D(2x+3y)\,d\sigma$。
>
> > [!ANSWER] 看答案
> > 由线性与前面的结果，$\iint_D 2x=1$，$\iint_D 3y=3/2$，合计 $5/2$。

> [!PRACTICE] 2 · 判断可积
> 在 $[0,1]^2$ 上令 $f(x,y)=1$（当 $x$ 为有理数），其余为 $0$。$f$ 可积吗？
>
> > [!ANSWER] 看答案
> > 不可积。任一小区块内既有 $x$ 有理的点也有 $x$ 无理的点，上和恒为 $1$、下和恒为 $0$；间断点集是整个正方形，面积不为零。

> [!PRACTICE] 3 · 估计
> 设 $D$ 是单位圆盘 $x^2+y^2\le1$，用中值定理能对 $\iint_D(x^2+y^2)\,d\sigma$ 给出什么估计？精确值又是多少？
>
> > [!ANSWER] 看答案
> > 中值定理给出积分 $=h\cdot\pi$，其中 $0\le h\le1$，只能得到 $0\le I\le\pi$。精确值用极坐标：$\int_0^{2\pi}\int_0^1 r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac14=\frac{\pi}{2}$，平均高度为 $1/2$。

> [!PRACTICE] 4 · 性质
> $f$ 在 $D$ 上连续，$\sigma(D)=4$，且 $1\le f\le3$。$\iint_D f$ 的范围是多少？若又有 $\iint_D f=8$，能否断定 $f$ 在某点等于 $2$？
>
> > [!ANSWER] 看答案
> > $4\le\iint_D f\le12$。由中值定理，$\iint_D f=f(\xi,\eta)\cdot4=8$，故 $f(\xi,\eta)=2$，能。

> [!FORMAL] 严格表述
> 设 $D\subset\mathbb{R}^2$ 是有界闭区域，$f$ 在 $D$ 上有界。对分割 $T=\{\Delta\sigma_1,\dots,\Delta\sigma_n\}$，记 $M_i=\sup_{\Delta\sigma_i}f$、$m_i=\inf_{\Delta\sigma_i}f$，上、下和分别为 $S(T)=\sum M_i\Delta\sigma_i$、$s(T)=\sum m_i\Delta\sigma_i$。$f$ 可积当且仅当 $\inf_T S(T)=\sup_T s(T)$；等价地，存在 $I$，使对任意 $\varepsilon>0$ 有 $\delta>0$，当 $\|T\|<\delta$ 时 $\left|\sum f(\xi_i,\eta_i)\Delta\sigma_i-I\right|<\varepsilon$ 对一切取点成立。
