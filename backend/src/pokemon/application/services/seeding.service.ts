import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';
import { InMemoryPokemonRepository } from '../../infrastructure/in-memory-pokemon.repository';
import { Pokemon } from '../../entities/pokemon.entity';

@Injectable()
export class SeedingService implements OnModuleInit {
  private readonly logger = new Logger(SeedingService.name);

  constructor(private readonly repository: InMemoryPokemonRepository) {}

  async onModuleInit() {
    this.logger.log('Seeding Pokemons from PokeAPI...');
    try {
      // Fetch 150
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const pokemons: Pokemon[] = [];
      const promises = data.results.map(async (result: any) => {
          try {
            const { data: details } = await axios.get(result.url);
            const id = details.id.toString();

            // Basic move mapping (without extra fetch)
            const moves = details.moves.slice(0, 4).map((m: any) => ({
                name: m.move.name,
                type: 'normal', // Default since we don't fetch move details
                damage: 0,
                power: 0,
                powerSegments: 0
            }));

            const pokemon: Pokemon = {
                id: id,
                number: details.id,
                name: details.name,
                types: details.types.map((t: any) => t.type.name),
                sprites: {
                    regular: `https://shinyhunters.com/images/regular/${id}.gif`,
                    shiny: `https://shinyhunters.com/images/shiny/${id}.gif`
                },
                stats: {
                    health: details.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
                    attack: details.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
                    defense: details.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
                    resistance: details.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
                    speed: details.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
                },
                physic: {
                    weight: details.weight / 10,
                    weightUnit: 'kg',
                    height: details.height / 10,
                    heightUnit: 'm'
                },
                moves: moves,
                evolution: { pre: [], pos: [] },
                voices: [],
                animations: [],
                specie: 'Unknown',
                description: '',
                counters: []
            };
            return pokemon;
          } catch (e) {
              this.logger.error(`Error fetching details for ${result.name}`);
              return null;
          }
      });

      const results = await Promise.all(promises);
      const validPokemons = results.filter((p): p is Pokemon => p !== null);

      // Sort by number
      validPokemons.sort((a, b) => (a.number || 0) - (b.number || 0));

      await this.repository.saveAll(validPokemons);
      this.logger.log(`Seeded ${validPokemons.length} pokemons.`);
    } catch (error) {
      this.logger.error('Failed to seed pokemons', error);
    }
  }
}
