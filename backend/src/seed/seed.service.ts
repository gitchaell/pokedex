import { Injectable, Logger } from '@nestjs/common';
import { PokemonService } from '../pokemon/application/services/pokemon.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly pokemonService: PokemonService) {}

  async execute() {
    this.logger.log('Starting seed...');
    // Seed first 20 pokemon
    for (let i = 1; i <= 20; i++) {
        await this.pokemonService.findById(i.toString());
    }
    // Also Ensure Lucario (448) and Garchomp (445)
    await this.pokemonService.findById('448');
    await this.pokemonService.findById('445');

    return 'Seed executed';
  }
}
