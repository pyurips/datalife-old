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
import useRequester from '@/utils/use_requester';
import { useEffect } from 'react';
import { VscLoading } from 'react-icons/vsc';

export default function PlayersAll() {
  const {
    data: getAllResponseData,
    fetch: getAllFetchData,
    loading: getAllLoading,
  } = useRequester('account_getAll', true);

  useEffect(() => {
    getAllFetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2 pr-3">
        <FaSearch className="text-[1.3vw]" />
        <Input placeholder="Pesquisar pelo nome" />
      </div>
      <ScrollArea className="w-full">
        <div className="flex flex-col gap-4">
          {getAllLoading && (
            <div className="flex items-center justify-center">
              <VscLoading className="text-[1.5vw] animate-spin" />
            </div>
          )}
          {!getAllLoading &&
            getAllResponseData?.map((e: any, i: number) => (
              <div
                key={i}
                className="w-full flex flex-row items-center justify-between pr-3"
              >
                <p className="text-sm">{e.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SlOptionsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{e.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver pefil</DropdownMenuItem>
                    <DropdownMenuItem>Ir até o jogador</DropdownMenuItem>
                    <DropdownMenuItem>Expulsar</DropdownMenuItem>
                    <DropdownMenuItem>Banir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
