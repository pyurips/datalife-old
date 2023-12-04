import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
    alt.log("E aí!" + player.name);
    player.dimension = player.id + 1;
});