//Const
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const searchUrl =  'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=false&query=';
const imgPath = 'https://image.tmdb.org/t/p/w1280'

//Selectors
const movieTrmplate = document.getElementById('movie-item');
const moviesContainer = document.querySelector('.movies-container');
const searchInput = document.getElementById('search-input');

//Event

searchInput.addEventListener('input' , (event)=>{
    moviesContainer.innerHTML = '';
    getMovies(searchInput.value)
    console.log(event)
})

//Fnctions
async function getMovies(search = null){
    let responce = null;
    if(search){
        responce = await fetch(searchUrl + search);
    }
    else{
        responce = await fetch(apiUrl);
    }
    const respData = await responce.json();
    const movies = respData.results;

    for (movie of movies){
        addMovie(movie);
    }
}

getMovies();


function movieRang (movie ,  rang){
    if(rang >= 8 ){
        movie.querySelector('.movie-rang').classList.add('green');
    }else if (rang >= 5){
        movie.querySelector('.movie-rang').classList.add('yellow');
    }else{
        movie.querySelector('.movie-rang').classList.add('red');
    }

    movie.querySelector('.movie-rang').innerText = rang
}

function addMovie(movie){
    const movieItem = document.importNode(movieTrmplate , true).content;
    movieItem.querySelector('.movie-header img').setAttribute('src' ,imgPath + movie.poster_path);
    movieItem.querySelector('.movie-header img').setAttribute('alt' ,movie.title);

    movieItem.querySelector('.movie-title').innerText = movie.title;
    movieRang(movieItem , parseFloat(movie.vote_average));
    movieItem.querySelector('.movie-bio').innerText = movie.overview;

    moviesContainer.appendChild(movieItem);
}
