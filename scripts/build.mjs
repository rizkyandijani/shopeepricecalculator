import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const itemsToCopy = ['index.html', 'styles.css', 'app'];

async function copyRecursive(src, dest) {
  const stats = await fs.stat(src);

  if (stats.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    await Promise.all(
      entries.map((entry) => copyRecursive(path.join(src, entry), path.join(dest, entry)))
    );
    return;
  }

  await fs.copyFile(src, dest);
}

async function build() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  await Promise.all(
    itemsToCopy.map(async (item) => {
      const srcPath = path.join(projectRoot, item);
      const destPath = path.join(distDir, item);
      await copyRecursive(srcPath, destPath);
    })
  );

  console.log(`Build complete. Output directory: ${path.relative(projectRoot, distDir)}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
