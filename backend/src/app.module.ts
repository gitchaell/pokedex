import { Logger, Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FireormModule } from 'nestjs-fireorm';

import { AppController } from './app.controller';

import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: 'pikapi-150',
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
