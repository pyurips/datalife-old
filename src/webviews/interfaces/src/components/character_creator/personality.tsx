import { Button } from '@nextui-org/react';
import { FaMasksTheater } from 'react-icons/fa6';

export default function Personality() {
  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="w-full p-6 bg-[#424242] rounded-lg">
        <p className="text-xs text-center text-neutral-400">
          Nenhum traço selecionado
        </p>
      </div>
      <p className="text-sm text-neutral-400">Selecione 3 traços</p>
      <div className="flex flex-col gap-4">
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
        <Button size="lg" className="w-full">
          <FaMasksTheater size={20} />
          <p>Característica</p>
        </Button>
      </div>
    </div>
  );
}
