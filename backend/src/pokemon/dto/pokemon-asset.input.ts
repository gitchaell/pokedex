import { Field, InputType } from "@nestjs/graphql";

import { PokemonStatus } from "../enums/pokemon-status.enum";

@InputType()
export class PokemonAssetInput {
	@Field(() => String, {
		description: "Asset External URL",
	})
	url: string;

	@Field(() => PokemonStatus, {
		nullable: true,
		defaultValue: "Normal",
		description: "Pokemon Status. e.g: Normal,Attacking,Roaring",
	})
	status?: PokemonStatus;
}
