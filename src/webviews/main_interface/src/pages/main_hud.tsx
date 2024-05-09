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
import { IoMdMic /*IoMdMicOff*/ } from 'react-icons/io';

export default function MainHud() {
  const debugMode = useDebugMode((state) => state.debugMode);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row items-center justify-between p-[1vw]">
        <img
          src={logoDark}
          alt="DATALIFE logo"
          className="w-[6vw] self-start"
        />

        <div className="flex flex-row items-center gap-[1vw] bg-stone-950/75 p-[0.5vw] rounded-[0.5vw]">
          <div className="flex flex-col gap-[0.5vw]">
            <Progress className="w-[7vw] h-[0.3vw]" value={100} />
            <Progress className="w-[7vw] h-[0.3vw]" value={100} />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <PiBowlFoodFill className="text-[1.3vw]" />
            <Progress className="w-[3vw] h-[0.3vw]" value={100} />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <BiSolidDrink className="text-[1.3vw]" />
            <Progress className="w-[3vw] h-[0.3vw]" value={100} />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <FaToiletPaper className="text-[1.3vw]" />
            <Progress className="w-[3vw] h-[0.3vw]" value={100} />
          </div>
          <div className="flex flex-col gap-[0.1vw] items-center">
            <IoBedSharp className="text-[1.3vw]" />
            <Progress className="w-[3vw] h-[0.3vw]" value={35} />
          </div>
        </div>
      </div>

      {debugMode && (
        <div className="flex flex-1 px-[1vw]">
          <DebugPanel />
        </div>
      )}

      {!debugMode && (
        <div className="flex flex-1 justify-center flex-col gap-[1vw] items-start opacity-70 px-[1vw]">
          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <IoMdMic className="text-[1.5vw]" />
          </div>

          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <IoPersonCircle className="text-[1.5vw]" />
            <p>B</p>
          </div>

          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <PiCursor className="text-[1.5vw]" />
            <p>M</p>
          </div>

          <div className="flex items-center justify-center p-[0.5vw] bg-stone-950 rounded-[0.5vw] gap-[0.5vw] h-[2.5vw] w-[4vw]">
            <IoPersonCircle className="text-[1.5vw]" />
            <p>F2</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-[0.5vw] self-end px-[1vw]">
        <div className="flex flex-row items-center justify-center gap-[1vw] bg-stone-900 p-[0.5vw] rounded-[0.5vw] opacity-75 w-fit">
          <span className="relative flex h-[0.7vw] w-[0.7vw]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[0.7vw] w-[0.7vw] bg-sky-500"></span>
          </span>

          <p className="text-[0.8vw] text-stone-300">
            5 notificações não lidas
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-[0.5vw] bg-gradient-to-r from-stone-900 bg-stone-700 rounded-t-[2vw] w-[20vw] h-[3vw] border-t-[0.2vw] border-stone-500 border-x-[0.2vw]">
          <div className="size-[0.4vw] rounded-full bg-gradient-to-r from-stone-950 bg-stone-900"></div>
          <div className="w-[6vw] h-[0.3vw] rounded-full bg-stone-950"></div>
        </div>
      </div>
    </div>
  );
}
