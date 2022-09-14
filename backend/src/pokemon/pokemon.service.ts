import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';

import { PokemonSearchInput } from './dto/pokemon-search.input';
import { PokemonPaginationInput } from './dto/pokemon-pagination.input';

import { Pokemon } from './entities/pokemon.entity';
import { PokemonResponse } from './dto/pokemon-response.output';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: BaseFirestoreRepository<Pokemon>,
  ) {}

  async findAll({ limit }: PokemonPaginationInput): Promise<PokemonResponse> {
    const pokemons = await this.pokemonRepository.orderByAscending('id').limit(limit).find();

    return { pokemons };
  }

  async findBy({ id, name }: PokemonSearchInput): Promise<PokemonResponse> {
    let pokemon = null;

    if (id) {
      pokemon = await this.pokemonRepository.findById(id);
    }
    if (name) {
      pokemon = await this.pokemonRepository.whereEqualTo('name', name).findOne();
    }

    if (!pokemon) return { message: 'Pokemon not found' };

    return { pokemon };
  }
}
