import { useEffect, useState } from 'react';
import datalifeLogoDark from '../assets/signin/datalife_logo_dark.svg';
import { Button } from '@nextui-org/react';

type IVector3 = { x: number; y: number; z: number };

export default function DebugHud() {
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);
  const [coords, setCoords] = useState<IVector3>();
  const [rotation, setRotation] = useState<IVector3>();
  const [speed, setSpeed] = useState<number>();

  useEffect(() => {
    if (window.alt)
      window.alt.on('response:debug_getPlayerCoordinates', (data: IVector3) =>
        setCoords({ x: data.x, y: data.y, z: data.z })
      );

    if (window.alt)
      window.alt.on('response:debug_getPlayerRotation', (data: IVector3) =>
        setRotation({ x: data.x, y: data.y, z: data.z })
      );

    if (window.alt)
      window.alt.on(
        'response:debug_getPlayerSpeed',
        (data: { speed: number }) => setSpeed(data.speed)
      );

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
      <header className="flex flex-row w-full items-end gap-[1vw] p-[0.5vw]">
        <img
          src={datalifeLogoDark}
          alt="DATALIFE logo dark"
          className="w-[7vw]"
        />
        <p className="text-[1vw] text-neutral-400">v0.01</p>
      </header>

      <div
        className="flex flex-1 flex-col items-start"
        style={{
          marginLeft: 0.056 * window.innerWidth - 67.52,
          marginTop: 0.056 * window.innerWidth - 67.52,
        }}
      >
        <div
          className="flex flex-col bg-stone-800/[.9] rounded-lg p-2 gap-2"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <p className="text-sm">x: {coords?.x || 0}</p>
          <p className="text-sm">y: {coords?.y || 0}</p>
          <p className="text-sm">z: {coords?.z || 0}</p>
          <p className="text-sm">rot x: {rotation?.x || 0}</p>
          <p className="text-sm">rot y: {rotation?.y || 0}</p>
          <p className="text-sm">rot z: {rotation?.z || 0}</p>
          <p className="text-sm">spd: {speed || 0}</p>
          <Button onPress={() => {}} variant="solid" color="primary">
            Copiar coordenadas
          </Button>
        </div>
      </div>
    </main>
  );
}
