export function useEmitter(
  emitTo: 'client' | 'server',
  eventName: string,
  data?: unknown
) {
  if (!window.alt)
    return console.error('Não foi encontrado o método alt no objeto Window');
  return window.alt.emit('emitTo', emitTo, `request:${eventName}`, data);
}
