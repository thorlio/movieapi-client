import { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  movies,
  updateUser,
  setToken,
  onLogout,
}) => {
  const [updatedUser, setUpdatedUser] = useState({
    Username: user.Username,
    Email: user.Email,
    Birthday: user.Birthday
      ? new Date(user.Birthday).toISOString().split("T")[0]
      : "",
  });

  const [password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      return;
    }

    fetch(
      `https://ohmyflix-1cea4b4ad120.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          updateUser(data);
          setFavoriteMovies(
            movies.filter((m) => data.FavoriteMovies.includes(m._id))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user.Username, updateUser, movies]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to update your profile.");

    const updatedData = { ...updatedUser };
    if (password) updatedData.Password = password; // Only update password if changed

    try {
      const response = await fetch(
        `https://ohmyflix-1cea4b4ad120.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      alert("Profile updated successfully!");
      updateUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete your account.");
      return;
    }

    try {
      const response = await fetch(
        `https://ohmyflix-1cea4b4ad120.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete request failed:", response.status, errorText);
        throw new Error(`Error! Status: ${response.status}`);
      }

      alert("Account deleted successfully!");

      onLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account. Please try again.");
    }
  };

  const removeFavorite = async (movieId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://ohmyflix-1cea4b4ad120.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Error removing favorite movie.");

      const updatedFavorites = favoriteMovies.filter((m) => m._id !== movieId);
      setFavoriteMovies(updatedFavorites);
      alert("Movie removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Error removing favorite movie.");
    }
  };

  return (
    <Card className="p-3">
      <Card.Body>
        <Card.Title>Profile Information</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {user.Username}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {user.Email}
        </Card.Text>
        <Card.Text>
          <strong>Birthday:</strong>{" "}
          {user.Birthday
            ? new Date(user.Birthday).toISOString().split("T")[0]
            : "N/A"}
        </Card.Text>

        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Update Username</Form.Label>
            <Form.Control
              type="text"
              value={updatedUser.Username}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, Username: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Update Email</Form.Label>
            <Form.Control
              type="email"
              value={updatedUser.Email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, Email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Update Birthday</Form.Label>
            <Form.Control
              type="date"
              value={updatedUser.Birthday}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, Birthday: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Update Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>

        <Button className="mt-3" variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </Card.Body>

      <Card.Body>
        <Card.Title>Favorite Movies</Card.Title>
        <Row>
          {favoriteMovies.length === 0 ? (
            <Col>No favorite movies added yet.</Col>
          ) : (
            favoriteMovies.map((movie) => (
              <Col key={movie._id} md={3}>
                <MovieCard movie={movie} />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFavorite(movie._id)}
                >
                  Remove
                </Button>
              </Col>
            ))
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};
