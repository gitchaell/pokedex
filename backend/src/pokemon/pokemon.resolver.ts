import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonInput } from './dto/pokemon.input';

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Mutation(() => Pokemon)
  createPokemon(@Args('pokemonInput') pokemonInput: PokemonInput) {
    return this.pokemonService.create(pokemonInput);
  }

  @Query(() => [Pokemon], { name: 'pokemon' })
  findAll() {
    return this.pokemonService.findAll();
  }

  @Query(() => Pokemon, { name: 'pokemon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pokemonService.findOne(id);
  }

  @Mutation(() => Pokemon)
  removePokemon(@Args('id', { type: () => Int }) id: number) {
    return this.pokemonService.remove(id);
  }
}
