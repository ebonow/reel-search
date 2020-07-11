import React from 'react';

import '../css/MovieInfo.css';

const MovieInfo = (props) => {
  const { 
    duration, genre, plot,
    posterUrl, rated, rating,
    title, votes, year,
    isOpen, onClose
  } = props;

  const posterStyle = { backgroundImage: `url(${posterUrl})` };
  const className = "movie-info " + (!isOpen ? '--hidden' : ''); 

  return (
    <section className={className}>
      <header className="movie-info-header">
        <h2>{title} ({year})</h2>
        <button className="movie-info-dismiss-button" onClick={onClose}><span role="img" aria-label="Close">✖️</span></button>
      </header>
      <div className="movie-info-main">
        <div className="movie-info-details">
          <div>{rating} ({votes} votes)</div>
          <div>{year} | {duration} | {rated}</div>
          <div>{genre}</div>
        </div>
        <div className="movie-info-plot">
            <p>{plot}</p>
        </div>
      </div>
      <div className="movie-info-poster-container">
          <div className="movie-info-poster" style={posterStyle} />
      </div>
    </section>
  )
}

export default MovieInfo;