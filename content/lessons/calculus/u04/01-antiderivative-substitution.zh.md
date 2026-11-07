---
slug: "antiderivative-substitution"
subject: "calculus"
unit: "u04"
order: 1
mode: "mastery"
lang: "zh"
kicker: "第 1 讲 · 高等数学 · 专业模式"
title: "原函数与换元积分法"
subtitle: "把求导反过来做"
minutes: 32
meta: ["阅读 32 分钟","需要 导数与微分","掌握级"]
concepts: ["indefint", "deriv"]
prereq: ["deriv"]
related: ["defint", "taylor", "areavol"]
---

## 本讲目标

求导是机械的：给定函数，按乘积法则、链式法则一路算下去，几乎不会卡住。积分要沿这条路走回来，回程既没有统一路线，答案也不唯一。本讲先回答两个前置问题——**原函数是否存在、在什么意义下唯一**——再给出第一项通用技术：换元。

换元必须分两类，因为两种情形依赖的条件不同。第一类（凑微分）处理“内层函数的导数恰好作为一个因子出现”的式子，例如 $\int xe^{x^{2}}dx$；第二类（换自变量）处理根式，例如 $\int\sqrt{1-x^{2}}dx$。两者用的是同一个公式，只是读取方向相反。

学完这一讲，你应该能够：

- 说出原函数与不定积分的区别，并解释 $+C$ 从何而来；
- 用中值定理证明“同一区间上任意两个原函数只差常数”；
- 默写基本积分表，并说清每条限制条件的来源；
- 识别被积式中的“内层函数及其导数”，一步凑出微分；
- 对含 $\sqrt{a^{2}-x^{2}}$、$\sqrt{x^{2}+a^{2}}$、$\sqrt{x^{2}-a^{2}}$ 的积分选对三角代换并正确回代。

## 三行回顾

- 若 $F'(x)=f(x)$ 在区间 $I$ 上处处成立，则 $F$ 是 $f$ 在 $I$ 上的一个原函数。
- 同一区间上任意两个原函数只差一个常数，所以 $\int f(x)\,dx=F(x)+C$ 表示一个函数族。
- 换元是链式法则的逆运算；换掉 $x$ 的同时必须把 $dx$ 换掉。

## 反求导：存在、唯一与区间

求导的终点是唯一的：可导函数只有一个导函数。倒过来走，起点一样，终点立刻不唯一。取 $f(x)=x^{2}$，则 $\dfrac{x^{3}}{3}$、$\dfrac{x^{3}}{3}+1$、$\dfrac{x^{3}}{3}-7$ 都是原函数。所以问题不能表述成“求一个原函数”，而必须表述成“求出全部原函数”。

第二个问题是存在性。连续函数在闭区间上必有原函数（这要等定积分那一讲才能证明），但**存在原函数**与**原函数是初等函数**是两件事。$\int e^{-x^{2}}dx$、$\int\frac{\sin x}{x}dx$ 的原函数都存在，却写不成有限次初等函数的组合，只能借助级数或数值方法处理。

第三个问题是定义域。原函数是**区间**上的概念；只说“$F'(x)=f(x)$”而不指明区间，结论就会含糊。$\ln\lvert x\rvert$ 的导数是 $\dfrac1x$，但 $\mathbb{R}\setminus\{0\}$ 不是区间，它的两段可以各自带不同的常数。

> [!FORMAL] 原函数的定义
> 设 $f$ 在区间 $I$ 上有定义。若存在函数 $F$，使 $F$ 在 $I$ 上可导，且对每个 $x\in I$ 都有 $F'(x)=f(x)$，则称 $F$ 为 $f$ 在 $I$ 上的一个原函数，并把全体原函数记作
> $$
> \int f(x)\,dx=F(x)+C
> $$
> 其中 $C$ 为任意常数，称为积分常数。

## 常数项从哪来：一条中值定理的推论

“全部原函数只差一个常数”是一条定理，证明只用一次拉格朗日中值定理。设 $F,G$ 都是 $f$ 在 $I$ 上的原函数，令 $H=F-G$，则对每个 $x\in I$ 有 $H'(x)=f(x)-f(x)=0$。任取 $x_{1}<x_{2}$，在 $[x_{1},x_{2}]$ 上存在 $\xi\in(x_{1},x_{2})$ 使

$$
H(x_{2})-H(x_{1})=H'(\xi)(x_{2}-x_{1})=0
$$

所以 $H(x_{2})=H(x_{1})$，由 $x_{1},x_{2}$ 的任意性，$H$ 在 $I$ 上恒为常数。证明中“$I$ 是区间”不可省：只有在一整段连通的集合上，才能从导数为零推出函数为常数。

由此得到线性性：

$$
\int\bigl[\alpha f(x)+\beta g(x)\bigr]dx=\alpha\int f(x)\,dx+\beta\int g(x)\,dx
$$

验证只需对右端求导。但积分对乘积**没有**对应的法则：既没有“$\int fg=\int f\cdot\int g$”这种公式，也没有像 $(uv)'$ 那样一步到位的规则。这正是下一讲要专门处理分部积分的原因。

## 基本积分表：把导数表倒过来读

积分表不必单独背，它只是导数表换一个方向读。把 $(x^{\alpha+1})'=(\alpha+1)x^{\alpha}$ 从右往左读就得到幂函数公式；唯一失效的位置是 $\alpha=-1$，那里分母为零，而 $\ln x$ 恰好补上缺口。

| 被积函数 | 原函数 | 限制条件 |
| --- | --- | --- |
| $x^{\alpha}$ | $\dfrac{x^{\alpha+1}}{\alpha+1}+C$ | $\alpha\ne-1$，$x>0$ |
| $\dfrac1x$ | $\ln\lvert x\rvert+C$ | $x\ne0$ |
| $e^{x}$ | $e^{x}+C$ | 无 |
| $\sin x$ | $-\cos x+C$ | 无 |
| $\cos x$ | $\sin x+C$ | 无 |
| $\sec^{2}x$ | $\tan x+C$ | $\cos x\ne0$ |
| $\dfrac{1}{1+x^{2}}$ | $\arctan x+C$ | 无 |
| $\dfrac{1}{\sqrt{1-x^{2}}}$ | $\arcsin x+C$ | $\lvert x\rvert<1$ |

表里有两处要解释。$\ln\lvert x\rvert$ 中的绝对值把 $x>0$ 与 $x<0$ 两种情况合成一行，但不代表它是 $\mathbb{R}\setminus\{0\}$ 上的“一个”原函数族。$\arcsin x$ 的 $\lvert x\rvert<1$ 则是因为端点处只有单侧导数，结论只在开区间上成立。记住表之后，做题的主要工作变成**识别**：把被积函数看成某一行的变形。

## 第一类换元：把结构收进微分

第一类换元的全部内容来自链式法则。设 $F'=f$，则

$$
\frac{d}{dx}F(\varphi(x))=F'(\varphi(x))\varphi'(x)=f(\varphi(x))\varphi'(x)
$$

两边取不定积分，得 $F(\varphi(x))+C$；而 $\int f(u)\,du=F(u)+C$ 在 $u=\varphi(x)$ 时也等于 $F(\varphi(x))+C$。于是

$$
\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du,\qquad u=\varphi(x)
$$

条件只需 $\varphi$ 可导、$f$ 在 $\varphi$ 的值域上有原函数。注意它**不要求 $\varphi$ 单调**：使用方向是 $x\to u$，回代时直接写 $u=\varphi(x)$，不需要解反函数。这一点与第二类换元形成鲜明对照。

实操中这个公式表现为“凑微分”。常用凑法值得记熟：

$$
x\,dx=\frac12d(x^{2}),\qquad \frac{dx}{x}=d\ln x,\qquad e^{x}dx=de^{x},
$$

$$
\cos x\,dx=d\sin x,\qquad \frac{dx}{\sqrt{x}}=2\,d\sqrt{x}
$$

> [!PRACTICE] 例题 1 · 一次凑微分
> 求 $\displaystyle\int xe^{x^{2}}dx$。
>
> > [!ANSWER] 看答案
> > 指数上的 $x^{2}$ 求导得 $2x$，被积式里正好有 $x\,dx$，只差常数因子。取 $u=x^{2}$，$du=2x\,dx$，即 $x\,dx=\dfrac12du$，于是
> > $$
> > \int xe^{x^{2}}dx=\frac12\int e^{u}du=\frac12e^{u}+C=\frac12e^{x^{2}}+C
> > $$
> > 验证：$\left(\dfrac12e^{x^{2}}\right)'=xe^{x^{2}}$。

再看一个对数作内层的例子。因为 $\dfrac{dx}{x}=d\ln x$，把 $\ln x$ 整体看作 $u$：

$$
\int\frac{dx}{x\ln x}=\int\frac{d\ln x}{\ln x}=\ln\lvert\ln x\rvert+C
$$

这里定义域需要 $x>0$ 且 $x\ne1$，在 $(0,1)$ 与 $(1,+\infty)$ 上分别成立。三角函数的凑法同理：$\int\tan x\,dx=-\int\dfrac{d\cos x}{\cos x}=-\ln\lvert\cos x\rvert+C$，负号来自 $d\cos x=-\sin x\,dx$。凑微分时每提取一个负号，都要在式子前面显式写出来。

判断能否用第一类换元，按三步看：被积式里有没有一个内层函数 $\varphi(x)$；它旁边有没有 $\varphi'(x)$（允许差常数倍）；剩下的部分是否只是 $\varphi$ 的函数。三条都满足就收进去，第二条不满足时通常要改用第二类。

## 第二类换元：把自变量换掉

有些式子根本没有“内层函数”可用，典型的是 $\sqrt{a^{2}-x^{2}}$。这时反过来做：不把结构收进去，而是把 $x$ 本身换成新变量 $t$ 的函数。设 $x=\varphi(t)$ 在 $J$ 上单调、可导且 $\varphi'(t)\ne0$，则 $\varphi$ 有可导的反函数 $t=\varphi^{-1}(x)$，且

$$
\int f(x)\,dx=\int f(\varphi(t))\varphi'(t)\,dt
$$

右端算完后把 $t=\varphi^{-1}(x)$ 代回，即得左端。要求 $\varphi'\ne0$ 保证反函数存在且可导，要求单调保证代换在整段上可逆。

根式代换依赖三条三角恒等式：

| 根式 | 代换 | 依据 | $t$ 的范围 |
| --- | --- | --- | --- |
| $\sqrt{a^{2}-x^{2}}$ | $x=a\sin t$ | $1-\sin^{2}t=\cos^{2}t$ | $\left[-\dfrac{\pi}{2},\dfrac{\pi}{2}\right]$ |
| $\sqrt{x^{2}+a^{2}}$ | $x=a\tan t$ | $1+\tan^{2}t=\sec^{2}t$ | $\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$ |
| $\sqrt{x^{2}-a^{2}}$ | $x=a\sec t$ | $\sec^{2}t-1=\tan^{2}t$ | $\left[0,\dfrac{\pi}{2}\right)$ |

范围一栏不能省。以第一行为例，开方得 $\sqrt{a^{2}\cos^{2}t}=a\lvert\cos t\rvert$，只有在 $t\in[-\pi/2,\pi/2]$ 上才有 $\cos t\ge0$，绝对值才能直接去掉。区间选错，回代时就会凭空多出负号。

> [!PRACTICE] 例题 2 · 三角代换的完整流程
> 求 $\displaystyle\int\sqrt{1-x^{2}}dx$。
>
> > [!ANSWER] 看答案
> > **代换。** 令 $x=\sin t$，$t\in\left[-\dfrac{\pi}{2},\dfrac{\pi}{2}\right]$，则 $dx=\cos t\,dt$，$\sqrt{1-x^{2}}=\cos t$，原式化为
> > $$
> > \int\cos^{2}t\,dt
> > $$
> > **降次。** 用 $\cos^{2}t=\dfrac{1+\cos 2t}{2}$，得 $\dfrac{t}{2}+\dfrac{\sin 2t}{4}+C$。
> > **回代。** 由 $\sin 2t=2\sin t\cos t$ 得 $\dfrac{\sin 2t}{4}=\dfrac12x\sqrt{1-x^{2}}$，且 $t=\arcsin x$，于是
> > $$
> > \int\sqrt{1-x^{2}}dx=\frac12\left(x\sqrt{1-x^{2}}+\arcsin x\right)+C
> > $$
> > **验证。** 求导后通分得 $\dfrac{1-x^{2}}{\sqrt{1-x^{2}}}=\sqrt{1-x^{2}}$，与被积函数一致。

回代方向用直角三角形记最稳：$x=\sin t$ 表示对边为 $x$、斜边为 $1$，邻边即 $\sqrt{1-x^{2}}$，故 $\cos t=\sqrt{1-x^{2}}$。整元代换 $t=\sqrt{x}$ 同样要把 $dx$ 一起换掉：

> [!PRACTICE] 例题 3 · 根式整体代换
> 求 $\displaystyle\int\frac{dx}{1+\sqrt{x}}$。
>
> > [!ANSWER] 看答案
> > 令 $t=\sqrt{x}$，则 $x=t^{2}$，$dx=2t\,dt$，$t\ge0$。代入并做多项式除法：
> > $$
> > \int\frac{2t}{1+t}dt=2\int\left(1-\frac{1}{1+t}\right)dt=2t-2\ln(1+t)+C
> > $$
> > 回代得 $\displaystyle\int\frac{dx}{1+\sqrt{x}}=2\sqrt{x}-2\ln\left(1+\sqrt{x}\right)+C$。

第二类换元的答案**必须**用原变量表示：题目给的是 $x$ 的函数，答案也必须是 $x$ 的函数，留着 $t$ 等于没有回答。

## 两类换元的分工

两种换元用同一个公式，只是读取方向不同。差别列成表：

| 项目 | 第一类：凑微分 | 第二类：换自变量 |
| --- | --- | --- |
| 代换方向 | $u=\varphi(x)$，把复合结构收进去 | $x=\varphi(t)$，把根式放出来 |
| 触发信号 | 同时出现 $\varphi(x)$ 与 $\varphi'(x)$ | 出现 $\sqrt{a^{2}-x^{2}}$ 一类根式 |
| 对 $\varphi$ 的要求 | 可导即可，不必单调 | 单调、可导、$\varphi'\ne0$ |
| 回代方式 | 直接写回 $u=\varphi(x)$ | 需解出 $t=\varphi^{-1}(x)$ |
| 典型例子 | $\displaystyle\int xe^{x^{2}}dx$ | $\displaystyle\int\sqrt{1-x^{2}}dx$ |
| 常见失误 | 漏掉常数因子或符号 | 忘记换 $dx$ |

## 边界情形：换元失效的几种方式

**内层函数不单调。** 若在 $[-1,1]$ 上取 $u=x^{2}$，则 $x$ 与 $-x$ 落到同一个 $u$ 上。公式本身不因此出错（它只要求可导），但若误以为 $u$ 与 $x$ 一一对应，回代时就会丢信息。第二类换元坚持单调性，正是为了避开这一点。

**定义域不连通。** 前面出现过两次：$\int\frac{dx}{x}=\ln\lvert x\rvert+C$、$\int\frac{dx}{x\ln x}=\ln\lvert\ln x\rvert+C$。这两个等式只在各自的连通区间上成立，常数也各自独立；把两段合并成一个 $+C$，就默认了原函数在整个定义域上只差常数，而这一步没有依据。

**代换之后反而更复杂。** 在 $\int\frac{dx}{1+x^{2}}$ 中令 $x=\tan t$ 得到 $\int1\,dt$，很成功；同样的代换用在 $\int\frac{x}{1+x^{2}}dx$ 上却得到 $\int\tan t\,dt$，比原来难。选代换的标准不是“能不能代”，而是“代完是否更简单”。

## 四个常见误解

> [!MYTH] 不定积分可以省掉 $+C$。
> 省掉它意味着你只给出了一个原函数，而题目要求的是整个函数族。求导验证只能检验其中一个成员，无法替代常数项。

> [!MYTH] $\displaystyle\int f(x)g(x)dx=\int f\,dx\cdot\int g\,dx$。
> 取 $f=g=x$：左边是 $\dfrac{x^{3}}{3}+C$，右边是 $\dfrac{x^{4}}{4}$，显然不等。积分对乘积既没有分配律，也没有乘法法则。

> [!MYTH] 换元算出结果就可以直接交卷，不必回代。
> 不定积分必须以原变量表示。答案里若只写 $t$，等于把题目换成了另一道题；回代要用到反函数，这一步错得最多。

> [!MYTH] 换元就是“把 $x$ 换成 $t$，把 $dx$ 换成 $dt$”。
> 必须写成 $dx=\varphi'(t)\,dt$。漏掉 $\varphi'(t)$ 会让结果差一个因子，求导验证时立刻暴露：$x=\sin t$ 时 $dx=\cos t\,dt$，不是 $dt$。

## 练习

> [!PRACTICE] 1 · 凑微分
> 求 $\displaystyle\int\frac{x}{1+x^{2}}dx$。
>
> > [!ANSWER] 看答案
> > 令 $u=1+x^{2}$，$du=2x\,dx$，原式 $=\dfrac12\displaystyle\int\frac{du}{u}=\dfrac12\ln(1+x^{2})+C$。因 $1+x^{2}>0$，绝对值可省。

> [!PRACTICE] 2 · 根式代换
> 求 $\displaystyle\int\frac{e^{\sqrt{x}}}{\sqrt{x}}dx$。
>
> > [!ANSWER] 看答案
> > 令 $t=\sqrt{x}$，$dx=2t\,dt$，$\dfrac{dx}{\sqrt{x}}=2\,dt$，原式 $=2e^{t}+C=2e^{\sqrt{x}}+C$。

> [!PRACTICE] 3 · 配方后换元
> 求 $\displaystyle\int\frac{dx}{x^{2}+4}$。
>
> > [!ANSWER] 看答案
> > 令 $x=2\tan t$，$dx=2\sec^{2}t\,dt$，$x^{2}+4=4\sec^{2}t$，原式 $=\dfrac12\displaystyle\int dt=\dfrac12\arctan\dfrac{x}{2}+C$。

> [!PRACTICE] 4 · 识别内层函数
> 求 $\displaystyle\int x^{2}\sqrt{1+x^{3}}\,dx$。
>
> > [!ANSWER] 看答案
> > 取 $u=1+x^{3}$，$du=3x^{2}dx$，原式 $=\dfrac13\displaystyle\int u^{1/2}du=\dfrac{2}{9}\left(1+x^{3}\right)^{3/2}+C$。

> [!PRACTICE] 5 · 带参数的三角代换
> 求 $\displaystyle\int\sqrt{4-x^{2}}\,dx$。
>
> > [!ANSWER] 看答案
> > 令 $x=2\sin t$，$dx=2\cos t\,dt$，$\sqrt{4-x^{2}}=2\cos t$，原式 $=4\displaystyle\int\cos^{2}t\,dt=2t+\sin 2t+C$。回代 $\sin t=\dfrac{x}{2}$、$\cos t=\dfrac{\sqrt{4-x^{2}}}{2}$，得
> > $$
> > \int\sqrt{4-x^{2}}dx=2\arcsin\frac{x}{2}+\frac{x}{2}\sqrt{4-x^{2}}+C
> > $$

## 严格表述

设 $f$ 在区间 $I$ 上有原函数 $F$，则 $f$ 在 $I$ 上的全部原函数恰为 $F(x)+C$（$C$ 为任意常数），记作 $\int f(x)\,dx$。证明：若 $G$ 也是原函数，则 $(G-F)'=0$ 于 $I$，由拉格朗日中值定理得 $G-F$ 为常数。

设 $\varphi$ 在区间 $J$ 上可导，$f$ 在 $\varphi(J)$ 上有原函数 $F$，则

$$
\int f(\varphi(x))\varphi'(x)\,dx=F(\varphi(x))+C
$$

这是第一类换元，对 $\varphi$ 没有单调性要求。若进一步要求 $\varphi$ 在 $J$ 上严格单调、可导且 $\varphi'\ne0$，则反函数 $t=\varphi^{-1}(x)$ 存在且可导，此时

$$
\int f(x)\,dx=\int f(\varphi(t))\varphi'(t)\,dt\Big|_{t=\varphi^{-1}(x)}
$$

这是第二类换元。两个公式本质上是同一个等式，区别只在代入方向，且后者必须回代原变量。

## 本讲与其他讲的联系

- **原函数**是定积分基本定理的另一半：牛顿—莱布尼茨公式把定积分的计算归结为求原函数。
- **换元公式**在定积分中要带上换限规则 $\int_{a}^{b}f(\varphi(x))\varphi'(x)dx=\int_{\varphi(a)}^{\varphi(b)}f(u)du$，边界条件比不定积分更严格。
- **“没有通用积分法”**会在分部积分、部分分式、三角有理式几讲里反复出现：每种方法对应一类可积结构，而不是一个万能算法；非初等原函数则说明积分表并不完备，级数展开与数值积分正是为了补这个缺口。

下一讲把乘积法则反过来用，得到分部积分；同时开始处理有理函数，把分式拆成可逐项积分的基本块。