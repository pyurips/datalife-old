import * as alt from 'alt-client';
import { webView_emitCustomClientEventToMainWebView } from './webview.js';

export function player_emitCharacterDataToMainWebView(key: string, value: any) {
  if (key === 'character') {
    const player = alt.Player.local;
    if (!player?.valid) return;
    if (!player.hasStreamSyncedMeta('character')) return;
    return webView_emitCustomClientEventToMainWebView(
      'player_getCharacterData',
      value
    );
  }
}

export async function player_dropBelongingsItem(data: unknown) {
  return await alt.emitRpc('player_dropBelongingsItem', data);
}

export default {
  player_dropBelongingsItem,
};
