import Foundation
import ImageIO
import CoreGraphics
import UniformTypeIdentifiers

// Usage: crop ops.json  (array of {src,x,y,w,h,out,trim})
struct Op: Decodable { let src: String; let x: Int; let y: Int; let w: Int; let h: Int; let out: String; let trim: Bool? }

func trimmed(_ cg: CGImage, threshold: UInt8 = 200, pad: Int = 6) -> CGImage? {
    let w = cg.width, h = cg.height
    guard w > 2, h > 2 else { return nil }
    var buf = [UInt8](repeating: 255, count: w * h * 4)
    let cs = CGColorSpaceCreateDeviceRGB()
    guard let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8,
                              bytesPerRow: w * 4, space: cs,
                              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return nil }
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
    var minX = w, maxX = -1, minY = h, maxY = -1
    var dark = 0
    for y in 0..<h {
        for x in 0..<w {
            let i = (y * w + x) * 4
            let lum = (Int(buf[i]) * 299 + Int(buf[i+1]) * 587 + Int(buf[i+2]) * 114) / 1000
            if lum < Int(threshold) {
                dark += 1
                if x < minX { minX = x }; if x > maxX { maxX = x }
                if y < minY { minY = y }; if y > maxY { maxY = y }
            }
        }
    }
    if maxX < 0 || dark < w * h / 2000 { return nil }
    let x0 = max(0, minX - pad), y0 = max(0, minY - pad)
    let x1 = min(w, maxX + pad + 1), y1 = min(h, maxY + pad + 1)
    return cg.cropping(to: CGRect(x: x0, y: y0, width: x1 - x0, height: y1 - y0))
}

let data = try! Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1]))
let ops = try! JSONDecoder().decode([Op].self, from: data)
var cache: [String: CGImage] = [:]
var n = 0
for op in ops {
    let img: CGImage
    if let c = cache[op.src] { img = c }
    else {
        guard let d = try? Data(contentsOf: URL(fileURLWithPath: op.src)),
              let s = CGImageSourceCreateWithData(d as CFData, nil),
              let i = CGImageSourceCreateImageAtIndex(s, 0, nil) else { continue }
        cache[op.src] = i; img = i
        if cache.count > 3 { cache.removeAll(); cache[op.src] = i }
    }
    let x = max(0, min(op.x, img.width - 1))
    let y = max(0, min(op.y, img.height - 1))
    let w = max(1, min(op.w, img.width - x))
    let h = max(1, min(op.h, img.height - y))
    guard var cg = img.cropping(to: CGRect(x: x, y: y, width: w, height: h)) else { continue }
    if op.trim ?? false {
        guard let t = trimmed(cg) else { continue }
        cg = t
    }
    let url = URL(fileURLWithPath: op.out) as CFURL
    guard let dest = CGImageDestinationCreateWithURL(url, UTType.png.identifier as CFString, 1, nil) else { continue }
    CGImageDestinationAddImage(dest, cg, nil)
    if CGImageDestinationFinalize(dest) { n += 1 }
}
print("cropped \(n)/\(ops.count)")
