---
slug: "elementary-functions"
subject: "calculus"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Functions, Elementary Functions, and Sequence Limits"
subtitle: "Know the object before you talk about approach"
minutes: 34
meta: ["34 min read","Requires elementary algebra","Mastery level"]
concepts: ["elem", "seq", "calc"]
prereq: ["elem"]
related: ["calc", "funclim", "cont"]
---

## What this lecture sets out to do

This lecture answers two questions that are easy to skip and expensive to ignore: **what exactly is a function**, and **how do we turn “approaches” into an inequality we can check**.

In school mathematics a function often looks like a formula. You see $f(x)=x^2$ and quietly assume that the domain is all real numbers. In calculus that habit fails immediately. The domain is part of the function, not a footnote; the domain of a composition is not the union of two domains; and an inverse function does not exist merely because we can swap the letters $x$ and $y$.

The second question is the limit. Derivatives, definite integrals, series, and improper integrals are all limits in disguise. If a limit remains a vague story about “getting closer”, none of the later proofs can be written down. Here we replace the story with the $\varepsilon$-$N$ definition and use it in several complete proofs.

By the end of the lecture you should be able to:

- find the domain of a function, of a composition, and of an inverse;
- state the domain, range, and monotonicity of the basic elementary functions;
- explain the role of each quantifier in the $\varepsilon$-$N$ definition;
- prove a limit by “bounding above, then solving for $n$”;
- decide whether a sequence is better handled by squeezing or by monotone convergence.

## Three lines back

- A function is fixed by its domain, its rule, and its range. Two functions are equal only when their domains agree and their values agree everywhere.
- Elementary functions are built from the basic ones by finitely many arithmetic operations and compositions. Check the domain before discussing anything else.
- A sequence is a function on the positive integers. $\lim_{n\to\infty}a_n=A$ means that beyond some index, every term lies in an arbitrarily small neighbourhood of $A$.

## The domain is part of the function

Start with a concrete example:

$$
f(x)=\ln(x-1)+\sqrt{4-x}
$$

The logarithm needs $x-1>0$, and the square root needs $4-x\ge 0$. Taking the intersection gives

$$
D_f=(1,4]
$$

Asking for the derivative of $f$ at $x=0$ is not a difficult question; it is a meaningless one, because $0$ is not in the domain.

A subtler case is cancellation. Consider

$$
f(x)=\frac{x^2-1}{x-1},\qquad g(x)=x+1
$$

For every $x\ne 1$, the two formulas agree. But the domain of $f$ is $\mathbb{R}\setminus\{1\}$, while the domain of $g$ is $\mathbb{R}$. As functions they are different. The graph of $f$ has a hole at $x=1$; the graph of $g$ does not. That hole will matter when we discuss continuity and differentiability.

The usual domain restrictions form a short table:

| Structure | Restriction | Example |
| --- | --- | --- |
| Quotient $\dfrac{1}{g(x)}$ | $g(x)\ne 0$ | $\dfrac{1}{x-2}$: $x\ne 2$ |
| Even root $\sqrt{h(x)}$ | $h(x)\ge 0$ | $\sqrt{4-x}$: $x\le 4$ |
| Logarithm $\ln h(x)$ | $h(x)>0$ | $\ln(x-1)$: $x>1$ |
| Tangent $\tan x$ | $\cos x\ne 0$ | $x\ne \dfrac{\pi}{2}+k\pi$ |
| Arcsine, arccosine | $-1\le x\le 1$ | $\arcsin x$ |
| Power $x^a$ | depends on $a$ | $x^{1/2}$ needs $x\ge 0$; $x^{1/3}$ is defined for all real $x$ |

> [!NOTE]
> When several restrictions appear, the domain is their **intersection**, not their union. Write each condition separately, then take the common part on the number line. This prevents most domain errors.

## Four layers and the meaning of equality

A function can be read at four levels:

1. **Domain** $D$: the set of allowed inputs;
2. **Rule**: each $x\in D$ produces exactly one $y$;
3. **Range**: the set of values actually attained;
4. **Graph**: the set of points $(x,f(x))$.

The range is not the same as “the set of allowed outputs”. For $f(x)=x^2$ the range is $[0,+\infty)$, not $\mathbb{R}$. The range records what actually happens, not what is permitted.

Equality of functions is correspondingly strict:

> [!FORMAL] Equality of functions
> Let $f$ and $g$ have domains $D_f$ and $D_g$. If $D_f=D_g$ and $f(x)=g(x)$ for every $x\in D_f$, then $f=g$.

The same formula on different domains gives different functions. For instance,

$$
f(x)=x^2,\quad x\in[0,2];\qquad g(x)=x^2,\quad x\in[-1,1]
$$

are not the same function, even though the rule is identical.

Ranges are found by monotonicity, completing the square, or using bounds. For example, the range of $x^2$ on $[0,2]$ is $[0,4]$, not all of $\mathbb{R}$.

## Composition: the domain is solved, not copied

The domain of $f(g(x))$ is not $D_f$. It is

$$
\{x\in D_g: g(x)\in D_f\}
$$

In words: first $g$ must be defined, and then its output must land inside the domain of $f$.

For example,

$$
f(u)=\sqrt{u},\qquad g(x)=\ln x
$$

gives

$$
f(g(x))=\sqrt{\ln x}
$$

The square root requires $\ln x\ge 0$, hence $x\ge 1$. The logarithm itself requires $x>0$. The intersection is $[1,+\infty)$. Notice that the domain of $g$ alone, $(0,+\infty)$, is not the domain of the composition.

Order also matters. With $f(u)=\dfrac{1}{u}$ and $g(x)=x-2$,

$$
f(g(x))=\frac{1}{x-2}\quad(D=\mathbb{R}\setminus\{2\}),
$$

while

$$
g(f(x))=\frac{1}{x}-2\quad(D=\mathbb{R}\setminus\{0\}).
$$

The safe procedure is “inner function first, outer restriction second”. Most missing-domain errors disappear if you write those two steps down.

## Inverse functions: existence comes before swapping

A function $f:D\to\mathbb{R}$ has an inverse only if, for every $y$ in its range, the equation $f(x)=y$ has **exactly one** solution in $D$. A sufficient condition is that $f$ is strictly monotone on $D$: different inputs then give different outputs, so the equation can be solved uniquely.

The standard procedure is:

1. write $y=f(x)$;
2. solve for $x=\varphi(y)$ on the domain;
3. swap the letters to write $y=\varphi(x)$;
4. state the domain of the inverse, which is the range of the original function.

For example,

$$
y=e^{2x-1}
$$

gives

$$
\ln y=2x-1,\qquad x=\frac{\ln y+1}{2}.
$$

After swapping,

$$
f^{-1}(x)=\frac{\ln x+1}{2},\qquad D=(0,+\infty).
$$

The range of $f$ is $(0,+\infty)$, so the domain of $f^{-1}$ is exactly that interval.

The graphs of $f$ and $f^{-1}$ are mirror images across the line $y=x$. This is a useful check: if the graph of the inverse does not look like the mirror image, the domain or the monotonicity interval is probably wrong.

Trigonometric functions need an interval restriction before they can be inverted. $\sin x$ is not monotone on $\mathbb{R}$; restricted to $[-\pi/2,\pi/2]$, it produces $\arcsin x$. Similarly, $\cos x$ is restricted to $[0,\pi]$ for $\arccos x$.

> [!MYTH] Every function has an inverse.
> Only a one-to-one function does. $f(x)=x^2$ on $\mathbb{R}$ is not one-to-one; restricted to $[0,+\infty)$, it has the inverse $\sqrt{x}$.

## The basic elementary functions

The basic elementary functions are the building blocks of all elementary functions. The usual list is: power, exponential, logarithmic, trigonometric, and inverse trigonometric functions, together with constant functions.

| Type | Form | Domain | Range | Monotonicity |
| --- | --- | --- | --- | --- |
| Constant | $y=C$ | $\mathbb{R}$ | $\{C\}$ | constant |
| Power | $y=x^a$ | depends on $a$ | depends on $a$ | depends on $a$ |
| Exponential | $y=a^x,\ a>0,a\ne1$ | $\mathbb{R}$ | $(0,+\infty)$ | increasing if $a>1$, decreasing if $0<a<1$ |
| Logarithm | $y=\log_a x$ | $(0,+\infty)$ | $\mathbb{R}$ | increasing if $a>1$, decreasing if $0<a<1$ |
| Sine, cosine | $y=\sin x,\ y=\cos x$ | $\mathbb{R}$ | $[-1,1]$ | period $2\pi$, monotone on subintervals |
| Tangent | $y=\tan x$ | $x\ne \frac{\pi}{2}+k\pi$ | $\mathbb{R}$ | increasing on each interval |
| Inverse trig | $\arcsin x,\ \arccos x,\ \arctan x$ | first two $[-1,1]$, last $\mathbb{R}$ | corresponding intervals | first two monotone, $\arctan$ increasing |

Power functions deserve special care because the domain depends on the exponent:

- $x^{1/2}=\sqrt{x}$: $x\ge 0$;
- $x^{1/3}=\sqrt[3]{x}$: all real $x$;
- $x^{-1}=\dfrac{1}{x}$: $x\ne 0$;
- $x^{2/3}=\sqrt[3]{x^2}$: all real $x$, but not differentiable at $0$.

Exponential and logarithmic functions are inverses, so

$$
e^{\ln x}=x\quad(x>0),\qquad \ln(e^x)=x\quad(x\in\mathbb{R}).
$$

The two identities look alike but have different domains: the first needs $x>0$, the second holds for every real $x$.

For inverse trigonometric functions,

$$
\arcsin x+\arccos x=\frac{\pi}{2}\quad(-1\le x\le 1),
$$

and

$$
\sin(\arcsin x)=x,\qquad \tan(\arctan x)=x.
$$

But $\arcsin(\sin x)=x$ only on $[-\pi/2,\pi/2]$; outside that interval the expression must first be brought back to the principal branch.

An elementary function is what you get from the basic ones by finitely many additions, subtractions, multiplications, divisions, and compositions. For example,

$$
y=\ln(x^2-1)+\sqrt{1-x}
$$

needs $x^2-1>0$ and $1-x\ge 0$. The first condition gives $x<-1$ or $x>1$, and the second gives $x\le 1$. Their intersection is $x<-1$. The exercise is about patience with domains, not about algebraic tricks.

## Sequences are functions on the positive integers

A sequence

$$
a_1,a_2,a_3,\ldots
$$

is more precisely a function on the positive integers:

$$
a_n=f(n),\quad n=1,2,3,\ldots
$$

Its graph is a collection of isolated points $(n,a_n)$, not a continuous curve. That matters: when we discuss a limit, we care about how the height changes as the index grows, not about a tangent line.

The basic vocabulary:

- **bounded**: there is $M>0$ such that $|a_n|\le M$ for every $n$;
- **increasing**: $a_{n+1}\ge a_n$ for every $n$;
- **decreasing**: $a_{n+1}\le a_n$ for every $n$;
- **subsequence**: infinitely many terms taken in their original order.

For example, $a_n=1/n$ is bounded, decreasing, and tends to $0$; $a_n=n$ is increasing but unbounded; $a_n=(-1)^n$ is bounded, not monotone, and does not converge.

Sequences can also be defined recursively. For instance,

$$
a_1=\sqrt{2},\qquad a_{n+1}=\sqrt{2+a_n}.
$$

No closed formula is given, but monotonicity and boundedness can still be studied first, and the limit can then be proved to exist. That is exactly the pattern behind the monotone convergence theorem.

## The ε-N definition, word by word

A sequence $\{a_n\}$ has limit $A$,

$$
\lim_{n\to\infty}a_n=A,
$$

if:

> for every $\varepsilon>0$ there is a positive integer $N$ such that $|a_n-A|<\varepsilon$ whenever $n>N$.

Every part of the sentence matters:

- “**for every** $\varepsilon>0$”: $\varepsilon$ is chosen by someone else; you may not pick a convenient one;
- “**there is** $N$”: $N$ may depend on $\varepsilon$, and is often written $N(\varepsilon)$;
- “whenever $n>N$”: only the eventual terms matter; finitely many early terms may be as wild as they like;
- “$|a_n-A|<\varepsilon$”: the term lies in the $\varepsilon$-neighbourhood of $A$.

Geometrically, for every small interval $(A-\varepsilon,A+\varepsilon)$, the sequence eventually lies entirely inside it; only finitely many terms can remain outside. This is why a finite number of exceptional terms never affects a limit.

Three points about $N$:

1. $N$ need not be minimal; choosing it too large is not an error;
2. $N$ usually depends on $\varepsilon$; smaller $\varepsilon$ usually requires larger $N$;
3. $N$ must be a positive integer, but it need not be the optimal integer.

If the limit is not $A$, the negation reads:

> there is some $\varepsilon_0>0$ such that for every positive integer $N$, one can find $n>N$ with $|a_n-A|\ge\varepsilon_0$.

This form is useful for proving non-convergence. Take $a_n=(-1)^n$ and suppose it converges to $A$. Choose $\varepsilon_0=1$. If $A\ge 0$, take a sufficiently large odd $n$; then $a_n=-1$ and $|a_n-A|=1+A\ge 1$. If $A<0$, take a sufficiently large even $n$; then $a_n=1$ and $|a_n-A|=1+|A|\ge 1$. No matter how large $N$ is, such an $n$ exists, so no limit exists.

> [!NOTE]
> Convergence is only about eventual behaviour. The first ten thousand terms may be chaotic; as long as every term after some index lies in an arbitrarily small neighbourhood, the sequence converges. This is why proofs may enlarge a denominator or ignore finitely many early terms.

## Proving a limit from the definition

A definition proof has a standard three-step shape:

1. let $\varepsilon>0$ be arbitrary;
2. construct $N$, usually by solving an inequality;
3. verify that $n>N$ implies $|a_n-A|<\varepsilon$.

The real work is in step 2: how to get $n$ out of $|a_n-A|<\varepsilon$. The common trick is to **bound above**: replace a complicated denominator by a smaller quantity, making the fraction larger and the inequality easier to solve.

Example:

$$
a_n=\frac{2n+1}{n+3},\qquad A=2.
$$

The gap is

$$
\left|\frac{2n+1}{n+3}-2\right|
=\left|\frac{2n+1-2n-6}{n+3}\right|
=\frac{5}{n+3}.
$$

We need

$$
\frac{5}{n+3}<\varepsilon
\iff n+3>\frac{5}{\varepsilon}
\iff n>\frac{5}{\varepsilon}-3.
$$

So $N=\left\lceil\dfrac{5}{\varepsilon}\right\rceil$ is enough. Writing the proof out:

> For every $\varepsilon>0$, take $N=\left\lceil\dfrac{5}{\varepsilon}\right\rceil$. If $n>N$, then
> $$
> \left|\frac{2n+1}{n+3}-2\right|=\frac{5}{n+3}<\frac{5}{n}<\varepsilon.
> $$
> Hence $\lim_{n\to\infty}\dfrac{2n+1}{n+3}=2$.

The step $\dfrac{5}{n+3}<\dfrac{5}{n}$ is the typical “make the denominator smaller, make the fraction larger” move.

A second example involves a square root:

$$
a_n=\sqrt{n+1}-\sqrt{n}.
$$

Rationalise first:

$$
\sqrt{n+1}-\sqrt{n}
=\frac{1}{\sqrt{n+1}+\sqrt{n}}
<\frac{1}{\sqrt{n}}.
$$

To make this smaller than $\varepsilon$, it is enough that $\sqrt{n}>\dfrac{1}{\varepsilon}$, that is, $n>\dfrac{1}{\varepsilon^2}$. Take $N=\left\lceil\dfrac{1}{\varepsilon^2}\right\rceil$.

A third example is exponential:

$$
a_n=q^n,\qquad |q|<1.
$$

Write $|q|=\dfrac{1}{1+h}$ with $h>0$. Bernoulli's inequality gives

$$
(1+h)^n\ge 1+nh,
$$

so

$$
|q|^n=\frac{1}{(1+h)^n}\le\frac{1}{1+nh}<\frac{1}{nh}.
$$

Thus $\dfrac{1}{nh}<\varepsilon$ once $n>\dfrac{1}{h\varepsilon}$, and $N=\left\lceil\dfrac{1}{h\varepsilon}\right\rceil$ works. When the base has absolute value below $1$, exponential growth crushes the sequence to $0$.

> [!PRACTICE] 1 · Follow the pattern
> Prove from the definition that $\lim_{n\to\infty}\dfrac{3n-1}{n+2}=3$.
>
> > [!ANSWER] Show answer
> > First compute $\left|\dfrac{3n-1}{n+2}-3\right|=\dfrac{7}{n+2}<\dfrac{7}{n}$. Requiring $\dfrac{7}{n}<\varepsilon$ gives $n>\dfrac{7}{\varepsilon}$. Take $N=\left\lceil\dfrac{7}{\varepsilon}\right\rceil$; then the gap is below $\varepsilon$ for every $n>N$.

## The squeeze theorem

The squeeze theorem says:

> If $b_n\le a_n\le c_n$ from some index onward, and $b_n\to A$, $c_n\to A$, then $a_n\to A$.

There are two standard situations:

1. the sequence contains a bounded oscillating factor such as $\sin n$ or $(-1)^n$;
2. the sequence is an $n$-term sum or a complicated power that needs upper and lower bounds.

First example:

$$
a_n=\frac{\sin n}{n}.
$$

Since

$$
0\le\left|\frac{\sin n}{n}\right|\le\frac{1}{n},
$$

and $\dfrac{1}{n}\to 0$, we get $\dfrac{\sin n}{n}\to 0$. The absolute value turns the oscillation between $-1$ and $1$ into a nonnegative bound.

Second example:

$$
a_n=(1+2^n+3^n)^{1/n}.
$$

Look for bounds:

$$
3^n\le 1+2^n+3^n\le 3\cdot 3^n.
$$

Taking the $n$-th root,

$$
3\le a_n\le 3\cdot 3^{1/n}.
$$

Since $3^{1/n}\to 1$, both ends tend to $3$, and the squeeze theorem gives $a_n\to 3$. The largest base $3$ determines the limit; the other terms are flattened by the $n$-th root.

A third example is an $n$-term sum:

$$
a_n=\frac{1}{n^2}+\frac{2}{n^2}+\cdots+\frac{n}{n^2}
=\frac{1+2+\cdots+n}{n^2}.
$$

Summing first,

$$
a_n=\frac{n(n+1)}{2n^2}=\frac{n+1}{2n}\to\frac12.
$$

If the sum formula is not at hand, bounds also work: each term is at most $\dfrac{n}{n^2}=\dfrac{1}{n}$, and there are $n$ terms, so $a_n\le 1$. The point is that squeezing and direct summation are not rivals; choose the shorter route.

## Monotone convergence: existence first, value second

Monotone convergence says:

> An increasing sequence bounded above converges; a decreasing sequence bounded below converges.

It guarantees **existence**, not the value. The usual two-step pattern is:

1. prove that the sequence is monotone and bounded, so the limit exists;
2. let the limit be $L$, take the limit in the recurrence, and solve for $L$.

Consider

$$
a_1=\sqrt{2},\qquad a_{n+1}=\sqrt{2+a_n}.
$$

**Bounded.** By induction, $0<a_n<2$. Indeed, $a_1=\sqrt{2}<2$, and if $a_n<2$, then

$$
a_{n+1}=\sqrt{2+a_n}<\sqrt{4}=2.
$$

**Monotone.** Compute the difference of squares:

$$
a_{n+1}^2-a_n^2=(2+a_n)-a_n^2=-(a_n-2)(a_n+1).
$$

Since $0<a_n<2$, the product is positive, so $a_{n+1}^2>a_n^2$. All terms are positive, hence $a_{n+1}>a_n$: the sequence is increasing.

By monotone convergence, a limit $L$ exists. Taking limits in the recurrence,

$$
L=\sqrt{2+L}.
$$

Squaring,

$$
L^2=2+L
\iff L^2-L-2=0
\iff (L-2)(L+1)=0.
$$

Thus $L=2$ or $L=-1$. Since every term is positive, $L\ge 0$, so $L=2$.

The second classical example is

$$
a_n=\left(1+\frac{1}{n}\right)^n.
$$

It increases and is bounded above by $3$, so it converges. Its limit defines the natural base

$$
e=\lim_{n\to\infty}\left(1+\frac{1}{n}\right)^n\approx 2.71828.
$$

The binomial expansion shows both properties:

$$
\left(1+\frac{1}{n}\right)^n
=1+1+\frac{1}{2!}\left(1-\frac{1}{n}\right)
+\frac{1}{3!}\left(1-\frac{1}{n}\right)\left(1-\frac{2}{n}\right)+\cdots
$$

Each term grows as $n$ grows, so the sequence increases. Meanwhile the expansion is bounded by

$$
1+1+\frac{1}{2!}+\frac{1}{3!}+\cdots+\frac{1}{n!}
<1+1+\frac{1}{2}+\frac{1}{2^2}+\cdots=3.
$$

> [!NOTE]
> The converse fails: a convergent sequence need not be monotone. $a_n=\dfrac{(-1)^n}{n}$ converges to $0$ while alternating in sign. Monotonicity is sufficient, not necessary.

## Standard limits worth knowing

| Sequence | Limit | Main reason |
| --- | --- | --- |
| $\dfrac{1}{n^p},\ p>0$ | $0$ | definition or squeezing |
| $q^n,\ \lvert q\rvert<1$ | $0$ | Bernoulli's inequality |
| $n^{1/n}$ | $1$ | binomial expansion and squeezing |
| $\left(1+\dfrac{a}{n}\right)^n$ | $e^a$ | monotone convergence or substitution |
| $\left(1+\dfrac{1}{n}\right)^{n+1}$ | $e$ | compare with the previous row |
| $(-1)^n$ | does not exist | two subsequences disagree |
| $n$ | diverges to $+\infty$ | unbounded |

For $n^{1/n}\to 1$, write

$$
n^{1/n}=1+x_n,\qquad x_n>0.
$$

The binomial expansion gives

$$
n=(1+x_n)^n\ge 1+nx_n+\frac{n(n-1)}{2}x_n^2.
$$

Keeping only the quadratic term,

$$
n-1\ge\frac{n(n-1)}{2}x_n^2,
$$

so

$$
0<x_n\le\sqrt{\frac{2}{n}}.
$$

For $n\ge 2$ the right side tends to $0$, hence $x_n\to 0$ and $n^{1/n}\to 1$.

## Four misconceptions

> [!MYTH] The limit is one of the terms.
> A limit is a number the sequence may never attain. $a_n=1/n$ tends to $0$, and no term equals $0$.

> [!MYTH] Bounded means convergent.
> $(-1)^n$ is bounded but jumps between $-1$ and $1$. Boundedness plus monotonicity is enough; boundedness alone is not.

> [!MYTH] Monotone means convergent.
> $a_n=n$ is increasing but unbounded, so it diverges to $+\infty$. The boundedness hypothesis cannot be dropped.

> [!MYTH] Since the base of $\left(1+\frac1n\right)^n$ tends to $1$, the limit is $1$.
> The base and the exponent move together. The result is $e\approx 2.71828$, not $1$. Forms like $1^\infty$ need separate treatment.

## Practice

> [!PRACTICE] 1 · Find the domain
> Find the domain of $f(x)=\sqrt{\ln(2-x)}$.
>
> > [!ANSWER] Show answer
> > The square root needs $\ln(2-x)\ge 0$, so $2-x\ge 1$ and $x\le 1$. The logarithm also needs $2-x>0$, so $x<2$. The intersection is $(-\infty,1]$.

> [!PRACTICE] 2 · Find the inverse
> Find the inverse of $f(x)=\ln(2x+1)$ and its domain.
>
> > [!ANSWER] Show answer
> > From $y=\ln(2x+1)$ we get $2x+1=e^y$, hence $x=\dfrac{e^y-1}{2}$. Swapping letters gives $f^{-1}(x)=\dfrac{e^x-1}{2}$. The range of the original function is $\mathbb{R}$, so the domain of the inverse is $\mathbb{R}$.

> [!PRACTICE] 3 · Squeeze
> Compute $\lim_{n\to\infty}\dfrac{\cos n}{n}$.
>
> > [!ANSWER] Show answer
> > Since $0\le\left|\dfrac{\cos n}{n}\right|\le\dfrac{1}{n}$ and $\dfrac{1}{n}\to 0$, the squeeze theorem gives limit $0$.

> [!PRACTICE] 4 · Recursive sequence
> Let $a_1=\sqrt{2}$ and $a_{n+1}=\sqrt{2+a_n}$. Prove that the sequence converges and find its limit.
>
> > [!ANSWER] Show answer
> > Induction shows $0<a_n<2$. Then $a_{n+1}^2-a_n^2=-(a_n-2)(a_n+1)>0$, so the sequence increases. By monotone convergence a limit $L$ exists. Taking limits in the recurrence gives $L=\sqrt{2+L}$, hence $L=2$ (the negative root is impossible).

> [!PRACTICE] 5 · Three bases
> Compute $\lim_{n\to\infty}(1+2^n+3^n)^{1/n}$.
>
> > [!ANSWER] Show answer
> > From $3^n\le 1+2^n+3^n\le 3\cdot 3^n$, taking $n$-th roots gives $3\le a_n\le 3\cdot 3^{1/n}$. Since $3^{1/n}\to 1$, the limit is $3$.

## Formal statement

Let $\{a_n\}$ be a real sequence and $A\in\mathbb{R}$. It converges to $A$ if, for every $\varepsilon>0$, there is a positive integer $N$ such that $|a_n-A|<\varepsilon$ whenever $n>N$.

A convergent sequence has a unique limit. Suppose it converged to both $A$ and $B$ with $A\ne B$. Take $\varepsilon=\dfrac{|A-B|}{2}$. Eventually every term must lie in both the $A$- and $B$-neighbourhoods of radius $\varepsilon$, but those neighbourhoods are disjoint; contradiction.

A convergent sequence is bounded. Take $\varepsilon=1$; beyond some $N$, $|a_n|<|A|+1$. The first $N$ terms are finite, so together with $|A|+1$ they have a maximum.

If $a_n\ge 0$ eventually and $a_n\to A$, then $A\ge 0$. Otherwise, with $A<0$, choose $\varepsilon=-A/2$; eventually the terms would be negative, contradiction.

Monotone convergence: an increasing sequence bounded above converges, and a decreasing sequence bounded below converges. Squeeze theorem: if $b_n\le a_n\le c_n$ eventually and $b_n,c_n\to A$, then $a_n\to A$.

## How this lecture connects

Three habits from this lecture will reappear constantly:

- **domain awareness**: before discussing continuity, differentiability, or integrability, confirm that the function is defined on the interval;
- **the $\varepsilon$ language**: function limits, continuity, derivatives, definite integrals, and series all use the same “arbitrarily small” formulation;
- **squeezing and monotone convergence**: the first is for estimates, the second for proving that recursive sequences and important limits exist.

The next lecture moves from limits of sequences to limits of functions and introduces continuity. The $\varepsilon$-$\delta$ language will look familiar; only the discrete index $n$ is replaced by the continuous variable $x$.
