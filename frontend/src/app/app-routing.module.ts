import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

const routes: Routes = [
    { path: 'pokemon/:id', component: PokemonCardComponent },
    { path: '', redirectTo: 'pokemon/448', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
