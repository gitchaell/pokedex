import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PokemonEvolutionInput {
  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Pre-evolutions Identifiers',
  })
  pre?: string[];

  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Evolutions Identifiers',
  })
  pos?: string[];
}
