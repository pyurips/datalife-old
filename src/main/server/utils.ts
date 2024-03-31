import * as alt from 'alt-server';

class Utils {
  static sendClientError(
    internalCode: number,
    showInternalCode = true,
    message?: string
  ) {
    const clientError = new Error(
      (message ||
        'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.') +
        `${showInternalCode && ` (${internalCode})`}`
    );
    clientError.name = 'DATALIFEClientError';
    return clientError;
  }

  static emitter(
    player: alt.Player,
    emitTo: 'client' | 'mainInterface',
    who: 'all' | 'unique',
    eventName: string,
    data?: unknown
  ) {
    if (emitTo === 'client') {
      if (who === 'unique') return alt.emitClientRaw(player, eventName, data);
      if (who === 'all') return alt.emitAllClientsRaw(eventName, data);
    }
  
    if (emitTo === 'mainInterface') {
      if (who === 'unique')
        return alt.emitClientRaw(player, 'emitToMainInterface', eventName, data);
      if (who === 'all')
        return alt.emitAllClientsRaw('emitToMainInterface', eventName, data);
    }
  }
}

export default Utils;
