import * as alt from 'alt-client';
import defaultCharacterBehaviors from '../character/default_behaviors.js';
import { sendDebugInfos } from '../admin/debug_mode.js';

alt.everyTick(() => {
  defaultCharacterBehaviors();
  sendDebugInfos();
});
