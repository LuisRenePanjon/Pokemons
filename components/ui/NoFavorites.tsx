import { Container, Image, Text } from '@nextui-org/react';

export const NoFavorites = () => {
    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 64px)',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text h1>No se ha agregado ningún pokemon</Text>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
                alt='pokemon image'
            />
        </Container>
    );
};
