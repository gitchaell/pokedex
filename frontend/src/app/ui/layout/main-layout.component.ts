import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PokemonStore } from "../../core/store/pokemon.store";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#EBF3F9] font-sans">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
           <div class="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
           <span class="font-bold text-xl tracking-tighter text-slate-800">POKEDEX</span>
        </div>

        <div class="relative w-full max-w-md mx-4">
           <input type="text"
                  #searchInput
                  (input)="onSearch(searchInput.value)"
                  placeholder="Search Pokemon..."
                  class="w-full px-5 py-2.5 rounded-full bg-slate-100 border-none text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner" />
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div class="w-8"></div> <!-- Spacer -->
      </header>

      <!-- Content -->
      <main class="p-6">
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
