---
slug: "perceptron"
subject: "dl"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Deep Learning · Mastery"
title: "The Perceptron"
subtitle: "What one straight line can separate"
minutes: 12
meta: ["12 min read","Requires matrix multiplication","Mastery level"]
concepts: ["perceptron", "matrix"]
prereq: ["matrix"]
related: ["matrix", "dl", "grad"]
---

## What you will get

By the end of this lecture you can write down a perceptron's output, decide whether a dataset can be separated by a straight line, and explain why it had to be replaced by multilayer networks.

Three things only: turn "weighted sum, then sign" into one formula, read it as a geometric move, and see exactly where it stops.

## Three lines back

- Matrix multiplication turns a list of inputs into a single number: a row vector dotted with the input.
- That number means nothing on its own; it only means something compared with a threshold.
- So the simplest classifier appears: compute one number, see which side of the threshold it falls on.

## Starting from a straight line

Two classes of points are scattered on a plane. You want a line that separates them.

That line is $w_1x_1 + w_2x_2 + b = 0$. Which side a point lies on is decided by the sign of the left side.

So the classification rule is:

$$
\hat{y} = \operatorname{sign}(w^\top x + b)
$$

This is the **perceptron**. $w$ holds the weights, $b$ the bias, and $w^\top x + b$ is the **score**. It is not a probability — it is a signed measure of distance.

## Written with matrices

Stack the $n$ inputs into a column vector $x \in \mathbb{R}^n$ and the weights into a row vector $w^\top$. Then $w^\top x$ is $1 \times n$ times $n \times 1$: a single number.

| Step | Expression | Shape |
| --- | --- | --- |
| Input | $x$ | $n \times 1$ |
| Weights | $w^\top$ | $1 \times n$ |
| Score | $w^\top x + b$ | scalar |
| Output | $\operatorname{sign}(\cdot)$ | $\pm 1$ |

With $m$ samples stacked as rows into $X \in \mathbb{R}^{m \times n}$, one product $Xw$ gives all $m$ scores at once. This is the earliest form of what deep learning calls a batch.

## A concrete example

Take $w = (1, 1)$, $b = -1$ and classify three points:

| Point | $w^\top x + b$ | Output |
| --- | --- | --- |
| $(2, 1)$ | $2 + 1 - 1 = 2$ | $+1$ |
| $(0.2, 0.3)$ | $0.2 + 0.3 - 1 = -0.5$ | $-1$ |
| $(1, 0)$ | $1 + 0 - 1 = 0$ | on the boundary |

The third point sits exactly on the line. In practice we define $\operatorname{sign}(0)$ as $+1$ or $-1$ by convention; it does not change what the model can represent.

The learning rule is one sentence: **if you get it wrong, nudge the weights toward the input.**

$$
w \leftarrow w + \eta\, y\, x, \qquad b \leftarrow b + \eta\, y
$$

Here $y \in \{-1, +1\}$ is the true label. Right answers change nothing; wrong answers move the weights. It is almost too simple to call an algorithm, yet it provably converges on **linearly separable** data.

## What it cannot do

Stack perceptrons into layers, and every layer is still "weighted sum plus sign". A composition of linear maps is linear, so a stack of linear perceptrons is equivalent to a single one.

> [!MYTH] More layers of perceptrons solve XOR.
> Without a non-linear activation between layers, $W_2(W_1x) = (W_2W_1)x$ is still linear, and XOR stays unsolved.

The XOR problem: $(0,0)$ and $(1,1)$ form one class, $(0,1)$ and $(1,0)$ the other. No single straight line separates these four points.

> [!NOTE]
> A perceptron's boundary is always a hyperplane. On linearly inseparable data, a single layer must fail.

There are only two ways out: map the inputs into a higher dimension (kernel methods), or insert non-linearity between layers (multilayer networks). Deep learning takes the second.

## Three misconceptions

> [!MYTH] The perceptron outputs a probability.
> It outputs $\pm 1$ or an unnormalised score. To get a probability, wrap the score in a sigmoid or softmax.

> [!MYTH] A large weight means that feature is important.
> A large weight only means it matters at the current scale. With unnormalised inputs, weights on features with different units are not comparable.

> [!MYTH] The perceptron is obsolete.
> It is the smallest usable linear classifier and still the entry point to SVMs, logistic regression, and multilayer networks. The last layer of a modern network is still a linear discriminant.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $w = (2, -1)$, $b = 0.5$. Find the score and output for $(1, 1)$.
>
> > [!ANSWER] Show answer
> > $2 \cdot 1 + (-1) \cdot 1 + 0.5 = 1.5$, so the output is $+1$.

> [!PRACTICE] 2 · Variation
> Change $b$ to $-2$ in the previous exercise. Does the output change, and how does the line move?
>
> > [!ANSWER] Show answer
> > The score becomes $-0.5$ and the output flips to $-1$. The bias only translates the boundary; it does not tilt it.

> [!PRACTICE] 3 · Transfer
> Why does stacking $m$ samples into a matrix and computing once give exactly the same results as one by one?
>
> > [!ANSWER] Show answer
> > Row $i$ of the product is the dot product of sample $i$ with $w$. Batching arranges the same operation in parallel; it changes nothing about each result.

> [!FORMAL] Formal statement
> A perceptron is the map $f: \mathbb{R}^n \to \{-1, +1\}$, $f(x) = \operatorname{sign}(w^\top x + b)$. If some $w, b$ classifies every sample correctly, the dataset is linearly separable, and the perceptron learning rule converges in finitely many steps (Novikoff's theorem). If the data is not linearly separable, a single layer has no zero-error solution.
