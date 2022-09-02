import { Injectable } from '@nestjs/common';
import { CreatePokemonInput } from './dto/create-pokemon.input';

@Injectable()
export class PokemonService {
  create(createPokemonInput: CreatePokemonInput) {
    console.log('~ createPokemonInput', createPokemonInput);
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
