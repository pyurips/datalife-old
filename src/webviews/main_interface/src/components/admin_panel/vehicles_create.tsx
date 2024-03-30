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
import vehiclesList from '@/utils/vehicles_list';
import { useEffect, useState } from 'react';

export default function VehiclesCreate() {
  const [vehiclesListState, setVehiclesListState] = useState<any>(vehiclesList);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filteredList = Object.fromEntries(
      Object.entries(vehiclesList).filter((e) => e[0].includes(search.toLowerCase()))
    );
    setVehiclesListState(filteredList);
  }, [search]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2 pr-3">
        <FaSearch className="text-[1.3vw]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Pesquisar pelo nome"
        />
      </div>
      <ScrollArea className="w-full">
        <div className="flex flex-col gap-4">
          {Object.entries(vehiclesListState).map((e, i: number) => (
            <div
              key={i}
              className="w-full flex flex-row items-center justify-between pr-3"
            >
              <p className="text-sm">
                {e[0].charAt(0).toUpperCase() + e[0].slice(1)}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <SlOptionsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {e[0].charAt(0).toUpperCase() + e[0].slice(1)}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Criar para mim</DropdownMenuItem>
                  <DropdownMenuItem>Criar para o jogador</DropdownMenuItem>
                  <DropdownMenuItem>Criar por coordenadas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
