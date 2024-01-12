import Need from '../components/hud/need';
import { PiBowlFoodFill } from 'react-icons/pi';
import { BiSolidDrink } from 'react-icons/bi';
import { FaToiletPaper } from 'react-icons/fa6';
import { IoBedSharp } from 'react-icons/io5';

export default function Hud() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <Need color="warning" icon={<PiBowlFoodFill size={25} />} value={50} />
      <Need color="primary" icon={<BiSolidDrink size={25} />} value={35} />
      <Need color="secondary" icon={<FaToiletPaper size={25} />} value={35} />
      <Need color="default" icon={<IoBedSharp size={25} />} value={35} />
    </main>
  );
}
