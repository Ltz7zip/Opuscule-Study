---
slug: "rnn"
subject: "dl"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Deep Learning · Mastery"
title: "Recurrent networks"
subtitle: "Unroll time into a chain"
minutes: 14
meta: ["14 min read","Requires perceptron · backprop","Mastery level"]
concepts: ["rnn", "perceptron"]
prereq: ["perceptron"]
related: ["lstm", "backprop"]
---

## Goal

By the end of this lecture you can feed a variable-length sequence into a network with a fixed parameter count, and hand-calculate how a hidden state passes forward and backward across two steps.

Three moves only: see the tension between sequences and fixed-size inputs, write the one line that defines a hidden state, then unroll it into two forward passes and one backward pass.

## Three-line recap

- A perceptron takes a fixed-shape input and answers at a single moment.
- Convolutions share weights across space, but they look at local windows and have no notion of "the previous step".
- The open question: when the input length varies and neighbouring positions depend on each other, where does the model store what it has seen?

## The problem

Translate a sentence, transcribe speech, forecast tomorrow's temperature: the input is a sequence of vectors whose length is not known in advance. A fully connected layer demands a fixed input dimension, so the weight matrix stops matching as soon as the sentence gets longer or shorter. Truncating or padding gets something running, but both throw information away — truncation discards the tail, padding pads with meaningless zeros.

The second issue matters more: sequence elements are not independent. In "I skipped work yesterday because ___", the missing word depends on the whole preceding context, not just the previous token. A network that sees only the current input has nowhere to put "what happened before".

## Intuition

Give it a notebook. On every new word, it opens the notebook, rewrites the line "here is what I have read so far", and hands the book to the next step.

That notebook is the hidden state $h_t$. Its size is fixed — say 128 dimensions — but what it holds does not depend on sequence length. A sentence and a whole book both get 128 slots. That is the trade a recurrent network makes: **a fixed amount of memory in exchange for accepting inputs of any length.**

Every page is written the same way: mix the current token with the previous page using one recipe. The weights in that recipe never change with position; the first token and the hundredth token go through identical parameters. This is weight sharing across time.

## Worked by hand

Take a scalar hidden state with $w_h = 0.5$, $w_x = 1$, $b = 0$ and $h_0 = 0$. Two inputs: $x_1 = 1$, $x_2 = 2$.

$$h_t = \tanh\left(w_h h_{t-1} + w_x x_t + b\right)$$

| Step | Linear part | Hidden state |
| --- | --- | --- |
| $t = 1$ | $0.5 \times 0 + 1 \times 1 = 1$ | $\tanh(1) = 0.762$ |
| $t = 2$ | $0.5 \times 0.762 + 1 \times 2 = 2.381$ | $\tanh(2.381) = 0.983$ |

Use $L = (h_2 - y)^2$ with target $y = 0$, so $L = 0.983^2 = 0.966$.

Backward starts at the last step:

| Step | Computation | Result |
| --- | --- | --- |
| Output gradient | $\partial L / \partial h_2 = 2(h_2 - y)$ | $1.966$ |
| Pre-activation at step 2 | $\partial L / \partial a_2 = 1.966 \times (1 - 0.983^2)$ | $0.0662$ |
| Into hidden state 1 | $\partial L / \partial h_1 = 0.0662 \times w_h$ | $0.0331$ |
| Pre-activation at step 1 | $\partial L / \partial a_1 = 0.0331 \times (1 - 0.762^2)$ | $0.0139$ |

Each parameter collects one contribution per time step; only the sum is its real gradient:

| Parameter | From step 2 | From step 1 | Total |
| --- | --- | --- | --- |
| $w_h$ | $0.0662 \times 0.762 = 0.0504$ | $0.0139 \times 0 = 0$ | $0.0504$ |
| $w_x$ | $0.0662 \times 2 = 0.1323$ | $0.0139 \times 1 = 0.0139$ | $0.1462$ |
| $b$ | $0.0662$ | $0.0139$ | $0.0801$ |

Gradients accumulate, and that is the line people skip: **one parameter is used at every step, so it is blamed at every step.**

Now look at the path heading back. Substituting one step into the other gives

$$\frac{\partial L}{\partial a_1} = \frac{\partial L}{\partial a_2}\cdot w_h \cdot \tanh'(a_1)$$

Every step back multiplies once by $w_h$ and once by $\tanh'$. Over $T$ steps that is $w_h^{T}$ times a string of derivatives no larger than 1. Here $w_h = 0.5$, so ten steps already shrink the coefficient to about one thousandth. That product is what the next lecture is about.

## Three misconceptions

> [!MYTH] A recurrent network runs in a loop, like a while statement.
> In training it is unrolled into a feed-forward network over time. Only the weights are reused; there is no control-flow loop.

> [!MYTH] Because weights are shared across time, every hidden state is the same.
> What is shared is the weight, not the state. The same weight applied to different inputs and different previous states produces different $h_t$.

> [!MYTH] A fixed-size hidden state can only remember a fixed-length input.
> Dimensionality is a capacity limit, not a length limit. In principle even a one-dimensional state can encode an arbitrarily long input; resolution and trainability degrade sharply.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Take $w_h = 2$, $w_x = 1$, $b = 0$, $h_0 = 0$, with $x_1 = 0.5$ and $x_2 = 1$. Compute $h_1$ and $h_2$.
>
> > [!ANSWER] Show answer
> > $a_1 = 2 \times 0 + 0.5 = 0.5$, $h_1 = \tanh(0.5) = 0.462$; then $a_2 = 2 \times 0.462 + 1 = 1.924$, $h_2 = \tanh(1.924) = 0.958$.

> [!PRACTICE] 2 · Variation
> Change only $w_h$ from 0.5 to 2. By what factor does the gradient reaching step 1 grow?
>
> > [!ANSWER] Show answer
> > By 4. The factor on that link goes from 0.5 to 2, a ratio of 4. This is why the size of $w_h$ decides how far a gradient can travel in time.

> [!PRACTICE] 3 · Transfer
> For token 1 to influence step 50, how many compressions does it pass through? Is there a way around them?
>
> > [!ANSWER] Show answer
> > Forty-nine. Each hop mixes and squeezes into a fixed width, so information is necessarily lost. The way around is to connect any two positions directly — which is exactly what attention does later.

## Formal statement

> [!FORMAL] Formal statement
> For an input sequence $x_1,\dots,x_T$ with $h_0 = \mathbf{0}$, the state recurs as $h_t = \tanh(W_h h_{t-1} + W_x x_t + b)$, with parameters $\theta = \{W_h, W_x, b\}$ independent of $t$. The total loss is $L = \sum_t L_t$. Backpropagation through time runs in reverse, $t = T,\dots,1$: with $\delta_t = \partial L / \partial a_t$, $\delta_t = \left(W_h^{\top}\delta_{t+1} + \partial L_t / \partial h_t\right) \odot \tanh'(a_t)$ and $\partial L / \partial W_h = \sum_t \delta_t h_{t-1}^{\top}$. The gradient is a sum over time steps, and the long-range path carries a product of $W_h$ factors — the origin of decaying long-distance dependence.
