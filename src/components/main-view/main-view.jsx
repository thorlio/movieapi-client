import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  useEffect(() => {
    if (!token) return;

    fetch("https://ohmyflix-1cea4b4ad120.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
          title: movie.title,
          director: movie.director,
          genre: movie.genre,
          description: movie.description,
          dateReleased: movie.dateReleased,
          imagePath: movie.imagePath || "https://via.placeholder.com/300",
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLogOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              !user ? (
                <Col xs={12} sm={6} md={3} className="text-center">
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  movies={movies}
                  updateUser={setUser}
                  setToken={setToken}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/signup"
            element={
              !user ? (
                <Col md={5}>
                  <SignupView />
                </Col>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              user ? (
                movies.length > 0 ? (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      updateUser={setUser}
                    />
                  </Col>
                ) : (
                  <Col>The list is empty!</Col>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/"
            element={
              user ? (
                movies.length > 0 ? (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                ) : (
                  <Col>The list is empty!</Col>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
