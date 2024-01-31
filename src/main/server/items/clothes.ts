type IClothes = {
  id: number;
  name: string;
  description: string;
  weight: number;
  value: number;
  upperBody: number | null;
};

const clothes: IClothes[] = [
  {
    id: 1,
    name: "Roupa 1",
    description: "Descrição da roupa",
    weight: 1,
    value: 1,
    upperBody: 1,
  },
];

export function wear(id: number) {}

export function unwear(id: number) {}

export default clothes;
