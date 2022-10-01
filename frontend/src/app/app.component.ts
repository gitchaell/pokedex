import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  pokemons?: any[];
  loading = true;
  error: any;

  private querySubscription?: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    this.querySubscription = this.apollo
      .watchQuery({
        query: gql`
          query($param: PokemonPaginationInput!) {
            getPokemons(params: $param) {
              pokemons {
                name
                description
              }
            }
          }`,
        variables: {
          param: { limit: 10 },
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.pokemons = result?.data?.getPokemons?.pokemons;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}
