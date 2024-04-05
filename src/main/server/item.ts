import * as alt from 'alt-server';
import Utils from './utils.js';

abstract class Item {
  abstract id: number;
  abstract name: string;
  abstract description: string;
  abstract quality: 0 | 1 | 2;
  abstract weight: number;
  abstract stackable: boolean;
  abstract quantity: number;
  abstract getAttributes: () => {
    name: string;
    description: string;
    quality: 0 | 1 | 2;
    weight: number;
    type: string;
    quantity: number;
  };
}

export class Cloth implements Item {
  public id: number;
  public name: string;
  public description: string;
  public quality: 0 | 1 | 2;
  public weight: number;
  public componentId: number;
  public drawableId: number;
  public textureId: number;
  public upperBody: number;
  public dlc?: number;
  public stackable: boolean;
  public quantity: number;
  public kind: 'cloth' | 'prop';

  private itemsList = [
    {
      name: 'Camiseta',
      description: 'Uma camiseta comum',
      weight: 0.5,
      stackable: false,
      componentId: 11,
      drawableId: 15,
      textureId: 0,
      upperBody: 0,
      kind: 'cloth',
    },
    {
      name: 'Jaqueta',
      description: 'Uma jaqueta comum',
      weight: 1,
      stackable: false,
      componentId: 11,
      drawableId: 15,
      textureId: 1,
      upperBody: 0,
      kind: 'cloth',
    },
    {
      name: 'Colete',
      description: 'Um colete comum',
      weight: 1.5,
      stackable: false,
      componentId: 9,
      drawableId: 9,
      textureId: 0,
      upperBody: 1,
      kind: 'cloth',
    },
  ];

  constructor(id: number, quality: 0 | 1 | 2, quantity: number = 1) {
    if (quantity < 1) throw Utils.sendClientError(1712148108);
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight * quantity;
    this.stackable = this.itemsList[id].stackable;
    this.componentId = this.itemsList[id].componentId;
    this.drawableId = this.itemsList[id].drawableId;
    this.textureId = this.itemsList[id].textureId;
    this.upperBody = this.itemsList[id].upperBody;
    this.quality = quality;
    this.quantity = quantity;
    this.id = id;
  }

  public wear(player: alt.Player) {
    if (this.kind === 'cloth')
      return this.dlc
        ? player.setDlcClothes(
            this.dlc,
            this.componentId,
            this.drawableId,
            this.textureId
          )
        : player.setClothes(this.componentId, this.drawableId, this.textureId);
    if (this.kind === 'prop')
      return this.dlc
        ? player.setDlcProp(
            this.dlc,
            this.componentId,
            this.drawableId,
            this.textureId
          )
        : player.setProp(this.componentId, this.drawableId, this.textureId);
    throw Utils.sendClientError(1712303663);
  }

  public unwear(player: alt.Player) {
    // TODO
  }

  public getAttributes() {
    return {
      name: this.name,
      description: this.description,
      quality: this.quality,
      weight: this.weight,
      type: 'cloth',
      quantity: this.quantity,
    };
  }
}

export class Consumable implements Item {
  public id: number;
  public name: string;
  public description: string;
  public quality: 0 | 1 | 2;
  public weight: number;
  public value: number;
  public stackable: boolean;
  public kind: 'food' | 'drink' | 'medicine';
  public quantity: number;

  private itemsList = [
    {
      name: 'Pão',
      description: 'Pão fresquinho',
      weight: 0.1,
      stackable: true,
      value: 5,
      kind: 'food',
    },
  ];

  constructor(id: number, quality: 0 | 1 | 2, quantity: number = 1) {
    if (quantity < 1) throw Utils.sendClientError(1712148108);
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight * quantity;
    this.stackable = this.itemsList[id].stackable;
    this.value = this.itemsList[id].value;
    this.quality = quality;
    this.quantity = quantity;
    this.id = id;
  }

  public consume(player: alt.Player) {
    // TODO
  }

  public getAttributes() {
    return {
      name: this.name,
      description: this.description,
      quality: this.quality,
      weight: this.weight,
      type: 'consumable',
      quantity: this.quantity,
    };
  }
}

export class Material implements Item {
  public id: number;
  public name: string;
  public description: string;
  public quality: 0 | 1 | 2;
  public weight: number;
  public stackable: boolean;
  public quantity: number;

  private itemsList = [
    {
      name: 'Ferro',
      description: 'Ferro puro',
      weight: 0.5,
      stackable: true,
    },
  ];

  constructor(id: number, quality: 0 | 1 | 2, quantity: number = 1) {
    if (quantity < 1) throw Utils.sendClientError(1712148108);
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight * quantity;
    this.stackable = this.itemsList[id].stackable;
    this.quality = quality;
    this.quantity = quantity;
    this.id = id;
  }

  public getAttributes() {
    return {
      name: this.name,
      description: this.description,
      quality: this.quality,
      weight: this.weight,
      type: 'material',
      quantity: this.quantity,
    };
  }
}
