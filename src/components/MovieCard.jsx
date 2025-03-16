import "../css/MovieCard.css"

const MovieCard = ({movie}) => {

    const onFavClick =()=>{
        alert('clicked')
    }

  return <div className="movie-card">
    <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title}/>
        <div className="movie-overlay">
            <button className="favorite-btn" onClick={onFavClick}>
                🤍
            </button>
        </div>
        <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </div>
    </div>
    
    </div>;
};

export default MovieCard;
