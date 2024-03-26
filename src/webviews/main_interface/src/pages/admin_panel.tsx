import WorldTeleport from '@/components/admin_panel/world_teleport';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import adminCategories from '@/utils/admin_panel_categories';
import { useState } from 'react';

export default function AdminPanel() {
  const [selectedCategory, setSelectedCategory] = useState(
    adminCategories[0].category
  );
  const [selectedOption, setSelectedOption] = useState(
    adminCategories[0].options[0]
  );

  return (
    <div className="flex flex-col w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden">
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
