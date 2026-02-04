import { Logger, Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { AppController } from "./app.controller";

import { PokemonModule } from "./pokemon/pokemon.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			// cache: 'bounded',
			persistedQueries: false,
		}),
		PokemonModule,
	],
	controllers: [AppController],
	providers: [Logger],
})
export class AppModule {}
