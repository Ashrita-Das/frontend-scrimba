
/* url : "http://www.omdbapi.com/?i=tt3896198&apikey=19817d52" */

let inputEl = document.getElementById('input')
const moviesContainer = document.getElementById('movies')
const watchlistEl = document.getElementById('watchlist')

const movieArray = []
let watchlistMovieArray = []

if (localStorage.getItem('watchlist')) {
    watchlistMovieArray = JSON.parse(localStorage.getItem('watchlist'))
}  

if(inputEl){
    inputEl.addEventListener("keyup", (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click()
            console.log("clicked")
        }
    })
}
document.addEventListener("click", (e) => {
    if (e.target.id === "add") {
        handleAdd(e.target.dataset.id)
    } else  if (e.target.id === "search-btn") {
        renderMovie()
    } else if (e.target.id === "remove") {
        handleRemove(e.target.dataset.id)
    };
});

async function renderMovie() {
    loading()
    await getMovieArray(inputEl.value)
    inputEl.value = ``
    moviesContainer.innerHTML = movieArray.length > 0 ? getMovieHtml() : getNoMovieHtml()
}

function loading() {
    moviesContainer.innerHTML = `
    <div class="loading-div">
    <img src="/images/loading.gif" class="loading">
    <h2 class="loading-text">Searching for your Movie</h2>
    </div>
    `
}

async function getMovieArray(value){
 const res = await fetch(`https://www.omdbapi.com/?apikey=3d2d536a&s=${value}`)
 const data = await res.json()
 movieArray.length = 0 
 if (!data.Error) {
    const movieIdArray = data.Search.map((movie) => {
        return movie.imdbID
    })
    const movieList = await searchEachMovie(movieIdArray)
    movieArray.push(...movieList)
 }
}

async function searchEachMovie(arr){
    const finalData = []
    for(let id of arr) {
         const data = await searchMovieById(id)
         finalData.push(data)
    }
    return finalData
}

 async function searchMovieById(id){
    const res = await fetch(`https://www.omdbapi.com/?apikey=3d2d536a&i=${id}`)
    const data = await res.json()
    return data
    }

function getMovieHtml(){
    let html = ``;
    movieArray.map((movie) => {
        const { Title, imdbID, Year, Runtime, Genre, imdbRating, Plot, Poster } = movie
        let watchEl = '';
        
        if (isWatchlist(imdbID)) {
            watchEl = `<span class="added">Added to watchList</span>`
        } else {
            watchEl = `<img src="/images/add.png" data-id=${imdbID} id="add" class="add"/>
            <span>Watchlist</span>`
        }

        html += `
        <div class="movie">
        <img src="${Poster}" class="avatar">
                <div>
                    <div class="movie-name">
                        <h3>${Title} ${Year}</h3>
                        <span>⭐️</span> <span>${imdbRating}</span>
                    </div>
                    <div class="movie-details">
                        <span>${Runtime}</span>
                        <span>${Genre}</span>
                        <div class="watchlist" id=${imdbID}>
                        ${watchEl}
                        </div>
                    </div>
                    <p class="description">${Plot}</p>
                </div>
        </div>
        <hr>
        `
    })
    return html
}

function getNoMovieHtml() {
    return  `
        <h2 class="no-movie">Unable to find what you’re looking for. 
        Please try another search.</h2>`
} 
function isWatchlist(id){
    let checkIdArray = []
    watchlistMovieArray.forEach(movie => checkIdArray.push(movie.imdbID))
    return checkIdArray.includes(id)
}

async function handleAdd(id){
    const movie = await searchMovieById(id)
    watchlistMovieArray.unshift(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlistMovieArray))
    document.getElementById(id).innerHTML = `
        <span class="added" >Added to watchList</span>`
}

async function renderWatchList(){
    if(watchlistMovieArray.length > 0 && watchlistEl ) {
        watchlistEl.innerHTML = getWatchlistHtml();   
    } else if(watchlistEl && watchlistMovieArray.length === 0 ) {
        watchlistEl.innerHTML = `<div class="saved">
                <h2 class="no-movie">Your watchlist is looking a little empty...</h2>
                <div>
                    <a href="index.html"><img src="/images/add.png" class="add" /></a>
                    <span>Let’s add some movies!</span>
                </div>
            </div>`
    }
}

function getWatchlistHtml(){
    let html = "";
    watchlistMovieArray.map((movie) => {
        const {Title, imdbID, Year, Runtime, Genre, imdbRating, Plot, Poster} = movie;
        html += `
        <div class="movie">
            <img src="${Poster}" class="avatar">
            <div>
                <div class="movie-name">
                    <h3>${Title} ${Year}</h3>
                    <span>⭐️ ${imdbRating}</span>
                </div>
                <div class="movie-details">
                    <span>${Runtime}</span>
                    <span>${Genre}</span>
                    <div class="watchlist">
                        <img src="/images/remove.png" class="add" id="remove" data-id=${imdbID} />
                        <span>Remove</span>
                    </div>
                </div>
                <p class="description">${Plot}</p>
            </div>
        </div><hr>`
    });
    
    return html
}

function handleRemove(id){
    let neededIndex;
    watchlistMovieArray.forEach((movie, index) => {
        if (movie.imdbID === id) {
            neededIndex = index
        }
    })
    watchlistMovieArray.splice(neededIndex, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlistMovieArray))
    renderWatchList()
}
renderWatchList()



