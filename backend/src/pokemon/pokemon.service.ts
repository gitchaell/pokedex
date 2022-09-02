import { Injectable } from '@nestjs/common';
import { PokemonInput } from './dto/pokemon.input';

@Injectable()
export class PokemonService {
  create(pokemonInput: PokemonInput) {
    console.log('~ pokemonInput', pokemonInput);
    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
