import fs from "node:fs";
import path from "node:path";

// Server-only: real pixel size of a PNG or JPEG under public/, so screenshots
// reserve the right box before they load (no layout shift).
export function imageSize(src: string): { width: number; height: number } {
  const fallback = { width: 1600, height: 1000 };
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", src));
    if (buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) return fallback;
        const marker = buf[i + 1];
        const len = buf.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
        }
        i += 2 + len;
      }
    }
  } catch {}
  return fallback;
}
