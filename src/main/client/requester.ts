import * as alt from 'alt-client';

async function requester(
  operation: string,
  data?: unknown
) {
  const splitedOperation = operation.split('_');
  if (splitedOperation[0] === 'client') return // TODO: Implement client operations
  return await alt.emitRpc(
    'rpc',
    splitedOperation[1],
    splitedOperation[2],
    data
  );
}

export default requester;
