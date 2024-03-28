import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useRequester from '@/utils/use_requester';
import { useState } from 'react';

export default function WorldTeleport() {
  const [toCoords, setToCoords] = useState({ x: '', y: '', z: '' });

  const { responseData: toCoordsData, fetchData: toCoordsFetch } = useRequester(
    'admin_world_tele_to_coords',
    false
  );

  return (
    <div className="w-full flex flex-col gap-3">
      {toCoordsData?.error && (
        <p className="text-red-500 text-[0.9vw] px-[1vw]">
          {toCoordsData?.error}
        </p>
      )}

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
        <Button onClick={() => toCoordsFetch(toCoords)}>Teleportar</Button>
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
