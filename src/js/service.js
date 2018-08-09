const apiUrl = 'https://www.omdbapi.com/';
const imgUrl = 'http://img.omdbapi.com/';
const apiKey = '9f572b90';

const ERRORS = {
    EMPTY: {error: 'Please enter a search term'},
};

export function fetchMoviesByTerm(term) {
    if (!term.trim().length) {
        return ERRORS.EMPTY;
    }

    const url = `${apiUrl}?s=${term}&apikey=${apiKey}&r=json`;

    return getJson(url).then(serviceMapper.fetchMoviesByTerm);
}

export function fetchMovieInfoById(id) {
    const url = `${apiUrl}?i=${id}&apikey=${apiKey}&r=json`;
    
    return getJson(url).then(serviceMapper.fetchMovieInfoById);
}

const getMoviePosterUrl = (id) => `${imgUrl}?i=${id}&apikey=${apiKey}`;

const handleErrors = (resp) => {
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    return resp;
}

const getJson = (url) => fetch(url)
    .then(handleErrors)
    .then(resp => resp.json())
    .catch(error => ({Error: error.message }));

const serviceMapper = {
    fetchMoviesByTerm: (json) => {
        const results = (json.Search || []).map(serviceMapper.fetchMoviesByTermResults);
        
        return {
            results,
            total: json.totalResults,
            error: json.Error
        }; 
    },
    fetchMoviesByTermResults: (result={}) => ({
        imdbID: result.imdbID,
        title: result.Title,
        year: result.Year,
        imgUrl: result.Poster,
        type: result.Type
    }),
    fetchMovieInfoById: (info) => ({
        actors: info.Actors,
        awards: info.Awards,
        director: info.Director,
        duration: info.Runtime,
        genre: info.Genre,
        plot: info.Plot,
        posterUrl: getMoviePosterUrl(info.imdbID),
        rated: info.Rated,
        rating: info.imdbRating,
        title: info.Title,
        type: info.Type,
        votes: info.imdbVotes,
        year: info.Year
    })
}