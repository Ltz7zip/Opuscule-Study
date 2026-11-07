---
slug: "chain-rule"
subject: "analysis"
unit: "u04"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "复合函数与反函数求导"
subtitle: "变化沿链条传递"
minutes: 15
meta: ["阅读 15 分钟","需要 求导法则","掌握级"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["deriv", "partial"]
---

## 本讲目标

实际出现的函数大多是复合的：$\sin(x^2)$、$e^{\sin x}$、$\ln(\cos x)$。链式法则把外层与内层的变化率相乘，反函数求导则把 $dy/dx$ 翻成 $dx/dy$。

学完你能对多层复合函数求导，能推导 $\arcsin x$ 与 $\arctan x$ 的导数，也能用取对数的方法处理 $x^x$ 这类幂指函数。

## 三行回顾

- 链式法则：$(f\circ g)'(x_0)=f'(g(x_0))\,g'(x_0)$，外层在内层取值处求导，再乘内层导数。
- 反函数导数：$\left(f^{-1}\right)'(y_0)=\dfrac{1}{f'(x_0)}$，其中 $y_0=f(x_0)$，两点必须对应。
- 幂指函数先取对数，把指数变成乘积，再求导。

## 链式法则

设 $g$ 在 $x_0$ 可导，$f$ 在 $u_0=g(x_0)$ 可导，则

$$
(f\circ g)'(x_0) = f'(g(x_0))\,g'(x_0).
$$

用 Leibniz 记号写成

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx},
$$

看起来像分数约分，但这是定理，不是代数恒等式。

证明要点：由 $f$ 在 $u_0$ 可导，

$$
\Delta y = f'(u_0)\Delta u + \varepsilon(\Delta u)\Delta u,
$$

其中 $\Delta u\to 0$ 时 $\varepsilon(\Delta u)\to 0$。两边除以 $\Delta x$：

$$
\frac{\Delta y}{\Delta x} = f'(u_0)\frac{\Delta u}{\Delta x} + \varepsilon(\Delta u)\frac{\Delta u}{\Delta x}.
$$

$\dfrac{\Delta u}{\Delta x}\to g'(x_0)$，$\varepsilon(\Delta u)\to 0$，第二项消失，结论成立。这样写避开了“$\Delta u=0$ 不能作分母”的麻烦。

## 反函数求导

设 $f$ 在 $x_0$ 可导且 $f'(x_0)\ne 0$，$f$ 在 $x_0$ 附近严格单调，反函数 $f^{-1}$ 在 $y_0=f(x_0)$ 处可导，则

$$
\left(f^{-1}\right)'(y_0) = \frac{1}{f'(x_0)}.
$$

推导只需对恒等式 $f^{-1}(f(x))=x$ 两边求导：

$$
\left(f^{-1}\right)'(f(x))\cdot f'(x) = 1 .
$$

令 $x=x_0$ 即得。几何上，反函数图像是原图像关于 $y=x$ 的对称，切线斜率互为倒数。

**例**：$y=\arcsin x$，$x\in(-1,1)$。由 $x=\sin y$，$y\in\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$，

$$
(\arcsin x)' = \frac{1}{\cos y} = \frac{1}{\sqrt{1-\sin^2 y}} = \frac{1}{\sqrt{1-x^2}}.
$$

**例**：$y=\arctan x$，由 $x=\tan y$ 得

$$
(\arctan x)' = \frac{1}{\sec^2 y} = \frac{1}{1+\tan^2 y} = \frac{1}{1+x^2}.
$$

## 三个算例

**$\sin(x^2)$**：外层 $\sin$，内层 $x^2$。

$$
\big(\sin(x^2)\big)' = \cos(x^2)\cdot 2x = 2x\cos(x^2).
$$

**$e^{\sin x}$**：两层复合。

$$
\left(e^{\sin x}\right)' = e^{\sin x}\cos x .
$$

**$x^x$**（$x>0$）：底数与指数都在变，不能直接用幂函数公式。取对数：

$$
\ln y = x\ln x \ \Longrightarrow\ \frac{y'}{y} = \ln x + 1,
$$

故

$$
y' = x^x(\ln x+1).
$$

在 $x=1$ 处，$y'=1$；在 $x=2$ 处，$y'=4(\ln 2+1)\approx 6.77$。

## 三个常见误解

> [!MYTH] $(f(g(x)))'=f'(g(x))$，只对外层求导就够。
> 漏掉了内层因子 $g'(x)$。$\sin(x^2)$ 的导数是 $2x\cos(x^2)$，不是 $\cos(x^2)$。检验办法：取 $g(x)=2x$，结果必须多出因子 $2$。

> [!MYTH] 反函数导数就是 $1/f'(x)$，在同一个 $x$ 上取。
> 两个自变量不同。$\left(f^{-1}\right)'(y)=1/f'(x)$，其中 $y=f(x)$。$\arcsin$ 在 $x=0$ 处导数为 $1$，对应 $\sin$ 在 $0$ 处导数为 $1$；在 $x=\dfrac12$ 处则为 $\dfrac{1}{\cos(\pi/6)}=\dfrac{2}{\sqrt{3}}$。

> [!MYTH] $x^x$ 的导数是 $x\cdot x^{x-1}$。
> 那是 $x^a$（$a$ 为常数）的公式。$x^x$ 的底数与指数都依赖 $x$，正确结果是 $x^x(\ln x+1)$。在 $x=1$ 处两者给出 $1$ 与 $1$，巧合相同；在 $x=2$ 处分别为 $4(\ln 2+1)\approx 6.77$ 与 $4$。

## 练习

> [!PRACTICE] 1 · 一次复合
> 求 $y=\sin(3x+1)$ 的导数。
>
> > [!ANSWER] 看答案
> > 外层导数为 $\cos(3x+1)$，内层导数为 $3$，故 $y'=3\cos(3x+1)$。

> [!PRACTICE] 2 · 幂
> 求 $y=(x^2+1)^{10}$ 的导数。
>
> > [!ANSWER] 看答案
> > 外层 $10(x^2+1)^9$，内层 $2x$，故 $y'=20x(x^2+1)^9$。

> [!PRACTICE] 3 · 反三角
> 求 $y=\arctan(2x)$ 的导数。
>
> > [!ANSWER] 看答案
> > 外层导数 $\dfrac{1}{1+(2x)^2}$，内层导数 $2$，故 $y'=\dfrac{2}{1+4x^2}$。

> [!PRACTICE] 4 · 幂指
> 求 $y=x^x$（$x>0$）的导数。
>
> > [!ANSWER] 看答案
> > 取对数得 $\ln y=x\ln x$，求导得 $\dfrac{y'}{y}=\ln x+1$，故 $y'=x^x(\ln x+1)$。

> [!FORMAL] 严格表述
> 若 $g$ 在 $x_0$ 可导、$f$ 在 $g(x_0)$ 可导，则 $(f\circ g)'(x_0)=f'(g(x_0))g'(x_0)$。证明用 $\Delta y=f'(u_0)\Delta u+\varepsilon(\Delta u)\Delta u$，其中 $\varepsilon\to 0$。若 $f$ 严格单调、$f'(x_0)\ne 0$，则 $\left(f^{-1}\right)'(y_0)=1/f'(x_0)$，$y_0=f(x_0)$。链式法则可逐层迭代，用于任意有限层复合。
