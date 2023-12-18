import * as alt from 'alt-server';

const EVENT_NAME = 'auth_enterGame';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

alt.on(`request:${EVENT_NAME}`, (player: alt.Player) => {
  alt.log(`O jogador ${player.name} logou!`);
});