---
slug: "map-composition"
subject: "analysis"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Maps and Composition"
subtitle: "Writing 'correspondence' as a rule you can check"
minutes: 15
meta: ["15 min read","Needs sets and Cartesian products","Mastery level"]
concepts: ["map", "set", "cartesian"]
prereq: ["set", "cartesian"]
related: ["setops", "map"]
---

## What you will get

The last lecture treated sets as objects. This one adds relations between them: how elements of one set are carried to another. Every function, sequence, and limit in analysis eventually lives in this language.

By the end you can state the domain, codomain, and image of a map, tell injective, surjective, and bijective apart, decide whether two maps compose, and know the exact condition for an inverse to exist.

## Three lines back

- A map is a rule: every input has exactly one output.
- Injective means inputs never collide; surjective means every target element is used; bijective means both.
- Composition is doing one map then another — associative, but not commutative.

## Three disciplines of a map

Let $A$ and $B$ be sets. A map $f: A \to B$ is a subset $G \subseteq A \times B$ such that:

1. **Existence**: every $a \in A$ is paired with at least one $b$;
2. **Uniqueness**: every $a \in A$ is paired with at most one $b$;
3. **Direction**: the first component of each pair comes from $A$, the second from $B$.

The first two together say "exactly one". The third looks pedantic until you meet "$x \mapsto \pm\sqrt{x}$": those two values cannot both be selected unless the codomain becomes a set of sets.

$A$ is the domain, $B$ the codomain. The codomain is declared in advance; it is not the range actually hit.

## Image and preimage

For $a \in A$, $f(a)$ is its image. For a subset,

$$
f(A) = \{f(a) : a \in A\}, \qquad f(S) = \{f(a) : a \in S\}, \; S \subseteq A
$$

Conversely, for $T \subseteq B$, the preimage is

$$
f^{-1}(T) = \{a \in A : f(a) \in T\}
$$

Here $f^{-1}$ is just notation; it does not assert that $f$ is invertible. Preimages behave well: they commute with unions, intersections, and complements,

$$
f^{-1}(T_1 \cup T_2) = f^{-1}(T_1) \cup f^{-1}(T_2), \qquad f^{-1}(B \setminus T) = A \setminus f^{-1}(T)
$$

Images are less obedient: $f(S_1 \cap S_2)$ is in general a proper subset of $f(S_1) \cap f(S_2)$. This asymmetry shows up again and again in analysis.

## Injective, surjective, bijective

| Property | Definition | In one line |
| --- | --- | --- |
| Injective | $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$ | no collisions |
| Surjective | $f(A) = B$ | no empty seats |
| Bijective | both | one-to-one correspondence |

Three examples on $\mathbb{R} \to \mathbb{R}$:

- $f(x) = x^2$: neither (not injective since $f(-1)=f(1)$; not surjective since negatives are missed);
- $f(x) = e^x$: injective, not surjective ($f(\mathbb{R}) = (0, +\infty)$);
- $f(x) = x^3$: bijective.

Restrict $x^2$ to domain $[0, +\infty)$ and codomain $[0, +\infty)$ and it becomes bijective at once. Injectivity and surjectivity are not properties of a formula alone; they belong to the formula together with its domain and codomain.

## Composition and associativity

If $f: A \to B$ and $g: B \to C$, the composite $g \circ f: A \to C$ is

$$
(g \circ f)(a) = g(f(a))
$$

There is only one condition: the codomain of $f$ must lie inside the domain of $g$. That is why, before writing $\lim_{n \to \infty} f(x_n)$ in analysis, you check that every $x_n$ stays in the domain of $f$.

Composition is associative:

$$
h \circ (g \circ f) = (h \circ g) \circ f
$$

The proof is just evaluating both sides at $h(g(f(a)))$. It is not commutative, and often one order is not even defined.

Composition preserves the properties: a composite of injections is injective, of surjections is surjective, hence of bijections is bijective.

## When an inverse exists

$f: A \to B$ has an inverse $f^{-1}: B \to A$ exactly when $f$ is bijective. Injectivity gives uniqueness of the inverse value; surjectivity makes it defined everywhere.

One distinction saves many mistakes: the preimage $f^{-1}(T)$ exists for any map, while the inverse map $f^{-1}$ exists only for bijections.

## Why analysis starts here

The rigorous definition of a limit is

$$
\forall \varepsilon > 0, \; \exists N, \; \forall n > N: |x_n - L| < \varepsilon
$$

Every piece of that sentence is a map or a set: $n \mapsto x_n$ is a map from the naturals to the reals, and $\{n : |x_n - L| < \varepsilon\}$ is a preimage. Once the language of maps is fluent, quantifiers stop being symbols to memorise and become statements you can check step by step.

## Misreadings

> [!MYTH] If you can write a formula, you have a map.
> A formula is only a description. To be a map it must give exactly one output per input, with the domain stated.

> [!MYTH] $f^{-1}$ always exists; it may just be hard to write.
> No. An inverse exists exactly for bijections. A non-injective function does not even have unique preimages.

> [!MYTH] Composition is substitution, so the order does not matter.
> Order decides the result. $f(g(x))$ and $g(f(x))$ are usually different functions, and sometimes one is undefined.

## Exercises

> [!PRACTICE] 1 · Classify
> $f: \mathbb{Z} \to \mathbb{Z}$, $f(n) = 2n$. Injective, surjective, bijective?
>
> > [!ANSWER] Show answer
> > Injective: $2n_1 = 2n_2 \Rightarrow n_1 = n_2$. Not surjective: odd numbers are missed. So not bijective.

> [!PRACTICE] 2 · Change the codomain
> Change the codomain in the previous exercise to $2\mathbb{Z}$, the even numbers. Does the answer change?
>
> > [!ANSWER] Show answer
> > It becomes bijective. Surjectivity depends on the codomain.

> [!PRACTICE] 3 · Order matters
> $f(x) = x + 1$, $g(x) = x^2$. Write $g \circ f$ and $f \circ g$.
>
> > [!ANSWER] Show answer
> > $(g \circ f)(x) = (x+1)^2$ and $(f \circ g)(x) = x^2 + 1$. Different.

> [!PRACTICE] 4 · Preimages
> $f(x) = x^2$. Find $f^{-1}(\{1, 4\})$ and $f^{-1}((-1, 1))$.
>
> > [!ANSWER] Show answer
> > The first is $\{-2,-1,1,2\}$; the second requires $x^2 < 1$, i.e. $x \in (-1,1)$.

> [!PRACTICE] 5 · Images do not preserve intersections
> Give an example where $f(S_1 \cap S_2) \neq f(S_1) \cap f(S_2)$.
>
> > [!ANSWER] Show answer
> > $f(x) = x^2$, $S_1 = \{-1\}$, $S_2 = \{1\}$. The intersection is empty, so its image is empty; both images are $\{1\}$, whose intersection is $\{1\}$.

> [!FORMAL] Formal statement
> A map $f: A \to B$ is a subset $G \subseteq A \times B$ such that for every $a \in A$ there is exactly one $b \in B$ with $(a,b) \in G$. $f$ is injective if $f(a_1)=f(a_2)$ implies $a_1=a_2$; surjective if $f(A)=B$; bijective if both. The composite $g \circ f$ is defined when $f(A) \subseteq \operatorname{dom} g$, and composition is associative. $f$ is invertible if and only if it is bijective.
