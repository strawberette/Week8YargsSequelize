// require("dotenv").config();
// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");
// // const argv = yargs(hideBin(process.argv)).argv;
// const commandLineInput = yargs(hideBin(process.argv)).argv;
// const app = (commandLineInput) => {
//   //   if (argv.add == true) {
//   if (commandLineInput.add) {
//     if (commandLineInput.movie) {
//       console.log(
//         "we are adding ${commandLineInput.title} with the actor ${commandLineInput.actor} to Movies"
//       );
//     } else if (commandLineInput.album) {
//       console.log("we have add");
//     }
//   } else if (commandLineInput.list) {
//     console.log("We are adding to Albums");
//   }
// };
// // app(argv);
// app(commandLineInput);

require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
// const argv = yargs(hideBin(process.argv)).argv;
const commandLineInput = yargs(hideBin(process.argv)).argv;
const { Movie } = require("./models/models");
const connection = require("./db/connection");
const {
  addMovie,
  listMovies,
  deleteMovie,
  updateMovie,
} = require("./utils/index");

const app = async (commandLineInput) => {
  try {
    await connection.authenticate();
  } catch (error) {
    console.log(error);
  }

  try {
    if (commandLineInput.add) {
      await Movie.sync({ alter: true });
      await addMovie({
        title: commandLineInput.title,
        actor: commandLineInput.actor,
        rating: commandLineInput.rating,
      });
    } else if (commandLineInput.list) {
      await listMovies();
    } else if (commandLineInput.delete) {
      await deleteMovie(commandLineInput.title);
    } else if (commandLineInput.update) {
      const myMovieTitle = {
        oldTitle: commandLineInput.title,
        newTitle: commandLineInput.newTitle,
      };
      await updateMovie(myMovieTitle);
    }
  } catch (error) {
    console.log(error);
  }
};
// app(argv);
app(commandLineInput);
