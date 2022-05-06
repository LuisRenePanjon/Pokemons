import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localStFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavoritesPage = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localStFavorites.getFavoritePokemons());
    }, []);

    return (
        <MainLayout title='Favoritos'>
            {favoritePokemons.length > 0 ? (
                <FavoritePokemons pokemons={favoritePokemons}/>
            ) : (
                <NoFavorites />
            )}
        </MainLayout>
    );
};

export default FavoritesPage;
