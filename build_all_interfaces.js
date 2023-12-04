import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const srcPath = './src/webviews';

function buildWebviews() {
  fs.readdir(srcPath, (err, folders) => {
    if (err) {
      console.error('Error reading webviews folders:', err);
      return;
    }

    folders.forEach(folder => {
      const folderPath = path.join(srcPath, folder);

      fs.stat(folderPath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for ${folder}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          const buildCommand = 'npm run build';
          const options = { cwd: folderPath };

          exec(buildCommand, options, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error building ${folder}:`, error);
              return;
            }

            console.log(`Built ${folder} successfully:\n${stdout}`);
          });
        }
      });
    });
  });
}

// Run the buildWebviews function
buildWebviews();
