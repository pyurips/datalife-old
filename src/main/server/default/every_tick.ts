import * as alt from 'alt-server';
import fuelHandler from '../vehicle/fuel_handler';

alt.everyTick(() => {
  fuelHandler();
});
