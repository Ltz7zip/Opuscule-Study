---
slug: "euler-integral"
subject: "analysis"
unit: "u15"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "Euler 积分"
subtitle: "Γ 与 B：两个把阶乘和积分连起来的函数"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["paramint"]
prereq: ["paramint"]
related: ["paramint", "fourier"]
---

## 本讲目标

Euler 积分是两个含参反常积分：$\Gamma$ 函数与 $B$ 函数。学完这一讲，你能写出它们的定义与收敛范围，用递推公式把 $\Gamma$ 与阶乘接上，记住 $\Gamma(1/2)=\sqrt\pi$，并用 $B(p,q)=\Gamma(p)\Gamma(q)/\Gamma(p+q)$ 快速算出一类定积分。

## 三行回顾

- $\Gamma$ 函数把阶乘从整数推广到正实数。
- $B$ 函数是区间 $[0,1]$ 上的一个含参积分，与 $\Gamma$ 由一个乘法公式相连。
- 很多看似复杂的定积分，换元后就是 $B$ 或 $\Gamma$ 的标准形式。

## Γ 函数：定义与递推

对 $s>0$，定义

$$\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx.$$

在 $x=0$ 附近，$x^{s-1}e^{-x}\sim x^{s-1}$，可积当且仅当 $s>0$；在无穷远处，指数衰减压倒幂函数，故对一切 $s$ 收敛。所以收敛范围正好是 $s>0$。

分部积分：

$$\Gamma(s+1)=\int_0^\infty x^se^{-x}dx=\left[-x^se^{-x}\right]_0^\infty+s\int_0^\infty x^{s-1}e^{-x}dx=s\Gamma(s).$$

边界项为零：$x\to\infty$ 时指数衰减获胜，$x\to0$ 时 $s>0$ 保证 $x^s\to0$。反复使用递推，并注意 $\Gamma(1)=1$，得

$$\Gamma(n+1)=n!,\qquad n=0,1,2,\dots$$

这就是“$\Gamma$ 是阶乘的连续版本”的确切含义。

反过来，这个连续版本几乎是唯一的：Bohr–Mollerup 定理说，若 $F>0$ 满足 $F(1)=1$、$F(s+1)=sF(s)$，且 $\ln F$ 为凸函数，则 $F=\Gamma$。所以“把阶乘推广到正实数”没有第二个合理答案。

递推还可以把定义延拓到负半轴：对 $s\ne0,-1,-2,\dots$ 令 $\Gamma(s)=\Gamma(s+1)/s$。例如 $\Gamma\left(-\frac12\right)=\frac{\Gamma(1/2)}{-1/2}=-2\sqrt\pi$。在 $s=0,-1,-2,\dots$ 处 $\Gamma$ 有一阶极点，这也是它不能在整个实轴上连续的原因。

## Γ(1/2) 与特殊值

在 $\Gamma(1/2)=\int_0^\infty x^{-1/2}e^{-x}dx$ 中令 $x=t^2$，$dx=2t\,dt$：

$$\Gamma\left(\frac12\right)=\int_0^\infty\frac{1}{t}e^{-t^2}\cdot2t\,dt=2\int_0^\infty e^{-t^2}dt=\sqrt\pi.$$

最后一步用了 Gauss 积分。于是

$$\Gamma\left(\frac32\right)=\frac12\Gamma\left(\frac12\right)=\frac{\sqrt\pi}{2},\qquad \Gamma\left(\frac52\right)=\frac32\cdot\frac12\sqrt\pi=\frac{3\sqrt\pi}{4}.$$

一般地，对非负整数 $n$，

$$\Gamma\left(n+\frac12\right)=\frac{(2n-1)!!}{2^n}\sqrt\pi.$$

例如 $\Gamma(7/2)=\frac{5\cdot3\cdot1}{2^3}\sqrt\pi=\frac{15\sqrt\pi}{8}$。

## B 函数与关系式

对 $p>0$、$q>0$，定义

$$B(p,q)=\int_0^1x^{p-1}(1-x)^{q-1}dx.$$

在两端附近的可积性分别要求 $p>0$ 与 $q>0$。它显然关于 $p,q$ 对称：作 $x\mapsto1-x$ 即可看出 $B(p,q)=B(q,p)$。

**关系式**：

$$B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}.$$

证明思路：把 $\Gamma(p)\Gamma(q)$ 写成二重积分

$$\Gamma(p)\Gamma(q)=\int_0^\infty\int_0^\infty u^{p-1}v^{q-1}e^{-(u+v)}du\,dv,$$

作换元 $u=st$，$v=s(1-t)$，$s>0$，$0<t<1$，Jacobi 行列式为 $s$。则 $u+v=s$，$du\,dv=s\,ds\,dt$，从而

$$\Gamma(p)\Gamma(q)=\int_0^\infty s^{p+q-1}e^{-s}ds\int_0^1t^{p-1}(1-t)^{q-1}dt=\Gamma(p+q)B(p,q).$$

取 $q=1$ 得 $B(p,1)=\frac{\Gamma(p)\Gamma(1)}{\Gamma(p+1)}=\frac1p$，与直接计算 $\int_0^1x^{p-1}dx=\frac1p$ 一致。

**三角形式。** 令 $x=\sin^2\theta$，得

$$B(p,q)=2\int_0^{\pi/2}\sin^{2p-1}\theta\cos^{2q-1}\theta\,d\theta .$$

取 $p=q=\frac12$：左边是 $\int_0^1\frac{dx}{\sqrt{x(1-x)}}$，右边是 $2\cdot\frac{\pi}{2}=\pi$，与 $\Gamma\left(\frac12\right)^2=\pi$ 吻合。

**余元公式。** 对 $0<s<1$，$\Gamma(s)\Gamma(1-s)=\frac{\pi}{\sin\pi s}$。取 $s=\frac12$ 得 $\Gamma\left(\frac12\right)^2=\pi$，与上面一致；取 $s=\frac13$ 得 $\Gamma\left(\frac13\right)\Gamma\left(\frac23\right)=\frac{2\pi}{\sqrt3}$。

**导数。** 在参数区间内闭一致收敛，故可在积分号下求导：$\Gamma^{(k)}(s)=\int_0^\infty x^{s-1}(\ln x)^ke^{-x}dx$。特别地 $\Gamma'(1)=-\gamma$，其中 $\gamma\approx0.5772$ 是 Euler 常数。

## 用 Euler 积分算定积分

**例 1.** $\int_0^1x^{3/2}(1-x)^{1/2}dx=B\left(\frac52,\frac32\right)$。由对称性与关系式，

$$B\left(\frac52,\frac32\right)=\frac{\Gamma(5/2)\Gamma(3/2)}{\Gamma(4)}=\frac{\frac{3\sqrt\pi}{4}\cdot\frac{\sqrt\pi}{2}}{6}=\frac{\pi}{16}.$$

**例 2.** $\int_0^\infty x^4e^{-x}dx=\Gamma(5)=4!=24$。

**例 3.** $\int_0^{\pi/2}\sin^3\theta\cos^2\theta\,d\theta$。令 $u=\sin^2\theta$，可化为 $\frac12B(2,\frac32)$：

$$\frac12\cdot\frac{\Gamma(2)\Gamma(3/2)}{\Gamma(7/2)}=\frac12\cdot\frac{1\cdot\frac{\sqrt\pi}{2}}{\frac{15\sqrt\pi}{8}}=\frac{2}{15}.$$

**例 4.** $\int_0^\infty e^{-x^2}dx=\frac12\Gamma\left(\frac12\right)=\frac{\sqrt\pi}{2}$，与 Gauss 积分一致。

**例 5.** $\int_0^\infty x^{s-1}e^{-ax}dx=\frac{\Gamma(s)}{a^s}$（$a>0$）。令 $t=ax$ 即得，这是查表时最常用的一条；取 $s=5$、$a=2$ 得 $\frac{24}{32}=\frac34$。

**例 6.** $\int_0^1\frac{dx}{\sqrt{1-x^3}}$。令 $u=x^3$，$dx=\frac13u^{-2/3}du$，积分化为

$$\frac13\int_0^1u^{-2/3}(1-u)^{-1/2}du=\frac13B\left(\frac13,\frac12\right)=\frac{\sqrt\pi}{3}\cdot\frac{\Gamma(1/3)}{\Gamma(5/6)}\approx1.402 .$$

**为什么化成它就结束了。** 因为 $\Gamma$ 与 $B$ 的值可以查表，也可以由递推、余元公式互相推出；剩下的只是代数变形，不再需要新的积分技巧。

**换元的合法性。** 每一步换元都要求映射单调连续可微：$x=\sin^2\theta$ 在 $[0,\frac{\pi}{2}]$ 上满足，$u=x^3$ 在 $[0,1]$ 上满足。区间上不单调时，必须分段处理。

**增长。** Stirling 公式 $\Gamma(s+1)\sim\sqrt{2\pi s}\left(\frac{s}{e}\right)^s$ 说明 $\Gamma$ 比任何指数函数增长得快。算大 $n$ 的阶乘时先取对数：$\ln n!\approx n\ln n-n+\frac12\ln(2\pi n)$，避免直接溢出。

使用前先做换元，把积分整理成 $\int_0^1x^{p-1}(1-x)^{q-1}dx$ 或 $\int_0^\infty x^{s-1}e^{-x}dx$ 的形状，再对号入座。

**常见坑。** $\Gamma(s)$ 的下限是 $0$，不是 $-\infty$；$B(p,q)$ 的两个参数都必须为正。把 $\int_0^1x^{-1/2}(1-x)^{-1/2}dx$ 说成 $\Gamma\left(\frac12\right)$ 就是漏了另一半：它等于 $B\left(\frac12,\frac12\right)=\Gamma\left(\frac12\right)^2=\pi$。

记两条底线：$\Gamma$ 在正半轴上光滑且没有零点；$B(p,q)$ 关于两个参数对称，且在 $p,q>0$ 时取正值。遇到 $\int_0^{\pi/2}\sin^{2p-1}\theta\cos^{2q-1}\theta\,d\theta$ 这种形状，不必硬算，直接用三角形式对号入座。

## 三个常见误解

> [!MYTH] $\Gamma(s)$ 对一切实数 $s$ 都由这个积分定义。
> 积分只在 $s>0$ 收敛。$s\le0$ 的值要靠递推公式延拓，且在非正整数处有极点。

> [!MYTH] $B(p,q)=\Gamma(p)+\Gamma(q)$。
> 是乘积除以 $\Gamma(p+q)$，不是和。量纲也不对：$B$ 是积分值，$\Gamma$ 的乘积除以 $\Gamma$ 才可能匹配。

> [!MYTH] $\Gamma(n+1)=n!$ 说明 $\Gamma(n)=n!$。
> 差一位。$\Gamma(n+1)=n!$，所以 $\Gamma(n)=(n-1)!$；例如 $\Gamma(4)=6=3!$。

## 练习

> [!PRACTICE] 1 · 阶乘
> 求 $\Gamma(5)$ 与 $\Gamma(6)$。
>
> > [!ANSWER] 看答案
> > $\Gamma(5)=4!=24$，$\Gamma(6)=5!=120$。

> [!PRACTICE] 2 · 半整数
> 求 $\Gamma(7/2)$。
>
> > [!ANSWER] 看答案
> > $\Gamma(7/2)=\frac52\cdot\frac32\cdot\frac12\sqrt\pi=\frac{15\sqrt\pi}{8}$。

> [!PRACTICE] 3 · B 函数
> 计算 $\int_0^1x(1-x)^2dx$，并用 $B$ 函数验证。
>
> > [!ANSWER] 看答案
> > 直接算：$\frac12-\frac23+\frac14=\frac1{12}$。用 $B(2,3)=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}=\frac{1\cdot2}{24}=\frac1{12}$。

> [!PRACTICE] 4 · 三角积分
> 计算 $\int_0^{\pi/2}\sin^3\theta\cos^2\theta\,d\theta$。
>
> > [!ANSWER] 看答案
> > 令 $u=\sin^2\theta$，积分化为 $\frac12B(2,\frac32)=\frac12\cdot\frac{\Gamma(2)\Gamma(3/2)}{\Gamma(7/2)}=\frac{2}{15}$。

> [!FORMAL] 严格表述
> 对 $s>0$ 定义 $\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}dx$，该积分在 $s>0$ 时收敛，且 $\Gamma(s+1)=s\Gamma(s)$、$\Gamma(n+1)=n!$、$\Gamma(1/2)=\sqrt\pi$。对 $p,q>0$ 定义 $B(p,q)=\int_0^1x^{p-1}(1-x)^{q-1}dx$，则 $B(p,q)=B(q,p)$，且 $B(p,q)=\Gamma(p)\Gamma(q)/\Gamma(p+q)$。证明通过换元 $u=st$、$v=s(1-t)$ 把 $\Gamma(p)\Gamma(q)$ 化为 $\Gamma(p+q)B(p,q)$。
