---
slug: "fourier-coeff"
subject: "analysis"
unit: "u16"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 数学分析 · 专业模式"
title: "Fourier 系数与级数展开"
subtitle: "用三角函数把一条曲线拆成无数条正弦波"
minutes: 15
meta: ["阅读 15 分钟","需要 含参积分","掌握级"]
concepts: ["fourier"]
prereq: ["paramint"]
related: ["fourier", "unifconv"]
---

## 本讲目标

学完这一讲，你能写出三角函数的正交关系，独立推导 Euler–Fourier 系数公式，并把区间 $(-\pi,\pi)$ 上的简单函数（如 $f(x)=x$、方波）展开成 Fourier 级数。

这一讲只做三件事：说明为什么是三角函数、把系数算出来、用两个例子把公式跑通。

## 三行回顾

- 幂级数在一点附近逼近函数，Fourier 级数则在整体上按“波的频率”分解函数。
- 分解的钥匙是三角函数系的正交性：不同频率的乘积在一个周期上积分为零。
- 系数公式 $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx$ 就是这样“筛”出来的。

## 三角函数系的正交性

考虑函数系

$$1,\ \cos x,\ \sin x,\ \cos 2x,\ \sin 2x,\ \dots,\ \cos nx,\ \sin nx,\ \dots$$

在 $[-\pi,\pi]$ 上，任意两个不同函数的乘积积分为零，同一个函数的平方积分非零：

$$\int_{-\pi}^{\pi}\cos nx\cos mx\,dx=\begin{cases}0,&n\ne m,\\ \pi,&n=m\ne0,\end{cases}$$

$$\int_{-\pi}^{\pi}\sin nx\sin mx\,dx=\begin{cases}0,&n\ne m,\\ \pi,&n=m,\end{cases}\qquad \int_{-\pi}^{\pi}\cos nx\sin mx\,dx=0 .$$

常数项要单独记：$\int_{-\pi}^{\pi}1^2dx=2\pi$，而 $\int_{-\pi}^{\pi}1\cdot\cos nx\,dx=0$。

正交性来自积化和差：$\cos nx\cos mx=\frac12[\cos(n-m)x+\cos(n+m)x]$，两项在一个整周期上的积分都是零（$n\ne m$ 时）。

## 系数公式的推导

设

$$f(x)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos nx+b_n\sin nx\right)$$

在 $[-\pi,\pi]$ 上一致收敛。一致收敛保证可以逐项积分——这正是上一单元的准备。

两边在 $[-\pi,\pi]$ 上积分，除常数项外全部归零：

$$\int_{-\pi}^{\pi}f(x)dx=\frac{a_0}{2}\cdot2\pi \quad\Longrightarrow\quad a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)dx .$$

两边乘 $\cos kx$ 再积分，只有 $n=k$ 的项留下：

$$a_k=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos kx\,dx,\qquad k=1,2,\dots$$

同理乘 $\sin kx$：

$$b_k=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin kx\,dx,\qquad k=1,2,\dots$$

> [!NOTE] 系数就是投影
> 把 $f$ 看成无穷维空间里的向量，$\cos nx$、$\sin nx$ 是一组正交基。$a_n,b_n$ 就是 $f$ 在这组基上的坐标，公式里的 $\frac1\pi$ 是基向量长度的平方。

## 例一：f(x)=x

$f(x)=x$ 是奇函数，乘 $\cos nx$ 后是奇函数，在对称区间上积分为零，所以 $a_0=a_n=0$。只剩正弦项：

$$b_n=\frac1\pi\int_{-\pi}^{\pi}x\sin nx\,dx=\frac1\pi\left[-\frac{x\cos nx}{n}\right]_{-\pi}^{\pi}+\frac1\pi\int_{-\pi}^{\pi}\frac{\cos nx}{n}dx .$$

第二项为零，第一项给出

$$b_n=\frac1\pi\left(-\frac{\pi\cos n\pi}{n}-\frac{\pi\cos n\pi}{n}\right)=\frac{2(-1)^{n+1}}{n}.$$

于是

$$x\sim 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx=2\left(\sin x-\frac{\sin 2x}{2}+\frac{\sin 3x}{3}-\cdots\right),\qquad -\pi<x<\pi .$$

在 $x=\frac{\pi}{2}$ 处代入，左边是 $\frac{\pi}{2}$，右边是 $2\left(1-\frac13+\frac15-\cdots\right)$，立刻得到 Leibniz 级数

$$\frac{\pi}{4}=1-\frac13+\frac15-\frac17+\cdots$$

注意端点 $x=\pm\pi$ 不成立：那里级数为零，而 $f$ 的周期延拓在端点处跳变。

## 例二：方波

取 $f(x)=-1$（$-\pi<x<0$），$f(x)=1$（$0<x<\pi$）。它是奇函数，故 $a_0=a_n=0$，且

$$b_n=\frac1\pi\left(\int_{-\pi}^{0}(-1)\sin nx\,dx+\int_{0}^{\pi}\sin nx\,dx\right)=\frac{2}{\pi}\int_0^{\pi}\sin nx\,dx=\frac{2(1-\cos n\pi)}{n\pi}.$$

$n$ 为偶数时 $1-\cos n\pi=0$；$n$ 为奇数时等于 $2$。令 $n=2k-1$：

$$f(x)\sim\frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\sin(2k-1)x}{2k-1}=\frac{4}{\pi}\left(\sin x+\frac{\sin 3x}{3}+\frac{\sin 5x}{5}+\cdots\right).$$

只有奇次谐波，因为方波本身关于 $x=\frac{\pi}{2}$ 对称。取 $x=\frac{\pi}{2}$ 得 $\frac{4}{\pi}\left(1-\frac13+\frac15-\cdots\right)=1$，与 $\pi/4$ 的 Leibniz 级数一致，可以互相校验。

## 一般周期与计算流程

若 $f$ 以 $2l$ 为周期，令 $t=\frac{\pi x}{l}$ 化到 $[-\pi,\pi]$，得

$$f(x)\sim\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l}\right),$$

$$a_n=\frac1l\int_{-l}^{l}f(x)\cos\frac{n\pi x}{l}dx,\qquad b_n=\frac1l\int_{-l}^{l}f(x)\sin\frac{n\pi x}{l}dx .$$

计算流程固定为四步：判断奇偶性以减少一半积分、算 $a_0$、算 $a_n$、算 $b_n$。写“$\sim$”而不写“$=$”，是因为此刻还没有证明级数收敛到 $f$——那是下一讲的事。

**复指数形式。** 由 Euler 公式 $e^{inx}=\cos nx+i\sin nx$，级数可以写成 $\sum_{n=-\infty}^{\infty}c_ne^{inx}$，其中 $c_n=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}dx$，且 $c_0=\frac{a_0}{2}$、$c_{\pm n}=\frac{a_n\mp ib_n}{2}$。记号更短，正交性写成 $\int_{-\pi}^{\pi}e^{inx}e^{-imx}dx=2\pi\delta_{nm}$。

## 三个常见误解

> [!MYTH] Fourier 展开就是把函数写成很多正弦相加，和 Taylor 展开差不多。
> 两者的“基”不同。Taylor 用 $x^n$ 在一点附近逼近，要求函数光滑；Fourier 用 $\cos nx,\sin nx$ 在整个区间上按频率分解，只要求绝对可积就能算系数。

> [!MYTH] 常数项应该写成 $a_0$。
> 标准形式是 $\frac{a_0}{2}$，这样 $a_0=\frac1\pi\int_{-\pi}^{\pi}f$ 与 $a_n$ 的公式完全统一。写成 $a_0$ 会让公式多出一个因子 $2$。

> [!MYTH] 系数算出后，级数就一定等于原函数。
> 只在收敛点成立。跳变点上级数收敛到左右极限的平均值；端点处还要看周期延拓后的值。

## 练习

> [!PRACTICE] 1 · 常数
> 求 $f(x)=1$ 在 $[-\pi,\pi]$ 上的 Fourier 系数。
>
> > [!ANSWER] 看答案
> > $a_0=\frac1\pi\int_{-\pi}^{\pi}dx=2$，$a_n=b_n=0$。级数就是 $\frac{a_0}{2}=1$。

> [!PRACTICE] 2 · 偶函数
> 求 $f(x)=x^2$ 在 $[-\pi,\pi]$ 上的 $b_n$，并说明理由。
>
> > [!ANSWER] 看答案
> > $x^2\sin nx$ 是奇函数，在对称区间积分为零，故 $b_n=0$。偶函数的 Fourier 级数只含余弦项。

> [!PRACTICE] 3 · 手算系数
> 对 $f(x)=x$ 直接验证 $b_1=\frac1\pi\int_{-\pi}^{\pi}x\sin x\,dx=2$。
>
> > [!ANSWER] 看答案
> > 分部积分：$\int x\sin x\,dx=\sin x-x\cos x$。在 $x=\pi$ 处为 $0-\pi(-1)=\pi$，在 $x=-\pi$ 处为 $0-(-\pi)(-1)=-\pi$，两者相差 $2\pi$，除以 $\pi$ 得 $2$。

> [!PRACTICE] 4 · 一般周期
> $f(x)=x$ 在 $[-1,1]$ 上展开，写出 $b_n$。
>
> > [!ANSWER] 看答案
> > 这里 $l=1$，$b_n=\int_{-1}^{1}x\sin n\pi x\,dx=\frac{2(-1)^{n+1}}{n\pi}$。与 $[-\pi,\pi]$ 的情形相比，多了一个 $1/\pi$。

> [!FORMAL] 严格表述
> 设 $f$ 在 $[-\pi,\pi]$ 上可积，定义 $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx$（$n\ge0$）、$b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx$（$n\ge1$），称其为 $f$ 的 Fourier 系数，并记 $f\sim\frac{a_0}{2}+\sum(a_n\cos nx+b_n\sin nx)$。若右侧一致收敛于 $f$，则逐项积分合法，由正交性 $\int_{-\pi}^{\pi}\cos nx\cos mx\,dx=\pi\delta_{nm}$、$\int_{-\pi}^{\pi}\sin nx\sin mx\,dx=\pi\delta_{nm}$ 即得上述系数公式。级数是否收敛于 $f$ 由下一讲的 Dirichlet 定理回答。
