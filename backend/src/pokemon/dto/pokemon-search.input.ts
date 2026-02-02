import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PokemonSearchInput {
  @Field(() => String, {
    description: 'Pokemon Identifier. e.g: "1"',
    nullable: true,
  })
  id?: string;

  @Field(() => String, {
    description: "Pokemon Name. e.g: Bulbasaur",
    nullable: true,
  })
  name?: string;
}
