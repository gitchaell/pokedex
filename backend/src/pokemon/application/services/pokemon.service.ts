import { Injectable } from "@nestjs/common";
import { PokemonRepository } from "../../infrastructure/repositories/pokemon.repository";

@Injectable()
export class PokemonService {
	constructor(private readonly repository: PokemonRepository) {}

	async findById(id: string) {
		return this.repository.findById(id);
	}

	async search(query: string) {
		const items = await this.repository.search(query);
		return { items };
	}
}
