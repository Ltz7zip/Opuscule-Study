---
slug: "r-basics"
subject: "probability"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "R and the Basics of Statistical Computing"
subtitle: "Vectors, data frames, and the four d/p/q/r keys"
minutes: 15
meta: ["15 min read","Requires sampling and distributions","Mastery level"]
concepts: ["sampling", "distribution", "estimation"]
prereq: ["sampling"]
related: ["estimation", "distribution"]
---

## What you will get

You will build vectors and data frames, call any common distribution through the $d/p/q/r$ prefixes, read a text file into R, and produce basic descriptive statistics.

## Three lines back

- Everything in R is a vector; a scalar is a vector of length one, and indexing starts at 1.
- `d` gives density or probability mass, `p` the distribution function, `q` the quantile, `r` random draws.
- A data frame is a column-oriented table whose columns may have different types.

## Vectors and data frames

Vectors come from `c()`, and `[]` selects; a minus sign excludes:

```r
x <- c(168, 172, 175, 160, 180, 165, 170, 174, 169, 177)
mean(x)          # 171
sd(x)            # 5.907
x[c(1, 3)]       # 168 175
x[x > 170]       # 172 175 180 174 177
```

`mean`, `sd`, `median`, `quantile` and `var` are vectorised and apply to the whole vector. `sd` divides by $n-1$:

$$
s=\sqrt{\frac{1}{n-1}\sum_{i=1}^n(x_i-\bar x)^2}.
$$

Data frames come from `data.frame()`, one column per variable, all columns of equal length:

| Function | Purpose | Result here |
| --- | --- | --- |
| `nrow` / `ncol` | rows / columns | 10 / 2 |
| `str` | structure and types | numeric and factor columns |
| `summary` | five-number summary | minimum through maximum |
| `df$height` | extract a column | vector of length 10 |

`df[df$sex == "F", ]` filters rows: the condition before the comma selects rows, the part after selects columns. That comma rule carries over to matrices.

## The four prefixes: d, p, q, r

Every distribution ships four functions. For the normal family:

| Function | Meaning | Formula |
| --- | --- | --- |
| `dnorm(x, mu, sigma)` | density | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/(2\sigma^2)}$ |
| `pnorm(q, mu, sigma)` | distribution function | $\int_{-\infty}^{q}f(t)\,dt$ |
| `qnorm(p, mu, sigma)` | quantile | solve $F(x)=p$ |
| `rnorm(n, mu, sigma)` | random draws | sample from $N(\mu,\sigma^2)$ |

The four are inverses of one another: `pnorm(qnorm(0.975))` returns `0.975`. Concrete values:

```r
dnorm(0)              # 0.3989
pnorm(1.96)           # 0.9750
qnorm(0.975)          # 1.9600
dbinom(3, size = 10, prob = 0.3)   # 0.2668
```

The binomial call evaluates

$$
P(X=3)=\binom{10}{3}0.3^3\,0.7^7=120\times0.027\times0.08235=0.2668.
$$

Swap `norm` for `t`, `chisq`, `f`, `pois`, `exp` or `binom` and the pattern is unchanged; only the parameters differ (`df` for `t` and `chisq`, `df1, df2` for `f`). Learn it once and it covers the whole catalogue.

## Reading data and one small analysis

`read.csv()` reads comma-separated files, `header = TRUE` says the first row holds names, and `stringsAsFactors = FALSE` keeps character columns as characters. Always inspect with `head()` and `str()` before modelling.

```r
df <- read.csv("heights.csv", header = TRUE, stringsAsFactors = FALSE)
str(df)
summary(df$height)
```

For the ten heights above, `summary` reports:

| Statistic | Value |
| --- | --- |
| minimum | 160.0 |
| first quartile | 168.2 |
| median | 171.0 |
| mean | 171.0 |
| third quartile | 174.8 |
| maximum | 180.0 |

Mean and median agree, so the data are roughly symmetric. The sample standard deviation is $5.907$, the standard error is $5.907/\sqrt{10}=1.868$, and a normal approximation gives the interval $171\pm1.96\times1.868=[167.3,174.7]$.

Missing values are `NA`. `mean(x)` returns `NA` whenever an entry is missing, so write `mean(x, na.rm = TRUE)`. The result is not wrong, it is simply contaminated into ignorance by a single gap.

> [!MYTH] R indexes from 0, like the mathematics of arrays.
> R starts at 1: `x[1]` is the first element and `x[0]` is an empty vector. Python and C start at 0.

> [!NOTE]
> `qnorm(0.975)` is the point with right-tail area $0.025$, that is $z_{0.025}=1.96$. Textbooks write $z_\alpha$ where R wants `qnorm(1 - alpha)`, so watch the direction of the tail.

## Three common misconceptions

> [!MYTH] `pnorm` only handles left tails, so it cannot give a right-tail probability.
> Use `1 - pnorm(x)`, or better `pnorm(x, lower.tail = FALSE)`, which avoids cancellation when $x$ is large.

> [!MYTH] Data frame columns may have different lengths.
> All columns must be equal in length. Ragged objects belong in a `list()`, not a `data.frame()`.

> [!MYTH] Random numbers must be identical on every run to be trustworthy.
> Reproducibility comes from `set.seed(2026)`. Without a seed `rnorm` differs each run, which is a feature rather than a defect.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For $N(100,15^2)$, find $F(120)$ and the $97.5\%$ quantile.
>
> > [!ANSWER] Show answer
> > `pnorm(120, 100, 15)` gives $0.9088$; `qnorm(0.975, 100, 15)` gives $129.4$.

> [!PRACTICE] 2 · Variation
> Draw five standard normal values with `rnorm` and average them. Write the code.
>
> > [!ANSWER] Show answer
> > `set.seed(1); z <- rnorm(5); mean(z)` returns about $-0.179$. Without the seed the result is not reproducible.

> [!PRACTICE] 3 · Transfer
> A `summary` shows mean $171$ and median $165$. What does that tell you?
>
> > [!ANSWER] Show answer
> > The mean exceeds the median, so the right tail is pulled out by large values. Plot a histogram or boxplot and consider the median or a log transform instead of reporting the mean alone.

## Formal statement

Each distribution in R is described by four functions: density $f(x)$, distribution function $F(x)=\int_{-\infty}^{x}f(t)\,dt$, quantile $Q(p)=F^{-1}(p)$, and a random generator. `d` implements $f$, `p` implements $F$, `q` implements $Q$, and `r` samples from $F$; the suffix (`norm`, `t`, `chisq`) names the family and the remaining arguments set its parameters. A vector is the fundamental data structure, a length-one vector is a scalar, indexing starts at 1, and out-of-range access yields `NA` rather than an error. A data frame is a list of equal-length vectors: `df[[j]]` returns the $j$th column as a vector while `df[j]` returns a one-column data frame, a distinction that matters inside functions. Numbers are double precision by default, so `0.1 + 0.2 == 0.3` is `FALSE`; use `all.equal` or an explicit tolerance instead.