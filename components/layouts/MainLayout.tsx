import Head from 'next/head';
import { FC } from 'react';
import { NavBar } from '../ui';

interface Props {
    children: JSX.Element | JSX.Element[];
    title?: string;
}

const origin = (typeof window !== 'undefined' && window.location.origin);

export const MainLayout: FC<Props> = ({ children, title }) => {
    
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='René Panjón' />
                <meta name='description' content='Pokemon information' />
                <meta name='keywords' content='pokemon, pokedex' />
                <meta
                    property='og:title'
                    content={`App to show pokemon information - ${title}`}
                />
                <meta
                    property='og:description'
                    content={`All the information you need to know about pokemon`}
                />
                <meta
                    property='og:image'
                    content={`${origin}/imgs/banner.png`}
                />
            </Head>

            <NavBar />
            <main>{children}</main>
        </>
    );
};
