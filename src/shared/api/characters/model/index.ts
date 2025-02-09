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

export interface GetCharactersResult {
  data: GetCharactersOkResponse | null;
  error: string | null;
}

export interface GetCharacterResult {
  data: Character | null;
  error: string | null;
}

export enum QueryParams {
  Page = 'page',
  Name = 'name',
}

export type CharactersQueryParams = Partial<{
  [key in QueryParams]: key extends QueryParams.Page ? number : string;
}>;

export interface GetCharactersRequestState extends GetCharactersResult {
  isLoading: boolean;
}

export interface GetCharacterRequestState extends GetCharacterResult {
  isLoading: boolean;
}
