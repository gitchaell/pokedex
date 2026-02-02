import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
  selector: "app-pokemon-detail",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="pokemon"
       class="relative w-full max-w-[400px] md:h-[calc(100vh-140px)] h-auto rounded-[32px] overflow-hidden bg-[#1F2029] shadow-2xl transition-all duration-500 flex flex-col mx-auto md:mx-0 sticky top-24"
       [style]="'--primary-color: var(--color-type-' + pokemon.types[0] + ')'">

        <!-- Background Elements -->
        <div class="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none"></div>
        <div class="absolute -top-[120px] -right-[120px] w-[400px] h-[400px] rounded-full blur-[90px] opacity-40 bg-[var(--primary-color)] pointer-events-none mix-blend-screen animate-pulse duration-[3000ms]"></div>
        <div class="absolute -bottom-[80px] -left-[80px] w-[250px] h-[250px] rounded-full blur-[80px] opacity-20 bg-[var(--primary-color)] pointer-events-none"></div>

        <!-- Header -->
        <div class="relative z-10 flex-none flex justify-between items-end px-7 pt-8 pb-2">
            <div>
                <h2 class="text-white text-3xl font-bold tracking-tight uppercase drop-shadow-md leading-none font-heading">{{ pokemon.name }}</h2>
                <div class="flex gap-2 mt-3">
                <span *ngFor="let type of pokemon.types"
                        class="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 border border-white/10 backdrop-blur-sm shadow-sm font-mono">
                    {{ type }}
                </span>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <span class="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-0.5 font-mono">HP</span>
                <span class="text-white text-2xl font-bold leading-none font-mono">{{ pokemon.stats.hp }}</span>
            </div>
        </div>

        <!-- Image -->
        <div class="relative flex-1 min-h-[240px] flex justify-center items-center -my-4 group z-20">
            <img [src]="pokemon.sprites.shiny || pokemon.sprites.regular"
                [alt]="pokemon.name"
                class="h-[85%] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transform transition-transform duration-500 hover:scale-110 will-change-transform"
                style="view-transition-name: pokemon-main-img" />
        </div>

        <!-- Glass Panel -->
        <div class="relative z-10 flex-1 mx-5 mb-6 glass-card rounded-2xl p-5 flex flex-col gap-5 border-t border-white/15 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">

            <!-- Stats -->
            <div class="flex-none grid grid-cols-2 gap-x-8 gap-y-3">
                <div class="flex justify-between items-center border-b border-white/5 pb-1">
                    <span class="text-white/40 text-[10px] font-bold uppercase font-mono">Attack</span>
                    <span class="text-white font-mono font-bold">{{ pokemon.stats.attack }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-white/5 pb-1">
                    <span class="text-white/40 text-[10px] font-bold uppercase font-mono">Defense</span>
                    <span class="text-white font-mono font-bold">{{ pokemon.stats.defense }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-white/5 pb-1">
                    <span class="text-white/40 text-[10px] font-bold uppercase font-mono">Sp. Atk</span>
                    <span class="text-white font-mono font-bold">{{ pokemon.stats.specialAttack }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-white/5 pb-1">
                    <span class="text-white/40 text-[10px] font-bold uppercase font-mono">Sp. Def</span>
                    <span class="text-white font-mono font-bold">{{ pokemon.stats.specialDefense }}</span>
                </div>

                <!-- Speed Bar -->
                <div class="col-span-2 mt-1">
                    <div class="flex justify-between text-[10px] uppercase font-bold text-white/40 mb-1 font-mono">
                        <span>Speed</span>
                        <span>{{ pokemon.stats.speed }}</span>
                    </div>
                    <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-[var(--primary-color)] shadow-[0_0_10px_var(--primary-color)]"
                             [style.width.%]="(pokemon.stats.speed / 200) * 100"></div>
                    </div>
                </div>
            </div>

            <!-- Moves -->
            <div class="flex-1 flex flex-col overflow-hidden pt-2 border-t border-white/10 min-h-[100px]">
                <h3 class="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-3 font-mono">Top Moves</h3>
                <div class="flex flex-col gap-2.5 overflow-y-auto pr-1">

                    <div *ngFor="let move of pokemon.moves" class="flex items-center justify-between group cursor-default">
                        <div class="flex items-center gap-2.5">
                            <div class="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]" [style.color]="'var(--color-type-' + move.type + ')'" [style.background-color]="'currentColor'"></div>
                            <span class="text-white/90 text-xs font-medium group-hover:text-[var(--primary-color)] transition-colors font-mono">{{ move.name }}</span>
                        </div>
                        <!-- Power Bars -->
                        <div class="flex gap-[2px]">
                            <div *ngFor="let active of getPowerSegments(move.powerSegments)"
                                class="w-[3px] h-2.5 rounded-[1px] transition-all duration-300"
                                [ngClass]="{
                                    'bg-white': active === 1,
                                    'bg-white/10': active === 0,
                                    'shadow-[0_0_5px_rgba(255,255,255,0.5)]': active === 1,
                                    'group-hover:bg-[var(--primary-color)]': active === 1
                                }">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  `,
})
export class PokemonDetailComponent {
  @Input() pokemon!: Pokemon;

  getPowerSegments(segments: number): number[] {
    return Array(10)
      .fill(0)
      .map((_, i) => (i < segments ? 1 : 0));
  }
}
