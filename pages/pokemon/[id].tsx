import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/layouts';
import { PokemonResponse } from '../../interfaces';
import {
    Card,
    Col,
    Row,
    Button,
    Text,
    Grid,
    Container,
    Image,
} from '@nextui-org/react';

import confetti from 'canvas-confetti';
import { useState } from 'react';
import { localStFavorites } from '../../utils';
import { getBasicPokemon } from '../../adapters';

interface Props {
    pokemon: PokemonResponse;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const { query } = useRouter();

    const [isInFavorites, setIsInFavorites] = useState(
        localStFavorites.existPokemonInFavorites(pokemon.id)
    );

    const onToggleFavorite = () => {
        localStFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if(!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 140,
                spread: 160,
                angle: -90,
                origin: {
                    x: 1,
                    y: 0,
                }
            })
        }
    };

    return (
        <MainLayout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '10px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card
                        hoverable
                        cover
                        css={{ w: '100%', h: '100%', p: 0, left: '$max' }}
                    >
                        <Card.Header
                            css={{ position: 'absolute', zIndex: 1, top: 5 }}
                        ></Card.Header>
                        <Card.Body>
                            <Card.Image
                                src={
                                    pokemon.sprites.other?.dream_world
                                        ?.front_default || 'no-img'
                                }
                                width='100%'
                                height={'100%'}
                                objectFit='contain'
                                alt='Pokemon image'
                            />
                        </Card.Body>
                        <Card.Footer
                            blur
                            css={{
                                position: 'absolute',
                                bgBlur: '#0f1114',
                                borderTop:
                                    '$borderWeights$light solid $gray700',
                                bottom: 0,
                                zIndex: 1,
                            }}
                        >
                            <Row>
                                <Col>
                                    <Row>
                                        <Col span={3}>
                                            <Text h3 color='white'>
                                                {pokemon.name}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row justify='flex-end' align='center'>
                                        <Text h6 color='#ccc'>
                                            {pokemon.id}
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card>
                        <Card.Header
                            css={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text h3 transform='capitalize'>
                                {pokemon.name}
                            </Text>
                            <Button
                                color={'gradient'}
                                ghost={isInFavorites}
                                onClick={onToggleFavorite}
                            >
                                {!isInFavorites ?
                                'Añadir a favoritos 💕' : 'Quitar de favoritos 💔'}
                        
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex'>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={'sprite img'}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={'sprite img'}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={'sprite img'}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={'sprite img'}
                                    height={100}
                                    width={100}
                                />
                            </Container>
                            <Text size={30}>Abilities:</Text>
                            <Container>
                                <Container direction='row' display='flex'>
                                    {pokemon.abilities.map((ability) => (
                                        <Text
                                            key={ability.ability.name}
                                            weight={'bold'}
                                            transform='uppercase'
                                        >
                                            {ability.ability.name}
                                        </Text>
                                    ))}
                                </Container>
                                {/* <Text>{pokemon.abilities[0].ability.name}</Text> */}
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </MainLayout>
    );
};

export default PokemonPage;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const { data } = await  // your fetch function here

    // generate array of 0-151 in strings
    const pokemonsPath = Array.from(Array(151).keys()).map((id) => `${id + 1}`);

    return {
        paths: pokemonsPath.map((id) => ({
            params: { id },
        })),
        fallback: false,
    };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const pokemon = await getBasicPokemon(id);

    return {
        props: {
            pokemon,
        },
    };
};
