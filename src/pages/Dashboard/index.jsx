import React, { useEffect, useState } from 'react';
import './styles.scss';

import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { requestMovies } from '../../store/modules/movies/action';

import Film from '../../components/Film';
import { MdMoodBad } from 'react-icons/md';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const [noRegistry, setNoRegistry] = useState(false);

  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    api
      .get('movies')
      .then((response) => {
        dispatch(requestMovies(response.data));
      })
      .catch((error) => setNoRegistry(true));
  }, [dispatch]);

  return (
    <>
      <section className="dashboard">
        <h1>Catálogo de filmes</h1>

        <article className="dashboard__container">
          {movies.length !== 0 &&
            movies.map((movie) => <Film key={movie.id} film={movie} />)}

          {noRegistry && (
            <span className="dashboard__alert">
              Nenhum filme encontrado!{' '}
              <MdMoodBad className="dashboard__alert--icon" />
            </span>
          )}
        </article>
      </section>
      {!noRegistry && movies.length === 0 && <Loading size={100} back />}
    </>
  );
};

export default Dashboard;
