import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
    console.log("E aí!" + player.name);
    player.dimension = player.id + 1;
});