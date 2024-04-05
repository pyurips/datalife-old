import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function WorldTeleport() {
  const [toCoords, setToCoords] = useState({ x: '', y: '', z: '' });

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <Input
          placeholder="X"
          value={toCoords.x}
          onChange={(value) =>
            setToCoords((prev) => ({ ...prev, x: value.target.value }))
          }
        />
        <Input
          placeholder="Y"
          value={toCoords.y}
          onChange={(value) =>
            setToCoords((prev) => ({ ...prev, y: value.target.value }))
          }
        />
        <Input
          placeholder="Z"
          value={toCoords.z}
          onChange={(value) =>
            setToCoords((prev) => ({ ...prev, z: value.target.value }))
          }
        />
        <Button onClick={() => {}}>Teleportar</Button>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <Input placeholder="ID do jogador" />
        <p>para</p>
        <Input placeholder="ID do jogador" />
        <Button>Teleportar</Button>
      </div>
    </div>
  );
}
