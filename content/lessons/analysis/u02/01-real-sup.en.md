---
slug: "real-sup"
subject: "analysis"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "The Real Numbers and Completeness"
subtitle: "The rationals leave gaps on the line"
minutes: 14
meta: ["14 min read","Requires sets and maps","Mastery level"]
concepts: ["sup", "seq"]
prereq: ["analysis"]
related: ["seq", "sup"]
---

## Goals

The rationals are dense on the number line, yet they do not fill it. This lecture closes the gaps and states the axiom that makes the real line work: completeness.

By the end you can decide whether a set has a supremum, whether that supremum is attained, and derive the Archimedean property and the density of the rationals from completeness alone.

## Three-line recap

- The rationals are closed under arithmetic but leave a gap at $\sqrt{2}$.
- The supremum is the least upper bound: it caps the set and is approached by its elements.
- Completeness says every nonempty set bounded above has a supremum; this is the first face of the real line.

## The gap in the rationals

Let $S = \{x \in \mathbb{Q} : x^2 < 2\}$. The number $2$ is an upper bound: if $x \ge 2$ then $x^2 \ge 4 > 2$. But $S$ has no least upper bound inside $\mathbb{Q}$.

Take any positive rational upper bound $q$, so $q^2 > 2$, and set

$$
q' = \frac{2q+2}{q+2}.
$$

Two computations settle it:

$$
q' - q = \frac{2-q^2}{q+2} < 0, \qquad q'^2 - 2 = \frac{2(q^2-2)}{(q+2)^2} > 0.
$$

So $q'$ is still an upper bound and is strictly smaller than $q$. Every rational upper bound can be pushed down; none is least. The gap sits exactly at $\sqrt{2}$, which solves $x^2 = 2$ but is not rational.

The real numbers are the ordered field obtained by filling every such gap; equivalently, they satisfy completeness.

## Bounds and suprema

Let $S$ be a nonempty set of reals. If some $M$ satisfies $x \le M$ for every $x \in S$, then $M$ is an upper bound and $S$ is bounded above.

A number $\beta$ is the supremum of $S$, written $\sup S$, when both hold:

- $\beta$ is an upper bound: $x \le \beta$ for every $x \in S$;
- $\beta$ is the least one: for every $\varepsilon > 0$ there is $x \in S$ with $x > \beta - \varepsilon$.

The second condition says the elements of $S$ come arbitrarily close to $\beta$.

| $S$ | $\sup S$ | Attained? |
| --- | --- | --- |
| $\{1/n : n \ge 1\}$ | $1$ | Yes, at $n=1$ |
| $\{1 - 1/n : n \ge 1\}$ | $1$ | No |
| $(0,1)$ | $1$ | No |
| $\{x : x^2 < 2\}$ | $\sqrt{2}$ | No |

The infimum is defined by $\inf S = -\sup(-S)$, with the symmetric conditions. A supremum, when it exists, is unique, because “least” leaves no room for a second candidate.

## The completeness axiom

> [!NOTE]
> Every nonempty set of reals bounded above has a supremum; every nonempty set bounded below has an infimum.

This cannot be derived from the ordered-field axioms: $\mathbb{Q}$ is a counterexample. Its value is that “there exists a number” becomes a usable conclusion instead of a construction repeated each time.

Existence is not attainment. The supremum may or may not belong to $S$; when it does, it is called the maximum.

## Three uses of completeness

**Archimedean property.** For any $a>0$ and any $b$, there is a positive integer $n$ with $na > b$. Suppose $na \le b$ for all $n$. Then $S = \{na\}$ is bounded above; let $\beta = \sup S$. Since $\beta - a < \beta$, it is not an upper bound, so some $n$ has $na > \beta - a$, hence $(n+1)a > \beta$, a contradiction. With $a = 0.001$ and $b = 1$ this gives $n = 1001$.

**Density of the rationals.** Let $x < y$. Choose $n$ with $1/n < y-x$. Let $m$ be the least integer with $m/n > x$. Then $m/n \le x + 1/n < y$, so $(x,y)$ contains a rational.

**Computing suprema.** Guess, then verify the two conditions. For $S = \{1 - 1/n\}$, the number $1$ is an upper bound and $1 - (1 - 1/n) = 1/n$ is arbitrarily small, so $\sup S = 1$. The number $0$ is a lower bound and $1 - 1/n \to 0$, so $\inf S = 0$.

## Three misconceptions

> [!MYTH] The supremum must belong to the set.
> For $S = \{1 - 1/n\}$ every element is below $1$, while the supremum is $1$. “Least” does not mean “inside”.

> [!MYTH] A set with an upper bound has a maximum.
> $(0,1)$ is bounded above by $1$, yet has no largest element: given $x \in (0,1)$, the point $(x+1)/2$ is still inside and larger. Boundedness only guarantees a supremum.

> [!MYTH] Dense means the rationals are enough.
> Density only says something lies between any two numbers; it does not keep limits inside the set. The sequence $1.4, 1.41, 1.414, \dots$ consists of rationals but converges to $\sqrt{2}$, which is not rational.

## Practice

> [!PRACTICE] 1 · Find the bounds
> For $S = \{1 - 1/n : n \ge 1\}$, find $\sup S$ and $\inf S$, and say whether each is attained.
>
> > [!ANSWER] Show answer
> > The values $0, 1/2, 2/3, \dots$ increase. $\sup S = 1$, not attained; $\inf S = 0$, attained at $n=1$.

> [!PRACTICE] 2 · An interval
> Find the bounds of $S = \{x \in \mathbb{R} : x^2 + x < 2\}$.
>
> > [!ANSWER] Show answer
> > The inequality is $(x+2)(x-1) < 0$, so $S = (-2,1)$. Thus $\sup S = 1$ and $\inf S = -2$, neither attained.

> [!PRACTICE] 3 · Archimedes
> Prove that $\inf\{1/n : n \ge 1\} = 0$.
>
> > [!ANSWER] Show answer
> > Zero is a lower bound. Given $\varepsilon > 0$, choose $n > 1/\varepsilon$ by the Archimedean property; then $1/n < \varepsilon$. Hence zero is the greatest lower bound.

> [!PRACTICE] 4 · Union
> Let $A = \{1/n\}$ and $B = \{1 - 1/n\}$. Find $\sup(A \cup B)$ and $\inf(A \cup B)$.
>
> > [!ANSWER] Show answer
> > $A$ fills $(0,1]$ and $B$ fills $[0,1)$, so the union is $[0,1]$. Both $\sup = 1$ and $\inf = 0$ are attained.

> [!FORMAL] Formal statement
> For nonempty $S \subseteq \mathbb{R}$, $\beta = \sup S$ iff $x \le \beta$ for all $x \in S$ and for every $\varepsilon > 0$ some $x \in S$ satisfies $x > \beta - \varepsilon$. Completeness: every nonempty $S$ bounded above has a supremum. It is equivalent to the infimum statement applied to $-S$. The field $\mathbb{Q}$ satisfies the ordered-field axioms but not completeness, so completeness is an independent axiom.
