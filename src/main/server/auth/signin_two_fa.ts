import * as alt from 'alt-server';

function twoFa(player: alt.Player, data?: unknown) {
  alt.log(player.name);
  alt.log(data);
  alt.log("Chamou mesmo a função rpc?");
}

export default twoFa;