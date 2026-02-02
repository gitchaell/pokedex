export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonMove {
  name: string;
  type: string;
  power: number;
  powerSegments: number;
}

export interface PokemonSprites {
  regular: string;
  shiny: string;
  artwork: string;
}

export interface Pokemon {
  id: string;
  number: number;
  name: string;
  types: string[];
  stats: PokemonStats;
  moves: PokemonMove[];
  sprites: PokemonSprites;
}
