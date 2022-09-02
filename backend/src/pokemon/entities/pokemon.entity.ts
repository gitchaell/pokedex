import { ObjectType, Field, Int } from '@nestjs/graphql';

import { PokemonType } from '../types/pokemon-type.type';

import { PokemonAsset } from './pokemon-asset.entity';
import { PokemonEvolution } from './pokemon-evolution.entity';
import { PokemonMove } from './pokemon-move.entity';
import { PokemonPhysic } from './pokemon-physic.entity';
import { PokemonStat } from './pokemon-stat.entity';

@ObjectType()
export class Pokemon {
  @Field(() => Int, {
    description: 'Pokemon Identifier. e.g: 1',
  })
  id: number;

  @Field(() => String, {
    description: 'Pokemon Name. e.g: Bulbasaur',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'Unknown',
    description: 'Pokemon Specie. e.g: Seed',
  })
  specie: string;

  @Field(() => [String], {
    description: 'Pokemon Types. e.g: Grass,Poison',
  })
  types: PokemonType[];

  @Field(() => String, {
    nullable: true,
    defaultValue: 'Description not found',
    description: 'Pokemon Description.',
  })
  description: string;

  @Field(() => PokemonPhysic, {
    nullable: true,
    defaultValue: new PokemonPhysic(),
    description: 'Pokemon Physics.',
  })
  physic: PokemonPhysic;

  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Counters. e.g: Fire,Psychic,Flying,Ice',
  })
  counters: PokemonType[];

  @Field(() => [PokemonMove], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Moves',
  })
  moves: PokemonMove[];

  @Field(() => PokemonStat, {
    nullable: true,
    defaultValue: new PokemonStat(),
    description: 'Pokemon Stats',
  })
  stat: PokemonStat;

  @Field(() => PokemonEvolution, {
    nullable: true,
    defaultValue: new PokemonEvolution(),
    description: 'Pokemon Evolutions',
  })
  evolution: PokemonEvolution;

  @Field(() => [PokemonAsset], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Animation Assets References',
  })
  animations: PokemonAsset[];

  @Field(() => [PokemonAsset], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Voices Assets References',
  })
  voices: PokemonAsset[];
}
