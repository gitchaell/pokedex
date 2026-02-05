import { Injectable, inject } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map, type Observable } from "rxjs";
import type { Pokemon } from "../models/pokemon.model";

const GET_POKEMON_QUERY = gql`
  query GetPokemon($id: String!) {
    getPokemon(id: $id) {
      id
      number
      name
      types
      specie
      description
      physic {
        weight
        height
      }
      stats {
        health
        attack
        defense
        resistance
        speed
      }
      moves {
        name
        type
        damage
        power
        powerSegments
      }
      sprites {
        regular
        shiny
      }
    }
  }
`;

const SEARCH_POKEMON_QUERY = gql`
  query Search($query: String, $type: String, $limit: Int, $offset: Int) {
    searchPokemon(query: $query, type: $type, limit: $limit, offset: $offset) {
      pokemons {
        id
        number
        name
        types
        sprites {
          regular
          shiny
        }
      }
    }
  }
`;

@Injectable({ providedIn: "root" })
export class PokemonService {
	private apollo = inject(Apollo);

	getPokemon(id: string): Observable<Pokemon> {
		return this.apollo
			.watchQuery<{ getPokemon: Pokemon }>({
				query: GET_POKEMON_QUERY,
				variables: { id },
				fetchPolicy: "cache-first",
			})
			.valueChanges.pipe(map((result) => result.data.getPokemon));
	}

	searchPokemons(
		query: string,
		type?: string,
		limit: number = 12,
		offset: number = 0,
	): Observable<Pokemon[]> {
		return this.apollo
			.watchQuery<{ searchPokemon: { pokemons: Pokemon[] } }>({
				query: SEARCH_POKEMON_QUERY,
				variables: { query, type, limit, offset },
				fetchPolicy: "cache-and-network",
			})
			.valueChanges.pipe(
				map((result) => result.data?.searchPokemon?.pokemons || []),
			);
	}
}
