---
slug: "encryption-authentication"
subject: "operating-systems"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 24 · Operating Systems · Mastery"
title: "Data Encryption and Authentication"
subtitle: "A thousand users need 499,500 symmetric keys"
minutes: 16
meta: ["16 min read","Requires security and access control","Mastery level"]
concepts: ["ossecurity","process"]
prereq: ["ossecurity"]
related: ["filesys","osif"]
---

## What you will get

You will be able to compare symmetric and asymmetric encryption in key count, speed, and use, run RSA on small integers, explain signatures, and outline Kerberos.

## Three lines back

- Symmetric encryption is fast, but distributing keys is $O(n^2)$; asymmetric encryption is slow yet needs only $O(n)$ keys.
- Digital signatures sign with the private key and verify with the public key, settling who sent a message and whether it changed.
- Kerberos issues time-limited tickets from a trusted third party, so both sides authenticate after one login.

## Symmetric and asymmetric encryption

**Symmetric encryption** uses one key for both directions. DES, with 64-bit blocks and a 56-bit effective key, is obsolete; AES is standard. Block ciphers need a mode, and ECB leaks because equal plaintext blocks give equal ciphertext.

**Asymmetric encryption** uses a public and private key pair. RSA rests on integer factorization, ECC on elliptic-curve logarithms, which gives shorter keys at equal strength.

| Property | Symmetric | Asymmetric |
| --- | --- | --- |
| Key | One shared secret | Public and private pair |
| Examples | AES, DES, ChaCha20 | RSA, ECC, ElGamal |
| Speed | High | Low |
| Keys for $n$ users | $n(n-1)/2$ | $2n$ |
| Main use | Bulk data encryption | Key exchange, signatures |

Key counts grow with the square of users: 1000 need

$$\frac{1000\times999}{2}=499{,}500\ \text{keys}$$

while the asymmetric scheme needs 2000. Real systems use **hybrid encryption**: asymmetric cryptography negotiates a session key, and AES encrypts data.

RSA on small integers: with $p=61$ and $q=53$, $n=3233$ and $\varphi(n)=3120$; choosing $e=17$ gives $d=2753$ with $ed\equiv1\pmod{3120}$. Encrypting $m=65$:

$$c=65^{17}\bmod3233=2790$$

Decrypting:

$$2790^{2753}\bmod3233=65$$

Real keys exceed 2048 bits; the arithmetic only exhibits the structure.

## Digital signatures and certificates

A **hash function** compresses any input to a fixed one-way, collision-resistant digest. SHA-256 outputs 256 bits, with collision probability near $2^{-128}$.

A **digital signature** reverses the order: the sender signs the digest with the **private** key, the receiver verifies with the **public** key.

1. The sender computes $h=H(m)$.
2. It signs with private key $d$: $s=h^d\bmod n$.
3. The receiver recovers $h'=s^e\bmod n$ with public key $e$ and computes $H(m)$.
4. If $h'=H(m)$, the message is intact and came from the key holder.

Signatures give integrity and non-repudiation: any change alters the digest, and only the key holder can sign, not confidentiality.

A **certificate** binds a subject name, public key, and validity period under a CA's signature; verifiers check it with the CA key, chaining to a root.

| Mechanism | Confidentiality | Integrity | Authentication | Non-repudiation |
| --- | --- | --- | --- | --- |
| Symmetric encryption | Yes | No, needs a MAC | No | No |
| Asymmetric encryption | Yes | No | No | No |
| Hash | No | Yes | No | No |
| Digital signature | No | Yes | Yes | Yes |

## Kerberos and network defenses

**Kerberos** relies on a trusted third party, the KDC, in three steps:

| Step | Exchange | Result | Protection |
| --- | --- | --- | --- |
| 1 | Client to AS for a TGS ticket | Session key and ticket | Key from password |
| 2 | Client to TGS with the ticket | Service ticket and key | Ticket carries lifetime and address |
| 3 | Client to server with service ticket | Mutual authentication | Timestamp defeats replay |

Tickets expire and authenticators carry timestamps, so servers accept only fresh requests, defeating replay; clocks must stay synchronized.

Two defenses guard the network boundary. A **firewall** filters traffic: packet filters inspect five-tuples, stateful inspection tracks connections, application proxies parse protocols but cut throughput. **IDS** watches a copy and alerts; **IPS** sits inline and blocks, risking false blocks. The firewall decides whether traffic enters, the IDS what it does inside.

> [!NOTE]
> Encryption hides content, not metadata: peers, timing, and volume stay visible, so traffic analysis still works.

## Three common misconceptions

> [!MYTH] Asymmetric encryption is stronger, so encrypt everything with it.
> Strength depends on key length and implementation, not type; asymmetric encryption is far slower and only negotiates keys.

> [!MYTH] Digital signatures prevent messages from being read.
> Signatures guarantee integrity and origin only; confidentiality needs separate encryption.

> [!MYTH] A Kerberos ticket stays valid forever.
> Tickets expire and carry timestamps, so a stolen ticket works only inside its window.

## Practice

> [!PRACTICE] 1 · Compute
> For 100 users, how many keys per scheme? And for 5000?
>
> > [!ANSWER] Show answer
> > Symmetric $100\times99/2=4950$ against 200; at 5000, $12{,}497{,}500$ against 10,000, widening from 25 to 1250 times.

> [!PRACTICE] 2 · Decide
> An email with a valid signature arrives. What two facts follow, and what does not?
>
> > [!ANSWER] Show answer
> > The content is unaltered and the signer holds the private key; not that nobody else read it.

> [!PRACTICE] 3 · Analyze
> Why does replaying a captured Kerberos service ticket usually fail?
>
> > [!ANSWER] Show answer
> > Authenticators carry timestamps, and servers accept only unused ones inside the window, so replays fail.

## Formal statement

Symmetric encryption uses a shared key, so $n$ users need $n(n-1)/2$ keys; asymmetric encryption uses key pairs, needing $2n$, but is slow, which is why systems combine them. In RSA, $n=pq$, $ed\equiv1\pmod{\varphi(n)}$, $c=m^e\bmod n$, and $m=c^d\bmod n$. A digital signature signs the digest with the private key and verifies with the public key, giving integrity and non-repudiation but not confidentiality. Kerberos issues time-limited tickets through the AS and TGS and uses timestamps against replay; firewalls control whether traffic enters, while IDS and IPS detect and optionally block it.