---
slug: "fourier-converge"
subject: "analysis"
unit: "u16"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "Fourier 级数的收敛性"
subtitle: "部分和到底收敛到函数本身，还是它的平均值"
minutes: 16
meta: ["阅读 16 分钟","需要 Fourier 系数","掌握级"]
concepts: ["fourier", "unifconv"]
prereq: ["fourier"]
related: ["fourier", "paramint"]
---

## 本讲目标

学完这一讲，你能写出 Fourier 部分和的积分表示（Dirichlet 核），陈述 Dirichlet 收敛定理，判断一个给定函数在哪些点收敛、收敛到哪个值，并说清“连续”与“一致收敛”不是一回事。

上一讲只算系数，没保证级数等于函数。这一讲补上这一步。

## 三行回顾

- 部分和 $S_n(x)$ 可以写成一个积分：$f$ 与 Dirichlet 核的卷积。
- Dirichlet 定理：分段单调（或分段光滑）的函数，级数在每点收敛到左右极限的平均值。
- 连续只保证逐点收敛；要一致收敛，还需要端点匹配与分段光滑。

## 部分和与 Dirichlet 核

把系数公式代回部分和，交换有限求和与积分：

$$S_n(x)=\frac{a_0}{2}+\sum_{k=1}^{n}\left(a_k\cos kx+b_k\sin kx\right)=\frac1\pi\int_{-\pi}^{\pi}f(x+t)\,D_n(t)\,dt,$$

其中

$$D_n(t)=\frac12+\sum_{k=1}^{n}\cos kt=\frac{\sin\left(n+\frac12\right)t}{2\sin\frac t2}$$

称为 **Dirichlet 核**。等号右端是三角恒等式，不是近似。

$D_n$ 有两个要记住的性质：$\frac1\pi\int_{-\pi}^{\pi}D_n(t)dt=1$（常数项积分给出 $\pi$，余弦项全为零）；但 $\int_{-\pi}^{\pi}|D_n(t)|dt$ 随 $n$ 像 $\ln n$ 一样增长。**积分值固定，绝对值积分发散**——这正是 Fourier 级数比幂级数难对付的根源。

## Dirichlet 收敛定理

> [!NOTE] 定理
> 设 $f$ 在 $[-\pi,\pi]$ 上有界、分段单调（或分段光滑），则对每个 $x$，
> $$S_n(x)\to\frac{f(x+)+f(x-)}{2},\qquad n\to\infty .$$

连续点处 $f(x+)=f(x-)=f(x)$，级数收敛到 $f(x)$。跳变点处收敛到左右极限的中点，与 $f$ 在该点取什么值无关。

推论：若 $f$ 连续且 $f(-\pi)=f(\pi)$，则级数在 $[-\pi,\pi]$ 上处处收敛到 $f$。端点条件不能省，因为周期延拓在拼接处才连续。

用绝对值不等式可以看到：$\left|S_n(x)-\frac{f(x+)+f(x-)}{2}\right|$ 被 $f$ 在 $x$ 附近的振幅控制，关键是 Dirichlet 核的“质量”集中在 $t=0$ 附近。

## 跳变点与 Gibbs 现象

方波在 $x=0$ 处左极限 $-1$、右极限 $1$，故 $S_n(0)\to0$。事实上每个 $S_n$ 都是正弦级数，在 $x=0$ 处恰好为 $0$，收敛没有磨损。

但跳变附近会出现**过冲**：$S_n$ 在 $x=\frac{\pi}{2n}$ 附近的峰值约为 $1.0895$，比 $1$ 高出约 $9\%$。这就是 **Gibbs 现象**。过冲不会随 $n$ 消失，只是被压向跳变点，宽度趋于零。所以方波的 Fourier 级数逐点收敛，却不是一致收敛。

## 一致收敛的条件

若 $f$ 在 $[-\pi,\pi]$ 上连续、$f(-\pi)=f(\pi)$、且分段 $C^1$，则分部积分给出

$$a_n=O\!\left(\frac1{n^2}\right),\qquad b_n=O\!\left(\frac1{n^2}\right).$$

于是 $\sum(|a_n|+|b_n|)$ 收敛，由 Weierstrass 判别法，Fourier 级数**绝对且一致**收敛于 $f$。函数越光滑，系数衰减越快，级数越好用。

另一条常用结论是 **Riemann–Lebesgue 引理**：只要 $f$ 可积，就有 $a_n\to0$、$b_n\to0$。它只保证系数趋零，不保证级数收敛到 $f$。

| 条件 | 结论 | 反例或说明 |
| --- | --- | --- |
| $f$ 可积 | $a_n,b_n\to0$ | Riemann–Lebesgue |
| 分段单调 | 逐点收敛到左右极限平均 | Dirichlet 定理 |
| 连续且端点匹配 | 逐点收敛到 $f$ | 仍需 Dirichlet 条件 |
| 连续、端点匹配、分段 $C^1$ | 绝对一致收敛 | 系数 $O(1/n^2)$ |

## 三个常见误解

> [!MYTH] 连续函数的 Fourier 级数一定一致收敛到它。
> 连续只给出逐点收敛。一致收敛需要额外条件，例如端点匹配且分段 $C^1$；否则可能出现 Gibbs 式的局部剧烈振荡。

> [!MYTH] 跳变点上级数会收敛到函数在该点的取值。
> 收敛到 $\frac{f(x+)+f(x-)}{2}$。若 $f$ 在跳变点被单独定义成别的值，级数对此毫不知情。

> [!MYTH] Gibbs 过冲是计算误差，加多项就消失。
> 峰值始终约为跳幅的 $1.0895$ 倍。加项只让过冲区变窄，高度不降。

## 练习

> [!PRACTICE] 1 · 连续点
> $f(x)=x$ 在 $x=\frac{\pi}{2}$ 处的 Fourier 级数收敛到什么？
>
> > [!ANSWER] 看答案
> > $\frac{\pi}{2}$。该点连续，左右极限都等于 $\frac{\pi}{2}$。

> [!PRACTICE] 2 · 跳变点
> 方波在 $x=\pi$ 处收敛到什么？
>
> > [!ANSWER] 看答案
> > 左极限 $1$、右极限 $-1$（周期延拓），平均为 $0$。这也与所有 $S_n(\pi)=0$ 相符。

> [!PRACTICE] 3 · 部分和手算
> 对 $f(x)=x$，写出 $S_1\left(\frac{\pi}{2}\right)$ 并与真值比较。
>
> > [!ANSWER] 看答案
> > $S_1\left(\frac{\pi}{2}\right)=2\sin\frac{\pi}{2}=2$，真值 $\frac{\pi}{2}\approx1.571$，误差约 $0.43$。取更多项会逼近，但端点附近始终慢。

> [!PRACTICE] 4 · 一致收敛判断
> $f(x)=|x|$ 在 $[-\pi,\pi]$ 上，级数是否一致收敛？
>
> > [!ANSWER] 看答案
> > 是。$|x|$ 连续、$f(-\pi)=f(\pi)=\pi$、除 $0$ 外光滑，在 $0$ 处分段 $C^1$，满足一致收敛条件；其系数为 $O(1/n^2)$。

> [!FORMAL] 严格表述
> 设 $f$ 在 $[-\pi,\pi]$ 上有界且分段单调。记 $S_n$ 为 Fourier 部分和，$D_n(t)=\frac12+\sum_{k=1}^{n}\cos kt$，则 $S_n(x)=\frac1\pi\int_{-\pi}^{\pi}f(x+t)D_n(t)dt$。Dirichlet 定理断言 $S_n(x)\to\frac12[f(x+)+f(x-)]$ 对每个 $x$ 成立；在 $f$ 的连续点即收敛到 $f(x)$。若 $f$ 连续、$f(-\pi)=f(\pi)$ 且分段 $C^1$，则 $a_n,b_n=O(n^{-2})$，级数绝对且一致收敛。对可积 $f$ 恒有 $a_n,b_n\to0$（Riemann–Lebesgue 引理）。
