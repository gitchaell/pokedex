import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonStore } from '../../core/store/pokemon.store';
import { MainLayoutComponent } from '../layout/main-layout.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, PokemonDetailComponent, PokemonGridComponent],
  template: `
    <app-main-layout>
       <div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

          <!-- Sidebar (Left) - Sticky on Desktop -->
          <div class="lg:w-[400px] flex-none">
             <div *ngIf="store.loading() && !store.selectedPokemon()" class="flex justify-center p-10">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             </div>

             <app-pokemon-detail
                *ngIf="store.selectedPokemon()"
                [pokemon]="store.selectedPokemon()!">
             </app-pokemon-detail>
          </div>

          <!-- Grid (Right) -->
          <div class="flex-1">
             <div class="mb-4 flex items-center justify-between">
                <h2 class="text-2xl font-bold text-slate-800 font-heading">Pokedex</h2>
                <span class="text-sm text-slate-500 font-mono">{{ store.gridPokemons().length }} Pokemon</span>
             </div>

             <app-pokemon-grid
                [pokemons]="store.gridPokemons()"
                (select)="onSelect($event)">
             </app-pokemon-grid>

             <div *ngIf="store.gridPokemons().length === 0 && !store.loading()" class="text-center py-20 text-slate-400 font-mono">
                No Pokemon found for "{{ store.searchQuery() }}"
             </div>
          </div>

       </div>
    </app-main-layout>
  `
})
export class HomeComponent implements OnInit {
  store = inject(PokemonStore);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
      // Auto-load based on route
      effect(() => {
          const params = this.route.snapshot.params;
          if (params['id']) {
             this.store.loadPokemon(params['id']);
          } else {
             // Default load Lucario
             this.store.loadPokemon('448');
          }
      });
  }

  ngOnInit() {
      // Initial Search (empty to get seed)
      this.store.search('bulbasaur'); // Hack to trigger initial load, ideally empty string should return all seed
      // Note: Backend search currently requires a string.
      // Let's improve backend later to return all if empty.
      // For now, let's search for "a" to match most names or seed.
      // Actually, let's trigger a search for 'a' to populate grid.
      this.store.search('a');
  }

  onSelect(pokemon: any) {
      this.store.selectPokemon(pokemon);
      this.router.navigate(['/pokemon', pokemon.id]);
  }
}
