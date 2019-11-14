import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: []
  };

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    
    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleSubmit = e => {
    // PUT request
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  // loading state if we don't have data yet
//   if (props.items.length === 0) {
//     return <h2>Loading data...</h2>;
//   }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Price"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="Image"
          value={movie.metascore}
        />
        <div/>

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Description"
          value={movie.stars}
        />
        <div className="baseline" />

       
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;