import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 8000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
};
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = resolve(
      root,
      "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname),
    );
    if (
      !file.startsWith(root + sep) ||
      pathname.split("/").some((part) => part.startsWith("."))
    ) {
      response.writeHead(403).end("Acceso no permitido");
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    const data = await readFile(file);
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const headers = {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
    };
    if (range) {
      const start = Number(range[1]);
      const end = range[2]
        ? Math.min(Number(range[2]), data.length - 1)
        : data.length - 1;
      if (start > end || start >= data.length) {
        response
          .writeHead(416, { "Content-Range": `bytes */${data.length}` })
          .end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${data.length}`,
        "Content-Length": end - start + 1,
      });
      response.end(
        request.method === "HEAD" ? undefined : data.subarray(start, end + 1),
      );
    } else {
      response.writeHead(200, { ...headers, "Content-Length": data.length });
      response.end(request.method === "HEAD" ? undefined : data);
    }
  } catch {
    response
      .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Archivo no encontrado");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Portafolio: http://127.0.0.1:${port}`),
);
