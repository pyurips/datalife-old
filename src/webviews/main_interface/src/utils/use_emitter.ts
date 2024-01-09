export function useEmitter(emitTo: 'client' | 'server', eventName: string) {
  function fetchData(data: unknown) {
    if (!window.alt)
      return console.error('Não foi encontrado o método alt no objeto Window');
    window.alt.emit('emitTo', emitTo, `request:${eventName}`, data);
  }
  return {
    fetchData,
  };
}
