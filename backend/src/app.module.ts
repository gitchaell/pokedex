import { Logger, Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { credential } from "firebase-admin";
import { FireormModule } from "nestjs-fireorm";

import { AppController } from "./app.controller";

import { PokemonModule } from "./pokemon/pokemon.module";
import { SeedModule } from "./seed/seed.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			// cache: 'bounded',
			persistedQueries: false,
		}),
		FireormModule.forRoot({
			firestoreSettings: {
				projectId: "pikapi-150",
				credential: credential.applicationDefault(),
			},
			fireormSettings: {
				validateModels: false, // yarn add class-validator
			},
		}),
		PokemonModule,
		SeedModule,
	],
	controllers: [AppController],
	providers: [Logger],
})
export class AppModule {}
