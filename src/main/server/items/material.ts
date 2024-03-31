import * as alt from 'alt-server';

class Material implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;

  constructor(
    name: string,
    description: string,
    quality: 'Comum' | 'Incomum' | 'Raro',
    weight: number
  ) {
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.weight = weight;
  }
}

export default Material;
