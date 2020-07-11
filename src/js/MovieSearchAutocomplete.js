import React from 'react';
import Autocomplete from 'react-autocomplete';

export default MovieSearchAutocomplete = props => {
  const { query, searchMovies, onSelectMovie } = props;

  return (
    <Autocomplete 
      getItemValue={item=>item.imdbID}
      renderItem={(props, isActive) => <MovieItem {...props} css={isActive?'active':''} />}
      items={movieResults}
      value={query}
      onChange={searchMovies}
      onSelect={onSelectMovie}
    />
  );
}