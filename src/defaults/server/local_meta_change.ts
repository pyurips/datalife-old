import * as alt from 'alt-server';

alt.on('localMetaChange', (player, key, newValue, oldValue) => {
  // This event gets called when a local meta changes
  // You can also check it yourself by using the alt.hasLocalMeta & alt.getLocalMeta methods
  //if (alt.hasLocalMeta('metaKey')) {
  //const metaValue = alt.getLocalMeta('metaKey');
  // <Do something with the value>
  //}
});
