import { Tabs, Tab, Button } from '@nextui-org/react';
import hairColors from '../../utils/hair_colors';
import {
  maleHairStyles,
  femaleHairStyles,
} from '../../utils/character_hair_styles';
import { useCharacterModel } from '../../context/character';
import useRequester from '../../utils/useRequester';

export default function HairAndFacialHair() {
  const characterModel = useCharacterModel((state) => state.model);
  const { fetchData: setHairModel } = useRequester(
    'setPedInCreatorHairModel',
    false
  );

  const { fetchData: setHairColors } = useRequester(
    'setPedInCreatorHairColors',
    false
  );

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div>
        <Tabs aria-label="Options">
          <Tab key="hair" title="Cabelo">
            <div className="grid grid-cols-4 gap-4">
              {(characterModel === 0x705e61f2
                ? maleHairStyles
                : femaleHairStyles
              ).map((e, i) => (
                <Button
                  key={i}
                  size="lg"
                  isIconOnly
                  onClick={() => setHairModel({ model: e.value })}
                >
                  {e.value}
                </Button>
              ))}
            </div>
          </Tab>
          <Tab key="color" title="Cores">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm bg-stone-900 p-2 rounded-md">Primária</h2>
              <div className="grid grid-cols-5 gap-4">
                {hairColors.map((e, i) => (
                  <Button
                    style={{
                      backgroundColor: e,
                    }}
                    key={i}
                    size="sm"
                    isIconOnly
                    onClick={() => setHairColors({ primary: i, secondary: i })}
                  ></Button>
                ))}
              </div>
              <h2 className="text-sm bg-stone-900 p-2 rounded-md">
                Secundária
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {hairColors.map((e, i) => (
                  <Button
                    style={{
                      backgroundColor: e,
                    }}
                    key={i}
                    size="sm"
                    isIconOnly
                    onClick={() => setHairColors({ primary: i, secondary: i })}
                  ></Button>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      <div>
        <Tabs aria-label="Options">
          <Tab key="hair" title="Pelos faciais">
            <div className="grid grid-cols-4 gap-4">
              {[].map((_, i) => (
                <Button
                  key={i}
                  size="lg"
                  isIconOnly
                  onClick={() => {}}
                ></Button>
              ))}
            </div>
          </Tab>
          <Tab key="color" title="Cores">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm bg-stone-900 p-2 rounded-md">Primária</h2>
              <div className="grid grid-cols-5 gap-4">
                {hairColors.map((e, i) => (
                  <Button
                    style={{
                      backgroundColor: e,
                    }}
                    key={i}
                    size="sm"
                    isIconOnly
                    onClick={() => {}}
                  ></Button>
                ))}
              </div>
              <h2 className="text-sm bg-stone-900 p-2 rounded-md">
                Secundária
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {hairColors.map((e, i) => (
                  <Button
                    style={{
                      backgroundColor: e,
                    }}
                    key={i}
                    size="sm"
                    isIconOnly
                    onClick={() => {}}
                  ></Button>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
