---
slug: "sequential-list"
subject: "data-structures"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "Sequential Lists"
subtitle: "Trading one contiguous block for random access"
minutes: 15
meta: ["15 min read","Requires Algorithm Analysis","Mastery level"]
concepts: ["list"]
prereq: ["complexity"]
related: ["dynstorage", "arraygen"]
---

## What you will get

By the end of this lecture you can compute the address of any element from the address formula, derive the average number of shifts for insertion and deletion, explain why a sequential list reads fast but edits slowly, and choose between fixed and growable capacity.

## Three lines back

- A sequential list stores elements in consecutive memory cells, so logical neighbours are physical neighbours.
- Random access costs $O(1)$; insertion and deletion must shift elements, about $n/2$ of them on average.
- A static array has a fixed capacity; a dynamic array doubles, and the amortised cost stays $O(1)$.

## Address formula and random access

A sequential list places $(a_1,a_2,\dots,a_n)$ in one contiguous block. Let the first element sit at $\mathrm{LOC}(a_1)$ and let each element occupy $L$ bytes. The address of element $i$ is

$$
\mathrm{LOC}(a_i)=\mathrm{LOC}(a_1)+(i-1)\times L
$$

With $\mathrm{LOC}(a_1)=1000$ and $L=4$, element $a_5$ lives at $1000+4\times4=1016$. The expression takes constant time: whether $i$ is 1 or $10^{6}$, one multiply and one add finish the job. This is the source of $O(1)$ access by position.

In C the array is bound to its length inside a struct:

```c
#define MAXSIZE 100
typedef struct {
    int data[MAXSIZE];
    int length;
} SqList;
```

The `length` field cannot be omitted, because capacity and length are different things. A list with capacity 100 may have any length from 0 to 100.

## The cost of insertion and deletion

Inserting at position $i$ pushes $a_i..a_n$ one slot right, moving $n-i+1$ elements. Inserting after the last element moves nothing; inserting at the head moves all $n$. With $n+1$ equally likely positions, the average is

$$
E_{\text{ins}}=\frac{1}{n+1}\sum_{i=1}^{n+1}(n-i+1)=\frac{1}{n+1}\cdot\frac{n(n+1)}{2}=\frac{n}{2}
$$

Deleting element $i$ pulls $a_{i+1}..a_n$ left, moving $n-i$ elements. Over $n$ equally likely positions,

$$
E_{\text{del}}=\frac{1}{n}\sum_{i=1}^{n}(n-i)=\frac{n-1}{2}
$$

At $n=10$ insertion moves 5 elements on average and deletion moves 4.5. Both are $O(n)$, which is the counterweight to $O(1)$ lookup.

| Operation | Best | Worst | Average | Moves elements |
| --- | --- | --- | --- | --- |
| Read by position | $O(1)$ | $O(1)$ | $O(1)$ | No |
| Search by value | $O(1)$ | $O(n)$ | $O(n)$ | No |
| Insert | $O(1)$ | $O(n)$ | $O(n)$ | Yes |
| Delete | $O(1)$ | $O(n)$ | $O(n)$ | Yes |

> [!NOTE]
> The denominator in each average is the number of legal positions. Insertion has $n+1$ of them, including the slot after the last element; deletion has only $n$. Mix the two up and $n/2$ silently turns into $(n-1)/2$.

## Dynamic allocation and its trade-offs

A static array hard-codes `MAXSIZE`: guess low and it overflows, guess high and memory is wasted. A dynamic sequential list asks for a larger block when full and moves everything across:

```c
typedef struct {
    int *data;
    int length, capacity;
} DynList;

int grow(DynList *L) {
    int *p = malloc(L->capacity * 2 * sizeof(int));
    if (!p) return 0;
    for (int i = 0; i < L->length; i++) p[i] = L->data[i];
    free(L->data);
    L->data = p;
    L->capacity *= 2;
    return 1;
}
```

With doubling, the total movement needed to append $n$ elements is $1+2+4+\dots+n<2n$, which is constant per append, so appending has $O(1)$ amortised cost. A single resize still costs $O(n)$, so latency-sensitive code should reserve capacity in advance.

The strengths of a sequential list are storage density 1, random access, and cache friendliness. The weaknesses are the need for one large contiguous block, shifting on every middle edit, and manual capacity management. Choose it when data is mostly read; choose a linked list when the middle changes constantly.

## Three misconceptions

> [!MYTH] A sequential list is just an array.
> The array is only the carrier. A sequential list is an abstract type made of the array plus a length, and the length field defines what counts as a legal index.

> [!MYTH] Insertion moves $n/2$ elements, so the complexity is $O(n/2)$.
> Asymptotic notation drops constant factors, so $O(n/2)=O(n)$. Writing $O(n/2)$ is not wrong, only non-standard.

> [!MYTH] Deleting from a sequential list only needs `length--`.
> That is true only when the last element goes. Deleting in the middle requires shifting the tail left, otherwise a hole appears in the list.

## Practice

> [!PRACTICE] 1 · Compute an address
> The first element sits at 2000 and each element is 8 bytes. Find the address of $a_7$. If the list has length 20, how many elements move when $a_3$ is deleted?
>
> > [!ANSWER] Show answer
> > $2000+(7-1)\times8=2048$. Deleting $a_3$ moves $20-3=17$ elements.

> [!PRACTICE] 2 · Derive an average
> If insertion happens only at the head or the tail with equal probability, what is the average number of moves?
>
> > [!ANSWER] Show answer
> > The head moves $n$ elements and the tail moves none, so the expectation is $n/2$. Changing the probability model changes the average but not the order.

> [!PRACTICE] 3 · Count resizes
> A dynamic list starts at capacity 1 and doubles. How many element moves occur while appending $n=8$ elements?
>
> > [!ANSWER] Show answer
> > Capacities 1→2→4→8 each trigger one move, so $1+2+4=7$ moves, below $2n=16$.

## Formal statement

A sequential list is the sequential storage representation of a linear list: its elements occupy consecutive memory cells, and the address of $a_i$ is $\mathrm{LOC}(a_1)+(i-1)L$, so access by position runs in $O(1)$. Inserting at position $i$ of a list of length $n$ moves $n-i+1$ elements, with average $n/2$ under a uniform choice of position; deleting element $i$ moves $n-i$ elements, with average $(n-1)/2$. Both operations are $O(n)$. Storage density is 1, at the price of requiring one contiguous allocation whose capacity is fixed or must be relocated when it grows.