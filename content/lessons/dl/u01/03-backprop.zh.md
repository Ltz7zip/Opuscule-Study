---
slug: "backprop"
subject: "dl"
unit: "u01"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 深度学习 · 专业模式"
title: "反向传播"
subtitle: "误差是怎么原路退回去的"
minutes: 12
meta: ["阅读 12 分钟","需要 损失函数 · 链式法则","掌握级"]
concepts: ["backprop", "chain", "grad", "matrix"]
prereq: ["loss", "chain", "matrix"]
related: ["chain", "matrix", "grad", "loss"]
---

## 本讲目标

学完这一讲，你能用一句话解释反向传播在算什么，并且能手算一个两层网络里每个参数的梯度。

不需要背公式。我们只做三件事：看清要解决的问题、建立一句直觉、把直觉落成一次手算。

## 三行回顾

- 损失函数衡量的是"预测离目标有多远"。
- 梯度告诉我们：参数往哪个方向动一点，损失变化最快。
- 还没解决的问题是——网络一层套一层时，每个参数的梯度怎么算。

## 问题

单层模型可以直接求导。但真实的网络有几十层、几百万个参数。如果对每个参数单独求一次导，计算量大到无法接受。

反向传播解决的正是这件事：**一次前向、一次反向，把所有参数的梯度一次算完。**

它用的全部数学工具，只有一条：链式法则。

## 直觉

把网络想成一条流水线。每个工人只知道自己收到什么、交出什么，不知道整条线在做什么。

现在成品出了问题。误差从最后一道工序开始往回走，每个工人只回答一个问题：**"我手上这个动作，调整一点，最终误差会变多少？"**

这就是链式法则在做的事：局部导数一层层相乘，把最终误差的责任分摊到每一个参数上。

## 手算一次

设输入 $x = 1$，第一层权重 $w_1 = 2$，第二层权重 $w_2 = 3$，目标值 $y = 10$。网络只有两层，没有激活函数。

| 步骤 | 计算 | 结果 |
| --- | --- | --- |
| 前向：隐层 | $h = w_1 \cdot x$ | 2 |
| 前向：输出 | $o = w_2 \cdot h$ | 6 |
| 损失 | $L = (o - y)^2$ | 16 |
| 输出层梯度 | $\partial L / \partial o = 2(o - y)$ | −8 |
| $w_2$ 的梯度 | $\partial L / \partial w_2 = (\partial L / \partial o) \cdot h$ | −16 |
| 隐层梯度 | $\partial L / \partial h = (\partial L / \partial o) \cdot w_2$ | −24 |
| $w_1$ 的梯度 | $\partial L / \partial w_1 = (\partial L / \partial h) \cdot x$ | −24 |

$$
\frac{\partial L}{\partial w_2} = \frac{\partial L}{\partial o}\cdot\frac{\partial o}{\partial w_2}, \qquad
\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial o}\cdot\frac{\partial o}{\partial h}\cdot\frac{\partial h}{\partial w_1}
$$

取学习率 $\eta = 0.01$，两个参数都往梯度的反方向走：$w_2 \leftarrow 3 + 0.16 = 3.16$，$w_1 \leftarrow 2 + 0.24 = 2.24$。再前向一次，输出变成 $7.08$，损失从 **16 降到 8.54**。

注意两件事：梯度是负的，所以参数是加的；$w_2$ 的梯度比 $w_1$ 小，因为它离输出更近，承担的误差责任更少。

## 三个常见误解

> [!MYTH] 反向传播是一种新的学习算法。
> 它只是求梯度的方法。真正更新参数的是梯度下降或它的变体。

> [!MYTH] 反向传播要重新跑一遍前向。
> 它复用前向缓存的中间结果，这也是它比逐个求导快的原因。

> [!MYTH] 梯度方向就是参数该走的方向。
> 梯度指向损失上升最快的方向。我们要降低损失，所以往反方向走。

## 练习

> [!PRACTICE] 1 · 照着做
> $x = 3$，$w_1 = 1$，$w_2 = 2$，$y = 8$，求 $\partial L / \partial w_1$。
>
> > [!ANSWER] 看答案
> > $h = 3$，$o = 6$，$L = 4$，$\partial L/\partial o = -4$，$\partial L/\partial h = -8$，$\partial L/\partial w_1 = -8$。

> [!PRACTICE] 2 · 变式
> 如果把隐层换成 sigmoid 激活，链式法则要多乘哪一项？
>
> > [!ANSWER] 看答案
> > 多乘 $\sigma'(h)$。每一层非线性都会在链上增加一个局部导数，这就是"链"的含义。

> [!PRACTICE] 3 · 迁移
> 为什么反向传播必须保存前向的中间结果？不用缓存会怎样？
>
> > [!ANSWER] 看答案
> > 反向每一层都要用到前向的输入和输出。不缓存就得重算，时间换空间；缓存则是空间换时间。

> [!FORMAL] 严格表述
> 对复合函数 $L = f(g(x))$，有 $\mathrm{d}L/\mathrm{d}x = (\mathrm{d}L/\mathrm{d}g)(\mathrm{d}g/\mathrm{d}x)$。反向传播把这个规则按计算图的逆拓扑序应用一遍：每个节点只负责把自己的局部导数乘上来自上游的梯度。中间结果被缓存，因此总计算量与前向同一量级。
