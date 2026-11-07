---
slug: "parts-partial-fractions"
subject: "calculus"
unit: "u04"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 高等数学 · 专业模式"
title: "分部积分与有理函数积分"
subtitle: "乘积法则反着用，分式拆开算"
minutes: 32
meta: ["阅读 32 分钟","需要 换元积分法","掌握级"]
concepts: ["indefint", "defint"]
prereq: ["indefint"]
related: ["defint", "taylor", "impropint"]
---

## 本讲目标

积分是求导的逆运算，但这句话不提供算法。可用的办法都来自同一条原则：**把求导法则逐条反用**。链式法则反用得换元法，乘积法则反用得分部积分，把"有理函数求导后长什么样"反用，就得到部分分式。

换元法的前提是既有复合结构、又有内层导数：$\int 2x\cos(x^{2})dx$ 满足，$\int xe^{x}dx$ 不满足，$\int\ln x\,dx$ 连两个因子都没有。这类积分要把求导的负担从一个因子搬到另一个因子，正是分部积分。有理函数则相反：求导使分式变复杂，把复杂分式写成简单分式之和，就是反向还原。

学完这一讲，你应该能够：

- 由 $(uv)'=u'v+uv'$ 推出 $\int u\,dv=uv-\int v\,du$；
- 判断该取谁作 $u$，并说出"反、对、幂、指、三"何时失效；
- 处理循环型积分与由分部得到的递推公式；
- 先比次数再做除法，把假分式化为多项式加真分式；
- 按分母因式拆出部分分式，逐项积出对数、$\arctan$ 与有理项。

## 三行回顾

- $(uv)'=u'v+uv'$ 移项再积分，得 $\int u\,dv=uv-\int v\,du$。
- 分部划不划算看两条：$v$ 能求出来、$u'$ 更简单。
- 有理函数先比次数；真分式按分母因式拆，重因式写满 $j=1,\dots,k$。

## 动机：换元法在哪里失效

若 $f$ 有原函数 $F$、$g$ 可导，则 $\int f(g(x))g'(x)dx=F(g(x))+C$。前提是被积函数同时含有复合结构与内层导数，缺一半就不成立：

1. 没有内层函数：$\int xe^{x}dx$ 中两个因子互不复合；
2. 只有一个因子：$\int\ln x\,dx$ 没有可凑的部分；
3. 硬凑更糟：$\int x^{2}\cos x\,dx$ 令 $u=\sin x$ 会引出 $\arcsin u$。

换元只改变复合结构，不改变两个独立因子之间的关系；把 $(uv)'=u'v+uv'$ 反着读，就是指定让哪个因子承担求导。

## 公式的推导

设 $u,v$ 在区间 $I$ 上可导。对 $(uv)'=u'v+uv'$ 两边取原函数：

$$
uv=\int u'v\,dx+\int uv'\,dx\quad\Longrightarrow\quad\int u\,dv=uv-\int v\,du
$$

定积分版本多一个边界项：若 $u,v$ 在 $[a,b]$ 上连续可微，则

$$
\int_a^b uv'\,dx=\big[uv\big]_a^b-\int_a^b u'v\,dx
$$

中间的 $v$ 取任一原函数即可：换成 $v+C$ 时，乘积项多出 $Cu$、被积项多出 $-Cu$，正好抵消。公式只把原积分换成"乘积项减另一个积分"，不保证变简单。

## 选 $u$ 的判据

常用顺序是"**反、对、幂、指、三**"：反三角与对数优先作 $u$，幂函数次之，指数与三角优先作 $dv$。理由是：$\ln x$ 求导得 $\dfrac1x$、$\arctan x$ 求导得 $\dfrac{1}{1+x^{2}}$，超越函数被**降级**为有理函数；$x^{n}$ 每求导一次降一次；$e^{x}$、$\sin x$ 求导后仍在同类中循环。

但口诀隐含一个前提：**$dv$ 必须先积得出来**。$\int x^{3}e^{x^{2}}dx$ 就是反例：取 $u=x^{3}$、$dv=e^{x^{2}}dx$ 时 $v$ 写不出来。正确拆法是 $u=x^{2}$、$dv=xe^{x^{2}}dx$，则 $v=\dfrac12e^{x^{2}}$：

$$
\int x^{3}e^{x^{2}}dx=\frac12x^{2}e^{x^{2}}-\int xe^{x^{2}}dx=\frac12\left(x^{2}-1\right)e^{x^{2}}+C
$$

求导得 $e^{x^{2}}\left[x+x^{3}-x\right]=x^{3}e^{x^{2}}$。真正的判据是两条同时成立：$dv$ 可积、$u'$ 更简单——前者保证走得下去，后者保证走得完。

## 例题一：多项式乘指数

求 $\int xe^{x}dx$。取 $u=x$、$dv=e^{x}dx$，则 $du=dx$、$v=e^{x}$：

$$
\int xe^{x}dx=xe^{x}-\int e^{x}dx=(x-1)e^{x}+C
$$

若取 $u=e^{x}$，得到 $\dfrac{x^{2}}{2}e^{x}-\int\dfrac{x^{2}}{2}e^{x}dx$，次数从 $1$ 升到 $2$——"$u'$ 更简单"保证过程**终止**。二次情形做两次得 $\int x^{2}e^{x}dx=\left(x^{2}-2x+2\right)e^{x}+C$；一般地 $\int x^{n}e^{x}dx=\left[x^{n}-nx^{n-1}+\cdots\right]e^{x}+C$，步数等于次数。

## 例题二：孤立的超越函数

$\ln x$ 单独出现时看成 $\ln x\cdot1$，取 $u=\ln x$、$dv=dx$：

$$
\int\ln x\,dx=x\ln x-\int x\cdot\frac1x dx=x\ln x-x+C
$$

关键在 $u'=\dfrac1x$ 把超越函数降级，而 $x\cdot\dfrac1x=1$。$\arctan x$ 用同一招：

$$
\int\arctan x\,dx=x\arctan x-\int\frac{x}{1+x^{2}}dx=x\arctan x-\frac12\ln\left(1+x^{2}\right)+C
$$

求导验证：$\arctan x+\dfrac{x}{1+x^{2}}-\dfrac{x}{1+x^{2}}=\arctan x$。$\arcsin x$ 同理，得 $x\arcsin x+\sqrt{1-x^{2}}+C$。

## 例题三：循环型

求 $I=\int e^{x}\sin x\,dx$。第一轮取 $u=e^{x}$、$dv=\sin x\,dx$：

$$
I=-e^{x}\cos x+\int e^{x}\cos x\,dx
$$

第二轮**保持同一种取法**，则 $\int e^{x}\cos x\,dx=e^{x}\sin x-I$，代回得 $I=-e^{x}\cos x+e^{x}\sin x-I$。移项：

$$
2I=e^{x}\left(\sin x-\cos x\right),\qquad I=\frac{e^{x}\left(\sin x-\cos x\right)}{2}+C
$$

求导得 $\dfrac{e^{x}}{2}\left[\left(\sin x-\cos x\right)+\left(\cos x+\sin x\right)\right]=e^{x}\sin x$。两条纪律：两轮取法必须一致，否则得到 $I=I$；移项后别忘除以系数 $2$。

## 定积分与边界情形

定积分版本的边界项必须真算。取 $u=x$、$dv=\sin x\,dx$：

$$
\int_0^{\pi}x\sin x\,dx=\Big[-x\cos x\Big]_0^{\pi}+\int_0^{\pi}\cos x\,dx=\pi+0=\pi
$$

$\sin x$ 关于 $\frac{\pi}{2}$ 对称，乘以 $x$ 后右侧被放大，故结果大于 $\int_0^{\pi}\sin x\,dx=2$。可见边界项是具体数字，必须实算。

**产生递推。** 记 $I_n=\int_0^{\pi/2}\sin^{n}x\,dx$，取 $u=\sin^{n-1}x$、$dv=\sin x\,dx$，边界项为零，再用 $\cos^{2}x=1-\sin^{2}x$，得 $I_n=(n-1)\left(I_{n-2}-I_n\right)$，即 $I_n=\dfrac{n-1}{n}I_{n-2}$。配合 $I_0=\dfrac{\pi}{2}$、$I_1=1$ 可算全部，例如 $I_4=\dfrac{3\pi}{16}$。分部给出的不是答案，而是相邻两项的关系。

**无初等原函数。** $\int e^{-x^{2}}dx$ 分部后得到 $xe^{-x^{2}}+\int 2x^{2}e^{-x^{2}}dx$，次数反而升高。它与 $\int\dfrac{\sin x}{x}dx$、$\int\dfrac{dx}{\ln x}$ 都没有初等原函数，只能靠级数或数值方法。

## 有理函数：先看次数

有理函数是 $R=\dfrac{P}{Q}$。第一步不是分解分母，而是**比较次数**。若 $\deg P\ge\deg Q$（假分式），用带余除法写成 $P=SQ+R$、$\deg R<\deg Q$，则 $\dfrac{P}{Q}=S+\dfrac{R}{Q}$：$S$ 直接积分，余下的真分式才进入分解流程。跳过这步会卡死，因为部分分式的分子至多是一次式。

例：$\int\dfrac{x^{3}+x}{x^{2}-1}dx$，由 $x^{3}+x=x\left(x^{2}-1\right)+2x$ 得被积函数 $=x+\dfrac{2x}{x^{2}-1}$，后一项分子恰为分母导数，故原式 $=\dfrac{x^{2}}{2}+\ln\left|x^{2}-1\right|+C$，只在 $x\ne\pm1$ 的三段区间上分别成立。

四种情形够用，因为实系数多项式必分解为一次因式与不可约二次因式之积；$k$ 重一次因式要 $k$ 项，$m$ 重二次因式要 $m$ 项，未知数个数恰为 $\deg Q$，故解唯一。代值法与比较系数法要配合，重根只提供一个值。

## 四种基本情形

| 分母因式 | 拆法 | 积分结果 |
| --- | --- | --- |
| $x-a$ | $\dfrac{A}{x-a}$ | $A\ln\lvert x-a\rvert$ |
| $(x-a)^{k}$ | $\sum_{j=1}^{k}\dfrac{A_j}{(x-a)^{j}}$ | 对数与负幂 |
| $x^{2}+px+q$（$p^{2}<4q$） | $\dfrac{Bx+C}{x^{2}+px+q}$ | 对数 + $\arctan$ |
| $(x^{2}+px+q)^{k}$ | $\sum_{j=1}^{k}\dfrac{B_jx+C_j}{(\cdot)^{j}}$ | 对数、$\arctan$、负幂 |

逻辑统一：一次因式积出对数，高次幂积出负幂；不可约时先配方，把分子拆成"导数倍数 + 常数"，前者给对数、后者给 $\arctan$。

## 情形一：互异一次因式

求 $\int\dfrac{x+5}{(x+1)(x+2)}dx$。设

$$
\frac{x+5}{(x+1)(x+2)}=\frac{A}{x+1}+\frac{B}{x+2}\ \Longrightarrow\ x+5=A(x+2)+B(x+1)
$$

取 $x=-1$ 得 $A=4$，取 $x=-2$ 得 $B=-3$，故

$$
\int\frac{x+5}{(x+1)(x+2)}dx=4\ln|x+1|-3\ln|x+2|+C
$$

验证：$\dfrac{4}{x+1}-\dfrac{3}{x+2}=\dfrac{x+5}{(x+1)(x+2)}$。同样套路用于 $\int\dfrac{dx}{x^{2}-1}$，拆成 $\dfrac12\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$，得 $\dfrac12\ln\left|\dfrac{x-1}{x+1}\right|+C$。

## 情形二：重根

求 $\int\dfrac{x+2}{x(x-1)^{2}}dx$。单根一项、二重根写满两项：

$$
\frac{x+2}{x(x-1)^{2}}=\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^{2}}\ \Longrightarrow\ x+2=A(x-1)^{2}+Bx(x-1)+Cx
$$

取 $x=0$ 得 $A=2$，取 $x=1$ 得 $C=3$；比较 $x^{2}$ 项，左边没有 $x^{2}$ 项，故 $A+B=0$、$B=-2$。于是

$$
\int\frac{x+2}{x(x-1)^{2}}dx=2\ln|x|-2\ln|x-1|-\frac{3}{x-1}+C
$$

第三项用 $\int\dfrac{3}{(x-1)^{2}}dx=-\dfrac{3}{x-1}$。代值只能定出 $A$ 与 $C$，$B$ 必须靠比较系数，所以两种方法要并用。

## 情形三：不可约二次因式

求 $\int\dfrac{3x+5}{x^{2}+4x+13}dx$。$p^{2}-4q=16-52<0$，配方得 $(x+2)^{2}+9$；分母导数是 $2x+4$，把分子拆成"导数倍数 + 常数"：$3x+5=\dfrac32(2x+4)-1$。第一部分积出对数，第二部分给 $\arctan$：

$$
\int\frac{3x+5}{x^{2}+4x+13}dx=\frac32\ln\left(x^{2}+4x+13\right)-\frac13\arctan\frac{x+2}{3}+C
$$

最后一项用 $\int\dfrac{du}{u^{2}+9}=\dfrac13\arctan\dfrac u3$，系数易漏。一般地，

$$
\frac{Bx+C}{x^{2}+px+q}=\frac{B}{2}\cdot\frac{2x+p}{x^{2}+px+q}+\frac{C-\frac{Bp}{2}}{x^{2}+px+q}
$$

第一部分积出对数，第二部分配方后给 $\arctan$，所以"对数加 $\arctan$"不是巧合。对照 $\int\dfrac{2x+3}{x^{2}+3x+2}dx$：分子恰是分母导数，一步得 $\ln\left|x^{2}+3x+2\right|+C$，更快。

## 情形四：不可约二次因式的幂

分母含 $(x^{2}+px+q)^{k}$ 时，$j=1,\dots,k$ 全部要写，每项仍拆成导数部分与常数部分。常数部分归结为 $I_k=\int\dfrac{dx}{(x^{2}+a^{2})^{k}}$，$k\ge2$ 时靠分部降幂：把 $\dfrac{1}{(x^{2}+a^{2})^{2}}$ 拆成 $\dfrac{1}{a^{2}}\left[\dfrac{1}{x^{2}+a^{2}}-\dfrac{x^{2}}{(x^{2}+a^{2})^{2}}\right]$，再对后一项取 $u=x$、$dv=\dfrac{x\,dx}{(x^{2}+a^{2})^{2}}$，得

$$
I_2=\frac{x}{2a^{2}(x^{2}+a^{2})}+\frac{1}{2a^{3}}\arctan\frac xa+C
$$

取 $a=1$ 求导验证：$\dfrac{1-x^{2}}{2(1+x^{2})^{2}}+\dfrac{1}{2(1+x^{2})}=\dfrac{1}{(1+x^{2})^{2}}$。这里 $u$ 取最简单的 $x$，因为 $dv$ 可积、$x'=1$ 又能把二次降成一次。

## 方法对照

| 方法 | 适用条件 | 判别信号 |
| --- | --- | --- |
| 基本积分表 | 本身是标准形状 | 与公式逐字对上 |
| 凑微分（换元） | 含 $g'(x)$ 因子 | 某因子是内层导数 |
| 配方 + $\arctan$ | 二次式无实根 | $x^{2}+px+q$ 配方 |
| 分部积分 | 两个独立因子或单个超越函数 | 多项式乘超越、$\ln x$ |
| 部分分式 | 有理函数 | 分子分母都是多项式 |
| 级数或数值 | 无初等原函数 | 换元分部都越做越繁 |

排查顺序：先化简（约分、拆项）→ 找内层导数 → 有理函数先比次数、做除法与分解 → 多项式乘超越或孤立超越用分部 → 都不行再考虑递推、级数或数值。

## 三个常见误解

> [!MYTH] 一 · 分部积分时把超越函数取作 $u$ 更省事。
> 取 $u=e^{x}$ 会让次数升高：$\int xe^{x}dx$ 变成 $\dfrac{x^{2}}{2}e^{x}-\int\dfrac{x^{2}}{2}e^{x}dx$，越做越繁。判据是"$u'$ 更简单且 $v$ 可积"，不是"看起来更高级"。

> [!MYTH] 二 · 分母是二次式就必须用部分分式。
> 分子恰为分母导数时一步就对出对数，$\int\dfrac{2x+3}{x^{2}+3x+2}dx$ 就是例子。部分分式是保底方案，不是首选。

> [!MYTH] 三 · $\displaystyle\int\frac{dx}{x^{2}-1}=\ln\left|x^{2}-1\right|+C$。
> 求导 $\ln\left|x^{2}-1\right|$ 得 $\dfrac{2x}{x^{2}-1}$，分子多一个 $2x$。正确结果是 $\dfrac12\ln\left|\dfrac{x-1}{x+1}\right|+C$。

## 练习

> [!PRACTICE] 1 · 一次分部
> 求 $\displaystyle\int x\cos x\,dx$。
>
> > [!ANSWER] 看答案
> > 取 $u=x$、$dv=\cos x\,dx$，得 $x\sin x+\cos x+C$。

> [!PRACTICE] 2 · 对数乘幂
> 求 $\displaystyle\int x^{2}\ln x\,dx$。
>
> > [!ANSWER] 看答案
> > 取 $u=\ln x$、$dv=x^{2}dx$，得 $\dfrac{x^{3}}{3}\ln x-\dfrac{x^{3}}{9}+C$。

> [!PRACTICE] 3 · 反三角乘幂
> 求 $\displaystyle\int x\arctan x\,dx$。
>
> > [!ANSWER] 看答案
> > 用 $\dfrac{x^{2}}{1+x^{2}}=1-\dfrac{1}{1+x^{2}}$ 拆开，得 $\dfrac{x^{2}+1}{2}\arctan x-\dfrac x2+C$。

> [!PRACTICE] 4 · 重根
> 求 $\displaystyle\int\frac{dx}{x^{2}(x+1)}$。
>
> > [!ANSWER] 看答案
> > 设 $\dfrac{1}{x^{2}(x+1)}=\dfrac{A}{x}+\dfrac{B}{x^{2}}+\dfrac{C}{x+1}$，得 $B=1$、$C=1$、$A=-1$，故原式 $=-\ln|x|-\dfrac1x+\ln|x+1|+C$。

> [!PRACTICE] 5 · 不可约二次
> 求 $\displaystyle\int\frac{x+2}{x^{2}+2x+5}dx$。
>
> > [!ANSWER] 看答案
> > 配方为 $(x+1)^{2}+4$，写成 $x+2=\dfrac12(2x+2)+1$，得 $\dfrac12\ln\left(x^{2}+2x+5\right)+\dfrac12\arctan\dfrac{x+1}{2}+C$。

## 严格表述

> [!FORMAL] 严格表述
> **定理（分部积分）** 设 $u,v$ 在 $[a,b]$ 上连续可微，则 $\displaystyle\int_a^b uv'\,dx=u(b)v(b)-u(a)v(a)-\int_a^b u'v\,dx$；若 $u,v$ 在区间 $I$ 上连续可微，则 $\displaystyle\int u\,dv=uv-\int v\,du$，中间的原函数可取任一个。
>
> **定理（部分分式分解）** 设 $P,Q$ 为实系数多项式，$\deg P<\deg Q$，$Q$ 分解为一次因式 $(x-a_i)^{k_i}$ 与不可约二次因式 $(x^{2}+p_jx+q_j)^{m_j}$ 之积，则 $\dfrac{P}{Q}$ 可唯一地写成
> $$\sum_{i}\sum_{k=1}^{k_i}\frac{A_{ik}}{(x-a_i)^{k}}+\sum_{j}\sum_{m=1}^{m_j}\frac{B_{jm}x+C_{jm}}{\left(x^{2}+p_jx+q_j\right)^{m}}$$
> 其中所有系数都是实常数。

## 与其他讲次的联系

- **换元积分**与本讲是同一枚硬币的两面：链式法则反用得换元，乘积法则反用得分部。
- **定积分**提供牛顿–莱布尼茨公式，边界项 $\big[uv\big]_a^b$ 正是它的直接产物。
- **泰勒公式**的余项可由分部反复变形得到，$\int_a^x f^{(n+1)}(t)\dfrac{(x-t)^{n}}{n!}dt$ 就是它的产物。
- **反常积分**里分部照常，只是边界项要取极限；**微分方程**中部分分式是拆成 $\dfrac{A}{s-a}$ 查表的常规步骤。
