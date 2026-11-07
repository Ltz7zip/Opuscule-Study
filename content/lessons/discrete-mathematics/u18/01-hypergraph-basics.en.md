---
slug: "hypergraph-basics"
subject: "discrete-mathematics"
unit: "u18"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Hypergraphs: The Basic Notions"
subtitle: "Let one edge hold arbitrarily many vertices"
minutes: 15
meta: ["15 min read","Requires graphs and incidence matrices","Mastery level"]
concepts: ["hypergraph", "matrix"]
prereq: ["graph"]
related: ["matrix", "specialgraph"]
---

## What you will get

By the end of this lecture you can write the incidence matrix of a hypergraph and read vertex degrees and edge sizes from it, verify the handshake identity that row sums equal column sums, build the dual hypergraph and describe how degrees and edge sizes trade places, distinguish linear, uniform, and simple hypergraphs, and recover the 2-section of a hypergraph.

## Three lines back

- A hypergraph $H=(V,E)$ has edges that are arbitrary nonempty subsets of $V$, not just pairs.
- In the incidence matrix, rows are vertices and columns are edges; a column sum is an edge size and a row sum is a vertex degree.
- The dual swaps vertices with edges and satisfies $(H^{*})^{*}=H$; the 2-section flattens a hypergraph into an ordinary graph.

## Definition and incidence matrix

A hypergraph is a pair $H=(V,E)$ where $V$ is the vertex set and $E$ is the edge set, with each edge $e\in E$ satisfying $e\subseteq V$ and $e\neq\varnothing$. When every edge has size $2$ the object is just an undirected graph. Repeated edges are allowed if $E$ is taken as a multiset.

Take $V=\{1,2,3,4,5\}$ with edge set

$$
E=\bigl\{\,\{1,2,3\},\ \{2,4\},\ \{3,4,5\},\ \{1,5\}\,\bigr\}
$$

and name the four edges $e_1,e_2,e_3,e_4$. The incidence matrix $M$ has rows indexed by vertices and columns by edges, with $M_{ve}=1$ exactly when $v\in e$:

| | $e_1$ | $e_2$ | $e_3$ | $e_4$ | Row sum |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 0 | 0 | 1 | 2 |
| 2 | 1 | 1 | 0 | 0 | 2 |
| 3 | 1 | 0 | 1 | 0 | 2 |
| 4 | 0 | 1 | 1 | 0 | 2 |
| 5 | 0 | 0 | 1 | 1 | 2 |
| Column sum | 3 | 2 | 3 | 2 | 10 |

The row sums give the degrees: every vertex lies in exactly two edges, so $d(1)=d(2)=\cdots=d(5)=2$. The column sums give the edge sizes: $|e_1|=3$, $|e_2|=2$, $|e_3|=3$, $|e_4|=2$.

The total number of ones can be counted in two directions: by rows we get $\sum_{v}d(v)=10$, by columns we get $\sum_{e}|e|=3+2+3+2=10$. This is the hypergraph handshake identity

$$
\sum_{v\in V} d(v)=\sum_{e\in E}|e|
$$

In an ordinary graph every edge contributes $2$, so the right side is always $2|E|$ and the identity reduces to the familiar degree-sum fact. In a hypergraph each edge contributes its own size, which is the general form worth remembering.

Keep the incidence matrix apart from the adjacency matrix: the incidence matrix is $|V|\times|E|$ and records membership, while the adjacency matrix is $|V|\times|V|$ and records only whether two vertices are adjacent, losing the information about which vertices share an edge.

## The dual hypergraph

Given $H=(V,E)$, build the dual $H^{*}=(V^{*},E^{*})$ by turning each edge $e\in E$ into a vertex, so $V^{*}=E$, and creating one edge $E_v=\{e\in E:v\in e\}$ for each original vertex $v\in V$.

Computing each one on the example:

$$
E_1=\{e_1,e_4\},\quad E_2=\{e_1,e_2\},\quad E_3=\{e_1,e_3\},\quad E_4=\{e_2,e_3\},\quad E_5=\{e_3,e_4\}
$$

Thus $H^{*}$ has $4$ vertices and $5$ edges, and its incidence matrix is exactly the transpose of $M$, of size $4\times5$:

| | $E_1$ | $E_2$ | $E_3$ | $E_4$ | $E_5$ |
| --- | --- | --- | --- | --- | --- |
| $e_1$ | 1 | 1 | 1 | 0 | 0 |
| $e_2$ | 0 | 1 | 0 | 1 | 0 |
| $e_3$ | 0 | 0 | 1 | 1 | 1 |
| $e_4$ | 1 | 0 | 0 | 0 | 1 |

Transposing produces a pair of dual facts: a vertex degree in $H$ becomes the size of the corresponding edge in $H^{*}$, and an edge size in $H$ becomes the degree of the corresponding vertex in $H^{*}$. Here the degrees of $H$ are $2,2,2,2,2$ and the five edge sizes of $H^{*}$ are $2,2,2,2,2$; the edge sizes of $H$ are $3,2,3,2$ and the degrees of $H^{*}$ are $3,2,3,2$.

Duality is an involution: repeating the construction returns the vertex set $V$ and the edge set $E$, so $(H^{*})^{*}=H$. This is often used to translate a statement about vertices into a statement about edges.

## The 2-section and special hypergraphs

The 2-section of $H$, written $[H]_2$, is the ordinary graph on $V$ in which two vertices are adjacent exactly when they lie together in some hyperedge. In the example, $e_1$ contributes $12,13,23$, $e_2$ contributes $24$, $e_3$ contributes $34,35,45$, and $e_4$ contributes $15$, giving $8$ distinct edges:

$$
[H]_2=\{12,13,23,24,34,35,45,15\}
$$

The 2-section compresses a hypergraph into a graph and loses information: it remembers that two vertices were once together, not which edge held them. Going the other way, turning each edge of a graph into a size-$2$ hyperedge produces a hypergraph whose 2-section is the original graph.

Three standard classes are worth naming:

- Linear: any two edges meet in at most one vertex. In the example the six pairwise intersections are $\{2\},\{3\},\{1\},\{4\},\varnothing,\{5\}$, all of size at most one, so $H$ is linear.
- Simple: no edge properly contains another. The example has sizes $3,2,3,2$ and no containment, so it is simple.
- Uniform: all edges have the same size $k$, called $k$-uniform. The example has sizes $3,2,3,2$ and is not uniform.
- Complete $k$-uniform: take every $k$-subset of $V$. Thus $K_5^3$ has $\binom{5}{3}=10$ edges, and each vertex lies in $\binom{4}{2}=6$ of them, so every degree is $6$.

| Object | Ordinary graph | Hypergraph |
| --- | --- | --- |
| Edge shape | a pair | any nonempty subset |
| Column sum of incidence matrix | always $2$ | the edge size |
| Handshake identity | $\sum d(v)=2e$ | $\sum d(v)=\sum|e|$ |
| 2-section | the graph itself | may lose information |

## Three common misconceptions

> [!MYTH] A hyperedge, like an ordinary edge, always joins exactly two vertices.
> A hyperedge can be any subset. In the example $e_1$ joins three vertices at once, which is precisely what separates hypergraphs from graphs.

> [!MYTH] The incidence matrix is just the adjacency matrix under another name.
> They differ in size and meaning. The incidence matrix is $|V|\times|E|$ and records membership; the adjacency matrix is $|V|\times|V|$ and records adjacency between pairs of vertices.

> [!MYTH] If two hypergraphs have isomorphic 2-sections, they are isomorphic.
> The 2-section throws information away. $H_1=\{\{1,2,3\}\}$ and $H_2=\{\{1,2\},\{1,3\},\{2,3\}\}$ both have a triangle as 2-section, yet their edge sets are entirely different.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Let $V=\{1,2,3,4\}$ and $E=\{\{1,2\},\{2,3,4\}\}$. Write the incidence matrix and verify the handshake identity.
>
> > [!ANSWER] Show answer
> > The matrix is $4\times2$ with rows $(1,0)$, $(1,1)$, $(0,1)$, $(0,1)$. Row sums are $1,2,1,1$ and total $5$; column sums are $2,3$ and also total $5$.

> [!PRACTICE] 2 · Variation
> Let $V=\{1,2,3\}$ and $E=\{\{1,2\},\{2,3\}\}$. Find the dual hypergraph.
>
> > [!ANSWER] Show answer
> > The dual vertices are $e_1,e_2$, with $E_1=\{e_1\}$, $E_2=\{e_1,e_2\}$, $E_3=\{e_2\}$. Hence $H^{*}=\bigl(\{e_1,e_2\},\{\{e_1\},\{e_1,e_2\},\{e_2\}\}\bigr)$, containing two edges of size $1$ and one of size $2$.

> [!PRACTICE] 3 · Transfer
> What is the 2-section of the complete $3$-uniform hypergraph $K_5^3$, and how many edges does it have?
>
> > [!ANSWER] Show answer
> > Every pair of vertices lies in some triple, so the 2-section is the complete graph $K_5$ with $\binom{5}{2}=10$ edges.

## Formal statement

A hypergraph $H=(V,E)$ consists of a vertex set $V$ and an edge set $E$ whose members satisfy $\varnothing\neq e\subseteq V$. The degree of $v$ is $d(v)=|\{e\in E:v\in e\}|$. The incidence matrix $M\in\{0,1\}^{|V|\times|E|}$ is defined by $M_{ve}=1\iff v\in e$, so $\sum_{e}M_{ve}=d(v)$ and $\sum_{v}M_{ve}=|e|$, whence $\sum_{v}d(v)=\sum_{e}|e|$.

The dual hypergraph is $H^{*}=(E,\{E_v\}_{v\in V})$ with $E_v=\{e\in E:v\in e\}$; its incidence matrix is $M^{\mathsf{T}}$ and $(H^{*})^{*}=H$. The 2-section $[H]_2$ is the simple graph on $V$ with edge set $\{uv:\exists e\in E,\ \{u,v\}\subseteq e\}$. The hypergraph is linear if any two edges meet in at most one vertex, simple if no edge properly contains another, and $k$-uniform if every edge has size $k$. The complete $k$-uniform hypergraph $K_n^k$ has all $k$-subsets of $V$ as edges, with $\binom{n}{k}$ edges and every vertex of degree $\binom{n-1}{k-1}$.