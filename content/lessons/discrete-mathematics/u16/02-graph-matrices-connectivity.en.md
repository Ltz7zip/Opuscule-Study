---
slug: "graph-matrices-connectivity"
subject: "discrete-mathematics"
unit: "u16"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Adjacency Matrices, Incidence Matrices, and Connectivity"
subtitle: "Spread a graph into a table"
minutes: 16
meta: ["16 min read","Requires graphs and matrices","Mastery level"]
concepts: ["graph", "matrix"]
prereq: ["graph", "matrix"]
related: ["specialgraph", "relation"]
---

## What you will get

By the end of this lecture you can write a graph as an adjacency matrix and as an incidence matrix, read the number of walks of a fixed length from powers of the matrix, explain why the number of connected components equals a nullity, and see why these matrices are more useful than a drawing inside algorithms.

## Three lines back

- An adjacency matrix records who is adjacent to whom; once the vertices are numbered, the matrix is unique.
- The $(i,j)$ entry of the $k$-th power counts walks of length $k$ from $i$ to $j$.
- An incidence matrix records which edges touch which vertices; every column has exactly two $1$s and each row sum equals a degree.

## Adjacency matrices: adjacency written as a table

Let the graph have $n$ vertices labelled $v_1,\dots,v_n$. The adjacency matrix $A=(a_{ij})$ is the $n\times n$ $0$-$1$ matrix

$$
a_{ij}=
\begin{cases}
1, & \{v_i,v_j\}\in E\\
0, & \text{otherwise}
\end{cases}
$$

For an undirected graph $A$ is symmetric, and each row sum equals the degree of the corresponding vertex. A multigraph generalizes the entries to multiplicities. A directed graph loses symmetry: row sums become out-degrees and column sums in-degrees.

Take the four-vertex path $P_4$ with edges $\{1,2\},\{2,3\},\{3,4\}$:

$$
A=\begin{pmatrix}
0&1&0&0\\
1&0&1&0\\
0&1&0&1\\
0&0&1&0
\end{pmatrix}
$$

The row sums are $1,2,2,1$, exactly the degrees. Its square is

$$
A^2=\begin{pmatrix}
1&0&1&0\\
0&2&0&1\\
1&0&2&0\\
0&1&0&1
\end{pmatrix}
$$

The $(2,2)$ entry is $2$, matching the two closed walks of length $2$: $2\to1\to2$ and $2\to3\to2$. The $(1,3)$ entry is $1$, matching the unique walk $1\to2\to3$. This is matrix multiplication at work: $a^{(2)}_{ij}=\sum_k a_{ik}a_{kj}$ counts only routes that pass through some intermediate vertex $k$.

Two useful criteria follow. If some power of $A$ has an all-zero row, that vertex cannot reach anything. If the boolean sums $A,A^2,\dots,A^{n-1}$ combine into an all-$1$ matrix, the graph is connected.

## Incidence matrices: vertices against edges

In the incidence matrix $B$ the rows are vertices and the columns are edges. In an undirected graph, $b_{ij}=1$ when edge $e_j$ is incident with $v_i$, and $0$ otherwise. Every edge has two endpoints, so every column contains exactly two $1$s:

$$
\sum_{j} b_{ij}=\deg(v_i),\qquad
\sum_{i} b_{ij}=2
$$

Again with $P_4$, ordering the columns as $e_1=\{1,2\}$, $e_2=\{2,3\}$, $e_3=\{3,4\}$:

| | $e_1$ | $e_2$ | $e_3$ | row sum |
| --- | --- | --- | --- | --- |
| $v_1$ | 1 | 0 | 0 | 1 |
| $v_2$ | 1 | 1 | 0 | 2 |
| $v_3$ | 0 | 1 | 1 | 2 |
| $v_4$ | 0 | 0 | 1 | 1 |
| column sum | 2 | 2 | 2 | |

The most useful property appears over the field $\mathbb{F}_2$: replace addition by addition modulo $2$. For a connected graph the incidence matrix has rank $n-1$. The matrix of $P_4$ has $4$ rows and $3$ columns, and its rank is exactly $3$. The reason is transparent: adding all rows gives a column of two $1$s, which is $0$ in $\mathbb{F}_2$, so the rows are dependent; deleting any one row leaves independent rows. The null space is therefore one-dimensional, matching one connected component.

The statement generalizes: if a graph has $c$ components, then

$$
\operatorname{rank}_{\mathbb{F}_2}(B)=n-c
$$

Counting components thus becomes a rank computation.

## Connectivity: paths, components, and distance

Two vertices are connected when a path joins them. Connectivity is an equivalence relation on the vertex set, and its classes are the connected components. A graph is connected exactly when it has one component.

For a disconnected graph, the adjacency matrix can be permuted into block diagonal form, one block per component with zeros between blocks. This also explains why the component count equals the number of blocks after a suitable permutation.

The length of a shortest path between two vertices is their distance $d(u,v)$, with $d(u,v)=\infty$ when no path exists. The largest distance over all pairs is the diameter. For $P_4$, $d(1,4)=3$, so the diameter is $3$.

In directed graphs two notions must be separated: weakly connected means connected after ignoring directions, strongly connected means every vertex reaches every other. The standard strong-connectivity test runs depth-first search twice, once on the graph and once on the reversed graph; both search trees must cover all vertices.

| Notion | Test | Cost |
| --- | --- | --- |
| undirected connectivity | one BFS/DFS covering all vertices | $O(n+m)$ |
| connected components | restart BFS/DFS at each unvisited vertex | $O(n+m)$ |
| strong connectivity | one DFS on the graph, one on its reverse | $O(n+m)$ |
| all-pairs distance | one BFS from every vertex | $O(n(n+m))$ |

BFS is also the standard shortest-path tool for unweighted graphs: it expands in layers, so the first time a vertex is reached, the number of edges used is the shortest distance. Weighted graphs require Dijkstra's algorithm instead.

## Three common misconceptions

> [!MYTH] The row sums of the adjacency matrix give the number of edges.
> A row sum is the degree of that vertex. Only the sum of all row sums is twice the edge count, which is the handshake lemma written in matrix form.

> [!MYTH] Many zero entries mean the graph is sparse, so the matrix is the most space-efficient representation.
> The opposite is true. Storing $n$ vertices in a matrix takes $n^2$ cells, while adjacency lists need $O(n+m)$ for sparse graphs. The matrix earns its place through multiplication and spectral analysis, not through memory savings.

> [!MYTH] The rank of the incidence matrix always equals the number of vertices.
> For an undirected connected graph the rank over $\mathbb{F}_2$ is $n-1$, because the rows sum to the zero vector. Only with signed directed incidence can other values appear.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For the $P_4$ above, find the $(1,4)$ entry of $A^3$.
>
> > [!ANSWER] Show answer
> > A walk of length $3$ must use all three edges, and the only route from $1$ to $4$ is $1\to2\to3\to4$, so the entry is $1$.

> [!PRACTICE] 2 · Variation
> What is the adjacency matrix of the triangle $K_3$, and what are the diagonal entries of its cube?
>
> > [!ANSWER] Show answer
> > $A$ is the $3\times3$ matrix with zeros on the diagonal and ones elsewhere. A closed walk of length $3$ goes once around the triangle, with two directions from each vertex, so every diagonal entry of $A^3$ is $2$.

> [!PRACTICE] 3 · Transfer
> A graph has $n=6$ vertices and $c=2$ connected components. What is the rank of its incidence matrix over $\mathbb{F}_2$?
>
> > [!ANSWER] Show answer
> > The rank is $n-c=4$. Each component contributes one fewer independent row than its vertex count, giving $4$ in total.

## Formal statement

Let $G=(V,E)$ be an undirected graph with $|V|=n$ and $|E|=m$. The adjacency matrix $A\in\{0,1\}^{n\times n}$ is defined by $a_{ij}=1\iff\{v_i,v_j\}\in E$. Then $A$ is symmetric, $\sum_j a_{ij}=\deg(v_i)$, and

$$
(A^k)_{ij}=\#\{\text{walks of length } k \text{ from } v_i \text{ to } v_j\}
$$

which follows by induction from $A^k=A^{k-1}A$ and the definition of matrix multiplication.

The incidence matrix $B\in\{0,1\}^{n\times m}$ is defined by $b_{ij}=1\iff v_i$ is incident with $e_j$. Every column sums to $2$ and row $i$ sums to $\deg(v_i)$. Over $\mathbb{F}_2$, if $G$ has $c$ connected components, then

$$
\operatorname{rank}_{\mathbb{F}_2}(B)=n-c
$$

Connectivity thus reduces to a linear-algebra question: $G$ is connected if and only if $\operatorname{rank}_{\mathbb{F}_2}(B)=n-1$.