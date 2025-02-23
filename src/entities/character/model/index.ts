export type CharacterId = number;

export interface Character {
  id: CharacterId;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecies;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export enum CharacterGender {
  Male = 'Male',
  Female = 'Female',
  Genderless = 'Genderless',
  Unknown = 'unknown',
}

export enum CharacterSpecies {
  Human = 'Human',
  Alien = 'Alien',
  Humanoid = 'Humanoid',
  unknown = 'unknown',
  Poopybutthole = 'Poopybutthole',
  MythologicalCreature = 'Mythological Creature',
  Animal = 'Animal',
  Robot = 'Robot',
  Cronenberg = 'Cronenberg',
  Disease = 'Disease',
}
