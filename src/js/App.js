import React, { Component } from 'react';

import MovieSearch from './MovieSearch.js';
import MovieInfo from './MovieInfo.js';

import {fetchMovieInfoById} from './service.js';

import '../css/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedMovie: null,
      showMovieInfo: false
    }

    this.onSelectMovie = this.onSelectMovie.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.closeMovieInfo = this.closeMovieInfo.bind(this);
  }

  onSelectMovie(imdbID) {
    fetchMovieInfoById(imdbID)
      .then(movie => {
        this.setState({ selectedMovie: movie, showMovieInfo: true});
      });
  }

  closeMovieInfo() {
    this.setState({showMovieInfo: false})
  }

  toggleOverlay() {
    const toggle = (this.state.showMovieInfo) ? 'add' : 'remove';
    document.body.classList[toggle]('overlay');
  }

  render() {
    const {selectedMovie, showMovieInfo} = this.state;
    
    this.toggleOverlay();
    
    return (
      <div className="app">
        <header className="app-header-wrap">
          <h1 className="app-header">Reel Search</h1>
        </header>
        <MovieSearch onSelect={this.onSelectMovie} />
        <MovieInfo {...selectedMovie} 
          onClose={this.closeMovieInfo}
          isOpen={showMovieInfo} 
        />
      </div>
    );
  }
}

export default App;
