import { CommonModule } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
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
	templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
	store = inject(PokemonStore);
	route = inject(ActivatedRoute);
	router = inject(Router);

	ngOnInit() {
		// Subscribe to route parameters to sync Grid and Detail views
		this.route.paramMap.subscribe((params) => {
			const id = params.get("id");
			if (id) {
				this.store.syncWithId(id);
			} else {
				// Default to ID 1 (Bulbasaur) if no ID provided
				this.store.syncWithId("1");
			}
		});
	}

	onSelect(pokemon: Pokemon) {
		this.store.selectPokemon(pokemon);
		this.router.navigate(["/pokemon", pokemon.id]);
	}
}
