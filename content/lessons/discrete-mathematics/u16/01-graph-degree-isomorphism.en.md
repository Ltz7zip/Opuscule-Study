---
slug: "graph-degree-isomorphism"
subject: "discrete-mathematics"
unit: "u16"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Graphs, Degree, and Isomorphism"
subtitle: "The network behind the dots and lines"
minutes: 15
meta: ["15 min read","Requires sets and maps","Mastery level"]
concepts: ["graph", "relation"]
prereq: ["setops"]
related: ["specialgraph", "matrix"]
---

## What you will get

By the end of this lecture you can turn a network into $G=(V,E)$, compute the degree of every vertex and check the sum against the handshake theorem, and decide whether two graphs with the same degree sequence are isomorphic.

Three things only: give a graph a set-theoretic definition, turn "how many edges touch this vertex" into a quantity you can sum, and separate "looks different" from "is structurally different".

## Three lines back

- A graph is a vertex set plus edges between vertices; an undirected edge is a two-element subset.
- The degree of a vertex is the number of edges at it, and all degrees together sum to twice the edge count.
- Isomorphism asks for a bijection that preserves adjacency; equal degree sequences are necessary but not sufficient.

## A graph is a set of vertices and edges

An undirected graph is written $G=(V,E)$: $V$ is a non-empty finite set of vertices, $E$ is a collection of edges joining pairs of vertices. An edge written $\{u,v\}$ has no direction, so $\{u,v\}$ and $\{v,u\}$ are the same edge.

Depending on which structures are allowed, graphs come in several flavours:

| Name | Multiple edges | Loops |
| --- | --- | --- |
| Simple graph | no | no |
| Multigraph | yes | no |
| Pseudograph | yes | yes |

A loop joins a vertex to itself. "Two people know each other" gives an undirected edge and a simple graph; two parallel fibres between the same pair of routers give a multigraph. Unless stated otherwise, this course means simple graphs.

Graphs can also be directed. A directed edge is an ordered pair $(u,v)$, pointing from $u$ to $v$. Once direction appears, in-degree and out-degree must be counted separately, and the matrix representation later makes that explicit.

## Degree and the handshake theorem

The degree $\deg(v)$ of a vertex $v$ is the number of edges incident with it, with a loop counting twice. A vertex of degree $0$ is isolated; one of degree $1$ is a leaf.

Add up all degrees and every edge is counted exactly once at each of its two ends, so

$$
\sum_{v\in V}\deg(v)=2|E|
$$

This is the **handshake theorem**. It has an immediate corollary: **the number of odd-degree vertices is even**. The total is even, and a sum of an odd number of odd integers would be odd, so odd degrees must come in pairs.

A concrete case: five vertices, six edges, degrees $3,3,2,2,2$.

| Vertex | $v_1$ | $v_2$ | $v_3$ | $v_4$ | $v_5$ |
| --- | --- | --- | --- | --- | --- |
| Degree | 3 | 3 | 2 | 2 | 2 |

The sum is $3+3+2+2+2=12$, and $2|E|=2\times6=12$. One way to draw it: join $v_1,v_2,v_3$ into a triangle, attach $v_4$ to $v_1$ and $v_5$ to $v_2$. Then $v_1$ and $v_2$ each get degree $3$ and the other three get degree $2$.

Turn the question around: given a sequence of integers, is there a simple graph with exactly that degree sequence? This is the **graphical sequence** problem. The handshake theorem gives a necessary condition, not a sufficient one. The sequence $3,3,3,1$ passes the parity test, yet four vertices allow maximum degree $3$: the three vertices of degree $3$ must be mutually adjacent, and a fourth vertex joined to one of them would raise that vertex to degree $3$ but itself only to $1$, while the other two would drop to $2$. The sequence cannot be realised. The Havel–Hakimi algorithm settles the question: repeatedly delete the largest degree and subtract one from that many of the next largest; if a negative number appears, the sequence is not graphical.

## Isomorphism: same graph, new names

Two graphs $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$ are **isomorphic** when there is a bijection $f:V_1\to V_2$ with

$$
\{u,v\}\in E_1 \iff \{f(u),f(v)\}\in E_2
$$

In plain words: rename the vertices of the first graph and it coincides with the second. Isomorphism preserves the following **invariants**:

- the number of vertices and of edges;
- the degree sequence;
- the number of connected components;
- the presence of cycles of each length, in particular bipartiteness;
- the number of vertex pairs at distance $k$.

If any invariant differs, the graphs are not isomorphic. But agreement on all of them still does not prove isomorphism. The smallest counterexample pairs the hexagon $C_6$ with the disjoint union of two triangles $C_3\cup C_3$:

| Comparison | $C_6$ | $C_3\cup C_3$ |
| --- | --- | --- |
| Vertices | 6 | 6 |
| Edges | 6 | 6 |
| Degree sequence | $2,2,2,2,2,2$ | $2,2,2,2,2,2$ |
| Connected components | 1 | 2 |

Every number in the table matches, yet one graph is connected and the other splits into two pieces. Any bijection would have to send some edge between the two components, so adjacency cannot be preserved and the graphs are not isomorphic.

This also shows why isomorphism testing is hard: the degree sequence only filters candidates. A proof of non-isomorphism needs an invariant that differs, and a proof of isomorphism needs an explicit bijection. No polynomial-time algorithm is known for general graph isomorphism, and the problem is not known to be NP-complete either.

## Three common misconceptions

> [!MYTH] Equal degree sequences mean the graphs are isomorphic.
> $C_6$ and $C_3\cup C_3$ both have six vertices of degree $2$, but different component counts. The degree sequence is only necessary.

> [!MYTH] Every edge joins two distinct vertices.
> That holds for simple graphs; pseudographs allow loops. A loop contributes $2$ to the degree, and the handshake theorem still holds.

> [!MYTH] The handshake theorem only applies to simple graphs.
> Counting each edge once at each incidence, every multigraph and pseudograph satisfies $\sum\deg(v)=2|E|$; parallel edges and loops do not break the identity.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> A graph has $7$ vertices, each of degree $3$. How many edges does it have?
>
> > [!ANSWER] Show answer
> > The degree sum would be $7\times3=21$, which is odd and contradicts $\sum\deg=2|E|$. No such graph exists.

> [!PRACTICE] 2 · Variation
> Is the sequence $4,3,3,2,2$ graphical?
>
> > [!ANSWER] Show answer
> > Havel–Hakimi: remove $4$ and subtract one from the next four, giving $2,2,1,1$; remove $2$, giving $1,0,1$, sorted as $1,1,0$; remove $1$, giving $0,0$. Everything reaches zero, so the sequence is graphical with $14/2=7$ edges.

> [!PRACTICE] 3 · Transfer
> How many edges does a $4$-regular graph on $10$ vertices have? Can it be simple?
>
> > [!ANSWER] Show answer
> > The degree sum is $40$, so $|E|=20$. Degree $4$ is below the $9$ available neighbours, so a simple graph exists; a circulant construction joining each vertex to its four nearest neighbours works.

## Formal statement

An undirected graph is a pair $G=(V,E)$ where $V$ is a non-empty finite set and $E$ is a multiset of two-element subsets of $V$; if $E$ is a set with no $\{v,v\}$, the graph is simple. The degree $\deg(v)$ is the number of edges incident with $v$, a loop counted twice.

Handshake theorem: for every undirected graph $G=(V,E)$,

$$
\sum_{v\in V}\deg(v)=2|E|
$$

hence the number of odd-degree vertices is even.

Let $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$. They are isomorphic, written $G_1\cong G_2$, if some bijection $f:V_1\to V_2$ satisfies

$$
\{u,v\}\in E_1 \iff \{f(u),f(v)\}\in E_2
$$

for all $u,v\in V_1$. Isomorphism is an equivalence relation on graphs, and vertex count, edge count, degree sequence, component count, and cycle structure are all invariants of it.
