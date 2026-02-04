import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
	selector: "app-pokemon-grid",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./pokemon-grid.component.html",
})
export class PokemonGridComponent {
	@Input() pokemons: Pokemon[] = [];
	@Output() select = new EventEmitter<Pokemon>();
}
