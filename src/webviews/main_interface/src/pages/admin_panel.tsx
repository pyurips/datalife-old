import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function AdminPanel() {
  return (
    <div className="flex flex-col w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden">
      <ScrollArea>
        <div className="flex w-full p-[1vw] flex-row gap-[1vw] overflow-auto">
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <Button className="p-[1vw] h-min">das</Button>
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
}
