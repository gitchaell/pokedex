import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';

import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonInput } from '../pokemon/dto/pokemon.input';

import { pokemons } from './seed.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: BaseFirestoreRepository<Pokemon>,
  ) {}

  async execute() {
    await this.removeAll();
    await this.createAll(pokemons);

    return 'Seed executed';
  }

  async createAll(pokemons: PokemonInput[]) {
    const commitBatchPromises = [];

    pokemons.forEach(pokemon => {
      const writeBatch = this.pokemonRepository.createBatch();
      writeBatch.create(pokemon);
      commitBatchPromises.push(writeBatch.commit());
    });

    await Promise.all(commitBatchPromises);
  }

  async removeAll() {
    const pokemons = await this.pokemonRepository.find();

    const commitBatchPromises = [];

    pokemons.forEach(pokemon => {
      const writeBatch = this.pokemonRepository.createBatch();
      writeBatch.delete(pokemon);
      commitBatchPromises.push(writeBatch.commit());
    });

    await Promise.all(commitBatchPromises);
  }
}
