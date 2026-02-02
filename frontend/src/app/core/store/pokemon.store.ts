import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs";
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
	withMethods((store, service = inject(PokemonService)) => {
		// nuevo Subject para manejar búsquedas con debounce
		const searchSubject = new Subject<string>();

		// suscripción que aplica debounce/distinct y actualiza el estado
		searchSubject
			.pipe(
				debounceTime(300),
				distinctUntilChanged(),
				tap((query) =>
					patchState(store, { searchQuery: query, loading: true }),
				),
				switchMap((query) => service.searchPokemons(query)),
			)
			.subscribe({
				next: (pokemons) =>
					patchState(store, { gridPokemons: pokemons, loading: false }),
				error: (err: any) =>
					patchState(store, { error: err?.message ?? String(err), loading: false }),
			});

		return {
			// loadPokemon sin rxMethod, usando subscribe y manejando loading/error
			loadPokemon(id: string) {
				patchState(store, { loading: true });
				service.getPokemon(id).subscribe({
					next: (pokemon) =>
						patchState(store, { selectedPokemon: pokemon, loading: false }),
					error: (err: any) =>
						patchState(store, { error: err?.message ?? String(err), loading: false }),
				});
			},

			// search ahora empuja al Subject
			search(query: string) {
				searchSubject.next(query);
			},

			selectPokemon(pokemon: Pokemon) {
				patchState(store, { selectedPokemon: pokemon });
			},
		};
	}),
);
