import Belongings from '@/components/character_menu/belongings';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { MdInventory } from 'react-icons/md';

export default function CharacterMenu() {
  const [option, setOption] = useState<'character' | 'belongings'>('character');

  return (
    <div className="flex flex-row w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden">
      <div className="flex flex-1 py-[1vw] pl-[1vw]">
        { option === "belongings" && <Belongings /> }
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-[1vw] p-[1vw]">
          <Button
            style={{ opacity: option === 'character' ? 1 : 0.5 }}
            className="p-[1vw] h-min"
            onClick={() => setOption('character')}
          >
            <IoPersonCircle className="text-[2vw]" />
          </Button>
          <Button
            style={{ opacity: option === 'belongings' ? 1 : 0.5 }}
            className="p-[1vw] h-min"
            onClick={() => setOption('belongings')}
          >
            <MdInventory className="text-[2vw]" />
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
