import { Button } from '@nextui-org/react';
import { useListener } from '../../utils/use_listener';
import { useEffect } from 'react';

export default function DebugCoordsPanel() {
  const { response: playerCoords, turnOffEvent: turnOffEventCoords } =
    useListener('debugMode_sendPlayerCoords');
  const { response: playerRot, turnOffEvent: turnOffEventRot } = useListener(
    'debugMode_sendPlayerRot'
  );
  const { response: playerSpeed, turnOffEvent: turnOffEventSpeed } =
    useListener('debugMode_sendPlayerSpeed');

  useEffect(() => {
    return () => {
      turnOffEventCoords();
      turnOffEventRot();
      turnOffEventSpeed();
    };
  }, []);

  return (
    <div className="flex flex-col bg-stone-800/[.9] rounded-lg p-2 gap-2">
      <p className="text-sm">x: {playerCoords?.x || 'Indefinido'}</p>
      <p className="text-sm">y: {playerCoords?.y || 'Indefinido'}</p>
      <p className="text-sm">z: {playerCoords?.z || 'Indefinido'}</p>
      <p className="text-sm">rot x: {playerRot?.x || 'Indefinido'}</p>
      <p className="text-sm">rot y: {playerRot?.y || 'Indefinido'}</p>
      <p className="text-sm">rot z: {playerRot?.z || 'Indefinido'}</p>
      <p className="text-sm">spd: {playerSpeed?.speed || 'Indefinido'}</p>
      <Button onPress={() => {}} variant="solid" color="primary">
        Copiar coordenadas
      </Button>
    </div>
  );
}
