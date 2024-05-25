import { ScrollArea } from '@/components/ui/scroll-area';

export default function Character() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 flex-row w-full">
        <div className="flex flex-col gap-[1vw] w-[15vw]">
          <div className="flex items-center justify-start w-full h-[3vw] rounded-[0.6vw] overflow-hidden">
            <div className="bg-[yellow] h-full w-[3vw]"></div>
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[0.9vw]">Preguiçoso</p>
            </div>
          </div>
          <div className="flex items-center justify-start w-full h-[3vw] rounded-[0.6vw] overflow-hidden">
            <div className="bg-[yellow] h-full w-[3vw]"></div>
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[0.9vw]">Preguiçoso</p>
            </div>
          </div>
          <div className="flex items-center justify-start w-full h-[3vw] rounded-[0.6vw] overflow-hidden">
            <div className="bg-[yellow] h-full w-[3vw]"></div>
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[0.9vw]">Preguiçoso</p>
            </div>
          </div>

          <ScrollArea className="flex flex-1 max-h-[11vw]">
            <div className="flex flex-col">
              <p className="text-[0.9vw] p-[1vw]">Sem condições</p>
              <p className="text-[0.9vw] p-[1vw]">Sem condições</p>
              <p className="text-[0.9vw] p-[1vw]">Sem condições</p>
              <p className="text-[0.9vw] p-[1vw]">Sem condições</p>
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-1"></div>
      </div>

      <div className="flex flex-1 flex-row items-center justify-evenly pt-[1vw]">
        {new Array(10).fill(0).map((_, i) => (
          <button
            key={i}
            className="relative size-[3.5vw] bg-stone-900 overflow-hidden rounded-[0.5vw]"
          >
            <div className="absolute top-0 w-full h-full flex items-start pt-[0.1vw] pl-[0.2vw]">
              <p className="text-[1vw]">{i}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
