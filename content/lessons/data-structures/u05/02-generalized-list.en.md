---
slug: "generalized-list"
subject: "data-structures"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "Generalized Lists"
subtitle: "A structure defined by its own recursion"
minutes: 14
meta: ["14 min read","Requires Arrays and Matrix Compression","Mastery level"]
concepts: ["arraygen", "tree"]
prereq: ["arraygen"]
related: ["tree", "list"]
---

## What you will get

By the end of this lecture you can tell an atom from a sublist, decompose any generalized list with head and tail, compute its length and depth, and read a node built from a tag plus a union.

## Three lines back

- A generalized list is a finite sequence whose elements are either atoms or generalized lists.
- The head is the first element; the tail is the list of all remaining elements, and it is always a list.
- Length counts top-level elements; depth counts the maximum nesting of parentheses.

## Head, tail, length, depth

Write a generalized list as $\mathrm{LS}=(a_1,a_2,\dots,a_n)$. If $a_i$ cannot be split further it is an atom; if $a_i$ is itself a generalized list it is a sublist. Conventionally atoms use lowercase letters and sublists uppercase.

Two primitives: `GetHead` returns the first element, `GetTail` returns a list of everything else. The tail is always a list, even when one element remains, because the remainder is wrapped in parentheses.

Let $A=()$, $B=(e)$, $C=(a,(b,c))$, $D=(A,B,C)$ and decompose each:

| Expression | Head | Tail | Length | Depth |
| --- | --- | --- | --- | --- |
| $A=()$ | undefined | undefined | 0 | 1 |
| $B=(e)$ | $e$ | $()$ | 1 | 1 |
| $C=(a,(b,c))$ | $a$ | $((b,c))$ | 2 | 2 |
| $D=(A,B,C)$ | $A$ | $(B,C)$ | 3 | 3 |

Length counts only top-level elements: $D$ has $A$, $B$, $C$, so length 3, and the contents of $C$ do not add to it. Depth counts parenthesis levels: one for $D$, one more inside $C$, one more inside $(b,c)$, giving 3. The empty list $A=()$ has length 0 but depth 1, because its pair of parentheses still occupies a level.

Decompose $D$ step by step: `GetHead(D)` is $A$ and `GetTail(D)` is $(B,C)$; applying `GetHead` again to that gives $B$. Head and tail together can take apart any generalized list completely, which is why recursion fits the structure so naturally.

## Storage layout

Because elements are not all of one type, each node carries a tag. The common encoding is a tag plus a union:

```c
typedef enum { ATOM, LIST } ElemTag;

typedef struct GLNode {
    ElemTag tag;
    union {
        char atom;            /* tag == ATOM */
        struct GLNode *hp;    /* tag == LIST, points to sublist */
    } ptr;
    struct GLNode *tp;        /* next node on the same level */
} GLNode, *GList;
```

`tag` separates the two node kinds: an atom node keeps its character in `atom`, a list node points to the first node of its sublist with `hp`. The `tp` field links elements on the same level. Every generalized list therefore becomes a `tp` chain, with sublists hanging off `hp` pointers.

For $D=(A,B,C)$ the top level is a three-node `tp` chain for $A$, $B$, $C$. All three nodes are `LIST`; each `hp` points into its own chain. $A$ is empty, so its `hp` is `NULL`. $C$'s chain holds an atom `a` followed by a `LIST` node whose `hp` reaches the chain of `b` and `c`.

| Node kind | tag | Active field | Meaning |
| --- | --- | --- | --- |
| Atom | `ATOM` | `atom` | one indivisible element |
| Sublist | `LIST` | `hp` | points to sublist head |
| Level successor | either | `tp` | next element on this level |

> [!NOTE]
> Some textbooks place both `hp` and `tp` in the union: list nodes use `hp`/`tp`, atom nodes use `atom`/`tp`. The semantics match; only the layout differs. When reading such code, check the tag branch before trusting a field.

## Recursive operations

Operations on generalized lists are almost all recursive, because the definition is. Depth is the canonical example:

```c
int GListDepth(GList L) {
    if (!L) return 1;                     /* empty list has depth 1 */
    if (L->tag == ATOM) return 0;         /* atom has depth 0 */
    int max = 0;
    for (GList p = L; p; p = p->tp) {
        int d = GListDepth(p->tag == ATOM ? NULL : p->ptr.hp);
        if (p->tag == ATOM) d = 0;
        if (d > max) max = d;
    }
    return max + 1;
}
```

On $D$: the top level holds three elements. $A$ returns 1, $B$ returns 0 because its only element is an atom, and $C$'s chain contains $(b,c)$ which returns 1, so $C$ returns $1+1=2$. The maximum is 2 and adding one gives 3, matching the hand count.

Copying is recursive too: copy an atom directly, and for a sublist copy `hp` first, then `tp`. Length needs no recursion at all — walk the `tp` chain — and costs $O(n)$ iteratively. Which operations recurse depends on whether they must descend into sublists.

## Three misconceptions

> [!MYTH] A generalized list is a two-dimensional array.
> A two-dimensional array has equal-length rows of uniform type. A generalized list allows sublists of any length, nesting to any depth, and atoms mixed in.

> [!MYTH] The tail is the last element.
> The tail is the list of everything except the head. The tail of $(a,b,c)$ is $(b,c)$, not $c$; the tail is always a list, while the head may be an atom.

> [!MYTH] Depth equals the length of the longest sublist.
> Depth counts nesting levels, not elements. $(a,b,c)$ has length 3 and depth 1; $(a,(b,c))$ has length 2 and depth 2.

## Practice

> [!PRACTICE] 1 · Length and depth
> What are the length and depth of $E=((a,b),c,(d,(e)))$?
>
> > [!ANSWER] Show answer
> > Three top-level elements give length 3; the deepest level is $(e)$, giving depth 3.

> [!PRACTICE] 2 · Head twice
> Apply `GetHead` twice to $E$. What comes out?
>
> > [!ANSWER] Show answer
> > `GetHead(E)` is $(a,b)$, and its head is $a$. Taking the tail instead would give $(b)$.

> [!PRACTICE] 3 · Classify
> What are the length and depth of $F=(())\)?
>
> > [!ANSWER] Show answer
> > The top level holds one element, the empty list, so length 1; two levels of parentheses give depth 2.

## Formal statement

A generalized list is a finite sequence $\mathrm{LS}=(a_1,a_2,\dots,a_n)$ with $n\ge 0$, where each $a_i$ is either an atom or a generalized list; $n=0$ gives the empty list. The head is $\mathrm{GetHead}(\mathrm{LS})=a_1$ and the tail is $\mathrm{GetTail}(\mathrm{LS})=(a_2,\dots,a_n)$, which is always a generalized list. Length is the number of top-level elements; depth is the maximum nesting of parentheses, with the empty list having length 0 and depth 1 and an atom having depth 0. Storage uses tagged nodes: an atom node stores its element in `atom`, a list node points to its sublist head with `hp`, and both link to the next element on the same level through `tp`, turning the nesting into a binary-linked form of level chains plus sublist pointers. Depth and copy follow the recursive definition, while length can be computed iteratively along the `tp` chain.