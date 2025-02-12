import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const data = {
  //     Username: username,
  //     Password: password,
  //   };

  //   fetch("https://ohmyflix-1cea4b4ad120.herokuapp.com/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Login response: ", data);
  //       if (data.user) {
  //         onLoggedIn(data.user, data.token);
  //       } else {
  //         alert("No such user");
  //       }
  //     })
  //     .catch((e) => {
  //       alert("Something went wrong");
  //     });
  // };

  //test code for debugging
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username, // ✅ Capitalized to match backend
      Password: password,
    };

    console.log("🔍 Sending login data:", data); // 🛠 Debugging step

    fetch("https://ohmyflix-1cea4b4ad120.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const responseData = await response.json();
        console.log("🔍 Login response:", responseData); // 🔍 See what the backend sends

        if (!response.ok) {
          console.error("❌ Error:", responseData);
          alert(responseData.error || "Something went wrong");
          return;
        }

        if (responseData.user) {
          onLoggedIn(responseData.user, responseData.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error("❌ Fetch error:", e);
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
