---
slug: "overfit"
subject: "dl"
unit: "u06"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Deep Learning · Mastery"
title: "Bias, variance, and error analysis"
subtitle: "Where it fails matters more than how much"
minutes: 15
meta: ["15 min read","Requires evaluation · regularisation","Mastery level"]
concepts: ["eval", "regular"]
prereq: ["eval", "regular"]
related: ["metric", "deploy"]
---

## Goal

By the end of this lecture you can read the gap between training and validation error, diagnose high bias versus high variance, choose the matching remedy, and use a small error analysis to turn "the model is bad" into a few concrete, fixable problems.

Diagnosis beats tuning. With the wrong diagnosis, more experiments only climb the wrong hill further.

## Three-line recap

- A split gives you two numbers: training error and validation error.
- A metric says how much is wrong, not where.
- The open question: what does the gap mean, and what should change next?

## The problem

Training error 2%, validation error 11%, a gap of nine points. You could add data, add regularisation, change the architecture, or clean labels, but there is budget for one move. Choose wrong and two weeks are gone.

"Overfitting" carries very little information. It does not say whether capacity is too high, the validation distribution differs, or the evaluation code has a bug. To act, the diagnosis has to be sharper.

## Intuition

Think of error as target practice.

- **High bias**: the holes are tightly clustered but off-centre. The model is too simple or lacks features, and more training will not help. The remedy is more capacity, better features, less regularisation.
- **High variance**: the holes average near the centre but scatter widely. The model is too sensitive to the training sample and changes with a new draw. The remedy is more data, more regularisation, early stopping, augmentation.

The learning curve draws this picture: training-set size on the horizontal axis, error on the vertical. Both curves high and close together means high bias; a low training curve with a visibly higher validation curve means high variance.

There is a third case: both errors are low and production still collapses. That is not a bias-variance problem but a distribution shift. Regularisation and more data will not save it; go and inspect where the data came from.

Error analysis is a separate move. Sample 100 to 200 validation errors and tag them by hand: label noise, poor input quality, genuinely ambiguous cases, or things the model should have learned. After tagging, the problem turns from "89% accuracy" into "four points come from annotation noise", which is actionable.

## Worked by hand

The validation set has 5000 samples and an 11% error rate, so 550 errors. Training error is 2%, validation error 11%.

| Item | Computation | Result |
| --- | --- | --- |
| Training error | given | 2% |
| Validation error | given | 11% |
| Gap | $11\% - 2\%$ | 9 points |
| Validation errors | $5000 \times 11\%$ | 550 |
| Sample 200 | $200/550$ | 36% coverage |

Diagnosis: very low training error with a large gap is classic high variance. Add data or regularisation before making the model bigger.

Now the sampling ratio. To collect 500 errors, the current 550 are enough. But suppose the validation set had only 2000 samples and therefore 220 errors. Invert the error rate to see how much data you would have to inspect:

$$
\frac{500}{0.11} \approx 4545
$$

You would need to review about 4545 samples to find 500 errors. With only 2000 available, the validation set is too small and the conclusions of error analysis will be unstable; enlarge it first.

One last calculation. If 60 of the 200 sampled errors are mislabelled, that is 30%, which corresponds to $0.30 \times 11\% = 3.3$ points overall. Fixing the labels lowers the theoretical floor from 11% to about 7.7%, a far better return than a larger model.

## Three misconceptions

> [!MYTH] High validation error means overfitting.
> It can also mean distribution shift, a leaky split, a bug in the evaluation code, or a validation set that is simply too small. Confirm that both sets come from the same distribution and that preprocessing was not fitted across them before invoking bias and variance.

> [!MYTH] More data always fixes it.
> Under high bias, more data barely helps: capacity is the constraint, and extra samples cannot be fitted. More data only helps high variance. Conversely, under high variance, making the model bigger usually makes things worse.

> [!MYTH] Error analysis means reading every mistake.
> Reading thousands is slow and drowns you in repeated patterns. Sample 100 to 200, tag them, rank the categories by share, fix the top one or two, then re-evaluate.

## Practice

> [!PRACTICE] 1 · Judge
> Training error 2%, validation error 11%. Should you add data or add capacity first?
>
> > [!ANSWER] Show answer
> > Add data or regularisation. The large gap means high variance, so capacity is already sufficient; more capacity would push training error lower and validation error higher.

> [!PRACTICE] 2 · Hand calculation
> A validation set of 4000 samples has an 8% error rate. How many errors are there, and what share does a sample of 160 cover?
>
> > [!ANSWER] Show answer
> > $4000 \times 8\% = 320$ errors; $160/320 = 50\%$ coverage.

> [!PRACTICE] 3 · Transfer
> Overall accuracy is 90%, but recall on one minority class is 40%. What kind of problem is this?
>
> > [!ANSWER] Show answer
> > A slice error, not a global bias-variance problem. Report metrics per class and per data source, locate the segment that is dragging the average down, then decide between more data, reweighted loss, or better annotation.

## Formal statement

> [!FORMAL] Formal statement
> Let the target be $y = f(x) + \varepsilon$ with $\mathbb{E}[\varepsilon] = 0$ and $\mathrm{Var}(\varepsilon) = \sigma^2$, and let $\hat f_D$ be fitted on training set $D$. For a fixed input $x$, squared error decomposes as
>
> $$\mathbb{E}_D\big[(y - \hat f_D(x))^2\big] = \big(\mathrm{Bias}[\hat f_D(x)]\big)^2 + \mathrm{Var}_D[\hat f_D(x)] + \sigma^2$$
>
> where $\mathrm{Bias} = \mathbb{E}_D[\hat f_D(x)] - f(x)$. The first term falls with capacity, the second rises with capacity, and $\sigma^2$ is the noise floor that no model can remove.
>
> A learning curve plots training and validation error against training-set size $n$: high bias shows both curves high and converging to the same level; high variance shows low training error, high validation error, and a gap that narrows as $n$ grows. Error analysis estimates the share of each error source by stratified counting over validation mistakes.
