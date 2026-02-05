import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchParams {
  query: string;
  type: string;
  limit: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  search = output<SearchParams>();

  query = signal('');
  type = signal('');
  limit = signal(12);

  types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  updateSearch() {
    this.search.emit({
      query: this.query(),
      type: this.type(),
      limit: this.limit()
    });
  }
}
