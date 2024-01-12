import Need from '../components/hud/need';
import { PiBowlFoodFill } from 'react-icons/pi';

export default function Hud() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <Need icon={<PiBowlFoodFill size={25} />} value={50} />
    </main>
  );
}
