import * as alt from 'alt-server';
import { Cloth, Material, Prop, Consumable } from './item';

class Character {
  private playerInstance: alt.Player;
  public name: string;
  public health: number;
  public money: number;
  public bank: number;
  public level: number;
  public experience: number;
  //public vehicles: Vehicle[]; TODO
  //public properties: Property[]; TODO
  //public residences: Residence[]; TODO
  //public establishments: Establishment[]; TODO
  //public factions: Faction; TODO
  //public family: Family; TODO
  //public job: Job; TODO
  public belongings: (Cloth | Material | Prop | Consumable)[];
  public weightCapacity: number;

  public needs: {
    hunger: number;
    thirst: number;
    fatigue: number;
    bathroom: number;
    hygiene: number;
  };

  public conditions: {
    type: string;
    level: number;
    rate: number;
  }[];

  public skills: {
    type: string;
    level: number;
    experience: number;
    rate: number;
  }[];

  constructor(player: alt.Player) {
    this.playerInstance = player;
  }

  public create() {}

  public update() {}

  public delete() {}

  public get() {}

  public loadIntoWorld() {
    this.playerInstance.spawn(-14.295, 24.695, 71.656);
    this.playerInstance.dimension = 0;
    this.playerInstance.giveWeapon(0x83bf0278, 999, false);
  }

  public addToBelongings(item: Cloth | Material | Prop | Consumable) {
    this.belongings.push(item);
  }

  public callableByRPC() {}
}

export default Character;
