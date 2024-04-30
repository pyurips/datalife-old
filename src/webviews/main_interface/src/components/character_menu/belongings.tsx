import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaWeightHanging } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';
import { VscLoading } from 'react-icons/vsc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getItem } from '@/utils/items_list';
import { useCharacterData } from '@/contexts/player';
import bitsIconLight from '@/assets/bits_icon_light.svg';
import moneyIcon from '@/assets/money_icon.svg';
import primeIconLight from '@/assets/prime_icon_light.svg';

function getQualityColor(quality: 0 | 1 | 2) {
  if (quality === 1) return 'bg-sky-950';
  if (quality === 2) return 'bg-violet-950';
  return '';
}

export default function Belongings() {
  const characterData = useCharacterData((state) => state.characterData);

  return (
    <div className="flex flex-col w-full gap-[1vw]">
      <div className="flex flex-row gap-[3vw] items-center">
        <div className="flex flex-row gap-[0.8vw] items-center justify-center">
          <img draggable={false} className="size-[2vw]" src={moneyIcon} />
          <p className="text-[0.9vw]">
            {new Intl.NumberFormat('pt-BR', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(4555154154)}
          </p>
        </div>

        <div className="flex flex-row gap-[0.8vw] items-center justify-center">
          <img draggable={false} className="size-[2vw]" src={bitsIconLight} />
          <p className="text-[0.9vw]">
            {new Intl.NumberFormat('pt-BR', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(45554)}
          </p>
        </div>

        <img draggable={false} className="h-[2vw]" src={primeIconLight} />
      </div>

      <header className="flex flex-row items-center gap-2">
        <FaSearch className="text-[1.3vw]" />
        <Input placeholder="Procure um item pelo nome" />
      </header>

      {!characterData && (
        <div className="flex flex-1 items-center justify-center">
          <VscLoading className="text-[2vw] animate-spin" />
        </div>
      )}

      {characterData && (
        <ScrollArea className="flex flex-1">
          <section className="flex flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
            {characterData.belongings.length === 0 && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-[1.1vw] text-stone-400">
                  Você não possui nenhum item
                </p>
              </div>
            )}

            {characterData.belongings.map((e) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex flex-col w-[6vw] h-[6vw] items-center justify-between overflow-hidden rounded-[0.8vw] transition-all hover:${
                      getQualityColor(e.quality) || 'bg-stone-900'
                    } ${getQualityColor(e.quality)}`}
                  >
                    <div className="flex flex-1 items-center justify-center p-[1vw] overflow-hidden">
                      <img
                        src={getItem(e.id, 'cloth').imageSource}
                        className="w-[4vw] h-[4vw]"
                      />
                    </div>
                    <p className="text-[0.7vw] pr-[0.3vw] pb-[0.3vw] self-end">
                      {e.amount}
                    </p>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-[12vw] border-none p-[0.5vw] rounded-[0.5vw] bg-stone-900">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-[1vw]">
                      <p className="leading-[1vw] text-[1vw]">
                        {getItem(e.id, e.type).name}
                      </p>

                      <div className="flex flex-row items-center justify-between">
                        {e.quality === 0 && (
                          <p className="text-[0.8vw]">Comum</p>
                        )}
                        {e.quality === 1 && (
                          <p className="text-[0.8vw]">Incomum</p>
                        )}
                        {e.quality === 2 && (
                          <p className="text-[0.8vw]">Raro</p>
                        )}
                        <div className="flex flex-row gap-[0.2vw] items-end">
                          <p className="text-[0.8vw] text-stone-400">
                            {e.weight}
                          </p>
                          <p className="text-[0.7vw] font-semibold text-stone-400">
                            kg
                          </p>
                        </div>
                      </div>

                      <p className="leading-[1vw] text-[0.7vw] text-justify font-normal text-stone-300">
                        {getItem(e.id, e.type).description}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-stone-600" />
                  {e.usable && (
                    <DropdownMenuItem className="text-[0.8vw] rounded-[0.5vw]">
                      Usar
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-[0.8vw] text-red-400 hover:text-inherit hover:bg-red-500 focus:bg-red-500 rounded-[0.5vw]">
                    Jogar fora
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </section>
        </ScrollArea>
      )}

      {characterData && (
        <div className="flex flex-row items-center justify-between gap-[1vw]">
          <FaWeightHanging className="text-[1.5vw]" />
          <Progress
            className="h-[0.3vw]"
            value={Math.round(
              (characterData.currentWeight / characterData.weightCapacity) * 100
            )}
          />
          <div className="flex flex-row gap-[0.2vw] items-end">
            <p className="text-[1vw]">{`${characterData.currentWeight}/${characterData.weightCapacity}`}</p>
            <p className="text-[0.9vw] font-semibold">kg</p>
          </div>
        </div>
      )}
    </div>
  );
}
