import datalifeLogoDark from '../assets/signin/datalife_logo_dark.svg';
import { Button } from '@nextui-org/react';

export default function DebugHud() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <header className="flex flex-row w-full p-2 items-end gap-2">
        <img
          src={datalifeLogoDark}
          alt="DATALIFE logo dark"
          className="w-[100px]"
        />
        <p className="text-sm text-neutral-400">v0.01</p>
      </header>

      <div className="flex flex-1 p-5 flex-col items-start">
        <div className="flex flex-col bg-stone-800 rounded-lg p-2 gap-2">
          <p className="text-sm">x: 1453.12</p>
          <p className="text-sm">y: 1455.12</p>
          <p className="text-sm">z: 7520.12</p>
          <p className="text-sm">rot: 4455.12</p>
          <p className="text-sm">spd: 4455.12</p>
          <Button onPress={() => {}} variant="flat" color="primary">
            Copiar coordenadas
          </Button>
        </div>
      </div>
    </main>
  );
}
