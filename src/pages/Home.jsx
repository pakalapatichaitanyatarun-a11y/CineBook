import { useEffect, useState } from "react";
import { Link } from "react-router";

import Navbar from "../components/Navbar";
import Theater from "../components/Theater";

import {
  getMovies,
  getTeluguMovies,
  getPoster,
  theaters,
  getMovieNamesForTheater,
  searchMovie,
} from "../data/movies";


/* =========================
   TELUGU FIRST
========================= */

function teluguFirst(movies) {

  return [...movies].sort(
    function (a, b) {

      if (
        a.original_language === "te" &&
        b.original_language !== "te"
      ) {
        return -1;
      }

      if (
        a.original_language !== "te" &&
        b.original_language === "te"
      ) {
        return 1;
      }

      return 0;
    }
  );
}


/* =========================
   HOME
========================= */

function Home() {

  const [nowShowing, setNowShowing] =
    useState([]);

  const [comingSoon, setComingSoon] =
    useState([]);

  const [popularMovies, setPopularMovies] =
    useState([]);

  const [theaterMovies, setTheaterMovies] =
    useState({});

  const [loading, setLoading] =
    useState(true);


  /* =========================
     GET MOVIES
  ========================= */

  useEffect(function () {

    Promise.all([

      getMovies(
        "now_playing",
        1
      ),

      getMovies(
        "upcoming",
        1
      ),

      getMovies(
        "popular",
        1
      ),

      getTeluguMovies(1),

    ])

      .then(
        async function (results) {

          const normalNowShowing =
            results[0].results || [];

          const upcoming =
            results[1].results || [];

          const popular =
            results[2].results || [];

          const telugu =
            results[3].results || [];


          /*
            Combine normal movies
            with Telugu movies.
          */

          const combinedNowShowing = [
            ...telugu,
            ...normalNowShowing,
          ];


          /*
            Remove duplicate movies.
          */

          const uniqueNowShowing =
            combinedNowShowing.filter(
              function (movie, index, array) {

                return (
                  array.findIndex(
                    function (item) {
                      return (
                        item.id ===
                        movie.id
                      );
                    }
                  ) === index
                );

              }
            );


          setNowShowing(
            teluguFirst(
              uniqueNowShowing
            )
          );


          setComingSoon(
            teluguFirst(upcoming)
          );


          setPopularMovies(
            teluguFirst(popular)
          );


          /* =========================
             LOAD THEATER MOVIES
          ========================= */

          const theaterData = {};


          for (
            const theater of theaters
          ) {

            const movieNames =
              getMovieNamesForTheater(
                theater.name
              );


            const movieResults =
              await Promise.all(

                movieNames.map(
                  async function (
                    movieTitle
                  ) {

                    try {

                      const data =
                        await searchMovie(
                          movieTitle
                        );


                      if (
                        data.results &&
                        data.results.length > 0
                      ) {

                        /*
                          Find exact title
                          first.
                        */

                        const exactMovie =
                          data.results.find(
                            function (
                              movie
                            ) {

                              return (
                                movie.title
                                  .toLowerCase() ===
                                movieTitle
                                  .toLowerCase()
                              );

                            }
                          );


                        const movie =
                          exactMovie ||
                          data.results[0];


                        return {
                          id:
                            movie.id,

                          title:
                            movie.title,

                          poster:
                            getPoster(
                              movie.poster_path
                            ),

                          rating:
                            movie.vote_average
                              ? movie.vote_average.toFixed(
                                  1
                                )
                              : "N/A",

                          language:
                            movie.original_language,
                        };

                      }

                    } catch (
                      error
                    ) {

                      console.log(
                        "Theater movie error:",
                        movieTitle,
                        error
                      );

                    }

                    return null;

                  }
                )
              );


            theaterData[
              theater.name
            ] = teluguFirst(
              movieResults.filter(
                function (movie) {
                  return movie !== null;
                }
              )
            );

          }


          setTheaterMovies(
            theaterData
          );


          setLoading(false);

        }
      )

      .catch(function (error) {

        console.log(
          "Movie error:",
          error
        );

        setLoading(false);

      });

  }, []);


  return (
    <>
      <Navbar />


      {/* =========================
          HERO
      ========================= */}

      <section
        className="home-hero"
        id="home"
      >

        <div className="home-hero-content">

          <p className="hero-small-title">
            CINEBOOK • KAKINADA
          </p>

          <h1>
            Movies.
            <br />
            Shows.
            <br />
            Memories.
          </h1>

          <p>
            Book your favorite movies,
            choose your theater, select
            your seats and enjoy your
            movie experience.
          </p>

          <a
            href="#now-showing"
            className="hero-book-button"
          >
            Explore Movies
          </a>

        </div>

      </section>


      {/* =========================
          NOW SHOWING
      ========================= */}

      <section
        className="home-movie-section"
        id="now-showing"
      >

        <div className="home-section-heading">

          <p className="red-label">
            🔴 NOW SHOWING
          </p>

          <h2>
            Movies Playing Now
          </h2>

          <span>
            Telugu movies are shown first,
            followed by other movies.
          </span>

        </div>


        {loading ? (

          <div className="movie-loading">
            Loading movies...
          </div>

        ) : (

          <div className="bookmyshow-movie-grid">

            {nowShowing
              .slice(0, 12)
              .map(
                function (movie) {

                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      type="now"
                    />
                  );

                }
              )}

          </div>

        )}

      </section>


      {/* =========================
          COMING SOON
      ========================= */}

      <section
        className="home-movie-section coming-section"
      >

        <div className="home-section-heading">

          <p className="yellow-label">
            🟡 COMING SOON
          </p>

          <h2>
            Upcoming Movies
          </h2>

          <span>
            Telugu movies are prioritized
            in this section.
          </span>

        </div>


        <div className="bookmyshow-movie-grid">

          {comingSoon
            .slice(0, 8)
            .map(
              function (movie) {

                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    type="coming"
                  />
                );

              }
            )}

        </div>

      </section>


      {/* =========================
          POPULAR
      ========================= */}

      <section
        className="home-movie-section"
        id="movies"
      >

        <div className="home-section-heading">

          <p className="blue-label">
            ⭐ POPULAR
          </p>

          <h2>
            Popular Movies
          </h2>

          <span>
            Telugu movies are prioritized
            before other languages.
          </span>

        </div>


        <div className="bookmyshow-movie-grid">

          {popularMovies
            .slice(0, 8)
            .map(
              function (movie) {

                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    type="popular"
                  />
                );

              }
            )}

        </div>

      </section>


      {/* =========================
          THEATERS
      ========================= */}

      <section
        className="home-movie-section theaters-home-section"
        id="theaters"
      >

        <div className="home-section-heading">

          <p className="red-label">
            🎥 CINEBOOK THEATERS
          </p>

          <h2>
            Movies by Theater
          </h2>

          <span>
            Movies available at each
            CineBook theater.
          </span>

        </div>


        <div className="theaters-home-list">

          {theaters.map(
            function (theater) {

              const movies =
                theaterMovies[
                  theater.name
                ] || [];


              return (
                <Theater
                  key={theater.name}
                  name={theater.name}
                  location={
                    theater.location
                  }
                  movies={movies}
                />
              );

            }
          )}

        </div>

      </section>

    </>
  );
}


/* =========================
   MOVIE CARD
========================= */

function MovieCard(props) {

  const movie =
    props.movie;


  return (
    <Link
      to={`/movie/${movie.id}`}
      className="home-movie-card"
    >

      <div className="home-movie-poster">

        <img
          src={getPoster(
            movie.poster_path
          )}
          alt={movie.title}
        />


        {movie.original_language ===
          "te" ? (

          <span
            className="movie-status now-status"
          >
            TELUGU
          </span>

        ) : props.type === "coming" ? (

          <span
            className="movie-status coming-status"
          >
            COMING SOON
          </span>

        ) : (

          <span
            className="movie-status now-status"
          >
            NOW SHOWING
          </span>

        )}

      </div>


      <div className="home-movie-info">

        <h3>
          {movie.title}
        </h3>


        <div className="movie-card-bottom">

          <span>
            ⭐{" "}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span>
            View Details →
          </span>

        </div>

      </div>

    </Link>
  );
}


export default Home;