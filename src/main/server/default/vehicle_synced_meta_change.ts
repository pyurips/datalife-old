import * as alt from 'alt-server';

alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
  if (entity instanceof alt.Vehicle) {
    if (key === 'vehicleData') {
      entity.engineOn = value.engineState;
      entity.engineHealth = value.engineHealth;
      entity.numberPlateIndex = value.numberPlateStyle;
      entity.numberPlateText = value.numberPlateText;
      entity.lockState = value.locked;
      entity.engineHealth = value.engineHealth;
      entity.dirtLevel = value.dirtLevel;
    }
  }
});