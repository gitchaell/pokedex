import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';

export const routes: Routes = [
    { path: 'pokemon/:id', component: HomeComponent },
    { path: '', component: HomeComponent }
];
