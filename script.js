let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
let searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=VALUE&page=1'
let domain = 'https://image.tmdb.org/t/p/w1280'
const plates = document.querySelectorAll('.movie');
const form = document.querySelector('.search-form');
let value = null;

plates.forEach(plate => {
    plate.addEventListener('mouseenter',()=>{plate.querySelector('.overview').classList.remove('hidden')});
    plate.addEventListener('mouseleave',()=>{plate.querySelector('.overview').classList.add('hidden')});
})
async function getData() {
    let res;
    if (window.location.search) {
        res = await fetch(searchUrl.replace('VALUE',window.location.search.split('=')[1]))
    } else {
        res = await fetch(url);
    }
    console.log(res)
    const data = await res.json();
    plates.forEach((plate,index)=>{
        let title = plate.querySelector('.title');
        let mark = plate.querySelector('.mark');
        let poster = plate.querySelector('.poster');
        let description = plate.querySelector('.description');
        description.textContent = data.results[index].overview;
        poster.src = domain + data.results[index].poster_path;
        mark.textContent = data.results[index].vote_average;
        title.textContent = data.results[index].original_title 
    })   
}

getData();

form.addEventListener('submit',()=>{
    value = form.search.value;
    window.location.href += value;
})