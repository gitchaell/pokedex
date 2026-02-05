import { Injectable } from "@nestjs/common";
import { Pokemon } from "../entities/pokemon.entity";
import data from "./seed-data.json";

@Injectable()
export class InMemoryPokemonRepository {
	private pokemons: Pokemon[] = [];

	constructor() {
		if (Array.isArray(data) && data.length) {
			this.pokemons = data as unknown as Pokemon[];
		}
	}

	async saveAll(pokemons: Pokemon[]): Promise<void> {
		this.pokemons = pokemons;
	}

	async getAll(): Promise<Pokemon[]> {
		return this.pokemons;
	}

	async findById(id: string): Promise<Pokemon | undefined> {
		return this.pokemons.find(
			(p) =>
				p.id === id ||
				p.number?.toString() === id ||
				p.name.toLowerCase() === id.toLowerCase(),
		);
	}

	async search(
		query: string,
		type?: string,
		limit: number = 12,
	): Promise<Pokemon[]> {
		let result = this.pokemons;

		if (query) {
			const q = query.toLowerCase();
			result = result.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					(p.number && p.number.toString().includes(q)),
			);
		}

		if (type && type !== "") {
			result = result.filter((p) =>
				p.types.some((t) => t.toLowerCase() === type.toLowerCase()),
			);
		}

		return result.slice(0, limit);
	}
}
