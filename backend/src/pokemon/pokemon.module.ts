import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { Pokemon } from './entities/pokemon.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [FireormModule.forFeature([Pokemon])],
  providers: [PokemonResolver, PokemonService],
  exports: [FireormModule],
})
export class PokemonModule {}
