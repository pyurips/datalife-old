import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaWeightHanging } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';
import useRequester from '@/utils/use_requester';

export default function Belongings() {
  const { data: data_1, fetch: fetch_1 } = useRequester(
    'server_character_getBelongings',
    false
  );

  useEffect(() => {
    fetch_1();
  }, []);

  useEffect(() => {
    if (data_1) console.log(data_1);
  }, [data_1]);

  return (
    <div className="flex flex-col w-full gap-[1vw]">
      <header className="flex flex-row items-center gap-2">
        <FaSearch className="text-[1.3vw]" />
        <Input />
      </header>

      <ScrollArea>
        <section className="flex flex-1 flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
          {data_1 &&
            data_1?.map((item: any) => (
              <DropdownMenu key={item.id}>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col w-[6vw] h-[6vw] bg-stone-900 items-end overflow-hidden rounded-[0.8vw] transition-all active:bg-stone-800">
                    <div className="flex flex-1 items-center justify-center"></div>
                    <p className="text-[0.8vw] p-[0.3vw]">{item.quantity}</p>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-[15vw] bg-stone-950 border-none p-[0.5vw] rounded-[1vw]">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-[1vw]">
                      <p className="leading-[1vw] text-[0.9vw]">{item.name}</p>

                      <div className="flex flex-row items-center justify-between">
                        <p className="text-[0.8vw]">Qualidade</p>
                        <div className="flex flex-row gap-[0.2vw] items-end">
                          <p className="text-[1vw]">{item.weight}</p>
                          <p className="text-[0.9vw] font-semibold">kg</p>
                        </div>
                      </div>

                      <p className="leading-[1vw] text-[0.8vw] text-justify">
                        {item.description}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-stone-600" />
                  <DropdownMenuItem className="text-[0.8vw]">
                    Usar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[0.8vw]">
                    Jogar fora
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          {new Array(50).fill(0).map((_, i) => (
            <DropdownMenu key={i}>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col w-[6vw] h-[6vw] bg-stone-900 items-end overflow-hidden rounded-[0.8vw] transition-all active:bg-stone-800">
                  <div className="flex flex-1 items-center justify-center"></div>
                  <p className="text-[0.8vw] p-[0.3vw]">2151</p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-[15vw] bg-stone-950 border-none p-[0.5vw] rounded-[1vw]">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-[1vw]">
                    <p className="leading-[1vw] text-[0.9vw]">
                      Roupa esquisita amarela branca verde
                    </p>

                    <div className="flex flex-row items-center justify-between">
                      <p className="text-[0.8vw]">Qualidade</p>
                      <div className="flex flex-row gap-[0.2vw] items-end">
                        <p className="text-[1vw]">20</p>
                        <p className="text-[0.9vw] font-semibold">kg</p>
                      </div>
                    </div>

                    <p className="leading-[1vw] text-[0.8vw] text-justify">
                      Descrição bem esquisita dessa roupa esquisita
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-stone-600" />
                <DropdownMenuItem className="text-[0.8vw]">
                  Usar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[0.8vw]">
                  Jogar fora
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </section>
      </ScrollArea>

      <div className="flex flex-row items-center justify-between gap-[1vw]">
        <FaWeightHanging className="text-[1.5vw]" />
        <Progress color="bg-green-500" className="h-[0.3vw]" value={100} />
        <div className="flex flex-row gap-[0.2vw] items-end">
          <p className="text-[1vw]">110/120</p>
          <p className="text-[0.9vw] font-semibold">kg</p>
        </div>
      </div>
    </div>
  );
}
