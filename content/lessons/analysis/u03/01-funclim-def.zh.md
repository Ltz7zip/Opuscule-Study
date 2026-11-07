---
slug: "funclim-def"
subject: "analysis"
unit: "u03"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "函数极限"
subtitle: "自变量逼近时，函数值是否跟着走"
minutes: 15
meta: ["阅读 15 分钟","需要 数列极限","掌握级"]
concepts: ["funclim"]
prereq: ["seql"]
related: ["seql", "cont"]
---

## 本讲目标

数列极限里的 $n$ 只能走向 $+\infty$，函数极限允许自变量从两侧逼近任意一点 $x_0$。这一讲把 $\varepsilon$–$N$ 改写成 $\varepsilon$–$\delta$，并说明为什么极限与 $f(x_0)$ 的取值无关。

学完你能用定义验证线性函数与分式的极限，能用左右极限判断极限是否存在，也能用数列刻画否定一个极限。

## 三行回顾

- $\lim_{x\to x_0}f(x)=A$ 要求：任给 $\varepsilon>0$，存在 $\delta>0$，使 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\varepsilon$。
- 条件是去心的：$x=x_0$ 这一点被排除，$f$ 在 $x_0$ 可以没有定义。
- 极限存在当且仅当左右极限都存在且相等。

## ε–δ 语言

设 $f$ 在 $x_0$ 的某个去心邻域内有定义。若对任意 $\varepsilon>0$，存在 $\delta>0$，使当

$$
0 < |x-x_0| < \delta
$$

时都有 $|f(x)-A|<\varepsilon$，则称 $x\to x_0$ 时 $f$ 的极限为 $A$，记作 $\lim_{x\to x_0}f(x)=A$。

与数列定义相比，$N$ 换成了 $\delta$，$n>N$ 换成了 $0<|x-x_0|<\delta$。多出来的 $0<$ 是关键：它把 $x_0$ 本身挖掉。因此极限描述的是 $x_0$ 附近的行为，不是 $x_0$ 处的值。

## 用定义验证两个极限

**例 1**：证明 $\lim_{x\to 2}(3x+1)=7$。写差：

$$
|(3x+1)-7| = 3|x-2|.
$$

要让 $3|x-2|<\varepsilon$，只需 $|x-2|<\varepsilon/3$。取 $\delta=\varepsilon/3$，定义的两个条件同时满足。

**例 2**：证明 $\lim_{x\to 1}\dfrac{x^2-1}{x-1}=2$。因为 $0<|x-1|$，可以约分：

$$
\frac{x^2-1}{x-1} = x+1,
$$

于是 $|f(x)-2| = |x-1|$。取 $\delta=\varepsilon$ 即可。注意 $f$ 在 $x=1$ 没有定义，极限却存在，这正说明去心邻域的作用。

**例 3**：$\lim_{x\to 0}x\sin\dfrac{1}{x}=0$。这里不能用约分，只能放大：

$$
\left|x\sin\frac{1}{x}\right| \le |x|,
$$

取 $\delta=\varepsilon$。$\sin(1/x)$ 本身没有极限，但有界，乘上趋于 $0$ 的 $|x|$ 后就被压住了。

## 单侧极限与 Heine 定理

左极限记 $\lim_{x\to x_0^-}f(x)$，条件改为 $x_0-\delta<x<x_0$；右极限改为 $x_0<x<x_0+\delta$。

> [!NOTE]
> 极限 $\lim_{x\to x_0}f(x)$ 存在，当且仅当左右极限都存在且相等。

取整函数 $f(x)=[x]$ 在 $x=1$ 处：左极限为 $0$，右极限为 $1$，故极限不存在。这是跳跃型间断的典型形状。

**Heine 定理**：$\lim_{x\to x_0}f(x)=A$ 当且仅当对任意满足 $x_n\to x_0$、$x_n\ne x_0$ 的数列，都有 $f(x_n)\to A$。它把函数极限交给数列极限处理，特别适合否定。

例：$f(x)=\sin\dfrac{1}{x}$ 在 $0$ 处没有极限。取 $x_n=\dfrac{1}{n\pi}$，则 $f(x_n)=0\to 0$；取 $y_n=\dfrac{1}{2n\pi+\pi/2}$，则 $f(y_n)=1\to 1$。两个数列给出不同结果，由 Heine 定理，极限不存在。

## 三个常见误解

> [!MYTH] 函数极限存在，就要求 $f$ 在 $x_0$ 有定义且极限等于函数值。
> 定义排除了 $x=x_0$。$\dfrac{x^2-1}{x-1}$ 在 $x=1$ 无定义，极限仍为 $2$；即使有定义，$f(x_0)$ 取什么值也不影响极限。

> [!MYTH] 左右极限都存在，函数极限就存在。
> 还必须相等。$[x]$ 在 $1$ 处左极限 $0$、右极限 $1$，极限不存在。两个单侧极限都有限但不相等，属于跳跃。

> [!MYTH] 找到一个数列 $x_n\to x_0$ 使 $f(x_n)\to A$，就证明了极限是 $A$。
> Heine 定理要求对一切这样的数列成立。$\sin(1/x)$ 沿 $x_n=1/(n\pi)$ 趋于 $0$，沿另一列却趋于 $1$，所以极限不存在。

## 练习

> [!PRACTICE] 1 · 线性函数
> 用定义证明 $\lim_{x\to 3}(2x-1)=5$。
>
> > [!ANSWER] 看答案
> > $|(2x-1)-5| = 2|x-3|$。任给 $\varepsilon>0$，取 $\delta=\varepsilon/2$，则 $0<|x-3|<\delta$ 时差小于 $\varepsilon$。

> [!PRACTICE] 2 · 有界乘无穷小
> 证明 $\lim_{x\to 0}x^2\sin\dfrac{1}{x}=0$。
>
> > [!ANSWER] 看答案
> > $\left|x^2\sin\dfrac{1}{x}\right| \le x^2$。任给 $\varepsilon>0$，取 $\delta=\sqrt{\varepsilon}$，则 $0<|x|<\delta$ 时 $x^2<\varepsilon$。

> [!PRACTICE] 3 · 否定极限
> 证明 $\lim_{x\to 0}\sin\dfrac{1}{x}$ 不存在。
>
> > [!ANSWER] 看答案
> > 取 $x_n=1/(n\pi)$，$f(x_n)=0$；取 $y_n=1/(2n\pi+\pi/2)$，$f(y_n)=1$。两列都趋于 $0$ 但函数值极限不同，由 Heine 定理原极限不存在。

> [!PRACTICE] 4 · 取整函数
> 讨论 $f(x)=[x]$ 在 $x=1$ 处的极限。
>
> > [!ANSWER] 看答案
> > 当 $x\to 1^-$ 时 $[x]=0$；当 $x\to 1^+$ 时 $[x]=1$。左右极限不等，故极限不存在，这是跳跃间断。

> [!FORMAL] 严格表述
> 设 $x_0$ 是定义域 $D$ 的聚点。$\lim_{x\to x_0}f(x)=A$ 定义为：$\forall\varepsilon>0\ \exists\delta>0\ \forall x\in D$，$0<|x-x_0|<\delta \Rightarrow |f(x)-A|<\varepsilon$。极限存在则唯一。$\lim_{x\to x_0}f(x)=A$ 当且仅当 $\lim_{x\to x_0^+}f(x)=\lim_{x\to x_0^-}f(x)=A$。Heine 定理给出与数列极限的等价刻画。
