import { Link } from "react-router";

function Navbar() {
  return (
    <header className="cine-navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="cine-logo-link"
        >
          <img
            src="/cinebook-logo.png"
            alt="CineBook"
            className="cine-logo"
          />
        </Link>

        <nav className="cine-nav-links">

          <Link
            to="/"
            className="cine-nav-link"
          >
            Home
          </Link>

          <a
            href="/#movies"
            className="cine-nav-link"
          >
            Movies
          </a>

          <a
            href="/#theaters"
            className="cine-nav-link"
          >
            Theaters
          </a>

          <a
            href="/#now-showing"
            className="cine-nav-link"
          >
            Now Showing
          </a>

        </nav>

        <a
          href="/#now-showing"
          className="navbar-book-button"
        >
          Book Tickets
        </a>

      </div>

    </header>
  );
}

export default Navbar;