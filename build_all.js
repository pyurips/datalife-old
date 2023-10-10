const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const pastaResources = './resources';

fs.readdir(pastaResources, (err, pastas) => {
  if (err) {
    console.error(`Erro ao listar pastas em ${pastaResources}: ${err}`);
    return;
  }

  pastas.forEach(pasta => {
    const caminhoPasta = path.join(pastaResources, pasta);
    const caminhoPackageJson = path.join(caminhoPasta, 'package.json');

    if (fs.existsSync(caminhoPackageJson)) {
      exec('npm run build', { cwd: caminhoPasta }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar "npm run build" em ${caminhoPasta}: ${error.message}`);
        } else {
          console.log(`Build do resource ${pasta} concluído com sucesso`);
        }
      });

      const caminhoWebview = path.join(caminhoPasta, 'webview');

      if (fs.existsSync(caminhoWebview)) {        
        exec('npm run build', { cwd: caminhoWebview }, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao executar "npm run build" em ${caminhoWebview}: ${error.message}`);
          } else {
            console.log(`Build do webview ${pasta} concluído com sucesso`);
          }
        });
      }
    }
  });
});
