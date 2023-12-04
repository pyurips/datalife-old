import * as alt from 'alt-client';
// @ts-ignore
import { loadMainInterface } from 'alt:interfaces';

alt.on('connectionComplete', async () => {
  await loadMainInterface();
});