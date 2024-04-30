export default function Character() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 flex-row w-full">
        <div className="flex flex-col gap-[1vw] w-[15vw]">
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-[0.9vw]">Primeiro traço</p>
          </div>
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-[0.9vw]">Primeiro traço</p>
          </div>
          <div className="flex items-center justify-center w-full h-[3vw] bg-stone-900 rounded-[0.6vw]">
            <p className="text-[0.9vw]">Primeiro traço</p>
          </div>

          <div className="flex flex-1 items-center justify-center w-full bg-stone-900 rounded-[0.6vw]">
            <p className="text-[0.9vw]">Sem condições</p>
          </div>
        </div>
        <div className="flex flex-1"></div>
      </div>

      <div className="flex flex-row items-center justify-evenly pt-[1vw]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
          <button
            key={i}
            className="relative size-[3.5vw] bg-stone-900 overflow-hidden rounded-[0.5vw]"
          >
            <div className="absolute top-0 w-full h-full flex items-start pt-[0.1vw] pl-[0.2vw]">
              <p className="text-[1vw]">{e}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
