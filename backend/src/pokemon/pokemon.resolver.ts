import { Resolver, Query, Args } from '@nestjs/graphql';
import { PokemonService } from './application/services/pokemon.service';
import { PokemonResponse } from './dto/pokemon-response.output';

@Resolver(() => PokemonResponse)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => PokemonResponse)
  async searchPokemon(
    @Args('query', { type: () => String }) query: string,
  ) {
    const result = await this.pokemonService.findBy({ query });
    return {
        pokemons: result.items.map((p: any) => ({
            id: p.id,
            number: p.number,
            name: p.name,
            types: p.types,
            stats: p.stats,
            moves: p.moves,
            sprites: p.sprites
        }))
    };
  }
}
