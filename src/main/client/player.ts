import * as alt from 'alt-client';
import { webView_emitCustomClientEventToMainWebView } from './webview.js';

export function player_emitCharacterDataToMainWebView(key: string, value: any) {
  if (key === 'character') {
    const player = alt.Player.local;
    if (!player?.valid) return;
    if (!player.hasStreamSyncedMeta('character')) return;
    return webView_emitCustomClientEventToMainWebView('client_getCharacterData', value);
  }
}
