---
slug: "backprop"
subject: "dl"
unit: "u01"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Deep Learning · Mastery"
title: "Backpropagation"
subtitle: "How error travels back through the network"
minutes: 12
meta: ["12 min read","Requires loss · chain rule","Mastery level"]
concepts: ["backprop", "chain", "grad", "matrix"]
prereq: ["loss", "chain", "matrix"]
related: ["chain", "matrix", "grad", "loss"]
---

## Goal

By the end of this lecture you can explain in one sentence what backpropagation computes, and hand-calculate the gradient of every parameter in a two-layer network.

No formulas to memorise. Three moves: see the problem, build one intuition, then turn it into a hand calculation.

## Three-line recap

- A loss function measures how far a prediction is from its target.
- A gradient tells you which way to nudge a parameter to change the loss fastest.
- The open question: when layers are stacked, how do we get the gradient of every parameter?

## The problem

A single layer can be differentiated directly. A real network has dozens of layers and millions of parameters. Differentiating each one separately is computationally out of reach.

Backpropagation solves exactly this: **one forward pass, one backward pass, every gradient at once.**

It uses exactly one mathematical tool: the chain rule.

## Intuition

Picture an assembly line. Each worker knows only what arrives and what leaves. No one sees the whole line.

Then the finished product comes out wrong. Error travels back from the last station, and each worker answers one question: **"If I change my step a little, how much does the final error change?"**

That is the chain rule at work: local derivatives multiplied layer by layer, spreading responsibility for the error across every parameter.

## Worked by hand

Take input $x = 1$, first weight $w_1 = 2$, second weight $w_2 = 3$, target $y = 10$. Two layers, no activation.

| Step | Computation | Result |
| --- | --- | --- |
| Forward: hidden | $h = w_1 \cdot x$ | 2 |
| Forward: output | $o = w_2 \cdot h$ | 6 |
| Loss | $L = (o - y)^2$ | 16 |
| Output gradient | $\partial L / \partial o = 2(o - y)$ | −8 |
| Gradient of $w_2$ | $\partial L / \partial w_2 = (\partial L / \partial o) \cdot h$ | −16 |
| Hidden gradient | $\partial L / \partial h = (\partial L / \partial o) \cdot w_2$ | −24 |
| Gradient of $w_1$ | $\partial L / \partial w_1 = (\partial L / \partial h) \cdot x$ | −24 |

$$
\frac{\partial L}{\partial w_2} = \frac{\partial L}{\partial o}\cdot\frac{\partial o}{\partial w_2}, \qquad
\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial o}\cdot\frac{\partial o}{\partial h}\cdot\frac{\partial h}{\partial w_1}
$$

With learning rate $\eta = 0.01$, both parameters step against the gradient: $w_2 \leftarrow 3 + 0.16 = 3.16$, $w_1 \leftarrow 2 + 0.24 = 2.24$. One more forward pass gives $7.08$, so the loss drops from **16 to 8.54**.

Two things to notice: gradients are negative, so parameters increase; and $w_2$ has a smaller gradient than $w_1$ because it sits closer to the output and carries less of the error.

## Three misconceptions

> [!MYTH] Backpropagation is a new learning algorithm.
> It only computes gradients. Gradient descent, or a variant of it, is what actually updates the weights.

> [!MYTH] Backpropagation runs a second forward pass.
> It reuses the intermediate results cached during the forward pass. That is why it is so much cheaper than differentiating each parameter separately.

> [!MYTH] The gradient points where the parameter should go.
> The gradient points uphill. We want the loss to fall, so we step in the opposite direction.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $x = 3$, $w_1 = 1$, $w_2 = 2$, $y = 8$. Compute $\partial L / \partial w_1$.
>
> > [!ANSWER] Show answer
> > $h = 3$, $o = 6$, $L = 4$, $\partial L/\partial o = -4$, $\partial L/\partial h = -8$, $\partial L/\partial w_1 = -8$.

> [!PRACTICE] 2 · Variation
> If the hidden layer used sigmoid, which extra factor appears in the chain?
>
> > [!ANSWER] Show answer
> > $\sigma'(h)$. Every non-linearity adds one local derivative to the chain — that is the "chain" in chain rule.

> [!PRACTICE] 3 · Transfer
> Why must backpropagation keep the forward intermediate results? What happens without caching?
>
> > [!ANSWER] Show answer
> > Every backward step needs the forward inputs and outputs. Without a cache you recompute them: time traded for memory. With a cache, memory is traded for time.

> [!FORMAL] Formal statement
> For a composite function $L = f(g(x))$, $\mathrm{d}L/\mathrm{d}x = (\mathrm{d}L/\mathrm{d}g)(\mathrm{d}g/\mathrm{d}x)$. Backpropagation applies this rule in reverse topological order of the computation graph: each node multiplies its local derivative by the gradient arriving from upstream. Intermediates are cached, so the total cost stays the same order as the forward pass.
