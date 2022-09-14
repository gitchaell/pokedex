import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PokemonPaginationInput {
  @Field(() => Int, {
    description: 'Pokemon total for query',
    nullable: true,
    defaultValue: 10,
  })
  limit?: number;
}
