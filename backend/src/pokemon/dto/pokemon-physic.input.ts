import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class PokemonPhysicInput {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Pokemon Weight. e.g: 13.0',
  })
  weight?: number;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'kg',
    description: 'Weight Unit. e.g: kg,g',
  })
  weightUnit?: 'gram' | 'kilogram' | 'liter';

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Pokemon Height. e.g: 1.0',
  })
  height?: number;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'm',
    description: 'Height Unit. e.g: m,cm',
  })
  heightUnit?: 'centimeter' | 'inch' | 'kilometer' | 'meter';
}
