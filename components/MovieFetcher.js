'use client';

import { useState } from 'react';
import Image from "next/image";
import githubSVG from "../public/github.svg"

const Spinner = () => (
  <div className="flex justify-center items-center mt-6">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const MovieCard = ({ movie }) => (
  <div className="mt-6 mb-10 bg-gray-700 rounded-lg p-4 shadow-lg">
    <div className="flex flex-col md:flex-row justify-evenly">
      <div className="relative md:w-1/3">
        <div className="aspect-w-2 aspect-h-3">
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="rounded-lg object-contain w-full h-full" />
          ) : (
            <div className="bg-gray-500 rounded-lg w-full h-full flex items-center justify-center">
              <p className="text-white">Постер не доступен</p>
            </div>
          )}
        </div>
        {movie.poster && <div className="absolute bottom-0 left-0 right-0 py-2 my-4">
          <a
            href={`https://www.kinopoisk.ru/film/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Перейти в Кинопоиск
          </a>
        </div>}

      </div>
      <div className="md:w-1/2 md:ml-6 mt-4 md:mt-0 text-left text-white">
        <h2 className="text-2xl font-bold">{movie.title || 'Название не доступно'}</h2>
        <p className="text-gray-400">{movie.year || 'Год не доступен'}</p>
        <p className="mt-2">{movie.description || 'Описание не доступно'}</p>
        <p className="mt-4 text-yellow-400 font-bold">Рейтинг: {Math.round(movie.rating * 10) / 10 || 'Не доступен'}</p>
        <h3 className="text-xl font-semibold mt-4">Актеры:</h3>
        <div className="flex flex-wrap mt-4 justify-center md:justify-evenly">
          {movie.actors && movie.actors.length > 0 ? (
            movie.actors.slice(0, 4).map((actor) => (
              <div key={actor.name} className="flex flex-col items-center mr-4 mb-4 w-16">
                {actor.photo ? (
                  <img src={actor.photo} alt={actor.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="bg-gray-500 rounded-full w-16 h-16 flex items-center justify-center">
                    <p className="text-white">Фото не доступно</p>
                  </div>
                )}
                <p className="text-sm mt-2 text-center">{actor.name || 'Имя не доступно'}</p>
              </div>
            ))
          ) : (
            <p className="text-white">Актеры не доступны</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function MovieFetcher() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchMovie = async () => {
    setLoading(true);
    setSearched(true);
    setMovie(null); // Скрыть текущий фильм при загрузке нового

    try {
      const response = await fetch('/api/movie');
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden animated-bg">
      <main className="text-center p-6 max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">
          Найди фильм для просмотра с помощью одной кнопки
        </h1>
        <button
          onClick={fetchMovie}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-1/2"
        >
          Поиск
        </button>
        {loading && <Spinner/>}
        {!loading && movie && <MovieCard movie={movie}/>}
        {searched && !loading && !movie && (
          <p className="text-white mt-6">Фильм не найден. Попробуйте позже.</p>
        )}
      </main>
      <a href="https://github.com/Genimax" className="text-l absolute bottom-0 mb-5 opacity-20 font-bold inline-flex">
        <p className="mr-2">powered by genimax - GitHub</p>
        <Image src={githubSVG} alt="github icon" width={25} height={25}/>
      </a>
    </div>
  );
}
