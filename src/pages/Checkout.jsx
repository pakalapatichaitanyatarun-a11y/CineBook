import { Link, useLocation, useNavigate, useParams } from "react-router";

import Navbar from "../components/Navbar";


/* =========================
   SNACK DATA
========================= */

const snackList = [
  {
    id: 1,
    name: "Classic Popcorn",
    price: 150,
  },
  {
    id: 2,
    name: "Cheese Popcorn",
    price: 180,
  },
  {
    id: 3,
    name: "Caramel Popcorn",
    price: 180,
  },
  {
    id: 4,
    name: "Coca-Cola",
    price: 100,
  },
  {
    id: 5,
    name: "Pepsi",
    price: 100,
  },
  {
    id: 6,
    name: "Fresh Lemon Soda",
    price: 120,
  },
  {
    id: 7,
    name: "French Fries",
    price: 120,
  },
  {
    id: 8,
    name: "Cheese Nachos",
    price: 180,
  },
  {
    id: 9,
    name: "Veg Sandwich",
    price: 150,
  },
  {
    id: 10,
    name: "Chicken Burger",
    price: 220,
  },
  {
    id: 11,
    name: "Veg Burger",
    price: 190,
  },
  {
    id: 12,
    name: "Chocolate Brownie",
    price: 140,
  },
  {
    id: 13,
    name: "Chocolate Cake",
    price: 160,
  },
  {
    id: 14,
    name: "Ice Cream",
    price: 120,
  },
  {
    id: 15,
    name: "Samosa",
    price: 80,
  },
  {
    id: 16,
    name: "Veg Puff",
    price: 80,
  },
  {
    id: 17,
    name: "Masala Sandwich",
    price: 130,
  },
];


function Checkout() {
  const { movieId } = useParams();

  const location = useLocation();

  const navigate = useNavigate();


  /* =========================
     BOOKING DATA
  ========================= */

  const booking = location.state;


  if (!booking) {
    return (
      <>
        <Navbar />

        <main className="not-found">

          <h2>
            Booking Information Missing
          </h2>

          <p>
            Please complete your booking
            from the beginning.
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


  const movie = booking.movie;

  const theater = booking.theater;

  const date = booking.date;

  const time = booking.time;

  const seats = booking.seats || [];

  const seatTotal =
    booking.seatTotal || 0;

  const snacks =
    booking.snacks || {};

  const snackTotal =
    booking.snackTotal || 0;

  const grandTotal =
    booking.grandTotal || 0;


  /* =========================
     GET SELECTED SNACKS
  ========================= */

  const selectedSnacks =
    snackList.filter(function (snack) {

      return snacks[snack.id] > 0;

    });


  /* =========================
     CONFIRM BOOKING
  ========================= */

  function handleConfirmBooking() {

    const bookingId =
      "CB" +
      Date.now()
        .toString()
        .slice(-8);


    navigate(
      `/booking/${movieId}/ticket`,
      {
        state: {
          movie: movie,
          theater: theater,
          date: date,
          time: time,
          seats: seats,
          seatTotal: seatTotal,
          snacks: snacks,
          snackTotal: snackTotal,
          grandTotal: grandTotal,
          bookingId: bookingId,
        },
      }
    );
  }


  return (
    <>
      <Navbar />

      <main className="checkout-page">


        {/* =========================
            HEADER
        ========================= */}

        <section className="checkout-header">

          <p className="checkout-label">
            💳 CINEBOOK CHECKOUT
          </p>

          <h1>
            Review Your Booking
          </h1>

          <p>
            Check all the details before
            confirming your tickets.
          </p>

        </section>


        {/* =========================
            MOVIE SUMMARY
        ========================= */}

        <section className="checkout-card">

          <div className="checkout-card-title">

            <span>
              🎬
            </span>

            <div>

              <h2>
                Movie Details
              </h2>

              <p>
                Your selected movie and show.
              </p>

            </div>

          </div>


          <div className="checkout-movie">

            <div>

              <p>
                MOVIE
              </p>

              <h3>
                {movie?.title}
              </h3>

            </div>


            <div>

              <p>
                THEATER
              </p>

              <h3>
                {theater}
              </h3>

            </div>


            <div>

              <p>
                DATE
              </p>

              <h3>
                {date}
              </h3>

            </div>


            <div>

              <p>
                SHOWTIME
              </p>

              <h3>
                {time}
              </h3>

            </div>

          </div>

        </section>


        {/* =========================
            SEATS
        ========================= */}

        <section className="checkout-card">

          <div className="checkout-card-title">

            <span>
              💺
            </span>

            <div>

              <h2>
                Selected Seats
              </h2>

              <p>
                Your confirmed seats.
              </p>

            </div>

          </div>


          <div className="checkout-seats">

            {seats.map(
              function (seat) {

                return (
                  <span key={seat}>
                    {seat}
                  </span>
                );

              }
            )}

          </div>


          <div className="checkout-price-row">

            <span>
              {seats.length} seat(s)
            </span>

            <strong>
              ₹{seatTotal}
            </strong>

          </div>

        </section>


        {/* =========================
            SNACKS
        ========================= */}

        <section className="checkout-card">

          <div className="checkout-card-title">

            <span>
              🍿
            </span>

            <div>

              <h2>
                Snacks & Add-ons
              </h2>

              <p>
                Food and drinks added to
                your booking.
              </p>

            </div>

          </div>


          {selectedSnacks.length > 0 ? (

            <div className="checkout-snacks">

              {selectedSnacks.map(
                function (snack) {

                  const quantity =
                    snacks[snack.id];

                  const itemTotal =
                    snack.price *
                    quantity;

                  return (
                    <div
                      className="checkout-snack-row"
                      key={snack.id}
                    >

                      <div>

                        <h3>
                          {snack.name}
                        </h3>

                        <span>
                          ₹{snack.price}
                          {" "}×{" "}
                          {quantity}
                        </span>

                      </div>

                      <strong>
                        ₹{itemTotal}
                      </strong>

                    </div>
                  );

                }
              )}

            </div>

          ) : (

            <div className="no-snacks">

              <span>
                🍿
              </span>

              <p>
                No snacks added.
              </p>

            </div>

          )}


          <div className="checkout-price-row">

            <span>
              Snacks Total
            </span>

            <strong>
              ₹{snackTotal}
            </strong>

          </div>

        </section>


        {/* =========================
            TOTAL
        ========================= */}

        <section className="checkout-total">

          <div>

            <span>
              TICKETS
            </span>

            <strong>
              ₹{seatTotal}
            </strong>

          </div>


          <div>

            <span>
              SNACKS
            </span>

            <strong>
              ₹{snackTotal}
            </strong>

          </div>


          <div className="grand-total">

            <span>
              TOTAL AMOUNT
            </span>

            <strong>
              ₹{grandTotal}
            </strong>

          </div>

        </section>


        {/* =========================
            PAYMENT
        ========================= */}

        <section className="checkout-payment">

          <div>

            <p>
              🔒 SECURE CHECKOUT
            </p>

            <h2>
              Ready to confirm?
            </h2>

            <span>
              Your booking details are ready.
            </span>

          </div>


          <button
            className="confirm-payment-button"
            onClick={
              handleConfirmBooking
            }
          >
            Confirm & Pay ₹{grandTotal}
          </button>

        </section>


      </main>
    </>
  );
}

export default Checkout;