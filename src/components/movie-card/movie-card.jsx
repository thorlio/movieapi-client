import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      onClick={() => onMovieClick(movie)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        {/* <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button> */}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
