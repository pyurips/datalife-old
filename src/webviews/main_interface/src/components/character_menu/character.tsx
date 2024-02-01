export default function Character() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 flex-row w-full">
        <div className="flex flex-col gap-[1vw] w-[15vw]">
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-stone-200 text-[0.9vw]">Primeiro traço</p>
          </div>
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-stone-200 text-[0.9vw]">Primeiro traço</p>
          </div>
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-stone-200 text-[0.9vw]">Primeiro traço</p>
          </div>

          <div className="flex flex-1 items-center justify-center w-full bg-stone-900 rounded-[0.6vw]">
            <p className="text-stone-200 text-[0.9vw]">Sem condições</p>
          </div>
        </div>
        <div className="flex flex-1"></div>
      </div>

      <div className="flex flex-row items-center justify-evenly pt-[1vw]">
        {new Array(10).fill(0).map((_, i) => (
          <button
            key={i}
            className="relative text-stone-300 size-[3.5vw] bg-stone-900 overflow-hidden rounded-[0.5vw]"
          >
            <div className="absolute top-0 w-full h-full flex items-start pt-[0.1vw] pl-[0.2vw]">
              <p className="text-[1vw]">9</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
