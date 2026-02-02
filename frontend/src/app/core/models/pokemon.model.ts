export interface PokemonStats {
	health: number;
	attack: number;
	defense: number;
	resistance: number;
	speed: number;
}

export interface PokemonMove {
	name: string;
	type: string;
	damage: number;
	power?: number;
	powerSegments?: number;
}

export interface PokemonSprites {
	regular: string;
	shiny: string;
}

export interface PokemonPhysic {
	weight: number;
	weightUnit: string;
	height: number;
	heightUnit: string;
}

export interface Pokemon {
	id: string;
	number: number;
	name: string;
	types: string[];
	stats: PokemonStats;
	moves: PokemonMove[];
	sprites: PokemonSprites;
	physic: PokemonPhysic;
}
