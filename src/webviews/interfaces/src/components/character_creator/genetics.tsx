import {
  Input,
  Button,
  Link,
  Select,
  SelectItem,
  Slider,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Genetics() {
  const [fatherBlends, setFatherBlends] = useState<string[]>([
    'Exemplo',
    'Examplo2',
    'Exemplo3',
  ]);

  return (
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
        <Select size="sm">
          {fatherBlends.map((fatherBlends, index) => (
            <SelectItem key={index} value={fatherBlends}>
              {fatherBlends}
            </SelectItem>
          ))}
        </Select>

        <Select size="sm">
          {fatherBlends.map((fatherBlends, index) => (
            <SelectItem key={index} value={fatherBlends}>
              {fatherBlends}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Slider
          color="foreground"
          size='sm'
          label="Combinação da face"
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.5}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Slider
          color="foreground"
          size='sm'
          label="Combinação da pele"
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.5}
        />
      </div>
    </div>
  );
}
