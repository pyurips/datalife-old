import { Input, Button, Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import eyeColors from '../../utils/eye_colors';
import faceFeatures from '../../utils/face_features';

export default function FaceFeatures() {
  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="rounded-lg">
        <p className="text-md">Tom de pele</p>
        <Slider
          size="sm"
          step={0.1}
          maxValue={1}
          minValue={-1}
          aria-label="Tamanho"
          defaultValue={0.2}
          color="foreground"
        />
      </div>

      <div className="flex flex-col gap-5 rounded-lg">
        <p className="text-md bg-[#424242] p-2 rounded-md">Cor dos olhos</p>
        <div className="grid grid-cols-6 gap-4">
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

      {Object.entries(faceFeatures).map(([group, features], groupIndex) => (
        <div key={groupIndex}>
          <h2 className="text-md bg-[#424242] p-2 rounded-md">{group}</h2>
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <p className="text-sm p-2 rounded-md">{feature.label}</p>
              <Slider
                size="sm"
                step={0.01}
                maxValue={feature.max}
                minValue={feature.min}
                aria-label={feature.label}
                defaultValue={feature.default}
                color="foreground"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
