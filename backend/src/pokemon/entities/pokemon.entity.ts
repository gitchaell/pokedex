import { Collection } from 'fireorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PokemonStats {
    @Field() hp: number;
    @Field() attack: number;
    @Field() defense: number;
    @Field() specialAttack: number;
    @Field() specialDefense: number;
    @Field() speed: number;
}

@ObjectType()
export class PokemonMove {
    @Field() name: string;
    @Field() type: string;
    @Field() power: number;
    @Field() powerSegments: number;
}

@ObjectType()
export class PokemonSprites {
    @Field() regular: string;
    @Field() shiny: string;
    @Field() artwork: string;
}

@Collection()
@ObjectType()
export class Pokemon {
  @Field(() => String)
  id!: string;

  @Field(() => Number)
  number: number;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  types: string[];

  @Field(() => PokemonStats)
  stats: PokemonStats;

  @Field(() => [PokemonMove])
  moves: PokemonMove[];

  @Field(() => PokemonSprites)
  sprites: PokemonSprites;
}
