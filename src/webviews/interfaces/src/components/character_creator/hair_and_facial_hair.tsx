import { Tabs, Tab, Button } from '@nextui-org/react';
import { maleHairNames } from '../../utils/hair_models';

export default function HairAndFacialHair() {
  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <div>
        <Tabs aria-label="Options">
          <Tab key="hair" title="Cabelo">
            <div className="grid grid-cols-4 gap-4">
              {maleHairNames.map((_, i) => (
                <Button
                  key={i}
                  size="lg"
                  isIconOnly
                  onClick={() => {}}
                ></Button>
              ))}
            </div>
          </Tab>
          <Tab key="color" title="Cores"></Tab>
        </Tabs>
      </div>
    </div>
  );
}
