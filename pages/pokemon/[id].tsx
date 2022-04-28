import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router';
import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts';
import { PokemonResponse } from '../../interfaces';



interface Props {
    pokemon: PokemonResponse;
}

const PokemonPage:NextPage<Props> = ({ pokemon }) => {
    
    const { query } = useRouter();    


    return (
        <MainLayout title='Pokemon name'>
            <h1>{pokemon.id} - {pokemon.name}</h1>
        </MainLayout>
    );
}

export default PokemonPage;


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const { data } = await  // your fetch function here 

    // generate array of 0-151 in strings
    const pokemonsPath = Array.from(Array(151).keys()).map((id) => `${id + 1}`);
    
    return {
        paths: pokemonsPath.map((id) => ({
            params: {id}
        })),
        fallback: false,
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { id } = params as { id: string };
    const {data:pokemon} = await pokeApi.get<PokemonResponse>(`/pokemon/${id}`);



    return {
        props: {
            pokemon
        }
    }
}
