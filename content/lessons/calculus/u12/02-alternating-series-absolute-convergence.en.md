---
slug: "alternating-series-absolute-convergence"
subject: "calculus"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Alternating Series, Absolute and Conditional Convergence"
subtitle: "When signs alternate, monotonicity beats size"
minutes: 29
meta: ["29 min read","Requires tests for positive series","Mastery level"]
concepts: ["series", "posseries"]
prereq: ["posseries"]
related: ["powerseries", "fourier", "defint"]
---

## What you will get

The previous lecture dealt only with positive-term series: partial sums increase, so convergence is the same as being bounded above, and the comparison, ratio and root tests all rest on that fact. This lecture takes up series whose terms change sign, and that toolkit collapses immediately.

Look at how it collapses:

$$
1-\frac12+\frac13-\frac14+\cdots=\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n}
$$

Remove the absolute values and you get the harmonic series $\sum1/n$, which diverges, yet the original converges to $\ln 2$. Looking only at absolute values therefore misses an entire class of convergent series: cancellation is a convergence mechanism in its own right.

This lecture answers four questions:

- Under what conditions must an alternating series converge, and why is the condition monotone decrease rather than merely terms tending to zero?
- How large is the error when finitely many terms are used, and how do we solve for the number of terms needed for a given accuracy?
- Why do some convergent series survive taking absolute values and others not, and what does that difference mean for algebra with series?
- Given a series of arbitrary signs, in what order should the available tests be tried?

The links are direct: the tests of the previous lecture reappear here after taking absolute values, and the power series of the next lecture converge absolutely inside their interval, which is what licenses term-by-term differentiation.

## Three lines back

- A positive-term series converges exactly when its partial sums are bounded above.
- The $p$-series $\sum1/n^{p}$ converges precisely for $p>1$; for $p=1$ it is the harmonic series, which diverges.
- A convergent series has terms tending to zero, but that alone does not force convergence.

## Why the positive-term toolkit fails here

Every test for positive series assumes the same thing: $S_n$ increases. As soon as terms change sign, $S_n$ swings up and down, and the equivalence between "bounded above" and "convergent" disappears. The comparison test also fails, because it needs non-negative terms. For a series of arbitrary signs the only unconditional inequality is

$$
\left|\sum_{n=1}^{N}u_n\right|\le\sum_{n=1}^{N}|u_n|
$$

and it supports only one direction: absolute convergence implies convergence. So a dividing line appears. When $\sum|u_n|$ converges, $\sum u_n$ must converge, and the series is called absolutely convergent. When $\sum|u_n|$ diverges but $\sum u_n$ converges, the convergence comes entirely from cancellation, and the series is called conditionally convergent.

An alternating series is the typical inhabitant of the second case. Its terms may shrink very slowly — $\sum(-1)^{n-1}/n$ shrinks only like $1/n$ — yet cancellation still pulls the partial sums back to a finite value. Pair adjacent terms:

$$
(u_1-u_2)+(u_3-u_4)+(u_5-u_6)+\cdots
$$

If every pair $u_{2k-1}-u_{2k}$ is non-negative and small, the total cannot escape to infinity. This is why the hypothesis is monotone decrease: only then is every pair non-negative, and only then does the partial sum stop drifting away.

> [!NOTE]
> Monotone decrease, not the sign pattern, is the substance; skipping the monotonicity check is the most common error here.

## The Leibniz test: monotonicity of the partial sums

**The Leibniz test.** Suppose $u_n>0$, $u_n$ is non-increasing, and $u_n\to0$. Then

$$
\sum_{n=1}^{\infty}(-1)^{n-1}u_n=u_1-u_2+u_3-u_4+\cdots
$$

converges, its sum $S$ satisfies $0<S\le u_1$, and the truncation error is bounded by

$$
|S-S_n|\le u_{n+1}
$$

The proof splits the partial sums by parity. Write $S_{2k}$ for the sum of the first $2k$ terms and $S_{2k-1}$ for the sum of the first $2k-1$ terms.

**Even partial sums increase.** The difference of consecutive ones is

$$
S_{2k+2}-S_{2k}=u_{2k+1}-u_{2k+2}\ge0
$$

by monotonicity, so $S_2\le S_4\le S_6\le\cdots$.

**Odd partial sums decrease.** Similarly

$$
S_{2k+1}-S_{2k-1}=-u_{2k}+u_{2k+1}\le0
$$

so $S_1\ge S_3\ge S_5\ge\cdots$.

**Both sequences sit in the same interval.** For every $k$, $S_{2k}\le S_{2k+1}\le S_1=u_1$. The even partial sums therefore increase and are bounded above, the odd ones decrease and are bounded below, and both converge by the monotone convergence principle. Call the limits $S'$ and $S''$.

**The two limits agree.** Since $S_{2k-1}-S_{2k}=u_{2k}\to0$, we get $S''=S'$. The even and odd subsequences share a limit, so the whole sequence of partial sums converges and the series converges.

**Range and remainder.** From $S_2\le S\le S_1$ we get $0<S\le u_1$. Moreover $S$ always lies between consecutive partial sums $S_n$ and $S_{n+1}$, which are $u_{n+1}$ apart, hence $|S-S_n|\le u_{n+1}$.

One finer point: the sign of the remainder matches the sign of the first omitted term, so you can tell whether an approximation is an overestimate. Geometrically the partial sums produce nested intervals $[S_2,S_1]\supset[S_4,S_3]\supset\cdots$ whose lengths tend to zero; their unique common point is the sum.

## The remainder estimate: why the next term controls the error

Take the alternating harmonic series, whose sum is $S=\ln2\approx0.693147$. The first ten terms give $S_{10}\approx0.645635$. The guaranteed error bound is $u_{11}=1/11\approx0.0909$, while the actual error is only about $0.0475$. The bound is valid but conservative: averaging $S_{10}$ and $S_{11}$ cuts the error to the order of $u_{11}/2$.

To force an error below $0.001$, solve $u_{n+1}=\dfrac{1}{n+1}\le0.001$, which gives $n\ge999$. Compare $\sum(-1)^{n-1}/n^{2}$, where the $(n+1)$-st term is $1/(n+1)^{2}$ and the same accuracy needs only $n\ge31$: absolutely convergent series decay fast, conditionally convergent ones decay slowly.

## Worked example one: from convergence to precision

**Problem.** Decide whether $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{2n-1}=1-\frac13+\frac15-\frac17+\cdots$ converges, locate its sum, give the approximation by the first five terms with an error bound, and find how many terms guarantee an error below $0.01$.

**Check the hypotheses.** Let $u_n=\dfrac{1}{2n-1}>0$. Monotonicity follows from a direct subtraction:

$$
u_{n+1}-u_n=\frac{1}{2n+1}-\frac{1}{2n-1}
=\frac{-2}{(2n+1)(2n-1)}<0
$$

Also $u_n\to0$. All three hypotheses hold, so the Leibniz test gives convergence, with $0<S\le u_1=1$; combining this with $S_2=\dfrac23$ gives $\dfrac23<S<1$.

**Five-term approximation.** Term by term: $1-0.333333=0.666667$, then $+0.2=0.866667$, then $-0.142857=0.723810$, then $+0.111111=0.834921$, so $S_5\approx0.8349$.

The error is controlled by the next term: $|S-S_5|\le u_6=\dfrac{1}{11}\approx0.0909$. The sum of this series is $\pi/4\approx0.785398$, so the actual error is about $0.0495$, inside the bound. Since the sixth term is negative, $S_5$ is an overestimate.

**Number of terms.** We need $u_{n+1}=\dfrac{1}{2n+1}<0.01$, that is $2n+1>100$, so $n>49.5$ and $n=50$ works, with $u_{51}=1/101\approx0.0099$.

## Absolute and conditional convergence

> [!NOTE]
> If $\sum|u_n|$ converges, then $\sum u_n$ is **absolutely convergent**. If $\sum u_n$ converges while $\sum|u_n|$ diverges, then $\sum u_n$ is **conditionally convergent**.

Why distinguish? A finite sum tolerates reordering, bracketing and splitting. An infinite series does not, and the legality of these operations depends on whether convergence is absolute.

**Absolute convergence implies convergence.** Split each term into positive and negative parts:

$$
p_n=\frac{|u_n|+u_n}{2},\qquad q_n=\frac{|u_n|-u_n}{2}
$$

Thus $p_n$ is the positive part and $q_n$ the negative part, both non-negative, and

$$
0\le p_n\le|u_n|,\qquad 0\le q_n\le|u_n|,\qquad u_n=p_n-q_n
$$

By comparison, $\sum p_n$ and $\sum q_n$ both converge, so their difference $\sum u_n$ converges. The same argument yields $\left|\sum u_n\right|\le\sum|u_n|$.

**The converse fails.** The alternating harmonic series converges while its absolute-value series diverges.

**What the distinction buys.** Absolutely convergent series may be reordered without changing the sum; conditionally convergent ones may not. The extreme statement is the Riemann rearrangement theorem: if $\sum u_n$ is conditionally convergent, then for every prescribed $S$ (or $\pm\infty$) there is a rearrangement converging to $S$ (or diverging to that infinite limit).

The proof idea: conditional convergence means the positive terms sum to $+\infty$ and the negative terms sum to $-\infty$; if either converged, the other would too, and the series would be absolutely convergent. So positive terms can lift the partial sum arbitrarily high and negative terms push it arbitrarily low. Rearrange by adding positives until the sum exceeds $S$, then negatives until it drops below $S$, and repeat; each overshoot is no larger than the term just used, so the partial sums are squeezed toward $S$.

For a conditionally convergent series the sum is therefore determined by the order, not by the set of terms: settle the type before doing algebra.

**Example.** $\sum(-1)^{n-1}/n^{2}$: taking absolute values gives the convergent $p$-series with $p=2$, so the series is absolutely convergent with sum $\pi^{2}/12\approx0.8225$. A direct estimate can beat a formal test: $\sum(\sin n)/n^{2}$ is absolutely convergent because $|\sin n|/n^{2}\le1/n^{2}$.

## Worked example two: how rearrangement changes the sum

**Problem.** Rearrange $\sum(-1)^{n-1}/n=\ln2$ in the pattern "one positive, two negative":

$$
1-\frac12-\frac14+\frac13-\frac16-\frac18+\frac15-\frac1{10}-\frac{1}{12}+\cdots
$$

that is, group $\dfrac{1}{2k-1}$ with the two negative terms that follow it, $\dfrac{1}{4k-2}$ and $\dfrac{1}{4k}$. Find the new sum.

**Identify the situation.** The series is conditionally convergent, so rearranging may change the sum; every term appears once, so the rearrangement is legitimate.

**Sum each group.** The $k$-th group is $\dfrac{1}{2k-1}-\dfrac{1}{4k-2}-\dfrac{1}{4k}$. Since $\dfrac{1}{4k-2}=\dfrac{1}{2(2k-1)}$, the first two terms combine to $\dfrac{1}{2(2k-1)}$, and the group equals

$$
\frac{1}{2}\cdot\frac{1}{2k-1}-\frac{1}{4k}
=\frac12\left(\frac{1}{2k-1}-\frac{1}{2k}\right)
$$

**Sum the groups.** Each group is positive, so bracketing preserves convergence, and the rearranged sum is

$$
\sum_{k=1}^{\infty}\frac12\left(\frac{1}{2k-1}-\frac{1}{2k}\right)
=\frac12\ln2
$$

The original equals $\ln2\approx0.6931$; the rearrangement equals $0.3466$, exactly half. Bracketing a convergent series never changes its sum, because the new partial sums form a subsequence of the old ones, so the only step that lost the sum here is the reordering itself: **a convergent series may be bracketed, but not necessarily reordered**.

## The decision procedure and when each method applies

1. **Check whether the terms tend to zero.** If not, the series diverges. This is the cheapest step and the one most often skipped: $\sum(-1)^{n-1}\dfrac{n}{2n-1}$ has terms tending to $\pm\dfrac12$ and diverges at once.
2. **Take absolute values and apply a positive-term test.** Absolute convergence ends the analysis.
3. **If the absolute series diverges, look for alternation.** If the Leibniz hypotheses hold, the series is conditionally convergent.
4. **Otherwise try splitting terms or estimating partial sums directly.** For example, $\sum\left(\dfrac{(-1)^{n-1}}{n}+\dfrac{1}{n^{2}}\right)$ is a sum of two convergent series.

| Method | Applies to | Needs | Strength |
| --- | --- | --- | --- |
| Term test | any series | nothing | only rules out convergence |
| Comparison, limit comparison | positive series | a comparable known series | decides convergence |
| Ratio, root | positive series | a limit different from $1$ | decides convergence |
| Absolute values plus the above | any series | nothing | gives absolute convergence |
| Leibniz | alternating series | $u_n$ decreasing to zero | convergence and a remainder bound |
| Splitting, partial sums | special structure | decomposable into known series | decides convergence, sometimes the sum |

**Example.** For $\sum(-1)^{n-1}\dfrac{n}{n^{2}+1}$ the terms tend to zero, and with $f(x)=\dfrac{x}{x^{2}+1}$,

$$
f'(x)=\frac{(x^{2}+1)-2x^{2}}{(x^{2}+1)^{2}}=\frac{1-x^{2}}{(x^{2}+1)^{2}}\le0\quad(x\ge1)
$$

so $u_n$ decreases from $n=1$ and Leibniz gives convergence. Taking absolute values gives a term comparable to $1/n$, so the series diverges absolutely and is conditionally convergent. Change the denominator to $n^{3}+1$ and the term becomes comparable to $1/n^{2}$, so the conclusion switches to absolute convergence: one power can change the whole answer.

## Edge cases

**Terms not tending to zero.** $\sum(-1)^{n-1}\left(1+\dfrac1n\right)$ alternates perfectly, but its terms tend to $\pm1$, so the series diverges; $u_n\to0$ cannot be dropped.

**Monotonicity failing.** The Leibniz test is sufficient, not necessary. Take $u_n=\dfrac1n+\dfrac{(-1)^{n}}{n^{2}}$; then $\sum(-1)^{n-1}u_n=\sum\left(\dfrac{(-1)^{n-1}}{n}+\dfrac{1}{n^{2}}\right)$ is a sum of two convergent series, yet $u_1=0$, $u_2=\dfrac34$, $u_3=\dfrac29$ is not monotone.

**The boundary in $p$.** For $\sum(-1)^{n-1}/n^{p}$:

| Range of $p$ | Behaviour | Type | Reason |
| --- | --- | --- | --- |
| $p>1$ | converges | absolute | $p$-series converges |
| $0<p\le1$ | converges | conditional | Leibniz; the $p$-series diverges |
| $p\le0$ | diverges | — | terms do not tend to zero |

The value $p=1$ sits exactly on the boundary.

**Bracketing is not reversible.** Bracketing a convergent series preserves the sum; but $\sum\big((1-1)\big)$ converges while $1-1+1-1+\cdots$ diverges. Being allowed to bracket does not mean being allowed to remove brackets, and neither means being allowed to reorder.

## Four misconceptions

> [!MYTH] Every alternating series converges.
> The terms must also decrease monotonically to zero. $\sum(-1)^{n-1}\left(1+\frac1n\right)$ alternates but its terms do not vanish, so it diverges; $u_n=\dfrac{2+(-1)^{n}}{n}$ tends to zero without being monotone, and that series diverges too.

> [!MYTH] A convergent series stays convergent after taking absolute values.
> That is exactly what conditional convergence denies: $\sum(-1)^{n-1}/n$ converges while $\sum1/n$ diverges.

> [!MYTH] A conditionally convergent series can be reordered freely.
> Reordering changes the sum. Turning the alternating harmonic series into "one positive, two negative" changes the sum from $\ln2$ to $\dfrac12\ln2$, and the Riemann theorem produces any prescribed sum.

> [!MYTH] The bound $u_{n+1}$ is the actual error.
> It is a guaranteed upper bound and usually pessimistic. For $\sum(-1)^{n-1}/n$ with ten terms the bound is $1/11\approx0.0909$ while the actual error is about $0.0475$, roughly half.

## Practice

> [!PRACTICE] 1 · Term test first
> Decide whether $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}\frac{n}{2n-1}$ converges.
>
> > [!ANSWER] Show answer
> > The absolute value of the term tends to $\dfrac12\ne0$, so the terms do not vanish and the series diverges.

> [!PRACTICE] 2 · Logarithmic terms
> Decide whether $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}\frac{\ln n}{n}$ converges absolutely or conditionally.
>
> > [!ANSWER] Show answer
> > With $f(x)=\dfrac{\ln x}{x}$ we have $f'(x)=\dfrac{1-\ln x}{x^{2}}\le0$ for $x\ge e$, so the terms decrease from $n=3$, and $\dfrac{\ln n}{n}\to0$; Leibniz gives convergence. Taking absolute values, $\dfrac{\ln n}{n}\ge\dfrac1n$ for $n\ge3$, so the absolute series diverges and the series is conditionally convergent.

> [!PRACTICE] 3 · Remainder
> Approximate $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n^{3}}$ by its first three terms. Bound the error and say whether the estimate is high or low.
>
> > [!ANSWER] Show answer
> > The error is at most the fourth term, $\dfrac{1}{64}\approx0.0156$. The first three terms give $1-\dfrac18+\dfrac1{27}\approx0.9120$, and the fourth term is negative, so $S_3$ is an overestimate.

> [!PRACTICE] 4 · Classify and sum
> Classify $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}\frac{1}{2^{n-1}}$ and find its sum.
>
> > [!ANSWER] Show answer
> > The series is $1-\dfrac12+\dfrac14-\cdots$, geometric with ratio $-\dfrac12$, so its sum is $\dfrac{1}{1+1/2}=\dfrac23$. Taking absolute values gives $\sum\left(\dfrac12\right)^{n-1}=2$, which converges, so the series is absolutely convergent.

> [!PRACTICE] 5 · Solve for precision
> Using $1-\dfrac13+\dfrac15-\cdots=\dfrac{\pi}{4}$ to compute $\pi$, how many terms guarantee an error below $10^{-2}$?
>
> > [!ANSWER] Show answer
> > We need $u_{n+1}=\dfrac{1}{2n+1}<10^{-2}$, so $2n+1>100$ and $n>49.5$; take $n=50$, where $u_{51}=\dfrac{1}{101}\approx0.0099$.

> [!PRACTICE] 6 · Proof
> Suppose $\sum u_n$ is absolutely convergent. Show that $\sum u_n^{2}$ converges.
>
> > [!ANSWER] Show answer
> > Since $\sum|u_n|$ converges, $u_n\to0$, so for some $N$ and all $n>N$ we have $|u_n|<1$, hence $u_n^{2}=|u_n|^{2}\le|u_n|$. Comparison gives convergence of $\sum u_n^{2}$; finitely many terms do not matter.

> [!FORMAL] Formal statement
> Let $u_n>0$ with $u_{n+1}\le u_n$ and $u_n\to0$. Then $\sum(-1)^{n-1}u_n$ converges, its sum satisfies $0<S\le u_1$, and $|S-S_n|\le u_{n+1}$, where $S_n$ is the $n$-th partial sum. If $\sum|u_n|$ converges then $\sum u_n$ converges and is called absolutely convergent; if $\sum u_n$ converges while $\sum|u_n|$ diverges it is called conditionally convergent. Every rearrangement of an absolutely convergent series converges to the same sum, whereas for a conditionally convergent series both the sum of the positive terms and the sum of the negative terms diverge to $+\infty$, and for every $S\in\mathbb{R}$ some rearrangement converges to $S$. To test a series of arbitrary signs, first check that the terms vanish, then test absolute convergence, and finally apply the Leibniz test in the alternating case.

## Links to other lectures

- **Positive series (previous lecture).** The first step here is always to take absolute values and return to comparison, ratio and root tests.
- **Power series (next lecture).** They converge absolutely inside the interval of convergence, which licenses term-by-term differentiation and integration; at the endpoints convergence is often merely conditional.
- **Taylor and Fourier expansions.** Substituting a numerical value produces a series of numbers, usually alternating, and the remainder estimate is the truncation error; $\dfrac{\pi}{4}=1-\dfrac13+\dfrac15-\cdots$ is a Fourier series evaluated at a point.
- **Improper integrals.** Integrals such as $\int_{1}^{\infty}\dfrac{\sin x}{x}dx$ obey the same logic: check absolute convergence first, then rely on cancellation.