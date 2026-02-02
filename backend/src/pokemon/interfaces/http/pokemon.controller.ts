import { Controller, Get, Param, NotFoundException, Query } from "@nestjs/common";
import { PokemonService } from "../../application/services/pokemon.service";

@Controller("pokemon")
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) {}

	@Get()
	async search(@Query("query") query: string) {
		return this.pokemonService.search(query || "");
	}

	@Get(":id")
	async getPokemon(@Param("id") id: string) {
		const pokemon = await this.pokemonService.findById(id);
		if (!pokemon) throw new NotFoundException("Pokemon not found");
		return pokemon;
	}
}
