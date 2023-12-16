import * as alt from 'alt-client';
// @ts-ignore
import { loadMainInterface } from 'alt:webviews_handlers';

alt.on('connectionComplete', async () => {
  await loadMainInterface();
});