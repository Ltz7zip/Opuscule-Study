---
slug: "trees-spanning-trees"
subject: "discrete-mathematics"
unit: "u17"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Trees, Spanning Trees, and Minimum Spanning Trees"
subtitle: "Connected and acyclic, with exactly enough edges"
minutes: 16
meta: ["16 min read","Requires graphs and connectivity","Mastery level"]
concepts: ["specialgraph", "graph"]
prereq: ["graph"]
related: ["specialgraph", "complexity"]
---

## What you will get

By the end of this lecture you can test whether a graph is a tree using any of five equivalent descriptions, count the spanning trees of a complete graph, compute a minimum spanning tree of a weighted graph with both Kruskal and Prim, and explain why the greedy choice is safe here.

## Three lines back

- A tree is a connected acyclic undirected graph; $n$ vertices always come with $n-1$ edges.
- Any two vertices are joined by exactly one path, and adding any edge creates exactly one cycle.
- A spanning tree of a connected graph is a minimal connected spanning subgraph; a minimum spanning tree has the smallest total weight.

## Five ways to say "tree"

Let $G$ be an undirected graph on $n$ vertices. Each of the following is equivalent to "$G$ is a tree":

1. $G$ is connected and acyclic;
2. $G$ is acyclic with $n-1$ edges;
3. $G$ is connected with $n-1$ edges;
4. every two vertices are joined by a unique path;
5. $G$ is connected, and deleting any edge disconnects it (minimally connected).

The skeleton of the proof is the relation between edge count and cycles. If a graph is acyclic with $c$ components, then $m=n-c$, because each component is a smaller tree and the counts add. Acyclic plus connected therefore forces $c=1$ and $m=n-1$.

Unique paths are the most frequently used form. Two distinct paths between the same pair would have a union containing a cycle, contradicting acyclicity; a disconnected pair contradicts connectivity. Conversely, unique paths give connectivity, while any cycle would offer two routes between its endpoints.

A leaf is a vertex of degree $1$. When $n\ge2$, a tree has at least two leaves. The degree sum is $2(n-1)=2n-2$; with at most one leaf the other $n-1$ vertices each contribute at least $2$, so the sum would be at least $2(n-1)+1=2n-1$, which exceeds $2n-2$. This fact drives many induction proofs: remove a leaf and what remains is still a tree.

| Description | A tree on $n=6$ | Holds? |
| --- | --- | --- |
| connected and acyclic | path $1-2-3-4-5-6$ | yes |
| acyclic with $5$ edges | same path | yes |
| $5$ edges but disconnected | triangle plus an isolated edge | no |
| connected with $6$ edges | triangle with a tail | no, contains a cycle |

## Spanning trees and Cayley's formula

A spanning tree of a connected graph $G$ is a spanning subgraph $T$ that is a tree. Every connected graph has one: delete edges on cycles one at a time until no cycle remains; the result stays connected and covers all vertices.

The number of spanning trees of the complete graph $K_n$ is given by Cayley's formula:

$$
\tau(K_n)=n^{n-2}
$$

$K_3$ has $3^{1}=3$ spanning trees, one for each deleted edge. $K_4$ has $4^{2}=16$. The count also describes labelled trees: there are $n^{n-2}$ trees on $n$ labelled vertices, a fact also proved through Prüfer sequences, which encode each tree by a sequence of length $n-2$ with entries in $1,\dots,n$.

For a weighted graph the goal is a spanning tree of least total weight, a minimum spanning tree (MST). Kruskal's algorithm sorts edges by weight and tries them in order, keeping an edge unless it closes a cycle, until $n-1$ edges are chosen. Correctness rests on the cut property: for any partition of the vertices into two parts, a minimum-weight edge crossing that cut belongs to some MST.

## Kruskal and Prim: two greedy strategies

Take six vertices and ten weighted edges: $12=6$, $13=1$, $14=5$, $23=5$, $25=3$, $34=5$, $35=6$, $36=4$, $46=2$, $56=6$.

Processing in increasing weight:

| Order | Edge | Weight | Action | Total |
| --- | --- | --- | --- | --- |
| 1 | $13$ | 1 | keep | 1 |
| 2 | $46$ | 2 | keep | 3 |
| 3 | $25$ | 3 | keep | 6 |
| 4 | $36$ | 4 | keep | 10 |
| 5 | $23$ | 5 | keep | 15 |
| 6 | $14$ | 5 | discard (cycle) | 15 |

The first five edges already connect all six vertices, so the MST weight is $1+2+3+4+5=15$. The sixth, $14$, would close the cycle $1-3-6-4$ and is discarded.

Prim's algorithm starts from any vertex and repeatedly adds the cheapest edge joining the current tree to the outside. Starting at vertex $1$: take $13=1$; from $\{1,3\}$ the cheapest is $36=4$; from $\{1,3,6\}$ take $46=2$; then take $25=3$, pulling in the pair $\{2,5\}$; finally take $23=5$. The total is again $15$.

Both algorithms are correct; they differ in data structures and in when they shine:

| Algorithm | Strategy | Typical implementation | Complexity |
| --- | --- | --- | --- |
| Kruskal | global edge order, cycle test | disjoint-set forest | $O(m\log m)$ |
| Prim | expand from one vertex | binary heap | $O((n+m)\log n)$ |

Sparse graphs favour Kruskal because sorting is cheap; dense graphs with $m\approx n^2$ favour Prim with an adjacency matrix at $O(n^2)$. When weights tie, the two may output different edge sets, but the total weight is always the same, since an MST's weight is unique.

> [!NOTE]
> Greedy works because of the complementary cut and cycle properties: a lightest edge across any cut is safe, and a heaviest edge on any cycle may be deleted. Understanding these two facts matters more than memorizing the steps.

## Three common misconceptions

> [!MYTH] Any graph with $n$ vertices and $n-1$ edges is a tree.
> It must also be connected. A triangle plus an isolated edge has $4$ vertices and $3$ edges, yet contains a cycle and is disconnected, so it is not a tree.

> [!MYTH] A connected graph has a unique spanning tree.
> Usually not. $K_4$ has $4^2=16$ spanning trees. Only when the graph is already a tree is the spanning tree unique, namely the graph itself.

> [!MYTH] Prim and Kruskal always produce exactly the same edge set.
> They produce the same total weight, but with tied weights the selection order differs and the edge sets can differ. In the example above both $23$ and $14$ weigh $5$, and which one survives depends on the algorithm.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> A tree has $10$ vertices. How many edges does it have, and how many cycles appear if an edge joining two non-adjacent vertices is added?
>
> > [!ANSWER] Show answer
> > It has $n-1=9$ edges. The two vertices already have a unique path, so the new edge closes exactly one cycle.

> [!PRACTICE] 2 · Variation
> How many spanning trees does the complete graph $K_5$ have?
>
> > [!ANSWER] Show answer
> > By Cayley's formula, $5^{5-2}=5^3=125$.

> [!PRACTICE] 3 · Transfer
> In the six-vertex weighted graph above, suppose the weight of $46$ changes from $2$ to $7$. What is the new MST weight?
>
> > [!ANSWER] Show answer
> > The new order begins $13=1$, $25=3$, $36=4$, $23=5$, $14=5$, $34=5$, and $46=7$ comes later. Taking $13,25,36,23$ leaves vertex $4$ isolated, and the cheapest link is $14=5$ or $34=5$. The total is $1+3+4+5+5=18$.

## Formal statement

Let $G=(V,E)$ be an undirected graph with $|V|=n$. Then $G$ is a tree if it is connected and contains no cycle. Equivalently: $G$ is acyclic with $|E|=n-1$; $G$ is connected with $|E|=n-1$; every pair of vertices is joined by exactly one path; $G$ is connected and deleting any edge disconnects it. For $n\ge2$ a tree has at least two leaves.

A spanning tree of a connected graph $G$ is a tree $T$ with $V(T)=V(G)$ and $E(T)\subseteq E(G)$. Cayley's formula states $\tau(K_n)=n^{n-2}$.

For a connected weighted graph, a minimum spanning tree is a spanning tree of least total weight. Kruskal's algorithm scans edges in nondecreasing weight, uses a disjoint-set structure to test connectivity, and adds an edge only when it does not close a cycle, producing $n-1$ edges; the cut property guarantees correctness. Prim's algorithm maintains a vertex set $S$ and repeatedly adds a minimum-weight edge between $S$ and $V\setminus S$. Both return a spanning tree of minimum total weight, and that total weight is unique.