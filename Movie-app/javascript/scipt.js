
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5b48c928799054f5cd3c9403cb1cb76a&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=5b48c928799054f5cd3c9403cb1cb76a&query=";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=5b48c928799054f5cd3c9403cb1cb76a';
const theatherApi = "https://api.themoviedb.org/3/movie/now_playing?api_key=5b48c928799054f5cd3c9403cb1cb76a&language=en-US&page=1"
const TVshows = "https://api.themoviedb.org/3/tv/popular?api_key=5b48c928799054f5cd3c9403cb1cb76a&language=en-US&page=1"
const MovieGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=5b48c928799054f5cd3c9403cb1cb76a&language=en-US" 




const section = document.querySelector("section")
const form = document.querySelector("form")
const search = document.getElementById("search");
const theatersBtn = document.querySelector(".theater-btn")
const tvShowBtn = document.querySelector(".tv-show-btn")
const gengreText = document.querySelector(".movies-header")
const dropDown = document.querySelector(".dropdown-content")
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]
const DropdownBtn = document.querySelector(".dropbtn")
const dropdownData = document.querySelector(".dropdown-content")
const dropwdownGenre = document.getElementById("test")




getMovies(APIURL)
getGenres(MovieGenres)

async function getMovies(url){
    try{
    let resp = await fetch(url);
    const respData = await resp.json();
    console.log((respData))
    console.log(respData)
    showMovies(respData.results)
    }catch (error) {
        console.error(error);
      }
}

async function GetTrailer(url){
    let resp = await fetch(url);
    const respData = await resp.json()
    console.log((respData))
    console.log(respData.results);
    showTrailer(respData.results)
}


async function getCast(url){
    try{
    let resp = await fetch(url);
    const respData = await resp.json();
    console.log((respData))
    console.log(respData.cast)
    showCast(respData.cast)
    }catch (error) {
        console.error(error);
      }
}

async function getGenres(url){
    try{
    let resp = await fetch(url);
    const respData = await resp.json();
    console.log((respData))
    console.log(respData.genres)
    showGenres(respData.genres)
    }catch (error) {
        console.error(error);
      }
}


function showMovies(movies){
    section.innerHTML = ""
    movies.forEach(movie =>{
    const {poster_path, title, vote_average, overview, id, original_name} = movie  
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    ${poster_path ? `<img
    src="${IMGPATH + poster_path}"
    alt="${title}"/>` : `<img src="https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"alt="${title}"/>`}  
        <div class="movie-info">
            <h3>${title || original_name}</h3>
            <span class="${getClassByRate(
                vote_average
            )}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
            <button onclick="getTrailer(${id})"class="theater-btn">Trailer</button>
            <button onclick="castCall(${id})" class="theater-btn">See cast</button
        </div>
    `;
    

    section.appendChild(movieEl)
    });
};

function showTrailer(trailers){
    section.innerHTML = ""
    trailers.forEach(trailer =>{
    const {key} = trailer  
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${key}" title="trailers" allowfullscreen></iframe>
    `;
    section.appendChild(movieEl)
    });
};


function showCast(cast){
    section.innerHTML = ""
    cast.forEach(casts =>{
    const {profile_path,  name} = casts  
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img
        ${profile_path ? `<img
        src="${IMGPATH + profile_path}"
        />` : `<img src="https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1638364153~hmac=ff1ea2bec60fd428215a13e2eaf5370d"/>`}  
        <div class="movie-info">
            <h3>${name}</h3>
    `;

    section.appendChild(movieEl)
    });
};

let castCall = (id) =>{
    console.log(id);
    const castApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5b48c928799054f5cd3c9403cb1cb76a&language=en-US`
    getCast(castApi)
};


    let getTrailer = (id) =>{
    console.log(id);
    const trailerApi = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5b48c928799054f5cd3c9403cb1cb76a&language=en-US`
    GetTrailer(trailerApi)
};


function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
};


//     let getInfo = (id) =>{
//     console.log(BASE_URL + '/movie/'+id+'?'+API_KEY)
//     getMovies(BASE_URL + '/movie/'+id+'?'+API_KEY)
// };

// getInfo(512195)

theatersBtn.addEventListener('click', () => {
gengreText.innerHTML = "Theater"
 getMovies(theatherApi)
  });

// tvShowBtn.addEventListener('click', () => {
//     gengreText.innerHTML = "Tv-Shows"
//     getMovies(TVshows)
//      });


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});


function showGenres(genre){
    genre.forEach(genres =>{
    const {name,id} = genres  
    const gengreEl = document.createElement("a");
    gengreEl.classList.add("genre");
    gengreEl.innerHTML = `
      <a id="test" onclick="getGenreById(${id})">${name}</a>
    </div>
    `;
    dropDown.appendChild(gengreEl)
    });
};

let getGenreById = (id) =>{
     console.log(id); 
     const GengreByIDs = `https://api.themoviedb.org/3/discover/movie?api_key=5b48c928799054f5cd3c9403cb1cb76a&with_genres=${id}`
     getMovies(GengreByIDs)
     dropdownData.classList.remove("dropdown-content-active")
};


toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
  })

  DropdownBtn.addEventListener("click", () =>{
    //   dropdownData.style.display = "block";
      dropdownData.classList.toggle("dropdown-content-active")
  })


