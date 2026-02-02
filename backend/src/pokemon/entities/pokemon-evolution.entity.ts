import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PokemonEvolution {
	@Field(() => [String], {
		nullable: true,
		defaultValue: [],
		description: "Pre-evolutions Identifiers",
	})
	pre?: string[];

	@Field(() => [String], {
		nullable: true,
		defaultValue: [],
		description: "Evolutions Identifiers",
	})
	pos?: string[];
}
