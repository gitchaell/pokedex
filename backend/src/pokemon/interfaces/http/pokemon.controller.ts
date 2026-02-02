import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PokemonService } from '../../application/services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  async getPokemon(@Param('id') id: string) {
    const pokemon = await this.pokemonService.findById(id);
    if (!pokemon) throw new NotFoundException('Pokemon not found');
    return pokemon;
  }
}
