---
slug: "lhopital-rule"
subject: "analysis"
unit: "u05"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "L'Hôpital 法则"
subtitle: "未定式不是猜出来的，是换出来的"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["lhopital", "mvt"]
prereq: ["mvt"]
related: ["mvt", "taylor"]
---

## 本讲目标

学完这一讲，你能判断一个极限是否属于法则适用的未定式，能在施用前逐条核对条件，也能举出导数之比不存在、原极限却存在的反例。

L'Hôpital 法则的全部内容，就是把 Cauchy 中值定理用在两个同时趋于零（或同时趋于无穷）的函数上。它换掉的是形式，不是难度：条件不核对，换完照样错。

## 三行回顾

- Cauchy 中值定理说，$\dfrac{f(b)-f(a)}{g(b)-g(a)}=\dfrac{f'(\xi)}{g'(\xi)}$，其中 $\xi$ 在 $a,b$ 之间。
- 让 $b\to a$，两个增量同时变小；若它们同时趋于零，右端就是导数之比。
- 于是 $\dfrac{0}{0}$ 的问题被翻译成 $\dfrac{f'}{g'}$ 的问题，可以再翻译一次。

## 法则的两个版本

**$\frac{0}{0}$ 型**：设 $x\to a$ 时 $f(x)\to 0$、$g(x)\to 0$，两者在 $a$ 的去心邻域内可导，$g'(x)\ne 0$，且 $\lim\dfrac{f'(x)}{g'(x)}$ 存在（有限或 $\pm\infty$），则

$$\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)} .$$

**$\frac{\infty}{\infty}$ 型**：把“趋于零”换成“$|f(x)|\to+\infty$、$|g(x)|\to+\infty$”，结论不变。

手算一个标准例子：

$$\lim_{x\to 0}\frac{x-\sin x}{x^3}=\lim_{x\to 0}\frac{1-\cos x}{3x^2}=\lim_{x\to 0}\frac{\sin x}{6x}=\frac{1}{6}.$$

第一步后仍是 $\frac{0}{0}$，第二步后仍是 $\frac{0}{0}$，第三步才得到 $\frac{1}{6}$。每一次施用之前，都重新确认了分子分母同时趋于零。

> [!NOTE]
> 三个条件缺一不可：分子分母同时趋于零或同时趋于无穷、分母导数不为零、导数之比的极限存在。

## 先化简，再施用

法则不是第一反应。能约的就约，能等价替换的就替换，往往一步到位。

| 极限 | 直接硬算 | 更好的做法 |
| --- | --- | --- |
| $\lim_{x\to 0}\dfrac{\sin 3x}{x}$ | 两次求导 | $\sin 3x\sim 3x$，答案 $3$ |
| $\lim_{x\to 0}x\ln x$ | 不是未定式，需改写 | 写成 $\dfrac{\ln x}{1/x}$，得 $\dfrac{1/x}{-1/x^2}=-x\to 0$ |
| $\lim_{x\to+\infty}\dfrac{\ln x}{x}$ | 可直接用 $\frac{\infty}{\infty}$ | 求导得 $\dfrac{1/x}{1}\to 0$ |

第二行值得注意：$x\ln x$ 在 $x\to 0^+$ 时是 $0\cdot(-\infty)$，不属于法则的两种形式，必须先改写成商。改写之后才轮到法则。

## 法则失效的两种情形

**情形一：根本不是未定式。** $\lim_{x\to 0}\dfrac{x+1}{x+2}=\dfrac{1}{2}$。若硬套法则，得到 $\dfrac{1}{1}=1$，与正确答案无关。法则的前提不成立，结论自然没有理由成立。

**情形二：导数之比的极限不存在。** 设 $f(x)=x+\sin x$，$g(x)=x$，$x\to+\infty$。此时

$$\frac{f(x)}{g(x)}=1+\frac{\sin x}{x}\to 1,$$

而 $\dfrac{f'(x)}{g'(x)}=1+\cos x$ 在 $x\to+\infty$ 时振荡，没有极限。原极限存在，导数之比却不存在，这说明法则只是充分条件，不是等价条件。

遇到这种情形，正确做法是回到定义或夹逼，而不是宣布“原极限不存在”。

## 循环论证的陷阱

用 L'Hôpital 法则算 $\lim_{x\to 0}\dfrac{\sin x}{x}$，会得到 $\cos 0=1$。答案对，过程错：求 $(\sin x)'$ 时用的正是这个极限。这就是循环论证。

正当的路线是先证明 $\sin x<x<\tan x$（$0<x<\pi/2$），再取倒数与夹逼，得到 $\cos x<\dfrac{\sin x}{x}<1$，令 $x\to 0^+$ 得极限为 $1$。有了这个极限，才有 $(\sin x)'=\cos x$。

判断是否循环的标准很简单：求导公式的证明里，有没有用到你正在算的这个极限。

## 三个常见误解

> [!MYTH] 任何极限都可以先求导再说。
> 只有 $\frac{0}{0}$ 与 $\frac{\infty}{\infty}$ 两种未定式可以。$\lim_{x\to 0}\frac{x+1}{x+2}$ 用一次法则得 $1$，而正确答案是 $\frac{1}{2}$。

> [!MYTH] 导数之比的极限不存在，原极限也不存在。
> 反例：$\frac{x+\sin x}{x}\to 1$，而导数之比 $1+\cos x$ 没有极限。法则此时给不出结论，并不等于给岀否定结论。

> [!MYTH] 法则可以一路求导到底，不用中途检查。
> 每一步之后都要重新确认仍是未定式。$\lim_{x\to 0}\frac{e^x-1-x}{x^2}$ 两步后变成 $\frac{e^x}{2}\to\frac{1}{2}$，此时已不是未定式，再求导只会得到无意义的分母 $0$。

## 练习

> [!PRACTICE] 1 · 两次求导
> 求 $\lim_{x\to 0}\dfrac{\tan x-x}{x^3}$。
>
> > [!ANSWER] 看答案
> > 第一步得 $\dfrac{\sec^2 x-1}{3x^2}=\dfrac{\tan^2 x}{3x^2}$，用 $\tan x\sim x$ 得 $\dfrac{1}{3}$；若继续用法则，第二步得 $\dfrac{2\sec^2x\tan x}{6x}\to\dfrac{1}{3}$，结果一致。

> [!PRACTICE] 2 · 改写类型
> 求 $\lim_{x\to 0^+}x\ln x$。
>
> > [!ANSWER] 看答案
> > 改写成 $\dfrac{\ln x}{1/x}$，属 $\frac{\infty}{\infty}$ 型。求导得 $\dfrac{1/x}{-1/x^2}=-x\to 0$。

> [!PRACTICE] 3 · 判断能否用
> 求 $\lim_{x\to+\infty}\dfrac{x+\cos x}{x}$，并说明能否直接用 L'Hôpital 法则。
>
> > [!ANSWER] 看答案
> > 原式 $=1+\dfrac{\cos x}{x}\to 1$。导数之比为 $\dfrac{1-\sin x}{1}$，无极限，所以法则不适用；结论要靠直接估计得到。

> [!PRACTICE] 4 · 三角型
> 求 $\lim_{x\to 0}\dfrac{1-\cos x}{x\sin x}$。
>
> > [!ANSWER] 看答案
> > 用等价无穷小：$1-\cos x\sim x^2/2$，$x\sin x\sim x^2$，比值为 $\dfrac{1}{2}$。若用法则，第一步得 $\dfrac{\sin x}{\sin x+x\cos x}$，仍是 $\frac{0}{0}$，再求导得 $\dfrac{\cos x}{2\cos x-x\sin x}\to\dfrac{1}{2}$。

> [!FORMAL] 严格表述
> $\frac{0}{0}$ 型：设 $f,g$ 在 $a$ 的某去心邻域内可导，$g'(x)\ne 0$，$\lim_{x\to a}f(x)=\lim_{x\to a}g(x)=0$，且 $\lim_{x\to a}\frac{f'(x)}{g'(x)}=L$（$L$ 可为 $\pm\infty$），则 $\lim_{x\to a}\frac{f(x)}{g(x)}=L$。证明取 $f(a)=g(a)=0$ 补定义，对 $[a,x]$（或 $[x,a]$）用 Cauchy 中值定理，得 $\frac{f(x)}{g(x)}=\frac{f'(\xi)}{g'(\xi)}$，再令 $x\to a$。$\frac{\infty}{\infty}$ 型另有独立的证明，结论相同。
