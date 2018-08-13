import React, {Component} from 'react';

import MovieItem from './MovieItem.js';

import {fetchMoviesByTerm} from './service.js';

import '../css/MovieSearch.css';

class MovieSearch extends Component {
    constructor() {
        super();

        this.state = {
            query: '',
            results: [],
            isFetching: false
        }

        this.inputValue='';
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    fetchMovies() {
        this.setState({ isFetching: true });
        
        fetchMoviesByTerm(this.inputValue).then(json => {
            this.setState({
                results: json.results || [],
                total: json.total,
                error: json.error,
                isFetching: false
            })
        });

    }

    render() {
        const {results=[], total, error} = this.state;
        const {onSelect} = this.props;

        return (
            <section className="movie-search">
                <div className="movie-search-control">
                    <label htmlFor="movie-search-input" className="movie-search-label">Search for movies:</label>
                    <input 
                        id="movie-search-input"
                        className="movie-search-input"
                        type="text"
                        onInput={event=>this.inputValue=event.target.value}
                    /> 

                    <button 
                        className="movie-search-button" 
                        onClick={this.fetchMovies} 
                        aria-label="Search">🔍</button>
                </div>

                {(!!results.length && !!total) && 
                <div className="movie-search-status">
                    {`Showing ${results.length} of ${total} results`}
                </div>
                }

                {(!!error) && 
                <div className="movie-search-error">{error}</div>
                }

                <ul className="movie-search-results">
                    {results.map(movie => 
                        <MovieItem {...movie} 
                            key={'movieItem-' + movie.imdbID} 
                            onClick={onSelect}
                        />
                    )}
                </ul>
            </section>
        );
    }
}

export default MovieSearch;