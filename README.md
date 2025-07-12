# myFlix React Client

This is the frontend for the **myFlix** movie app, built with **React**. It allows users to browse movies, view details, and manage their profiles. It connects to the [myFlix API](https://ohmyflix-1cea4b4ad120.herokuapp.com/) for data.

## Features

- User registration and login
- Browse a list of movies
- View details about a movie, director, or genre
- Add/remove movies from a list of favorites
- Update or delete user profile
- Search/filter movies by title
- Responsive design using React Bootstrap

## Technologies Used

- React
- React Router
- React Bootstrap
- Parcel
- JavaScript (ES6+)
- JSX
- SCSS
- Heroku (for backend API deployment)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/thorlio/movieapi-client.git
   cd movieapi-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser to:
   ```
   http://localhost:1234
   ```

> Note: Parcel is used as the bundler and automatically handles hot reloading and builds.

## Build

To build the app for production:

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## Deployment

You can deploy this project using:

- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- Or any static file host

## API Endpoint

This app connects to the deployed API at:

```
https://ohmyflix-1cea4b4ad120.herokuapp.com/
```

> Make sure the API is live when testing login or movie fetching.

## Project Structure

```
src/
  └── components/
        ├── login-view
        ├── signup-view
        ├── main-view
        ├── movie-card
        ├── movie-view
        ├── profile-view
        └── navigation-bar
```
