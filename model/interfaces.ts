export namespace Pokemon {

	export interface Pokemon {
		id: string;
		name: string;
		specie: string;
		types: PokemonType[];
		description: string
		weight: string
		height: string
		counters: PokemonType[]
		moves: Move[];
		stat: Stat;
		evolution: Evolution;
		animations: Media[];
		voices: Media[];
	}

	export type PokemonType =
		'Normal'
		| 'Fire'
		| 'Water'
		| 'Grass'
		| 'Electric'
		| 'Ice'
		| 'Fighting'
		| 'Poison'
		| 'Ground'
		| 'Flying'
		| 'Psychic'
		| 'Bug'
		| 'Rock'
		| 'Ghost'
		| 'Dark'
		| 'Dragon'
		| 'Steel'
		| 'Fairy';


	export interface Move {
		name: string;
		damage: number;
		type: PokemonType;
	}

	export interface Stat {
		health: number;
		attack: number;
		defense: number;
		resistence: number;
		speed: number;
	}

	export interface Evolution {
		from: string[];
		to: string[];
	}

	export interface Media {
		url: string;
		status: 'Normal' | 'Attacking' | 'Roaring';
	}

}