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
	powerSegments: number; // 0-10
}

export interface PokemonSprites {
	regular: string;
	shiny: string;
}

export class Pokemon {
	constructor(
		public readonly id: string,
		public readonly number: number,
		public readonly name: string,
		public readonly types: string[],
		public readonly stats: PokemonStats,
		public readonly moves: PokemonMove[],
		public readonly sprites: PokemonSprites,
	) {}
}
