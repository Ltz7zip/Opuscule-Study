---
slug: "deriv-def"
subject: "analysis"
unit: "u04"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "导数与微分"
subtitle: "差商的极限"
minutes: 15
meta: ["阅读 15 分钟","需要 连续与间断点","掌握级"]
concepts: ["deriv", "cont"]
prereq: ["cont"]
related: ["mvt", "indefint"]
---

## 本讲目标

连续描述“值不跳”，导数描述“变化有多快”。它由一个比值的极限定义：自变量改变一点点，函数值改变多少，再让改变量趋于零。

学完你能用定义算四个基本导数，能说明可导为什么强于连续，也能举出连续但不可导的反例。

## 三行回顾

- $f'(x_0)=\lim_{\Delta x\to 0}\dfrac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$，几何上是切线斜率。
- 可导必连续，连续未必可导；$|x|$ 在 $0$ 处是标准反例。
- 单侧导数都存在且相等，才等价于双侧导数存在。

## 差商与导数

设 $f$ 在 $x_0$ 的某邻域内有定义。若极限

$$
f'(x_0) = \lim_{\Delta x\to 0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
= \lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

存在，称 $f$ 在 $x_0$ 可导，该极限为导数。比值 $\dfrac{\Delta y}{\Delta x}$ 是割线斜率；让 $\Delta x\to 0$，割线转成切线，导数是切线斜率。若把 $x$ 看作时间、$f$ 看作位移，导数是瞬时速度。

导数是数，不是函数值之差。记号 $f'(x_0)$、$\left.\dfrac{df}{dx}\right|_{x_0}$ 都指同一个数。

## 四个基本导数

**$f(x)=x^2$**：

$$
\frac{(x_0+h)^2-x_0^2}{h} = \frac{2x_0h+h^2}{h} = 2x_0+h \to 2x_0 .
$$

**$f(x)=\dfrac{1}{x}$**（$x_0\ne 0$）：

$$
\frac{1}{h}\left(\frac{1}{x_0+h}-\frac{1}{x_0}\right)
= \frac{-1}{x_0(x_0+h)} \to -\frac{1}{x_0^2}.
$$

**$f(x)=\sqrt{x}$**（$x_0>0$）：分子有理化，

$$
\frac{\sqrt{x_0+h}-\sqrt{x_0}}{h}
= \frac{1}{\sqrt{x_0+h}+\sqrt{x_0}} \to \frac{1}{2\sqrt{x_0}}.
$$

**$f(x)=\sin x$**：用和差化积，

$$
\frac{\sin(x_0+h)-\sin x_0}{h}
= \cos\left(x_0+\frac{h}{2}\right)\frac{\sin(h/2)}{h/2} \to \cos x_0 .
$$

四个结果连起来就是 $(x^2)'=2x$、$(1/x)'=-1/x^2$、$(\sqrt{x})'=1/(2\sqrt{x})$、$(\sin x)'=\cos x$。

## 可导与连续

> [!NOTE]
> 若 $f$ 在 $x_0$ 可导，则 $f$ 在 $x_0$ 连续。

证明只要把改变量拆开：

$$
f(x)-f(x_0) = \frac{f(x)-f(x_0)}{x-x_0}(x-x_0).
$$

差商趋于 $f'(x_0)$，$(x-x_0)\to 0$，乘积趋于 $f'(x_0)\cdot 0 = 0$，故 $f(x)\to f(x_0)$。

逆命题不成立。$f(x)=|x|$ 在 $0$ 处连续，但

$$
\frac{|h|-0}{h} = \begin{cases}1, & h>0,\\ -1, & h<0,\end{cases}
$$

左导数为 $-1$、右导数为 $1$，不相等，故不可导。几何上是一个尖角，没有唯一切线。

单侧导数都存在且相等，才等价于可导。导数存在也不保证导数连续：取

$$
f(x)=\begin{cases}x^2\sin\dfrac{1}{x}, & x\ne 0,\\ 0, & x=0,\end{cases}
$$

在 $0$ 处 $f'(0)=\lim_{h\to 0}h\sin\dfrac{1}{h}=0$，可导；但 $x\ne 0$ 时 $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$，当 $x\to 0$ 时没有极限。

## 三个常见误解

> [!MYTH] 可导与连续是一回事。
> 可导更强。$|x|$ 在 $0$ 处连续却不可导；反过来，可导必连续，这一点由差商乘上 $x-x_0$ 的分解直接得到。

> [!MYTH] $f'(x_0)$ 存在，就说明 $f'$ 在 $x_0$ 附近连续。
> 导函数可能剧烈振荡。$x^2\sin\dfrac{1}{x}$ 在 $0$ 处可导且 $f'(0)=0$，但 $x\ne 0$ 时 $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$ 在 $0$ 附近没有极限。

> [!MYTH] 导数就是函数值的改变量 $\Delta y$。
> 导数是差商的极限，是一个比率；$\Delta y$ 是实际的改变量。$y=x^2$ 在 $x=1$ 处取 $\Delta x=0.1$，$\Delta y=0.21$，而 $f'(1)=2$，三者并不相同。

## 练习

> [!PRACTICE] 1 · 用定义
> 用定义求 $f(x)=x^3$ 在 $x=1$ 处的导数。
>
> > [!ANSWER] 看答案
> > $\dfrac{(1+h)^3-1}{h} = \dfrac{3h+3h^2+h^3}{h} = 3+3h+h^2 \to 3$。

> [!PRACTICE] 2 · 尖点
> 证明 $f(x)=|x|$ 在 $0$ 处不可导。
>
> > [!ANSWER] 看答案
> > 左差商恒为 $-1$，右差商恒为 $1$，左右导数不等，故导数不存在。函数在 $0$ 处仍然连续。

> [!PRACTICE] 3 · 振荡导数
> 讨论 $f(x)=x^2\sin\dfrac{1}{x}$（$x\ne 0$）、$f(0)=0$ 在 $0$ 处的可导性。
>
> > [!ANSWER] 看答案
> > $\dfrac{f(h)-f(0)}{h} = h\sin\dfrac{1}{h} \to 0$，故 $f'(0)=0$。但 $x\ne 0$ 时 $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$ 在 $0$ 附近无极限。

> [!PRACTICE] 4 · 切线
> 求曲线 $y=x^2$ 在 $x=1$ 处的切线方程。
>
> > [!ANSWER] 看答案
> > $f'(1)=2$，切点为 $(1,1)$，切线为 $y-1=2(x-1)$，即 $y=2x-1$。

> [!FORMAL] 严格表述
> $f$ 在 $x_0$ 可导，若极限 $\lim_{x\to x_0}\dfrac{f(x)-f(x_0)}{x-x_0}$ 存在，记其值为 $f'(x_0)$。可导 $\Rightarrow$ 连续，反之不真。左、右导数分别用 $x\to x_0^-$、$x\to x_0^+$ 定义；$f'(x_0)$ 存在当且仅当左右导数存在且相等。$f'(x_0)$ 存在不蕴含 $f'$ 在 $x_0$ 连续。
