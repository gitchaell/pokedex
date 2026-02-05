import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { PokemonService } from "./application/services/pokemon.service";
import { PokemonResponse } from "./dto/pokemon-response.output";
import { Pokemon } from "./entities/pokemon.entity";

@Resolver(() => Pokemon)
export class PokemonResolver {
	constructor(private readonly pokemonService: PokemonService) {}

	@Query(() => PokemonResponse)
	async searchPokemon(
		@Args("query", { type: () => String, nullable: true }) query: string = "",
		@Args("type", { type: () => String, nullable: true }) type: string = "",
		@Args("limit", { type: () => Int, nullable: true }) limit: number = 20,
		@Args("offset", { type: () => Int, nullable: true }) offset: number = 0,
	) {
		const result = await this.pokemonService.search(query, type, limit, offset);
		return {
			pokemons: result.items,
		};
	}

	@Query(() => Pokemon, { nullable: true })
	async getPokemon(@Args("id", { type: () => String }) id: string) {
		return this.pokemonService.findById(id);
	}
}
