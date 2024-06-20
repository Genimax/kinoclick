import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.KINOPOISK_API_KEY;
  const API_URL = `https://api.kinopoisk.dev/v1.4/movie/random?type=movie&rating.kp=5-10&year=1980-2024`;

  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      cache: "no-cache"
    });

    const data = await response.json();

    if (!data || !data.year) {
      throw new Error('No movies found');
    }

    const movie = data; // Выбираем первый фильм из результатов
    console.log(movie);
    return NextResponse.json({
      id: movie.id,
      title: movie.name,
      year: movie.year,
      description: movie.description,
      poster: movie.poster?.url,
      rating: movie.rating?.kp, // Используем рейтинг Кинопоиска
      actors: movie.persons
        .filter((person) => person.enProfession === 'actor')
        .map((actor) => ({
          name: actor.name,
          photo: actor.photo,
        })),
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json({ error: 'Error fetching movie data' }, { status: 500 });
  }
}
