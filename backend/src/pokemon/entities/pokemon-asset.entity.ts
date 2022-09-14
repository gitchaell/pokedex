import { ObjectType, Field } from '@nestjs/graphql';

import { PokemonStatus } from '../enums/pokemon-status.enum';

@ObjectType()
export class PokemonAsset {
  @Field(() => String, {
    description: 'Asset External URL',
  })
  url: string;

  @Field(() => PokemonStatus, {
    nullable: true,
    defaultValue: 'Normal',
    description: 'Pokemon Status. e.g: Normal,Attacking,Roaring',
  })
  status?: PokemonStatus;
}
