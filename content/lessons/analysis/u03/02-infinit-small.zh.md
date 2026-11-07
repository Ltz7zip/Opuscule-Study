---
slug: "infinit-small"
subject: "analysis"
unit: "u03"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数学分析 · 专业模式"
title: "无穷小与无穷大"
subtitle: "比较谁消失得更快"
minutes: 14
meta: ["阅读 14 分钟","需要 函数极限","掌握级"]
concepts: ["funclim"]
prereq: ["funclim"]
related: ["cont", "deriv"]
---

## 本讲目标

极限为零的量叫无穷小。它本身不提供信息，两个无穷小的比值才有信息：分子比分母消失得快，比值就趋于零；一样快，比值趋于非零常数。

学完你能判断两个无穷小的阶，背下六个常用等价式，并在乘除中安全替换、在和差中避免踩坑。

## 三行回顾

- 无穷小是极限为零的变量，不是“很小的数”；唯一的常数无穷小是 $0$。
- $f(x)\to A$ 等价于 $f(x)-A$ 是无穷小。
- 乘除可以整体替换等价无穷小，和差不行，因为主项可能相互抵消。

## 无穷小的定义与运算

若 $\lim_{x\to x_0}\alpha(x)=0$，称 $\alpha$ 是 $x\to x_0$ 时的无穷小。

由此立刻得到：$\lim_{x\to x_0}f(x)=A$ 当且仅当 $f(x)=A+\alpha(x)$，其中 $\alpha$ 是无穷小。极限问题因此可以改写成“主项加余项”的形式。

运算性质：有限个无穷小之和、之积仍是无穷小；有界函数乘无穷小仍是无穷小。最后一条解释了大量极限：$\left|x\sin\dfrac{1}{x}\right| \le |x|$，$|x|$ 是无穷小，$\sin(1/x)$ 有界，乘积就是无穷小。

注意“有限个”不能去掉。$n$ 个 $1/n$ 相加等于 $1$，$n\to\infty$ 时项数也在变，和不再是无穷小。

## 阶的比较

设 $\alpha,\beta$ 都是 $x\to x_0$ 时的无穷小，且 $\alpha \ne 0$（去心邻域内）。

- 若 $\dfrac{\beta}{\alpha}\to 0$，称 $\beta$ 是比 $\alpha$ 高阶的无穷小，记 $\beta=o(\alpha)$；
- 若 $\dfrac{\beta}{\alpha}\to c \ne 0$，称二者同阶；
- 若 $\dfrac{\beta}{\alpha}\to 1$，称二者等价，记 $\beta\sim\alpha$。

等价是比同阶更强的要求。$x$ 与 $2x$ 同阶但不等价，$x$ 与 $\sin x$ 等价。

常用的等价式（$x\to 0$）：

$$
\sin x \sim x,\quad \tan x \sim x,\quad \arcsin x \sim x,\quad \arctan x \sim x,
$$

$$
1-\cos x \sim \frac{x^2}{2},\quad \ln(1+x)\sim x,\quad e^x-1\sim x,\quad (1+x)^\alpha - 1 \sim \alpha x .
$$

它们都可以从导数定义或基本极限推出。例如 $1-\cos x = 2\sin^2\dfrac{x}{2} \sim 2\cdot\dfrac{x^2}{4} = \dfrac{x^2}{2}$。

## 等价无穷小与一个反例

在乘除结构中，等价替换是安全的：若 $\alpha\sim\alpha'$，$\beta\sim\beta'$，则 $\lim \dfrac{\beta}{\alpha} = \lim \dfrac{\beta'}{\alpha'}$。

在和差结构中则不然。求

$$
\lim_{x\to 0}\frac{\tan x - \sin x}{x^3}.
$$

若把 $\tan x$ 与 $\sin x$ 都换成 $x$，分子成为 $x-x=0$，得到错误的答案 $0$。正确做法是先提取因子：

$$
\tan x - \sin x = \tan x(1-\cos x) \sim x \cdot \frac{x^2}{2} = \frac{x^3}{2}.
$$

所以极限为 $\dfrac{1}{2}$。抵消掉的不是主项，而是两个主项相等的部分；真正决定阶的是下一层。

## 无穷大

若对任意 $M>0$，存在去心邻域使 $|f(x)|>M$，称 $f$ 是无穷大，记 $\lim f(x)=\infty$。$x\to 0$ 时 $\dfrac{1}{x}$ 是无穷大，$x\to+\infty$ 时 $x$ 是无穷大。

无穷小与无穷大互为倒数（在非零处）：$\alpha\to 0$ 且 $\alpha\ne 0$，则 $1/\alpha\to\infty$；反之亦然。

无穷大不是实数，不能当作数做运算。$\infty-\infty$、$\dfrac{\infty}{\infty}$、$0\cdot\infty$ 都是未定式，必须回到具体函数。$x^2-x\to+\infty$，而 $(x+1)-x=1$，两者都形如 $\infty-\infty$，结果完全不同。

## 三个常见误解

> [!MYTH] 无穷小就是很小的数，比如 $10^{-100}$。
> $10^{-100}$ 是常数，极限是它自己，不是零。无穷小是随 $x$ 变化的量，例如 $x$、$\sin x$、$1-\cos x$。唯一的常数无穷小是 $0$。

> [!MYTH] 等价无穷小可以在任何位置替换。
> 乘除可以，和差不行。$\tan x-\sin x$ 中把两项都换成 $x$ 会得到 $0$，而真实极限是 $\dfrac{1}{2}$。替换必须对整体做，或先提取公因子。

> [!MYTH] 无穷大是一个很大的数，所以 $\infty-\infty=0$。
> 无穷大描述的是无界增长，不是实数。$x^2-x\to+\infty$，$(x+1)-x=1$，$x-(x^2)\to-\infty$，同样写作 $\infty-\infty$，结果各不相同。

## 练习

> [!PRACTICE] 1 · 基本替换
> 求 $\lim_{x\to 0}\dfrac{\sin 3x}{x}$。
>
> > [!ANSWER] 看答案
> > $\sin 3x \sim 3x$，故极限为 $3$。也可写成 $\dfrac{\sin 3x}{3x}\cdot 3 \to 3$。

> [!PRACTICE] 2 · 半角
> 求 $\lim_{x\to 0}\dfrac{1-\cos 2x}{x^2}$。
>
> > [!ANSWER] 看答案
> > $1-\cos 2x \sim \dfrac{(2x)^2}{2} = 2x^2$，故极限为 $2$。

> [!PRACTICE] 3 · 和差陷阱
> 求 $\lim_{x\to 0}\dfrac{\tan x-\sin x}{x^3}$。
>
> > [!ANSWER] 看答案
> > 提取 $\tan x(1-\cos x) \sim x\cdot\dfrac{x^2}{2} = \dfrac{x^3}{2}$，极限为 $\dfrac{1}{2}$。直接替换两项会得到错误的 $0$。

> [!PRACTICE] 4 · 根式
> 求 $\lim_{x\to 0}\dfrac{\sqrt{1+x}-1}{x}$。
>
> > [!ANSWER] 看答案
> > $(1+x)^{1/2}-1 \sim \dfrac{1}{2}x$，故极限为 $\dfrac{1}{2}$。也可分子有理化：$\dfrac{x}{x(\sqrt{1+x}+1)} \to \dfrac{1}{2}$。

> [!FORMAL] 严格表述
> $\alpha$ 是 $x\to x_0$ 时的无穷小，若 $\lim_{x\to x_0}\alpha(x)=0$。$\beta=o(\alpha)$ 指 $\beta/\alpha\to 0$；$\beta\sim\alpha$ 指 $\beta/\alpha\to 1$。乘除可替换：若 $\alpha\sim\alpha'$、$\beta\sim\beta'$，则 $\lim\beta/\alpha=\lim\beta'/\alpha'$，前提是分母在去心邻域内不为零。和差一般不保持等价，需先提取主因子再比较。
