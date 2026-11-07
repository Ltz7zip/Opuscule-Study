---
slug: "optimizers"
subject: "dl"
unit: "u05"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Deep Learning · Mastery"
title: "From SGD to Adam"
subtitle: "How big a step each parameter deserves"
minutes: 15
meta: ["15 min read","Requires gradient descent · loss","Mastery level"]
concepts: ["adam", "grad"]
prereq: ["grad", "loss"]
related: ["batchnorm", "regular"]
---

## Goal

By the end of this lecture you can explain what each step from SGD to momentum to RMSProp to Adam fixes, write down the Adam update, and work two steps by hand.

In one line: an optimiser does not mainly answer “which way”, it answers “how far for each parameter”.

## Three-line recap

- A gradient gives the steepest uphill direction; its negative points downhill.
- Gradient descent uses one learning rate for every parameter, which assumes they all share a scale.
- The open question: scales, gradient magnitudes, and noise levels differ, so can each parameter set its own step?

## The problem

Loss surfaces are rarely round. A common shape is a narrow valley: steep in one direction, almost flat in another. A fixed learning rate is stuck: large enough to move along the flat axis, it oscillates across the steep one; small enough to stay stable, it crawls.

Sparse features make it worse. A rare word's embedding sees zero gradient most of the time and a tiny one occasionally. Under a single learning rate, such parameters barely move.

Add mini-batch noise: the same example may pull in opposite directions on consecutive batches. Following the raw gradient produces a jittery path.

## Intuition

Momentum turns the optimiser into a ball with inertia. It keeps a velocity, so back-and-forth motion across the valley averages out while consistent signal along the flat direction accumulates.

RMSProp takes the other side: it tracks a running average of squared gradients per parameter and divides by its square root. Parameters with consistently large gradients get smaller steps; those with consistently small gradients get relatively larger ones. Each parameter now has its own scale.

Adam combines both: the first moment carries direction and inertia, the second moment sets per-parameter step size. But $m$ and $v$ start at zero, so early estimates are far too small. Bias correction divides by $1-\beta^t$ to undo that. Without it the first steps are drastically undersized. AdamW pulls weight decay out of the gradient and applies it directly to the parameter, so the second moment cannot rescale it.

## Worked by hand

Take one parameter $w_0 = 1.0$, learning rate $\eta = 0.001$, $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$. The first two gradients are $g_1 = 0.5$ and $g_2 = -0.2$, starting from $m = 0$, $v = 0$.

**Step one:** $m = 0.1 \times 0.5 = 0.05$, $v = 0.001 \times 0.5^2 = 0.00025$.

Corrected: $\hat{m} = 0.05/(1-0.9) = 0.5$, $\hat{v} = 0.00025/(1-0.999) = 0.25$.

Step size $0.001 \times 0.5/\sqrt{0.25} = 0.001$, so $w_1 = 1.0 - 0.001 = 0.999$.

**Step two:** $m = 0.9 \times 0.05 + 0.1 \times (-0.2) = 0.025$, $v = 0.999 \times 0.00025 + 0.001 \times 0.04 = 0.00028975$.

Corrected: $\hat{m} = 0.025/(1-0.81) = 0.1316$, $\hat{v} = 0.00028975/(1-0.998001) = 0.1449$.

Step size $0.001 \times 0.1316/\sqrt{0.1449} \approx 0.000346$, so $w_2 \approx 0.998654$.

The two steps move $0.001346$ in total. Two details matter: the first step equals $\eta$ exactly, because with a single gradient seen $\hat{m}/\sqrt{\hat{v}} = 1$; and the second step shrinks sharply once the gradient flips sign, which is momentum damping oscillation.

## Three misconceptions

> [!MYTH] Adam is always better than SGD with momentum.
> Adam is easier to tune and converges faster, but on many vision tasks SGD with momentum generalises better in the end. The practical rule: start with Adam to get the pipeline working, then try SGD if the last point of accuracy matters.

> [!MYTH] Bias correction is a cosmetic trick you can skip.
> In the first step the denominator for $\hat{v}$ is $1-0.999 = 0.001$, a correction of about $31.6\times$. Without it, early steps are either nearly frozen or badly scaled by the second moment.

> [!MYTH] AdamW is just Adam plus L2 regularisation.
> An L2 term inside the gradient gets divided by the second moment, so the effective decay varies per parameter. AdamW multiplies the decay straight onto the parameter, decoupled from the gradient — that is the difference.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Starting from $m = v = 0$ with a single gradient $g_1 = 0.2$ and the same hyperparameters, find the size and direction of step one.
>
> > [!ANSWER] Show answer
> > $m = 0.02$, $v = 0.00004$, $\hat{m} = 0.2$, $\hat{v} = 0.04$, step $0.001 \times 0.2/0.2 = 0.001$ along the negative gradient.

> [!PRACTICE] 2 · Variation
> If the gradients are $+0.5$ then $-0.5$, how does Adam's step size change?
>
> > [!ANSWER] Show answer
> > The first moment falls from $0.05$ to $-0.005$, nearly cancelling, while the second moment keeps accumulating at the same order. The step shrinks markedly, so oscillation is suppressed.

> [!PRACTICE] 3 · Transfer
> Why is there an $\epsilon$ in Adam's denominator? What happens without it?
>
> > [!ANSWER] Show answer
> > When a parameter's gradients stay near zero, $v$ approaches zero and the division overflows. $\epsilon$ is both numerical protection and, in effect, a cap on the step for such parameters.

## Formal statement

> [!FORMAL] Formal statement
> Adam keeps $m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t$ and $v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2$, corrects them as $\hat{m}_t = m_t/(1-\beta_1^t)$ and $\hat{v}_t = v_t/(1-\beta_2^t)$, and updates $w_t = w_{t-1} - \eta \hat{m}_t/(\sqrt{\hat{v}_t}+\epsilon)$. AdamW instead uses $w_t = w_{t-1} - \eta(\hat{m}_t/(\sqrt{\hat{v}_t}+\epsilon) + \lambda w_{t-1})$, so decay never passes through the second moment.
