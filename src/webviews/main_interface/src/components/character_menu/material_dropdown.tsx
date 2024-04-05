import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function getQualityColor(quality: 0 | 1 | 2) {
  if (quality === 1) return 'bg-sky-950';
  if (quality === 2) return 'bg-violet-950';
  return '';
}

export default function MaterialDropDown({
  id,
  name,
  quantity,
  weight,
  description,
  quality,
}: {
  id: number;
  name: string;
  quantity: number;
  weight: number;
  description: string;
  quality: 0 | 1 | 2;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex flex-col w-[6vw] h-[6vw] items-center justify-between overflow-hidden rounded-[0.8vw] transition-all hover:${
            getQualityColor(quality) || 'bg-stone-900'
          } ${getQualityColor(quality)}`}
        >
          <div className="flex flex-1 items-center justify-center p-[1vw] overflow-hidden">
            <img
              src={`/src/assets/items/material_${id}.svg`}
              className="w-[4vw] h-[4vw]"
            />
          </div>
          <p className="text-[0.7vw] pr-[0.3vw] pb-[0.3vw] self-end">
            {quantity}
          </p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[12vw] border-none p-[0.5vw] rounded-[1vw] bg-stone-900">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-[1vw]">
            <p className="leading-[1vw] text-[1vw]">{name}</p>

            <div className="flex flex-row items-center justify-between">
              {quality === 0 && <p className="text-[0.8vw]">Comum</p>}
              {quality === 1 && <p className="text-[0.8vw]">Incomum</p>}
              {quality === 2 && <p className="text-[0.8vw]">Raro</p>}
              <div className="flex flex-row gap-[0.2vw] items-end">
                <p className="text-[0.8vw] text-stone-400">{weight}</p>
                <p className="text-[0.7vw] font-semibold text-stone-400">kg</p>
              </div>
            </div>

            <p className="leading-[1vw] text-[0.7vw] text-justify font-normal text-stone-300">
              {description}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-stone-600" />
        <DropdownMenuItem className="text-[0.8vw]">Usar</DropdownMenuItem>
        <DropdownMenuItem className="text-[0.8vw] text-red-400 hover:text-inherit hover:bg-red-500 focus:bg-red-500">
          Jogar fora
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
