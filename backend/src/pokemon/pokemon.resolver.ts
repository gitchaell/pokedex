import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Pokemon } from './entities/pokemon.entity';
import { PokemonInput } from './dto/pokemon.input';
import { PokemonService } from './pokemon.service';

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Mutation(() => Pokemon)
  createPokemon(@Args('pokemonInput') pokemonInput: PokemonInput) {
    return this.pokemonService.create(pokemonInput);
  }

  @Query(() => [Pokemon])
  getPokemons() {
    return this.pokemonService.findAll();
  }

  @Query(() => Pokemon)
  getPokemonBy(@Args('id', { type: () => String }) id: string, @Args('name', { type: () => String }) name: string) {
    return this.pokemonService.findBy({ id, name });
  }

  @Mutation(() => Pokemon)
  removePokemon(@Args('id', { type: () => Int }) id: string) {
    return this.pokemonService.remove(id);
  }
}
