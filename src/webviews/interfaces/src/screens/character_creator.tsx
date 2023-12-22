import { Input, Button, Link, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function CharacterCreator() {
  const [selectedMenu, setSelectedMenu] = useState<
    | 'genetics'
    | 'faceFeatures'
    | 'hairAndFacialHair'
    | 'personality'
    | 'clothing'
  >('genetics');
  const [fatherBlends, setFatherBlends] = useState<string[]>([
    'Exemplo',
    'Examplo2',
    'Exemplo3',
  ]);

  return (
    <main className="flex h-screen w-full justify-end items-center px-7">
      <div className="flex flex-row py-7 justify-between bg-[#2D2D2D] w-[360px] h-[550px] rounded-2xl overflow-hidden">
        <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
          <Input
            size="sm"
            variant="bordered"
            placeholder="Nome do personagem"
          ></Input>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Formato do corpo</p>
            <div className="flex flex-row gap-2">
              <Button isIconOnly></Button>
              <Button isIconOnly></Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Selecione seus parentes</p>
            <Select>
              {fatherBlends.map((fatherBlends, index) => (
                <SelectItem key={index} value={fatherBlends}>
                  {fatherBlends}
                </SelectItem>
              ))}
            </Select>

            <Select>
              {fatherBlends.map((fatherBlends, index) => (
                <SelectItem key={index} value={fatherBlends}>
                  {fatherBlends}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Combinação da face</p>
            <Select>
              {fatherBlends.map((fatherBlends, index) => (
                <SelectItem key={index} value={fatherBlends}>
                  {fatherBlends}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Combinação da pele</p>
            <Select>
              {fatherBlends.map((fatherBlends, index) => (
                <SelectItem key={index} value={fatherBlends}>
                  {fatherBlends}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col justify-evenly items-center w-[100px]">
          <Button
            onClick={() => setSelectedMenu('genetics')}
            isIconOnly
            className={`flex rounded-xl w-[70px] h-[70px] bg-[#D9D9D9] ${
              selectedMenu === 'genetics' ? 'opacity-100' : 'opacity-50'
            }`}
          ></Button>

          <Button
            onClick={() => setSelectedMenu('faceFeatures')}
            isIconOnly
            className={`flex rounded-xl w-[70px] h-[70px] bg-[#D9D9D9] ${
              selectedMenu === 'faceFeatures' ? 'opacity-100' : 'opacity-50'
            }`}
          ></Button>

          <Button
            onClick={() => setSelectedMenu('hairAndFacialHair')}
            isIconOnly
            className={`flex rounded-xl w-[70px] h-[70px] bg-[#D9D9D9] ${
              selectedMenu === 'hairAndFacialHair'
                ? 'opacity-100'
                : 'opacity-50'
            }`}
          ></Button>

          <Button
            onClick={() => setSelectedMenu('personality')}
            isIconOnly
            className={`flex rounded-xl w-[70px] h-[70px] bg-[#D9D9D9] ${
              selectedMenu === 'personality' ? 'opacity-100' : 'opacity-50'
            }`}
          ></Button>

          <Button
            onClick={() => setSelectedMenu('clothing')}
            isIconOnly
            className={`flex rounded-xl w-[70px] h-[70px] bg-[#D9D9D9] ${
              selectedMenu === 'clothing' ? 'opacity-100' : 'opacity-50'
            }`}
          ></Button>
        </div>
      </div>
    </main>
  );
}
