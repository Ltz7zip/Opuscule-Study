---
slug: "crt-modular"
subject: "discrete-mathematics"
unit: "u10"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 离散数学 · 专业模式"
title: "同余、中国剩余定理与模运算"
subtitle: "把无穷多个整数压成有限个格子"
minutes: 16
meta: ["阅读 16 分钟","需要 扩展 Euclid 算法","掌握级"]
concepts: ["numalg", "divisibility"]
prereq: ["numalg"]
related: ["divisibility", "algebra-struct"]
---

## 本讲目标

学完这一讲，你能把同余关系当成一种等价关系来用，能在模 $m$ 下做加、减、乘而不出错，能在中国剩余定理的条件下把几个小模数上的解拼成一个解，也能判断模数不互素时方程组何时有解。

这一讲的主线是"压缩"：整数有无穷多个，但模 $m$ 之后只剩 $m$ 个格子，运算被压缩成有限表上的运算。

## 三行回顾

- $a\equiv b \pmod m$ 当且仅当 $m\mid(a-b)$，它把整数分成 $m$ 个剩余类。
- 若 $a\equiv a'$、$b\equiv b'$，则 $a+b\equiv a'+b'$、$ab\equiv a'b'$，所以运算可以下放到剩余类上。
- 模 $m$ 的加法是一个群，乘法在去掉不可逆元素之后也是群，这两件事在代数结构里会再出现。

## 同余：把整数装进 m 个格子

固定模数 $m\ge1$。定义 $a\sim b$ 当且仅当 $m\mid(a-b)$。这个关系自反、对称、传递，因此是等价关系；每个等价类叫一个**剩余类**，记作 $[a]_m$，全体记作 $\mathbb{Z}_m=\{[0],[1],\dots,[m-1]\}$。

在 $\mathbb{Z}_6$ 上把乘法列成表，零因子的存在一眼可见：

| $\times$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 2 | 3 | 4 | 5 |
| 2 | 0 | 2 | 4 | 0 | 2 | 4 |
| 3 | 0 | 3 | 0 | 3 | 0 | 3 |
| 4 | 0 | 4 | 2 | 0 | 4 | 2 |
| 5 | 0 | 5 | 4 | 3 | 2 | 1 |

表里有两个现象值得记住：$2\times3\equiv0$，说明 $\mathbb{Z}_6$ 里有非零的零因子；而 $5\times5\equiv1$，说明 $5$ 可逆。一般地，$[a]_m$ 可逆当且仅当 $\gcd(a,m)=1$。

## 运算可以搬进括号

同余最有用的性质是**与运算相容**：若 $a\equiv a'$ 且 $b\equiv b'$，则

$$
a+b\equiv a'+b',\qquad a-b\equiv a'-b',\qquad ab\equiv a'b' \pmod m
$$

证明只用一句话：$a=a'+km$、$b=b'+\ell m$，代入展开后多出来的项都含因子 $m$。

于是"先算再取模"与"先取模再算"结果相同，这就是把大数计算拆小块的依据。例如求 $37\times48 \bmod 7$：$37\equiv2$、$48\equiv6$，乘积 $12\equiv5$，直接算 $1776=7\times253+5$ 也是 $5$。代价从大数乘法降成了小数乘法。

除法没有这条性质。$4\equiv1 \pmod 3$，但 $4/2=2$ 与 $1/2$ 在整数里根本没有意义；只有在除数是可逆元时，才能"乘它的逆"来代替除法。

## 中国剩余定理：小模数拼成大模数

设 $m_1,\dots,m_k$ 两两互素，$M=m_1m_2\cdots m_k$，$M_i=M/m_i$。则同余方程组

$$
x\equiv a_i \pmod{m_i}\quad(i=1,\dots,k)
$$

在模 $M$ 下有唯一解。构造方式是：令 $y_i$ 为 $M_i$ 在模 $m_i$ 下的逆，则

$$
x\equiv\sum_{i=1}^{k} a_i M_i y_i \pmod M
$$

以 $x\equiv2 \pmod3$、$x\equiv3 \pmod5$、$x\equiv2 \pmod7$ 为例。$M=105$，三个部分是 $M_1=35$、$M_2=21$、$M_3=15$；它们分别在模 $3,5,7$ 下取值为 $2,1,1$，逆依次是 $2,1,1$。于是

$$
x\equiv 2\cdot35\cdot2+3\cdot21\cdot1+2\cdot15\cdot1=140+63+30=233\equiv23 \pmod{105}
$$

验算：$23\bmod3=2$，$23\bmod5=3$，$23\bmod7=2$，全部对上。解的个数是 $1$，因为三个条件互相独立，合起来把 $105$ 个格子压成了一个。

## 模数不互素时怎么办

两两互素是充分条件，不是必要条件。方程组 $x\equiv a_1 \pmod{m_1}$、$x\equiv a_2 \pmod{m_2}$ 有解，当且仅当

$$
a_1\equiv a_2 \pmod{\gcd(m_1,m_2)}
$$

有解时，解在模 $\operatorname{lcm}(m_1,m_2)$ 下唯一。例如 $x\equiv1 \pmod4$ 与 $x\equiv3 \pmod6$：$\gcd(4,6)=2$，而 $1\equiv3 \pmod2$，条件满足。逐个试：$x=9$ 满足 $9\bmod4=1$、$9\bmod6=3$，所以通解是 $x\equiv9 \pmod{12}$。

反过来，$x\equiv1 \pmod4$ 与 $x\equiv2 \pmod6$ 就无解：两者模 $2$ 一个余 $1$ 一个余 $0$，永远碰不上。

## 三个常见误解

> [!MYTH] 同余式可以像等式一样随意约去公因子。
> $6\equiv12 \pmod 6$，两边同除以 $6$ 得到 $1\equiv2 \pmod 6$，显然不成立。正确做法是同时把模数除以 $\gcd$：$a k\equiv b k \pmod m$ 推出 $a\equiv b \pmod{m/\gcd(k,m)}$。

> [!MYTH] 中国剩余定理对任意一组模数都成立。
> 它要求模数两两互素。$x\equiv1 \pmod4$、$x\equiv2 \pmod6$ 就是反例，此时无解；有解的情形要用 $\gcd$ 条件判断，周期是 $\operatorname{lcm}$ 而不是乘积。

> [!MYTH] 模运算只用于加密，与普通编程无关。
> 哈希表取桶、循环队列下标、大整数乘法的分块、校验码，全靠"先取模再运算结果不变"这一条。

## 练习

> [!PRACTICE] 1 · 照着做
> 求 $x\equiv1 \pmod3$、$x\equiv2 \pmod5$、$x\equiv3 \pmod7$ 的最小非负解。
>
> > [!ANSWER] 看答案
> > $M=105$，$M_1=35\equiv2$，其逆为 $2$；$M_2=21\equiv1$，逆为 $1$；$M_3=15\equiv1$，逆为 $1$。$x=1\cdot35\cdot2+2\cdot21+3\cdot15=70+42+45=157\equiv52 \pmod{105}$。验算：$52\bmod3=1$，$52\bmod5=2$，$52\bmod7=3$。

> [!PRACTICE] 2 · 变式
> 解 $x\equiv2 \pmod4$、$x\equiv4 \pmod6$。
>
> > [!ANSWER] 看答案
> > $\gcd(4,6)=2$，$2\equiv4 \pmod2$，有解。$x=10$ 满足 $10\bmod4=2$、$10\bmod6=4$，通解为 $x\equiv10 \pmod{12}$。

> [!PRACTICE] 3 · 迁移
> 用模运算求 $2^{10}\bmod 7$。
>
> > [!ANSWER] 看答案
> > $2^3=8\equiv1$，所以 $2^{10}=2^{9}\cdot2=(2^3)^3\cdot2\equiv1\cdot2=2 \pmod7$。

## 严格表述

设 $m\ge1$。$\mathbb{Z}_m$ 上的加法与乘法由 $[a]+[b]=[a+b]$、$[a][b]=[ab]$ 定义，二者良定义，且满足结合律、交换律与分配律；$[0]$ 是加法单位元，$[a]$ 的加法逆元是 $[-a]$。$[a]$ 在乘法下可逆当且仅当 $\gcd(a,m)=1$。

设 $m_1,\dots,m_k$ 两两互素，$M=\prod m_i$。映射 $\varphi:\mathbb{Z}_M\to\mathbb{Z}_{m_1}\times\cdots\times\mathbb{Z}_{m_k}$，$\varphi([x]_M)=([x]_{m_1},\dots,[x]_{m_k})$ 是环同构；因此方程组 $x\equiv a_i \pmod{m_i}$ 对任意 $(a_1,\dots,a_k)$ 都有唯一解模 $M$。若模数不两两互素，则两个同余式有解当且仅当右端在模 $\gcd$ 下相等，此时解模 $\operatorname{lcm}$ 唯一。
