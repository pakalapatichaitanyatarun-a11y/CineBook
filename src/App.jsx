import {
  Routes,
  Route,
} from "react-router";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import SeatSelection from "./pages/SeatSelection";
import Snacks from "./pages/Snacks";
import Checkout from "./pages/Checkout";
import Ticket from "./pages/Ticket";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* MOVIE DETAILS */}

      <Route
        path="/movie/:movieId"
        element={<MovieDetails />}
      />


      {/* BOOKING */}

      <Route
        path="/booking/:movieId"
        element={<Booking />}
      />


      {/* SEAT SELECTION */}

      <Route
        path="/booking/:movieId/seats"
        element={<SeatSelection />}
      />


      {/* SNACKS */}

      <Route
        path="/booking/:movieId/snacks"
        element={<Snacks />}
      />


      {/* CHECKOUT */}

      <Route
        path="/booking/:movieId/checkout"
        element={<Checkout />}
      />


      {/* TICKET */}

      <Route
        path="/booking/:movieId/ticket"
        element={<Ticket />}
      />


      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}


export default App;