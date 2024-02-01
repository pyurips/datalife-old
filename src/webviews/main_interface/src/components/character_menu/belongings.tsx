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

export default function Belongings() {
  return (
    <div className="flex flex-col w-full gap-[1vw]">
      <header className="flex flex-row items-center gap-2">
        <FaSearch className="text-[1.3vw] text-stone-200" />
        <Input className="border-stone-700 focus:border-stone-500 hover:border-stone-500 text-stone-300" />
      </header>

      <ScrollArea>
        <section className="flex flex-1 flex-row gap-[1.2vw] flex-wrap p-[0.1vw]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex flex-col w-[6vw] h-[6vw] bg-stone-900 items-end overflow-hidden rounded-[0.8vw] transition-all active:bg-stone-800">
                <div className="flex flex-1 items-center justify-center text-stone-300">
                  Imagem aqui
                </div>
                <p className="text-[0.8vw] p-[0.3vw] text-stone-300">122</p>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[10vw] bg-stone-800 text-stone-300 border-none">
              <DropdownMenuLabel className='text-[1vw]'>My Account sa as a da </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-stone-800" />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </ScrollArea>
    </div>
  );
}
