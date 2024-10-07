
export interface Sprite {
  front_default: string,
  back_default: string,
}
export interface Stat {
  base_stat: number,
  effort: number,
  stat: {
    name: string
  }
}
export interface Type {
  slot: number,
  type: {
    name: string
  }
}
export interface Ability {
  is_hidden: boolean,
  ability: {
    name: string
  }
}
export interface PokemonDetail {
  name: string,
  height: number,
  weight: number,
  sprites: {
    front_default: string,
    back_default: string,
  },
  stats: Stat[],
  types: Type[],
  abilities: Ability[]
}