const INITIAL_STATE = {
  movies: [],
  fieldError: false,
};

let newMovies;

const movies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@movie/REQUEST_MOVIES':
      return {
        ...state,
        movies: action.payload.data,
      };
    case '@movie/NEW':
      newMovies = [...state.movies, action.payload.movie];
      return {
        ...state,
        movies: newMovies,
      };

    case '@movie/DELETE':
      newMovies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state, movies: newMovies
      };

    case '@movie/FORM_ERROR':
      return {
        ...state, fieldError: action.payload.error
      };

    default:
      return state;
  }
};

export default movies;
