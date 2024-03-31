import * as alt from 'alt-server';

class Prop implements Item {
  public name: string;
  public description: string;
  public quality: 'Comum' | 'Incomum' | 'Raro';
  public weight: number;
  public componentId: number;
  public drawableId: number;
  public textureId: number;
  public upperBody: number;
  public dlc?: number;

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

export default Prop;
