import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CharacterCustomization() {
  return (
    <main className="flex flex-row items-center justify-end w-full h-full p-[1vw]">
      <div className="flex flex-row justify-between w-[25vw] h-[40vw] bg-stone-950 rounded-[1vw] overflow-hidden">
        <ScrollArea className="flex flex-1">
          <div className="flex flex-col gap-[1vw] p-[1vw]">
            <p className="text-[1vw]">Nome do personagem no discord</p>
            <div className="flex flex-row gap-[1vw]">
              <Button variant="secondary" className="size-[3vw]"></Button>
              <Button variant="secondary" className="size-[3vw]"></Button>
            </div>

            <div className="flex flex-row items-center gap-[1vw]">
              <Button className='size-[2vw]' variant="ghost"></Button>
              <p className="text-[0.9vw] text-stone-400">
                Clique para gerar novos rostos
              </p>
            </div>

            <div className="flex flex-row gap-[1vw] flex-wrap">
              {new Array(50).fill(0).map((_, i) => (
                <Button
                  key={i}
                  variant="secondary"
                  className="size-[3vw]"
                ></Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <ScrollArea>
          <div className="flex flex-col gap-[1vw] p-[1vw]">
            {new Array(20).fill(0).map((_, i) => (
              <Button
                key={i}
                className="size-[4vw]"
                variant="secondary"
              ></Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
