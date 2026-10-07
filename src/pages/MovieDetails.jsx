
import { useEffect, useState } from "react";

import {
  Link,
  useParams,
} from "react-router";

import Navbar from "../components/Navbar";

import {
  getMovieDetails,
  getPoster,
} from "../data/movies";


function MovieDetails() {

  const { movieId } = useParams();


  /* =========================
     STATE
  ========================= */

  const [movie, setMovie] =
    useState(null);

  const [trailer, setTrailer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  /* =========================
     LOAD MOVIE DETAILS
  ========================= */

  useEffect(function () {

    getMovieDetails(movieId)

      .then(function (data) {

        console.log(
          "Movie details:",
          data
        );


        /* =========================
           SAVE MOVIE
        ========================= */

        setMovie(data);


        /* =========================
           GET VIDEOS
        ========================= */

        const videos =
          data.videos &&
          data.videos.results
            ? data.videos.results
            : [];


        console.log(
          "TMDB videos:",
          videos
        );


        /* =========================
           ONLY YOUTUBE TRAILERS
        ========================= */

        const youtubeTrailers =
          videos.filter(
            function (video) {

              return (
                video.site ===
                  "YouTube" &&

                video.type ===
                  "Trailer" &&

                video.key
              );

            }
          );


        console.log(
          "YouTube trailers:",
          youtubeTrailers
        );


        /* =========================
           ONLY OFFICIAL TRAILERS
        ========================= */

        const officialTrailers =
          youtubeTrailers.filter(
            function (video) {

              return (
                video.official ===
                true
              );

            }
          );


        console.log(
          "Official trailers:",
          officialTrailers
        );


        /* =========================
           SELECT TRAILER
        ========================= */

        let selectedTrailer =
          null;


        if (
          officialTrailers.length >
          0
        ) {

          /*

            First preference:
            "Official Trailer"

          */

          selectedTrailer =
            officialTrailers.find(
              function (video) {

                const name =
                  video.name
                    ? video.name.toLowerCase()
                    : "";


                return name.includes(
                  "official trailer"
                );

              }
            );


          /*

            Second preference:
            Any TMDB official trailer

          */

          if (
            !selectedTrailer
          ) {

            selectedTrailer =
              officialTrailers[0];

          }

        }


        setTrailer(
          selectedTrailer
        );


        /* =========================
           STOP LOADING
        ========================= */

        setLoading(false);

      })


      .catch(function (error) {

        console.error(
          "Movie details error:",
          error
        );


        setMovie(null);

        setTrailer(null);

        setLoading(false);

      });

  }, [movieId]);


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <>

        <Navbar />

        <div className="details-loading">

          Loading movie...

        </div>

      </>
    );

  }


  /* =========================
     MOVIE NOT FOUND
  ========================= */

  if (!movie) {

    return (
      <>

        <Navbar />

        <main className="not-found">

          <h2>
            Movie Not Found
          </h2>

          <p>
            Unable to load movie details.
          </p>

          <Link to="/">
            ← Back to Home
          </Link>

        </main>

      </>
    );

  }


  /* =========================
     MOVIE DETAILS PAGE
  ========================= */

  return (
    <>

      <Navbar />


      <main className="movie-details-page">


        {/* =========================
            MOVIE INFORMATION
        ========================= */}

        <section className="movie-details-main">

          <div className="movie-details-container">


            {/* POSTER */}

            <div className="details-poster">

              <img
                src={
                  getPoster(
                    movie.poster_path
                  )
                }
                alt={
                  movie.title ||
                  "Movie poster"
                }
              />

            </div>


            {/* INFORMATION */}

            <div className="details-information">


              <p className="details-category">

                MOVIE DETAILS

              </p>


              <h1>

                {movie.title}

              </h1>


              {/* =========================
                  META
              ========================= */}

              <div className="details-meta">


                <span>

                  ⭐{" "}

                  {movie.vote_average
                    ? movie.vote_average.toFixed(
                        1
                      )
                    : "N/A"}

                </span>


                <span>

                  🎬{" "}

                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "Runtime N/A"}

                </span>


                <span>

                  📅{" "}

                  {movie.release_date ||
                    "Release date N/A"}

                </span>


              </div>


              {/* =========================
                  DESCRIPTION
              ========================= */}

              <p className="details-overview">

                {movie.overview ||
                  "No description available."}

              </p>


              {/* =========================
                  GENRES
              ========================= */}

              <div className="details-genres">

                {movie.genres &&
                  movie.genres.length > 0 &&
                  movie.genres.map(
                    function (genre) {

                      return (

                        <span
                          key={
                            genre.id
                          }
                        >

                          {genre.name}

                        </span>

                      );

                    }
                  )}

              </div>


              {/* =========================
                  LANGUAGE
              ========================= */}

              <p className="details-language">

                Original Language:{" "}

                <strong>

                  {movie.original_language
                    ? movie.original_language.toUpperCase()
                    : "N/A"}

                </strong>

              </p>


              {/* =========================
                  ACTION BUTTONS
              ========================= */}

              <div className="details-actions">


                {/* OFFICIAL TRAILER */}

                {trailer && (

                  <a
                    href={
                      `https://www.youtube.com/watch?v=${trailer.key}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-trailer-button"
                  >

                    ▶ Watch Official Trailer

                  </a>

                )}


                {/* BOOK TICKETS */}

                <Link
                  to={
                    `/booking/${movie.id}`
                  }
                  className="details-book-button"
                >

                  🎟️ Book Tickets

                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            OFFICIAL TRAILER
        ========================= */}

        <section className="trailer-container">


          <div className="details-section-heading">

            <p>

              🎬 OFFICIAL VIDEO

            </p>


            <h2>

              Official Trailer

            </h2>

          </div>


          {trailer ? (

            <>

              {/* TRAILER VIDEO */}

              <div className="trailer-wrapper">

                <iframe
                  src={
                    `https://www.youtube.com/embed/${trailer.key}`
                  }
                  title={
                    `${movie.title} Official Trailer`
                  }
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                  "
                  allowFullScreen
                />

              </div>


              {/* TRAILER TITLE */}

              <p
                style={{
                  marginTop: "15px",
                  color: "#a1a1aa",
                  fontSize: "14px",
                }}
              >

                {trailer.name}

              </p>

            </>

          ) : (

            /* =========================
               NO OFFICIAL TRAILER
            ========================= */

            <div className="no-trailer">


              <div
                style={{
                  fontSize: "50px",
                  marginBottom: "15px",
                }}
              >

                🎬

              </div>


              <h3>

                Official Trailer Not Available

              </h3>


              <p>

                An official YouTube trailer
                for this movie is not available
                through TMDB.

              </p>

            </div>

          )}

        </section>


        {/* =========================
            BOOKING CTA
        ========================= */}

        <section className="details-booking-cta">


          <div>

            <p>

              READY FOR THE MOVIE?

            </p>


            <h2>

              Book your tickets now

            </h2>

          </div>


          <Link
            to={
              `/booking/${movie.id}`
            }
            className="cta-book-button"
          >

            Book Now →

          </Link>

        </section>


      </main>

    </>
  );

}


export default MovieDetails;
