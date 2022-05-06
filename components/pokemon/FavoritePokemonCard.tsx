import { FC } from 'react';
import { Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number;
}
export const FavoritePokemonCard: FC<Props> = ({ pokemonId }) => {
    const router = useRouter();

    // change page to pokemon page
    const handleClick = () => {
        router.push(`/pokemon/${pokemonId}`);
    };
    return (
        <Grid xs={6} sm={3} md={2} xl={1} onClick={handleClick}>
            <Card hoverable clickable css={{ padding: 10 }}>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    alt={`Pokemon ${pokemonId} image`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    );
};
