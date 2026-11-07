---
slug: "substitution-2"
subject: "analysis"
unit: "u06"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "第二类换元法"
subtitle: "把 x 写成 t 的函数，再让根号消失"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint", "defint"]
---

## 本讲目标

学完这一讲，你能判断何时该用反代换 $x=\psi(t)$，能对三类根式选出正确的三角代换，并把结果换算回 $x$。

第一类换元是“把内层函数记作 $u$”，第二类换元方向相反：直接令 $x$ 等于某个关于 $t$ 的函数。当被积函数里出现 $\sqrt{a^2-x^2}$ 这类无法凑微分的根式时，这是唯一可行的路线。

## 三行回顾

- 第一类换元：$u=\varphi(x)$，把 $\varphi'(x)dx$ 收成 $du$。
- 若 $\varphi$ 有反函数，同一件事可以反过来写：$x=\psi(t)$，$dx=\psi'(t)dt$。
- 换完之后积分里只剩 $t$，算完再用 $t=\psi^{-1}(x)$ 退回。

## 反代换公式

设 $x=\psi(t)$ 在区间上可导且 $\psi'(t)\ne 0$，则

$$\int f(x)\,dx=\int f(\psi(t))\psi'(t)\,dt\Big|_{t=\psi^{-1}(x)} .$$

与第一类的区别只在书写方向：一个是“把复杂的内层收进去”，一个是“把整个 $x$ 换成一个方便的新变量”。目标相同——把积分变成表里有的形式。

## 三种标准三角换元

| 根式 | 代换 | 用到的恒等式 |
| --- | --- | --- |
| $\sqrt{a^2-x^2}$ | $x=a\sin t$ | $1-\sin^2t=\cos^2t$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan t$ | $1+\tan^2t=\sec^2t$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec t$ | $\sec^2t-1=\tan^2t$ |

以 $\int\sqrt{1-x^2}\,dx$ 为例。令 $x=\sin t$，$t\in(-\frac{\pi}{2},\frac{\pi}{2})$，则 $dx=\cos t\,dt$，$\sqrt{1-x^2}=\cos t$（区间选得好，开方不必加绝对值）：

$$\int\cos^2t\,dt=\int\frac{1+\cos 2t}{2}dt=\frac{t}{2}+\frac{\sin 2t}{4}+C .$$

回代：$t=\arcsin x$，$\sin 2t=2\sin t\cos t=2x\sqrt{1-x^2}$，于是

$$\int\sqrt{1-x^2}\,dx=\frac{1}{2}x\sqrt{1-x^2}+\frac{1}{2}\arcsin x+C .$$

验算一下量纲：$x\sqrt{1-x^2}$ 与 $\arcsin x$ 都是无量纲量，两项可以相加。

## 根式代换与其他代换

不是所有根式都要用三角。含 $\sqrt[n]{ax+b}$ 时，直接令 $t=\sqrt[n]{ax+b}$ 往往更快。

$$\int\frac{dx}{1+\sqrt{x}},\qquad t=\sqrt{x},\ x=t^2,\ dx=2t\,dt .$$

代入得

$$\int\frac{2t}{1+t}dt=2\int\left(1-\frac{1}{1+t}\right)dt=2t-2\ln(1+t)+C .$$

回代 $t=\sqrt x$：

$$\int\frac{dx}{1+\sqrt{x}}=2\sqrt{x}-2\ln(1+\sqrt{x})+C .$$

另一类常见情形是二次式配方：$\int\dfrac{dx}{x^2+2x+5}=\int\dfrac{d(x+1)}{(x+1)^2+4}=\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$。这里没有根号，配方之后直接套表。

> [!NOTE]
> 三角换元时，先把 $t$ 的范围定下来，再开方，就能合法地写 $\sqrt{a^2\sin^2t}=a\cos t$ 而不加绝对值。

## 三个常见误解

> [!MYTH] 第二类换元就是“令 $t$ 等于复杂的部分”。
> 方向反了。第二类换元是令 $x=\psi(t)$，把自变量整体换掉；把复杂部分记作 $t$ 属于第一类。两者形式相近，但一个换的是内层，一个换的是自变量。

> [!MYTH] 三角换元算出关于 $t$ 的答案就可以结束。
> 不定积分必须回到 $x$。回代时常用 $\sin t=x/a$、$\tan t=x/a$ 画一个直角三角形，把 $\cos t$、$\sec t$ 用 $x$ 表示出来。

> [!MYTH] $\sqrt{x^2}=x$。
> 应为 $|x|$。回代 $\tan$ 或 $\sec$ 时若把 $\sqrt{\sec^2t-1}$ 直接写成 $\tan t$，符号就可能错；在所选 $t$ 区间上 $\tan t$ 的符号要单独确认。

## 练习

> [!PRACTICE] 1 · 平方和
> 求 $\int\dfrac{dx}{\sqrt{x^2+4}}$。
>
> > [!ANSWER] 看答案
> > 令 $x=2\tan t$，$dx=2\sec^2t\,dt$，$\sqrt{x^2+4}=2\sec t$，原式 $=\int\sec t\,dt=\ln|\sec t+\tan t|+C=\ln\left|\dfrac{\sqrt{x^2+4}+x}{2}\right|+C$，可并入常数写成 $\ln\left(x+\sqrt{x^2+4}\right)+C$。

> [!PRACTICE] 2 · 平方差
> 求 $\int\sqrt{4-x^2}\,dx$。
>
> > [!ANSWER] 看答案
> > 令 $x=2\sin t$，得 $4\int\cos^2t\,dt=2t+\sin 2t+C$。回代得 $\dfrac{x}{2}\sqrt{4-x^2}+2\arcsin\dfrac{x}{2}+C$。

> [!PRACTICE] 3 · 根式代换
> 求 $\int\dfrac{dx}{1+\sqrt{x}}$。
>
> > [!ANSWER] 看答案
> > 令 $t=\sqrt x$，$dx=2t\,dt$，原式 $=\int\dfrac{2t}{1+t}dt=2t-2\ln(1+t)+C=2\sqrt x-2\ln(1+\sqrt x)+C$。

> [!PRACTICE] 4 · 配方
> 求 $\int\dfrac{dx}{x^2+2x+5}$。
>
> > [!ANSWER] 看答案
> > 配方得 $(x+1)^2+4$。令 $u=x+1$，原式 $=\int\dfrac{du}{u^2+4}=\dfrac{1}{2}\arctan\dfrac{u}{2}+C=\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$。

> [!FORMAL] 严格表述
> 设 $f$ 在区间 $I$ 上连续，$\psi$ 在区间 $J$ 上可导且 $\psi'(t)\ne 0$，$\psi(J)=I$。若 $F$ 是 $f$ 在 $I$ 上的原函数，则 $F(\psi(t))$ 是 $f(\psi(t))\psi'(t)$ 在 $J$ 上的原函数：
> $$\int f(x)\,dx\Big|_{x=\psi(t)}=\int f(\psi(t))\psi'(t)\,dt .$$
> 因 $\psi$ 严格单调，$\psi^{-1}$ 存在，故可把右端回代为 $x$ 的函数。对 $F(\psi(t))$ 求导并用链式法则即可验证。
