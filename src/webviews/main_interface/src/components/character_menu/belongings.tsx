import { Input } from '@/components/ui/input';
import { player_getCharacterData } from '@/utils/use_requester';
import { FaSearch } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaWeightHanging } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';
import { VscLoading } from 'react-icons/vsc';

export default function Belongings() {
  const { fetch, data, loading } = player_getCharacterData();

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

      {data && 'error' in data && (
        <>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-[1.2vw]">{data.error}</p>
          </div>
        </>
      )}

      {!loading && data && 'belongings' in data && (
        <ScrollArea className="flex flex-1">
          <section className="flex flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
            {data?.belongings.map((e) => (
              <p>{e.id}</p>
            ))}
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
