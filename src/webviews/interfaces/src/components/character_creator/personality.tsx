import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FaMasksTheater } from 'react-icons/fa6';

export default function Personality() {
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {selectedPersonality.map((e) => (
          <Button
            size="lg"
            className="w-full"
            onPress={() => {
              setSelectedPersonality(
                selectedPersonality.filter((value) => value !== e)
              );
            }}
          >
            <FaMasksTheater size={15} />
            <p className="text-xs">{e}</p>
          </Button>
        ))}
      </div>
      <p className="text-sm text-neutral-400">Selecione 3 traços</p>
      <div className="flex flex-col gap-4">
        {[
          'Característica 1',
          'Característica 2',
          'Característica 3',
          'Característica 4',
          'Característica 5',
          'Característica 6',
          'Característica 7',
          'Característica 8',
        ].map((e) => (
          <Button
            isDisabled={
              selectedPersonality.some((element) => element === e) ||
              selectedPersonality.length >= 3
            }
            size="lg"
            className="w-full"
            onPress={() => {
              setSelectedPersonality([
                ...selectedPersonality,
                `${e}`,
              ]);
            }}
          >
            <FaMasksTheater size={20} />
            <p>{`${e}`}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
