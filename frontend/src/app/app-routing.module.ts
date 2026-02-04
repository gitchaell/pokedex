import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
	{ path: "pokemon/:id", component: AppComponent },
	{ path: "", redirectTo: "pokemon/1", pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
