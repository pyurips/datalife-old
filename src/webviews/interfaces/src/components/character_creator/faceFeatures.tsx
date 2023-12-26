import { Input, Button, Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function FaceFeatures() {
  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="bg-[#424242] p-3 rounded-lg">
        <p className="text-md">Cor dos olhos</p>
      </div>

      <div className="flex flex-col gap-5 bg-[#424242] p-3 rounded-lg">
        <p className="text-md">Nariz</p>
        <Slider
          size="sm"
          step={0.01}
          maxValue={1}
          minValue={0}
          label="Tamanho"
          aria-label="Tamanho"
          defaultValue={0.2}
          color='foreground'
        />
      </div>
    </div>
  );
}
