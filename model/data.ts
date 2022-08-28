import { Pokemon } from './interfaces';

export const pokemons: Pokemon.Pokemon[] = [
	{
		id: '001',
		name: 'Bulbasaur',
		specie: 'Seed',
		types: ['Grass', 'Poison'],
		description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.',
		weight: '15.2',
		height: '0.7',
		counters: ['Fire', 'Psychic', 'Flying', 'Ice',],
		moves: [
			{ name: 'Vine Whip', damage: 7, type: 'Grass' },
			{ name: 'Tackle', damage: 5, type: 'Normal' },
			{ name: 'Seed Bomb', damage: 55, type: 'Normal' },
			{ name: 'Sludge Bomb', damage: 80, type: 'Poison' },
			{ name: 'Power Whip', damage: 90, type: 'Grass' },
		],
		stat: { health: 45, attack: 49, defense: 49, resistence: 65, speed: 45 },
		evolution: { from: [], to: ['002'] },
		animations: [
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-normal.gif?alt=media&token=5e384679-7ef2-4fda-99c6-f5624a7dda2f',
				status: 'Normal',
			},
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-attacking.gif?alt=media&token=8b7700b2-d399-4546-b117-d4f6960c434d',
				status: 'Attacking',
			},
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F001-bulbasaur-roaring.gif?alt=media&token=e5c2ee9b-af35-47e4-8042-9da690f6c335',
				status: 'Roaring',
			},
		],
		voices: [
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/voice%2F001-bulbasaur-normal.wav?alt=media&token=63650265-4adc-4c71-8aeb-874296be2ef0',
				status: 'Normal',
			},
		],
	},
	{
		id: '002',
		name: 'Ivysaur',
		specie: 'Seed',
		types: ['Grass', 'Poison'],
		description: 'There is a bud on its back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it\'ll burn up.',
		weight: '13.0',
		height: '1.0',
		counters: ['Fire', 'Psychic', 'Flying', 'Ice',],
		moves: [
			{ name: 'Vine Whip', damage: 7, type: 'Normal' },
			{ name: 'Razor Leaf', damage: 13, type: 'Normal' },
			{ name: 'Sludge Bomb', damage: 80, type: 'Poison' },
			{ name: 'Solar Beam', damage: 180, type: 'Grass' },
			{ name: 'Power Whip', damage: 90, type: 'Grass' },
		],
		stat: { health: 60, attack: 62, defense: 63, resistence: 80, speed: 60 },
		evolution: { from: ['001'], to: ['003'] },
		animations: [
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-normal.gif?alt=media&token=27dd6e21-6d3b-454c-9ca0-08a6a6b31783',
				status: 'Normal',
			},
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-attacking.gif?alt=media&token=5947dc3d-2503-493f-b949-951a3b002e6d',
				status: 'Attacking',
			},
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/animation%2F002-ivysaur-roaring.gif?alt=media&token=50d36545-2e89-4d22-aa9b-cf1119d9de36',
				status: 'Roaring',
			},
		],
		voices: [
			{
				url: 'https://firebasestorage.googleapis.com/v0/b/pikapi-150.appspot.com/o/voice%2F002-ivysaur-normal.wav?alt=media&token=92e3f166-1734-408b-a9e5-655fa0f89b01',
				status: 'Normal',
			},
		],
	},
];