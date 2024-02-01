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

export default function Belongings() {
  return (
    <div className="flex flex-col w-full gap-[1vw]">
      <header className="flex flex-row items-center gap-2">
        <FaSearch className="text-[1.3vw] text-stone-200" />
        <Input className="border-stone-700 focus:border-stone-500 hover:border-stone-500 text-stone-300" />
      </header>

      <ScrollArea>
        <section className="flex flex-1 flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
          {new Array(50).fill(0).map((_, i) => (
            <DropdownMenu key={i}>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col w-[6vw] h-[6vw] bg-stone-900 items-end overflow-hidden rounded-[0.8vw] transition-all active:bg-stone-800">
                  <div className="flex flex-1 items-center justify-center text-stone-300"></div>
                  <p className="text-[0.8vw] p-[0.3vw] text-stone-300">2151</p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-[10vw] bg-stone-800 text-stone-300 border-none p-[0.5vw] rounded-[1vw]">
                <DropdownMenuLabel className="text-[10px] lg:text-[1vw]">
                  My Account sa as a da{' '}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-stone-600" />
                <DropdownMenuItem className="text-[1vw]">Usar</DropdownMenuItem>
                <DropdownMenuItem className="text-[1vw]">
                  Jogar fora
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </section>
      </ScrollArea>

      <div className="flex flex-row items-center justify-between gap-[1vw]">
        <FaWeightHanging className="text-[1.5vw] text-stone-400" />
        <Progress color="bg-green-500" className="h-[0.3vw]" value={100} />
        <div className="flex flex-row gap-[0.2vw] items-end">
          <p className="text-stone-300 text-[1vw]">110/120</p>
          <p className="text-stone-400 text-[0.9vw] font-semibold">kg</p>
        </div>
      </div>
    </div>
  );
}
