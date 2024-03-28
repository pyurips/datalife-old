import WorldTeleport from '@/components/admin_panel/world_teleport';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import adminCategories from '@/utils/admin_panel_categories';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import useRequester from '@/utils/use_requester';
import { VscLoading } from 'react-icons/vsc';

export default function AdminPanel() {
  const {
    responseData: accountData,
    fetchData: accountFetch,
    loading: accountLoading,
  } = useRequester('account_getOne', true);

  function roleHandler(roleId: number) {
    if (roleId === 4) return 'Administrador';
    if (roleId === 3) return 'Moderador';
    if (roleId === 2) return 'Ajudante';
    return 'Cargo indefinido';
  }

  useEffect(() => {
    accountFetch();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(
    adminCategories[0].category
  );
  const [selectedOption, setSelectedOption] = useState(
    adminCategories[0].options[0]
  );

  return (
    <div className="flex flex-col w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden">
      <div className="flex w-full p-[1vw] flex-row gap-[1vw] items-center justify-between">
        {accountLoading && <VscLoading className="text-[1.1vw] animate-spin" />}
        {!accountLoading && <p>{roleHandler(accountData.permission_level)}</p>}
        <div className="flex flex-row items-center gap-3">
          <Switch />
          <p>Debug mode</p>
        </div>
      </div>
      <ScrollArea>
        <div className="flex w-full p-[1vw] flex-row gap-[1vw] overflow-auto">
          {adminCategories.map(({ category }) => (
            <Button
              key={category}
              className={`p-[1vw] h-min ${
                selectedCategory === category ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedOption(
                  adminCategories.find(({ category: c }) => c === category)
                    ?.options[0] as string
                );
              }}
            >
              {category}
            </Button>
          ))}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>

      <div className="flex flex-1 flex-row overflow-auto">
        <div className="flex flex-col gap-3 p-3 overflow-auto h-full">
          {adminCategories
            .find(({ category }) => category === selectedCategory)
            ?.options.map((option) => (
              <Button
                variant="ghost"
                key={option}
                className={`p-[1vw] h-min ${
                  selectedOption === option ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </Button>
            ))}
        </div>

        <div className="flex flex-1 p-3">
          {selectedCategory === 'Mundo' && selectedOption === 'Teleporte' && (
            <WorldTeleport />
          )}
        </div>
      </div>
    </div>
  );
}
