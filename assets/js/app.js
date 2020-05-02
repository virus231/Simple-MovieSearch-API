// API
const API_KEY = '364825fdc2d693d2615e949500be6a6b'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=364825fdc2d693d2615e949500be6a6b'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

// Selecttin elements from the DOM
const searchBtn = document.querySelector('#search')
const searchInput = document.querySelector('#inputValue')
const searchMovie = document.querySelector('#movie-search')
const imgElement = document.querySelector('img')


function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=364825fdc2d693d2615e949500be6a6b`
    return url

}


function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img 
                src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}
            />`;
        }
    })
}


function createMovieContainer(movies) {
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class', 'movie')

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;
    movieElement.innerHTML = movieTemplate;
    return movieElement
}


function renderSearchMovies(data) {
    searchMovie.innerHTML = ' ';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    searchMovie.appendChild(movieBlock)
}


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const value = searchInput.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;
    console.log(newUrl);

    fetch(newUrl)
        // data.results []
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((e) => {
            console.log("errod", e);

        })

    searchInput.value = ' '
    // console.log(value);
    // console.log('click');
})

function createIframe(video) {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${video.key}`
    iframe.width = 360
    iframe.height = 315
    iframe.allowFullscreen = true
    return iframe
}

function createVideoTemplate(data, content) {
    //display movie videos
    content.innerHTML = '<p id="content-close">X</p>'
    const videos = data.results
    const length = videos.length > 4 ? 4 : videos.length
    const iframeContainer = document.createElement('div')
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i] //video
        const iframe = createIframe(video)
        iframeContainer.appendChild(iframe)
        content.appendChild(iframeContainer)
    }


}


document.addEventListener('click', (e) => {
    const target = e.target
    if (target.tagName.toLowerCase() === 'img') {
        console.log('click')
        const movieID = target.dataset.movieId
        console.log(movieID);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display')

        const path = `/movie/${movieID}/videos`
        const url = generateUrl(path);

        // fetch movie videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((e) => {
                console.log("errod", e);
            })
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')
        content.innerHTML = ' '

    }
})