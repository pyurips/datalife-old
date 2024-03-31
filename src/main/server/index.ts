import 'dotenv/config';
import Default from './default.js';

const initialize = new Default();
initialize.onPlayerConnect();
initialize.onEverySecond();
initialize.turnOnRpc();
