import { registerEnumType } from "@nestjs/graphql";

export enum PokemonType {
	normal = "normal",
	fire = "fire",
	water = "water",
	grass = "grass",
	electric = "electric",
	ice = "ice",
	fighting = "fighting",
	poison = "poison",
	ground = "ground",
	flying = "flying",
	psychic = "psychic",
	bug = "bug",
	rock = "rock",
	ghost = "ghost",
	dark = "dark",
	dragon = "dragon",
	steel = "steel",
	fairy = "fairy",
}

registerEnumType(PokemonType, {
	name: "PokemonType",
	description: "Pokemon Types",
});
