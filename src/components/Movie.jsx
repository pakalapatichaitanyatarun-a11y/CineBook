function Movie(props) {
  const posterUrl = props.poster
    ? `https://image.tmdb.org/t/p/w500${props.poster}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={posterUrl}
          alt={props.title}
        />

        <span className="movie-rating">
          ⭐ {props.rating}
        </span>
      </div>

      <div className="movie-details">
        <h3>{props.title}</h3>

        <p>
          {props.language} • {props.genre}
        </p>

        <button
          className="book-button"
          onClick={props.onBook}
        >
          Select Movie
        </button>
      </div>
    </div>
  );
}

export default Movie;