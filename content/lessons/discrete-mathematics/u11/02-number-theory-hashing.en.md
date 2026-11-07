---
slug: "number-theory-hashing"
subject: "discrete-mathematics"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Number Theory in Coding and Hashing"
subtitle: "How much error one digit can catch"
minutes: 14
meta: ["14 min read","Requires congruences and modular arithmetic","Mastery level"]
concepts: ["numalg", "complexity"]
prereq: ["numalg"]
related: ["discprob", "complexity"]
---

## What you will get

By the end of this lecture you can compute an ISBN-10 check digit, explain why a weighted sum modulo $11$ catches both single-digit errors and adjacent transpositions, assign keys to hash buckets modulo $m$ and handle collisions, and write the one-step recurrence behind a rolling hash.

All three use the same move: compress a long object into a small residue modulo $m$, arranged so that any local change must change that residue.

## Three lines back

- Reduction modulo $m$ is many-to-one: many inputs share a residue. That is compression, and it is also where collisions come from.
- Modular reduction commutes with addition and multiplication, so a weighted sum can be reduced as it is built.
- If the weights are coprime to the modulus and distinct, a change in one position cannot be cancelled by the others.

## Check digits: a fingerprint made of residues

An ISBN-10 has ten digits: nine for the book, one for checking, where the check digit may be $0$ to $10$ with $10$ written X. The rule is that $d_1,\dots,d_{10}$ multiplied by weights $10,9,\dots,1$ must sum to a multiple of $11$.

Take 0-306-40615-?:

| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Digit $d_i$ | 0 | 3 | 0 | 6 | 4 | 0 | 6 | 1 | 5 |
| Weight | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 |
| Product | 0 | 27 | 0 | 42 | 24 | 0 | 24 | 3 | 10 |

The products sum to $130$. The check digit carries weight $1$, so we need $130+d_{10}\equiv0\pmod{11}$. Since $130=11\times11+9$, the check digit is $-9\equiv2$, and the full number is 0-306-40615-2.

Why does this work? Suppose position $k$ changes from $d$ to $d+\delta$ with $\delta\ne0$ and $|\delta|\le10$. The sum changes by $w_k\delta$. Every weight lies in $\{1,\dots,10\}$ and is coprime to $11$, so $w_k\delta\equiv0\pmod{11}$ forces $\delta\equiv0$, a contradiction. Every single-digit error is caught.

What about swapping neighbours? Exchanging $d_i$ and $d_{i+1}$ changes the sum by

$$
(d_iw_{i+1}+d_{i+1}w_i)-(d_iw_i+d_{i+1}w_{i+1})=(d_i-d_{i+1})(w_{i+1}-w_i)
$$

Neighbouring weights differ by $1$, so as long as the two digits differ, the change is non-zero with absolute value below $11$ and cannot be divisible by $11$. This is why ISBN-10 uses $11$ rather than $10$: modulo $10$ the weight $10$ shares a factor with the modulus and transpositions slip through.

## Hashing: dropping keys into buckets

A hash table uses a function $h$ mapping keys to $0,\dots,m-1$. The standard construction is $h(k)=k\bmod m$, with $m$ prime to avoid regular clustering.

With $m=11$, insert $24,18,31,46$ in order:

| Key $k$ | $k\bmod 11$ | Bucket | Collision handling |
| --- | --- | --- | --- |
| 24 | 2 | 2 | empty, insert |
| 18 | 7 | 7 | empty, insert |
| 31 | 9 | 9 | empty, insert |
| 46 | 2 | 3 | bucket 2 taken, probe to 3 |

The load factor is $4/11\approx0.36$. Collisions cannot be eliminated: the key space is normally far larger than the bucket array, so the pigeonhole principle guarantees repeats. Quality means spreading collisions evenly, not preventing them.

## Rolling hash: neighbouring windows share work

To search for a pattern in a long text, hash every window of length $L$. Recomputing each window costs $O(L)$; a rolling hash brings the shift down to $O(1)$.

Take base $B=31$, modulus $p=101$, and encode $a,b,c$ as $1,2,3$. The window "ab" hashes to

$$
h=1\cdot31+2=33
$$

Shifting in $c$ and dropping $a$ means multiplying by the base, adding the new character, then subtracting the leaving character times $B^{L}$:

$$
h'=(33\cdot31+3)-1\cdot31^{2}\equiv1026-961=65 \pmod{101}
$$

Directly, "bc" gives $2\cdot31+3=65$, as required. The identity holds modulo $101$ because $31^2=961\equiv52\pmod{101}$.

With a prime modulus larger than the alphabet, hashes of random strings are nearly uniform. Adversarial inputs can still force many collisions, which is why production code randomises the base per process.

## Three common misconceptions

> [!MYTH] A check digit lets you correct errors.
> It normally only detects them. ISBN-10 finds a single-digit error or a transposition but does not say where it is; correction needs more redundancy, as in a Hamming code.

> [!MYTH] A large enough modulus removes collisions.
> Whenever there are more inputs than buckets, collisions occur. A larger $m$ lowers the probability; the table still needs collision handling, and cryptographic hashes must assume collisions exist.

> [!MYTH] Hashing is encryption.
> A hash is a one-way compression with no key and no way back to the input. Encryption is reversible and aims at confidentiality. Storing passwords as "encrypted" hashes is a standard security mistake.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find the check digit of 7-111-07567-?.
>
> > [!ANSWER] Show answer
> > The weighted sum is $7\cdot10+1\cdot9+1\cdot8+1\cdot7+0\cdot6+7\cdot5+5\cdot4+6\cdot3+7\cdot2=181$. Since $181=11\times16+5$, the check digit is $6$, giving $187=17\times11$.

> [!PRACTICE] 2 · Variation
> Store keys $12,25,37,49,58$ with $m=7$ and list each bucket.
>
> > [!ANSWER] Show answer
> > The residues are $5,4,2,0,2$. Bucket 0 holds 49, bucket 2 holds 37, bucket 4 holds 25, bucket 5 holds 12; key 58 collides at bucket 2 and probes to 3.

> [!PRACTICE] 3 · Transfer
> With base $B=10$ and modulus $p=97$, the window "12" hashes to $12$. What is the hash after appending $3$?
>
> > [!ANSWER] Show answer
> > The new window is "23" with hash $2\cdot10+3=23$. The rolling step gives $(12\cdot10+3)-1\cdot10^2=123-100=23$, matching.

## Formal statement

Let $m\ge2$ and let weights $w_1,\dots,w_n$ all be coprime to $m$. The check sum is $S=\sum d_iw_i\bmod m$. If only position $k$ is wrong by $\delta$ with $0<|\delta|<m$, then $S$ changes by $w_k\delta\not\equiv0\pmod m$, so the error is detected. If two adjacent digits with $d_i\ne d_{i+1}$ are swapped and $w_i\not\equiv w_{i+1}\pmod m$, the change is $(d_i-d_{i+1})(w_{i+1}-w_i)\not\equiv0$, so the transposition is detected. ISBN-10 takes $m=11$ and $w_i=11-i$, satisfying both conditions.

A hash function is a map $h:U\to\{0,\dots,m-1\}$; a collision is a pair $k_1\ne k_2$ with $h(k_1)=h(k_2)$. A polynomial rolling hash is $h(s)=\sum_{i=0}^{L-1}c_iB^{L-1-i}\bmod p$, and shifting the window by one satisfies $h'=(hB+c_{\text{new}}-c_{\text{old}}B^{L})\bmod p$. Under a uniformity assumption the expected cost of one lookup is $O(1)$, with $O(n)$ in the worst case.
