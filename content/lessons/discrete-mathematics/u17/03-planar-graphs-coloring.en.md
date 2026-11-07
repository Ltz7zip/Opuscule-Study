---
slug: "planar-graphs-coloring"
subject: "discrete-mathematics"
unit: "u17"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Discrete Mathematics · Mastery"
title: "Planar Graphs and Graph Coloring"
subtitle: "Euler's formula, the four color theorem, and chromatic polynomials"
minutes: 17
meta: ["17 min read","Requires graphs and connectivity","Mastery level"]
concepts: ["specialgraph", "graph"]
prereq: ["graph"]
related: ["specialgraph", "counting"]
---

## What you will get

By the end of this lecture you can recover the number of faces from Euler's formula $v-e+f=2$, rule out planarity of $K_5$ and $K_{3,3}$ with the bounds $e\le 3v-6$ and $e\le 2v-4$, explain the role of Kuratowski's theorem and the four color theorem, and compute chromatic polynomials of small graphs by both recurrence and deletion-contraction.

## Three lines back

- A connected plane graph satisfies $v-e+f=2$, counting the outer face in $f$.
- A simple planar graph has $e\le 3v-6$, tightened to $e\le 2v-4$ when it is triangle-free.
- The four color theorem says every planar graph is $4$-colorable, and its proof relies on computer checking.

## Euler's formula and two edge bounds

Draw a graph in the plane without crossings. The edges divide the plane into regions called faces, and the unbounded one is the outer face, which must be counted.

Euler's formula states that for a connected plane graph,

$$
v-e+f=2
$$

where $v$ is the number of vertices, $e$ the number of edges, and $f$ the number of faces including the outer one. The induction is short: a tree has $e=v-1$ and a single face, so the formula holds; for a graph with a cycle, delete one edge of that cycle, which lowers $e$ by one and merges two faces into one, leaving $v-e+f$ unchanged; repeat until a tree remains.

| Graph | $v$ | $e$ | $f$ | $v-e+f$ |
| --- | --- | --- | --- | --- |
| $K_4$ | 4 | 6 | 4 | 2 |
| Cube graph | 8 | 12 | 6 | 2 |
| Octahedron graph | 6 | 12 | 8 | 2 |

A planar drawing of $K_4$ places one vertex inside a triangle and joins it to all three corners, giving three inner triangular faces plus the outer one.

Euler's formula yields edge bounds. Let $G$ be a simple connected plane graph with $v\ge3$. Every face boundary has length at least three, and every edge borders two faces, so $2e\ge 3f$. Substituting $f=2-v+e$ gives

$$
2e\ge 3(2-v+e)\quad\Longrightarrow\quad e\le 3v-6
$$

For $K_5$ we have $v=5$ and $e=10$, while the bound is $3\cdot5-6=9$; since $10>9$, $K_5$ is nonplanar. If the graph has no triangle, every face has at least four sides, and the same argument gives $e\le 2v-4$. For $K_{3,3}$ we have $v=6$ and $e=9$ against the bound $2\cdot6-4=8$, so $K_{3,3}$ is nonplanar too.

| Graph | $v$ | $e$ | Applicable bound | Conclusion |
| --- | --- | --- | --- | --- |
| $K_4$ | 4 | 6 | $3v-6=6$ | planar |
| $C_6$ | 6 | 6 | $3v-6=12$ | planar |
| $K_5$ | 5 | 10 | $3v-6=9$ | nonplanar |
| $K_{3,3}$ | 6 | 9 | $2v-4=8$ | nonplanar |

These inequalities are necessary conditions only. A graph can satisfy $e\le 3v-6$ and still be nonplanar, so the bounds disprove planarity but never prove it.

## Kuratowski's theorem and the four color theorem

Kuratowski's theorem gives an exact characterization: $G$ is planar if and only if it contains no subdivision of $K_5$ or $K_{3,3}$. A subdivision inserts degree-$2$ vertices along edges and does not change whether a planar embedding exists, so testing planarity amounts to searching for these two forbidden structures, which can be done in polynomial time.

The four color theorem states that every planar graph admits a proper coloring with four colors, equivalently that every planar map can be colored with four colors so that adjacent regions differ. The conjecture dates from 1852 and was proved in 1976 by Appel and Haken, whose argument used a computer to check a large collection of reducible configurations; it is the best-known early computer-assisted proof.

A weaker five color theorem has a self-contained induction. Let $G$ be planar on $v$ vertices. From $e\le 3v-6$ the average degree is below $6$, so some vertex $v_0$ has $d(v_0)\le5$. Induct on the number of vertices and five-color $G-v_0$. If the neighbors of $v_0$ use at most four colors, extend directly. Otherwise the five neighbors use all five colors, listed as $1,2,3,4,5$ in cyclic order. Consider the subgraph induced by colors $1$ and $3$: if the two relevant neighbors lie in different components, swap colors $1$ and $3$ inside one component and a color is freed for $v_0$; if they lie in the same component, a $1$-$3$ path there together with $v_0$ forms a closed curve separating the color-$2$ and color-$4$ neighbors, so swapping $2$ and $4$ inside one side frees a color. Either case completes the coloring.

> [!NOTE]
> The "four" is tight: $K_4$ is planar and needs four colors. The key move in the five color proof is the Kempe chain swap, a technique reused throughout coloring arguments.

## Chromatic polynomials

Let $P(G,k)$ be the number of proper colorings of $G$ with $k$ colors, called the chromatic polynomial. It is a polynomial in $k$ of degree $|V(G)|$, and the chromatic number $\chi(G)$ is the least positive integer $k$ with $P(G,k)>0$.

The basic recurrence is deletion-contraction:

$$
P(G,k)=P(G-e,k)-P(G/e,k)
$$

Here $G-e$ deletes the edge $e$, while $G/e$ merges its two endpoints. The reason is that proper colorings of $G-e$ in which the endpoints share a color correspond exactly to proper colorings of $G/e$, and $G$ requires those endpoints to differ, so subtracting removes them.

Trees are the simplest case. A root has $k$ choices and every child only has to avoid its parent's color, giving $k-1$ choices at each step:

$$
P(T,k)=k(k-1)^{\,n-1}
$$

For the four-cycle $C_4$, the recurrence gives $P(C_4,k)=P(P_4,k)-P(C_3,k)=k(k-1)^3-k(k-1)(k-2)$, which expands to

$$
P(C_4,k)=k^4-4k^3+6k^2-3k
$$

| $k$ | $P(C_4,k)$ | Meaning |
| --- | --- | --- |
| 1 | 0 | impossible |
| 2 | 2 | the two alternating patterns |
| 3 | 18 | colorings with three colors |
| 4 | 84 | colorings with four colors |

At $k=2$ this is $16-32+24-6=2$, matching the fact that an even cycle has exactly two $2$-colorings; at $k=3$ it is $81-108+54-9=18$. The complete graph $K_n$ needs all vertices distinct, so $P(K_n,k)=k(k-1)\cdots(k-n+1)$, which vanishes for $k<n$ and gives $\chi(K_n)=n$.

## Three common misconceptions

> [!MYTH] A planar graph is one drawn with no crossings.
> Planarity means that some crossing-free drawing exists, not that the drawing in front of you is crossing-free. $K_4$ can be drawn as a triangle with a vertex inside, or with crossing diagonals; the first drawing proves it is planar.

> [!MYTH] The bound $e\le 3v-6$ holds for every planar graph.
> It requires $v\ge3$ and a simple graph. The graph with two vertices joined by one edge has $v=2$ and $e=1$, while $3v-6=0$, so the inequality fails.

> [!MYTH] The four color theorem has been proved by hand.
> The 1976 proof by Appel and Haken relied on a computer check of more than a thousand reducible configurations; it is computer-assisted rather than purely manual.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Use an edge bound to decide whether $K_{3,3}$ is planar.
>
> > [!ANSWER] Show answer
> > $K_{3,3}$ is bipartite and triangle-free, so $e\le 2v-4$ applies. Here $v=6$ and $e=9$, while $2\cdot6-4=8$; since $9>8$, $K_{3,3}$ is nonplanar.

> [!PRACTICE] 2 · Variation
> How many proper colorings with three colors does a tree on $7$ vertices have?
>
> > [!ANSWER] Show answer
> > Using $P(T,k)=k(k-1)^{n-1}$ gives $3\cdot2^{6}=3\cdot64=192$.

> [!PRACTICE] 3 · Transfer
> A connected plane graph has $10$ vertices and $15$ edges. How many faces does it have?
>
> > [!ANSWER] Show answer
> > Euler's formula gives $f=2-v+e=2-10+15=7$, including the outer face.

## Formal statement

Let $G$ be a connected plane graph with $v$ vertices, $e$ edges, and $f$ faces including the outer one. Then $v-e+f=2$. If $G$ is simple and $v\ge3$, then $e\le3v-6$; if in addition $G$ is bipartite, then $e\le2v-4$. Both are necessary conditions and can only be used to disprove planarity.

Kuratowski's theorem: $G$ is planar if and only if it contains no subdivision of $K_5$ or $K_{3,3}$. The four color theorem states $\chi(G)\le4$ for every planar graph, and the bound is tight. The five color theorem follows by induction using $\delta(G)\le5$ and Kempe chain swaps.

The chromatic polynomial $P(G,k)$ counts proper $k$-colorings and satisfies the deletion-contraction recurrence $P(G,k)=P(G-e,k)-P(G/e,k)$. Its degree is $|V(G)|$ and its leading coefficient is $1$. For a tree $P(T,k)=k(k-1)^{n-1}$, for a complete graph $P(K_n,k)=k(k-1)\cdots(k-n+1)$, and $\chi(G)=\min\{k\in\mathbb{Z}_{>0}:P(G,k)>0\}$.