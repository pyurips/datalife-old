import { Button } from '@nextui-org/react';
import { useListener } from '../../utils/use_listener';

export default function DebugCoordsPanel() {
  const playerCoords = useListener('debugMode_sendPlayerCoords');
  const playerRot = useListener('debugMode_sendPlayerRot');
  const playerSpeed = useListener('debugMode_sendPlayerSpeed');

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
