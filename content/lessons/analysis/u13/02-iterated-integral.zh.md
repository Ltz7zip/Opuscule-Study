---
slug: "iterated-integral"
subject: "analysis"
unit: "u13"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "化重积分为累次积分"
subtitle: "先切一条线，再让这条线扫过整个区域"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "defint"]
---

## 本讲目标

重积分的定义不能直接用来算题，真正好用的是一个等式：把二重积分写成两次一元积分。学完这一讲，你能在矩形与一般区域上正确写出内外层积分限，能识别 $x$ 型与 $y$ 型区域，并在次序不好算时把积分次序换过来。

## 三行回顾

- 重积分是“分割—求和—极限”，本身不含任何计算顺序。
- 若先固定 $x$、只让 $y$ 变化，一次积分就把一条竖线上的贡献压成一个数。
- 再让 $x$ 扫过整个范围，二维问题就拆成两个一维问题。

## 矩形区域上的 Fubini 定理

设 $f$ 在矩形 $R=[a,b]\times[c,d]$ 上连续，则

$$\iint_R f(x,y)\,dx\,dy=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy.$$

两个次序都成立，因为 $f$ 在闭矩形上连续，从而一致连续，内层积分对另一个变量也连续。教材的证明思路是：把 $R$ 等分成 $mn$ 个小矩形，每个小矩形上的二重积分用中值定理，再对一维和式取极限。

先做一个具体计算：$f(x,y)=x^2y$，$R=[0,1]\times[0,2]$。

$$\int_0^1 x^2\left(\int_0^2 y\,dy\right)dx=\int_0^1 x^2\cdot2\,dx=\frac{2}{3}.$$

换序得到同样的 $\int_0^2 y\left(\int_0^1 x^2dx\right)dy=\int_0^2 \frac{y}{3}dy=\frac23$。这里两个次序都容易，区别不明显；真正需要选择次序的是下面的区域。

## x 型区域与 y 型区域

若区域可以写成

$$D=\{(x,y):a\le x\le b,\ \varphi_1(x)\le y\le\varphi_2(x)\},$$

其中 $\varphi_1,\varphi_2$ 连续，就称 $D$ 为 **$x$ 型区域**（竖条区域）。此时

$$\iint_D f\,d\sigma=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy.$$

外层是常数限，内层限可以依赖 $x$。类似地，**$y$ 型区域**写成 $c\le y\le d$、$\psi_1(y)\le x\le\psi_2(y)$，先对 $x$ 积分。

例：$D$ 由 $y=0$、$x=1$、$y=x^2$ 围成，求 $\iint_D xy\,d\sigma$。这是 $x$ 型区域，$0\le x\le1$，$0\le y\le x^2$：

$$\int_0^1 x\left(\int_0^{x^2}y\,dy\right)dx=\int_0^1 x\cdot\frac{x^4}{2}\,dx=\frac{1}{12}.$$

画图是必要动作：先看区域在 $x$ 轴上的投影，再对每个固定的 $x$ 画一条竖线，读出它从哪条曲线进入到哪条曲线离开。

## 交换积分次序

有些内层积分没有初等原函数，例如 $\int e^{-y^2}dy$、$\int\frac{\sin y}{y}dy$。这时先看能否换序。

计算

$$I=\int_0^1 dx\int_x^1 e^{-y^2}dy.$$

积分区域是三角形 $0\le x\le y\le1$。把它改写成 $y$ 型：$0\le y\le1$，$0\le x\le y$。于是

$$I=\int_0^1 dy\int_0^y e^{-y^2}dx=\int_0^1 y e^{-y^2}dy=\left[-\frac12e^{-y^2}\right]_0^1=\frac{1-e^{-1}}{2}.$$

换序的全部工作就是把“先 $y$ 后 $x$”的区域描述翻译成“先 $x$ 后 $y$”。动作固定：画出区域，找另一个方向上的投影，写出对应的两个曲线边界。

## 一个次序不能交换的例子

Fubini 定理不是无条件的。在 $(0,1]^2$ 上取

$$f(x,y)=\frac{x^2-y^2}{(x^2+y^2)^2}.$$

先对 $x$ 积分：注意 $\frac{\partial}{\partial x}\left(\frac{x}{x^2+y^2}\right)=\frac{y^2-x^2}{(x^2+y^2)^2}$，故

$$\int_0^1 f(x,y)\,dx=-\frac{1}{1+y^2},\qquad \int_0^1 dy\int_0^1 f\,dx=-\frac{\pi}{4}.$$

先对 $y$ 积分：注意 $\frac{\partial}{\partial y}\left(\frac{y}{x^2+y^2}\right)=\frac{x^2-y^2}{(x^2+y^2)^2}$，故

$$\int_0^1 f(x,y)\,dy=\frac{1}{1+x^2},\qquad \int_0^1 dx\int_0^1 f\,dy=\frac{\pi}{4}.$$

两个累次积分相差一个符号。原因不在定理错了，而在 $f$ 在原点附近无界，$\iint|f|\,d\sigma$ 发散，Fubini 的条件不满足。这个例子说明：换序之前先确认函数在闭区域上有界、连续（或至少绝对可积）。

## 三个常见误解

> [!MYTH] 内外层积分限可以随便写。
> 外层必须是常数，内层限依赖外层变量，且每一条内层线段必须整段落在区域内。限写反了，算出的不是同一个区域。

> [!MYTH] 两个累次积分相等是自动的。
> 只有满足 Fubini 条件（例如在闭矩形上连续，或绝对可积）时才相等。上面的 $(x^2-y^2)/(x^2+y^2)^2$ 就是反例。

> [!MYTH] 换序只是把 $dx$ 和 $dy$ 对调。
> 换序要重新描述区域。$\int_0^1dx\int_x^1$ 对应的三角形，换序后是 $\int_0^1dy\int_0^y$，限也跟着变。

## 练习

> [!PRACTICE] 1 · 三角形区域
> $D$ 由 $y=0$、$x=1$、$y=x$ 围成，求 $\iint_D xy\,d\sigma$。
>
> > [!ANSWER] 看答案
> > 写成 $0\le x\le1$，$0\le y\le x$：$\int_0^1 x\cdot\frac{x^2}{2}dx=\frac18$。

> [!PRACTICE] 2 · 换序
> 计算 $\int_0^1 dy\int_y^1 e^{-x^2}dx$。
>
> > [!ANSWER] 看答案
> > 区域为 $0\le y\le x\le1$，换序得 $\int_0^1 dx\int_0^x e^{-x^2}dy=\int_0^1 xe^{-x^2}dx=\frac{1-e^{-1}}{2}$。

> [!PRACTICE] 3 · 体积
> 求由平面 $x+y+z=1$ 与三个坐标面围成的四面体体积。
>
> > [!ANSWER] 看答案
> > 体积 $=\iint_D(1-x-y)\,d\sigma$，$D$ 为 $x\ge0,y\ge0,x+y\le1$。$\int_0^1dx\int_0^{1-x}(1-x-y)dy=\int_0^1\frac{(1-x)^2}{2}dx=\frac16$。

> [!PRACTICE] 4 · 判断
> 上文的 $f$ 在 $(0,1]^2$ 上连续，为什么两个累次积分还能不相等？
>
> > [!ANSWER] 看答案
> > 它在 $(0,1]^2$ 上连续，但在闭方形 $[0,1]^2$ 的原点附近无界，且 $\iint|f|$ 发散。Fubini 要求的是闭区域上的连续性或绝对可积性，此处都不满足。

> [!FORMAL] 严格表述
> 设 $f$ 在 $R=[a,b]\times[c,d]$ 上连续。则 $F(x)=\int_c^d f(x,y)\,dy$ 在 $[a,b]$ 上连续，且 $\iint_R f=\int_a^bF(x)\,dx$；交换 $x,y$ 得另一次序，二者相等。若 $D=\{(x,y):a\le x\le b,\varphi_1(x)\le y\le\varphi_2(x)\}$，$\varphi_1,\varphi_2$ 连续且 $f$ 在 $D$ 上连续，则 $\iint_D f=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy$。
