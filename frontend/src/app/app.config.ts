import { provideHttpClient } from "@angular/common/http";
import {
	type ApplicationConfig,
	inject,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withViewTransitions } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withViewTransitions()),
		provideHttpClient(),
		provideAnimations(),
		provideApollo(() => {
			const httpLink = inject(HttpLink);
			return {
				link: httpLink.create({ uri: environment.endpoint }),
				cache: new InMemoryCache(),
			};
		}),
	],
};
