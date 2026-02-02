import { registerEnumType } from "@nestjs/graphql";

export enum PokemonStatus {
	normal = "normal",
	attacking = "attacking",
	roaring = "roaring",
}

registerEnumType(PokemonStatus, {
	name: "PokemonStatus",
	description: "Status of Pokemon animations and voices.",
});
