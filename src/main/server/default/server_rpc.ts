import * as alt from 'alt-server';

alt.onRpc('serverRpc', () => {
  alt.log('Oxente, foi o rpc?');
  return {
    mensagem: 'testando aqui',
  };
});
