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
      console.log('state - action delete');
      console.log(state);
      console.log(action);
      newMovies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      console.log(newMovies);
      return { ...state, movies: newMovies };

    case '@movie/FORM_ERROR':
      console.log('state - action formerror');
      console.log(state);
      console.log(action);
      return { ...state, fieldError: action.payload.error };

    default:
      return state;
  }
};

export default movies;
