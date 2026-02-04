import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PokemonStore } from "../../core/store/pokemon.store";
import { SearchComponent, type SearchParams } from "../search/search.component";

@Component({
	selector: "app-main-layout",
	standalone: true,
	imports: [CommonModule, SearchComponent],
	templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent {
	store = inject(PokemonStore);

	onSearch(params: SearchParams) {
		this.store.search(params.query, params.type, params.limit);
	}
}
