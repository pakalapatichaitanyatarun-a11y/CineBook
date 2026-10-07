function Hero() {

  return (

    <section
      className="hero"
      id="home"
    >

      <div className="hero-content">

        <p className="hero-label">
          CINEBOOK • KAKINADA
        </p>


        <h1>
          Your Movie.
          <br />
          Your Theater.
          <br />
          Your Experience.
        </h1>


        <p className="hero-description">

          Discover movies playing in Kakinada,
          choose your theater, check available movies,
          and book your favorite seats.

        </p>


        <div className="hero-buttons">

          <a
            href="#movies"
            className="primary-button"
          >
            Explore Movies
          </a>


          <a
            href="#theaters"
            className="secondary-button"
          >
            Find Theaters
          </a>

        </div>

      </div>


      <div className="hero-card">

        <div className="hero-card-icon">
          🎟️
        </div>

        <h3>
          Easy Movie Booking
        </h3>

        <p>
          Movies • Theaters • Shows • Seats
        </p>

      </div>

    </section>

  );

}

export default Hero;