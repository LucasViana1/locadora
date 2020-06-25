import React, { useState } from 'react';
import './styles.scss';

import imageNotFound from '../../assets/film_not_found.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../../store/modules/movies/action';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Film = ({ film }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  function handleDelete() {
    if (
      window.confirm(`Tem certeza que deseja excluir o filme ${film.title}`)
    ) {
      api.delete(`movies/${film.id}`).then((response) => {
        dispatch(deleteMovie(film.id));
        toast.warning('Filme excluído com sucesso!');
      });
      if (openModal) handleDetails();
    }
  }

  function handleDetails() {
    setOpenModal(!openModal);
  }

  return (
    <div className="catalog">
      <section className="catalog__container">
        <header className="catalog__cover" onClick={() => handleDetails()}>
          <img src={film.image || imageNotFound} alt={film.title} />

          <div className="catalog__cover--hover">
            <h4>{film.title}</h4>
          </div>
        </header>

        <div className="catalog__information">
          <h3>{film.title}</h3>
          <p className="catalog__genre">
            <a href="#">{film.genre}</a>
          </p>
          <div className="catalog__actions">
            <a
              href="#"
              className="catalog__actions--delete"
              onClick={() => handleDetails()}
            >
              detalhes
            </a>
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
      <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleDetails}
        style={customStyles}
        contentLabel="Detalhes"
        ariaHideApp={false}
      >
        <h2>detalhes do filme</h2>
        <section>
          <article>
            <p>Título do Filme - {film.title}</p>
            <p>Sinopse - {film.synopsis}</p>
            <p>Gênero - {film.genre}</p>
            <p>
              Data de lançamento (mostrar apenas o ano na tela de consulta) -{' '}
              {film.date || 'Não informado'}
            </p>
            <p> Idioma - {film.language}</p>
            <p>Legendado - {film.subtitled}</p>
            <p>Diretor - {film.director || 'Não informado'}</p>
            <p>Link no IMDB - {film.imdb || 'Não informado'}</p>
            <p>Avaliação do filme - {film.evaluation || 'Não informado'}</p>
          </article>
          <button type="button" onClick={() => handleDetails()}>
            fechar
          </button>
          <Link
            to={`movie/${film.id}`}
            type="button"
            onClick={() => handleDetails()}
          >
            editar
          </Link>
          <button type="button" onClick={() => handleDelete()}>
            excluir
          </button>
        </section>
      </Modal>
    </div>
  );
};

export default Film;
