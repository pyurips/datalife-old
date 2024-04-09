import * as alt from 'alt-server';
import Account from './account.js';

class Drop {
  static allDrops: Drop[] = [];
  public position: alt.Vector3;
  public itemId: number;
  public itemWeight: number;
  public itemQuantity: number;
  public itemQuality: 0 | 1 | 2;
  public itemType: 'cloth' | 'material' | 'consumable';
  public createdAt: number;
  public dropInstance: alt.Object;

  constructor(
    itemId: number,
    itemWeight: number,
    itemQuantity: number,
    itemQuality: 0 | 1 | 2,
    itemType: 'cloth' | 'material' | 'consumable',
    position: alt.Vector3
  ) {
    itemId = this.itemId;
    itemWeight = this.itemWeight;
    itemQuantity = this.itemQuantity;
    itemQuality = this.itemQuality;
    itemType = this.itemType;
    position = this.position;
    this.createdAt = Date.now();
    this.dropInstance = new alt.Object(
      'prop_cs_box_clothes',
      position,
      new alt.Vector3(Math.random() * 0.2, Math.random() * 0.2, 0)
    );
  }

  public delete(dropInstance: alt.Object) {
    Drop.allDrops = Drop.allDrops.filter(
      (drop) => drop.dropInstance.id !== dropInstance.id
    );
    dropInstance.destroy();
  }

  public addToBelongings(account: Account) {
    account.character.addToBelongings(
      this.itemId,
      this.itemType,
      this.itemQuality,
      this.itemQuantity
    );
    this.delete(this.dropInstance);
  }

  static getDropIdByInstance(dropInstance: alt.Object) {
    return Drop.allDrops.find(
      (drop) => drop.dropInstance.id === dropInstance.id
    );
  }
}

export default Drop;
