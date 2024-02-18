import Genetics from '@/components/character_customization/genetics';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CharacterCustomization() {
  return (
    <main className="flex flex-row items-center justify-end w-full h-full p-[1vw]">
      <div className="flex flex-col gap-[1vw]">
        <div className="flex flex-row justify-between w-[25vw] h-[40vw] bg-stone-950 rounded-[1vw] overflow-hidden">
          <Genetics />

          <ScrollArea>
            <div className="flex flex-col gap-[1vw] p-[1vw]">
              {new Array(20).fill(0).map((_, i) => (
                <Button
                  size="icon"
                  key={i}
                  className="size-[4vw]"
                  variant="secondary"
                ></Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Button className="bg-green-600 hover:bg-green-700 text-[1vw] py-[1vw] px-[1.1vw] rounded-[0.5vw]">
            Finalizar
          </Button>
        </div>
      </div>
    </main>
  );
}
