---
slug: "loss-optim"
subject: "dl"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Deep Learning · Mastery"
title: "Loss and Optimisation"
subtitle: "Squeezing “how wrong” into one number"
minutes: 12
meta: ["12 min read","Requires calculus · gradient descent","Mastery level"]
concepts: ["loss", "grad", "calc"]
prereq: ["calc", "grad"]
related: ["backprop", "loss", "grad"]
---

## What you will get

By the end of this lecture you can pick a sensible loss for a concrete task, sketch its curve, and explain what happens when the learning rate is too large.

Three things only: define "gap" as a number, treat that number as a landscape, and see why the step size is dangerous.

## Three lines back

- A perceptron only reports the sign of its score; it never says how badly you are wrong.
- To improve, you need a quantity that can be compared, not a binary verdict.
- That quantity is the loss function: it squeezes the error of a whole batch into one number.

## What a loss does

The model outputs $\hat{y}$ and the true label is $y$. The loss $L(\hat{y}, y)$ is a non-negative number, closer to zero when the prediction is closer to the target.

All of training is this: treat $L$ as a function of the parameters and make it smaller.

$$
\theta^\star = \arg\min_{\theta} \; \frac{1}{m}\sum_{i=1}^{m} L\big(f_\theta(x_i),\, y_i\big)
$$

> [!NOTE]
> The loss decides what the model is actually optimising. Change the loss and you change the goal; change the goal and you change the model.

## Three common losses

| Task | Loss | Formula | Intuition |
| --- | --- | --- | --- |
| Regression | Mean squared error | $\frac{1}{m}\sum(\hat{y}-y)^2$ | Large errors punished hard; the curve is a parabola |
| Binary classification | Binary cross-entropy | $-[y\log\hat{p}+(1-y)\log(1-\hat{p})]$ | Confident mistakes cost arbitrarily much |
| Multiclass | Cross-entropy | $-\sum_k y_k \log \hat{p}_k$ | Only the probability of the true class matters |

Why cross-entropy rather than squared error for classification? Because combined with sigmoid or softmax, the derivative of the squashed output cancels out. With squared error, the more confidently wrong the model is, the smaller the gradient — and the slower it learns.

> [!MYTH] A smaller loss always means a better model.
> Loss is measured on the training set. Training loss near zero while validation loss rises is the standard signature of overfitting.

## Reading the loss as terrain

With two parameters, $L(\theta_1, \theta_2)$ is a surface. Each gradient step is:

$$
\theta \leftarrow \theta - \eta \nabla_\theta L
$$

where $\eta$ is the learning rate. The minus sign is there because the gradient points uphill and we want to go down.

| Learning rate | What happens |
| --- | --- |
| Too small | Tiny steps, convergence too slow to be useful |
| Just right | Steady descent toward the valley |
| Too large | Steps overshoot; loss oscillates or diverges |

In one dimension this is easy to compute. Take $L(\theta) = \theta^2$, whose gradient is $2\theta$. From $\theta_0 = 1$ with $\eta = 0.1$, the sequence is $1, 0.8, 0.64, 0.512, \dots$ and approaches zero. With $\eta = 1.1$ it becomes $1, -1.2, 1.44, -1.728, \dots$ and grows without bound.

The dividing line is $\eta = 1$: the update is $\theta \leftarrow (1 - 2\eta)\theta$, which converges exactly when $|1 - 2\eta| < 1$.

## Three misconceptions

> [!MYTH] Zero gradient always means a minimum.
> It could be a maximum or a saddle point. In high dimensions saddles are far more common than local minima, which is why initialisation and momentum matter.

> [!MYTH] The learning rate is a free hyperparameter.
> It is tied directly to the curvature of the loss. Directions with high curvature need small steps, which is exactly why adaptive methods scale the step per coordinate.

> [!MYTH] A loss must be a physically meaningful quantity.
> It only needs to be differentiable, comparable, and to improve the model as it falls. Its absolute value has no units.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $L(\theta) = (\theta - 3)^2$, start at $\theta_0 = 0$ with $\eta = 0.25$. Take two steps.
>
> > [!ANSWER] Show answer
> > The gradient is $2(\theta - 3)$. Step one: $0 - 0.25 \cdot (-6) = 1.5$. Step two: $1.5 - 0.25 \cdot (-3) = 2.25$. It is closing in on 3.

> [!PRACTICE] 2 · Variation
> In the same problem, set $\eta = 1.5$. Where does the first step land, and does it still converge?
>
> > [!ANSWER] Show answer
> > The first step lands at $9$, overshooting past 3 to the far side. The update is $\theta \leftarrow -2\theta + 9$, which does not converge.

> [!PRACTICE] 3 · Transfer
> A binary classifier predicts $\hat{p} = 0.99$ for a sample whose true label is 0. What are the cross-entropy and the squared error?
>
> > [!ANSWER] Show answer
> > Cross-entropy: $-\log(0.01) \approx 4.61$. Squared error: $(0.99 - 0)^2 \approx 0.98$. The former punishes confident mistakes much more heavily.

> [!FORMAL] Formal statement
> Let $L: \mathbb{R}^d \to \mathbb{R}$ be differentiable. Gradient descent iterates $\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)$. If $L$ is $L$-smooth (Lipschitz gradient with constant $L$), the iteration converges to a stationary point whenever $0 < \eta < 2/L$; in the strongly convex case with $\eta < 2/\mu$ it converges linearly to the unique minimum.
