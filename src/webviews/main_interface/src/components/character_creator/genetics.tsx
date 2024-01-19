import { Input, Button } from '@nextui-org/react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';
import {
  MdFace,
  MdFace2,
  MdFace3,
  MdFace4,
  MdFace5,
  MdFace6,
} from 'react-icons/md';
import useRequester from '../../utils/useRequester';
import {
  useCharacterHeadBlend,
  useCharacterModel,
  useCharacterName,
  useCharacterNameValidation,
  useRandomFaces,
  useSelectedRandomFace,
} from '../../context/character';
import { useEffect } from 'react';

const regexName =
  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+( [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+)*$/;

export default function Genetics() {
  const characterName = useCharacterName((state) => state.characterName);
  const setCharacterName = useCharacterName((state) => state.setCharacterName);
  const gender = useCharacterModel((state) => state.model);
  const setGender = useCharacterModel((state) => state.setCharacterModel);
  const setFaceMix = useCharacterHeadBlend((state) => state.setFaceMix);
  const setSkinMix = useCharacterHeadBlend((state) => state.setSkinMix);
  const setFatherFace = useCharacterHeadBlend((state) => state.setFatherFace);
  const setFatherSkin = useCharacterHeadBlend((state) => state.setFatherSkin);
  const setMotherFace = useCharacterHeadBlend((state) => state.setMotherFace);
  const setMotherSkin = useCharacterHeadBlend((state) => state.setMotherSkin);
  const randomFaces = useRandomFaces((state) => state.randomFaces);
  const resetRandomFaces = useRandomFaces((state) => state.resetRandomFaces);
  const selectedRandomFace = useSelectedRandomFace(
    (state) => state.selectedRandomFace
  );
  const setSelectedRandomFace = useSelectedRandomFace(
    (state) => state.setSelectedRandomFace
  );
  const characterNameValidationError = useCharacterNameValidation(
    (state) => state.validationErrors
  );
  const setCharacterValidationError = useCharacterNameValidation(
    (state) => state.setValidationErrors
  );

  const { fetchData: setModel } = useRequester('setPedInCreatorModel', false);

  const { fetchData: setHeadBlend } = useRequester(
    'setPedInCreatorHeadBlend',
    false
  );

  useEffect(() => {
    if (characterName.length > 25)
      return setCharacterValidationError(
        'O nome do personagem não pode ter mais de 25 caracteres'
      );

    if (!regexName.test(characterName))
      return setCharacterValidationError('Digite um nome de personagem válido');

    return setCharacterValidationError('');
  }, [characterName]);

  return (
    <div className="flex flex-1 p-5 flex-col gap-5 overflow-y-auto">
      <Input
        value={characterName}
        onValueChange={(e) => setCharacterName(e)}
        size="sm"
        variant="bordered"
        placeholder="Nome do personagem"
        errorMessage={characterNameValidationError}
        isInvalid={!!characterNameValidationError}
      />

      <div className="flex flex-col gap-2">
        <p className="text-sm">Formato do corpo</p>
        <div className="flex flex-row gap-2">
          <Button
            onPress={() => {
              setGender(0x705e61f2);
              setSelectedRandomFace(null);
              return setModel(0x705e61f2);
            }}
            isIconOnly
            className={`${
              gender === 0x705e61f2 ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <FaMale size={20} />
          </Button>
          <Button
            onPress={() => {
              setGender(0x9c9effd8);
              setSelectedRandomFace(null);
              return setModel(0x9c9effd8);
            }}
            isIconOnly
            className={`${
              gender === 0x9c9effd8 ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <FaFemale size={20} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2 w-full items-center">
        <div className="w-full">
          <Button
            variant="light"
            size="sm"
            color="success"
            onPress={() => {
              setSelectedRandomFace(null);
              resetRandomFaces();
            }}
          >
            <RxUpdate />
            Gerar novos rostos
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {randomFaces.map((e, i) => (
            <Button
              key={i}
              className={`flex flex-col w-[50px] h-[80px] p-2 bg-[#424242] ${
                selectedRandomFace === i ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => {
                setSelectedRandomFace(i);
                setFatherFace(e.fatherFace);
                setFatherSkin(e.fatherSkin);
                setMotherFace(e.motherFace);
                setMotherSkin(e.motherSkin);
                setFaceMix(e.faceMix);
                setSkinMix(e.skinMix);

                setHeadBlend({
                  fatherFace: e.fatherFace,
                  motherFace: e.motherFace,
                  fatherSkin: e.fatherSkin,
                  motherSkin: e.motherSkin,
                  faceMix: e.faceMix,
                  skinMix: e.skinMix,
                });
              }}
            >
              {e.iconId === 1 && <MdFace size={40} />}
              {e.iconId === 2 && <MdFace2 size={40} />}
              {e.iconId === 3 && <MdFace3 size={40} />}
              {e.iconId === 4 && <MdFace4 size={40} />}
              {e.iconId === 5 && <MdFace5 size={40} />}
              {e.iconId === 6 && <MdFace6 size={40} />}
              <p className="text-[10px]">{e.adjective}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
