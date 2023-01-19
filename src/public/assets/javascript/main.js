const mainContainer = document.getElementById("main-content");
const getAllMoviesBtn = document.getElementById("getAllMoviesBtn");

getAllMoviesBtn.addEventListener("click", () => {
  getAllMovies();
});

function getAllMovies() {
  listOfMovies = [];

  //const endpoint = process.env.MOVIE_DB_URI;

  fetch("https://sheetdb.io/api/v1/cnjb5uimg2rmm")
    .then((response) => response.json())
    .then((data) => {
      listOfMovies = data;
      //console.log(listOfMovies);
      renderHTML(listOfMovies);
    });

  //console.log(listOfMovies);
}

function renderHTML(movies) {
  // console.log(movies);
  const mainContainer = document.getElementById("main-content");
  mainContainer.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    console.log(movies[i]);

    let container = document.createElement("div");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let img = document.createElement("img");

    title.innerHTML = movies[i].title;
    img.src = movies[i].image;
    img.alt = movies[i].title;

    container.classList.add("movie");

    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(description);

    mainContainer.appendChild(container);
  }
}

const createMovieBtn = document.getElementById("createMovie");

createMovieBtn.addEventListener("click", () => {
  toggleInputForm();
});

function toggleInputForm() {
  mainContainer.innerHTML = "";
  //Skapar input-container
  let inputForm = document.createElement("form");
  inputForm.setAttribute("id", "inputForm");

  //Skapar titel
  let titleContainer = document.createElement("div");

  let titleLabel = document.createElement("label");
  titleLabel.innerText = "Titel:";
  titleContainer.appendChild(titleLabel);

  let titleInput = document.createElement("input");
  titleContainer.appendChild(titleInput);
  let movieTitle = titleInput.value;

  //Appendar alla title-element
  inputForm.appendChild(titleContainer);

  //Skapar Genre
  let genreContainer = document.createElement("div");

  let genreLabel = document.createElement("label");
  genreLabel.innerText = "Genre:";
  genreContainer.appendChild(genreLabel);

  let genreSelect = document.createElement("select");
  genreSelect.innerHTML = `
  <option value="Action">Action</option>
  <option value="Drama">Drama</option>
  <option value="Comedy">Comedy</option>
  <option value="Horror">Horror</option>`;
  genreContainer.appendChild(genreSelect);

  //Appendar alla genre-element
  inputForm.appendChild(genreContainer);

  //Skapar Description
  let descriptionContainer = document.createElement("div");

  let descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Beskrivning:";
  descriptionContainer.appendChild(descriptionLabel);

  let descriptionInput = document.createElement("input");
  descriptionContainer.appendChild(descriptionInput);

  //Appendar alla description-element
  inputForm.appendChild(descriptionContainer);

  submitButton = document.createElement("button");
  submitButton.innerText = "Skapa film";
  mainContainer.appendChild(submitButton);

  mainContainer.appendChild(inputForm);

  /* const createMovieQuery = `mutation CreateMovie($input: CreateMovieInput!) {

    createMovie(input: $input) {
      title
      description
      genre
      id
      image
    }
  }`;

  const graphQlQuery = async (url, query, variables = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const res = await response.json();
    return res.data;
  };

  const createMovieQueryVars = {
    input: {
      title: titleInput.value,
      genre: "ACTION",
    },
  };

  submitButton.addEventListener("click", async (event) => {
    console.log(movieTitle);
    event.preventDefault();
    const response = await graphQlQuery(
      "http://localhost:5000/graphql",
      createMovieQuery,
      createMovieQueryVars
    );

    console.log(response);
  }); */
  submitButton.addEventListener("click", () => {
    fetch("https://sheetdb.io/api/v1/cnjb5uimg2rmm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: crypto.randomUUID(),
            title: titleInput.value,
            genre: genreSelect.value,
            description: descriptionInput.value,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
}
