import React, { useState, useEffect } from 'react';
import './styles.scss';

import * as yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import InputText from '../../components/InputText';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { newMovie } from '../../store/modules/movies/action';

const Movie = () => {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [subtitled, setSubtitled] = useState('');

  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [director, setDirector] = useState('');
  const [imdb, setImdb] = useState('');
  const [evaluation, setEvaluation] = useState('');

  const [submitError, setSubmitError] = useState('');
  const [edit, setEdit] = useState(false);

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = params;
    if (id) {
      api
        .get(`movies/${id}`)
        .then((response) => {
          console.log(response);
          fillInput(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setEdit(true);
    }
  }, [params]);

  function fillInput(data) {
    setTitle(data.title);
    setSynopsis(data.synopsis);
    setGenre(data.genre);
    setLanguage(data.language);
    setSubtitled(data.subtitled);
    setImage(data.image);
    setDate(data.date);
    setDirector(data.director);
    setImdb(data.imdb);
    setEvaluation(data.evaluation);
  }

  function handleSubmit(event) {
    yup.setLocale({
      mixed: {
        required: 'Campo obrigatório',
      },
    });

    let schema = yup.object().shape({
      title: yup.string().required(),
      synopsis: yup.string().required(),
      genre: yup.string().required(),
      language: yup.string().required(),
      subtitled: yup.string().required(),
    });

    schema
      .validate({
        title,
        synopsis,
        genre,
        language,
        subtitled,
      })
      .then((response) => {
        const { id } = params;
        const movie = {
          title,
          synopsis,
          genre,
          language,
          subtitled,
          image,
          date,
          director,
          imdb,
          evaluation,
        };

        if (edit) {
          api.put(`movies/${id}`, movie);
        } else {
          api.post('movies', movie).then((response) => {
            dispatch(newMovie(response.data));
          });
        }

        toast.success('Filme cadastrado com sucesso!');
        history.push('/');
      })
      .catch((error) => {
        console.log('err');
        console.log(error);
        setSubmitError(error.path);
        toast.error('Campos obrigatórios não preenchidos!');
        window.scroll(0, 0);
      });

    // schema
    //   .isValid({
    //     title: 'asd',
    //     test: 'a',
    //   })
    //   .then(function (valid) {
    //     console.log('valid');
    //     console.log(valid);
    //   });

    event.preventDefault();
  }

  return (
    <section className="movie">
      <h1>{edit ? 'editar' : 'novo'} filme</h1>

      <form onSubmit={handleSubmit} className="movie__form">
        <fieldset>
          <legend>
            <h2>Dados obrigatórios</h2>
          </legend>

          <div className="movie__group--input">
            <InputText
              label="Título do Filme"
              name="title"
              placeholder={'Filme...'}
              value={title}
              handleValue={setTitle}
              error={submitError}
            />
            <InputText
              label="Gênero"
              name="genre"
              placeholder={'Ação, Aventura, Terror...'}
              value={genre}
              handleValue={setGenre}
              error={submitError}
            />
          </div>

          <InputText
            label="Sinopse"
            name="synopsis"
            placeholder={'Breve descrição sobre o filme...'}
            value={synopsis}
            handleValue={setSynopsis}
            error={submitError}
            textarea
          />

          <div className="movie__group--input">
            <InputText
              label="Idioma"
              name="language"
              placeholder={'Inglês, Português...'}
              value={language}
              handleValue={setLanguage}
              error={submitError}
            />
            <InputText
              label="Legendado"
              name="subtitled"
              placeholder={'Legendado...'}
              value={subtitled}
              handleValue={setSubtitled}
              error={submitError}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Dados opcionais</h2>
          </legend>

          <div className="movie__group--input">
            <InputText
              label="Capa do filme"
              name="image"
              placeholder={'Link da imagem...'}
              value={image}
              handleValue={setImage}
            />

            <InputText
              label="IMDB"
              name="imdb"
              placeholder={'Link no IMDB...'}
              value={imdb}
              handleValue={setImdb}
            />
          </div>

          <div className="movie__group--input">
            <InputText
              label="Data de lançamento"
              name="date"
              placeholder={'00/00/0000...'}
              value={date}
              handleValue={setDate}
            />

            <InputText
              label="Diretor"
              name="director"
              placeholder={'Nome completo...'}
              value={director}
              handleValue={setDirector}
            />

            <InputText
              label="Avaliação do filme"
              name="evaluation"
              placeholder={'Avalia...'}
              value={evaluation}
              handleValue={setEvaluation}
            />
          </div>
        </fieldset>

        <button type="submit">{edit ? 'editar' : 'salvar'}</button>
      </form>
    </section>
  );
};

export default Movie;
