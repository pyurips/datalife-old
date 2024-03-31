class Character {
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
  //public belongings: Belongings; TODO

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
}

export default Character;
