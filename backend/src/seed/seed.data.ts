import { Pokemon } from "../pokemon/entities/pokemon.entity";
import { PokemonType } from "../pokemon/enums/pokemon-type.enum";
import { PokemonStatus } from "../pokemon/enums/pokemon-status.enum";

// Search media resources for each pokemon.
// https://www.pkparaiso.com/pokedex/bulbasaur.php

export const pokemons: Pokemon[] = [
  {
    id: "1",
    number: 1,
    name: "Bulbasaur",
    specie: "Seed",
    types: [PokemonType.grass, PokemonType.poison],
    description: `Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.`,
    physic: {
      weight: 15.2,
      weightUnit: "kilogram",
      height: 0.7,
      heightUnit: "meter",
    },
    counters: [
      PokemonType.fire,
      PokemonType.psychic,
      PokemonType.flying,
      PokemonType.ice,
    ],
    moves: [
      { name: "Vine Whip", damage: 7, type: PokemonType.grass },
      { name: "Tackle", damage: 5, type: PokemonType.normal },
      { name: "Seed Bomb", damage: 55, type: PokemonType.normal },
      { name: "Sludge Bomb", damage: 80, type: PokemonType.poison },
      { name: "Power Whip", damage: 90, type: PokemonType.grass },
    ],
    stats: { health: 45, attack: 49, defense: 49, resistance: 65, speed: 45 },
    evolution: { pre: [], pos: ["2"] },
    animations: [
      {
        url: "animation/001-bulbasaur-normal.gif",
        status: PokemonStatus.normal,
      },
      {
        url: "animation/001-bulbasaur-attacking.gif",
        status: PokemonStatus.attacking,
      },
      {
        url: "animation/001-bulbasaur-roaring.gif",
        status: PokemonStatus.roaring,
      },
    ],
    voices: [
      { url: "voice/001-bulbasaur-normal.wav", status: PokemonStatus.normal },
    ],
    sprites: {
      regular: "sprites/001-bulbasaur.png",
      shiny: "sprites/001-bulbasaur-shiny.png",
    },
  },
  {
    id: "2",
    number: 2,
    name: "Ivysaur",
    specie: "Seed",
    types: [PokemonType.grass, PokemonType.poison],
    description: `There is a bud on its back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong.If it starts spending more time lying in the sunlight, it\'ll burn up.`,
    physic: {
      weight: 13.2,
      weightUnit: "kilogram",
      height: 1.0,
      heightUnit: "meter",
    },
    counters: [
      PokemonType.fire,
      PokemonType.psychic,
      PokemonType.flying,
      PokemonType.ice,
    ],
    moves: [
      { name: "Vine Whip", damage: 7, type: PokemonType.grass },
      { name: "Razor Leaf", damage: 13, type: PokemonType.grass },
      { name: "Sludge Bomb", damage: 80, type: PokemonType.poison },
      { name: "Solar Beam", damage: 180, type: PokemonType.grass },
      { name: "Power Whip", damage: 90, type: PokemonType.grass },
    ],
    stats: { health: 60, attack: 62, defense: 63, resistance: 80, speed: 60 },
    evolution: { pre: ["1"], pos: ["3"] },
    animations: [
      { url: "animation/001-ivysaur-normal.gif", status: PokemonStatus.normal },
      {
        url: "animation/001-ivysaur-attacking.gif",
        status: PokemonStatus.attacking,
      },
      {
        url: "animation/001-ivysaur-roaring.gif",
        status: PokemonStatus.roaring,
      },
    ],
    voices: [
      { url: "voice/001-ivysaur-normal.wav", status: PokemonStatus.normal },
    ],
    sprites: {
      regular: "sprites/002-ivysaur.png",
      shiny: "sprites/002-ivysaur-shiny.png",
    },
  },
];
