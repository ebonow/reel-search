import React, { useEffect, useState } from 'react';

import MovieSearch from './MovieSearch.js';
import MovieInfo from './MovieInfo.js';

import { fetchMovieInfoById } from './service.js';

import '../css/App.css';

export default function App() {
  const [ selectedMovie, setSelectedMovie ] = useState(null);

  const onSelect = async imdbID => {
    const movie = await fetchMovieInfoById(imdbID);
    setSelectedMovie(movie);
  };

  useEffect(function toggleOverlay() {
    const toggle = (!!selectedMovie) ? 'add' : 'remove';
    document.body.classList[toggle]('overlay');
  }, [selectedMovie]);

  const onClose = () => setSelectedMovie(null);

  return (
    <div className="app">
      <header className="app-header-wrap">
        <h1 className="app-header">Reel Search</h1>
      </header>
      <MovieSearch onSelect={onSelect} />
      <MovieInfo {...selectedMovie} onClose={onClose} isOpen={!!selectedMovie} />
    </div>
  );
}