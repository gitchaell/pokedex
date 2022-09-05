import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';

import { PokemonInput } from './dto/pokemon.input';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: BaseFirestoreRepository<Pokemon>,
  ) {}

  create(pokemonInput: PokemonInput) {
    return this.pokemonRepository.create(pokemonInput);
  }

  findAll() {
    return this.pokemonRepository.find();
  }

  findBy({ id, name }: Partial<Pokemon>) {
    if (id) {
      return this.pokemonRepository.findById(id);
    }
    if (name) {
      return this.pokemonRepository.whereEqualTo('name', name).findOne();
    }
  }

  remove(id: string) {
    return this.pokemonRepository.delete(id);
  }
}
