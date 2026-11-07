---
slug: "integration-by-parts"
subject: "analysis"
unit: "u06"
order: 4
mode: "mastery"
lang: "zh"
kicker: "第 4 讲 · 数学分析 · 专业模式"
title: "分部积分法"
subtitle: "乘积法则的积分版本，用来拆开不同类型的乘积"
minutes: 16
meta: ["阅读 16 分钟","需要 初等数学","掌握级"]
concepts: ["indefint", "deriv"]
prereq: ["indefint"]
related: ["indefint", "taylor"]
---

## 本讲目标

学完这一讲，你能写出分部积分公式并说明它的来源，能按“反对幂三指”的顺序选择 $u$，并能处理递推型与循环型两类积分。

换元法处理复合结构，分部积分处理乘积结构。多项式乘指数、多项式乘三角、对数乘多项式，这些积分没有内层导数可凑，只能靠分部把“难积的部分”转移出去。

## 三行回顾

- 乘积求导：$(uv)'=u'v+uv'$。
- 两边积分得 $uv=\int u'v\,dx+\int uv'\,dx$，移项就得到分部积分公式。
- 它的作用是交换“谁求导、谁积分”，把积分难度在两项之间重新分配。

## 分部积分公式

$$\int u\,dv=uv-\int v\,du,\qquad\text{即}\qquad\int u(x)v'(x)\,dx=u(x)v(x)-\int u'(x)v(x)\,dx .$$

这个公式没有新内容，只是乘积法则的移项。用它的唯一技巧是：选一个 $u$ 让它求导后变简单，剩下的部分作 $dv$ 要能积出来。

## 怎么选 u

常用口诀是“反对幂三指”：反三角、对数、幂函数、三角、指数，排在越前面的越适合当 $u$。理由是前面的函数求导后往往变成代数式或消失，后面的函数容易积分。

| 积分 | 取 $u$ | 取 $dv$ | 结果 |
| --- | --- | --- | --- |
| $\int x e^x dx$ | $x$ | $e^x dx$ | $(x-1)e^x+C$ |
| $\int x\cos x\,dx$ | $x$ | $\cos x\,dx$ | $x\sin x+\cos x+C$ |
| $\int \ln x\,dx$ | $\ln x$ | $dx$ | $x\ln x-x+C$ |
| $\int \arctan x\,dx$ | $\arctan x$ | $dx$ | $x\arctan x-\frac12\ln(1+x^2)+C$ |

第二行验算：$(x\sin x+\cos x)'=\sin x+x\cos x-\sin x=x\cos x$，正确。

第三行值得单独看：$\int\ln x\,dx$ 里看不出乘积，但可以取 $u=\ln x$、$dv=dx$，于是

$$\int\ln x\,dx=x\ln x-\int x\cdot\frac{1}{x}dx=x\ln x-x+C .$$

“只有一个函数”时，把 $dx$ 当作 $dv$，这是分部积分的常用入口。

## 需要两次的积分

$$\int x^2\sin x\,dx=-x^2\cos x+2\int x\cos x\,dx=-x^2\cos x+2x\sin x+2\cos x+C .$$

第一次分部把 $x^2$ 降成 $x$，第二次把 $x$ 降成常数。多项式乘三角或指数时，分部次数等于多项式的次数；每次 $u$ 取多项式，次数降一，直到常数项。

反过来，$\int x^2e^x dx=(x^2-2x+2)e^x+C$，同样两次。

## 递推与循环

**递推型**：记 $I_n=\int\sin^n x\,dx$。取 $u=\sin^{n-1}x$、$dv=\sin x\,dx$，得

$$I_n=-\sin^{n-1}x\cos x+(n-1)\int\sin^{n-2}x\cos^2x\,dx .$$

把 $\cos^2x=1-\sin^2x$ 代回，整理得

$$I_n=-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}I_{n-2} .$$

有了它，$I_0=x+C$、$I_1=-\cos x+C$ 就能推出所有 $I_n$。

**循环型**：$\int e^x\sin x\,dx$。两次分部后原积分重新出现：

$$I=e^x\sin x-e^x\cos x-I\ \Longrightarrow\ I=\frac{e^x(\sin x-\cos x)}{2}+C .$$

这里的关键是把 $I$ 当作未知数解方程，而不是无限分部下去。

## 三个常见误解

> [!MYTH] 分部积分只能做一次。
> 多项式乘三角或指数常常要做两三次；$\sin^n x$ 一类还要写成递推公式。次数由结构决定，不由公式限制。

> [!MYTH] $u$ 和 $dv$ 怎么选都行，反正公式对称。
> 公式不对称，选错会把问题变难。$\int x\ln x\,dx$ 若取 $u=x$，得到 $\frac{x^2}{2}\ln x-\int\frac{x}{2}dx$，虽然也能算完，但比取 $u=\ln x$ 多绕一步；有些选法甚至积不出 $v$。

> [!MYTH] $\int\ln x\,dx$ 不属于乘积，不能用分部积分。
> 可以，把 $dx$ 看作 $dv$，$v=x$。同理 $\int\arctan x\,dx$、$\int\arcsin x\,dx$ 都这样处理。

## 练习

> [!PRACTICE] 1 · 一次分部
> 求 $\int x\cos x\,dx$。
>
> > [!ANSWER] 看答案
> > 取 $u=x$、$dv=\cos x\,dx$，得 $x\sin x-\int\sin x\,dx=x\sin x+\cos x+C$。

> [!PRACTICE] 2 · 对数乘幂
> 求 $\int x\ln x\,dx$。
>
> > [!ANSWER] 看答案
> > 取 $u=\ln x$、$dv=x\,dx$，得 $\dfrac{x^2}{2}\ln x-\int\dfrac{x}{2}dx=\dfrac{x^2}{2}\ln x-\dfrac{x^2}{4}+C$。

> [!PRACTICE] 3 · 循环
> 求 $\int e^x\sin x\,dx$。
>
> > [!ANSWER] 看答案
> > 记 $I=\int e^x\sin x\,dx$。两次分部得 $I=e^x\sin x-e^x\cos x-I$，故 $I=\dfrac{e^x(\sin x-\cos x)}{2}+C$。

> [!PRACTICE] 4 · 两次
> 求 $\int x^2e^x\,dx$。
>
> > [!ANSWER] 看答案
> > 第一次得 $x^2e^x-2\int xe^x dx$，第二次得 $\int xe^x dx=(x-1)e^x$。合并为 $(x^2-2x+2)e^x+C$。

> [!FORMAL] 严格表述
> 设 $u,v$ 在区间 $I$ 上可导且 $u',v'$ 连续，则
> $$\int u(x)v'(x)\,dx=u(x)v(x)-\int u'(x)v(x)\,dx .$$
> 证明：对 $u(x)v(x)$ 求导得 $u'(x)v(x)+u(x)v'(x)$，两边在 $I$ 上取原函数，移项即得。若 $u',v'$ 连续，则两个积分都存在。
