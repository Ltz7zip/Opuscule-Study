---
slug: "joint-marginal-independence"
subject: "probability"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Joint Distributions, Marginals, and Independence"
subtitle: "Look at two variables together to see whether they interact"
minutes: 16
meta: ["16 min read","Requires one-dimensional random variables","Mastery level"]
concepts: ["jointdist", "distribution", "randvar"]
prereq: ["randvar"]
related: ["variance", "expectation"]
---

## What you will get

You will compute marginal distributions from a joint table, test independence with a product, and see why identical marginals do not pin down a joint distribution.

The joint distribution is the full record. A marginal is that record projected onto one axis, and a projection loses information.

## Three lines back

- The joint distribution function of a pair is $F(x,y)=P(X\le x,\,Y\le y)$.
- Marginals come from summing or integrating out the other variable: $p_X(x_i)=\sum_j p_{ij}$.
- $X$ and $Y$ are independent exactly when $F(x,y)=F_X(x)F_Y(y)$ everywhere, which in the discrete case means $p_{ij}=p_ip_j$.

## Joint and marginal distributions

A discrete pair is described by a table: rows are values of $X$, columns are values of $Y$, and each cell holds $p_{ij}=P(X=x_i,Y=y_j)$. The whole table sums to one.

| $X\backslash Y$ | 0 | 1 | row sum |
| --- | --- | --- | --- |
| 0 | 0.3 | 0.2 | 0.5 |
| 1 | 0.2 | 0.3 | 0.5 |
| column sum | 0.5 | 0.5 | 1 |

Row sums give the marginal of $X$, column sums the marginal of $Y$. In the continuous case the sums become integrals:

$$
f_X(x)=\int_{-\infty}^{+\infty}f(x,y)\,dy,\qquad f_Y(y)=\int_{-\infty}^{+\infty}f(x,y)\,dx
$$

Marginals are determined by the joint distribution. The reverse fails: different joint distributions can share identical marginals.

## Independence

The variables $X$ and $Y$ are independent if

$$
P(X\le x,\,Y\le y)=P(X\le x)\,P(Y\le y)
$$

for all $x,y$. In the discrete case it is enough to check $p_{ij}=p_ip_j$ cell by cell. In the continuous case, check $f(x,y)=f_X(x)f_Y(y)$ at continuity points.

Independence is demanding: **every cell** must equal the product of its two marginals, not just the total or an average.

## A 2×2 example

Use the table above. The top-left cell is $0.3$, while $p_1p_{\cdot1}=0.5\times0.5=0.25$. They differ, so $X$ and $Y$ are not independent.

Now change only the numbers to $p_{11}=p_{12}=p_{21}=p_{22}=0.25$. Every cell equals $0.5\times0.5$, so the variables are independent.

Both tables have exactly the same marginals, $(0.5,0.5)$, but different joints. Marginal distributions cannot be inverted into a joint distribution.

One more quantity worth recording: in the first table $E[XY]=P(X=1,Y=1)=0.3$, while $E[X]E[Y]=0.5\times0.5=0.25$. The difference, $0.05$, is the covariance.

> [!MYTH] Equal marginals imply equal joint distributions.
> The two tables above are a counterexample: identical margins, different interiors. Dependence lives inside the cells.

> [!NOTE]
> Independence implies zero covariance, but zero covariance does not imply independence. Covariance detects only linear association; with $Y=X^2$ and a symmetric $X$ it vanishes while the variables are plainly dependent.

## Three common misconceptions

> [!MYTH] If each variable is normal, the pair is jointly normal.
> Normal marginals do not guarantee a joint normal. The joint density must have the bivariate normal form, equivalently every linear combination must remain normal.

> [!MYTH] The joint distribution function is always the product of the marginals.
> The product is the definition of independence, not a general identity. In general $F(x,y)\ne F_X(x)F_Y(y)$.

> [!MYTH] $P(X=x,Y=y)=0$ means the two events are independent.
> Probability zero only says that cell is empty. Independence requires $p_{ij}=p_ip_j$; if both marginals are positive and the cell is zero, the events are exclusive and therefore dependent.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> A joint distribution has $p_{11}=0.1$, $p_{12}=0.2$, $p_{21}=0.3$, $p_{22}=0.4$. Find both marginals.
>
> > [!ANSWER] Show answer
> > The marginal of $X$ is $(0.3,0.7)$ and the marginal of $Y$ is $(0.4,0.6)$.

> [!PRACTICE] 2 · Variation
> Are $X$ and $Y$ independent in the previous exercise? Find $P(X=1\mid Y=2)$.
>
> > [!ANSWER] Show answer
> > $p_{11}=0.1\ne0.3\times0.4=0.12$, so they are dependent. And $P(X=1\mid Y=2)=0.2/0.6=1/3$.

> [!PRACTICE] 3 · Transfer
> Let $f(x,y)=x+y$ on the unit square. Find $f_X(x)$ and decide whether the variables are independent.
>
> > [!ANSWER] Show answer
> > $f_X(x)=\int_0^1(x+y)\,dy=x+\tfrac12$, and similarly $f_Y(y)=y+\tfrac12$. The product is $xy+\tfrac{x}{2}+\tfrac{y}{2}+\tfrac14\ne x+y$, so they are dependent.

## Formal statement

Let $F(x,y)=P(X\le x,Y\le y)$ be the joint distribution function. The marginals are $F_X(x)=F(x,+\infty)$ and $F_Y(y)=F(+\infty,y)$. The variables are independent if and only if $F(x,y)=F_X(x)F_Y(y)$ for all $(x,y)$. When a joint density exists, independence is equivalent to $f(x,y)=f_X(x)f_Y(y)$ almost everywhere. For several variables, mutual independence requires the factorisation for every subcollection; pairwise independence is not sufficient.
