import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function WorldTeleport() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <Input placeholder="X" />
        <Input placeholder="Y" />
        <Input placeholder="Z" />
        <Button>Teleportar</Button>
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
