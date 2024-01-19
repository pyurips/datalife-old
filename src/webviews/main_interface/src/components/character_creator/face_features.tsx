import { Button, Slider } from '@nextui-org/react';
import eyeColors from '../../utils/eye_colors';
import faceFeatures from '../../utils/face_features';
import { useFaceFeatures } from '../../context/character';
import useRequester from '../../utils/useRequester';

export default function FaceFeatures() {
  const faceFeaturesHook = useFaceFeatures((state) => state.faceFeatures);
  const setFaceFeaturesHook = useFaceFeatures((state) => state.setFaceFeatures);

  const { fetchData: setMicroMorph } = useRequester(
    'setPedInCreatorMicroMorph',
    false
  );

  const { fetchData: setEyeColor } = useRequester(
    'setPedInCreatorEyeColor',
    false
  );

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div className="flex flex-col gap-5 rounded-lg">
        <p className="text-md bg-stone-900 p-2 rounded-md">Cor dos olhos</p>
        <div className="grid grid-cols-6 gap-4">
          {eyeColors.map((e, i) => (
            <Button
              size="sm"
              key={i}
              style={{ backgroundColor: e.color }}
              isIconOnly
              onClick={() => setEyeColor(e.value)}
            ></Button>
          ))}
        </div>
      </div>

      {Object.entries(faceFeatures).map(([group, features], groupIndex) => (
        <div key={groupIndex}>
          <h2 className="text-md bg-stone-900 p-2 rounded-md">{group}</h2>
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <p className="text-sm p-2 rounded-md">{feature.label}</p>
              <Slider
                size="sm"
                step={0.1}
                maxValue={feature.max}
                minValue={feature.min}
                aria-label={feature.label}
                defaultValue={feature.default}
                color="foreground"
                value={
                  faceFeaturesHook.find((e) => e.id === feature.id)?.value || 0
                }
                onChange={(value) => {
                  setFaceFeaturesHook(feature.id, value as number);
                  return setMicroMorph({ value: feature.id, scale: value });
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
