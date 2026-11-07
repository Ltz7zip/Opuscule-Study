---
slug: "taylor-multi"
subject: "analysis"
unit: "u12"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "多元 Taylor 公式"
subtitle: "用一次、二次项把曲面压平"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["taylormv", "partial"]
prereq: ["partial", "taylor"]
related: ["taylor", "extremum-mv"]
---

## 本讲目标

学完这一讲，你能写出二元函数的二阶 Taylor 公式，正确组装 Hessian 矩阵，并用它做具体近似。公式本身不长，出错几乎都出在交叉项和系数 $1/2$ 上。

一元 Taylor 把曲线用多项式逼近；多元 Taylor 把曲面用一个二次型逼近。这个二次型决定了曲面在一点附近是碗、是帽，还是马鞍。

## 三行回顾

- 一阶 Taylor 用梯度给出切平面，二阶 Taylor 用 Hessian 给出二次曲面。
- 二次项是 $\frac12\big(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2\big)$，交叉项系数是 $2f_{xy}$。
- Peano 余项只保证 $o(\rho^2)$；要具体误差估计，需要 Lagrange 余项和更高阶连续偏导。

## 一阶与二阶 Taylor 公式

设 $f$ 在 $a=(a,b)$ 的邻域内有二阶连续偏导，$h=(h,k)$，$\rho=\sqrt{h^2+k^2}$。则
$$f(a+h,b+k)=f(a,b)+f_x h+f_y k+\frac12\big(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2\big)+o(\rho^2),$$
所有偏导都在 $(a,b)$ 取值。一阶部分给出切平面，二阶部分给出曲面与切平面的偏离。

写成矩阵：
$$f(a+h)=f(a)+\nabla f(a)\cdot h+\frac12 h^{\mathsf T}H(a)h+o(\|h\|^2),\qquad
H=\begin{pmatrix}f_{xx}&f_{xy}\\f_{xy}&f_{yy}\end{pmatrix}.$$
$H$ 叫 **Hessian 矩阵**，对称性来自 $f_{xy}=f_{yx}$（在连续条件下）。

## Hessian 与二次型

二次型 $Q(h,k)=f_{xx}h^2+2f_{xy}hk+f_{yy}k^2$ 的符号决定局部形状：

| $H$ 的类型 | 二次型符号 | 曲面形状 |
| --- | --- | --- |
| 正定 | $Q>0$（$h\ne0$） | 碗形，局部极小 |
| 负定 | $Q<0$（$h\ne0$） | 帽形，局部极大 |
| 不定 | 有正有负 | 马鞍 |
| 半正定 | $Q\ge0$ | 需更高阶项判断 |

二元情形可用顺序主子式：$f_{xx}>0$ 且 $f_{xx}f_{yy}-f_{xy}^2>0$ 时正定；$f_{xx}<0$ 且行列式大于零时负定；行列式小于零时不定；行列式等于零时判别失效，需看三阶或更高阶项，例如 $x^3$ 与 $x^4$ 在原点表现不同。这三个判据与上面的二次型符号表是一回事，只是换成了可手算的行列式。

以 $f=x^3+y^3-3xy$ 在 $(1,1)$ 为例。$f(1,1)=-1$，$\nabla f=(3x^2-3y,3y^2-3x)=(0,0)$，
$$H(1,1)=\begin{pmatrix}6&-3\\-3&6\end{pmatrix},\qquad Q=6h^2-6hk+6k^2=6\left[\left(h-\frac k2\right)^2+\frac34k^2\right]>0.$$
故 $(1,1)$ 是极小值点，局部二次近似为 $-1+3h^2-3hk+3k^2$。

## 具体展开与近似

$f(x,y)=e^{x+y}$ 在原点：
$$e^{x+y}=1+(x+y)+\frac{(x+y)^2}{2}+\frac{(x+y)^3}{6}+\cdots,$$
二阶项展开是 $1+x+y+\frac12x^2+xy+\frac12y^2$，交叉项系数 $1$ 来自 $2f_{xy}/2=f_{xy}=1$。

$f(x,y)=x^y$ 在 $(1,1)$：$f=1$，$f_x=yx^{y-1}=1$，$f_y=x^y\ln x=0$，$f_{xx}=y(y-1)x^{y-2}=0$，$f_{xy}=x^{y-1}(1+y\ln x)=1$，$f_{yy}=x^y(\ln x)^2=0$。故
$$x^y=1+h+k+hk+o(h^2+k^2).$$
取 $h=0.02$、$k=0.03$：
$$1.02^{1.03}\approx1+0.02+0.03+0.02\cdot0.03=1.0206.$$
实际值约 $1.020606$，误差在 $10^{-6}$ 量级，二阶近似已经够用。把 $h,k$ 看成小量，二次项之后的部分可以整体丢掉。

## 多指标与余项

用多重指标写更紧凑。$\alpha=(\alpha_1,\dots,\alpha_n)$，$|\alpha|=\alpha_1+\cdots+\alpha_n$，$\alpha!=\alpha_1!\cdots\alpha_n!$，$h^\alpha=h_1^{\alpha_1}\cdots h_n^{\alpha_n}$，$D^\alpha f=\partial_1^{\alpha_1}\cdots\partial_n^{\alpha_n}f$。则
$$f(a+h)=\sum_{|\alpha|\le m}\frac{D^\alpha f(a)}{\alpha!}h^\alpha+R_m(h).$$
Peano 余项：若 $f$ 在 $a$ 处 $m$ 次可微，则 $R_m(h)=o(\|h\|^m)$，只说明“趋于零更快”，不给数值界。

Lagrange 余项：若 $f$ 在包含 $a$ 与 $a+h$ 的凸集上有 $m+1$ 阶连续偏导，则存在 $\theta\in(0,1)$，使
$$R_m(h)=\sum_{|\alpha|=m+1}\frac{D^\alpha f(a+\theta h)}{\alpha!}h^\alpha.$$
沿线段 $a+th$ 把 $g(t)=f(a+th)$ 作一元 Taylor 展开即可得到。实际估误差时用后者，做局部形状判断时用前者。写展开式时先列指标再代值，可以避免漏项与重复计数；指标写法在 $n\ge3$ 时尤其省事。

> [!NOTE]
> Peano 余项要求 $m$ 次可微，Lagrange 余项要求 $m+1$ 阶连续偏导；条件不同，不能混用。

## 三个常见误解

> [!MYTH] 二阶 Taylor 只需写 $f_{xx}h^2+f_{yy}k^2$。
> 交叉项 $2f_{xy}hk$ 不能丢。$f=x^3+y^3-3xy$ 在 $(1,1)$ 的二次型是 $6h^2-6hk+6k^2$，少了 $-6hk$ 就改变了正定性判断。

> [!MYTH] 二次型可以写成 $f_{xx}h^2+f_{xy}hk+f_{yy}k^2$。
> 交叉项系数是 $2f_{xy}$，来自 $h^{\mathsf T}Hh$ 的两次对称贡献。写成矩阵再乘开，就不会漏掉因子 $2$。

> [!MYTH] 展开到二阶就自动获得误差估计。
> Peano 余项只给出 $o(\rho^2)$，是定性的。要给出 $|R_2|\le M\rho^3/6$ 这样的界，需要三阶偏导有界，并用 Lagrange 余项。

## 练习

> [!PRACTICE] 1 · 展开
> 把 $f(x,y)=x^2+xy+y^2$ 在 $(1,1)$ 处展开到二阶。
>
> > [!ANSWER] 看答案
> > $f(1,1)=3$，$\nabla f=(2x+y,x+2y)=(3,3)$，$H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$。故 $f=3+3h+3k+h^2+hk+k^2$，这是精确等式，因为原函数就是二次多项式。

> [!PRACTICE] 2 · 三阶展开
> 写出 $\sin(x+y)$ 在原点直到三阶的 Taylor 公式。
>
> > [!ANSWER] 看答案
> > 令 $t=x+y$，$\sin t=t-t^3/6+o(t^3)$。故 $\sin(x+y)=(x+y)-\frac16(x+y)^3+o(\rho^3)$，其中 $(x+y)^3=x^3+3x^2y+3xy^2+y^3$。

> [!PRACTICE] 3 · 数值近似
> 用二阶 Taylor 估计 $1.02^{1.03}$。
>
> > [!ANSWER] 看答案
> > 在 $(1,1)$ 处 $f=1$，$f_x=1$，$f_y=0$，$f_{xy}=1$，其余二阶偏导为 $0$，故 $x^y\approx1+h+k+hk$。取 $h=0.02$、$k=0.03$，得 $1.0206$；实际约 $1.020606$。

> [!PRACTICE] 4 · 写 Hessian
> $f(x,y)=x^2y+y^2$，写出它在 $(1,1)$ 的 Hessian，并判断二次型的符号。
>
> > [!ANSWER] 看答案
> > $f_x=2xy$，$f_y=x^2+2y$，$f_{xx}=2y$，$f_{xy}=2x$，$f_{yy}=2$。在 $(1,1)$ 得 $H=\begin{pmatrix}2&2\\2&2\end{pmatrix}$，二次型 $2h^2+4hk+2k^2=2(h+k)^2$ 半正定，且在 $h=-k\ne0$ 时为零，需看更高阶项。

## 严格表述

> [!FORMAL] 严格表述
> 设 $f$ 在 $a$ 的邻域内有 $m$ 阶连续偏导，则 $f(a+h)=\sum_{|\alpha|\le m}\frac{D^\alpha f(a)}{\alpha!}h^\alpha+o(\|h\|^m)$（Peano）。若进一步在凸集上有 $m+1$ 阶连续偏导，则存在 $\theta\in(0,1)$ 使 $R_m(h)=\sum_{|\alpha|=m+1}\frac{D^\alpha f(a+\theta h)}{\alpha!}h^\alpha$（Lagrange）。特别地，$m=2$ 时 $R_1$ 与 $R_2$ 沿线段 $a+th$ 对 $g(t)=f(a+th)$ 应用一元 Taylor 定理得到。
