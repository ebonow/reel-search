import React, {Component} from 'react';
import CN from 'classnames';

import MovieItem from './MovieItem.js';

import {fetchMovies} from './service.js';

import '../css/MovieSearch.css';

class MovieSearch extends Component {
    constructor() {
        super();

        this.state = {
            query: '',
            results: [],
            isFetching: false,
            page: 0,
            total: 0
        }

        this.onClick = {
            search: this.onSearchButtonPress.bind(this),
            prev:   this.onPrevButtonPress.bind(this),
            next:   this.onNextButtonPress.bind(this) 
        };

        this.input = React.createRef();
    }

    onSearchButtonPress() {
        this.inputValue = this.input.current.value;
        this.getMovies(1);
    }

    onPrevButtonPress() {
        const page = Math.max(1, this.state.page-1);
        this.getMovies(page);
    }

    onNextButtonPress() {
        const page = Math.min(Math.ceil(this.state.total/10), this.state.page+1);
        this.getMovies(page);
    }

    getMovies(page) {
        this.setState({ page, isFetching: true });
        const req = {page, term: this.inputValue};

        fetchMovies(req).then(({results=[], total, error}) => {
            this.setState({
                results, 
                total,
                error,
                isFetching: false
            })
        });
    }

    getResultsText() {
        const {results=[], page, total} = this.state;
        const len = results.length;
        const i = (10 * page) - 9;
        
        const range = (len === 1) ? i : `${i} - ${i + len - 1}`;
        
        return `Showing ${range} of ${total} results`;
    }

    componentDidMount() {
        this.input.current.focus();
    }

    render() {
        const {results=[], total, error, page, isFetching} = this.state;
        const {onSelect} = this.props;
        
        const showPrev = page > 1;
        const showNext = page < Math.ceil(total/10);

        return (
            <section className="movie-search">
                <div className="movie-search-control">
                    <label htmlFor="movie-search-input" className="movie-search-label">Search for movies:</label>
                    <input 
                        id="movie-search-input"
                        className="movie-search-input"
                        type="text"
                        ref={this.input}
                    /> 

                    <button 
                        className="movie-search-button" 
                        onClick={this.onClick.search} 
                        aria-label="Search">🔍</button>
                </div>

                {(!!results.length && !!total) && 
                <div className="movie-search-status">
                    <button className={CN({'hidden':!showPrev})} onClick={this.onClick.prev} disabled={isFetching}>‹ Prev</button>
                    {this.getResultsText()}
                    <button className={CN({'hidden':!showNext})}  onClick={this.onClick.next} disabled={isFetching}>Next ›</button>
                </div>
                }

                {(!!error) && 
                <div className="movie-search-error">{error}</div>
                }

                <ul className="movie-search-results">
                {results.map(movie => 
                    <MovieItem {...movie} key={'item-' + movie.imdbID} onClick={onSelect} />
                )}
                </ul>
            </section>
        );
    }
}

export default MovieSearch;