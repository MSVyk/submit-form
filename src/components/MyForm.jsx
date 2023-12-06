import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { fetchMovies } from '../lib/api';
import '../App.css';

const validationSchema = Yup.object({
  firstName: Yup.string().required('You need to enter a first name.'),
  lastName: Yup.string().required('You need to enter a last name.'),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      favoriteMovie: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      setTimeout(() => {
        setFormSubmitted(true);
      }, 1000);
    },
  });

  const { data, isLoading, isError } = useQuery('movies', fetchMovies);

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="form-header">
          <div className="form-title">My form</div>
        </div>

        {formSubmitted ? (
          <div className="submission-message">
            Thanks for submitting the form!
          </div>
        ) : (
          <>
            <div className='validation-warning-container'>
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="validation-warning">{formik.errors.firstName}</div>
              )}
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="validation-warning">{formik.errors.lastName}</div>
              )}
            </div>

            <form onSubmit={formik.handleSubmit} className="form-controls">
              <div className='main-container'>
                <div className='inputs-container'>
                  <div className="first-Name">
                    <label htmlFor="firstName">First name <label className='star'>*</label></label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`${formik.touched.firstName && formik.errors.firstName ? 'input-error' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                  </div>
                  <div className="last-Name">
                    <label htmlFor="lastName">Last name <label className='star'>*</label></label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`${formik.touched.lastName && formik.errors.lastName ? 'input-error' : ''}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                  </div>
                </div>
                <div className="favorite-Movie">
                  <label htmlFor="favoriteMovie">Favorite Star Wars movie</label>
                  <select
                    id="favoriteMovie"
                    name="favoriteMovie"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.favoriteMovie}
                  >
                    {data?.allFilms?.films.map((film) => (
                      <option key={film.title} value={film.title}>
                        {film.title}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
          </>
        )}

        <ReactQueryDevtools />
        {isError && <div>Error fetching data</div>}
      </div>
    </div>
  );
};

export default MyForm;
