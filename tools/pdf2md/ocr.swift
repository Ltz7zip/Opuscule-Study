import Foundation
import Vision
import ImageIO
import CoreGraphics

// Usage: ocr --json out.jsonl img1 img2 ...
var outPath: String? = nil
var images: [String] = []
var it = CommandLine.arguments.dropFirst().makeIterator()
while let a = it.next() {
    if a == "--json" { outPath = it.next() }
    else { images.append(a) }
}
let fh: FileHandle
if let p = outPath {
    FileManager.default.createFile(atPath: p, contents: nil)
    fh = FileHandle(forWritingAtPath: p)!
} else { fh = FileHandle.standardOutput }

func emit(_ s: String) { fh.write(s.data(using: .utf8)!) }

for path in images {
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: path)),
          let src = CGImageSourceCreateWithData(data as CFData, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { continue }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.recognitionLanguages = ["zh-Hans", "en-US"]
    req.usesLanguageCorrection = true
    let handler = VNImageRequestHandler(cgImage: img, options: [:])
    do { try handler.perform([req]) } catch { continue }
    let W = Double(img.width), H = Double(img.height)
    var arr: [[String: Any]] = []
    for o in (req.results ?? []) {
        guard let c = o.topCandidates(1).first else { continue }
        let b = o.boundingBox
        let x = b.origin.x * W
        let y = (1.0 - b.origin.y - b.size.height) * H
        arr.append(["x": x, "y": y, "w": b.size.width * W, "h": b.size.height * H,
                    "t": c.string, "c": Double(c.confidence)])
    }
    let obj: [String: Any] = ["image": path, "width": W, "height": H, "lines": arr]
    if let d = try? JSONSerialization.data(withJSONObject: obj), let s = String(data: d, encoding: .utf8) {
        emit(s + "\n")
    }
}
try? fh.close()
