import React, { useEffect, useState } from 'react';
import './styles.scss';

import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { requestMovies } from '../../store/modules/movies/action';

import Film from '../../components/Film';
import { MdMoodBad } from 'react-icons/md';

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
      <h1>Catálogo de filmes</h1>

      <article className="dashboard__container">
        {movies.length !== 0 ? (
          movies.map((movie) => <Film key={movie.id} film={movie} />)
        ) : (
          <span className="dashboard__alert">
            Nenhum filme encontrado!{' '}
            <MdMoodBad className="dashboard__alert--icon" />
          </span>
        )}
        {console.log('movies')}
        {console.log(movies)}
      </article>
    </section>
  );
};

export default Dashboard;
