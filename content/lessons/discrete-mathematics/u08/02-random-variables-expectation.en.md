---
slug: "random-variables-expectation"
subject: "discrete-mathematics"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Discrete Random Variables, Expectation, and Variance"
subtitle: "Turning outcomes into numbers"
minutes: 16
meta: ["16 min read","Requires discrete probability spaces","Mastery level"]
concepts: ["discprob", "counting"]
prereq: ["discprob"]
related: ["counting", "complexity"]
---

## What you will get

By the end of this lecture you can write down the distribution of a discrete random variable, compute its expectation and variance from that distribution, and use conditional expectation to split a hard average into easier pieces.

Everything here is finite-valued, so every expectation is a finite sum and convergence never arises.

## Three lines back

- A random variable is a function from the sample space to the reals; it turns outcomes into numbers.
- Its distribution lists each value together with its probability, and the probabilities sum to $1$.
- Expectation is the probability-weighted average; variance measures how far values spread around it.

## Distributions and expectation

Let $\Omega$ be finite and let $X:\Omega\to\mathbb{R}$ take finitely many values $x_1,\dots,x_n$. The distribution of $X$ is

$$
p_k=P(X=x_k)=P(\{\omega\in\Omega\mid X(\omega)=x_k\})
$$

with $p_k\ge0$ and $\sum_kp_k=1$. The expectation is

$$
E(X)=\sum_{k=1}^{n}x_kp_k
$$

Example: toss three fair coins and let $X$ be the number of heads. The four probabilities come from $\binom{3}{k}/8$:

| $x$ | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| $P(X=x)$ | $1/8$ | $3/8$ | $3/8$ | $1/8$ |

So $E(X)=0\cdot\frac18+1\cdot\frac38+2\cdot\frac38+3\cdot\frac18=\frac{12}{8}=1.5$. Note that $1.5$ is not a possible value of $X$; an expectation need not be attainable.

Take the sum of two dice next. The distribution is $p_2=p_{12}=1/36$, $p_3=p_{11}=2/36$, and so on up to $p_7=6/36$. Multiplying value by probability and adding:

$$
E(X)=\frac{2+6+12+20+30+42+40+36+30+22+12}{36}=\frac{252}{36}=7
$$

The key property of expectation is linearity: for constants $a,b$,

$$
E(aX+b)=aE(X)+b,\qquad E(X+Y)=E(X)+E(Y)
$$

The second identity does not require independence, because the sum splits term by term. That is what makes indicator variables so useful: a complicated count becomes a sum of $0$-$1$ variables whose expectations are just probabilities.

## Variance and linear transformations

Expectation locates a distribution but says nothing about its spread. Variance is

$$
\operatorname{Var}(X)=E\bigl[(X-E(X))^2\bigr]=E(X^2)-\bigl[E(X)\bigr]^2
$$

The second form follows by expanding $(X-\mu)^2=X^2-2\mu X+\mu^2$ and taking expectations; it is usually faster in computations.

For two dice, $E(X^2)=\frac{1974}{36}\approx54.83$, hence

$$
\operatorname{Var}(X)=\frac{1974}{36}-49=\frac{35}{6}\approx5.83
$$

For the three coins, $E(X^2)=0\cdot\frac18+1\cdot\frac38+4\cdot\frac38+9\cdot\frac18=3$, so $\operatorname{Var}(X)=3-2.25=0.75$.

| Random variable | $E(X)$ | $E(X^2)$ | $\operatorname{Var}(X)$ |
| --- | --- | --- | --- |
| Heads in three coins | $1.5$ | $3$ | $0.75$ |
| Sum of two dice | $7$ | $1974/36$ | $35/6$ |
| One die | $3.5$ | $91/6$ | $35/12$ |

Under an affine change, variance responds quadratically: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. Shifting does not change spread; scaling by $a$ scales every deviation by $a$, and squaring gives $a^2$.

> [!NOTE]
> Variances add only under a condition: $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$. The covariance term vanishes when $X$ and $Y$ are uncorrelated, and independence is a sufficient condition.

## Conditional expectation

Given an event $B$ with $P(B)>0$,

$$
E(X\mid B)=\sum_k x_k\,P(X=x_k\mid B)
$$

which is just the expectation computed with the conditional distribution.

Example: two dice, $X$ the sum, $B$ the event that the first die shows 6. Under $B$ the second die is still uniform, so

$$
E(X\mid B)=6+3.5=9.5
$$

Under $\overline B$ the first die is uniform on $1,\dots,5$ with mean $3$, so $E(X\mid\overline B)=3+3.5=6.5$. The law of total expectation combines the two:

$$
E(X)=9.5\cdot\frac16+6.5\cdot\frac56=\frac{9.5+32.5}{6}=7
$$

matching the direct computation. In general, if $\{B_i\}$ partitions $\Omega$, then $E(X)=\sum_iE(X\mid B_i)P(B_i)$. The point is to replace one global average by case-by-case averages plus weights; each case is usually simpler.

If the condition is another random variable $Y$, then $E(X\mid Y)$ is itself a random variable, taking the value $E(X\mid Y=y)$ when $Y=y$. Taking its expectation once more returns $E(X)$.

## Three common misconceptions

> [!MYTH] The expectation must be a value the variable can take.
> The three-coin expectation is $1.5$, while the number of heads is always $0,1,2,3$. A weighted average may sit between the possible values.

> [!MYTH] $E(XY)=E(X)E(Y)$ always holds.
> It holds only without correlation. Roll one die, let $X$ be the face and $Y=X^2$. Then $E(XY)=E(X^3)=\frac{441}{6}=73.5$, while $E(X)E(Y)=3.5\times\frac{91}{6}\approx53.08$, far apart.

> [!MYTH] Variances always add.
> In general a term $2\operatorname{Cov}(X,Y)$ appears. The sum of two dice has variance $35/6$, exactly the sum of two copies of $35/12$, but only because the dice are independent; two quantities that move together behave differently.

## Practice

> [!PRACTICE] 1 · One die
> Let $X$ be the face of a fair die. Find $E(X)$ and $\operatorname{Var}(X)$.
>
> > [!ANSWER] Show answer
> > $E(X)=\frac{1+2+3+4+5+6}{6}=3.5$; $E(X^2)=\frac{1+4+9+16+25+36}{6}=\frac{91}{6}$; $\operatorname{Var}(X)=\frac{91}{6}-\frac{49}{4}=\frac{35}{12}\approx2.92$.

> [!PRACTICE] 2 · A game with odds
> A game pays $10$ with probability $0.2$ and loses $2$ with probability $0.8$. Find the expected payoff per round.
>
> > [!ANSWER] Show answer
> > $E=10\times0.2+(-2)\times0.8=2-1.6=0.4$. A positive expectation does not mean every round wins; it describes the long-run average.

> [!PRACTICE] 3 · Conditioning
> Two dice are rolled and the sum is known to exceed $9$. Find the conditional expectation of the sum.
>
> > [!ANSWER] Show answer
> > Sums $10,11,12$ have $3,2,1$ outcomes, six equally likely in total. $E=\frac{10\times3+11\times2+12\times1}{6}=\frac{64}{6}=\frac{32}{3}\approx10.67$.

## Formal statement

Let $(\Omega,\mathcal{F},P)$ be a finite probability space and $X:\Omega\to\mathbb{R}$ a random variable with values $x_1,\dots,x_n$ and distribution $p_k=P(X=x_k)$. Then $E(X)=\sum_kx_kp_k$, which always exists for finite sums. Expectation is linear: $E(aX+bY)=aE(X)+bE(Y)$. Variance is $\operatorname{Var}(X)=E(X^2)-E(X)^2\ge0$ and satisfies $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. For $P(B)>0$, the conditional expectation is $E(X\mid B)=\sum_kx_kP(X=x_k\mid B)$; if $\{B_i\}$ is a finite partition of $\Omega$ with $P(B_i)>0$, the law of total expectation gives $E(X)=\sum_iE(X\mid B_i)P(B_i)$. If $X$ and $Y$ are independent, then $E(XY)=E(X)E(Y)$, so their covariance vanishes and variances add.