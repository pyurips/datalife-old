type IMaterials = {
  id: number;
  name: string;
  weight: number;
  quality: 1 | 2 | 3;
};

const materials: IMaterials[] = [
  {
    id: 1,
    name: "Roupa 1",
    weight: 1,
    quality: 1,
  },
];

export default materials;
