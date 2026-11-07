---
slug: "euler-hamilton-graphs"
subject: "discrete-mathematics"
unit: "u17"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Eulerian and Hamiltonian Graphs"
subtitle: "Walk every edge, or visit every vertex"
minutes: 16
meta: ["16 min read","Requires graphs and connectivity","Mastery level"]
concepts: ["specialgraph", "graph"]
prereq: ["graph"]
related: ["specialgraph", "complexity"]
---

## What you will get

By the end of this lecture you can decide from vertex degrees alone whether a graph has an Euler circuit or an Euler trail, walk one out with Fleury's algorithm, reduce the Chinese postman problem to pairing odd vertices by shortest paths, and recognize Hamiltonian graphs with the Dirac and Ore conditions while knowing those conditions are only sufficient.

## Three lines back

- An Euler circuit uses every edge exactly once and returns to the start; it exists exactly when the graph is connected and every degree is even.
- With exactly two odd vertices an Euler trail exists, starting at one odd vertex and ending at the other.
- A Hamiltonian cycle visits every vertex exactly once; Dirac and Ore give sufficient conditions, not necessary ones.

## Euler circuits and trails

Let $G$ be connected. An Euler circuit is a closed trail using every edge exactly once, and a graph containing one is Eulerian. An Euler trail uses every edge exactly once without needing to return to the start.

The criterion is clean: $G$ has an Euler circuit if and only if every vertex has even degree; $G$ has an Euler trail if and only if the number of odd-degree vertices is $0$ or $2$. Necessity is immediate, since a circuit enters and leaves each vertex in pairs, while a trail leaves only its two endpoints unbalanced.

Sufficiency uses splicing: start anywhere and walk along unused edges. If you get stuck, you must be back at the start, since every other vertex has even degree and each entry needs an exit. If edges remain, connectivity gives a vertex of the closed walk with unused edges; walk another closed trail from it and splice, repeating until every edge is used.

Take two triangles $1-2-3-1$ and $3-4-5-3$ sharing vertex $3$.

| Vertex | Incident edges | Degree |
| --- | --- | --- |
| 1 | 12, 31 | 2 |
| 2 | 12, 23 | 2 |
| 3 | 23, 31, 34, 53 | 4 |
| 4 | 34, 45 | 2 |
| 5 | 45, 53 | 2 |

All five degrees are even, so an Euler circuit exists. One is $1\to2\to3\to4\to5\to3\to1$, using all six edges once. Delete edge $53$ and vertices $3$ and $5$ become odd; with exactly two odd vertices there is only an Euler trail, for instance $1\to2\to3\to4\to5$.

For directed graphs replace "even" by "in-degree equals out-degree": a weakly connected digraph has a directed Euler circuit exactly when every vertex is balanced. If one vertex $s$ has out-degree one larger than in-degree, one vertex $t$ has in-degree one larger, and all others are balanced, a directed Euler trail runs from $s$ to $t$.

## Fleury's algorithm and the Chinese postman problem

Fleury's algorithm is constructive: at each step choose an edge that is not a bridge of the remaining graph, unless no alternative exists. A bridge is an edge whose deletion disconnects the remaining graph, and taking one too early strands the untraversed edges on the far side.

On the double triangle, starting at $1$: take $12$ and $23$; at $3$ the remaining edges $31,34,53$ are all non-bridges, so take $34$; then $45$ and $53$ bring you back to $3$, and $31$ returns to $1$. This yields $1-2-3-4-5-3-1$.

The Chinese postman problem (CPP) asks for a closed walk covering every street at least once with minimum total length. With all degrees even, an Euler circuit is optimal. With two odd vertices, the shortest path between them must be repeated. With $2k$ odd vertices, find a minimum-weight perfect matching on them and duplicate the shortest path for each pair.

| Odd vertices | Treatment | Total cost |
| --- | --- | --- |
| 0 | take an Euler circuit | sum of edge weights |
| 2 | duplicate the shortest path between them | weight sum + distance |
| 2k | minimum-weight perfect matching of odd vertices | weight sum + matched distances |

Consider four vertices and five edges: $12=1$, $23=1$, $34=1$, $41=1$, $13=1$, total weight $5$. The degrees are $d(1)=3$, $d(2)=2$, $d(3)=3$, $d(4)=2$, so the odd vertices are $1$ and $3$. The shortest path $1\to3$ has length $1$; duplicating that edge gives cost $5+1=6$, and the multigraph is even throughout. One tour is $1-2-3-4-1-3-1$.

> [!NOTE]
> Existence and construction are separate jobs: the degree test answers "is there one" in one line, while Fleury tells you "how to walk it". Do not start tracing edges when only existence is asked.

## Hamiltonian graphs

A cycle passing through every vertex exactly once is a Hamiltonian cycle, and a graph containing one is Hamiltonian. Deciding whether one exists is NP-complete, so in practice we rely on sufficient conditions.

Dirac's theorem: if $n\ge3$ and the minimum degree satisfies $\delta(G)\ge n/2$, then $G$ is Hamiltonian. Ore's theorem is stronger: if every pair of non-adjacent vertices $u,v$ satisfies $d(u)+d(v)\ge n$, then $G$ is Hamiltonian. Since $\delta\ge n/2$ forces every degree sum to reach $n$, Dirac follows from Ore.

Both conditions are sufficient only. The table places familiar graphs side by side:

| Graph | Vertices | Min degree | Meets Dirac | Hamiltonian |
| --- | --- | --- | --- | --- |
| $C_5$ | 5 | 2 | no, $2<2.5$ | yes |
| Petersen graph | 10 | 3 | no, $3<5$ | no |
| $K_6$ | 6 | 5 | yes | yes |
| $K_{3,3}$ | 6 | 3 | yes, $3\ge3$ | yes |
| $K_{2,3}$ | 5 | 2 | no | no |

$C_5$ shows the condition is not necessary: a cycle is obviously Hamiltonian, yet $\delta=2<2.5$. The Petersen graph shows the bound is not vacuous: it is $3$-regular on $10$ vertices with $\delta=3<5$, and indeed it has no Hamiltonian cycle.

Bipartite graphs carry a simple structural obstruction. A Hamiltonian cycle alternates between the two sides, and returning to the start requires the same number of vertices from each side, so the sides must be equal in size. $K_{3,3}$ has the cycle $1-4-2-5-3-6-1$ and is Hamiltonian; $K_{2,3}$ has sides of sizes $2$ and $3$, so any alternation exhausts one side early and no Hamiltonian cycle exists.

## Three common misconceptions

> [!MYTH] If every vertex has even degree, an Euler circuit must exist.
> Connectivity is also required. Two disjoint triangles have six vertices of degree $2$, yet no closed trail uses all six edges.

> [!MYTH] An Euler trail implies an Euler circuit.
> With exactly two odd vertices only a trail exists. The path $1-2-3$ has endpoints of degree $1$ and can be traversed in one go, but it cannot return to its start.

> [!MYTH] Dirac's condition is necessary for a Hamiltonian graph.
> It is sufficient. $C_5$ is Hamiltonian but has minimum degree $2$, below $n/2=2.5$, so it fails Dirac.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Does $K_5$ have an Euler circuit, and how many edges does it have?
>
> > [!ANSWER] Show answer
> > Every vertex has degree $4$, which is even, and $K_5$ is connected, so an Euler circuit exists. The edge count is $\binom{5}{2}=10$.

> [!PRACTICE] 2 · Variation
> In the four-vertex postman example above, add the edge $24=2$. What is the new optimal cost?
>
> > [!ANSWER] Show answer
> > Now $d(1)=3$, $d(2)=3$, $d(3)=3$, $d(4)=3$, giving four odd vertices and total edge weight $5+2=7$. Distances are $d(1,2)=1$, $d(3,4)=1$, $d(1,3)=1$, $d(2,4)=2$, $d(1,4)=1$, $d(2,3)=1$. Pairings $(12,34)$ and $(14,23)$ both cost $2$, while $(13,24)$ costs $3$. The minimum is $2$, so the total is $7+2=9$.

> [!PRACTICE] 3 · Transfer
> Is $K_{2,4}$ Hamiltonian?
>
> > [!ANSWER] Show answer
> > No. A Hamiltonian cycle in a bipartite graph requires both sides to have equal size, but $K_{2,4}$ has sides of sizes $2$ and $4$, so no cycle can visit all six vertices exactly once.

## Formal statement

Let $G=(V,E)$ be a connected undirected graph. An Euler circuit is a closed trail using every edge exactly once; an Euler trail is an open trail using every edge exactly once. Then $G$ has an Euler circuit if and only if $d(v)$ is even for every $v\in V$, and $G$ has an Euler trail if and only if the number of odd-degree vertices is $0$ or $2$. In a digraph, a directed Euler circuit exists exactly when the digraph is weakly connected and $d^{+}(v)=d^{-}(v)$ for all $v$; if exactly one vertex $s$ has $d^{+}(s)-d^{-}(s)=1$, one vertex $t$ has $d^{-}(t)-d^{+}(t)=1$, and all others are balanced, a directed Euler trail runs from $s$ to $t$.

Fleury's algorithm always selects a non-bridge edge of the remaining graph, taking a bridge only when no alternative exists, and thereby constructs an Euler circuit or trail. For the Chinese postman problem with nonnegative weights: if all degrees are even, an Euler circuit is optimal; otherwise compute a minimum-weight perfect matching on the odd vertices, duplicate the shortest paths for the matched pairs, and the Euler circuit of the resulting multigraph is optimal.

A Hamiltonian cycle passes through every vertex exactly once. Dirac's theorem: for $n\ge3$, $\delta(G)\ge n/2$ implies $G$ is Hamiltonian. Ore's theorem: if $d(u)+d(v)\ge n$ for every non-adjacent pair $u,v$, then $G$ is Hamiltonian. Both are sufficient conditions, and deciding Hamiltonicity is NP-complete.