import Head from 'next/head';
import { FC } from 'react';
import { NavBar } from '../ui';

interface Props {
    children: JSX.Element | JSX.Element[];
    title?: string;
}

export const MainLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='René Panjón' />
                <meta name='description' content='Pokemon information' />
                <meta name='keywords' content='pokemon, pokedex' />
            </Head>

            <NavBar />
            <main>{children}</main>
        </>
    );
};
