import logoDark from '../assets/logo_dark.svg';
import { Progress } from '@/components/ui/progress';
import { PiBowlFoodFill } from 'react-icons/pi';
import { BiSolidDrink } from 'react-icons/bi';
import { FaToiletPaper } from 'react-icons/fa6';
import { IoBedSharp } from 'react-icons/io5';
import DebugPanel from '@/components/main_hud/debug_panel';
import { useDebugMode } from '@/contexts/admin';
import { IoPersonCircle } from 'react-icons/io5';
import { PiCursor } from 'react-icons/pi';

export default function MainHud() {
  const debugMode = useDebugMode((state) => state.debugMode);

  return (
    <div className="flex flex-col gap-[1vw] w-full h-full p-[1vw] pb-0">
      <div className="flex flex-row items-center justify-between">
        <img src={logoDark} alt="DATALIFE logo" className="w-[8vw]" />

        <div className="flex flex-row items-center gap-[1vw]">
          <div className="flex flex-col gap-[0.5vw]">
            <Progress
              color="bg-green-500"
              className="w-[5vw] h-[0.5vw]"
              value={100}
            />
            <Progress
              color="bg-blue-500"
              className="w-[5vw] h-[0.5vw]"
              value={100}
            />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <PiBowlFoodFill className="text-[1.6vw] text-orange-400" />
            <Progress
              color="bg-green-500"
              className="w-[3vw] h-[0.5vw]"
              value={100}
            />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <BiSolidDrink className="text-[1.6vw] text-blue-400" />
            <Progress
              color="bg-green-500"
              className="w-[3vw] h-[0.5vw]"
              value={100}
            />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <FaToiletPaper className="text-[1.6vw] text-purple-400" />
            <Progress
              color="bg-green-500"
              className="w-[3vw] h-[0.5vw]"
              value={100}
            />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <IoBedSharp className="text-[1.6vw] text-neutral-400" />
            <Progress
              color="bg-green-500"
              className="w-[3vw] h-[0.5vw]"
              value={35}
            />
          </div>
        </div>
      </div>

      {debugMode && <DebugPanel />}

      {!debugMode && (
        <div className="flex flex-1 justify-center flex-col gap-[1vw] items-start opacity-70">
          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <IoPersonCircle className="text-[1.5vw]" />
            <p className="font-bold">B</p>
          </div>

          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <PiCursor className="text-[1.5vw]" />
            <p className="font-bold">M</p>
          </div>

          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <IoPersonCircle className="text-[1.5vw]" />
            <p className="font-bold">F2</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-[0.5vw] self-end">
        <div className="flex flex-row items-center justify-center gap-[1vw]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>

          <p className="text-stone-950 text-[0.9vw]">5 notificações não lidas</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-[0.5vw] bg-stone-800 rounded-t-[1vw] w-[17vw] h-[3vw] border-t-[0.2vw] border-stone-500 border-x-[0.2vw]">
          <div className="size-[0.3vw] rounded-full bg-stone-950"></div>
          <div className="w-[6vw] h-[0.3vw] rounded-full bg-stone-950"></div>
        </div>
      </div>
    </div>
  );
}
