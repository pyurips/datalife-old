import * as alt from 'alt-server';

export function changePlayerDimension(player: alt.Player, dimension: number) {
  return (player.dimension = dimension);
}
