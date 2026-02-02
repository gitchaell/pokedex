import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "nestjs-fireorm";
import { BaseFirestoreRepository } from "fireorm";
import { Pokemon } from "../../entities/pokemon.entity";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PokemonRepository {
  private readonly logger = new Logger(PokemonRepository.name);
  private memoryCache: Map<string, Pokemon> = new Map(); // Fallback for local dev without Firestore creds

  constructor(
    @InjectRepository(Pokemon)
    private readonly firestore: BaseFirestoreRepository<Pokemon>,
    private readonly http: HttpService,
  ) {}

  async findById(id: string): Promise<Pokemon | null> {
    const isNumeric = /^\d+$/.test(id);
    let pokemon: Pokemon | null = null;

    // 1. Try Memory Cache (for dev/demo reliability if Firestore fails)
    if (this.memoryCache.has(id.toLowerCase())) {
      return this.memoryCache.get(id.toLowerCase())!;
    }

    // 2. Try Firestore (if configured)
    try {
      if (isNumeric) {
        pokemon = await this.firestore.whereEqualTo("id", id).findOne();
      } else {
        pokemon = await this.firestore
          .whereEqualTo("name", id.toLowerCase())
          .findOne();
      }
    } catch (e) {
      this.logger.warn(
        `Firestore unavailable or not configured, skipping cache check. Error: ${e.message}`,
      );
    }

    if (pokemon) {
      this.logger.log(`Found pokemon ${id} in cache`);
      this.memoryCache.set(id.toLowerCase(), pokemon);
      return pokemon;
    }

    // 3. Fetch from PokeAPI
    this.logger.log(`Pokemon ${id} not in cache, fetching from PokeAPI...`);
    try {
      const { data } = await firstValueFrom(
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`),
      );

      // 4. Transform
      const newPokemon = new Pokemon();
      newPokemon.id = data.id.toString();
      newPokemon.number = data.id;
      newPokemon.name = data.name;
      newPokemon.specie = data.species?.name;
      newPokemon.types = data.types.map((t: any) => t.type.name);
      newPokemon.stats = {
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        resistance: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      };
      // Simplified Moves logic: Take top 4 moves (arbitrary selection for demo)
      newPokemon.moves = data.moves.slice(0, 4).map((m: any) => ({
        name: m.move.name,
        type: "normal",
        // PokeAPI move.power might be present; usamos ese valor para damage y opcionalmente power
        damage: m.move.power ?? 0,
        power: m.move.power ?? undefined,
        powerSegments: m.move.power ? 5 : undefined,
      }));
      newPokemon.physic = {
        weight: data.weight ? data.weight / 10 : undefined, // hectograms -> kg
        weightUnit: "kilogram",
        height: data.height ? data.height / 10 : undefined, // decimeters -> meters
        heightUnit: "meter",
      };
      newPokemon.sprites = {
        regular: `https://shinyhunters.com/images/regular/${data.id}.gif`,
        shiny: `https://shinyhunters.com/images/shiny/${data.id}.gif`,
      };

      // 5. Persist (Try Firestore, Fallback to Memory)
      try {
        await this.firestore.create(newPokemon);
      } catch (e) {
        this.logger.warn(`Could not persist to Firestore: ${e.message}`);
      }

      this.memoryCache.set(newPokemon.id, newPokemon);
      this.memoryCache.set(newPokemon.name.toLowerCase(), newPokemon);

      return newPokemon;
    } catch (e) {
      this.logger.error(`Failed to fetch pokemon ${id}: ${e.message}`);
      return null;
    }
  }
}
