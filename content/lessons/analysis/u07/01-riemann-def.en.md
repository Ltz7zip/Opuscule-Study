---
slug: "riemann-def"
subject: "analysis"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "The Definite Integral"
subtitle: "Squeezing a curved region with finitely many rectangles"
minutes: 17
meta: ["17 min read","Requires elementary calculus","Mastery level"]
concepts: ["defint", "sup"]
prereq: ["contprop"]
related: ["defint", "indefint"]
---

## Goals

By the end of this lecture you can write down partitions, Darboux sums, and the definition of integrability, compute $\int_0^1 x^2dx=\frac13$ by hand from the definition, and decide whether a bounded function with discontinuities is integrable.

The definite integral is not "the difference of antiderivatives"; that is a computational tool that arrives later. At the definition stage there is only one idea: cut the interval into pieces, squeeze with rectangle areas, and see whether the upper and lower sums meet at a single number.

## Three-line recap

- A continuous function on a closed interval attains its extrema, a fact used repeatedly last chapter.
- Cutting the interval into small pieces and erecting one rectangle on each gives an approximation to the curved trapezoid.
- Finer partitions approximate better; if every sufficiently fine partition is squeezed to the same number, that number is the integral.

## Partitions and Darboux sums

Let $f$ be bounded on $[a,b]$, and take a partition

$$T:\ a=x_0<x_1<\cdots<x_n=b,\qquad \Delta x_i=x_i-x_{i-1}.$$

On each subinterval set

$$M_i=\sup_{[x_{i-1},x_i]}f,\qquad m_i=\inf_{[x_{i-1},x_i]}f .$$

The **upper** and **lower sums** are

$$S(T)=\sum_{i=1}^{n}M_i\Delta x_i,\qquad s(T)=\sum_{i=1}^{n}m_i\Delta x_i .$$

Refining a partition can only lower $S(T)$ and raise $s(T)$. So the upper sums are bounded below, the lower sums bounded above, and we may define

$$\overline{\int_a^b}f=\inf_T S(T),\qquad \underline{\int_a^b}f=\sup_T s(T).$$

The function is **integrable** when these agree: $\overline{\int}=\underline{\int}=I$, written $I=\int_a^b f(x)\,dx$.

> [!NOTE]
> Equivalent form: for every $\varepsilon>0$ there is a partition $T$ with $S(T)-s(T)<\varepsilon$.

## Computing an integral from the definition

Take $f(x)=x^2$ on $[0,1]$ with $n$ equal parts, $\Delta x_i=\frac1n$.

For the upper sum, $M_i=\left(\frac{i}{n}\right)^2$, so

$$S_n=\frac{1}{n^3}\sum_{i=1}^{n}i^2=\frac{(n+1)(2n+1)}{6n^2}\ \longrightarrow\ \frac{1}{3}.$$

For the lower sum, $m_i=\left(\frac{i-1}{n}\right)^2$, so

$$s_n=\frac{1}{n^3}\sum_{j=0}^{n-1}j^2=\frac{(n-1)(2n-1)}{6n^2}\ \longrightarrow\ \frac{1}{3}.$$

Both sequences tend to the same limit, and $s_n\le\frac13\le S_n$ for every $n$. By the squeeze, both integrals equal $\frac13$, hence $\int_0^1x^2dx=\frac13$.

The numbers show the rate: at $n=10$, $S_{10}=\frac{11\cdot21}{600}=0.385$ and $s_{10}=\frac{9\cdot19}{600}=0.285$, an error near $0.05$; at $n=100$ the error is near $0.005$, of order $\frac1n$.

## Which functions are integrable

| Condition | Integrable? | Reason |
| --- | --- | --- |
| Continuous on a closed interval | yes | uniform continuity shrinks all oscillations at once |
| Monotone on a closed interval | yes | the oscillation sum telescopes |
| Bounded, finitely many discontinuities | yes | isolate the discontinuities in tiny intervals |
| Bounded, infinitely many discontinuities | not necessarily | depends on how large the discontinuity set is |

The classical non-integrable example is Dirichlet's function:

$$D(x)=\begin{cases}1,&x\in\mathbb{Q},\\0,&x\notin\mathbb{Q}.\end{cases}$$

Every subinterval contains both rationals and irrationals, so $M_i=1$ and $m_i=0$ for all $i$. Thus $S(T)=1$ and $s(T)=0$ for every partition, the two integrals are $1$ and $0$, and $D$ is not integrable.

## Three misconceptions

> [!MYTH] Integrable functions must be continuous.
> Not at all. $f(x)=\operatorname{sgn}x$ has one discontinuity on $[-1,1]$ and is still integrable, with integral $0$. Step functions and monotone functions may jump.

> [!MYTH] Infinitely many discontinuities forces non-integrability.
> Not necessarily. Thomae's function equals $\frac1q$ at a rational $p/q$ in lowest terms and $0$ at irrationals; it is discontinuous at every rational yet Riemann integrable with integral $0$. What matters is whether the discontinuities can be covered by intervals of arbitrarily small total length.

> [!MYTH] Different partitions and sample points give different values of the integral.
> An individual Riemann sum certainly depends on the partition and the tags, but when the function is integrable all such sums share one limit. The definition demands that the limit exist, not that every sum be equal.

## Practice

> [!PRACTICE] 1 · Equal parts
> Compute $\int_0^1 x\,dx$ from the definition using $n$ equal parts.
>
> > [!ANSWER] Show answer
> > $M_i=\frac{i}{n}$, so $S_n=\frac{1}{n^2}\cdot\frac{n(n+1)}{2}=\frac{n+1}{2n}\to\frac12$; also $s_n=\frac{n-1}{2n}\to\frac12$. The integral is $\frac12$.

> [!PRACTICE] 2 · Linear function
> Compute $\int_0^1(2x+1)\,dx$ from the definition.
>
> > [!ANSWER] Show answer
> > $M_i=2\cdot\frac{i}{n}+1$, so $S_n=\frac{2}{n^2}\cdot\frac{n(n+1)}{2}+1=\frac{n+1}{n}+1\to2$; the lower sums also tend to $2$. The integral is $2$.

> [!PRACTICE] 3 · Decide integrability
> Is Dirichlet's function integrable on $[0,1]$?
>
> > [!ANSWER] Show answer
> > No. Every subinterval contains rationals and irrationals, so $M_i=1$ and $m_i=0$; the upper sum is always $1$ and the lower sum always $0$, so the two integrals differ.

> [!PRACTICE] 4 · One jump
> Is $f(x)=\operatorname{sgn}x$ integrable on $[-1,1]$? What is the integral?
>
> > [!ANSWER] Show answer
> > Yes. It is bounded and continuous except at $x=0$. Put $0$ inside an interval of arbitrarily small length; on the rest $f$ is continuous, and the contribution of that small interval is at most its length. Hence $\overline{\int}=\underline{\int}=0$ and the integral is $0$.

> [!FORMAL] Formal statement
> Let $f$ be bounded on $[a,b]$ and let $T$ be a partition with $S(T),s(T)$ as above. Then $f$ is Riemann integrable on $[a,b]$ if $\inf_T S(T)=\sup_T s(T)=I$, written $I=\int_a^b f$. Equivalent conditions: for every $\varepsilon>0$ there is a partition $T$ with $S(T)-s(T)<\varepsilon$; and for every $\varepsilon>0$ there is $\delta>0$ such that whenever the mesh $\|T\|<\delta$ and $\xi_i\in[x_{i-1},x_i]$ are arbitrary, $\left|\sum f(\xi_i)\Delta x_i-I\right|<\varepsilon$.
