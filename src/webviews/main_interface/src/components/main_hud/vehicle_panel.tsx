import { Progress } from '@/components/ui/progress';
import { GiCarDoor, GiCarBattery } from 'react-icons/gi';
import { PiEngineFill } from 'react-icons/pi';
import { BsFillFuelPumpFill } from 'react-icons/bs';

export default function VehiclePanel() {
  return (        <div className="flex gap-[1vw] items-center p-[0.5vw] rounded-[0.5vw] bg-stone-950/75">
  <p className="text-[1vw] font-semibold">
    15 <span className="text-[0.9vw] font-normal">km/h</span>
  </p>
  <div className="flex flex-col gap-[0.1vw] items-center">
    <BsFillFuelPumpFill className="text-[1.3vw]" />
    <Progress className="w-[3vw] h-[0.3vw]" value={100} />
  </div>
  <div className="flex flex-col gap-[0.1vw] items-center">
    <GiCarBattery className="text-[1.3vw]" />
    <Progress className="w-[3vw] h-[0.3vw]" value={100} />
  </div>
  <div className="flex flex-col gap-[0.1vw] items-center">
    <PiEngineFill className="text-[1.3vw]" />
    <p className="text-[0.8vw]">K</p>
  </div>
  <div className="flex flex-col gap-[0.1vw] items-center">
    <GiCarDoor className="text-[1.3vw]" />
    <p className="text-[0.8vw]">L</p>
  </div>
</div>);
}