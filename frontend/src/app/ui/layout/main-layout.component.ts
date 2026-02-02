import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PokemonStore } from "../../core/store/pokemon.store";

@Component({
	selector: "app-main-layout",
	standalone: true,
	imports: [CommonModule],
	template: `
    <div class="min-h-screen bg-[#05091B] text-white bg-dot-grid relative overflow-hidden font-sans">

      <!-- Gradient Orb for atmosphere -->
      <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <!-- Header -->
      <header class="relative z-50 px-6 py-5 flex items-center justify-between max-w-[1600px] mx-auto">
        <div class="flex items-center gap-4">
           <img src="assets/pokelogo.svg" alt="App Logo" class="h-10 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
           <img src="assets/poketitle.svg" alt="Pokedex" class="h-6 w-auto hidden sm:block opacity-90" />
        </div>

        <div class="relative w-full max-w-md mx-4">
           <!-- Search Input Glassmorphism -->
           <input type="text"
                  #searchInput
                  (input)="onSearch(searchInput.value)"
                  placeholder="Search Pokemon..."
                  class="w-full pl-12 pr-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg backdrop-blur-sm" />

            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div class="w-10"></div> <!-- Spacer -->
      </header>

      <!-- Content -->
      <main class="relative z-10 p-6 pt-2 max-w-[1600px] mx-auto">
         <ng-content></ng-content>
      </main>
    </div>
  `,
})
export class MainLayoutComponent {
	store = inject(PokemonStore);

	onSearch(term: string) {
		this.store.search(term);
	}
}
