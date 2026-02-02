import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../../infrastructure/repositories/pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private readonly repository: PokemonRepository) {}

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async findBy(params: any) {
     // Mock search for now or implement full text search in firestore
     const result = await this.repository.findById(params.query);
     return { items: result ? [result] : [] };
  }
}
