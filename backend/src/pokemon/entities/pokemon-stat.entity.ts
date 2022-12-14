import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PokemonStat {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Health Stat',
  })
  health?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Sttack Stat',
  })
  attack?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Defense Stat',
  })
  defense?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Resistence Stat',
  })
  resistence: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Speed Stat',
  })
  speed?: number;
}
