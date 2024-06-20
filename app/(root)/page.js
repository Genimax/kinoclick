import Head from 'next/head';
import MovieFetcher from '../../components/MovieFetcher';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="../icon.svg"/>
      </Head>
      <MovieFetcher/>
    </>
  );
}
