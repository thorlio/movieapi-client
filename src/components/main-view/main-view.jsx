import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // useEffect(() => {
  //   if (!token) return;

  //   fetch("https://ohmyflix-1cea4b4ad120.herokuapp.com/movies", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((movies) => {
  //       setMovies(movies);
  //     })
  //     .catch((error) => console.error("Error fetching movies:", error));
  // }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch("https://ohmyflix-1cea4b4ad120.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesWithImages = movies.map((movie) => ({
          id: movie._id,
          title: movie.title,
          director: movie.director,
          genre: movie.genre,
          description: movie.description,
          dateReleased: movie.dateReleased,
          imagePath: movie.imagePath || "https://via.placeholder.com/300", // ✅ Ensure consistency
        }));

        setMovies(moviesWithImages);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
          <h3> Or Signup Below </h3>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Row className="justify-content-md-center">
          <Col md={8} style={{ border: "1px solid blue" }}>
            <MovieView
              style={{ border: "1px solid green" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </Row>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </div>

          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

//   if (!user) {
//     return (
//       <>
//         <LoginView
//           onLoggedIn={(user, token) => {
//             setUser(user);
//             setToken(token);
//           }}
//         />
//         <h3> Or Signup Below </h3>
//         <SignupView />
//       </>
//     );
//   }

//   if (selectedMovie) {
//     return (
//       <MovieView
//         movie={selectedMovie}
//         onBackClick={() => setSelectedMovie(null)}
//       />
//     );
//   }

//   if (movies.length === 0) {
//     return <div>The list is empty!</div>;
//   }

//   return (
//     <div>
//       <button
//         onClick={() => {
//           setUser(null);
//           setToken(null);
//           localStorage.clear();
//         }}
//       >
//         Logout
//       </button>
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie._id}
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       ))}
//     </div>
//   );
// };
