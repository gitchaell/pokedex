import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { InMemoryPokemonRepository } from "../../infrastructure/in-memory-pokemon.repository";
import { Pokemon } from "../../entities/pokemon.entity";

@Injectable()
export class SeedingService implements OnModuleInit {
	private readonly logger = new Logger(SeedingService.name);

	constructor(private readonly repository: InMemoryPokemonRepository) {}

	async onModuleInit() {
		this.logger.log("Loading Pokemons from static seed file...");
		try {
			const seedPath = path.join(
				__dirname,
				"../../infrastructure/seed-data.json",
			);

			if (!fs.existsSync(seedPath)) {
				this.logger.error(`Seed file not found at ${seedPath}`);
				return;
			}

			const rawData = fs.readFileSync(seedPath, "utf-8");
			const pokemons: Pokemon[] = JSON.parse(rawData);

			await this.repository.saveAll(pokemons);
			this.logger.log(`Loaded ${pokemons.length} pokemons from file.`);
		} catch (error) {
			this.logger.error("Failed to load seed data", error);
		}
	}
}
