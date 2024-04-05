import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaWeightHanging } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';
import useRequester from '@/utils/use_requester';
import { VscLoading } from 'react-icons/vsc';
import ClothDropDown from './cloth_dropdown';
import MaterialDropDown from './material_dropdown';
import ConsumableDropDown from './consumable_dropdown';

export default function Belongings() {
  const { data, fetch, loading } = useRequester(
    ['server_character_getBelongings'],
    false
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex flex-col w-full gap-[1vw]">
      <header className="flex flex-row items-center gap-2">
        <FaSearch className="text-[1.3vw]" />
        <Input placeholder="Procure um item pelo nome" />
      </header>

      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <VscLoading className="text-[2vw] animate-spin" />
        </div>
      )}

      {!loading && (
        <ScrollArea className="flex flex-1">
          <section className="flex flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
            {data[0]?.map(
              (e: {
                id: number;
                name: string;
                quantity: number;
                weight: number;
                description: string;
                quality: 0 | 1 | 2;
                type: 'cloth' | 'material' | 'consumable';
              }) => {
                if (e?.type === 'cloth') {
                  return (
                    <ClothDropDown
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      quantity={e.quantity}
                      weight={e.weight}
                      description={e.description}
                      quality={e.quality}
                    />
                  );
                }
                if (e?.type === 'material') {
                  return (
                    <MaterialDropDown
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      quantity={e.quantity}
                      weight={e.weight}
                      description={e.description}
                      quality={e.quality}
                    />
                  );
                }
                if (e?.type === 'consumable') {
                  return (
                    <ConsumableDropDown
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      quantity={e.quantity}
                      weight={e.weight}
                      description={e.description}
                      quality={e.quality}
                    />
                  );
                }
              }
            )}
          </section>
        </ScrollArea>
      )}

      {!loading && (
        <div className="flex flex-row items-center justify-between gap-[1vw]">
          <FaWeightHanging className="text-[1.5vw]" />
          <Progress color="bg-green-500" className="h-[0.3vw]" value={90} />
          <div className="flex flex-row gap-[0.2vw] items-end">
            <p className="text-[1vw]">110/120</p>
            <p className="text-[0.9vw] font-semibold">kg</p>
          </div>
        </div>
      )}
    </div>
  );
}
