import { Resolver, Query, Args } from '@nestjs/graphql';

import { PokemonService } from './pokemon.service';

import { PokemonPaginationInput } from './dto/pokemon-pagination.input';
import { PokemonSearchInput } from './dto/pokemon-search.input';
import { PokemonResponse } from './dto/pokemon-response.output';

@Resolver(() => PokemonResponse)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonResponse)
  getPokemons(
    @Args('params', { type: () => PokemonPaginationInput })
    params: PokemonPaginationInput,
  ) {
    return this.pokemonService.findAll(params);
  }

  @Query(() => PokemonResponse)
  getPokemonBy(
    @Args('params', { type: () => PokemonSearchInput })
    params: PokemonSearchInput,
  ) {
    return this.pokemonService.findBy(params);
  }
}
