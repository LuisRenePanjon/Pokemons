import { Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FavoritePokemonCard } from './';

interface Props {
    pokemons: number[];
}
export const FavoritePokemons: FC<Props> = ({ pokemons }) => {

    return (
        <Grid.Container gap={2} direction={'row'} justify={'flex-start'}>
            {pokemons.map((pokemonId: number) => {
                return (
                    <FavoritePokemonCard key={pokemonId} pokemonId={pokemonId}/>
                );
            })}
        </Grid.Container>
    );
};
