import { Field, ObjectType } from "@nestjs/graphql";

import { Pokemon } from "../entities/pokemon.entity";

@ObjectType()
export class PokemonResponse {
  @Field(() => String, {
    nullable: true,
  })
  message?: string;

  @Field(() => Pokemon, {
    nullable: true,
  })
  pokemon?: Pokemon;

  @Field(() => [Pokemon], {
    nullable: true,
  })
  pokemons?: Pokemon[];
}
