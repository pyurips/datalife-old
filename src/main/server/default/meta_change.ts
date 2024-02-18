import * as alt from 'alt-server';

alt.on('metaChange', (target, key, value, oldValue) => {
  alt.log(key);
  alt.log("OXWENTE")
  if (target instanceof alt.Vehicle) {
    alt.log(target);
    alt.log(key);
  }
});
