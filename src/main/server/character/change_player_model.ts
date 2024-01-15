import * as alt from 'alt-server';

function changePlayerModel(player: alt.Player, data?: any) {
  player.model = data.model;
}

export default changePlayerModel;
