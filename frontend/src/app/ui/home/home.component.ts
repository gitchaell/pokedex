import { CommonModule } from '@angular/common';
import { Component, effect, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Pokemon } from '../../core/models/pokemon.model';
import { PokemonStore } from '../../core/store/pokemon.store';
import { MainLayoutComponent } from '../layout/main-layout.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    PokemonDetailComponent,
    PokemonGridComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  store = inject(PokemonStore);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    // Auto-load based on route if present, otherwise default to 1
    effect(() => {
      const params = this.route.snapshot.params;
      if (params['id']) {
        this.store.loadPokemon(params['id']);
      }
    });
  }

  ngOnInit() {
    // Initial Load: List of first 20 and Select Pokemon #1
    if (this.store.gridPokemons().length === 0) {
      this.store.search("");
    }
    if (!this.route.snapshot.params["id"] && !this.store.selectedPokemon()) {
      this.store.loadPokemon("1");
    }
  }

  onSelect(pokemon: Pokemon) {
    this.store.selectPokemon(pokemon);
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
