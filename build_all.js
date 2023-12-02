const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const pastaResources = './resources';

function runNpmInstall(caminho) {
  return new Promise((resolve, reject) => {
    exec('npm install', { cwd: caminho }, (error, stdout, stderr) => {
      if (error) {
        reject(`Erro ao executar "npm install" em ${caminho}: ${error.message}`);
      } else {
        resolve(`"npm install" em ${caminho} concluído com sucesso`);
      }
    });
  });
}

function runNpmBuild(caminho) {
  return new Promise((resolve, reject) => {
    exec('npm run build', { cwd: caminho }, (error, stdout, stderr) => {
      if (error) {
        reject(`Erro ao executar "npm run build" em ${caminho}: ${error.message}`);
      } else {
        resolve(`"npm run build" em ${caminho} concluído com sucesso`);
      }
    });
  });
}

async function processaPasta(caminhoPasta) {
  try {
    // Executar npm install na pasta
    console.log(await runNpmInstall(caminhoPasta));

    // Executar npm run build na pasta
    console.log(await runNpmBuild(caminhoPasta));

    // Se existir a subpasta "webview", executar npm install e npm run build
    const caminhoWebview = path.join(caminhoPasta, 'webview');
    if (fs.existsSync(caminhoWebview)) {
      console.log(await runNpmInstall(caminhoWebview));
      console.log(await runNpmBuild(caminhoWebview));
    }
  } catch (error) {
    console.error(error);
  }
}

fs.readdir(pastaResources, async (err, pastas) => {
  if (err) {
    console.error(`Erro ao listar pastas em ${pastaResources}: ${err}`);
    return;
  }

  for (const pasta of pastas) {
    const caminhoPasta = path.join(pastaResources, pasta);
    await processaPasta(caminhoPasta);
  }
});
