const { Sequelize } = require("sequelize");
const { Movie } = require("../models/models");

const addMovie = async (movieObj) => {
  try {
    const movie = await Movie.create(movieObj);
    console.log("We added ${movie.title}");
  } catch (error) {
    console.log(error);
  }
};

const listMovies = async () => {
  try {
    const movies = await Movie.findAll({});
    console.log(movies.every((movie) => movie instanceof Movie));
    console.log("All Movies: ", JSON.stringify(movies, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (movieTitle) => {
  try {
    const movie = await Movie.destroy({ where: { title: movieTitle } });
    console.log("We deleted ${movie.title}");
  } catch (error) {
    console.log(error);
  }
};

// const updateMovie = async (oldTitle, newTitle) => {
//   try {
//     const movie = await Movie.update(
//       { title: newTitle },
//       { where: { title: oldTitle } }
//     );
//     console.log("We updated ${movie.title}");
//   } catch (error) {
//     console.log(error);
//   }
// };

const updateMovie = async (movieTitle) => {
  try {
    await Movie.update(
      { title: movieTitle.newTitle },
      { where: { title: movieTitle.oldTitle } }
    );
    console.log("We updated ${movie.title}");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMovie,
  listMovies,
  deleteMovie,
  updateMovie,
};
