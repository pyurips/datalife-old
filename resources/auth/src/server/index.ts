import * as alt from 'alt-server';
// @ts-ignore
import * as utils from 'alt:utils';

alt.on('playerConnect', (player) => {
    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    player.giveWeapon('WEAPON_PUMPSHOTGUN', 500, true);
    utils.testarImportacao();
});