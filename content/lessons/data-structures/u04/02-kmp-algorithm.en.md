---
slug: "kmp-algorithm"
subject: "data-structures"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "The KMP Algorithm"
subtitle: "Why the text pointer never backs up"
minutes: 17
meta: ["17 min read","Requires String Storage and Naive Matching","Mastery level"]
concepts: ["stringds", "complexity"]
prereq: ["stringds"]
related: ["complexity", "list"]
---

## What you will get

By the end of this lecture you can compute `next` and `nextval` for any pattern by hand, explain why the text pointer never retreats, trace a full KMP match, and account for the $O(n+m)$ running time.

## Three lines back

- `next[j]` is one plus the length of the longest proper prefix of the first $j-1$ pattern characters that is also a suffix.
- On mismatch the pattern slides to `next[j]` while the text index $i$ stays put.
- `nextval` skips positions that would certainly mismatch again, shaving constant work.

## What next means and how to compute it

Naive matching resets $i$ and $j$ on every mismatch and throws away the fact that the previous $j-1$ characters already matched. KMP asks a sharper question: since $S[i-j+1..i-1]=T[1..j-1]$ is known, can the pattern shift forward while $i$ stays fixed?

Yes, and the landing point depends only on the pattern. Let $k$ be the largest value with $T[1..k-1]=T[j-k+1..j-1]$, that is, one plus the length of the longest proper prefix that is also a suffix of the first $j-1$ characters. Then a mismatch sets $j=\text{next}[j]$. The convention $\text{next}[1]=0$ means "advance the text pointer and restart the pattern at 1".

Take $T=\text{"abaabcac"}$ with $m=8$:

| $j$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $T[j]$ | a | b | a | a | b | c | a | c |
| prefix $T[1..j-1]$ | — | a | ab | aba | abaa | abaab | abaabc | abaabca |
| longest equal border | — | 0 | 0 | 1 | 1 | 2 | 0 | 1 |
| `next[j]` | 0 | 1 | 1 | 2 | 2 | 3 | 1 | 2 |

Check column 6 by hand: for $j=6$ the prefix string is `abaab`, whose prefix `ab` equals its suffix `ab`, so the border length is 2 and `next[6]=3`. Column 7 is `abaabc`, which has no non-empty equal border, so `next[7]=1`.

Computing `next` is itself a matching of the pattern against itself:

```c
void get_next(SString T, int next[]) {
    int i = 1, j = 0;
    next[1] = 0;
    while (i < T.length) {
        if (j == 0 || T.ch[i-1] == T.ch[j-1]) {
            i++; j++;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}
```

Here $i$ never retreats either, so the preprocessing costs $O(m)$.

## nextval and the failure function

If $T[j]=T[\text{next}[j]]$, then a mismatch at $j$ guarantees a second mismatch at $\text{next}[j]$, and that comparison is wasted. `nextval` skips such positions outright:

$$
\text{nextval}[j]=
\begin{cases}
0, & j=1\\
\text{nextval}[\text{next}[j]], & T[j]=T[\text{next}[j]]\\
\text{next}[j], & \text{otherwise}
\end{cases}
$$

Applied to `abaabcac`:

| $j$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $T[j]$ | a | b | a | a | b | c | a | c |
| `next[j]` | 0 | 1 | 1 | 2 | 2 | 3 | 1 | 2 |
| $T[\text{next}[j]]$ | — | a | a | b | b | a | a | b |
| equal? | — | no | yes | no | yes | no | yes | no |
| `nextval[j]` | 0 | 1 | 0 | 2 | 1 | 3 | 0 | 2 |

Look at $j=3$: $\text{next}[3]=1$ and $T[3]=T[1]=\text{a}$, so `nextval[3]=nextval[1]=0`. Without this, a mismatch would jump to $j=1$ and spend a comparison on `a` that is bound to fail. The same logic gives `nextval[5]=nextval[2]=1`.

## Tracing a match

Search $T=\text{"abaabcac"}$ in $S=\text{"aababaabcac"}$, starting at $i=1,j=1$:

| Step | $i$ | $j$ | Compare | Outcome | Next |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | a=a | equal | $i=2,j=2$ |
| 2 | 2 | 2 | a≠b | mismatch | $j=\text{next}[2]=1$ |
| 3 | 2 | 1 | a=a | equal | $i=3,j=2$ |
| 4 | 3 | 2 | b=b | equal | $i=4,j=3$ |
| 5 | 4 | 3 | a=a | equal | $i=5,j=4$ |
| 6 | 5 | 4 | b≠a | mismatch | $j=\text{next}[4]=2$ |
| 7 | 5 | 2 | b=b | equal | $i=6,j=3$ |
| 8 | 6 | 3 | a=a | equal | $i=7,j=4$ |
| 9 | 7 | 4 | a=a | equal | $i=8,j=5$ |
| 10 | 8 | 5 | b=b | equal | $i=9,j=6$ |
| 11 | 9 | 6 | c=c | equal | $i=10,j=7$ |
| 12 | 10 | 7 | a=a | equal | $i=11,j=8$ |
| 13 | 11 | 8 | c=c | equal | $i=12,j=9$ |

Now $j=9>m$, so the match succeeds and the start position is $i-j+1=12-9+1=4$. Thirteen comparisons in total, and $i$ moved from 1 to 12 without ever retreating.

For the analysis, $i$ only increases, so it advances at most $n$ times. Each mismatch lowers $j$ via `next`, and $j$ rises only on a successful comparison, so the total number of decreases cannot exceed the total number of increases. The scan is therefore $O(n)$, and with $O(m)$ preprocessing the whole algorithm is $O(n+m)$ in time and $O(m)$ in space.

> [!NOTE]
> KMP does not skip characters; it avoids re-comparing equalities it already knows. The two indices play different roles: $i$ advances monotonically while $j$ retreats using prefix knowledge. That asymmetry is the whole difference from naive matching.

## Three misconceptions

> [!MYTH] In KMP the text pointer also retreats on mismatch.
> The text index $i$ is monotone, which is exactly where $O(n+m)$ comes from. Only the pattern index $j$ moves backward.

> [!MYTH] The next array says how many positions the pattern shifts.
> Strictly, `next[j]` is the new value of $j$; the shift is $j-\text{next}[j]$. Confusing the two produces wrong arithmetic at $j=1$.

> [!MYTH] nextval is always faster than next.
> It removes only comparisons that were guaranteed to fail; the worst case stays $O(n+m)$ with a smaller constant. On patterns with few repeated characters the difference is negligible.

## Practice

> [!PRACTICE] 1 · Compute by hand
> Find `next` and `nextval` for $T=\text{"aabaab"}$.
>
> > [!ANSWER] Show answer
> > `next` = 0,1,2,1,2,3; `nextval` = 0,1,0,1,0,3.

> [!PRACTICE] 2 · Trace a shift
> Search $T=\text{"ababc"}$ in $S=\text{"abababc"}$. Describe how $j$ changes at the first mismatch.
>
> > [!ANSWER] Show answer
> > The `next` array of $T$ is 0,1,1,2,3. At the mismatch on the fifth character, $j$ drops from 5 to 3, and the comparison then succeeds.

> [!PRACTICE] 3 · Compare counts
> How many comparisons does that search take, and how many would naive matching use?
>
> > [!ANSWER] Show answer
> > KMP needs about 7 comparisons with two retreats of $j$. Naive matching compares 5 characters at each early alignment, totalling more than 10.

## Formal statement

For a pattern $T[1..m]$, define $\text{next}[j]$ as the largest $k$ such that $T[1..k-1]=T[j-k+1..j-1]$, with $\text{next}[1]=0$. On a mismatch KMP sets $j=\text{next}[j]$ and leaves the text index $i$ unchanged. Its correctness rests on the fact that the matched portion $S[i-j+1..i-1]$ equals $T[1..j-1]$, so any feasible new alignment corresponds to an equal border of that prefix. The `next` array is computed by matching the pattern against itself in $O(m)$ time. Define $\text{nextval}[1]=0$, and for $j>1$ set $\text{nextval}[j]=\text{nextval}[\text{next}[j]]$ when $T[j]=T[\text{next}[j]]$, otherwise $\text{nextval}[j]=\text{next}[j]$; this eliminates comparisons certain to fail. KMP runs in $O(n+m)$ time and $O(m)$ space.