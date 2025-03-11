import React from "react";

const MovieCard = ({movie}) => {

    const onFavClick =()=>{
        alert('clicked')
    }

  return <div className="movie-card">
    <div className="movie-poster">
        <img src={movie.url} alt={movie.title}/>
        <div className="movie-overlay">
            <button className="fav-btn" onClick={onFavClick}>
                🤍
            </button>
        </div>
    </div>
    
    MovieCard
    </div>;
};

export default MovieCard;
