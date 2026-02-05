import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChildren,
} from "@angular/core";
import type { Pokemon } from "../../core/models/pokemon.model";

@Component({
	selector: "app-pokemon-grid",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage],
	templateUrl: "./pokemon-grid.component.html",
})
export class PokemonGridComponent implements AfterViewInit {
	@Input() pokemons: Pokemon[] = [];
	@Output() select = new EventEmitter<Pokemon>();

	// placeholder tiny SVG (solid transparent) to render quickly
	placeholder =
		"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'></svg>";

	// track which images should load their real src
	visible: boolean[] = [];

	@ViewChildren("imgEl", { read: ElementRef }) imgs!: QueryList<ElementRef<HTMLImageElement>>;

	private observer?: IntersectionObserver;

	ngAfterViewInit(): void {
		this.setupObserver();
		// observe existing items
		this.observeImages();
		// re-observe when list changes (e.g., new pokemons)
		this.imgs.changes.subscribe(() => this.observeImages());
	}

	private setupObserver() {
		if (this.observer) return;
		this.observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const el = entry.target as HTMLElement;
					const idxAttr = el.getAttribute("data-index");
					if (!idxAttr) continue;
					const idx = Number(idxAttr);
					if (entry.isIntersecting) {
						this.visible[idx] = true;
						this.observer?.unobserve(el);
					}
				}
			},
			{ root: null, rootMargin: "200px", threshold: 0.1 },
		);
	}

	private observeImages() {
		// ensure visible array matches pokemons length
		this.visible = Array.from({ length: this.pokemons.length }, (_, i) => !!this.visible[i]);
		if (!this.observer) this.setupObserver();
		this.imgs.forEach((elRef, i) => {
			const el = elRef.nativeElement as HTMLElement;
			el.setAttribute("data-index", String(i));
			if (!this.visible[i]) {
				this.observer?.observe(el);
			}
		});
	}
}
