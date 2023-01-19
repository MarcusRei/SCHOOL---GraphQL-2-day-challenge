const getAllMoviesBtn = document.getElementById("getAllMoviesBtn");

getAllMoviesBtn.addEventListener("click", () => {
  getAllMovies();
});

function getAllMovies() {
  console.log("Hello World!");

  const endpoint = process.env.MOVIE_DB_URI;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(response);
}
