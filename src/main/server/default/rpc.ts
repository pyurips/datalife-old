import * as alt from 'alt-server';
import operations from '../utils/operations';

alt.onRpc('rpc', async (player, operationName: string, data?: unknown) => {
  const operation = operations[operationName];
  if (!operation)
    return alt.logError(`O nome da operação (${operationName}) não existe`); // Aqui na verdade retornará um objeto de erro para o cliente, o cliente terá que tratar lá no rpc client
  return operation.constructor.name === 'AsyncFunction'
    ? await operation(player, data)
    : operation(player, data);
});
