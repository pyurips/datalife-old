import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function copyResourceFiles(srcPath, destPath) {
  try {
    const srcFolders = await readdir(srcPath, { withFileTypes: true });

    for (const folder of srcFolders) {
      if (folder.isDirectory()) {
        const srcFolderPath = path.join(srcPath, folder.name);
        const destFolderPath = path.join(destPath, folder.name);

        const srcFiles = await readdir(srcFolderPath);
        const resourceFile = srcFiles.find(file => file === 'resource.toml');

        if (resourceFile) {
          await copyFile(path.join(srcFolderPath, resourceFile), path.join(destFolderPath, resourceFile));
          console.log(`Copied ${resourceFile} from ${srcFolderPath} to ${destFolderPath}`);
        }
      }
    }

    console.log('Copy process completed.');
  } catch (error) {
    console.error('Error copying resource files:', error);
  }
}

// Usage example:
const srcPath = './src';
const destPath = './resources';

copyResourceFiles(srcPath, destPath);
