import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PokemonStats {
	@Field() health: number;
	@Field() attack: number;
	@Field() defense: number;
	@Field() resistance: number;
	@Field() speed: number;
}

@ObjectType()
export class PokemonMove {
	@Field() name: string;
	@Field() type: string;
	@Field() damage: number;
	@Field({ nullable: true }) power?: number;
	@Field({ nullable: true }) powerSegments?: number;
}

@ObjectType()
export class PokemonSprites {
	@Field() regular: string;
	@Field() shiny: string;
}

@ObjectType()
export class PokemonPhysic {
	@Field() weight: number;
	@Field() weightUnit: string;
	@Field() height: number;
	@Field() heightUnit: string;
}

@ObjectType()
export class PokemonEvolution {
	@Field(() => [String]) pre: string[];
	@Field(() => [String]) pos: string[];
}

@ObjectType()
export class PokemonAnimation {
	@Field() url: string;
	@Field() status: string;
}

@ObjectType()
export class PokemonVoice {
	@Field() url: string;
	@Field() status: string;
}

@ObjectType()
export class Pokemon {
	@Field(() => String)
	id!: string;

	// number puede existir o no en algunos lugares: lo marcamos nullable para flexibilidad
	@Field(() => Number, { nullable: true })
	number?: number;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	specie?: string;

	@Field(() => [String])
	types: string[];

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => PokemonPhysic, { nullable: true })
	physic?: PokemonPhysic;

	@Field(() => [String], { nullable: true })
	counters?: string[];

	@Field(() => PokemonStats, { nullable: true })
	stats?: PokemonStats;

	@Field(() => PokemonEvolution, { nullable: true })
	evolution?: PokemonEvolution;

	@Field(() => [PokemonAnimation], { nullable: true })
	animations?: PokemonAnimation[];

	@Field(() => [PokemonVoice], { nullable: true })
	voices?: PokemonVoice[];

	@Field(() => [PokemonMove])
	moves: PokemonMove[];

	@Field(() => PokemonSprites, { nullable: true })
	sprites?: PokemonSprites;
}
