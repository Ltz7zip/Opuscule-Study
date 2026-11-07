---
slug: "lr-schedule"
subject: "dl"
unit: "u05"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Deep Learning · Mastery"
title: "Schedules and early stopping"
subtitle: "When to slow down, when to stop"
minutes: 13
meta: ["13 min read","Requires adaptive optimisation","Mastery level"]
concepts: ["adam", "eval"]
prereq: ["adam"]
related: ["eval", "regular"]
---

## Goal

By the end of this lecture you can sketch a warmup-plus-cosine learning rate curve, diagnose from the loss curve whether the rate is too high or too low, and decide when to stop using a validation set and patience.

In one line: be willing to move early, hold back late, and know when to stop moving at all.

## Three-line recap

- The optimiser decides how far each parameter steps.
- But the step size should not stay the same from the first epoch to the last.
- The open question: when to enlarge the step, when to shrink it, and when to stop.

## The problem

At the start, weights are random, Adam's first and second moments have not accumulated reliable estimates, and gradient direction is noisy. Using the peak learning rate here means one update can throw the network far away and blow up the loss.

Near the end it is the opposite: parameters sit close to the optimum, large steps bounce around the basin, and validation loss stops falling. A fixed learning rate is wrong at both ends.

Stopping is its own problem. Training loss almost always keeps falling, even while the model memorises. It cannot tell us when to quit; only a validation set can.

## Intuition

Warmup is a slow start: over the first few hundred steps, raise the rate linearly from near zero to the peak, letting statistics accumulate and the weights settle somewhere reasonable.

Cosine annealing is a smooth finish: the rate follows a cosine from peak down to near zero — slow early, fast in the middle, slow again at the end. There is no step discontinuity, and the tiny final steps amount to a fine polish.

Step decay shifts gears at fixed epochs: multiply by $0.1$ at chosen milestones. Simple, but the milestones are guesswork.

Early stopping makes the validation set the referee. Record the validation metric each epoch, save weights only when it improves, and stop after patience epochs without improvement, rolling back to the best checkpoint.

## Worked by hand

Use cosine annealing $\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max}-\eta_{\min})\left(1+\cos\frac{\pi t}{T}\right)$ with $\eta_{\max} = 0.1$, $\eta_{\min} = 0$, and $T = 100$ steps.

| Progress $t/T$ | $\cos(\pi t/T)$ | Learning rate |
| --- | --- | --- |
| $25\%$ | $0.7071$ | $0.05 \times 1.7071 = 0.0854$ |
| $50\%$ | $0$ | $0.05 \times 1 = 0.0500$ |
| $75\%$ | $-0.7071$ | $0.05 \times 0.2929 = 0.0146$ |
| $100\%$ | $-1$ | $0$ |

Notice: at one quarter of the way the rate is still $85\%$ of peak, at the midpoint exactly half, at three quarters only $15\%$, and zero at the end. The first half spends most of the budget; the second half is refinement.

With ten linear warmup steps in front, step five uses $0.1 \times 5/10 = 0.05$, reaching $0.1$ at step ten before the cosine takes over.

## Three misconceptions

> [!MYTH] A smaller learning rate is always safer, so smaller is better.
> A small rate does avoid blow-ups, but under a fixed budget it underfits and stalls on a high plateau. Usually what you need is not a smaller rate but warmup plus annealing.

> [!MYTH] Early stopping can just watch training loss.
> Training loss falls almost monotonically and never gives a stop signal. You need a validation metric, and you must keep the weights from the epoch with the best validation score.

> [!MYTH] Warmup exists only for numerical stability.
> Stability is part of it. Warmup also gives Adam's moment estimates time to become reliable; with large batches and Transformers, that warmup directly affects the final result.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> With the same $\eta_{\max} = 0.1$ and $T = 100$, find the learning rate at $t = 20$.
>
> > [!ANSWER] Show answer
> > $\cos(0.2\pi) = 0.8090$, so $\eta = 0.05 \times 1.8090 = 0.09045$.

> [!PRACTICE] 2 · Variation
> If $\eta_{\min} = 0.01$, what is the rate at $t/T = 50\%$?
>
> > [!ANSWER] Show answer
> > $\eta = 0.01 + 0.5 \times 0.09 \times (1+0) = 0.01 + 0.045 = 0.055$.

> [!PRACTICE] 3 · Transfer
> Validation losses are $0.82,\ 0.80,\ 0.79,\ 0.795,\ 0.80,\ 0.81,\ 0.805,\ 0.82$ with patience $= 5$. Which epoch is best, and when do you stop?
>
> > [!ANSWER] Show answer
> > Epoch 3 is best at $0.79$. Five epochs pass without improvement, so stop at epoch 8 and roll back to the epoch 3 weights.

## Formal statement

> [!FORMAL] Formal statement
> Cosine annealing is $\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max}-\eta_{\min})(1+\cos(\pi t/T))$ for step $t$ out of $T$; warmup commonly uses $\eta_t = \eta_{\max}\, t/T_w$. Early stopping tracks the best epoch $t^\star = \arg\min_{t \le T} M_{\text{val}}(t)$ and terminates once $t - t^\star \ge P$, returning the parameters at $t^\star$, where $P$ is the patience. Only the validation set participates; the test set never informs any decision.
