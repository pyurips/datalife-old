import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TestDropDown() {
  return new Array(5).fill(0).map((_, i) => (
    <DropdownMenu key={i}>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col w-[6vw] h-[6vw] items-center justify-between overflow-hidden rounded-[0.8vw] transition-all hover:bg-stone-900 bg-sky-950">
          <div className="flex flex-1 items-center justify-center p-[1vw] overflow-hidden">
            <img
              src="/src/assets/items/material_0.svg"
              className="w-[4vw] h-[4vw]"
            />
          </div>
          <p className="text-[0.7vw] pr-[0.3vw] pb-[0.3vw] self-end">2151</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[12vw] border-none p-[0.5vw] rounded-[1vw] bg-stone-900">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-[1vw]">
            <p className="leading-[1vw] text-[1vw]">
              Roupa esquisita amarela branca verde
            </p>

            <div className="flex flex-row items-center justify-between">
              <p className="text-[0.8vw]">Qualidade</p>
              <div className="flex flex-row gap-[0.2vw] items-end">
                <p className="text-[0.8vw] text-stone-400">20</p>
                <p className="text-[0.7vw] font-semibold text-stone-400">kg</p>
              </div>
            </div>

            <p className="leading-[1vw] text-[0.7vw] text-justify font-normal text-stone-300">
              Descrição bem esquisita dessa roupa esquisita Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Sunt quis fuga, esse
              eveniet architecto nam amet illum quo! Ducimus molestiae qui
              quibusdam debitis temporibus modi quos accusantium cumque, magni
              quis!
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
  ));
}
