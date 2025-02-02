export interface Character {
  id: number;
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

export interface GetCharactersOkResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export interface GetCharactersErrorResponse {
  error: string;
}

export type GetCharactersResult =
  | ({ success: false } & GetCharactersErrorResponse)
  | { success: true; data: GetCharactersOkResponse };
