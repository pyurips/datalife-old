import logoDark from "../assets/logo_dark.svg";
import { Progress } from "@/components/ui/progress";
import { PiBowlFoodFill } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";
import { FaToiletPaper } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";

export default function MainHud() {
  return (
    <div className="w-full h-full p-[1vw]">
      <div className="flex flex-row items-center justify-between">
        <img src={logoDark} alt="DATALIFE logo" className="w-[8vw]" />

        <div className="flex flex-row items-center gap-[1vw]">
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
    </div>
  );
}
