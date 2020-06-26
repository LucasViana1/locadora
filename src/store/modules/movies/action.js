export function requestMovies(data) {
  return {
    type: '@movie/REQUEST_MOVIES',
    payload: {
      data,
    },
  };
}
export function newMovie(movie) {
  return {
    type: '@movie/NEW',
    payload: {
      movie,
    },
  };
}
export function deleteMovie(id) {
  return {
    type: '@movie/DELETE',
    payload: {
      id,
    },
  };
}
export function formError(error) {
  return {
    type: '@movie/FORM_ERROR',
    payload: {
      error,
    },
  };
}
