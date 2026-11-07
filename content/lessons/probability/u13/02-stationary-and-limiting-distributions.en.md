---
slug: "stationary-and-limiting-distributions"
subject: "probability"
unit: "u13"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Stationary and Limiting Distributions"
subtitle: "The row vector that stops changing"
minutes: 16
meta: ["16 min read","Requires transition matrices and linear systems","Mastery level"]
concepts: ["markov", "matrix", "expectation"]
prereq: ["markov", "matrix"]
related: ["timeseries", "distribution"]
---

## What you will get

You will decide whether a chain is irreducible and aperiodic, solve $\pi P=\pi$ together with $\sum_i\pi_i=1$ for the stationary distribution, and state exactly when that distribution is also a limit.

The weather example of the previous lecture showed two- and three-step matrices drifting toward a fixed row. Here that row is computed and the conditions for actually reaching it are made precise.

## Three lines back

- Irreducible means every state communicates with every other; aperiodic means there is no fixed cycle length.
- A stationary distribution satisfies $\pi P=\pi$ and $\sum_i\pi_i=1$; it is invariant in time.
- For a finite, irreducible, aperiodic chain, $\pi_n$ converges to the unique stationary distribution from any starting distribution.

## Irreducibility, periodicity, ergodicity

The chain is irreducible if for every pair $i,j$ there is some $n\ge1$ with $p_{ij}^{(n)}>0$: every state can reach every other. It has period $d>1$ if returns to a state are possible only at multiples of $d$; period $1$ means aperiodic.

| Property | Meaning | Counterexample |
| --- | --- | --- |
| Irreducible | all states in one communicating class | two-state chain with $p_{12}=p_{21}=0$ |
| Aperiodic | gcd of return times equals $1$ | $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, period $2$ |
| Positive recurrent | finite mean return time | null-recurrent random walk on the integers |

A finite irreducible chain is automatically positive recurrent. Irreducible, positive recurrent and aperiodic chains are called ergodic, and an ergodic chain has n-step probabilities converging entrywise to a limit that does not depend on the starting state.

## Stationary distributions: solving πP=π

A row vector with $\pi\ge0$, $\sum_i\pi_i=1$ and

$$
\pi P=\pi
$$

is a stationary distribution. The interpretation is immediate: starting from $\pi$, we get $\pi_1=\pi P=\pi$, so every later marginal distribution is identical.

Componentwise the equation reads $\pi_j=\sum_i\pi_ip_{ij}$: probability flowing into $j$ equals the mass already there. That gives $m$ equations of rank $m-1$, so the normalization $\sum_i\pi_i=1$ is required for a unique answer.

For the weather matrix, let $\pi=(\pi_1,\pi_2)$:

$$
(\pi_1,\pi_2)\begin{pmatrix}0.8&0.2\\0.1&0.9\end{pmatrix}=(\pi_1,\pi_2)
\;\Longrightarrow\;
0.2\pi_1=0.1\pi_2
\;\Longrightarrow\;
\pi_2=2\pi_1.
$$

With $\pi_1+\pi_2=1$ this gives $\pi=(1/3,2/3)$: in the long run roughly one third of days are sunny and two thirds rainy, regardless of today.

> [!NOTE]
> The stationary distribution is a left eigenvector of $P$ for eigenvalue $1$, equivalently $P^{\mathsf T}\pi=\pi$ in column form. Since the rows of $P$ already sum to one, $\mathbf 1$ is a right eigenvector. These are different objects; do not transpose one into the other.

## Limiting distributions and the rate of convergence

If $\lim_{n\to\infty}p_{ij}^{(n)}=\pi_j$ for all $i,j$, then $\pi$ is the limiting distribution. Any limit must be stationary: pass to the limit in $\pi_n=\pi_0P^n$ and use $\pi_{n+1}=\pi_nP$.

The converse fails. For $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ the stationary distribution is $(1/2,1/2)$, yet $P^{2k}=I$ and $P^{2k+1}=P$, so the n-step probabilities jump between two rows forever. The period is $2$.

Iterating the weather chain from a sunny day:

| $n$ | $\pi_n(1)$ | $\pi_n(2)$ | gap to $1/3$ |
| --- | --- | --- | --- |
| 0 | 1.000 | 0.000 | 0.667 |
| 1 | 0.800 | 0.200 | 0.467 |
| 2 | 0.660 | 0.340 | 0.327 |
| 3 | 0.562 | 0.438 | 0.229 |
| 4 | 0.493 | 0.507 | 0.160 |
| 5 | 0.445 | 0.555 | 0.112 |

The gap is multiplied by $0.7$ each step. That is no accident: the eigenvalues of $P$ are $1$ and $0.7$, and the modulus of the second largest eigenvalue sets the rate. A value near $1$ means slow mixing; a matrix with entries close to uniform has a second eigenvalue near $0$ and mixes in a couple of steps.

## Three common misconceptions

> [!MYTH] The stationary distribution always equals the limiting distribution.
> Stationarity only requires invariance; a limit also requires convergence. A periodic chain has a stationary distribution but no limit, and aperiodicity is exactly the missing ingredient.

> [!MYTH] Every starting distribution converges to the stationary one.
> Irreducibility gives uniqueness, aperiodicity gives convergence. Without aperiodicity the distribution can oscillate; without irreducibility different starting classes can settle on different invariant distributions.

> [!MYTH] Longer runs are always better, so step 100 must beat step 10.
> The distance decays geometrically: $0.7^{20}\approx0.0008$, already below any practical precision, so further iteration adds nothing.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find the stationary distribution of $P=\begin{pmatrix}0.5&0.5\\0.25&0.75\end{pmatrix}$.
>
> > [!ANSWER] Show answer
> > $0.5\pi_1=0.25\pi_2$ gives $\pi_2=2\pi_1$, hence $\pi=(1/3,2/3)$.

> [!PRACTICE] 2 · Variation
> Find the stationary distribution of $P=\begin{pmatrix}0.6&0.4\\0.3&0.7\end{pmatrix}$.
>
> > [!ANSWER] Show answer
> > $0.3\pi_2=0.4\pi_1$, so $\pi_2=\frac43\pi_1$ and $\pi=(3/7,4/7)\approx(0.429,0.571)$.

> [!PRACTICE] 3 · Transfer
> For $P=\begin{pmatrix}0&1&0\\0&0&1\\1&0&0\end{pmatrix}$, find the stationary distribution and decide whether a limit exists.
>
> > [!ANSWER] Show answer
> > By symmetry $\pi=(1/3,1/3,1/3)$ is the unique stationary distribution. The period is $3$, so no limit exists; $P^n$ cycles with $n\bmod3$.

## Formal statement

Let $P$ be the transition matrix of a finite chain. It is irreducible when for every $i,j$ some $n$ has $p_{ij}^{(n)}>0$. The period of state $i$ is $d(i)=\gcd\{n\ge1:p_{ii}^{(n)}>0\}$, and all states of an irreducible chain share one period. A finite irreducible chain with $d=1$ is ergodic.

A stationary distribution is a row vector with $\pi P=\pi$, $\pi_i\ge0$ and $\sum_i\pi_i=1$. Every finite irreducible chain has exactly one. By the Perron–Frobenius theorem the spectral radius of $P$ is $1$ and the eigenvalue $1$ is simple. If the chain is also aperiodic, then

$$
\lim_{n\to\infty}P^{n}=\mathbf 1\pi,
$$

so $p_{ij}^{(n)}\to\pi_j$ for every $i$. The rate is governed by the second largest eigenvalue modulus, with $\lVert\pi_n-\pi\rVert_1\le C\lvert\lambda_2\rvert^{n}$, and the limit is independent of the initial distribution.