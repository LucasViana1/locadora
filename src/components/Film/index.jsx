import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import imageNotFound from '../../assets/film_not_found.png';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../../store/modules/movies/action';

const Film = ({ film }) => {
  const dispatch = useDispatch();

  function handleDelete() {
    if (
      window.confirm(`Tem certeza que deseja excluir o filme ${film.title}`)
    ) {
      api.delete(`movies/${film.id}`).then((response) => {
        dispatch(deleteMovie(film.id));
        toast.warning('Filme excluído com sucesso!');
      });
    }
  }

  return (
    <div className="catalog">
      <section className="catalog__container">
        <header className="catalog__cover">
          <img src={film.image || imageNotFound} alt={film.title} />

          <div class="catalog__cover--hover">
            <h4>{film.title}</h4>
          </div>
        </header>

        <div className="catalog__information">
          <h3>{film.title}</h3>
          <p class="catalog__genre">
            <a href="#">{film.genre}</a>
          </p>
          <div className="catalog__actions">
            <Link to={`movie/${film.id}`} className="catalog__actions--edit">
              editar
            </Link>
            <a
              href="#"
              className="catalog__actions--delete"
              onClick={() => handleDelete()}
            >
              excluir
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Film;
