---
slug: "lstm"
subject: "dl"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Deep Learning · Mastery"
title: "Vanishing gradients and gates"
subtitle: "A shortcut for memory"
minutes: 15
meta: ["15 min read","Requires recurrent networks","Mastery level"]
concepts: ["lstm", "rnn"]
prereq: ["rnn"]
related: ["seq2seq", "backprop"]
---

## Goal

By the end of this lecture you can explain in one sentence why a plain recurrent network forgets what happened fifty steps ago, and hand-calculate one cell-state update from a given set of gate values.

## Three-line recap

- A recurrent network unrolls a sequence into a chain, passing the hidden state forward at each step.
- Backpropagation walks the same chain in reverse, multiplying by $W_h$ and $\tanh'$ at every hop.
- The open question: over a long chain, that product drives the gradient to essentially zero.

## The problem

The recursion from the last lecture is $h_t = \tanh(W_h h_{t-1} + W_x x_t + b)$. Travelling back from $t$ to $t-1$ multiplies two things: the weight matrix $W_h$ and the derivative of $\tanh$.

The derivative of $\tanh$ is at most 1 and falls below 0.1 once the pre-activation is even moderately large; the scale of $W_h$ is usually below 1 as well. Over twenty steps, with an average factor of 0.25, the total factor is $0.25^{20} \approx 9 \times 10^{-13}$. float32 carries roughly seven significant decimal digits, so the number has already sunk into rounding noise. Vanishing gradients are not a metaphor; they are an underflow you can compute.

The same argument runs the other way: with an average factor of 4, twenty steps give $4^{20} \approx 1.1 \times 10^{12}$ and a single update throws the parameters out of any usable range.

The LSTM starts from a plain idea: **if every step multiplies, build a path that mostly adds.**

## Intuition

The cell state $c_t$ is a conveyor belt laid from the first token to the last. Only two operations touch the belt: multiply by a number between 0 and 1 to drop a little, or add a number to write a little.

What rides the belt is never squeezed at each station. That is the gradient shortcut: going backward, the gradient of $c_t$ reaches $c_{t-1}$ after a single multiplication by the forget gate $f_t$ — no $\tanh$, no repeated $W_h$.

The three gates divide the work: the forget gate decides how much old content stays, the input gate how much new content is written, the output gate how much is exposed at this step. Gates are sigmoids, so their outputs lie between 0 and 1 and read as percentages. The candidate written onto the belt is produced by $\tanh$ and lies in $[-1, 1]$.

$$f_t = \sigma(W_f [h_{t-1}, x_t] + b_f),\quad i_t = \sigma(W_i [h_{t-1}, x_t] + b_i)$$

$$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t,\qquad h_t = o_t \odot \tanh(c_t)$$

The GRU tightens the design: it merges $c$ and $h$ and keeps only an update gate and a reset gate, $h_t = (1 - z_t)\odot h_{t-1} + z_t \odot \tilde{h}_t$. About a third fewer parameters, comparable accuracy on most tasks.

## Worked by hand

Take dimension 3, with the gate values below and previous cell state $c_{t-1} = [1.0,\ -2.0,\ 0.5]$.

| Dim | $c_{t-1}$ | $f$ | $i$ | $\tilde{c}$ | $o$ |
| --- | --- | --- | --- | --- | --- |
| 1 | 1.0 | 0.9 | 0.8 | 1.0 | 0.9 |
| 2 | −2.0 | 0.5 | 0.2 | −1.0 | 0.4 |
| 3 | 0.5 | 0.1 | 0.6 | 0.5 | 0.7 |

First the cell state, element by element:

| Dim | Keep $f \odot c_{t-1}$ | Write $i \odot \tilde{c}$ | $c_t$ |
| --- | --- | --- | --- |
| 1 | $0.9 \times 1.0 = 0.90$ | $0.8 \times 1.0 = 0.80$ | 1.70 |
| 2 | $0.5 \times (-2.0) = -1.00$ | $0.2 \times (-1.0) = -0.20$ | −1.20 |
| 3 | $0.1 \times 0.5 = 0.05$ | $0.6 \times 0.5 = 0.30$ | 0.35 |

Then the output:

| Dim | $\tanh(c_t)$ | $o$ | $h_t$ |
| --- | --- | --- | --- |
| 1 | 0.935 | 0.9 | 0.842 |
| 2 | −0.834 | 0.4 | −0.334 |
| 3 | 0.336 | 0.7 | 0.235 |

Now the gradient. Suppose upstream hands $c_t$ the gradient $[0.5,\ -1.0,\ 2.0]$. The main route back to $c_{t-1}$ multiplies element-wise by $f$, giving $[0.45,\ -0.5,\ 0.2]$. Dimension 2 has $f = 0.5$ and loses half; dimension 3 has $f = 0.1$ and keeps a tenth.

The crucial point is that this factor is **learned**. If a dimension really must be remembered for a long time, the network pushes its $f$ toward 1 and the gradient passes almost untouched. With $f = 0.9$ for twenty steps the total factor is $0.9^{20} = 0.12$ — about an eighth survives, against $9 \times 10^{-13}$ on the previous lecture's route. The difference is not the activation function; it is whether a path exists that is not squeezed at every station.

## Three misconceptions

> [!MYTH] LSTMs solve vanishing gradients.
> They mitigate, not eliminate. Gates are sigmoids too, so products remain; the main path's factors can merely be learned close to 1, turning exponential decay into something controllable.

> [!MYTH] A gate is a switch: 0 or 1.
> Gates are continuous sigmoid outputs, which is what keeps them differentiable during training. Binarisation shows up only in inference-time compression.

> [!MYTH] The cell state is the hidden state.
> $c_t$ is the internal long-term memory; $h_t = o_t \odot \tanh(c_t)$ is the part passed through the output gate and exposed. The next layer receives $h$, never $c$.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Take $c_{t-1} = 2$, $f = 0.8$, $i = 0.5$, $\tilde{c} = -1$. Compute $c_t$.
>
> > [!ANSWER] Show answer
> > $c_t = 0.8 \times 2 + 0.5 \times (-1) = 1.6 - 0.5 = 1.1$.

> [!PRACTICE] 2 · Variation
> If $f = 1$ and $i = 0$, what is $c_t$? How much does the gradient decay on the way back?
>
> > [!ANSWER] Show answer
> > $c_t = c_{t-1}$: the belt does not move and the gradient is multiplied by 1, passing through unchanged. This is the extreme "remember forever" case the design aims at.

> [!PRACTICE] 3 · Transfer
> If every dimension's $f$ were learned as 0, what would the model become?
>
> > [!ANSWER] Show answer
> > The cell is cleared at every step, leaving only what the current input writes in. The model degenerates into a memoryless feed-forward network, equivalent to predicting from a one-step window.

## Formal statement

> [!FORMAL] Formal statement
> Let $z_t = [h_{t-1}, x_t]$. Then $f_t, i_t, o_t = \sigma(W z_t + b)$, $\tilde{c}_t = \tanh(W_c z_t + b_c)$, $c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$, and $h_t = o_t \odot \tanh(c_t)$. The Jacobian along the cell state is diagonal, $\partial c_t / \partial c_{t-1} = \mathrm{diag}(f_t)$, so propagation over $k$ steps is an element-wise product $\prod_j f_{t-j}$ rather than a chain of general matrix products. When $f \approx 1$ that path does not decay, and gradients survive across long spans. The gates and candidate still pass through sigmoid and tanh, so saturation weakens gradients through side routes: this is mitigation, not a cure.
