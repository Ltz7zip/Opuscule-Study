---
slug: "fourier-props"
subject: "analysis"
unit: "u16"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 数学分析 · 专业模式"
title: "Fourier 级数的性质与应用"
subtitle: "逐项积分、Parseval 等式与两个著名的级数和"
minutes: 16
meta: ["阅读 16 分钟","需要 Fourier 级数","掌握级"]
concepts: ["fourier"]
prereq: ["fourier"]
related: ["fourier", "unifconv"]
---

## 本讲目标

学完这一讲，你能由定义在 $(0,\pi)$ 上的函数写出它的余弦级数与正弦级数，判断何时可以逐项积分、何时可以逐项求导，并用 Parseval 等式求出一类数项级数的和。

到这里，Fourier 级数从“表示工具”变成了“计算工具”。

## 三行回顾

- 奇延拓给正弦级数，偶延拓给余弦级数，选择哪一个取决于端点处想要什么性质。
- 逐项积分几乎总是安全的；逐项求导要求光滑性与端点匹配，代价高得多。
- Parseval 等式把函数的平方积分换成系数的平方和，是求级数和的主力。

## 奇偶延拓与正余弦级数

只给出 $f$ 在 $(0,\pi)$ 上的值时，它在 $[-\pi,\pi]$ 上的延拓方式不唯一，对应的级数也不同。

**偶延拓**：令 $f(-x)=f(x)$。此时 $b_n=0$，

$$a_n=\frac{2}{\pi}\int_0^{\pi}f(x)\cos nx\,dx,\qquad n=0,1,2,\dots$$

得到**余弦级数**。它在 $x=0$ 处自动满足 $f'(0+)=0$（若可导），适合描述“端点绝热”的物理问题。

**奇延拓**：令 $f(-x)=-f(x)$。此时 $a_n=0$，

$$b_n=\frac{2}{\pi}\int_0^{\pi}f(x)\sin nx\,dx,\qquad n=1,2,\dots$$

得到**正弦级数**，在 $x=0$ 处自动取零，适合描述“端点固定”的问题。

以 $f(x)=x$（$0<x<\pi$）为例。偶延拓后 $a_0=\pi$，$a_n=\frac{2}{\pi}\cdot\frac{(-1)^n-1}{n^2}$，即

$$x\sim\frac{\pi}{2}-\frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\cos(2k-1)x}{(2k-1)^2},$$

只有奇次余弦项。奇延拓后回到上一讲的 $2\sum\frac{(-1)^{n+1}}{n}\sin nx$。同一个函数，两种级数，收敛速度也不同：余弦级数的系数是 $O(1/n^2)$，正弦级数是 $O(1/n)$。

## 逐项积分

> [!NOTE] 逐项积分定理
> 设 $f$ 在 $[-\pi,\pi]$ 上可积，$f(x)\sim\frac{a_0}{2}+\sum(a_n\cos nx+b_n\sin nx)$。则对任意 $x$，
> $$\int_0^{x}f(t)\,dt=\frac{a_0}{2}x+\sum_{n=1}^{\infty}\frac{a_n\sin nx+b_n(1-\cos nx)}{n},$$
> 右端在 $[-\pi,\pi]$ 上一致收敛。

注意条件：**只要求 $f$ 可积**，不要求原级数收敛。逐项积分是最宽容的运算，因为积分把振荡“抹平”了一层，系数多了一个 $1/n$。

方波的级数在跳变点不收敛到 $f$，但两边逐项积分仍然成立，得到的级数一致收敛。这一点在计算中非常实用。

## 逐项求导

求导则相反，它把系数放大 $n$ 倍，条件苛刻得多。若 $f$ 在 $[-\pi,\pi]$ 上连续、$f(-\pi)=f(\pi)$、分段 $C^1$ 且 $f'$ 分段光滑，则

$$f'(x)\sim\sum_{n=1}^{\infty}\left(nb_n\cos nx-na_n\sin nx\right).$$

端点匹配不能省：$f(-\pi)\ne f(\pi)$ 时，周期延拓在拼接处有跳变，逐项求导必然出错。

反例：$f(x)=x$ 的级数是 $2\sum\frac{(-1)^{n+1}}{n}\sin nx$。形式上逐项求导得 $2\sum(-1)^{n+1}\cos nx$，通项不趋于零，级数发散。原因正是 $f(-\pi)=-\pi\ne\pi=f(\pi)$。而 $f(x)=x^2$ 在 $[-\pi,\pi]$ 上端点值相同，逐项求导给出 $2x$ 的余弦级数，合法。

## Parseval 等式

> [!NOTE] Parseval 等式
> 若 $f$ 在 $[-\pi,\pi]$ 上可积且平方可积，则
> $$\frac1\pi\int_{-\pi}^{\pi}f^2(x)\,dx=\frac{a_0^2}{2}+\sum_{n=1}^{\infty}\left(a_n^2+b_n^2\right).$$

这是勾股定理在函数空间里的形式：函数长度的平方等于各坐标平方之和。

**例 1（Basel 问题）**：取 $f(x)=x$，$a_0=a_n=0$，$b_n=\frac{2(-1)^{n+1}}{n}$。左边是 $\frac1\pi\cdot\frac{2\pi^3}{3}=\frac{2\pi^2}{3}$，右边是 $4\sum\frac1{n^2}$。于是

$$\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}\approx1.6449 .$$

**例 2**：取方波。左边 $\frac1\pi\cdot2\pi=2$，右边 $\frac{16}{\pi^2}\sum_{k=1}^{\infty}\frac1{(2k-1)^2}$，故

$$\sum_{k=1}^{\infty}\frac1{(2k-1)^2}=\frac{\pi^2}{8}\approx1.2337 .$$

两式相减即得 $\sum\frac{(-1)^{n+1}}{n^2}=\frac{\pi^2}{12}$。

## 三个常见误解

> [!MYTH] 两种延拓得到的级数应该相等。
> 它们只在 $(0,\pi)$ 内表示同一个函数，在 $[-\pi,0]$ 上分别等于偶延拓与奇延拓，是两个不同的函数。

> [!MYTH] Fourier 级数可以随便逐项求导。
> 求导放大系数 $n$ 倍，需要连续、端点匹配、分段光滑。$f(x)=x$ 的级数逐项求导直接发散。

> [!MYTH] Parseval 等式是近似关系。
> 它在 $f$ 平方可积时是严格等式。正因为严格，才能用它把 $\sum1/n^2$ 算成精确值 $\pi^2/6$。

## 练习

> [!PRACTICE] 1 · 选择延拓
> 要把 $f(x)=1$（$0<x<\pi$）展成级数，希望端点 $x=0,\pi$ 处导数为零，该用哪种延拓？
>
> > [!ANSWER] 看答案
> > 偶延拓，得余弦级数。$f\equiv1$ 延拓后仍是常数，级数就是 $1$ 本身，$a_0=2$，其余系数为零。

> [!PRACTICE] 2 · 正弦级数系数
> 求 $f(x)=1$（$0<x<\pi$）的正弦级数系数 $b_n$。
>
> > [!ANSWER] 看答案
> > $b_n=\frac2\pi\int_0^{\pi}\sin nx\,dx=\frac{2(1-\cos n\pi)}{n\pi}$：$n$ 为奇数时等于 $\frac{4}{n\pi}$，偶数时为零。

> [!PRACTICE] 3 · Parseval
> 用方波的 Parseval 等式求 $\sum_{k\ge1}(2k-1)^{-2}$。
>
> > [!ANSWER] 看答案
> > $\frac1\pi\int_{-\pi}^{\pi}1\,dx=2=\frac{16}{\pi^2}\sum\frac1{(2k-1)^2}$，故和为 $\frac{\pi^2}{8}$。

> [!PRACTICE] 4 · 求导条件
> $f(x)=|x|$ 的级数能否逐项求导得到 $f'$ 的级数？
>
> > [!ANSWER] 看答案
> > 不能直接在整个区间上求导。$f$ 在 $x=0$ 不可导，分段光滑条件只在不含 $0$ 的区间上成立；在 $(-\pi,0)$ 与 $(0,\pi)$ 内可以逐项求导。

> [!FORMAL] 严格表述
> 设 $f$ 在 $(0,\pi)$ 上可积。其偶延拓的 Fourier 级数为余弦级数，系数 $a_n=\frac2\pi\int_0^{\pi}f(x)\cos nx\,dx$（$n\ge0$），$b_n=0$；其奇延拓的级数为正弦级数，$b_n=\frac2\pi\int_0^{\pi}f(x)\sin nx\,dx$（$n\ge1$），$a_n=0$。对可积 $f$，其 Fourier 级数可逐项积分且所得级数一致收敛。若 $f$ 连续、$f(-\pi)=f(\pi)$、分段 $C^1$ 且 $f'$ 分段光滑，则可逐项求导。若 $f$ 平方可积，则 Parseval 等式 $\frac1\pi\int_{-\pi}^{\pi}f^2=\frac{a_0^2}{2}+\sum(a_n^2+b_n^2)$ 成立。
