import { Input, Button, Slider } from '@nextui-org/react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';
import { MdFace, MdFace2 } from 'react-icons/md';
import { useEmitter } from '../../utils/use_emitter';
import { useCharacterFacialFeatures, useCharacterModel, useCharacterName } from '../../context/character';

export default function Genetics() {
  const characterName = useCharacterName((state) => state.characterName);
  const setCharacterName = useCharacterName((state) => state.setCharacterName);
  const gender = useCharacterModel((state) => state.model);
  const setGender = useCharacterModel((state) => state.setCharacterModel);
  const facialFeatures = useCharacterFacialFeatures((state) => state.facialFeatures);
  const setFacialFeatures = useCharacterFacialFeatures((state) => state.setFacialFeatures);

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <Input
        value={characterName}
        onValueChange={(e) => setCharacterName(e)}
        size="sm"
        variant="bordered"
        placeholder="Nome do personagem"
      />

      <div className="flex flex-col gap-2">
        <p className="text-sm">Formato do corpo</p>
        <div className="flex flex-row gap-2">
          <Button
            onPress={() => {
              setGender(0x705e61f2);
              return useEmitter(
                'server',
                'character_changePlayerModel',
                0x705e61f2
              );
            }}
            isIconOnly
            className={`${gender === 0x705e61f2 ? 'opacity-100' : 'opacity-50'}`}
          >
            <FaMale size={20} />
          </Button>
          <Button
            onPress={() => {
              setGender(0x9c9effd8);
              return useEmitter(
                'server',
                'character_changePlayerModel',
                0x9c9effd8
              );
            }}
            isIconOnly
            className={`${gender === 0x9c9effd8 ? 'opacity-100' : 'opacity-50'}`}
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
          step={0.1}
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
            className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242]`}
            onClick={() => {
              console.log('Rosto clicado');
            }}
          >
            <MdFace size={40} />
            <p className="text-[10px]">Adjetivo</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
