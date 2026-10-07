const API_URL =
  "https://api.themoviedb.org/3";

const TOKEN =
  import.meta.env.VITE_TMDB_TOKEN;


/* =====================================================
   TMDB REQUEST
===================================================== */

function tmdbRequest(endpoint) {
  return fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        Authorization:
          `Bearer ${TOKEN}`,
        accept:
          "application/json",
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(
        `TMDB Error: ${response.status}`
      );
    }

    return response.json();
  });
}


/* =====================================================
   NORMALIZE MOVIE TITLE
   Helps match titles even when TMDB uses:
   : , - or different capitalization.
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
   GET MOVIES
===================================================== */

export function getMovies(
  category,
  page = 1
) {
  return tmdbRequest(
    `/movie/${category}?language=en-US&page=${page}&region=IN`
  );
}


/* =====================================================
   GET CURRENT INDIA MOVIES
===================================================== */

export function getNowPlayingMovies(
  page = 1
) {
  return tmdbRequest(
    `/movie/now_playing?language=en-US&page=${page}&region=IN`
  );
}


/* =====================================================
   GET TELUGU MOVIES
===================================================== */

export function getTeluguMovies(
  page = 1
) {
  return tmdbRequest(
    `/discover/movie?with_original_language=te&sort_by=popularity.desc&region=IN&language=en-US&page=${page}`
  );
}


/* =====================================================
   SEARCH MOVIE
===================================================== */

export function searchMovie(
  movieTitle
) {
  return tmdbRequest(
    `/search/movie?query=${encodeURIComponent(
      movieTitle
    )}&language=en-US&region=IN`
  );
}


/* =====================================================
   GET MOVIE DETAILS
===================================================== */

export function getMovieDetails(
  movieId
) {
  return tmdbRequest(
    `/movie/${movieId}?language=en-US&append_to_response=videos`
  );
}


/* =====================================================
   POSTER
===================================================== */

export function getPoster(
  posterPath
) {
  if (!posterPath) {
    return "";
  }

  return (
    "https://image.tmdb.org/t/p/w500" +
    posterPath
  );
}


/* =====================================================
   BACKDROP
===================================================== */

export function getBackdrop(
  backdropPath
) {
  if (!backdropPath) {
    return "";
  }

  return (
    "https://image.tmdb.org/t/p/original" +
    backdropPath
  );
}


/* =====================================================
   CINEBOOK THEATERS
===================================================== */

export const theaters = [
  {
    name:
      "INOX: SRMT Mall",
    location:
      "Ramanayyapeta, Kakinada",
  },
  {
    name:
      "GEPL Padmapriya Sripriya",
    location:
      "Bhanugudi Junction, Kakinada",
  },
  {
    name:
      "Satyagouri A/C",
    location:
      "Cinema Road, Kakinada",
  },
  {
    name:
      "Laxmi A/C",
    location:
      "Cinema Road, Kakinada",
  },
  {
    name:
      "Surya Cinemax",
    location:
      "Vakalapudi, Kakinada",
  },
  {
    name:
      "Chandra Guptha Complex",
    location:
      "Kakinada",
  },
];


/* =====================================================
   CINEBOOK MOVIE CATALOG

   These are movies currently listed in Indian
   theatrical listings on October 7, 2026.

   Theater assignments below are CineBook demo
   showtime data for the project.
===================================================== */

export const cinebookMovieTitles = [
  "Drishyam: The Conclusion",
  "The Paradise",
  "Thellakaagitham",
  "Sigma",
  "Premada Oorali",
  "Don't Trouble the Trouble",
  "Bail",
  "Baththa",
  "The Vvaan",
  "Meesaya Murukku 2",
  "Hanuman Ansh",
  "Doraemon the Movie: New Nobita and the Castle of the Undersea Devil",
  "Verity",
  "Digger",
  "Anakapalli",
  "Avengers Endgame: Encore",
  "Heart of the Beast",
  "Premane Oorilo",
  "Mandaadi",
  "Sub-Inspector Yugandhar",
];


/* =====================================================
   GET CINEBOOK MOVIE CATALOG FROM TMDB

   Searches TMDB for our CineBook catalog.
===================================================== */

export async function getCineBookMovies() {
  const results =
    await Promise.all(
      cinebookMovieTitles.map(
        async function (title) {
          try {
            const data =
              await searchMovie(
                title
              );

            if (
              data.results &&
              data.results.length > 0
            ) {
              return data.results[0];
            }

            return null;
          } catch (error) {
            console.error(
              `Movie search failed: ${title}`,
              error
            );

            return null;
          }
        }
      )
    );

  const uniqueMovies = [];

  results.forEach(
    function (movie) {
      if (!movie) {
        return;
      }

      const exists =
        uniqueMovies.some(
          function (item) {
            return (
              item.id === movie.id
            );
          }
        );

      if (!exists) {
        uniqueMovies.push(
          movie
        );
      }
    }
  );

  return uniqueMovies;
}


/* =====================================================
   SHOWTIMES

   AT LEAST 10 MOVIES PER THEATER
===================================================== */

export const showtimes = {

  "Drishyam: The Conclusion": {
    "INOX: SRMT Mall": [
      "10:30 AM",
      "1:30 PM",
      "4:30 PM",
      "7:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:00 AM",
      "2:00 PM",
      "6:00 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "11:30 AM",
      "6:30 PM",
    ],
    "Laxmi A/C": [
      "2:30 PM",
      "9:00 PM",
    ],
    "Surya Cinemax": [
      "12:00 PM",
      "7:00 PM",
    ],
    "Chandra Guptha Complex": [
      "3:00 PM",
      "8:30 PM",
    ],
  },

  "The Paradise": {
    "INOX: SRMT Mall": [
      "10:00 AM",
      "1:00 PM",
      "4:00 PM",
      "7:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:00 AM",
      "2:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Satyagouri A/C": [
      "12:30 PM",
      "7:30 PM",
    ],
    "Laxmi A/C": [
      "3:00 PM",
      "9:15 PM",
    ],
    "Surya Cinemax": [
      "11:30 AM",
      "5:30 PM",
      "9:00 PM",
    ],
    "Chandra Guptha Complex": [
      "2:00 PM",
      "8:00 PM",
    ],
  },

  "Thellakaagitham": {
    "INOX: SRMT Mall": [
      "10:15 AM",
      "1:15 PM",
      "4:15 PM",
      "7:15 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "3:00 PM",
      "7:00 PM",
    ],
    "Satyagouri A/C": [
      "11:00 AM",
      "6:00 PM",
    ],
    "Laxmi A/C": [
      "1:30 PM",
      "8:30 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "9:00 PM",
    ],
  },

  "Sigma": {
    "INOX: SRMT Mall": [
      "12:00 PM",
      "3:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:30 AM",
      "2:30 PM",
      "6:00 PM",
    ],
    "Satyagouri A/C": [
      "1:30 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "3:00 PM",
      "9:00 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "12:30 PM",
      "7:30 PM",
    ],
  },

  "Premada Oorali": {
    "INOX: SRMT Mall": [
      "11:00 AM",
      "2:00 PM",
      "5:00 PM",
      "8:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "3:30 PM",
      "7:30 PM",
    ],
    "Satyagouri A/C": [
      "1:00 PM",
      "8:00 PM",
    ],
    "Laxmi A/C": [
      "11:30 AM",
      "6:30 PM",
    ],
    "Surya Cinemax": [
      "2:00 PM",
      "6:00 PM",
      "9:00 PM",
    ],
    "Chandra Guptha Complex": [
      "4:30 PM",
      "9:15 PM",
    ],
  },

  "Don't Trouble the Trouble": {
    "INOX: SRMT Mall": [
      "11:00 AM",
      "2:00 PM",
      "5:00 PM",
      "8:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "3:00 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Satyagouri A/C": [
      "2:00 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "11:00 AM",
      "7:00 PM",
    ],
    "Surya Cinemax": [
      "1:30 PM",
      "5:30 PM",
      "9:15 PM",
    ],
    "Chandra Guptha Complex": [
      "3:30 PM",
      "8:45 PM",
    ],
  },

  "Bail": {
    "INOX: SRMT Mall": [
      "10:45 AM",
      "1:45 PM",
      "5:15 PM",
      "8:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:15 AM",
      "4:00 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "12:30 PM",
      "7:30 PM",
    ],
    "Laxmi A/C": [
      "2:00 PM",
      "8:45 PM",
    ],
    "Surya Cinemax": [
      "3:00 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "1:00 PM",
      "8:00 PM",
    ],
  },

  "Baththa": {
    "INOX: SRMT Mall": [
      "10:30 AM",
      "1:30 PM",
      "4:30 PM",
      "7:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:30 PM",
      "5:00 PM",
      "9:15 PM",
    ],
    "Satyagouri A/C": [
      "11:30 AM",
      "6:30 PM",
    ],
    "Laxmi A/C": [
      "3:30 PM",
      "9:00 PM",
    ],
    "Surya Cinemax": [
      "1:00 PM",
      "5:30 PM",
      "8:30 PM",
    ],
    "Chandra Guptha Complex": [
      "2:30 PM",
      "7:30 PM",
    ],
  },

  "The Vvaan": {
    "INOX: SRMT Mall": [
      "11:30 AM",
      "2:30 PM",
      "5:30 PM",
      "8:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "4:00 PM",
      "8:30 PM",
    ],
    "Satyagouri A/C": [
      "1:00 PM",
      "7:00 PM",
    ],
    "Laxmi A/C": [
      "2:30 PM",
      "8:30 PM",
    ],
    "Surya Cinemax": [
      "12:30 PM",
      "6:00 PM",
      "9:15 PM",
    ],
    "Chandra Guptha Complex": [
      "3:00 PM",
      "8:00 PM",
    ],
  },

  "Meesaya Murukku 2": {
    "INOX: SRMT Mall": [
      "10:00 AM",
      "1:00 PM",
      "4:00 PM",
      "7:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:30 AM",
      "3:30 PM",
      "8:30 PM",
    ],
    "Satyagouri A/C": [
      "12:00 PM",
      "7:30 PM",
    ],
    "Laxmi A/C": [
      "2:00 PM",
      "9:00 PM",
    ],
    "Surya Cinemax": [
      "1:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "8:30 PM",
    ],
  },

  "Hanuman Ansh": {
    "INOX: SRMT Mall": [
      "10:30 AM",
      "2:00 PM",
      "5:30 PM",
      "8:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "4:00 PM",
      "8:00 PM",
    ],
    "Satyagouri A/C": [
      "1:30 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "11:30 AM",
      "6:00 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "6:30 PM",
      "9:00 PM",
    ],
    "Chandra Guptha Complex": [
      "3:30 PM",
      "8:45 PM",
    ],
  },

  "Doraemon the Movie: New Nobita and the Castle of the Undersea Devil": {
    "INOX: SRMT Mall": [
      "10:00 AM",
      "12:30 PM",
      "3:00 PM",
      "5:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:00 AM",
      "2:00 PM",
      "5:00 PM",
    ],
    "Satyagouri A/C": [
      "10:30 AM",
      "4:30 PM",
    ],
    "Laxmi A/C": [
      "12:00 PM",
      "6:00 PM",
    ],
    "Surya Cinemax": [
      "11:30 AM",
      "3:30 PM",
      "7:00 PM",
    ],
    "Chandra Guptha Complex": [
      "1:00 PM",
      "5:30 PM",
    ],
  },

  "Verity": {
    "INOX: SRMT Mall": [
      "11:15 AM",
      "2:15 PM",
      "5:15 PM",
      "8:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "1:00 PM",
      "5:00 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "2:00 PM",
      "8:00 PM",
    ],
    "Laxmi A/C": [
      "3:00 PM",
      "9:30 PM",
    ],
    "Surya Cinemax": [
      "12:30 PM",
      "6:00 PM",
      "9:15 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "8:30 PM",
    ],
  },

  "Digger": {
    "INOX: SRMT Mall": [
      "10:45 AM",
      "1:45 PM",
      "5:00 PM",
      "8:15 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:30 PM",
      "4:30 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "1:00 PM",
      "7:30 PM",
    ],
    "Laxmi A/C": [
      "2:00 PM",
      "8:45 PM",
    ],
    "Surya Cinemax": [
      "3:00 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "8:00 PM",
    ],
  },

  "Anakapalli": {
    "INOX: SRMT Mall": [
      "11:00 AM",
      "2:00 PM",
      "5:00 PM",
      "8:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:00 PM",
      "3:30 PM",
      "7:30 PM",
    ],
    "Satyagouri A/C": [
      "1:30 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "11:30 AM",
      "6:30 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "6:30 PM",
      "9:00 PM",
    ],
    "Chandra Guptha Complex": [
      "3:00 PM",
      "8:30 PM",
    ],
  },

  "Avengers Endgame: Encore": {
    "INOX: SRMT Mall": [
      "3:30 PM",
      "9:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "4:00 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "5:00 PM",
    ],
    "Laxmi A/C": [
      "6:30 PM",
    ],
    "Surya Cinemax": [
      "4:30 PM",
      "8:30 PM",
    ],
    "Chandra Guptha Complex": [
      "5:30 PM",
    ],
  },

  "Heart of the Beast": {
    "INOX: SRMT Mall": [
      "12:00 PM",
      "4:00 PM",
      "8:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "1:30 PM",
      "6:00 PM",
      "9:30 PM",
    ],
    "Satyagouri A/C": [
      "2:30 PM",
      "8:00 PM",
    ],
    "Laxmi A/C": [
      "3:30 PM",
      "9:00 PM",
    ],
    "Surya Cinemax": [
      "2:00 PM",
      "6:30 PM",
      "9:15 PM",
    ],
    "Chandra Guptha Complex": [
      "4:30 PM",
      "8:30 PM",
    ],
  },

  "Premane Oorilo": {
    "INOX: SRMT Mall": [
      "10:30 AM",
      "2:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "11:30 AM",
      "3:30 PM",
      "8:30 PM",
    ],
    "Satyagouri A/C": [
      "1:00 PM",
      "7:30 PM",
    ],
    "Laxmi A/C": [
      "2:00 PM",
      "8:30 PM",
    ],
    "Surya Cinemax": [
      "12:30 PM",
      "5:30 PM",
      "9:00 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "8:00 PM",
    ],
  },

  "Mandaadi": {
    "INOX: SRMT Mall": [
      "11:00 AM",
      "2:00 PM",
      "5:00 PM",
      "8:00 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "12:30 PM",
      "4:30 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "2:00 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "1:00 PM",
      "7:00 PM",
    ],
    "Surya Cinemax": [
      "3:00 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "4:00 PM",
      "8:45 PM",
    ],
  },

  "Sub-Inspector Yugandhar": {
    "INOX: SRMT Mall": [
      "12:00 PM",
      "3:30 PM",
      "7:00 PM",
      "9:30 PM",
    ],
    "GEPL Padmapriya Sripriya": [
      "1:00 PM",
      "5:00 PM",
      "9:00 PM",
    ],
    "Satyagouri A/C": [
      "2:30 PM",
      "8:30 PM",
    ],
    "Laxmi A/C": [
      "3:00 PM",
      "9:15 PM",
    ],
    "Surya Cinemax": [
      "1:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Chandra Guptha Complex": [
      "4:30 PM",
      "8:30 PM",
    ],
  },
};


/* =====================================================
   GET SHOWTIMES

   Uses normalized title matching.
===================================================== */

export function getShowtimes(
  movieTitle,
  theaterName
) {
  const movieKey =
    Object.keys(
      showtimes
    ).find(
      function (title) {
        return (
          normalizeTitle(title) ===
          normalizeTitle(movieTitle)
        );
      }
    );

  if (!movieKey) {
    return [];
  }

  return (
    showtimes[movieKey][
      theaterName
    ] || []
  );
}


/* =====================================================
   GET MOVIES FOR THEATER

   Returns movie titles scheduled at theater.
===================================================== */

export function getMovieNamesForTheater(
  theaterName
) {
  const movieNames = [];

  Object.keys(
    showtimes
  ).forEach(
    function (movieTitle) {

      if (
        showtimes[movieTitle][
          theaterName
        ]
      ) {
        movieNames.push(
          movieTitle
        );
      }

    }
  );

  return movieNames;
}


/* =====================================================
   CHECK MOVIE AVAILABILITY
===================================================== */

export function isMovieAvailableAtTheater(
  movieTitle,
  theaterName
) {
  return (
    getShowtimes(
      movieTitle,
      theaterName
    ).length > 0
  );
}


/* =====================================================
   GET THEATERS FOR MOVIE
===================================================== */

export function getTheaterNamesForMovie(
  movieTitle
) {
  const matchingTitle =
    Object.keys(
      showtimes
    ).find(
      function (title) {
        return (
          normalizeTitle(title) ===
          normalizeTitle(movieTitle)
        );
      }
    );

  if (!matchingTitle) {
    return [];
  }

  return Object.keys(
    showtimes[
      matchingTitle
    ]
  );
}


/* =====================================================
   GET SCHEDULED MOVIE TITLES
===================================================== */

export function getAllScheduledMovieTitles() {
  return Object.keys(
    showtimes
  );
}