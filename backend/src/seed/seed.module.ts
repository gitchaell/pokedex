import { Module } from "@nestjs/common";

import { PokemonModule } from "../pokemon/pokemon.module";

import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";

@Module({
  controllers: [SeedController],
  imports: [PokemonModule],
  providers: [SeedService],
})
export class SeedModule {}
