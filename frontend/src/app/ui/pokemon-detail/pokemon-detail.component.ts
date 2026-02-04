import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
	selector: "app-pokemon-detail",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./pokemon-detail.component.html",
})
export class PokemonDetailComponent {
	@Input() pokemon!: Pokemon;
}
