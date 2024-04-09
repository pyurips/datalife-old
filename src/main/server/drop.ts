import * as alt from 'alt-server';

class Drop {
  public position: alt.Vector3;
  public objectId: number;
  public objectWeight: number;
  public objectQuantity: number;
  public objectQuality: 0 | 1 | 2;
  public createdAt: number;
  public dropInstance: alt.Object;

  constructor(
    objectId: number,
    objectWeight: number,
    objectQuantity: number,
    objectQuality: 0 | 1 | 2
  ) {
    objectId = this.objectId;
    objectWeight = this.objectWeight;
    objectQuantity = this.objectQuantity;
    objectQuality = this.objectQuality;
    this.createdAt = Date.now();
    // this.dropInstance = new alt.Object();
  }
  public delete() {}
  static getDropIdByInstance() {}
}

export default Drop;
