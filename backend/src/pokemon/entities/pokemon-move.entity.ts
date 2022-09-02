import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

import { PokemonType } from '../types/pokemon-type.type';

@InputType()
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

  @Field(() => String, {
    description: 'Move Type. e.g: Grass',
  })
  type: PokemonType;
}
