import React, { useState } from 'react';
import MovieItem from './MovieItem.js';
import { fetchMovies } from './service.js';

import '../css/MovieSearch.css';

export default function MovieSearch(props) {
  const { onSelect } = props;

  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const [ error, setError ] = useState();

  const getMovies = async (pg) => {
    setIsFetching(true);
    const resp = await fetchMovies({ term: query, page: pg });
    
    setResults(resp.results || []);
    setPage(pg);
    setTotal(resp.total);
    setError(resp.error);
    setIsFetching(false);
  }

  const prevPage = Math.max(1, page-1);
  const nextPage = Math.min(Math.ceil(total/10), page+1);

  const getResultsText = () => {
    const len = results.length;
    const i = (10 * page) - 9;
    const range = (len === 1) ? i : `${i} - ${i + len - 1}`;
  
    return `Showing ${range} of ${total} results`;
  }

  const onInputChange = e => setQuery(e.target.value);
  const onSearch = () => getMovies(1);
  const onPrev = () => getMovies(prevPage);
  const onNext = () => getMovies(nextPage);

  const showPrev = page > 1;
  const showNext = page < Math.ceil(total/10);
  const resultsText = getResultsText();

  return (
    <section className="movie-search">
      <div className="movie-search-control">
        <label htmlFor="movie-search-input" className="movie-search-label">Search for movies:</label>
        <input 
          id="movie-search-input"
          className="movie-search-input"
          type="text"
          autoFocus
          onChange={onInputChange}
        /> 

        <button className="movie-search-button" onClick={onSearch}>
          <span role="img" aria-label="Search" >🔍</span>
        </button>
      </div>

      {(!!results.length && !!total) && 
      <div className="movie-search-status">
          <button  onClick={onPrev} disabled={isFetching} hidden={!showPrev}>‹ Prev</button>
          { resultsText }
          <button onClick={onNext} disabled={isFetching} hidden={!showNext}>Next ›</button>
      </div>
      }

      {(!!error) && <div className="movie-search-error">{error}</div> }

      <ul className="movie-search-results">
        { results.map(movie => 
          <MovieItem {...movie} key={movie.imdbID} onSelect={onSelect} />
        )}
      </ul>
    </section>
  )
}