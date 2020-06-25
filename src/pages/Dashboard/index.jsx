import React, { useEffect, useState } from 'react';
import './styles.scss';

import Film from '../../components/Film';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { requestMovies } from '../../store/modules/movies/action';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    api.get('movies').then((response) => {
      console.log(response.data);
      dispatch(requestMovies(response.data));
    });
  }, [dispatch]);

  return (
    <section className="dashboard">
      <h1>Catalogo de filmes</h1>

      <article className="dashboard__container">
        {movies && movies.map((movie) => <Film key={movie.id} film={movie} />)}
      </article>
    </section>
  );
};

export default Dashboard;
