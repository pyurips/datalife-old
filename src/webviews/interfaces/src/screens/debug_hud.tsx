import { useEffect, useState } from 'react';
import datalifeLogoDark from '../assets/signin/datalife_logo_dark.svg';
import { Button } from '@nextui-org/react';

export default function DebugHud() {
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
      <header
        className="flex flex-row w-full p-2 items-end gap-2"
        style={{
          transform: `scale(${scale})`,
          marginLeft: 0.357 * window.innerWidth - 395.44,
        }}
      >
        <img
          src={datalifeLogoDark}
          alt="DATALIFE logo dark"
          className="w-[100px]"
        />
        <p className="text-sm text-neutral-400">v0.01</p>
        <p className="text-neutral-900">KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</p>
      </header>

      <div className="flex flex-1 p-5 flex-col items-start">
        <div className="flex flex-col bg-stone-800/[.9] rounded-lg p-2 gap-2">
          <p className="text-sm">x: 1453.26</p>
          <p className="text-sm">y: 5436.30</p>
          <p className="text-sm">z: 7520.12</p>
          <p className="text-sm">rot: 3547.80</p>
          <p className="text-sm">spd: 6314.96</p>
          <Button onPress={() => {}} variant="solid" color="primary">
            Copiar coordenadas
          </Button>
        </div>
      </div>
    </main>
  );
}