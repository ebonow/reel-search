import React from 'react';

import '../css/MovieItem.css';

export default class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => props.onClick(props.imdbID);
    }
    
    render() {
        const {imgUrl, title, year, imdbID} = this.props;
        const posterStyle = {'backgroundImage': 'url('+imgUrl+')'};

        return (
            <li className="movie-item"
                data-id={imdbID} 
                key={imdbID} 
                onClick={this.onClick}
            >
                <div className="movie-item-poster" style={posterStyle} />
                <div className="movie-item-title">{title}</div>
                <div className="movie-item-year">({year})</div>
            </li>
        );
    }
}