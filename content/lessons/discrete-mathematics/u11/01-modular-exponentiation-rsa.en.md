---
slug: "modular-exponentiation-rsa"
subject: "discrete-mathematics"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Modular Powers, Fast Exponentiation, and RSA"
subtitle: "Huge exponents, few steps"
minutes: 17
meta: ["17 min read","Requires congruences and modular arithmetic","Mastery level"]
concepts: ["numalg", "sec", "complexity"]
prereq: ["numalg"]
related: ["complexity", "sec"]
---

## What you will get

By the end of this lecture you can compute $a^e \bmod n$ by repeated squaring with $\log e$ multiplications instead of $e$, explain what the public and private halves of RSA contain and why decryption recovers the message, and say what textbook RSA lacks in practice.

One fact carries the lecture: an exponent splits into binary, and the values $a^{2^{i}}$ come from repeated squaring.

## Three lines back

- Modular multiplication is compatible with reduction: $(x \bmod n)(y \bmod n)\bmod n=xy\bmod n$, so reducing at every step is safe.
- If $\gcd(a,n)=1$, then $a^{\varphi(n)}\equiv1 \pmod n$, where $\varphi(n)$ counts the integers in $[1,n]$ coprime to $n$.
- Exponents can therefore be handled modulo $\varphi(n)$, and that is the entire basis of RSA.

## Spreading the exponent into binary

Compute $3^{13}\bmod 7$. The naive route uses twelve multiplications; the binary route writes $13=1101_2=8+4+1$, so

$$
3^{13}=3^{8}\cdot3^{4}\cdot3^{1}
$$

and $3^2,3^4,3^8$ come from squaring. Scan bits from the least significant end, multiplying into the accumulator whenever the bit is $1$:

| Bit | Value | $r$ before | $r$ after | $b$ after squaring |
| --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 3 | 2 |
| 1 | 0 | 3 | 3 | 4 |
| 2 | 1 | 3 | 5 | 2 |
| 3 | 1 | 5 | 3 | 4 |

Reading the table: the base column runs $3,2,4,2$, which are $3^{1},3^{2},3^{4},3^{8}$ modulo $7$, and $r$ is updated only on $1$ bits. The answer is $3^{13}\equiv3\pmod7$. Directly, $3^{13}=1594323=7\times227760+3$.

The loop is four lines:

$$
r\leftarrow1,\qquad \text{if }e_i=1:\ r\leftarrow r\cdot b,\qquad b\leftarrow b^2,\qquad e\leftarrow\lfloor e/2\rfloor
$$

## The cost: from linear to logarithmic

Fast exponentiation changes the order of growth, not a constant factor. Counting one modular multiplication per step:

| Exponent $e$ | Naive multiplications | Fast exponentiation |
| --- | --- | --- |
| $2^{10}=1024$ | 1023 | about 20 |
| $10^{6}$ | $10^{6}$ | about 40 |
| $2^{256}$ | $2^{256}$ | about 512 |

The last row decides the matter: $2^{256}$ multiplications cannot be finished within the age of the universe, while $512$ take milliseconds. RSA exponents have thousands of bits, so without fast exponentiation there is no public-key cryptography.

## The three numbers of RSA

Choose two large primes $p,q$, set $n=pq$ and $\varphi(n)=(p-1)(q-1)$. Pick $e$ coprime to $\varphi(n)$ and use the extended Euclidean algorithm to find $d$ with

$$
ed\equiv1 \pmod{\varphi(n)}
$$

The public key is $(n,e)$; the private key is $(n,d)$. Encryption is $c=m^{e}\bmod n$, decryption $m'=c^{d}\bmod n$. Since

$$
c^{d}=m^{ed}=m^{1+k\varphi(n)}=m\cdot\left(m^{\varphi(n)}\right)^{k}\equiv m \pmod n
$$

Euler's theorem restores $m$ whenever $\gcd(m,n)=1$; the remaining case needs a short separate argument.

A small run: $p=5$, $q=11$, so $n=55$ and $\varphi(n)=40$. Take $e=3$; from $3d\equiv1\pmod{40}$ we get $d=27$, because $81=2\times40+1$. Encrypt $m=7$:

$$
c=7^{3}\bmod55=343\bmod55=13
$$

Decrypt $13^{27}\bmod55$ by splitting with the Chinese Remainder Theorem. Modulo $5$, $13\equiv3$ and $3^{27}\equiv3^{3}=27\equiv2$. Modulo $11$, $13\equiv2$ and $2^{27}\equiv2^{7}=128\equiv7$. The two residues combine to $7$ modulo $55$, so the message returns.

These numbers are a demonstration only: $n=55$ factors in a second. Real systems need $n$ of at least $2048$ bits and randomised padding such as OAEP; otherwise equal plaintexts give equal ciphertexts and can be matched by comparison.

## Three common misconceptions

> [!MYTH] Fast exponentiation is just a tidier loop.
> It cuts the multiplication count from $O(e)$ to $O(\log e)$ — a change of order. At $e=2^{256}$ the difference is not optimisation but computable versus impossible.

> [!MYTH] RSA is safe because the public exponent $e$ is secret.
> Both $e$ and $n$ are public. Security rests on the difficulty of factoring $n$: once $p,q$ are known, $\varphi(n)$ follows and $d$ comes out of the extended algorithm immediately.

> [!MYTH] Raising the plaintext to a power modulo $n$ is already RSA.
> That is textbook RSA: deterministic and multiplicatively malleable. An attacker can turn $c_1c_2$ into a ciphertext of $m_1m_2$, or simply enumerate small messages. Deployments must add random padding.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Compute $5^{11}\bmod13$ by fast exponentiation.
>
> > [!ANSWER] Show answer
> > $11=1011_2$. The base takes values $5,12,1,1$ and the accumulator $5,8,8,8$ (bits $0,1,3$ are $1$). The result is $8$. Check: $5^2=25\equiv-1$, so $5^{11}=5\cdot(5^2)^5\equiv-5\equiv8$.

> [!PRACTICE] 2 · Variation
> Take $p=3$, $q=7$, $e=5$. Encrypt $m=4$ and decrypt it.
>
> > [!ANSWER] Show answer
> > $n=21$, $\varphi(n)=12$, and $d=5$ since $25\equiv1\pmod{12}$. Then $c=4^5=1024\equiv16\pmod{21}$. Decrypting, $16^5\equiv(-5)^5=-3125$, and $3125=21\times148+17$, so $-3125\equiv-17\equiv4\pmod{21}$.

> [!PRACTICE] 3 · Transfer
> Why is $\gcd(e,\varphi(n))=1$ required?
>
> > [!ANSWER] Show answer
> > Only then is $e$ invertible modulo $\varphi(n)$, so a $d$ with $ed\equiv1$ exists. Otherwise the congruence has no solution and there is no decryption exponent at all.

## Formal statement

Let $n\ge2$ and let $a$ be coprime to $n$. Then $a^{\varphi(n)}\equiv1\pmod n$ (Euler's theorem); for prime $n=p$ this reads $a^{p-1}\equiv1\pmod p$ (Fermat's little theorem).

To compute $a^e\bmod n$ by fast exponentiation, write $e=\sum e_i2^i$ in binary, maintain $b_i=a^{2^i}\bmod n$ by repeated squaring, and accumulate $r=\prod_{e_i=1}b_i\bmod n$. The number of multiplications is $O(\log e)$ and the extra space is $O(1)$, apart from the integers themselves.

RSA: choose distinct primes $p,q$, set $n=pq$ and $\varphi(n)=(p-1)(q-1)$, pick $e$ coprime to $\varphi(n)$, and let $d\equiv e^{-1}\pmod{\varphi(n)}$. For $0\le m<n$ define $E(m)=m^e\bmod n$ and $D(c)=c^d\bmod n$; then $D(E(m))=m$. Security reduces to the difficulty of factoring $n$, not to secrecy of $e$.
