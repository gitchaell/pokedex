import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private apollo = inject(Apollo);

  getPokemon(id: string): Observable<Pokemon> {
    // REST for detailed view
    // Assuming backend endpoint is http://localhost:3000/pokemon/:id
    // But environment.endpoint is graphql. We need a REST base url.
    // For now deriving it.
    const baseUrl = environment.endpoint.replace('/graphql', '');
    return this.http.get<Pokemon>(`${baseUrl}/pokemon/${id}`);
  }

  searchPokemons(query: string): Observable<Pokemon[]> {
    return this.apollo.query<any>({
      query: gql`
        query Search($q: String!) {
          searchPokemon(query: $q) {
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
      `,
      variables: { q: query }
    }).pipe(
      map(result => result.data?.searchPokemon?.pokemons || [])
    );
  }
}
