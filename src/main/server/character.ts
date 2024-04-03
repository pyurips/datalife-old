import * as alt from 'alt-server';
import { Cloth, Material, Prop, Consumable } from './item.js';
import Utils from './utils.js';

class Character {
  private playerInstance: alt.Player;
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
    hunger: { value: number; rate: number };
    thirst: { value: number; rate: number };
    fatigue: { value: number; rate: number };
    bathroom: { value: number; rate: number };
    hygiene: { value: number; rate: number };
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

  public updateAll(
    health: number,
    money: number,
    bank: number,
    level: number,
    experience: number,
    belongings: (Cloth | Material | Prop | Consumable)[],
    weightCapacity: number,
    needs: {
      hunger: { value: number; rate: number };
      thirst: { value: number; rate: number };
      fatigue: { value: number; rate: number };
      bathroom: { value: number; rate: number };
      hygiene: { value: number; rate: number };
    },
    conditions: {
      type: string;
      level: number;
      rate: number;
    }[],
    skills: {
      type: string;
      level: number;
      experience: number;
      rate: number;
    }[]
  ) {
    this.health = health;
    this.money = money;
    this.bank = bank;
    this.level = level;
    this.experience = experience;
    this.belongings = belongings;
    this.weightCapacity = weightCapacity;
    this.needs = needs;
    this.conditions = conditions;
    this.skills = skills;
  }

  public loadIntoWorld() {
    this.playerInstance.spawn(-14.295, 24.695, 71.656);
    this.playerInstance.dimension = 0;
    this.playerInstance.giveWeapon(alt.hash('weapon_pistol'), 50, false);
  }

  public getAllAttributes() {
    return {
      health: this.health,
      money: this.money,
      bank: this.bank,
      level: this.level,
      experience: this.experience,
      weightCapacity: this.weightCapacity,
    };
  }

  public addToBelongings(
    id: number,
    type: 'cloth' | 'material' | 'prop' | 'consumable',
    quality: 0 | 1 | 2
  ) {
    if (type === 'cloth') return this.belongings.push(new Cloth(id, quality));
    if (type === 'material')
      return this.belongings.push(new Material(id, quality));
    if (type === 'prop') return this.belongings.push(new Prop(id, quality));
    if (type === 'consumable')
      return this.belongings.push(new Consumable(id, quality));
    throw Utils.sendClientError(1712133551);
  }

  public getBelongings() {
    return this.belongings.map((item) => item.getAttributes());
  }

  public callableByRPC = {
    getAllAttributes: this.getAllAttributes,
    loadIntoWorld: this.loadIntoWorld,
    getBelongings: this.getBelongings,
  };
}

export default Character;
