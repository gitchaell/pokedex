import { ObjectType, Field } from '@nestjs/graphql';

import { PokemonStatus } from '../types/pokemon-status.type';

@ObjectType()
export class PokemonAsset {
  @Field(() => String, {
    description: 'Asset External URL',
  })
  url: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'Normal',
    description: 'Pokemon Status. e.g: Normal,Attacking,Roaring',
  })
  status?: PokemonStatus;
}
