import * as alt from 'alt-server';
import { mainWebViewEvents } from './types.js';

export function sendClientError(
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

export function emitToMainWebViewUnique(
  player: alt.Player,
  event: mainWebViewEvents,
  data?: unknown
) {
  alt.emitClientRaw(player, 'emitCustomServerEventToMainWebView', event, data);
}

export function emitToMainWebViewAll(event: mainWebViewEvents, data?: unknown) {
  alt.emitAllClientsRaw('emitCustomServerEventToMainWebView', event, data);
}
