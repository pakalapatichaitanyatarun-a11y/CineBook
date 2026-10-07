import { useLocation, useNavigate } from "react-router";
import { QRCodeSVG } from "qrcode.react";

import Navbar from "../components/Navbar";


function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;


  /* =========================
     BOOKING PROTECTION
  ========================= */

  if (!booking) {
    return (
      <>
        <Navbar />

        <main className="not-found">

          <h2>
            Ticket Not Found
          </h2>

          <p>
            Your booking information
            could not be found.
          </p>

          <button
            className="details-book-button"
            onClick={function () {
              navigate("/");
            }}
          >
            ← Back to Home
          </button>

        </main>
      </>
    );
  }


  /* =========================
     BOOKING DATA
  ========================= */

  const movie = booking.movie;

  const theater = booking.theater;

  const date = booking.date;

  const time = booking.time;

  const seats = booking.seats || [];

  const seatTotal =
    booking.seatTotal || 0;

  const snackTotal =
    booking.snackTotal || 0;

  const grandTotal =
    booking.grandTotal || 0;

  const bookingId =
    booking.bookingId ||
    "CB00000000";


  /* =========================
     QR DATA
  ========================= */

  const qrData =
    `CINEBOOK TICKET\n` +
    `Booking ID: ${bookingId}\n` +
    `Movie: ${movie?.title}\n` +
    `Theater: ${theater}\n` +
    `Date: ${date}\n` +
    `Time: ${time}\n` +
    `Seats: ${seats.join(", ")}\n` +
    `Total: ₹${grandTotal}`;


  /* =========================
     PRINT
  ========================= */

  function handlePrint() {
    window.print();
  }


  /* =========================
     SHARE
  ========================= */

  function handleShare() {

    const shareText =
      `CineBook Ticket\n\n` +
      `Movie: ${movie?.title}\n` +
      `Theater: ${theater}\n` +
      `Date: ${date}\n` +
      `Time: ${time}\n` +
      `Seats: ${seats.join(", ")}\n` +
      `Booking ID: ${bookingId}\n` +
      `Total: ₹${grandTotal}`;

    if (navigator.share) {

      navigator.share({
        title:
          "CineBook Movie Ticket",
        text:
          shareText,
      });

    } else {

      navigator.clipboard.writeText(
        shareText
      );

      alert(
        "Ticket details copied to clipboard."
      );
    }
  }


  /* =========================
     TICKET
  ========================= */

  return (
    <>
      <Navbar />

      <main className="ticket-page">


        {/* =========================
            SUCCESS
        ========================= */}

        <section className="ticket-success">

          <div className="success-icon">
            ✓
          </div>

          <p>
            BOOKING CONFIRMED
          </p>

          <h1>
            Enjoy Your Movie! 🍿
          </h1>

          <span>
            Your tickets have been booked
            successfully.
          </span>

        </section>


        {/* =========================
            MOVIE TICKET
        ========================= */}

        <section
          className="movie-ticket"
          id="movie-ticket"
        >


          {/* TICKET HEADER */}

          <div className="ticket-top">

            <div>

              <p className="ticket-brand">
                CINEBOOK
              </p>

              <h2>
                MOVIE TICKET
              </h2>

            </div>


            <div className="ticket-booking-id">

              <span>
                BOOKING ID
              </span>

              <strong>
                {bookingId}
              </strong>

            </div>

          </div>


          {/* MOVIE */}

          <div className="ticket-movie">

            <p>
              MOVIE
            </p>

            <h1>
              {movie?.title}
            </h1>

          </div>


          {/* DETAILS */}

          <div className="ticket-details">

            <div>

              <span>
                THEATER
              </span>

              <strong>
                {theater}
              </strong>

            </div>


            <div>

              <span>
                DATE
              </span>

              <strong>
                {date}
              </strong>

            </div>


            <div>

              <span>
                SHOWTIME
              </span>

              <strong>
                {time}
              </strong>

            </div>


            <div>

              <span>
                SEATS
              </span>

              <strong>
                {seats.join(", ")}
              </strong>

            </div>

          </div>


          {/* TICKET PRICE */}

          <div className="ticket-price-row">

            <span>
              Ticket Amount
            </span>

            <strong>
              ₹{seatTotal}
            </strong>

          </div>


          {/* SNACK PRICE */}

          <div className="ticket-price-row">

            <span>
              Snacks & Add-ons
            </span>

            <strong>
              ₹{snackTotal}
            </strong>

          </div>


          {/* TOTAL */}

          <div className="ticket-total">

            <span>
              TOTAL PAID
            </span>

            <strong>
              ₹{grandTotal}
            </strong>

          </div>


          {/* =========================
              REAL QR CODE
          ========================= */}

          <div className="ticket-qr-section">

            <div className="qr-code">

              <QRCodeSVG
                value={qrData}
                size={180}
                bgColor="#ffffff"
                fgColor="#111111"
                level="M"
              />

            </div>


            <div className="qr-information">

              <p>
                SCAN AT THEATER
              </p>

              <strong>
                {bookingId}
              </strong>

              <span>
                Scan this QR code to
                view the booking details.
              </span>

            </div>

          </div>


          {/* FOOTER */}

          <div className="ticket-footer">

            <span>
              Thank you for booking
              with CineBook.
            </span>

            <span>
              🎬 Enjoy the show!
            </span>

          </div>

        </section>


        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <section className="ticket-actions">

          <button
            className="print-ticket-button"
            onClick={handlePrint}
          >
            🖨️ Print Ticket
          </button>


          <button
            className="share-ticket-button"
            onClick={handleShare}
          >
            📤 Share Ticket
          </button>


          <button
            className="home-ticket-button"
            onClick={function () {
              navigate("/");
            }}
          >
            ← Back to Home
          </button>

        </section>


      </main>
    </>
  );
}


export default Ticket;