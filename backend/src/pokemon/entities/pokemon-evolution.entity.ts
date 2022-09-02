import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PokemonEvolution {
  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
    description: 'Pre-evolutions Identifiers',
  })
  pre?: number[];

  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
    description: 'Evolutions Identifiers',
  })
  pos?: number[];
}
