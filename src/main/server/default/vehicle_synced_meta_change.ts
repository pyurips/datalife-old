import * as alt from 'alt-server';

alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
  if (entity instanceof alt.Vehicle) {
    if (key === 'vehicleData') {
      entity.engineOn = value.engineState;
      entity.engineHealth = value.engineHealth;
      
    }
  }
});