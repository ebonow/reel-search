import React, {Component} from 'react';
import Autocomplete from 'react-autocomplete';

export default class MovieSearchAutocomplete extends Component {
    // searchMovies = (event, query) => {
    //   this.setState({query})
    //   window.clearTimeout(this.fetchMoviesTimer);
    //   const term = query;
    //   this.fetchMoviesTimer = window.setTimeout(()=>this.fetchMovies(term), 500);
    // }
  
    render() {
        const {query, searchMovies, onSelectMovie} = this.props;

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
}

