import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import {
  getNowPlayingMovies,
  getCineBookMovies,
  getPoster,
  theaters,
  getMovieNamesForTheater,
  isMovieAvailableAtTheater,
} from "../data/movies";

/* =====================================================
   NORMALIZE TITLE
===================================================== */

function normalizeTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(
      /[^a-z0-9]/g,
      ""
    );
}

/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  const [
    nowPlaying,
    setNowPlaying,
  ] = useState([]);

  const [
    cineBookMovies,
    setCineBookMovies,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  /* ===================================================
     LOAD MOVIES
  =================================================== */

  useEffect(
    function () {
      async function loadMovies() {
        try {
          setLoading(true);
          setError(false);

          const [
            pageOne,
            pageTwo,
            catalog,
          ] = await Promise.all([
            getNowPlayingMovies(1),
            getNowPlayingMovies(2),
            getCineBookMovies(),
          ]);

          /* ==========================================
             COMBINE TMDB NOW PLAYING
          ========================================== */

          const combined = [
            ...(pageOne.results || []),
            ...(pageTwo.results || []),
          ];

          /* ==========================================
             REMOVE DUPLICATES
          ========================================== */

          const unique = [];

          combined.forEach(
            function (movie) {
              const exists =
                unique.some(
                  function (item) {
                    return (
                      item.id ===
                      movie.id
                    );
                  }
                );

              if (!exists) {
                unique.push(
                  movie
                );
              }
            }
          );

          setNowPlaying(
            unique
          );

          setCineBookMovies(
            catalog || []
          );
        } catch (err) {
          console.error(
            "Home movie loading error:",
            err
          );

          setError(true);
        } finally {
          setLoading(false);
        }
      }

      loadMovies();
    },
    []
  );

  /* ===================================================
     NOW STREAMING

     Only movies that are:

     1. Currently playing on TMDB
     2. Available in at least one CineBook theater
  =================================================== */

  const nowStreaming =
    nowPlaying.filter(
      function (movie) {
        return theaters.some(
          function (theater) {
            return isMovieAvailableAtTheater(
              movie.title,
              theater.name
            );
          }
        );
      }
    );

  /* ===================================================
     GET MOVIE FROM CATALOG
  =================================================== */

  function findCatalogMovie(
    title
  ) {
    return cineBookMovies.find(
      function (movie) {
        return (
          normalizeTitle(
            movie.title
          ) ===
          normalizeTitle(
            title
          )
        );
      }
    );
  }

  /* ===================================================
     GET ALL CINEBOOK MOVIES

     Every theater receives the same movie catalog.

     Availability is checked separately for each
     theater.
  =================================================== */

  function getTheaterMovies() {
    const movies = [];

    /* ================================================
       ADD CATALOG MOVIES
    ================================================= */

    cineBookMovies.forEach(
      function (movie) {
        if (!movie) {
          return;
        }

        const exists =
          movies.some(
            function (item) {
              return (
                item.id ===
                movie.id
              );
            }
          );

        if (!exists) {
          movies.push(
            movie
          );
        }
      }
    );

    /* ================================================
       ADD SCHEDULED MOVIES THAT WERE NOT FOUND
       IN THE CATALOG
    ================================================= */

    theaters.forEach(
      function (theater) {
        const scheduledTitles =
          getMovieNamesForTheater(
            theater.name
          );

        scheduledTitles.forEach(
          function (title) {
            const movie =
              findCatalogMovie(
                title
              ) ||
              nowPlaying.find(
                function (item) {
                  return (
                    normalizeTitle(
                      item.title
                    ) ===
                    normalizeTitle(
                      title
                    )
                  );
                }
              );

            if (!movie) {
              return;
            }

            const exists =
              movies.some(
                function (item) {
                  return (
                    item.id ===
                    movie.id
                  );
                }
              );

            if (!exists) {
              movies.push(
                movie
              );
            }
          }
        );
      }
    );

    return movies;
  }

  const theaterMovies =
    getTheaterMovies();

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="movie-loading">
          Loading movies...
        </main>
      </>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <>
        <Navbar />

        <main className="not-found">
          <h2>
            Movies Could Not Be Loaded
          </h2>

          <p>
            Please check your TMDB
            connection and try again.
          </p>
        </main>
      </>
    );
  }

  /* ===================================================
     PAGE
  =================================================== */

  return (
    <>
      <Navbar />

      <Hero />

      {/* =================================================
          NOW STREAMING
      ================================================= */}

      <section
        className="home-movie-section"
        id="movies"
      >
        <div
          className="home-section-heading"
        >
          <p className="red-label">
            CINEBOOK NOW
          </p>

          <h2>
            Now Streaming
          </h2>

          <span>
            Movies currently playing
            in CineBook theaters.
          </span>
        </div>

        {nowStreaming.length === 0 ? (
          <div className="movie-loading">
            No movies are currently
            available in CineBook theaters.
          </div>
        ) : (
          <div
            className="bookmyshow-movie-grid"
          >
            {nowStreaming.map(
              function (movie) {
                return (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="home-movie-card"
                  >
                    <div
                      className="home-movie-poster"
                    >
                      <img
                        src={getPoster(
                          movie.poster_path
                        )}
                        alt={
                          movie.title
                        }
                      />

                      <span
                        className="movie-status now-status"
                      >
                        NOW SHOWING
                      </span>
                    </div>

                    <div
                      className="home-movie-info"
                    >
                      <h3>
                        {movie.title}
                      </h3>

                      <div
                        className="movie-card-bottom"
                      >
                        <span>
                          {movie.release_date
                            ? new Date(
                                movie.release_date
                              ).getFullYear()
                            : "Now"}
                        </span>

                        <span>
                          Book Now
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* =================================================
          THEATERS
      ================================================= */}

      <section
        className="home-movie-section theaters-home-section"
        id="theaters"
      >
        <div
          className="home-section-heading"
        >
          <p className="yellow-label">
            CINEBOOK THEATERS
          </p>

          <h2>
            Movies at Your Theater
          </h2>

          <span>
            Check movie availability
            theater by theater.
          </span>
        </div>

        <div
          className="theaters-home-list"
        >
          {theaters.map(
            function (theater) {
              return (
                <article
                  className="theater-card"
                  key={theater.name}
                >
                  {/* ===================================
                      THEATER HEADER
                  =================================== */}

                  <div
                    className="theater-header"
                  >
                    <div
                      className="theater-icon"
                    >
                      🎬
                    </div>

                    <div
                      className="theater-details"
                    >
                      <h3>
                        {theater.name}
                      </h3>

                      <p>
                        {theater.location}
                      </p>

                      <p
                        className="movie-count"
                      >
                        {theaterMovies.length}
                        {" "}
                        movies listed
                      </p>
                    </div>
                  </div>

                  {/* ===================================
                      MOVIES
                  =================================== */}

                  <div
                    className="theater-movies"
                  >
                    {theaterMovies.map(
                      function (movie) {
                        const available =
                          isMovieAvailableAtTheater(
                            movie.title,
                            theater.name
                          );

                        return (
                          <Link
                            key={
                              `${theater.name}-${movie.id}`
                            }
                            to={
                              available
                                ? `/movie/${movie.id}`
                                : "#"
                            }
                            className={
                              available
                                ? "theater-movie-item"
                                : "theater-movie-item unavailable"
                            }
                            onClick={
                              function (event) {
                                if (
                                  !available
                                ) {
                                  event.preventDefault();
                                }
                              }
                            }
                          >
                            <img
                              src={getPoster(
                                movie.poster_path
                              )}
                              alt={
                                movie.title
                              }
                            />

                            <div
                              className="theater-movie-info"
                            >
                              <strong>
                                {movie.title}
                              </strong>

                              {available ? (
                                <span>
                                  Available
                                </span>
                              ) : (
                                <span>
                                  Not Available
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </article>
              );
            }
          )}
        </div>
      </section>
    </>
  );
}

export default Home;