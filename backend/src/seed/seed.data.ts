import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

export const pokemons: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    specie: 'Seed',
    types: ['grass', 'poison'],
    description: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
    physic: {
      weight: 15.2,
      weightUnit: 'kilogram',
      height: 0.7,
      heightUnit: 'meter',
    },
    counters: ['fire', 'psychic', 'flying', 'ice'],
    moves: [
      { name: 'Vine Whip', damage: 7, type: 'grass' },
      { name: 'Tackle', damage: 5, type: 'normal' },
      { name: 'Seed Bomb', damage: 55, type: 'normal' },
      { name: 'Sludge Bomb', damage: 80, type: 'poison' },
      { name: 'Power Whip', damage: 90, type: 'grass' },
    ],
    stat: { health: 45, attack: 49, defense: 49, resistence: 65, speed: 45 },
    evolution: { pre: [], pos: [2] },
    animations: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-normal.gif?alt=media&token=5e384679-7ef2-4fda-99c6-f5624a7dda2f',
        status: 'normal',
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-attacking.gif?alt=media&token=8b7700b2-d399-4546-b117-d4f6960c434d',
        status: 'attacking',
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-roaring.gif?alt=media&token=e5c2ee9b-af35-47e4-8042-9da690f6c335',
        status: 'roaring',
      },
    ],
    voices: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/voice%2F001-bulbasaur-normal.wav?alt=media&token=63650265-4adc-4c71-8aeb-874296be2ef0',
        status: 'normal',
      },
    ],
  },
  {
    id: 2,
    name: 'Ivysaur',
    specie: 'Seed',
    types: ['grass', 'poison'],
    description:
      "There is a bud on its back. To support its weight, Ivysaur's legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it'll burn up.",
    physic: {
      weight: 13.2,
      weightUnit: 'kilogram',
      height: 1.0,
      heightUnit: 'meter',
    },
    counters: ['fire', 'psychic', 'flying', 'ice'],
    moves: [
      { name: 'Vine Whip', damage: 7, type: 'normal' },
      { name: 'Razor Leaf', damage: 13, type: 'normal' },
      { name: 'Sludge Bomb', damage: 80, type: 'poison' },
      { name: 'Solar Beam', damage: 180, type: 'grass' },
      { name: 'Power Whip', damage: 90, type: 'grass' },
    ],
    stat: { health: 60, attack: 62, defense: 63, resistence: 80, speed: 60 },
    evolution: { pre: [1], pos: [3] },
    animations: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-normal.gif?alt=media&token=27dd6e21-6d3b-454c-9ca0-08a6a6b31783',
        status: 'normal',
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-attacking.gif?alt=media&token=5947dc3d-2503-493f-b949-951a3b002e6d',
        status: 'attacking',
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-roaring.gif?alt=media&token=50d36545-2e89-4d22-aa9b-cf1119d9de36',
        status: 'roaring',
      },
    ],
    voices: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/voice%2F002-ivysaur-normal.wav?alt=media&token=92e3f166-1734-408b-a9e5-655fa0f89b01',
        status: 'normal',
      },
    ],
  },
];
