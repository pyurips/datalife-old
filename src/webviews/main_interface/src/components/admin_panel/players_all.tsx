import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SlOptionsVertical } from 'react-icons/sl';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

export default function PlayersAll() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2 pr-3">
        <FaSearch className="text-[1.3vw]" />
        <Input placeholder="Pesquisar pelo nome" />
      </div>
      <ScrollArea className="w-full">
        <div className="flex flex-col gap-4">
          {new Array(20).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-full flex flex-row items-center justify-between pr-3"
            >
              <p className="text-sm">Nome do jogador</p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <SlOptionsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
