import * as alt from 'alt-server';

abstract class Item {
  abstract name: string;
  abstract description: string;
  abstract quality: 'Comum' | 'Incomum' | 'Raro';
  abstract weight: number;
  abstract stackable: boolean;
}

export class Cloth implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public componentId: number;
  public drawableId: number;
  public textureId: number;
  public upperBody: number;
  public dlc?: number;
  public stackable: boolean;

  constructor(
    name: string,
    description: string,
    quality: 'Comum' | 'Incomum' | 'Raro',
    weight: number,
    componentId: number,
    drawableId: number,
    textureId: number,
    upperBody: number,
    dlc?: number
  ) {
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.weight = weight;
    this.componentId = componentId;
    this.drawableId = drawableId;
    this.textureId = textureId;
    this.upperBody = upperBody;
    this.dlc = dlc;
  }

  public wear(player: alt.Player) {
    if (this.dlc)
      return player.setDlcClothes(
        this.dlc,
        this.componentId,
        this.drawableId,
        this.textureId
      );
    return player.setClothes(this.componentId, this.drawableId, this.textureId);
  }

  public unwear(player: alt.Player) {
    // TODO
  }
}

export class Prop implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public componentId: number;
  public drawableId: number;
  public textureId: number;
  public upperBody: number;
  public dlc?: number;
  public stackable: boolean;

  constructor(
    name: string,
    description: string,
    quality: 'Comum' | 'Incomum' | 'Raro',
    weight: number,
    componentId: number,
    drawableId: number,
    textureId: number,
    upperBody: number,
    dlc?: number
  ) {
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.weight = weight;
    this.componentId = componentId;
    this.drawableId = drawableId;
    this.textureId = textureId;
    this.upperBody = upperBody;
    this.dlc = dlc;
  }

  public wear(player: alt.Player) {
    if (this.dlc)
      return player.setDlcProp(
        this.dlc,
        this.componentId,
        this.drawableId,
        this.textureId
      );
    return player.setProp(this.componentId, this.drawableId, this.textureId);
  }

  public unwear(player: alt.Player) {
    // TODO
  }
}

export class Consumable implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public value: number;
  public kind: 'food' | 'drink' | 'alcohol' | 'firstAid';
  public stackable: boolean;

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

export class Material implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public stackable: boolean;

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