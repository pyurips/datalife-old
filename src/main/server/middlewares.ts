import { player_getAccountMeta } from "./player.js";
import * as alt from "alt-server";
import { sendClientError } from "./utils.js";

export function checkPlayer(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440399);
  //const accountMeta = player_getAccountMeta(player);
  //if (!accountMeta.id) throw sendClientError(1713620728);
}