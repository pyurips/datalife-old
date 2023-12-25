import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Genetics from '../components/character_creator/genetics';

export default function CharacterCreator() {
  const [selectedMenu, setSelectedMenu] = useState<
    | 'genetics'
    | 'faceFeatures'
    | 'hairAndFacialHair'
    | 'personality'
    | 'clothing'
  >('genetics');
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);

  useEffect(() => {
    const handleResize = () => {
      setScale((window.innerWidth + 520) / 1886.6);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex h-screen w-full justify-end items-center">
      <div
        style={{ transform: `scale(${scale})`, marginRight: (0.11 * window.innerWidth) - 121.2 }}
        className="flex flex-row py-7 justify-between bg-[#2D2D2D] w-[360px] h-[550px] rounded-2xl overflow-hidden"
      >
        {selectedMenu === 'genetics' && <Genetics />}

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
