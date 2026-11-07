---
slug: "multimedia-formats-compression"
subject: "operating-systems"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 21 · Operating Systems · Mastery"
title: "Multimedia Files and Data Compression"
subtitle: "Uncompressed 1080p30 is 746 Mbps, or 336 GB per hour"
minutes: 16
meta: ["16 min read","Requires file system basics","Mastery level"]
concepts: ["iomgmt","filesys"]
prereq: ["filesys"]
related: ["cache","sched"]
---

## What you will get

You will be able to distinguish containers from codecs, compute uncompressed bitrate and storage, explain intra-frame and inter-frame compression, and compute a compression ratio.

## Three lines back

- A container only packages streams; codecs and timestamps decide whether playback stays in sync.
- Uncompressed bitrate is sample rate times bit depth times resolution times frame rate, usually hundreds of Mbps to Gbps.
- Compression removes spatial, temporal, and perceptual redundancy through intra-frame coding, motion compensation, and quantization.

## Media types and file formats

Multimedia data is audio, video, images, and text and graphics; the OS cares about large volume, constant or variable rate, and hard deadlines.

Formats live on two layers: a **container** (AVI, MP4, MKV) packages streams, timestamps, indexes, and metadata; a **codec** (H.264, H.265, AAC, MP3) turns samples or pixels into a bitstream.

| Format | Layer | Compression | Typical bitrate | Note |
| --- | --- | --- | --- | --- |
| WAV | Audio container | None | 1411 kbps (CD) | Easy to edit, large |
| MP3 | Audio codec | Lossy, psychoacoustic | 128–320 kbps | Widest compatibility |
| AAC | Audio codec | Lossy | 96–256 kbps | Better quality at equal rate |
| MP4 | Container | None | Content-dependent | Streaming, random access |
| MKV | Container | None | Content-dependent | Flexible tracks and subtitles |

Renaming `.avi` to `.mp4` converts nothing: the player still decodes by the identifier in the bitstream, and the rename only breaks demultiplexing.

## Bitrate and storage by direct computation

Uncompressed audio bitrate is

$$R_{\text{audio}}=f_s\times b\times c$$

with sample rate $f_s$, depth $b$, and channels $c$; for CD quality, $f_s=44.1$ kHz, $b=16$, $c=2$:

$$R=44{,}100\times16\times2=1{,}411{,}200\ \text{bit/s}\approx1.41\ \text{Mbps}$$

Uncompressed video bitrate is

$$R_{\text{video}}=W\times H\times d\times f$$

where $d$ is bytes per pixel. For 1080p30 8-bit 4:2:0, $d=1.5$:

$$R=1920\times1080\times1.5\times8\times30=746{,}496{,}000\ \text{bit/s}\approx746\ \text{Mbps}$$

That is $93.3$ MB/s, so one hour needs

$$93.3\ \text{MB/s}\times3600\ \text{s}\approx336\ \text{GB}$$

more than a Blu-ray disc and far beyond broadband; the same arithmetic gives $5.97$ Gbps for 4K60, which no medium stores for long.

| Source | Parameters | Uncompressed | Per hour |
| --- | --- | --- | --- |
| CD audio | 44.1 kHz, 16 bit, stereo | 1.41 Mbps | 0.64 GB |
| 720p30 | 1280×720, 4:2:0 | 332 Mbps | 149 GB |
| 1080p30 | 1920×1080, 4:2:0 | 746 Mbps | 336 GB |
| 4K60 | 3840×2160, 4:2:0 | 5.97 Gbps | 2.69 TB |

## Compression: intra-frame, inter-frame, quantization

**Lossless** compression removes only redundancy and reconstructs exactly, as for medical images; **lossy** compression also discards what eyes or ears barely notice for far higher ratios.

**Intra-frame** coding (JPEG, an H.264 I frame) attacks spatial redundancy: blocks go through a discrete cosine transform, energy concentrates in low frequencies, a quantization table zeroes high-frequency coefficients, and entropy coding finishes. **Inter-frame** coding attacks temporal redundancy: I frames stand alone, P frames carry motion-compensated residuals, and B frames reference both directions. A GOP looks like `I B B P B B P`; random access starts only at an I frame.

Quantization is where loss enters: a coarser step wipes out high-frequency detail, lowering bitrate and raising blockiness. Compression ratio is

$$\text{CR}=\frac{R_{\text{raw}}}{R_{\text{coded}}}$$

CD audio at 128 kbps gives $\text{CR}=1411/128\approx11$; one minute of WAV is $10.6$ MB, and the same minute as MP3 is $0.96$ MB.

| Codec | Redundancy removed | Typical ratio | Typical bitrate | Random access |
| --- | --- | --- | --- | --- |
| ZIP / FLAC | Lossless | 1.5–2× | 700 kbps (FLAC) | Yes |
| JPEG | Spatial | 10–20× | Quality-dependent | Yes |
| MP3 / AAC | Perceptual | 8–12× | 128 kbps | Yes |
| H.264 | Spatial and temporal | 50–100× | 4–8 Mbps at 1080p | I frames only |

> [!NOTE]
> Higher ratio is not automatically better: below some threshold, blockiness, ringing, and smear appear together, so a system balances bitrate, quality, and decoding power.

## Three common misconceptions

> [!MYTH] Changing a file extension converts the video format.
> The extension only hints at the container; identifiers live in the bitstream, so renaming changes nothing and usually breaks demultiplexing.

> [!MYTH] A higher frame rate always means better quality.
> Frame rate governs motion smoothness; at a fixed bitrate, raising it gives each frame fewer bits and lowers per-frame quality.

> [!MYTH] Lossy compression destroys the source, so it cannot be used for distribution.
> Almost every distribution medium uses lossy coding; perceptual coding keeps distortion below the detection threshold.

## Practice

> [!PRACTICE] 1 · Compute
> What is the uncompressed bitrate of 48 kHz, 24-bit mono audio, and how large is ten minutes?
>
> > [!ANSWER] Show answer
> > $48{,}000\times24\times1=1{,}152{,}000$ bit/s or 1.152 Mbps. Ten minutes is $1.152\times600/8=86.4$ MB.

> [!PRACTICE] 2 · Compute
> For 1280×720 at 25 fps with 1.5 bytes per pixel, find the uncompressed bitrate and the ratio when coded at 4 Mbps.
>
> > [!ANSWER] Show answer
> > $1280\times720\times1.5\times8\times25=276{,}480{,}000$ bit/s, about 276 Mbps. The ratio is $276/4=69$.

> [!PRACTICE] 3 · Reason
> Why not encode a video conference entirely with I frames, which resist packet loss best?
>
> > [!ANSWER] Show answer
> > All-I coding costs dozens of times a normal GOP's bitrate, which conference bandwidth cannot carry; real systems shorten the GOP and add I frames, trading bitrate for resilience.

## Formal statement

A multimedia file has a container layer for streams, timestamps, and indexes, and a codec layer for the compressed bitstream. Uncompressed audio bitrate is $R=f_s\cdot b\cdot c$ and video bitrate $R=W\cdot H\cdot d\cdot f$; CD audio is 1.41 Mbps and 1080p30 is 746 Mbps, or 336 GB per hour. Compression removes spatial, temporal, and perceptual redundancy through intra-frame transform and quantization, inter-frame motion compensation, and perceptual quantization; the ratio is raw bitrate over coded bitrate.