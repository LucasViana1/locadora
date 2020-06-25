import React, { useState } from 'react';
import './styles.scss';

import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../../store/modules/movies/action';
import { toast } from 'react-toastify';

import imageNotFound from '../../assets/film_not_found.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { MdDelete, MdModeEdit, MdLibraryBooks, MdCancel } from 'react-icons/md';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '60vh',
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

  function releaseYear() {
    return film.date.split('-')[0];
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
          <h3>
            {film.title}
            {film.date && ` (${releaseYear()})`}
          </h3>
          <p className="catalog__genre">{film.genre}</p>
          <div className="catalog__actions">
            <a
              href="#"
              className="catalog__actions--details"
              onClick={() => handleDetails()}
            >
              <MdLibraryBooks />
            </a>
            <Link to={`movie/${film.id}`} className="catalog__actions--edit">
              <MdModeEdit />
            </Link>
            <a
              href="#"
              className="catalog__actions--delete"
              onClick={() => handleDelete()}
            >
              <MdDelete />
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
        <section className="catalog__modal">
          <div className="catalog__modal--close">
            <button type="button" onClick={() => handleDetails()}>
              <MdCancel fontSize={36} color="red" />
            </button>
          </div>

          <article className="catalog__modal--details">
            <h2>detalhes do filme</h2>
            <p>
              <b>Título do filme </b>- {film.title}
            </p>
            <p>
              <b>Sinopse</b> - {film.synopsis}
            </p>
            <p>
              <b>Gênero</b> - {film.genre}
            </p>
            <p>
              <b>Data de lançamento</b> - {releaseYear() || 'Não informado'}
            </p>
            <p>
              <b>Idioma</b> - {film.language}
            </p>
            <p>
              <b>Legendado</b> - {film.subtitled}
            </p>
            <p>
              <b>Diretor</b> - {film.director || 'Não informado'}
            </p>
            <p>
              <b>Link no IMDB</b> - {film.imdb || 'Não informado'}
            </p>
            <p>
              <b>Avaliação do filme</b> - {film.evaluation || 'Não informado'}
            </p>
          </article>

          {/* <div className="catalog__actions">
            <Link to={`movie/${film.id}`} className="catalog__actions--edit">
              <MdModeEdit />
            </Link>
            <a
              href="#"
              className="catalog__actions--delete"
              onClick={() => handleDelete()}
            >
              <MdDelete />
            </a>
          </div> */}
        </section>
      </Modal>
    </div>
  );
};

export default Film;
