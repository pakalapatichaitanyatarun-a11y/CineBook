import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router";
import Navbar from "../components/Navbar";
import {
  getMovieDetails,
  getPoster,
  getBackdrop,
  getShowtimes,
  getTheaterNamesForMovie,
} from "../data/movies";

function getDates() {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push({
      value: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      number: date.getDate(),
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      today: i === 0,
    });
  }
  return dates;
}

function timeToMinutes(time) {
  const parts = time.split(" ");
  const clock = parts[0];
  const period = parts[1];
  const clockParts = clock.split(":");
  let hours = Number(clockParts[0]);
  const minutes = Number(clockParts[1]);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dates = getDates();

  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dates[0]?.value || ""
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getMovieDetails(movieId)
      .then(function (data) {
        setMovie(data);
        const movieTheaters = getTheaterNamesForMovie(
          data.title
        );
        setTheaters(movieTheaters);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Booking error:", error);
        setMovie(null);
        setLoading(false);
      });
  }, [movieId]);

  const showtimes =
    movie && selectedTheater
      ? getShowtimes(
          movie.title,
          selectedTheater
        )
      : [];

  const sortedShowtimes = [...showtimes].sort(
    function (a, b) {
      return timeToMinutes(a) - timeToMinutes(b);
    }
  );

  function handleTheaterSelect(theater) {
    setSelectedTheater(theater);
    setSelectedTime("");
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
    setSelectedTime("");
  }

  function handleTimeSelect(time) {
    setSelectedTime(time);
  }

  function continueToSeats() {
    if (!selectedTheater) {
      alert("Please select a theater.");
      return;
    }
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a showtime.");
      return;
    }
    navigate(
      `/booking/${movieId}/seats`,
      {
        state: {
          movie: movie,
          theater: selectedTheater,
          date: selectedDate,
          time: selectedTime,
        },
      }
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="booking-loading">
          <h2>Loading movie...</h2>
          <p>Please wait.</p>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <main className="not-found">
          <h2>Movie Not Found</h2>
          <p>Unable to load movie details.</p>
          <Link to="/">
            ← Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="booking-page">
        <section
          className="booking-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(5,5,5,0.25),rgba(5,5,5,0.98)),url(${getBackdrop(movie.backdrop_path)})`,
          }}
        >
          <div className="booking-hero-content">
            <p className="booking-eyebrow">
              BOOK YOUR TICKETS
            </p>
            <h1>{movie.title}</h1>
            <div className="booking-movie-meta">
              <span>
                ⭐ {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
              </span>
              <span>
                🎬 {movie.original_language
                  ? movie.original_language.toUpperCase()
                  : "N/A"}
              </span>
              <span>
                📅 {movie.release_date || "N/A"}
              </span>
            </div>
          </div>
        </section>

        <section className="booking-progress-container">
          <div className="booking-progress">
            <div className="booking-progress-step active">
              <div className="booking-progress-number">
                1
              </div>
              <span>Show</span>
            </div>
            <div className="booking-progress-line" />
            <div className="booking-progress-step">
              <div className="booking-progress-number">
                2
              </div>
              <span>Seats</span>
            </div>
            <div className="booking-progress-line" />
            <div className="booking-progress-step">
              <div className="booking-progress-number">
                3
              </div>
              <span>Snacks</span>
            </div>
            <div className="booking-progress-line" />
            <div className="booking-progress-step">
              <div className="booking-progress-number">
                4
              </div>
              <span>Payment</span>
            </div>
          </div>
        </section>

        <main className="booking-content">
          <div className="booking-layout">
            <div className="booking-main">

              <section className="booking-section">
                <div className="booking-section-heading">
                  <p>STEP 01</p>
                  <h2>Select Theater</h2>
                  <span>
                    Choose your preferred theater.
                  </span>
                </div>

                {theaters.length > 0 ? (
                  <div className="booking-theaters">
                    {theaters.map(function (theater) {
                      const selected =
                        selectedTheater === theater;

                      return (
                        <button
                          key={theater}
                          type="button"
                          className={
                            selected
                              ? "booking-theater selected"
                              : "booking-theater"
                          }
                          onClick={function () {
                            handleTheaterSelect(theater);
                          }}
                        >
                          <div className="booking-theater-icon">
                            🎥
                          </div>
                          <div className="booking-theater-info">
                            <h3>{theater}</h3>
                            <p>
                              Kakinada · Select theater
                            </p>
                          </div>
                          <div className="booking-theater-check">
                            {selected ? "✓" : ""}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="booking-empty">
                    <span>🎥</span>
                    <p>
                      No theaters available for this movie.
                    </p>
                  </div>
                )}
              </section>

              <section className="booking-section">
                <div className="booking-section-heading">
                  <p>STEP 02</p>
                  <h2>Select Date</h2>
                  <span>
                    Choose your preferred date.
                  </span>
                </div>

                <div className="booking-dates">
                  {dates.map(function (date) {
                    const selected =
                      selectedDate === date.value;

                    return (
                      <button
                        key={date.value}
                        type="button"
                        className={
                          selected
                            ? "booking-date selected"
                            : "booking-date"
                        }
                        onClick={function () {
                          handleDateSelect(date.value);
                        }}
                      >
                        <span>
                          {date.today
                            ? "Today"
                            : date.day}
                        </span>
                        <strong>
                          {date.number}
                        </strong>
                        <small>
                          {date.month}
                        </small>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="booking-section">
                <div className="booking-section-heading">
                  <p>STEP 03</p>
                  <h2>Select Showtime</h2>
                  <span>
                    Choose a convenient showtime.
                  </span>
                </div>

                {!selectedTheater ? (
                  <div className="booking-empty">
                    <span>🎥</span>
                    <p>
                      Select a theater first.
                    </p>
                  </div>
                ) : sortedShowtimes.length === 0 ? (
                  <div className="booking-empty">
                    <span>🕐</span>
                    <p>
                      No showtimes available
                      for this theater.
                    </p>
                  </div>
                ) : (
                  <div className="booking-showtimes">
                    {sortedShowtimes.map(function (time) {
                      const selected =
                        selectedTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          className={
                            selected
                              ? "booking-showtime selected"
                              : "booking-showtime"
                          }
                          onClick={function () {
                            handleTimeSelect(time);
                          }}
                        >
                          🕐 {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            <aside className="booking-sidebar">
              <section className="booking-summary">
                <div className="booking-summary-movie">
                  <img
                    src={getPoster(movie.poster_path)}
                    alt={movie.title}
                  />
                  <div>
                    <p>MOVIE</p>
                    <h3>{movie.title}</h3>
                    <span>
                      ⭐ {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="booking-summary-divider" />

                <div className="booking-summary-details">
                  <div>
                    <span>Theater</span>
                    <strong>
                      {selectedTheater ||
                        "Select theater"}
                    </strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>
                      {selectedDate ||
                        "Select date"}
                    </strong>
                  </div>

                  <div>
                    <span>Showtime</span>
                    <strong>
                      {selectedTime ||
                        "Select showtime"}
                    </strong>
                  </div>
                </div>

                <div className="booking-summary-divider" />

                <div className="booking-price-row">
                  <span>Ticket Price</span>
                  <strong>₹150</strong>
                </div>

                <p className="booking-price-note">
                  Final ticket price will be
                  calculated after seat selection.
                </p>

                <button
                  type="button"
                  className="booking-continue"
                  onClick={continueToSeats}
                >
                  Continue to Seats →
                </button>

                <Link
                  to={`/movie/${movieId}`}
                  className="booking-back"
                >
                  ← Back to Movie
                </Link>
              </section>
            </aside>
          </div>
        </main>
      </main>
    </>
  );
}

export default Booking;