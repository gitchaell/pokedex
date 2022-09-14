import { ObjectType, Field, Int } from '@nestjs/graphql';

import { PokemonType } from '../enums/pokemon-type.enum';

@ObjectType()
export class PokemonMove {
  @Field(() => String, {
    description: 'Move Name. e.g: Vine Whip,Razor Leaf,Sludge Bomb,Solar Beam,Power Whip',
  })
  name: string;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Move Damage. e.g: 7',
  })
  damage?: number;

  @Field(() => PokemonType, {
    description: 'Move Type. e.g: Grass',
  })
  type: PokemonType;
}
