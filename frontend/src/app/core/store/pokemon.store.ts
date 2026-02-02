import { inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import type { Pokemon } from "../models/pokemon.model";
import { PokemonService } from "../services/pokemon.service";

type PokemonState = {
  selectedPokemon: Pokemon | null;
  gridPokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
};

const initialState: PokemonState = {
  selectedPokemon: null,
  gridPokemons: [],
  loading: false,
  error: null,
  searchQuery: "",
};

export const PokemonStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, service = inject(PokemonService)) => ({
    loadPokemon: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((id) =>
          service.getPokemon(id).pipe(
            tapResponse({
              next: (pokemon) =>
                patchState(store, { selectedPokemon: pokemon, loading: false }),
              error: (err: any) =>
                patchState(store, { error: err.message, loading: false }),
            }),
          ),
        ),
      ),
    ),

    search: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) =>
          patchState(store, { searchQuery: query, loading: true }),
        ),
        switchMap((query) =>
          service.searchPokemons(query).pipe(
            tapResponse({
              next: (pokemons) =>
                patchState(store, { gridPokemons: pokemons, loading: false }),
              error: (err: any) =>
                patchState(store, { error: err.message, loading: false }),
            }),
          ),
        ),
      ),
    ),

    selectPokemon(pokemon: Pokemon) {
      patchState(store, { selectedPokemon: pokemon });
    },
  })),
);
