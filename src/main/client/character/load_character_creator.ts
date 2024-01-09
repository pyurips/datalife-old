import * as alt from 'alt-client';

alt.onServer('request:character_loadCreator', () => {
  alt.setMeta('currentScreen', 'characterCreator');
});