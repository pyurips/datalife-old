import { Input, Button, Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import eyeColors from '../../utils/eye_colors';

export default function FaceFeatures() {
  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="bg-[#424242] p-3 rounded-lg">
        <p className="text-md">Tom de pele</p>
        <Slider
          size="sm"
          step={0.01}
          maxValue={1}
          minValue={-1}
          aria-label="Tamanho"
          defaultValue={0.2}
          color="foreground"
        />
      </div>

      <div className="flex flex-col gap-2 bg-[#424242] p-3 rounded-lg">
        <p className="text-md">Cor dos olhos</p>
        <div className="grid grid-cols-5 gap-4">
          {eyeColors.map((e, i) => (
            <Button
              size="sm"
              key={i}
              style={{ backgroundColor: e.color }}
              isIconOnly
              onClick={() => {}}
            ></Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-[#424242] p-3 rounded-lg">
        <p className="text-md">Nariz</p>
        <Slider
          size="sm"
          step={0.01}
          maxValue={1}
          minValue={-1}
          label="Tamanho"
          aria-label="Tamanho"
          defaultValue={0.2}
          color="foreground"
        />
        <Slider
          size="sm"
          step={0.01}
          maxValue={1}
          minValue={-1}
          label="Tamanho"
          aria-label="Tamanho"
          defaultValue={0.2}
          color="foreground"
        />
      </div>
    </div>
  );
}
