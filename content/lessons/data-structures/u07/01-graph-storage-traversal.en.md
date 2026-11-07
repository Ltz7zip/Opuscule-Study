---
slug: "graph-storage-traversal"
subject: "data-structures"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 7 · Data Structures · Mastery"
title: "Graph Storage and Traversal"
subtitle: "One graph, four layouts, two walks"
minutes: 16
meta: ["16 min read","Requires tree traversal","Mastery level"]
concepts: ["graphds","complexity"]
prereq: ["tree"]
related: ["complexity","graphds"]
---

## What you will get

You will be able to choose a graph representation from the vertex count $n$ and edge count $e$, write down DFS and BFS orders for both an adjacency matrix and an adjacency list, and account for every term in their complexity.

## Three lines back

- A graph is a vertex set $V$ together with an edge set $E$, written $G=(V,E)$.
- A storage layout answers two questions: where a vertex lives, and how its edges are found.
- A traversal answers one question: in what order are all reachable vertices visited exactly once.

## Four storage layouts

An **adjacency matrix** uses an $n\times n$ array $A$, with $A[i][j]=1$ when $(i,j)\in E$. Weighted graphs store the weight instead, and a missing edge is $\infty$. For an undirected graph the matrix is symmetric, and the number of nonzeros in row $i$ is the degree of vertex $i$. Space is always $O(n^2)$, independent of the number of edges.

An **adjacency list** gives every vertex a list of its edges. In an undirected graph each edge appears twice, so space is $O(n+2e)$; a directed graph stores outgoing edges only, using $O(n+e)$, and computing in-degrees requires a separate **reverse adjacency list**.

| Layout | Space | Scan all neighbours | Best for |
| --- | --- | --- | --- |
| Adjacency matrix | $O(n^2)$ | $O(n)$, one full row | Dense graphs, edge tests |
| Adjacency list | $O(n+e)$ | $O(\deg v)$ | Sparse graphs, traversal |
| Orthogonal list | $O(n+e)$ | In-edges and out-edges | Directed graphs |
| Adjacency multilist | $O(n+e)$ | One node per edge | Undirected edge deletion |

An **orthogonal list** turns each arc into one node that sits simultaneously on the out-chain of its tail and the in-chain of its head, so neither out-degree nor in-degree needs a full scan. An **adjacency multilist** stores one node per undirected edge, holding endpoints `ivex`, `jvex` and two chain pointers; deleting an edge edits pointers instead of removing two separate nodes.

## DFS and BFS

Depth-first search follows one path to its end, then backs up to the last branch. The recursive form needs only a visited array:

```c
void DFS(Graph G, int v) {
    visited[v] = TRUE; visit(v);
    for (int w = FirstAdjVex(G, v); w >= 0; w = NextAdjVex(G, v, w))
        if (!visited[w]) DFS(G, w);
}
```

Breadth-first search queues the neighbours of the current layer, expanding vertices in arrival order:

```c
void BFS(Graph G, int v) {
    InitQueue(&Q); visited[v] = TRUE; visit(v); EnQueue(&Q, v);
    while (!QueueEmpty(Q)) {
        DeQueue(&Q, &u);
        for (int w = FirstAdjVex(G, u); w >= 0; w = NextAdjVex(G, u, w))
            if (!visited[w]) { visited[w] = TRUE; visit(w); EnQueue(&Q, w); }
    }
}
```

| Layout | DFS | BFS |
| --- | --- | --- |
| Adjacency matrix | $O(n^2)$ | $O(n^2)$ |
| Adjacency list | $O(n+e)$ | $O(n+e)$ |

The matrix version scans one full row per vertex, hence $O(n^2)$. The list version scans each edge list once; in an undirected graph every edge is seen from both endpoints, giving $O(n+2e)=O(n+e)$. Neither traversal promises a unique order: the order is fixed by the enumeration order of neighbours.

## Walking a six-vertex graph

Take the undirected graph on vertices $A$ through $F$ with edges $AB,AC,BD,CD,CE,DF,EF$. Sort each adjacency list alphabetically:

| Vertex | Neighbours |
| --- | --- |
| A | B, C |
| B | A, D |
| C | A, D, E |
| D | B, C, F |
| E | C, F |
| F | D, E |

DFS from $A$: visit $A$, then $B$, then $D$, then $C$, then $E$, then $F$. At $F$ both neighbours $D$ and $E$ are already marked, so the recursion unwinds all the way back without finding anything new.

BFS from $A$: visit $A$ and enqueue $B,C$; pop $B$ and enqueue $D$; pop $C$ and enqueue $E$; pop $D$ and enqueue $F$. The order is $A,B,C,D,E,F$.

Here $n=6$ and $e=7$. The adjacency list holds $6+2\times7=20$ nodes, and one traversal costs $O(6+7)$. The adjacency matrix would reserve $6\times6=36$ cells even though only $2\times7=14$ are nonzero, and a traversal would inspect all 36.

## Three common misconceptions

> [!MYTH] An adjacency matrix is always faster.
> Testing $(u,v)$ is $O(1)$, but traversal scans whole rows. On a sparse graph, $O(n^2)$ is far worse than $O(n+e)$.

> [!MYTH] The DFS order is unique.
> The order follows the neighbour enumeration. Reverse $A$'s list to C, B and DFS becomes $A\to C\to B\to D\to F\to E$.

> [!MYTH] A directed adjacency list gives fast in-degree and out-degree together.
> It stores outgoing edges only: out-degree is $O(\deg^+v)$ while in-degree needs a full scan $O(e)$. That is why reverse lists and orthogonal lists exist.

## Practice

> [!PRACTICE] 1 · Choose a layout
> An undirected graph has 1000 vertices and 1200 edges. How many cells does each layout need, ignoring pointer overhead?
>
> > [!ANSWER] Show answer
> > Matrix: $1000^2=10^6$ cells. List: $1000+2\times1200=3400$ nodes. Use the list for a sparse graph.

> [!PRACTICE] 2 · Write the orders
> In the graph above, run DFS and BFS from $C$ with alphabetical neighbour order.
>
> > [!ANSWER] Show answer
> > DFS: $C\to A\to B\to D\to F\to E$. BFS: $C\to A\to D\to E\to B\to F$.

> [!PRACTICE] 3 · Connectivity
> An undirected graph has 8 vertices and 6 edges. Must a DFS from any vertex reach all of them?
>
> > [!ANSWER] Show answer
> > No. A connected graph on 8 vertices needs at least 7 edges, so 6 edges force an isolated vertex or several components.

## Formal statement

Let $G=(V,E)$ with $|V|=n$ and $|E|=e$. The DFS invariant is: when `DFS(v)` is entered, $v$ is unmarked; when it returns, $v$ and every reachable unmarked vertex have been marked. Each recursive call marks one new vertex, so there are exactly $n$ calls, and with an adjacency list each edge is inspected twice, giving $T(n,e)=O(n+e)$. BFS uses a queue that holds at most one layer of vertices at a time, so its space is $O(n)$; its correctness follows from the invariant that vertices leave the queue in nondecreasing distance from the source.