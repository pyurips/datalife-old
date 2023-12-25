import { Input, Button, Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';
import { MdFace, MdFace2 } from 'react-icons/md';

export default function Genetics() {
  const [characterName, setCharacterName] = useState<string>('');
  const [gender, setGender] = useState<boolean>(true);
  const [selectedFace, setSelectedFace] = useState<number>(0);
  const [facialFeatures, setFacialFeatures] = useState<number>(0.5);

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <Input
        size="sm"
        variant="bordered"
        placeholder="Nome do personagem"
      ></Input>

      <div className="flex flex-col gap-2">
        <p className="text-sm">Formato do corpo</p>
        <div className="flex flex-row gap-2">
          <Button
            onPress={() => setGender(true)}
            isIconOnly
            className={`${gender ? 'opacity-100' : 'opacity-50'}`}
          >
            <FaMale size={20} />
          </Button>
          <Button
            onPress={() => setGender(false)}
            isIconOnly
            className={`${!gender ? 'opacity-100' : 'opacity-50'}`}
          >
            <FaFemale size={20} />
          </Button>
        </div>
      </div>

      <div>
        <Slider
          startContent={<MdFace size={20} />}
          endContent={<MdFace2 size={20} />}
          label={
            facialFeatures < 0.5
              ? 'Rosto mais masculino'
              : 'Rosto mais feminino'
          }
          hideValue
          value={facialFeatures}
          onChange={(e) => setFacialFeatures(e as number)}
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.5}
          aria-label="Traços faciais"
          color="foreground"
        />
      </div>

      <div className="flex flex-col flex-1 gap-2 w-full items-center">
        <div className="w-full">
          <Button variant="light" size="sm" color="success">
            <RxUpdate />
            Gerar novos rostos
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242] ${
              selectedFace === 0 ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedFace(0)}
          >
            <MdFace size={40} />
            <p className="text-[10px]">Adjetivo</p>
          </Button>
          <Button
            className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242] ${
              selectedFace === 1 ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedFace(1)}
          >
            <MdFace size={40} />
            <p className="text-[10px]">Adjetivo</p>
          </Button>
          <Button
            className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242] ${
              selectedFace === 2 ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedFace(2)}
          >
            <MdFace size={40} />
            <p className="text-[10px]">Adjetivo</p>
          </Button>
          <Button
            className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242] ${
              selectedFace === 3 ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedFace(3)}
          >
            <MdFace size={40} />
            <p className="text-[10px]">Adjetivo</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
