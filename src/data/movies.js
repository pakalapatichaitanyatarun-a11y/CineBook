const API_URL =
  "https://api.themoviedb.org/3";

const TOKEN =
  import.meta.env.VITE_TMDB_TOKEN;

function tmdbRequest(endpoint) {
  return fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
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

export function getMovies(
  category,
  page = 1
) {
  return tmdbRequest(
    `/movie/${category}?language=en-US&page=${page}&region=IN`
  );
}

export function getTeluguMovies(
  page = 1
) {
  return tmdbRequest(
    `/discover/movie?with_original_language=te&sort_by=popularity.desc&region=IN&language=en-US&page=${page}`
  );
}

export function searchMovie(
  movieTitle
) {
  return tmdbRequest(
    `/search/movie?query=${encodeURIComponent(
      movieTitle
    )}&language=en-US&region=IN`
  );
}

export function getMovieDetails(
  movieId
) {
  return tmdbRequest(
    `/movie/${movieId}?language=en-US&append_to_response=videos`
  );
}

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

export const theaters = [
  {
    name: "INOX: SRMT Mall",
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
    name: "Satyagouri A/C",
    location:
      "Cinema Road, Kakinada",
  },
  {
    name: "Laxmi A/C",
    location:
      "Cinema Road, Kakinada",
  },
  {
    name: "Surya Cinemax",
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

export const showtimes = {
  "The Paradise": {
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
    "Surya Cinemax": [
      "6:15 PM",
    ],
    "Satyagouri A/C": [
      "11:00 AM",
      "4:00 PM",
    ],
  },

  "Thella Kaagitham": {
    "INOX: SRMT Mall": [
      "10:00 AM",
      "1:00 PM",
      "4:00 PM",
      "7:00 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Laxmi A/C": [
      "10:30 AM",
      "6:30 PM",
    ],
  },

  "Don't Trouble The Trouble": {
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
    "Chandra Guptha Complex": [
      "12:30 PM",
      "7:30 PM",
    ],
  },

  "Doraemon: Castle of the Undersea Devil":
    {
      "INOX: SRMT Mall": [
        "10:30 AM",
        "1:15 PM",
        "4:15 PM",
        "7:15 PM",
      ],
    },

  "Drishyam The Conclusion": {
    "INOX: SRMT Mall": [
      "11:30 AM",
      "2:30 PM",
      "6:00 PM",
      "9:30 PM",
    ],
  },

  "Sigma": {
    "INOX: SRMT Mall": [
      "12:00 PM",
      "3:30 PM",
      "6:30 PM",
      "9:30 PM",
    ],
    "Surya Cinemax": [
      "2:30 PM",
      "9:30 PM",
    ],
    "Satyagouri A/C": [
      "1:30 PM",
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
    "Laxmi A/C": [
      "2:00 PM",
      "9:00 PM",
    ],
  },

  "Verity": {
    "INOX: SRMT Mall": [
      "11:15 AM",
      "2:15 PM",
      "5:15 PM",
      "8:30 PM",
    ],
    "Chandra Guptha Complex": [
      "3:00 PM",
      "8:45 PM",
    ],
  },
};

export function getShowtimes(
  movieTitle,
  theaterName
) {
  if (!showtimes[movieTitle]) {
    return [];
  }

  return (
    showtimes[movieTitle][
      theaterName
    ] || []
  );
}

export function getMovieNamesForTheater(
  theaterName
) {
  const movieNames = [];

  Object.keys(showtimes).forEach(
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

export function getTheaterNamesForMovie(
  movieTitle
) {
  if (!showtimes[movieTitle]) {
    return [];
  }

  return Object.keys(
    showtimes[movieTitle]
  );
}