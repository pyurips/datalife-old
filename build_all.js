const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const pastaResources = './resources'; // Substitua pelo caminho da pasta "resources"

fs.readdir(pastaResources, (err, pastas) => {
  if (err) {
    console.error(`Erro ao listar pastas em ${pastaResources}: ${err}`);
    return;
  }

  pastas.forEach(pasta => {
    const caminhoPasta = path.join(pastaResources, pasta);
    const caminhoPackageJson = path.join(caminhoPasta, 'package.json');

    if (fs.existsSync(caminhoPackageJson)) {
      console.log(`Executando "npm run build" em ${caminhoPasta}`);

      exec('npm run build', { cwd: caminhoPasta }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar "npm run build" em ${caminhoPasta}: ${error.message}`);
        } else {
          console.log(`"npm run build" em ${caminhoPasta} concluído:`);
          console.log(stdout);
        }
      });

      const caminhoWebview = path.join(caminhoPasta, 'webview');

      if (fs.existsSync(caminhoWebview)) {
        console.log(`Entrando em ${caminhoWebview}`);
        
        exec('npm run build', { cwd: caminhoWebview }, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao executar "npm run build" em ${caminhoWebview}: ${error.message}`);
          } else {
            console.log(`"npm run build" em ${caminhoWebview} concluído:`);
            console.log(stdout);
          }
        });
      }
    }
  });
});
