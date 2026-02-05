import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
	selector: "app-pokemon-detail",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage],
	templateUrl: "./pokemon-detail.component.html",
})
export class PokemonDetailComponent {
	@Input() pokemon!: Pokemon;
	@Output() prev = new EventEmitter<void>();
	@Output() next = new EventEmitter<void>();
}
