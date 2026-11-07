---
slug: "conditional-and-functions"
subject: "probability"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Conditional Distributions and Functions of Two Random Variables"
subtitle: "Fix one variable, then solve a one-dimensional problem"
minutes: 16
meta: ["16 min read","Requires joint distributions and independence","Mastery level"]
concepts: ["jointdist", "distribution", "calc"]
prereq: ["jointdist"]
related: ["expectation", "variance"]
---

## What you will get

You will write conditional densities, compute conditional probabilities and expectations, and use convolution to find the distribution of $X+Y$.

The standard move for a two-dimensional problem is reduction: fix one variable, and the rest is one-dimensional again.

## Three lines back

- A conditional distribution restricts the joint distribution to a slice and renormalises it with the marginal.
- In the continuous case $f_{Y\mid X}(y\mid x)=f(x,y)/f_X(x)$, provided $f_X(x)>0$.
- For independent continuous variables, the density of the sum is the convolution $f_Z(z)=\int f_X(x)f_Y(z-x)\,dx$.

## Conditional distributions

In the discrete case, divide directly:

$$
P(Y=y_j\mid X=x_i)=\frac{p_{ij}}{p_{i\cdot}}
$$

In the continuous case the denominator is the marginal density. Hold $x$ fixed, treat $f(x,y)$ as a function of $y$, and divide by $f_X(x)$ so that it integrates to one:

$$
f_{Y\mid X}(y\mid x)=\frac{f(x,y)}{f_X(x)}
$$

A conditional density is still a density: non-negative and normalised. It defines the conditional expectation

$$
E[Y\mid X=x]=\int_{-\infty}^{+\infty}y\,f_{Y\mid X}(y\mid x)\,dy
$$

The object $E[Y\mid X]$ is a function of $X$ and therefore a random variable. Only $E[Y\mid X=x]$ is a number.

| Object | Discrete form | Continuous form |
| --- | --- | --- |
| Conditional law | $p_{ij}/p_{i\cdot}$ | $f(x,y)/f_X(x)$ |
| Conditional mean | $\sum_j y_j p_{ij}/p_{i\cdot}$ | $\int y f(y\mid x)\,dy$ |
| Total expectation | $E[Y]=\sum_i p_{i\cdot}E[Y\mid X=x_i]$ | $E[Y]=\int f_X(x)E[Y\mid X=x]\,dx$ |

## Functions of two variables

The most common case is $Z=X+Y$. Start from the distribution function:

$$
F_Z(z)=P(X+Y\le z)=\iint_{x+y\le z}f(x,y)\,dx\,dy
$$

Differentiating with respect to $z$ gives, when $X$ and $Y$ are independent,

$$
f_Z(z)=\int_{-\infty}^{+\infty}f_X(x)f_Y(z-x)\,dx
$$

More generally, for a one-to-one differentiable transformation $(X,Y)\mapsto(U,V)$ with nonzero Jacobian $J$,

$$
f_{U,V}(u,v)=f_{X,Y}(x(u,v),y(u,v))\,|J|
$$

To get a single function such as $Z=X+Y$, add an auxiliary variable (for instance $U=X$), compute the joint density, then integrate the auxiliary variable out.

## A worked example

Let $f(x,y)=x+y$ on the unit square. We already know $f_X(x)=x+\tfrac12$, so at $x=0.5$ the marginal is $1$ and the conditional density is

$$
f_{Y\mid X}(y\mid 0.5)=\frac{0.5+y}{1}=0.5+y,\qquad 0<y<1
$$

Then

$$
P(Y>0.5\mid X=0.5)=\int_{0.5}^{1}(0.5+y)\,dy=\Big[0.5y+\tfrac{y^2}{2}\Big]_{0.5}^{1}=1-0.375=0.625
$$

and

$$
E[Y\mid X=0.5]=\int_0^1 y(0.5+y)\,dy=0.25+\tfrac13=\tfrac{7}{12}\approx0.583
$$

Unconditionally, $E[Y]=\int_0^1 y(y+\tfrac12)\,dy=\tfrac13+\tfrac14=\tfrac{7}{12}$. Here the two agree because $f(x,y)=x+y$ is symmetric in $x$ and $y$. That is a coincidence; in general the conditional mean changes with $x$.

> [!MYTH] The conditional expectation $E[Y\mid X]$ is a constant.
> It is a function of $X$ and varies with $X$'s value, so it is a random variable. Only after substituting a specific $x$ does it become a number.

> [!NOTE]
> The convolution formula needs independence. Without it, return to the double integral over the region $x+y\le z$; multiplying marginals is not allowed.

## Three common misconceptions

> [!MYTH] A conditional density is just the joint density sliced at one $x$.
> A slice usually does not integrate to one. It must be divided by $f_X(x)$ before it becomes a density.

> [!MYTH] $E[X+Y]=E[X]+E[Y]$ requires independence.
> Linearity of expectation holds for every joint distribution. Independence matters for $E[XY]$ or for adding variances.

> [!MYTH] The sum of two uniform variables is uniform.
> The sum of two independent $U(0,1)$ variables is triangular: its density peaks at $z=1$ with value 1 and falls linearly to zero at both ends.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Given $p_{11}=0.1$, $p_{12}=0.2$, $p_{21}=0.3$, $p_{22}=0.4$, find the conditional distribution of $Y$ given $X=1$.
>
> > [!ANSWER] Show answer
> > $P(X=1)=0.7$, so the conditional probabilities are $0.3/0.7=3/7$ and $0.4/0.7=4/7$.

> [!PRACTICE] 2 · Variation
> If $f(x,y)=2$ on $0<x<y<1$, find $f_{Y\mid X}(y\mid x)$.
>
> > [!ANSWER] Show answer
> > $f_X(x)=\int_x^1 2\,dy=2(1-x)$, so $f_{Y\mid X}(y\mid x)=1/(1-x)$ for $x<y<1$: uniform on $(x,1)$.

> [!PRACTICE] 3 · Transfer
> Let $X,Y$ be independent $U(0,1)$. Find $P(X+Y\le1)$.
>
> > [!ANSWER] Show answer
> > The region $x+y\le1$ inside the unit square is the lower-left triangle with area $1/2$, so the probability is $1/2$.

## Formal statement

Let $f(x,y)$ be a joint density with $f_X(x)>0$. Then $f_{Y\mid X}(y\mid x)=f(x,y)/f_X(x)$ is a density in $y$, called the conditional density. The conditional expectation $E[Y\mid X=x]=\int y f_{Y\mid X}(y\mid x)\,dy$ exists when $E|Y|<\infty$ and satisfies the total expectation formula $E[Y]=E[E[Y\mid X]]$. If $X$ and $Y$ are independent, the density of $X+Y$ is their convolution. For a one-to-one differentiable transformation, the joint density is transformed using the absolute Jacobian determinant. In general the distribution of a sum is not determined by the marginals unless independence is known.
