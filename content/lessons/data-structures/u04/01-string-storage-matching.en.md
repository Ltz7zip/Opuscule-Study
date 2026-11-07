---
slug: "string-storage-matching"
subject: "data-structures"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "String Storage and Naive Matching"
subtitle: "Where the sixteen comparisons come from"
minutes: 14
meta: ["14 min read","Requires Linked Lists","Mastery level"]
concepts: ["stringds"]
prereq: ["list"]
related: ["complexity", "arraygen"]
---

## What you will get

By the end of this lecture you can state how a string differs from a linear list, choose among fixed-length, heap-allocated, and block-linked storage, count the comparisons of naive matching by hand, and name the inputs on which it degrades to its worst case.

## Three lines back

- A string is a linear list whose elements are characters, but its operations act on substrings rather than single positions.
- Fixed-length storage is simple but truncates; heap allocation sizes on demand; block-linked storage suits very long strings.
- Naive matching aligns the pattern at each position and backtracks on mismatch; the worst case is $(n-m+1)\times m$ comparisons.

## Three ways to store a string

A string has the same logical structure as a linear list; the difference is granularity. Lists are often addressed element by element, while strings are concatenated, sliced, and searched as substrings. Three representations dominate.

Fixed-length sequential storage uses a character array with a separate length field instead of a terminator:

```c
#define MAXLEN 255
typedef struct {
    char ch[MAXLEN];
    int length;
} SString;
```

The weakness is baked into `MAXLEN`. Anything longer is truncated, and the truncation usually fails silently: the result simply comes back with a few characters missing.

Heap allocation requests exactly the space needed at run time:

```c
typedef struct {
    char *ch;
    int length;
} HString;
```

Block-linked storage splits the string into fixed-size blocks joined by pointers. It handles strings too large for one contiguous allocation, at the cost of gathering several blocks whenever a substring crosses a boundary.

| Representation | Space | Substring | Typical use |
| --- | --- | --- | --- |
| Fixed-length | static | $O(m)$ | short strings of known bound |
| Heap allocated | on demand | $O(m)$ | general case, variable length |
| Block linked | per block | $O(m)$, larger constant | huge strings, fragmented memory |

## Naive pattern matching

The problem: find the first occurrence of pattern $T$ of length $m$ inside text $S$ of length $n$. The naive algorithm aligns the first character of $T$ with the first of $S$, compares character by character, and on mismatch shifts $T$ one place right and restarts from the next character of $S$.

```c
int Index(SString S, SString T) {
    int i = 1, j = 1;
    while (i <= S.length && j <= T.length) {
        if (S.ch[i-1] == T.ch[j-1]) { i++; j++; }
        else { i = i - j + 2; j = 1; }   /* restart one past this alignment */
    }
    if (j > T.length) return i - T.length;
    return 0;
}
```

The backtrack `i = i - j + 2` carries the whole idea: $i-j$ is where the current alignment started, plus two lands one position later. That single statement throws away everything already learned, which is precisely what KMP later fixes.

Take $S=\text{"aaaaaab"}$ and $T=\text{"aaab"}$, with $n=7$ and $m=4$, giving 4 alignments:

| Alignment | Comparison | Count | Result |
| --- | --- | --- | --- |
| 1 | a=a, a=a, a=a, a≠b | 4 | mismatch |
| 2 | a=a, a=a, a≠b | 4 | mismatch |
| 3 | a=a, a≠b | 4 | mismatch |
| 4 | a=a, a=a, a=a, b=b | 4 | match |

Each alignment burns all four comparisons because the first three characters agree every time. Four alignments give $4\times4=16$ comparisons, exactly $(n-m+1)\times m=(7-4+1)\times4=16$.

## What naive matching costs

The best case is $O(n+m)$: a match at the first alignment costs $m$ comparisons, and a first-character mismatch costs $n-m+1$. The worst case arises when the text and pattern agree on their first $m-1$ characters and differ at the last, so every alignment must be compared in full before failing:

$$
T_{\text{worst}}=(n-m+1)\times m
$$

With $m\approx n/2$ this is about $n^{2}/4$, that is $O(nm)$. Such inputs are not exotic: DNA sequences, log files full of repeated separators, and runs of whitespace all manufacture long common prefixes.

| Case | Comparisons | Example |
| --- | --- | --- |
| Best | $m$ | $S=\text{"aaab"}$, $T=\text{"aaab"}$ |
| Typical | in between | random characters |
| Worst | $(n-m+1)m$ | $S=\text{"aaaaaab"}$, $T=\text{"aaab"}$ |

Two improvements exist. Preprocessing the pattern to reuse the matched prefix avoids backtracking the text pointer: that is KMP. Hashing makes substring comparison $O(1)$: that is Rabin-Karp. Both stop discarding characters that were already compared.

> [!NOTE]
> Here $n$ and $m$ are two independent sizes, so the bound is not $O(n^{2})$ in a single parameter. Writing $O(nm)$ is what records the fact that a longer pattern makes the search slower.

## Three misconceptions

> [!MYTH] A string is just a character array.
> The array is only a storage form. The string abstraction defines operations on substrings, and length, concatenation, and locate have no meaning for a bare array.

> [!MYTH] Naive matching is fast on average, so the worst case does not matter.
> On data with heavy repetition the worst case happens constantly. A text editor's search or a signature scanner cannot tolerate $O(nm)$ degradation.

> [!MYTH] After a mismatch the pattern shifts right by $m$ positions.
> Naive matching shifts by exactly one. Shifting further requires proving the skipped alignments cannot match, and that proof is exactly what KMP's `next` array supplies.

## Practice

> [!PRACTICE] 1 · Count comparisons
> For $S=\text{"abababa"}$ and $T=\text{"aba"}$, how many comparisons does naive matching make?
>
> > [!ANSWER] Show answer
> > The first alignment matches fully, costing 3 comparisons and returning position 1.

> [!PRACTICE] 2 · Build a worst case
> With $n=10$ and $m=5$, give a text and pattern that force 30 comparisons.
>
> > [!ANSWER] Show answer
> > $S=\text{"aaaaaaaaab"}$ and $T=\text{"aaaab"}$. Each of the 6 alignments compares 5 characters, totalling 30.

> [!PRACTICE] 3 · Choose storage
> You must read a 2 GB log file and slice substrings repeatedly. Which representation, and why?
>
> > [!ANSWER] Show answer
> > Block-linked storage. A 2 GB contiguous allocation may fail outright, while blocks are requested separately; the price is gathering blocks when a substring crosses a boundary.

## Formal statement

A string is a finite sequence of zero or more characters whose logical structure is that of a linear list with character elements. Three storage representations are common: fixed-length sequential storage holds characters in a static array with a separate length field and truncates beyond capacity; heap-allocated storage requests a contiguous block sized at run time, allowing variable length; block-linked storage partitions the string into blocks joined by pointers, which suits very long strings. Naive pattern matching aligns the pattern $T$ with each successive position of the text $S$, compares characters one by one, and on mismatch shifts the pattern by one and resets the text pointer to one past the current alignment's start. Its worst-case comparison count is $(n-m+1)m$, hence time $O(nm)$, while the best case is $O(m)$. Because it discards information about matched prefixes, it is the starting point that KMP improves upon.