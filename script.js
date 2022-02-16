let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
let searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=VALUE&page=1'
let domain = 'https://image.tmdb.org/t/p/w1280'

async function getData() {
    let res;
    if (window.location.search) {
        res = await fetch(searchUrl.replace('VALUE',window.location.search.split('=')[1]));
    } else {
        res = await fetch(url);
    }
    return await res.json();
}

async function showData() {
    let data = await getData();
    data.results.forEach(element => {   
        const poster = document.createElement('img');
        poster.classList.add('poster');
        poster.src = domain + element.poster_path;
        poster.alt = element.original_title;

        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = element.original_title;

        const mark = document.createElement('span');
        mark.classList.add('mark');
        mark.textContent = element.vote_average;

        const info = document.createElement('div');
        info.classList.add('info');
        info.append(title);
        info.append(mark);
    
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = element.overview;
        const overview = document.createElement('div');
        overview.classList.add('overview');
        overview.classList.add('hidden');
        overview.insertAdjacentHTML('beforeend','<h3>Overview</h3>')
        overview.append(description);

        const container = document.createElement('div');
        container.classList.add('movie');
        container.append(poster);
        container.append(info);
        container.append(overview);
        document.querySelector('.wrapper').append(container);

        container.addEventListener('mouseenter',()=>{container.querySelector('.overview').classList.remove('hidden')});
        container.addEventListener('mouseleave',()=>{container.querySelector('.overview').classList.add('hidden')});
    })

}

const form = document.querySelector('.search-form');




showData();

form.addEventListener('submit',()=>{
    value = form.search.value;
    window.location.href += value;
})

window.addEventListener('load',()=>{
    if (window.location.search)
    form.search.value = window.location.search.split('=')[1];
})