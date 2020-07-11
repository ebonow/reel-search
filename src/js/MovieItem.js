import React from 'react';

import '../css/MovieItem.css';

export default function MovieItem (props) {
  const { imgUrl, title, year, imdbID, onSelect } = props;

  const posterStyle = { 'backgroundImage': 'url('+imgUrl+')' };
  const onClick = () => onSelect(imdbID);

  return (
    <li className="movie-item" data-id={imdbID} key={imdbID} onClick={onClick}>
      <div className="movie-item-poster" style={posterStyle} />
      <div className="movie-item-title">{title}</div>
      <div className="movie-item-year">({year})</div>
    </li>
  );
}