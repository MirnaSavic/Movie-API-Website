const API_KEY = "api_key=e4b88636ce6a49bd9c4ed9b8ee7f3725"
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=e4b88636ce6a49bd9c4ed9b8ee7f3725&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovie(API_URL) 

function getMovie(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data.results)
    const datas = data.results
    showMovies(datas);
  })
}



function showMovies(data) {

  main.innerHTML = ''

  
  data.forEach(movie => {
    const {title,poster_path,vote_average,overview} = movie  // object destructuring
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <img src="${IMAGE_PATH + poster_path}">
    <div class="movie-info">

        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">

        <h3>Overview</h3>
        ${overview}
       
    </div>
    `

    main.appendChild(movieEl)
  })

}

function getColor(vote) {
  if (vote >= 8){
    return "green"
  } else if (vote >=5) {
    return "orange"
  } else {
    return "red"
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value
  if (searchTerm){
    getMovie(SEARCH_URL + searchTerm)
  } else {
    getMovie(API_URL) 

  }
})
