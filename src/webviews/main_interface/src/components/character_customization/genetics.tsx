import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function Genetics() {
  return (
    <ScrollArea className="flex flex-1">
      <div className="flex flex-col gap-[1vw] p-[1vw]">
        <p className="text-[1vw]">Nome do personagem no discord</p>
        <div className="flex flex-row gap-[1vw]">
          <Button size="icon" variant="secondary" className="size-[3vw]"></Button>
          <Button size="icon" variant="secondary" className="size-[3vw]"></Button>
        </div>

        <div className="flex flex-row items-center gap-[1vw]">
          <Button size="icon" className="size-[2vw]" variant="ghost"></Button>
          <p className="text-[0.9vw] text-stone-400">
            Clique para gerar novos rostos
          </p>
        </div>

        <div className="flex justify-center flex-row gap-[1vw] flex-wrap">
          {new Array(54).fill(0).map((_, i) => (
            <Button size="icon" key={i} variant="secondary" className="size-[3vw]"></Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
