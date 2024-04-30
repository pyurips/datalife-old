import { IoPersonCircle } from 'react-icons/io5';

export default function Vehicle() {
  return (
    <div className="flex flex-col items-center justify-between w-[200px] h-full">
      <div className="flex flex-col rounded-xl overflow-hidden bg-stone-950 w-full">
        <img
          className="w-full object-cover h-[140px]"
          draggable={false}
          src="https://i.pinimg.com/736x/0d/b5/da/0db5da143c7bf4ace9d3635bd4e35fcc.jpg"
        />
        <div className="flex flex-row gap-1 items-center p-2">
          <IoPersonCircle className="text-xl" />
          <p className="text-xs">Pabliuri</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 bg-stone-950 p-2 rounded-xl">
        <div className='flex items-center justify-center bg-stone-200 size-7 rounded-md'>
          <p className='text-stone-900 font-bold text-xl'>E</p>
        </div>
        <p className="text-xs">para interagir</p>
      </div>
    </div>
  );
}
