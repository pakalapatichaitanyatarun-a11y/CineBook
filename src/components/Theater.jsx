import { Link } from "react-router";

function Theater(props) {
  const movies = props.movies || [];

  return (
    <div className="theater-card">

      {/* Theater Information */}

      <div className="theater-header">

        <div className="theater-icon">
          🎥
        </div>

        <div className="theater-details">

          <h3>
            {props.name}
          </h3>

          <p>
            📍 {props.location}
          </p>

          <p className="movie-count">
            🎬 {movies.length} movies available
          </p>

        </div>

      </div>


      {/* Movies */}

      {movies.length > 0 ? (

        <div className="theater-movies">

          {movies.map(function (movie) {

            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="theater-movie-item"
              >

                <img
                  src={movie.poster}
                  alt={movie.title}
                />

                <div className="theater-movie-info">

                  <h4>
                    {movie.title}
                  </h4>

                  <p>
                    ⭐ {movie.rating}
                  </p>

                  <span>
                    View Movie →
                  </span>

                </div>

              </Link>
            );

          })}

        </div>

      ) : (

        <div className="no-theater-movies">
          No movies available
        </div>

      )}

    </div>
  );
}

export default Theater;