import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
    player.dimension = player.id + 1;
});