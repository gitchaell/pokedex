import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
	selector: "app-pokemon-grid",
	standalone: true,
	imports: [CommonModule],
	template: `
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div *ngFor="let p of pokemons"
           (click)="select.emit(p)"
           class="group relative bg-white rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100">

           <!-- BG Gradient -->
           <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                [style.background-color]="'var(--color-type-' + p.types[0] + ')'"></div>

           <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-bold font-mono text-slate-400">#{{ p.number }}</span>
           </div>

           <div class="flex flex-col items-center">
              <img [src]="p.sprites.regular"
                   [alt]="p.name"
                   class="w-24 h-24 object-contain mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                   loading="lazy" />

              <h3 class="font-bold text-slate-800 uppercase text-sm tracking-tight font-heading group-hover:text-[var(--color-type-' + p.types[0] + ')]">{{ p.name }}</h3>

              <div class="flex gap-1 mt-1">
                 <span *ngFor="let type of p.types" class="text-[9px] font-bold uppercase text-slate-400 font-mono">{{ type }}</span>
              </div>
           </div>
      </div>
    </div>
  `,
})
export class PokemonGridComponent {
	@Input() pokemons: Pokemon[] = [];
	@Output() select = new EventEmitter<Pokemon>();
}
