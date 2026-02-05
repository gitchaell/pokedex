import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import {
	Subject,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	tap,
} from "rxjs";
import type { Pokemon } from "../models/pokemon.model";
import { PokemonService } from "../services/pokemon.service";

type PokemonState = {
	selectedPokemon: Pokemon | null;
	gridPokemons: Pokemon[];
	loading: boolean;
	error: string | null;
	searchQuery: string;
	searchType: string;
	searchLimit: number;
	page: number;
};

const initialState: PokemonState = {
	selectedPokemon: null,
	gridPokemons: [],
	loading: false,
	error: null,
	searchQuery: "",
	searchType: "",
	searchLimit: 12,
	page: 1,
};

export const PokemonStore = signalStore(
	{ providedIn: "root" },
	withState(initialState),
	withMethods((store, service = inject(PokemonService)) => {
		const searchSubject = new Subject<{
			query: string;
			type: string;
			limit: number;
			page: number;
		}>();

		searchSubject
			.pipe(
				debounceTime(300),
				distinctUntilChanged(
					(p, c) => JSON.stringify(p) === JSON.stringify(c),
				),
				tap((params) =>
					patchState(store, {
						searchQuery: params.query,
						searchType: params.type,
						searchLimit: params.limit,
						loading: true,
					}),
				),
				switchMap((params) =>
					service.searchPokemons(params.query, params.type, params.limit),
				),
			)
			.subscribe({
				next: (pokemons) =>
					patchState(store, { gridPokemons: pokemons, loading: false }),
				error: (err: unknown) =>
					patchState(store, {
						error: err instanceof Error ? err.message : String(err),
						loading: false,
					}),
			});

		return {
			loadPokemon(id: string) {
				patchState(store, { loading: true });
				service.getPokemon(id).subscribe({
					next: (pokemon) =>
						patchState(store, { selectedPokemon: pokemon, loading: false }),
					error: (err: unknown) =>
						patchState(store, {
							error: err instanceof Error ? err.message : String(err),
							loading: false,
						}),
				});
			},

			search(query: string, type: string = "", limit: number = 12) {
				// Reset to page 1 for new search
				searchSubject.next({ query, type, limit, page: 1 });
			},

			setPage(page: number) {
				if (page < 1) return;
				searchSubject.next({
					query: store.searchQuery(),
					type: store.searchType(),
					limit: store.searchLimit(),
					page,
				});
			},

			nextPage() {
				const nextPage = store.page() + 1;
				this.setPage(nextPage);
			},

			prevPage() {
				const prevPage = store.page() - 1;
				this.setPage(prevPage);
			},

			selectPokemon(pokemon: Pokemon) {
				patchState(store, { selectedPokemon: pokemon });
			},

			selectNextPokemon() {
				const current = store.selectedPokemon();
				const list = store.gridPokemons();
				if (!current || list.length === 0) return;
				const index = list.findIndex((p) => p.id === current.id);
				if (index === -1) return;
				const nextIndex = (index + 1) % list.length;
				this.loadPokemon(list[nextIndex].id);
			},

			selectPrevPokemon() {
				const current = store.selectedPokemon();
				const list = store.gridPokemons();
				if (!current || list.length === 0) return;
				const index = list.findIndex((p) => p.id === current.id);
				if (index === -1) return;
				const prevIndex = (index - 1 + list.length) % list.length;
				this.loadPokemon(list[prevIndex].id);
			},
		};
	}),
);
