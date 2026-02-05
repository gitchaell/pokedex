import { Injectable } from "@nestjs/common";
import { InMemoryPokemonRepository } from "../../infrastructure/in-memory-pokemon.repository";

@Injectable()
export class PokemonService {
	constructor(private readonly repository: InMemoryPokemonRepository) {}

	async findById(id: string) {
		return this.repository.findById(id);
	}

	async search(query: string, type?: string, limit?: number, offset?: number) {
		const items = await this.repository.search(query, type, limit, offset);
		return { items };
	}
}
