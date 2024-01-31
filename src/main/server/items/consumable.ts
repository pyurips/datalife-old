type IConsumable = {
  id: number;
  name: string;
  description: string;
  weight: number;
  quality: 1 | 2 | 3;
  value: number;
  kind: "food" | "drink" | "alcohol" | "firstAid";
};

const consumable: IConsumable[] = [
  {
    id: 1,
    name: "Consumível",
    description: "Descrição do consumível",
    weight: 1,
    quality: 1,
    value: 12,
    kind: "drink"
  },
];

export default consumable;
