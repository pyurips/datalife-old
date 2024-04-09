import * as alt from 'alt-server';

class Drop {
  public position: alt.Vector3;
  public itemId: number;
  public itemWeight: number;
  public itemQuantity: number;
  public itemQuality: 0 | 1 | 2;
  public createdAt: number;
  public dropInstance: alt.Object;

  constructor(
    itemId: number,
    itemWeight: number,
    itemQuantity: number,
    itemQuality: 0 | 1 | 2,
    position: alt.Vector3
  ) {
    itemId = this.itemId;
    itemWeight = this.itemWeight;
    itemQuantity = this.itemQuantity;
    itemQuality = this.itemQuality;
    position = this.position;
    this.createdAt = Date.now();
    this.dropInstance = new alt.Object(
      'prop_cs_box_clothes',
      position,
      new alt.Vector3(0, 0, 0)
    );
  }
  public delete() {}
  static getDropIdByInstance() {}
}

export default Drop;
