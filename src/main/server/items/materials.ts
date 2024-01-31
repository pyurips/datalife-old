type IMaterials = {
  id: number;
  name: string;
  description: string;
  weight: number;
  quality: 1 | 2 | 3;
};

const materials: IMaterials[] = [
  {
    id: 1,
    name: "Roupa 1",
    description: "Descrição da roupa",
    weight: 1,
    quality: 1,
  },
];

export default materials;
