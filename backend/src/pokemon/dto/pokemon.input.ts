import { Field, InputType, Int } from '@nestjs/graphql';

import { PokemonType } from '../types/pokemon-type.type';

import { PokemonAssetInput } from './pokemon-asset.input';
import { PokemonEvolutionInput } from './pokemon-evolution.input';
import { PokemonMoveInput } from './pokemon-move.input';
import { PokemonPhysicInput } from './pokemon-physic.input';
import { PokemonStatInput } from './pokemon-stat.input';

@InputType()
export class PokemonInput {
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

  @Field(() => PokemonPhysicInput, {
    nullable: true,
    defaultValue: new PokemonPhysicInput(),
    description: 'Pokemon Physics.',
  })
  physic: PokemonPhysicInput;

  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Counters. e.g: Fire,Psychic,Flying,Ice',
  })
  counters: PokemonType[];

  @Field(() => [PokemonMoveInput], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Moves',
  })
  moves: PokemonMoveInput[];

  @Field(() => PokemonStatInput, {
    nullable: true,
    defaultValue: new PokemonStatInput(),
    description: 'Pokemon Stats',
  })
  stat: PokemonStatInput;

  @Field(() => PokemonEvolutionInput, {
    nullable: true,
    defaultValue: new PokemonEvolutionInput(),
    description: 'Pokemon Evolutions',
  })
  evolution: PokemonEvolutionInput;

  @Field(() => [PokemonAssetInput], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Animation Assets References',
  })
  animations: PokemonAssetInput[];

  @Field(() => [PokemonAssetInput], {
    nullable: true,
    defaultValue: [],
    description: 'Pokemon Voices Assets References',
  })
  voices: PokemonAssetInput[];
}
