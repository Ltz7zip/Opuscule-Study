---
slug: "substitution-1"
subject: "analysis"
unit: "u06"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "第一类换元法"
subtitle: "把链式法则倒过来用"
minutes: 15
meta: ["阅读 15 分钟","需要 初等数学","掌握级"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint", "deriv"]
---

## 本讲目标

学完这一讲，你能在积分式里认出“内函数乘以内函数导数”的结构，用凑微分把积分化简，并且在换元之后把答案退回原来的变量。

第一类换元法就是复合函数求导的逆运算。复合函数求导会产生一个内层导数作为因子；积分时若看到这个因子，就可以把它收进微分里。

## 三行回顾

- 链式法则：$\bigl(F(\varphi(x))\bigr)'=F'(\varphi(x))\varphi'(x)$。
- 两边同时积分，左边回到 $F(\varphi(x))$，右边是 $\int F'(\varphi(x))\varphi'(x)\,dx$。
- 若记 $u=\varphi(x)$、$du=\varphi'(x)dx$，右边就变成 $\int F'(u)\,du$，形式上与基本积分表一致。

## 换元公式

设 $f$ 有原函数 $F$，$\varphi$ 可导，则

$$\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du\Big|_{u=\varphi(x)}=F(\varphi(x))+C .$$

关键在于认出 $\varphi'(x)dx$ 就是 $du$。这一步叫**凑微分**。

两个最基本的例子：

$$\int 2x\,e^{x^2}dx=\int e^{u}\,du=e^{u}+C=e^{x^2}+C,\qquad u=x^2;$$

$$\int\frac{x}{1+x^2}dx=\frac{1}{2}\int\frac{2x}{1+x^2}dx=\frac{1}{2}\ln(1+x^2)+C .$$

第二例中分子只有 $x$，缺少因子 $2$，于是先乘 $2$ 再乘 $\frac{1}{2}$ 补回来。这是最常见的操作。

## 几种常见的凑法

| 结构 | 取 $u$ | 例子 |
| --- | --- | --- |
| $f(ax+b)$ | $u=ax+b$ | $\int e^{3x-1}dx=\frac{1}{3}e^{3x-1}+C$ |
| $x^{n-1}f(x^n)$ | $u=x^n$ | $\int x^2\sqrt{x^3+1}\,dx$ |
| $\dfrac{f(\ln x)}{x}$ | $u=\ln x$ | $\int\dfrac{dx}{x\ln x}=\ln\|\ln x\|+C$ |
| $f(\sin x)\cos x$ | $u=\sin x$ | $\int\cos^3x\,dx$ |
| $f(e^x)e^x$ | $u=e^x$ | $\int\dfrac{e^x}{1+e^{2x}}dx$ |

第三个例子值得算一遍：令 $u=\ln x$，$du=dx/x$，则 $\int\dfrac{dx}{x\ln x}=\int\dfrac{du}{u}=\ln|u|+C=\ln|\ln x|+C$。

第四个例子先拆：$\cos^3x=\cos x(1-\sin^2x)$，令 $u=\sin x$，得

$$\int(1-u^2)\,du=u-\frac{u^3}{3}+C=\sin x-\frac{\sin^3x}{3}+C .$$

## 系数的补偿与回代

换元时两件事最容易漏：补系数、回代。

**补系数**：若 $u=ax+b$，则 $du=a\,dx$，所以 $\int f(ax+b)dx=\dfrac{1}{a}\int f(u)\,du$。例如 $\int e^{2x}dx=\dfrac{1}{2}e^{2x}+C$，漏掉 $\frac{1}{2}$ 就错了。验算方法：对结果求导，看能否还原。

**回代**：不定积分的结果必须是 $x$ 的函数。算出 $\int e^u du=e^u+C$ 之后，要写回 $e^{x^2}+C$，不能停在 $u$。

再看一个含三角的例子：$\int\tan x\,dx=\int\dfrac{\sin x}{\cos x}dx$。令 $u=\cos x$，$du=-\sin x\,dx$，于是

$$\int\tan x\,dx=-\int\frac{du}{u}=-\ln|\cos x|+C .$$

## 三个常见误解

> [!MYTH] 把 $x$ 换成 $u$ 就算换元完成了。
> 微分也必须换。$u=x^2$ 时 $du=2x\,dx$，若只换字母、留下 $x\,dx$，式子就变成混用两个变量的无效表达式。

> [!MYTH] 不定积分换元后可以保留 $u$。
> 不行。不定积分是 $x$ 的函数，答案必须写回 $x$。保留 $u$ 相当于答非所问；只有定积分在换限之后可以直接用新变量算完。

> [!MYTH] 任何积分都能靠凑微分算出来。
> 远不能。$\int e^{-x^2}dx$ 与 $\int\dfrac{\sin x}{x}dx$ 虽有原函数，却不能写成初等函数的有限组合。凑微分只对“恰好含内层导数”的结构有效。

## 练习

> [!PRACTICE] 1 · 根式
> 求 $\int x^2\sqrt{x^3+1}\,dx$。
>
> > [!ANSWER] 看答案
> > 令 $u=x^3+1$，$du=3x^2dx$，原式 $=\dfrac{1}{3}\int u^{1/2}du=\dfrac{2}{9}u^{3/2}+C=\dfrac{2}{9}(x^3+1)^{3/2}+C$。

> [!PRACTICE] 2 · 线性内层
> 求 $\int\dfrac{dx}{2x+3}$。
>
> > [!ANSWER] 看答案
> > 令 $u=2x+3$，$du=2\,dx$，原式 $=\dfrac{1}{2}\int\dfrac{du}{u}=\dfrac{1}{2}\ln|2x+3|+C$。

> [!PRACTICE] 3 · 三角幂
> 求 $\int\cos^3x\,dx$。
>
> > [!ANSWER] 看答案
> > 拆成 $\cos x(1-\sin^2x)$，令 $u=\sin x$，得 $\int(1-u^2)du=u-\dfrac{u^3}{3}+C=\sin x-\dfrac{\sin^3x}{3}+C$。

> [!PRACTICE] 4 · 指数
> 求 $\int x e^{-x^2}dx$。
>
> > [!ANSWER] 看答案
> > 令 $u=-x^2$，$du=-2x\,dx$，原式 $=-\dfrac{1}{2}\int e^u du=-\dfrac{1}{2}e^{-x^2}+C$。

> [!FORMAL] 严格表述
> 设 $f$ 在区间 $J$ 上有原函数 $F$，$\varphi$ 在区间 $I$ 上可导且 $\varphi(I)\subseteq J$。则 $F\circ\varphi$ 是 $f(\varphi(x))\varphi'(x)$ 在 $I$ 上的原函数，即 $\int f(\varphi(x))\varphi'(x)\,dx=F(\varphi(x))+C$。证明只需对 $F(\varphi(x))$ 求导，用链式法则即得 $f(\varphi(x))\varphi'(x)$。
