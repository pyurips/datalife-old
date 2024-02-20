import * as alt from 'alt-server';
import fuelHandler from '../vehicle/fuel_handler.js';

new alt.Utils.Interval(() => {
  fuelHandler();
}, 1000);