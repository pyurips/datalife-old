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
    <div className="flex flex-col gap-[1vw] w-full h-full p-[1vw]">
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
    </div>
  );
}
