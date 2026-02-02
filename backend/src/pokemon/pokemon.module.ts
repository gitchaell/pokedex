import { Module } from "@nestjs/common";
import { FireormModule } from "nestjs-fireorm";
import { HttpModule } from "@nestjs/axios";
import { Pokemon } from "./entities/pokemon.entity";
import { PokemonResolver } from "./pokemon.resolver";
import { PokemonService } from "./application/services/pokemon.service";
import { PokemonController } from "./interfaces/http/pokemon.controller";
import { PokemonRepository } from "./infrastructure/repositories/pokemon.repository";

@Module({
  imports: [FireormModule.forFeature([Pokemon]), HttpModule],
  controllers: [PokemonController],
  providers: [PokemonResolver, PokemonService, PokemonRepository],
  exports: [PokemonService, FireormModule],
})
export class PokemonModule {}
