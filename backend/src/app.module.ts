import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FireormModule } from 'nestjs-fireorm';

import { AppController } from './app.controller';

import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: process.env.GCLOUD_PROJECT,
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
