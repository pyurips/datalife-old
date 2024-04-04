import * as alt from 'alt-server';
import Utils from './utils.js';

abstract class Item {
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
    },
  ];

  constructor(id: number, quality: 0 | 1 | 2, quantity: number = 1) {
    if (quantity < 1) throw Utils.sendClientError(1712148108);
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight;
    this.stackable = this.itemsList[id].stackable;
    this.componentId = this.itemsList[id].componentId;
    this.drawableId = this.itemsList[id].drawableId;
    this.textureId = this.itemsList[id].textureId;
    this.upperBody = this.itemsList[id].upperBody;
    this.quality = quality;
    this.quantity = quantity;
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

export class Prop implements Item {
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

  private itemsList = [
    {
      name: 'Óculos de Sol',
      description: 'Óculos de sol comum',
      weight: 0.1,
      stackable: false,
      componentId: 1,
      drawableId: 1,
      textureId: 0,
      upperBody: 0,
    },
    {
      name: 'Boné',
      description: 'Um boné comum',
      weight: 0.1,
      stackable: false,
      componentId: 0,
      drawableId: 0,
      textureId: 0,
      upperBody: 0,
    },
    {
      name: 'Máscara',
      description: 'Uma máscara comum',
      weight: 0.1,
      stackable: false,
      componentId: 1,
      drawableId: 0,
      textureId: 0,
      upperBody: 0,
    },
  ];

  constructor(id: number, quality: 0 | 1 | 2, quantity: number = 1) {
    if (quantity < 1) throw Utils.sendClientError(1712148108);
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight;
    this.stackable = this.itemsList[id].stackable;
    this.componentId = this.itemsList[id].componentId;
    this.drawableId = this.itemsList[id].drawableId;
    this.textureId = this.itemsList[id].textureId;
    this.upperBody = this.itemsList[id].upperBody;
    this.quality = quality;
    this.quantity = quantity;
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

  public getAttributes() {
    return {
      name: this.name,
      description: this.description,
      quality: this.quality,
      weight: this.weight,
      type: 'prop',
      quantity: this.quantity,
    };
  }
}

export class Consumable implements Item {
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
    this.weight = this.itemsList[id].weight;
    this.stackable = this.itemsList[id].stackable;
    this.value = this.itemsList[id].value;
    this.quality = quality;
    this.quantity = quantity;
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
    this.name = this.itemsList[id].name;
    this.description = this.itemsList[id].description;
    this.weight = this.itemsList[id].weight;
    this.stackable = this.itemsList[id].stackable;
    this.quality = quality;
    this.quantity = quantity;
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
