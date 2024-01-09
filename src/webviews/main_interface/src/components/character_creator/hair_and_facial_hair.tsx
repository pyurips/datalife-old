import { Tabs, Tab, Button } from '@nextui-org/react';
import { maleHairNames } from '../../utils/hair_models';
import hairColors from '../../utils/hair_colors';

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
          <Tab key="color" title="Cores">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm bg-[#424242] p-2 rounded-md">Primária</h2>
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
              <h2 className="text-sm bg-[#424242] p-2 rounded-md">
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

      <div>
        <Tabs aria-label="Options">
          <Tab key="hair" title="Pelos faciais">
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
          <Tab key="color" title="Cores">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm bg-[#424242] p-2 rounded-md">Primária</h2>
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
              <h2 className="text-sm bg-[#424242] p-2 rounded-md">
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
