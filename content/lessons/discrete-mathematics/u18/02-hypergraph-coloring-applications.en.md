---
slug: "hypergraph-coloring-applications"
subject: "discrete-mathematics"
unit: "u18"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Hypergraph Coloring, Matching, and Applications"
subtitle: "No monochromatic edge, and what that buys"
minutes: 16
meta: ["16 min read","Requires the basic notions of hypergraphs","Mastery level"]
concepts: ["hypergraph", "graph"]
prereq: ["hypergraph"]
related: ["matrix", "complexity"]
---

## What you will get

By the end of this lecture you can color a hypergraph properly and compute the chromatic number of a complete uniform hypergraph, find the matching number and transversal number of small hypergraphs and explain why $\nu\le\tau$ always holds, use the Fano plane to show the gap can be strict, and see how acyclic hypergraphs relate to join queries in databases.

## Three lines back

- A proper coloring of a hypergraph forbids monochromatic edges, and the least number of colors is $\chi(H)$.
- A matching is a family of pairwise disjoint edges, a transversal meets every edge, and always $\nu(H)\le\tau(H)$.
- The complete $k$-uniform hypergraph satisfies $\chi(K_n^k)=\lceil n/(k-1)\rceil$, and the Fano plane needs three colors.

## Coloring with no monochromatic edge

Let $H=(V,E)$. A map $c:V\to\{1,\dots,k\}$ is a proper $k$-coloring if every $e\in E$ contains at least two vertices of different colors, that is, no edge is monochromatic. The least $k$ admitting such a coloring is the chromatic number $\chi(H)$. When every edge has size $2$ this is exactly proper coloring of an ordinary graph.

Use $V=\{1,2,3,4,5\}$ and $E=\{\{1,2,3\},\{2,4\},\{3,4,5\},\{1,5\}\}$ again. Color $1$ and $4$ red and $2,3,5$ blue. Checking each edge: $e_1$ has red $1$ and blue $2,3$; $e_2$ has red $4$ and blue $2$; $e_3$ has red $4$ and blue $3,5$; $e_4$ has red $1$ and blue $5$. No edge is monochromatic, so $\chi(H)\le2$, and one color is impossible, so $\chi(H)=2$.

The complete $3$-uniform hypergraph $K_5^3$ behaves differently. It contains all $\binom{5}{3}=10$ triples. With two colors, the pigeonhole principle forces one color to appear at least $\lceil5/2\rceil=3$ times among five vertices, and those three vertices form an edge, so every two-coloring fails. Three colors work: split the vertices into classes of sizes $2,2,1$; any three vertices meet at least two classes and never form a monochromatic edge. Hence $\chi(K_5^3)=3$.

In general the complete $k$-uniform hypergraph satisfies

$$
\chi(K_n^k)=\left\lceil \frac{n}{k-1}\right\rceil
$$

The argument runs both ways. A color class with $k$ vertices is a monochromatic edge, so every class has at most $k-1$ vertices and at least $\lceil n/(k-1)\rceil$ colors are needed. Conversely, splitting the vertices as evenly as possible into that many classes keeps every class at or below $k-1$ vertices, which is a valid coloring.

| Hypergraph | Vertices | Edge size | Chromatic number |
| --- | --- | --- | --- |
| five-vertex example above | 5 | 3 or 2 | 2 |
| $K_5^3$ | 5 | 3 | 3 |
| $K_4^3$ | 4 | 3 | 2 |
| $K_6^3$ | 6 | 3 | 3 |

## Matching and transversals

A matching is a subfamily of $E$ whose members are pairwise disjoint, and its maximum size is $\nu(H)$. A transversal, or hitting set, is a set $T\subseteq V$ with $T\cap e\neq\varnothing$ for every $e\in E$, and its minimum size is $\tau(H)$.

For every hypergraph,

$$
\nu(H)\le\tau(H)
$$

because $T$ must hit each edge of a matching separately, and disjoint edges cannot share a hitting vertex, so $|T|$ is at least the matching size.

Back to the example. The pair $\{e_2,e_4\}=\{\{2,4\},\{1,5\}\}$ is disjoint, so $\nu\ge2$; three pairwise disjoint edges would need at least $6$ distinct vertices out of only $5$, so $\nu=2$. Now $T=\{1,4\}$ hits $e_1$ through $1$, $e_2$ through $4$, $e_3$ through $4$, and $e_4$ through $1$, so $\tau\le2$. No single vertex lies in all four edges, since $e_1\cap e_2\cap e_3=\varnothing$, so $\tau=2$. Here $\nu=\tau=2$.

Equality can fail. The Fano plane has $7$ vertices and $7$ edges

$$
123,\ 145,\ 167,\ 246,\ 257,\ 347,\ 356
$$

Any two edges intersect, so $\nu=1$. Each vertex lies on only $3$ edges, so hitting all $7$ requires at least $3$ vertices, and $\{1,2,3\}$ does hit every edge, so $\tau=3$. Thus $\nu=1<3=\tau$, and the gap can be substantial.

| Hypergraph | $\nu$ | $\tau$ | Equal? |
| --- | --- | --- | --- |
| five-vertex example | 2 | 2 | yes |
| Fano plane | 1 | 3 | no |
| triangle hypergraph $\{12,23,13\}$ | 1 | 2 | no |

## Applications: join queries and triple systems

In a database, treat attributes as vertices and each table's attribute set as a hyperedge. Joining many tables by brute force risks a cartesian explosion, and acyclicity of the hypergraph is exactly what permits a join tree that avoids it. The test is GYO reduction: repeatedly delete a vertex lying in only one edge (an ear), or delete an edge contained in another, and the hypergraph is acyclic if this process empties it. The triangle hypergraph $\{12,23,13\}$ admits no step at all and is cyclic; $\{123,34,45\}$ reduces by deleting vertices $5,1,2$ and the redundant edges until nothing remains, so it is acyclic and a join tree exists.

A second application comes from combinatorial designs. The $7$ edges of the Fano plane have the property that any two vertices lie together in exactly one edge. Such a structure is a Steiner triple system $S(2,3,7)$, used to build experimental designs, error-correcting codes, and tournament schedules. Its chromatic number is also $3$: in a two-coloring, if one color class is exactly an edge that edge is monochromatic, while if the three points of that class are not collinear the remaining four points contain a complete edge (for the class $\{1,2,4\}$ the set $\{3,5,6\}$ is an edge), again producing a monochromatic edge. Three colors succeed, for instance $1,2$ red, $3,4$ green, $5,6,7$ blue.

> [!NOTE]
> The gap between matching and transversal is specific to hypergraphs. In bipartite graphs the two numbers are equal by König's theorem, while the Fano plane shows the equality fails in general.

## Three common misconceptions

> [!MYTH] Coloring a hypergraph is the same as coloring its 2-section.
> Coloring the 2-section is stronger. For $H=\{\{1,2,3\}\}$ the 2-section is a triangle needing three colors, while $H$ itself needs only two, since a single triple just has to contain two different colors.

> [!MYTH] The matching number always equals the transversal number.
> In general only $\nu\le\tau$ holds. In the Fano plane the matching number is $1$ and the transversal number is $3$.

> [!MYTH] $K_5^3$ can be colored with two colors.
> Any two-coloring of five vertices puts at least three in one class, and those three vertices form an edge, so a monochromatic edge is unavoidable and three colors are required.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find the chromatic number of $K_4^3$.
>
> > [!ANSWER] Show answer
> > The formula gives $\lceil4/(3-1)\rceil=2$. Concretely, split the vertices into two pairs; every triple meets both pairs, so a two-coloring is proper, while one color clearly fails.

> [!PRACTICE] 2 · Variation
> What are the matching and transversal numbers of the Fano plane?
>
> > [!ANSWER] Show answer
> > Any two edges intersect, so $\nu=1$. Each edge has three points and each point lies on three edges, so at least three points are needed to hit all seven edges, and $\{1,2,3\}$ does so, giving $\tau=3$.

> [!PRACTICE] 3 · Transfer
> Is the hypergraph $\{\{1,2\},\{2,3\},\{1,3\}\}$ acyclic?
>
> > [!ANSWER] Show answer
> > No. GYO reduction needs a vertex in exactly one edge or a contained edge, but here every vertex lies in two edges and all three edges have the same size, so neither step applies and the hypergraph is cyclic.

## Formal statement

Let $H=(V,E)$. A proper $k$-coloring is a map $c:V\to\{1,\dots,k\}$ with $|c(e)|\ge2$ for every $e\in E$, and $\chi(H)$ is the least such $k$. The complete $k$-uniform hypergraph satisfies $\chi(K_n^k)=\lceil n/(k-1)\rceil$.

A matching is a family of pairwise disjoint edges with maximum size $\nu(H)$; a transversal is a set $T\subseteq V$ with $T\cap e\neq\varnothing$ for all $e\in E$, with minimum size $\tau(H)$. Since disjoint edges need distinct hitting vertices, $\nu(H)\le\tau(H)$; the Fano plane attains $\nu=1$ and $\tau=3$.

The Fano plane is the $S(2,3,7)$ system with edges $123,145,167,246,257,347,356$; every two points lie in exactly one edge and $\chi=3$. A hypergraph is acyclic exactly when GYO reduction empties it by repeatedly deleting a degree-$1$ vertex or an edge contained in another. Acyclic hypergraphs correspond to multi-table join queries with a join tree, evaluable in polynomial time.