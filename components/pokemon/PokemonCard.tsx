import { FC } from 'react';
import { SmallPokemon } from '../../interfaces';
import {  Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

    const router = useRouter();

    // change page to pokemon page
    const handleClick = () => {
        router.push(`/pokemon/${pokemon.id}`);
    }

    return (
        <Grid xs={6} sm={3} key={pokemon.id}>
            <Card hoverable clickable onClick={handleClick}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        objectFit='contain'
                        src={pokemon.img}
                        width='100%'
                        height={140}
                        alt={pokemon.name}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row wrap='wrap' justify='space-between'>
                        <Text b transform='capitalize'>{pokemon.name}</Text>
                        <Text
                            css={{
                                color: '$accents4',
                                fontWeight: '$semibold',
                            }}
                        >
                            {pokemon.id}
                        </Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    );
};
