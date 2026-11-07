---
slug: "mst-shortest-path"
subject: "data-structures"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 7 · Data Structures · Mastery"
title: "Minimum Spanning Trees and Shortest Paths"
subtitle: "Two different greedy moves on a weighted graph"
minutes: 17
meta: ["17 min read","Requires graph traversal","Mastery level"]
concepts: ["graphds","tree","complexity"]
prereq: ["graphds"]
related: ["tree","complexity"]
---

## What you will get

You will be able to build a minimum spanning tree with both Prim and Kruskal, compute single-source distances with Dijkstra, produce an all-pairs matrix with Floyd, and state exactly what each algorithm is greedy about.

## Three lines back

- A spanning tree contains all $n$ vertices and exactly $n-1$ edges, is connected, and has no cycle.
- A minimum spanning tree minimizes the sum of its $n-1$ edge weights.
- A shortest path minimizes the weight between two chosen vertices; the two objectives are different.

## Weighted graphs and spanning trees

Let $G=(V,E)$ be a connected undirected graph with weight function $w:E\to\mathbb{R}$. If $T\subseteq E$ makes $(V,T)$ connected and acyclic, then $T$ is a **spanning tree**; the one minimizing $\sum_{e\in T}w(e)$ is a **minimum spanning tree** (MST).

The graph below has 6 vertices and 10 edges:

| Edge | Weight | Edge | Weight |
| --- | --- | --- | --- |
| 1–2 | 6 | 3–5 | 6 |
| 1–3 | 1 | 3–6 | 4 |
| 1–4 | 5 | 4–6 | 2 |
| 2–3 | 5 | 5–6 | 6 |
| 2–5 | 3 | 3–4 | 5 |

The two classic algorithms grow in opposite directions:

| Algorithm | Maintains | Step | Cost |
| --- | --- | --- | --- |
| Prim | A vertex set $S$ | Add the cheapest vertex outside $S$ | $O(n^2)$ with a matrix |
| Kruskal | A forest | Add the cheapest edge that closes no cycle | $O(e\log e)$, dominated by sorting |

## Prim and Kruskal, step by step

Prim starts at vertex 1 and always takes the cheapest edge with one end inside the tree:

| Step | Vertex added | Edge chosen | Weight | Total |
| --- | --- | --- | --- | --- |
| 1 | 3 | 1–3 | 1 | 1 |
| 2 | 6 | 3–6 | 4 | 5 |
| 3 | 4 | 4–6 | 2 | 7 |
| 4 | 2 | 2–3 | 5 | 12 |
| 5 | 5 | 2–5 | 3 | 15 |

Kruskal sorts all 10 edges by weight: $1,2,3,4,5,5,5,6,6,6$. It scans them in order and uses a union-find structure to reject edges whose endpoints already share a component:

| Order | Edge | Weight | Decision |
| --- | --- | --- | --- |
| 1 | 1–3 | 1 | Accept |
| 2 | 4–6 | 2 | Accept |
| 3 | 2–5 | 3 | Accept |
| 4 | 3–6 | 4 | Accept |
| 5 | 2–3 | 5 | Accept, five edges reached |
| 6 | 3–4 | 5 | Reject, it closes $3\to6\to4\to3$ |
| 7 | 1–4 | 5 | Reject, same cycle |

Five edges with total weight $1+2+3+4+5=15$, matching Prim. When all weights are distinct the MST is unique; with ties, different algorithms may pick different edge sets, but the total weight is always the same.

## Shortest paths: Dijkstra and Floyd

Dijkstra keeps a distance array. Each round it removes the unsettled vertex with the smallest distance, adds it to $S$, and relaxes its neighbours:

$$
\mathrm{dist}[v]\leftarrow\min\bigl(\mathrm{dist}[v],\ \mathrm{dist}[u]+w(u,v)\bigr)
$$

With vertex 1 as the source:

| Step | Settled | dist[2] | dist[3] | dist[4] | dist[5] | dist[6] |
| --- | --- | --- | --- | --- | --- | --- |
| Start | 1 | 6 | 1 | 5 | $\infty$ | $\infty$ |
| 1 | 3 | 6 | 1 | 5 | 7 | 5 |
| 2 | 4 | 6 | 1 | 5 | 7 | 5 |
| 3 | 6 | 6 | 1 | 5 | 7 | 5 |
| 4 | 2 | 6 | 1 | 5 | 7 | 5 |
| 5 | 5 | 6 | 1 | 5 | 7 | 5 |

At step 2 both 4 and 6 have distance 5; the smaller index is settled first, and relaxing from 4 changes nothing, so the tie does not affect the answer. The final array is $[0,6,1,5,7,5]$. The shortest route from 1 to 5 is $1\to3\to5$ with length $1+6=7$.

Nonnegative weights are essential: with a negative edge, a vertex already declared final could later be improved.

A single-source algorithm fills one row. When every pair distance is needed, Floyd computes the whole matrix at once with dynamic programming. Let $D^{(k)}[i][j]$ be the shortest length from $i$ to $j$ using only vertices $1..k$ as intermediate points. Then

$$
D^{(k)}[i][j]=\min\Bigl(D^{(k-1)}[i][j],\ D^{(k-1)}[i][k]+D^{(k-1)}[k][j]\Bigr)
$$

Three nested loops give $O(n^3)$ time; for $n=6$ the innermost body runs $6^3=216$ times. The final matrix is

$$
D=\begin{pmatrix}
0&6&1&5&7&5\\
6&0&5&10&3&9\\
1&5&0&5&6&4\\
5&10&5&0&8&2\\
7&3&6&8&0&6\\
5&9&4&2&6&0
\end{pmatrix}
$$

For example $D[2][4]=10$. The route $2\to3\to6\to4$ costs $5+4+2=11$ and is not optimal; $2\to3\to4$ costs $5+5=10$, which is the entry in the matrix. The matrix is symmetric because the input graph is undirected; for a directed graph $D[i][j]$ and $D[j][i]$ generally differ.

## Three common misconceptions

> [!MYTH] Prim and Kruskal always return the same tree.
> They do only when all weights are distinct. With ties the chosen edges can differ, though the total weight stays minimal.

> [!MYTH] Dijkstra accepts negative edges.
> It does not. Its correctness rests on a settled distance never shrinking, which a negative edge can violate.

> [!MYTH] The three Floyd loops can be permuted freely.
> The intermediate vertex $k$ must be the outermost loop. Moving $k$ inside allows only paths that reuse one intermediate point and yields wrong distances.

## Practice

> [!PRACTICE] 1 · Detect a cycle
> Why does Kruskal reject edge 3–4 of weight 5 at position 6?
>
> > [!ANSWER] Show answer
> > Edges 1–3, 4–6 and 3–6 are already chosen, so 3 and 4 lie in one component; adding 3–4 creates the cycle $3\to6\to4\to3$.

> [!PRACTICE] 2 · Read a distance
> Using the matrix above, give the shortest route and length from vertex 2 to vertex 5.
>
> > [!ANSWER] Show answer
> > $D[2][5]=3$, realized by the direct edge $2\to5$. The detour $2\to3\to5$ costs $5+6=11$.

> [!PRACTICE] 3 · Change the source
> Run Dijkstra from vertex 4 and write the final distance array.
>
> > [!ANSWER] Show answer
> > `dist` = [5, 10, 5, 0, 8, 2]. Vertex 6 is reached directly in 2, vertex 3 in 5, vertex 1 in 5, vertex 5 via 6 in 8, and vertex 2 via 3 in 10.

## Formal statement

**Cut property.** For any partition of $V$ into two parts, a minimum-weight edge crossing the cut belongs to some MST. Prim's $S$ and $V\setminus S$ form such a cut, so every chosen edge is safe; Kruskal adds an edge only when it joins two components, which also satisfies the property.

Dijkstra's invariant: when the minimum-distance vertex $u$ is removed, `dist[u]` is final. Otherwise let $(x,y)$ be the first edge of the true shortest path leaving $S$; then $\mathrm{dist}[x]+w(x,y)<\mathrm{dist}[u]$, contradicting the minimality of $u$ (this is where $w\ge0$ is used). Floyd's invariant: after round $k$, $D[i][j]$ is the shortest length whose intermediate vertices lie in $\{1,\dots,k\}$, which follows by induction on $k$.