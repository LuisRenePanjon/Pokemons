import { pokeApi } from '../api';
import { PokemonResponse } from '../interfaces';

export const getBasicPokemon = async (parameter: string) => {
    const { data } = await pokeApi.get<PokemonResponse>(
        `/pokemon/${parameter}`
    );
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        abilities: data.abilities,
    };
};
