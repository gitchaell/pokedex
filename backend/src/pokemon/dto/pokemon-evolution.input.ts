import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PokemonEvolutionInput {
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
