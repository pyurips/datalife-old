import * as alt from 'alt-client';
import getOperation from './operations.js';

async function requester(operation: string, data?: unknown) {
  const splitedOperation = operation.split('_');
  if (splitedOperation[0] === 'client')
    return await getOperation(splitedOperation[1], splitedOperation[2])(data);
  return await alt.emitRpc(
    'rpc',
    splitedOperation[1],
    splitedOperation[2],
    data
  );
}

export default requester;
