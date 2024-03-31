import * as alt from 'alt-server';

class Consumable implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public value: number;
  public kind: 'food' | 'drink' | 'alcohol' | 'firstAid';

  constructor(
    name: string,
    description: string,
    quality: 'Comum' | 'Incomum' | 'Raro',
    weight: number,
    value: number,
    kind: 'food' | 'drink' | 'alcohol' | 'firstAid'
  ) {
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.weight = weight;
    this.value = value;
    this.kind = kind;
  }

  public consume(player: alt.Player) {
    // TODO
  }
}

export default Consumable;
