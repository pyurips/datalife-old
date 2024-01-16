import Need from '../components/hud/need';
import { PiBowlFoodFill } from 'react-icons/pi';
import { BiSolidDrink } from 'react-icons/bi';
import { FaToiletPaper } from 'react-icons/fa6';
import { IoBedSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import datalifeLogoDark from '../assets/signin/datalife_logo_dark.svg';
import { Button } from '@nextui-org/react';

export default function Hud() {
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);

  useEffect(() => {
    const handleResize = () => {
      setScale((window.innerWidth + 520) / 1886.6);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex flex-col w-screen h-screen">
      <div
        className="absolute flex flex-col gap-3"
        style={{
          left: 0.06 * window.innerWidth - 65.2,
          top: 0.08 * window.innerWidth - 93.6,
          transform: `scale(${scale})`,
        }}
      >
        <div className="flex flex-row items-end gap-2">
          <img
            src={datalifeLogoDark}
            alt="DATALIFE logo dark"
            className="w-[100px]"
          />
          <p className="text-[12px] text-neutral-400">v0.01</p>
        </div>

        <div className="flex flex-col bg-stone-800/[.9] rounded-lg p-2 gap-2">
          <p className="text-sm">x: {0}</p>
          <p className="text-sm">y: {0}</p>
          <p className="text-sm">z: {0}</p>
          <p className="text-sm">rot x: {0}</p>
          <p className="text-sm">rot y: {0}</p>
          <p className="text-sm">rot z: {0}</p>
          <p className="text-sm">spd: {0}</p>
          <Button onPress={() => {}} variant="solid" color="primary">
            Copiar coordenadas
          </Button>
        </div>
      </div>

      <div
        style={{
          right: 0.06 * window.innerWidth - 65.2,
          top: 0.018 * window.innerWidth - 9.4,
          transform: `scale(${scale})`,
        }}
        className="absolute flex flex-row gap-1"
      >
        <Need
          color="warning"
          icon={<PiBowlFoodFill size={25} color="#f5a524" />}
          value={50}
        />
        <Need
          color="primary"
          icon={<BiSolidDrink size={25} color="#006FEE" />}
          value={35}
        />
        <Need
          color="secondary"
          icon={<FaToiletPaper size={25} color="#9353d3" />}
          value={35}
        />
        <Need
          color="default"
          icon={<IoBedSharp size={25} color="#3f3f46" />}
          value={35}
        />
      </div>
    </main>
  );
}
