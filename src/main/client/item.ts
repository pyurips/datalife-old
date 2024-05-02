import * as alt from 'alt-client';

export function item_initializeClearDropById() {
  alt.onServer('client_item_clearDropById', (id: number) => {
    alt.LocalObject.all.forEach(async (object) => {
      if (!object?.valid) return;
      if (!object.hasMeta('virtualEntityId')) return;
      const virtualEntityId = object.getMeta('virtualEntityId') as number;
      if (virtualEntityId === id) return object.destroy();
    });
  });
}
