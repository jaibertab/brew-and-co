#!/usr/bin/env node
// Downloads an image from a URL, resizes it, converts it to webp, and writes
// it into public/images/. Run from the project root.
//
// Single image:
//   node .claude/skills/optimize-stock-image/scripts/optimize-image.mjs \
//     --url <image-url> --out <menu/house-espresso> [--width 1200] [--height 900] [--quality 82] [--force]
//
// Batch (manifest is a JSON array of the same options, camelCase keys):
//   node .claude/skills/optimize-stock-image/scripts/optimize-image.mjs --manifest <path/to/manifest.json>
//
//   [{ "url": "...", "out": "menu/house-espresso", "width": 1200 }, ...]

import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();
const IMAGES_ROOT = path.join(PROJECT_ROOT, "public", "images");
const DEFAULT_WIDTH = 1600;
const DEFAULT_QUALITY = 82;

function parseArgs(argv) {
  const args = { force: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const value = argv[++i];
    args[key] = value;
  }
  return args;
}

function resolveOutPath(out) {
  const cleaned = out.replace(/\.(webp|jpe?g|png)$/i, "");
  const abs = path.join(IMAGES_ROOT, `${cleaned}.webp`);
  if (!abs.startsWith(IMAGES_ROOT + path.sep)) {
    throw new Error(`Refusing to write outside public/images: ${out}`);
  }
  return abs;
}

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchImageBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (image-fetch-skill)" },
  });
  if (!res.ok) {
    throw new Error(`Fetch failed (${res.status} ${res.statusText}): ${url}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(
      `URL did not return an image (content-type: "${contentType}"). ` +
        `Pexels page URLs (pexels.com/photo/...) aren't direct image files — ` +
        `use the actual image CDN link (images.pexels.com/photos/...).`,
    );
  }
  return Buffer.from(await res.arrayBuffer());
}

async function processOne(job) {
  const { url, out, force } = job;
  if (!url || !out) {
    throw new Error(`Each job needs "url" and "out": ${JSON.stringify(job)}`);
  }
  const width = job.width ? Number(job.width) : job.height ? undefined : DEFAULT_WIDTH;
  const height = job.height ? Number(job.height) : undefined;
  const quality = job.quality ? Number(job.quality) : DEFAULT_QUALITY;

  const destPath = resolveOutPath(out);
  if (!force && (await fileExists(destPath))) {
    console.log(`skip  (exists, use --force to overwrite): ${path.relative(PROJECT_ROOT, destPath)}`);
    return;
  }

  const sourceBuffer = await fetchImageBuffer(url);
  const resized = sharp(sourceBuffer).resize({
    width,
    height,
    fit: height ? "cover" : "inside",
    position: "centre",
    withoutEnlargement: true,
  });
  const outputBuffer = await resized.webp({ quality }).toBuffer();
  const meta = await sharp(outputBuffer).metadata();

  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, outputBuffer);

  const kb = (n) => `${(n / 1024).toFixed(0)}kB`;
  console.log(
    `wrote ${path.relative(PROJECT_ROOT, destPath)}  ` +
      `${meta.width}x${meta.height}  ${kb(sourceBuffer.length)} -> ${kb(outputBuffer.length)}`,
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let jobs;
  if (args.manifest) {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(path.resolve(PROJECT_ROOT, args.manifest), "utf8");
    jobs = JSON.parse(raw);
    if (!Array.isArray(jobs)) throw new Error("Manifest must be a JSON array of jobs.");
    if (args.force) jobs = jobs.map((j) => ({ ...j, force: true }));
  } else {
    if (!args.url || !args.out) {
      console.error(
        "Usage: optimize-image.mjs --url <image-url> --out <relative/path> [--width N] [--height N] [--quality N] [--force]\n" +
          "   or: optimize-image.mjs --manifest <path/to/manifest.json>",
      );
      process.exitCode = 1;
      return;
    }
    jobs = [args];
  }

  let failures = 0;
  for (const job of jobs) {
    try {
      await processOne(job);
    } catch (err) {
      failures++;
      console.error(`FAILED ${job.out ?? "(unknown)"}: ${err.message}`);
    }
  }

  if (failures > 0) {
    console.error(`${failures} of ${jobs.length} job(s) failed.`);
    process.exitCode = 1;
  }
}

main();
