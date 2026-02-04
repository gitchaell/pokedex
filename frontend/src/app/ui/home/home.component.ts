import { CommonModule } from "@angular/common";
import { Component, effect, inject, type OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import type { Pokemon } from "../../core/models/pokemon.model";
import { PokemonStore } from "../../core/store/pokemon.store";
import { MainLayoutComponent } from "../layout/main-layout.component";
import { PokemonDetailComponent } from "../pokemon-detail/pokemon-detail.component";
import { PokemonGridComponent } from "../pokemon-grid/pokemon-grid.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		CommonModule,
		MainLayoutComponent,
		PokemonDetailComponent,
		PokemonGridComponent,
	],
	template: `
    <app-main-layout>
       <div class="flex flex-col lg:flex-row gap-8 items-start">

          <!-- Sidebar (Left) - Sticky on Desktop -->
          <div class="lg:w-105 w-full flex-none lg:sticky lg:top-24 z-20">
             <div *ngIf="store.loading() && !store.selectedPokemon()" class="flex justify-center p-10">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             </div>

             <app-pokemon-detail
                *ngIf="store.selectedPokemon()"
                [pokemon]="store.selectedPokemon()!">
             </app-pokemon-detail>
          </div>

          <!-- Grid (Right) -->
          <div class="flex-1 w-full min-w-0">
             <div class="mb-6 flex items-end justify-between border-b border-white/5 pb-2">
                <h2 class="text-3xl font-bold text-white font-heading tracking-tight">Pokedex</h2>
                <span class="text-sm text-slate-400 font-mono mb-1">{{ store.gridPokemons().length }} Found</span>
             </div>

             <app-pokemon-grid
                [pokemons]="store.gridPokemons()"
                (select)="onSelect($event)">
             </app-pokemon-grid>

             <div *ngIf="store.gridPokemons().length === 0 && !store.loading()" class="text-center py-20 text-slate-500 font-mono text-sm">
                No Pokemon found. Try searching for something else.
             </div>
          </div>

       </div>
    </app-main-layout>
  `,
})
export class HomeComponent implements OnInit {
	store = inject(PokemonStore);
	route = inject(ActivatedRoute);
	router = inject(Router);

	constructor() {
		// Auto-load based on route if present, otherwise default to 1
		effect(() => {
			const params = this.route.snapshot.params;
			if (params["id"]) {
				this.store.loadPokemon(params["id"]);
			}
		});
	}

	ngOnInit() {
		// Initial Load: List of first 20 and Select Pokemon #1
		this.store.search("");
		if (!this.route.snapshot.params["id"]) {
			this.store.loadPokemon("1");
		}
	}

	onSelect(pokemon: Pokemon) {
		this.store.selectPokemon(pokemon);
		this.router.navigate(["/pokemon", pokemon.id]);
	}
}
