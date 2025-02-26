// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./movie-view.scss";

// export const MovieView = ({ movies }) => {
//   const { movieId } = useParams();

//   if (!movies || movies.length === 0) {
//     return <div>Loading</div>;
//   }
//   const movie = movies.find((m) => m._id === decodeURIComponent(movieId));

//   if (!movie) {
//     return <div>Movie not found</div>;
//   }

//   return (
//     <div>
//       <Link to={`/`}>
//         <button className="back-button">Back</button>
//       </Link>
//       <div>
//         <img className="w-100" src={movie.imagePath} />
//       </div>
//       <div>
//         <span>Title: </span>
//         <span>{movie.title}</span>
//       </div>
//       <div>
//         <span>Director: </span>
//         <span>{movie.director}</span>
//       </div>
//       <div>
//         <span>Genre: </span>
//         <span>{movie.genre}</span>
//       </div>
//       <div>
//         <span>Description: </span>
//         <span>{movie.description}</span>
//       </div>
//       <div>
//         <span>Date Released: </span>
//         <span>{movie.dateReleased}</span>
//       </div>
//       <Link to={`/`}>
//         <button className="back-button">Back</button>
//       </Link>
//     </div>
//   );
// };

import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, updateUser }) => {
  const { movieId } = useParams();
  if (!movies || movies.length === 0) return <div>Loading...</div>;

  const movie = movies.find((m) => m._id === decodeURIComponent(movieId));
  if (!movie) return <div>Movie not found</div>;

  const isFavorite = user.FavoriteMovies.includes(movie._id);

  const handleFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://ohmyflix-1cea4b4ad120.herokuapp.com/users/${user.Username}/movies/${movie._id}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to update favorites");

      const updatedUser = await response.json();
      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(isFavorite ? "Removed from favorites!" : "Added to favorites!");
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Could not update favorites. Try again.");
    }
  };

  return (
    <div>
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>

      <div>
        <img className="w-100" src={movie.imagePath} alt={movie.title} />
      </div>
      <div>
        <strong>Title:</strong> {movie.title}
      </div>
      <div>
        <strong>Director:</strong> {movie.director}
      </div>
      <div>
        <strong>Genre:</strong> {movie.genre}
      </div>
      <div>
        <strong>Description:</strong> {movie.description}
      </div>
      <div>
        <strong>Date Released:</strong> {movie.dateReleased}
      </div>

      <button className="back-button" onClick={handleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};
