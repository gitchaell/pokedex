import { Field, InputType } from '@nestjs/graphql';

import { PokemonStatus } from '../types/pokemon-status.type';

@InputType()
export class PokemonAssetInput {
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
