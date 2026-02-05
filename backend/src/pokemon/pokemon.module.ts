import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PokemonResolver } from "./pokemon.resolver";
import { PokemonService } from "./application/services/pokemon.service";
import { InMemoryPokemonRepository } from "./infrastructure/in-memory-pokemon.repository";
import { SeedingService } from "./application/services/seeding.service";

@Module({
	imports: [HttpModule],
	controllers: [],
	providers: [
        PokemonResolver,
        PokemonService,
        InMemoryPokemonRepository,
        SeedingService
    ],
	exports: [PokemonService],
})
export class PokemonModule {}
