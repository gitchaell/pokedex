import { InputType, PartialType } from '@nestjs/graphql';

import { Pokemon } from '../entities/pokemon.entity';

@InputType()
export class CreatePokemonInput extends PartialType(Pokemon) {}
