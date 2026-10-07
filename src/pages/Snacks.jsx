import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import Navbar from "../components/Navbar";


/* =========================
   SNACK DATA
========================= */

const snacks = [
  {
    id: 1,
    name: "Classic Popcorn",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Cheese Popcorn",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1629813743022-dc3a0f4a5e9c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Caramel Popcorn",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1578849278619-1f7d9d8e4e3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Coca-Cola",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Pepsi",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Fresh Lemon Soda",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "French Fries",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Cheese Nachos",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Veg Sandwich",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Chicken Burger",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Veg Burger",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Chocolate Brownie",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 13,
    name: "Chocolate Cake",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    name: "Ice Cream",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    name: "Samosa",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    name: "Veg Puff",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 17,
    name: "Masala Sandwich",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80",
  },
];


function Snacks() {
  const { movieId } = useParams();

  const location = useLocation();

  const navigate = useNavigate();


  /* =========================
     BOOKING DATA
  ========================= */

  const booking = location.state;

  const movie = booking?.movie;

  const theater = booking?.theater;

  const date = booking?.date;

  const time = booking?.time;

  const seats = booking?.seats || [];

  const seatTotal =
    booking?.seatTotal || 0;


  /* =========================
     SNACK CART
  ========================= */

  const [cart, setCart] = useState({});


  /* =========================
     ADD SNACK
  ========================= */

  function addSnack(snack) {

    setCart(function (oldCart) {

      const currentQuantity =
        oldCart[snack.id] || 0;

      return {
        ...oldCart,

        [snack.id]:
          currentQuantity + 1,
      };
    });
  }


  /* =========================
     REMOVE SNACK
  ========================= */

  function removeSnack(snack) {

    setCart(function (oldCart) {

      const currentQuantity =
        oldCart[snack.id] || 0;

      if (currentQuantity <= 1) {

        const newCart = {
          ...oldCart,
        };

        delete newCart[snack.id];

        return newCart;
      }

      return {
        ...oldCart,

        [snack.id]:
          currentQuantity - 1,
      };
    });
  }


  /* =========================
     SNACK TOTAL
  ========================= */

  function getSnackTotal() {

    let total = 0;

    snacks.forEach(function (snack) {

      const quantity =
        cart[snack.id] || 0;

      total +=
        snack.price * quantity;
    });

    return total;
  }


  /* =========================
     SNACK COUNT
  ========================= */

  function getSnackCount() {

    let count = 0;

    Object.values(cart).forEach(
      function (quantity) {
        count += quantity;
      }
    );

    return count;
  }


  const snackTotal =
    getSnackTotal();


  const snackCount =
    getSnackCount();


  const grandTotal =
    seatTotal + snackTotal;


  /* =========================
     CONTINUE TO CHECKOUT
  ========================= */

  function handleCheckout() {

    navigate(
      `/booking/${movieId}/checkout`,
      {
        state: {
          movie: movie,
          theater: theater,
          date: date,
          time: time,
          seats: seats,
          seatTotal: seatTotal,
          snacks: cart,
          snackTotal: snackTotal,
          snackCount: snackCount,
          grandTotal: grandTotal,
        },
      }
    );
  }


  /* =========================
     SKIP SNACKS
  ========================= */

  function handleSkip() {

    navigate(
      `/booking/${movieId}/checkout`,
      {
        state: {
          movie: movie,
          theater: theater,
          date: date,
          time: time,
          seats: seats,
          seatTotal: seatTotal,
          snacks: {},
          snackTotal: 0,
          snackCount: 0,
          grandTotal: seatTotal,
        },
      }
    );
  }


  /* =========================
     PROTECTION
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
            theater, showtime and seats first.
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
     PAGE
  ========================= */

  return (
    <>
      <Navbar />

      <main className="snacks-page">


        {/* HEADER */}

        <section className="snacks-header">

          <p className="snacks-label">
            🍿 CINEBOOK ADD-ONS
          </p>

          <h1>
            Make Your Movie
            <br />
            Experience Better
          </h1>

          <p>
            Add your favorite snacks before
            checking out.
          </p>

        </section>


        {/* BOOKING INFO */}

        <section className="snacks-booking-info">

          <div>

            <span>
              MOVIE
            </span>

            <strong>
              {movie?.title}
            </strong>

          </div>


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
              SHOW
            </span>

            <strong>
              {date} • {time}
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

        </section>


        {/* SNACK TITLE */}

        <section className="snacks-section">

          <div className="snacks-section-heading">

            <div>

              <p>
                🍿 FOOD & DRINKS
              </p>

              <h2>
                Choose Your Snacks
              </h2>

            </div>

            <span>
              {snackCount} item(s)
            </span>

          </div>


          {/* SNACK GRID */}

          <div className="snacks-grid">

            {snacks.map(
              function (snack) {

                const quantity =
                  cart[snack.id] || 0;

                return (
                  <div
                    className="snack-card"
                    key={snack.id}
                  >

                    <div className="snack-image">

                      <img
                        src={snack.image}
                        alt={snack.name}
                      />

                    </div>


                    <div className="snack-info">

                      <h3>
                        {snack.name}
                      </h3>

                      <p>
                        ₹{snack.price}
                      </p>


                      {quantity === 0 ? (

                        <button
                          className="add-snack-button"
                          onClick={
                            function () {
                              addSnack(
                                snack
                              );
                            }
                          }
                        >
                          + Add
                        </button>

                      ) : (

                        <div className="snack-quantity">

                          <button
                            onClick={
                              function () {
                                removeSnack(
                                  snack
                                );
                              }
                            }
                          >
                            −
                          </button>

                          <span>
                            {quantity}
                          </span>

                          <button
                            onClick={
                              function () {
                                addSnack(
                                  snack
                                );
                              }
                            }
                          >
                            +
                          </button>

                        </div>

                      )}

                    </div>

                  </div>
                );

              }
            )}

          </div>

        </section>


        {/* BOTTOM SUMMARY */}

        <section className="snacks-bottom">

          <div>

            <span>
              SEATS
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


          <div className="snacks-grand-total">

            <span>
              TOTAL
            </span>

            <strong>
              ₹{grandTotal}
            </strong>

          </div>


          <button
            className="snacks-checkout-button"
            onClick={
              handleCheckout
            }
          >
            Continue to Checkout →
          </button>


          <button
            className="skip-snacks-button"
            onClick={
              handleSkip
            }
          >
            Skip Snacks
          </button>

        </section>

      </main>
    </>
  );
}

export default Snacks;