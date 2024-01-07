import * as alt from 'alt-client';
import * as native from 'natives';

const EVENT_NAME = 'character_setHairModel';

alt.on(
  `request:${EVENT_NAME}`,
  ({
    collection,
    overlay,
    model,
  }: {
    collection: string;
    overlay: string;
    model: number;
  }) => {
    const collectionHash = native.getHashKey(collection);
    const overlayHash = native.getHashKey(overlay);
    native.addPedDecorationFromHashes(
      alt.Player.local,
      collectionHash,
      overlayHash
    );
    native.setPedComponentVariation(alt.Player.local, 2, model, 0, 0);
  }
);
