import { Button, ButtonGroup } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Genetics from '../components/character_creator/genetics';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
import FaceFeatures from '../components/character_creator/face_features';
import { GiBodySwapping } from 'react-icons/gi';
import { LuScanFace } from 'react-icons/lu';
import { BsScissors, BsFillFilePersonFill } from 'react-icons/bs';
import { GiClothes } from 'react-icons/gi';
import HairAndFacialHair from '../components/character_creator/hair_and_facial_hair';
import Personality from '../components/character_creator/personality';
import Clothing from '../components/character_creator/clothing';
import { useEmitter } from '../utils/use_emitter';
import useRequester from '../utils/useRequester';
import { useCharacterNameValidation } from '../context/character';

export default function CharacterCreator() {
  const [selectedMenu, setSelectedMenu] = useState<
    | 'genetics'
    | 'faceFeatures'
    | 'hairAndFacialHair'
    | 'personality'
    | 'clothing'
  >('genetics');
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);
  const [cameraZoom, setCameraZoom] = useState<boolean>(false);
  const characterNameValidationError = useCharacterNameValidation(
    (state) => state.validationErrors
  );

  const { fetchData: spawnPlayer } = useRequester('loadPlayerIntoWorld', false);

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
        style={{
          transform: `scale(${scale})`,
          marginRight: 0.11 * window.innerWidth - 121.2,
        }}
        className="flex flex-col bg-stone-950 w-[360px] h-[550px] rounded-2xl overflow-hidden"
      >
        <div className="flex flex-1 flex-row overflow-y-auto">
          {selectedMenu === 'genetics' && <Genetics />}
          {selectedMenu === 'faceFeatures' && <FaceFeatures />}
          {selectedMenu === 'hairAndFacialHair' && <HairAndFacialHair />}
          {selectedMenu === 'personality' && <Personality />}
          {selectedMenu === 'clothing' && <Clothing />}

          <div className="flex flex-col justify-between items-center p-3">
            <Button
              onClick={() => setSelectedMenu('genetics')}
              isIconOnly
              className={`flex rounded-xl w-[70px] h-[70px] bg-stone-900 ${
                selectedMenu === 'genetics' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <GiBodySwapping size={25} />
            </Button>

            <Button
              onClick={() => setSelectedMenu('faceFeatures')}
              isIconOnly
              className={`flex rounded-xl w-[70px] h-[70px] bg-stone-900 ${
                selectedMenu === 'faceFeatures' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <LuScanFace size={25} />
            </Button>

            <Button
              onClick={() => setSelectedMenu('hairAndFacialHair')}
              isIconOnly
              className={`flex rounded-xl w-[70px] h-[70px] bg-stone-900 ${
                selectedMenu === 'hairAndFacialHair'
                  ? 'opacity-100'
                  : 'opacity-50'
              }`}
            >
              <BsScissors size={25} />
            </Button>

            <Button
              onClick={() => setSelectedMenu('personality')}
              isIconOnly
              className={`flex rounded-xl w-[70px] h-[70px] bg-stone-900 ${
                selectedMenu === 'personality' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <BsFillFilePersonFill size={25} />
            </Button>

            <Button
              onClick={() => setSelectedMenu('clothing')}
              isIconOnly
              className={`flex rounded-xl w-[70px] h-[70px] bg-stone-900 ${
                selectedMenu === 'clothing' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <GiClothes size={25} />
            </Button>
          </div>
        </div>

        <div className="flex p-3 flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <ButtonGroup>
              <Button
                isIconOnly
                variant="light"
                onPress={() =>
                  useEmitter('client', 'character_startCreatorRotate', -0.2)
                }
              >
                <MdRotateRight size={20} />
              </Button>
              <Button
                onPress={() => {
                  if (cameraZoom) {
                    setCameraZoom(false);
                    return useEmitter(
                      'client',
                      'character_toggleCreatorCameraToFace',
                      false
                    );
                  }
                  setCameraZoom(true);
                  return useEmitter(
                    'client',
                    'character_toggleCreatorCameraToFace',
                    true
                  );
                }}
                variant="light"
                size="sm"
                color="default"
              >
                {cameraZoom ? 'Afastar câmera' : 'Aproximar câmera'}
              </Button>
              <Button
                isIconOnly
                variant="light"
                onPress={() =>
                  useEmitter('client', 'character_startCreatorRotate', 0.2)
                }
              >
                <MdRotateLeft size={20} />
              </Button>
            </ButtonGroup>
          </div>

          <Button isDisabled={!!characterNameValidationError} variant="flat" color="success" onPress={() => spawnPlayer()}>
            Finalizar
          </Button>
        </div>

        {false && <p className="text-xs text-red-600 p-3">Mensagem de erro</p>}
      </div>
    </main>
  );
}
