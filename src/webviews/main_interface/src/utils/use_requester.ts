import { useState } from 'react';

function useRequester(
  to: 'server' | 'client',
  operation: string,
  startLoading: boolean
) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [data, setData] = useState<any>();

  function fetch(requestData?: unknown) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    window.alt.once(`response:${operation}`, (response: any) => {
      setData(response);
      return setLoading(false);
    });
    return window.alt.emit('request', to, operation, requestData);
  }

  return {
    data,
    fetch,
    loading,
  };
}

export function auth_signInTest(): {
  data: { error: string } | undefined;
  fetch: () => void;
  loading: boolean;
} {
  return useRequester('client', 'auth_signinTest', false);
}

export function player_getCharacterData(): {
  fetch: () => void;
  loading: boolean;
  data:
    | {
        health: number;
        stamina: number;
        money: number;
        bank: number;
        level: number;
        experience: { value: number; rate: number };
        belongings: {
          id: number;
          type: 'consumable' | 'material' | 'cloth';
          quality: 0 | 1 | 2;
          amount: number;
          weight: number;
          usable: boolean;
        }[];
        weightCapacity: number;
        currentWeight: number;
        hotkeysSlots: { id: number; slot: number }[];
        needs: {
          hunger: { value: number; rate: number };
          thirst: { value: number; rate: number };
          fatigue: { value: number; rate: number };
          bathroom: { value: number; rate: number };
          hygiene: { value: number; rate: number };
        };
        conditions: {
          id: number;
          level: number;
          rate: number;
        }[];
        skills: {
          id: Number;
          level: number;
          experience: number;
          rate: number;
        }[];
      }
    | { error: string }
    | undefined;
} {
  return useRequester('server', 'player_getCharacterData', true);
}
