import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import Navbar from "../components/Navbar";

function SeatSelection() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  /*
    Data received from Booking.jsx
  */

  const booking = location.state;

  const movie = booking?.movie;
  const theater = booking?.theater;
  const date = booking?.date;
  const time = booking?.time;


  /* =========================
     SEAT DATA
  ========================= */

  const rows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ];

  const seatsPerRow = 10;

  const seatPrice = 150;


  /* =========================
     ALREADY BOOKED SEATS
  ========================= */

  const bookedSeats = [
    "A3",
    "A7",
    "B2",
    "B8",
    "C5",
    "D4",
    "D9",
    "E1",
    "E6",
    "F3",
    "G7",
    "H2",
    "H9",
    "I5",
    "J8",
  ];


  /* =========================
     SELECTED SEATS
  ========================= */

  const [selectedSeats, setSelectedSeats] =
    useState([]);


  /* =========================
     SELECT / UNSELECT SEAT
  ========================= */

  function handleSeatClick(seat) {

    if (
      bookedSeats.includes(seat)
    ) {
      return;
    }


    if (
      selectedSeats.includes(seat)
    ) {

      setSelectedSeats(
        selectedSeats.filter(
          function (selectedSeat) {
            return selectedSeat !== seat;
          }
        )
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);

    }
  }


  /* =========================
     TOTAL
  ========================= */

  const total =
    selectedSeats.length *
    seatPrice;


  /* =========================
     CONFIRM SEATS
  ========================= */

  function handleConfirmSeats() {

    if (
      selectedSeats.length === 0
    ) {

      alert(
        "Please select at least one seat."
      );

      return;
    }


    /*
      Send booking information
      to Snacks page.
    */

    navigate(
      `/booking/${movieId}/snacks`,
      {
        state: {
          movie: movie,
          theater: theater,
          date: date,
          time: time,
          seats: selectedSeats,
          seatPrice: seatPrice,
          seatTotal: total,
        },
      }
    );
  }


  /* =========================
     DIRECT ACCESS PROTECTION
  ========================= */

  if (!booking) {

    return (
      <>
        <Navbar />

        <main className="not-found">

          <h2>
            Booking Information Missing
          </h2>

          <p>
            Please select your movie,
            theater and showtime first.
          </p>

          <Link
            to="/"
            className="details-book-button"
          >
            ← Back to Home
          </Link>

        </main>
      </>
    );
  }


  /* =========================
     SEAT PAGE
  ========================= */

  return (
    <>
      <Navbar />

      <main className="seat-page">


        {/* =========================
            HEADER
        ========================= */}

        <section className="seat-header">

          <p className="seat-label">
            🎟️ SELECT YOUR SEATS
          </p>

          <h1>
            Choose Your Seats
          </h1>

          <p>
            Select the seats you want to
            book for your movie.
          </p>

        </section>


        {/* =========================
            MOVIE INFO
        ========================= */}

        <section className="seat-booking-info">

          <div>

            <span>
              MOVIE
            </span>

            <h3>
              {movie?.title}
            </h3>

          </div>


          <div>

            <span>
              THEATER
            </span>

            <h3>
              {theater}
            </h3>

          </div>


          <div>

            <span>
              DATE
            </span>

            <h3>
              {date}
            </h3>

          </div>


          <div>

            <span>
              SHOWTIME
            </span>

            <h3>
              {time}
            </h3>

          </div>

        </section>


        {/* =========================
            SCREEN
        ========================= */}

        <section className="cinema-layout">

          <div className="cinema-screen">

            <div className="screen-line"></div>

            <p>
              SCREEN THIS WAY
            </p>

          </div>


          {/* =========================
              SEAT LEGEND
          ========================= */}

          <div className="seat-legend">

            <div>

              <span className="legend-box available"></span>

              <p>
                Available
              </p>

            </div>


            <div>

              <span className="legend-box selected"></span>

              <p>
                Selected
              </p>

            </div>


            <div>

              <span className="legend-box booked"></span>

              <p>
                Booked
              </p>

            </div>

          </div>


          {/* =========================
              SEATS
          ========================= */}

          <div className="seat-container">

            {rows.map(
              function (row) {

                return (
                  <div
                    className="seat-row"
                    key={row}
                  >

                    {/* ROW LABEL */}

                    <span className="row-label">
                      {row}
                    </span>


                    {/* SEATS */}

                    <div className="seat-list">

                      {Array.from(
                        {
                          length:
                            seatsPerRow,
                        }
                      ).map(
                        function (_, index) {

                          const seatNumber =
                            index + 1;

                          const seat =
                            `${row}${seatNumber}`;

                          const isBooked =
                            bookedSeats.includes(
                              seat
                            );

                          const isSelected =
                            selectedSeats.includes(
                              seat
                            );


                          return (
                            <button
                              key={seat}
                              className={
                                isBooked
                                  ? "seat booked"
                                  : isSelected
                                  ? "seat selected"
                                  : "seat available"
                              }
                              onClick={
                                function () {
                                  handleSeatClick(
                                    seat
                                  );
                                }
                              }
                              disabled={
                                isBooked
                              }
                            >
                              {seatNumber}
                            </button>
                          );

                        }
                      )}

                    </div>

                  </div>
                );

              }
            )}

          </div>

        </section>


        {/* =========================
            SELECTED SEATS
        ========================= */}

        <section className="selected-seats-section">

          <div>

            <p>
              SELECTED SEATS
            </p>

            {selectedSeats.length > 0 ? (

              <div className="selected-seat-list">

                {selectedSeats.map(
                  function (seat) {

                    return (
                      <span key={seat}>
                        {seat}
                      </span>
                    );

                  }
                )}

              </div>

            ) : (

              <h3>
                No seats selected
              </h3>

            )}

          </div>


          {/* =========================
              PRICE
          ========================= */}

          <div className="seat-price">

            <p>
              {selectedSeats.length}
              {" "}Seat(s)
            </p>

            <h2>
              ₹{total}
            </h2>

            <span>
              ₹{seatPrice} per seat
            </span>

          </div>

        </section>


        {/* =========================
            CONFIRM BUTTON
        ========================= */}

        <section className="seat-confirm-section">

          <button
            className="confirm-seats-button"
            onClick={
              handleConfirmSeats
            }
          >
            Confirm Seats →
          </button>

        </section>

      </main>
    </>
  );
}

export default SeatSelection;