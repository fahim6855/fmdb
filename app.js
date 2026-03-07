let page = 1;

async function getPage(){
           let res = await fetch("https://api.npoint.io/a12de7887d571894822c");
           let data = await res.json();
           return data.page
       }
       

let apiKey = "47e8febd32a5972b12bef57865cb08a5";
let streamUrl = "https://streamex.net";

document.addEventListener("alpine:init", () => {
  Alpine.data("movieData", () => ({
    outputMovies: [],
    savedMovies: [],
    activeGenre: "popular",
    searchTitle: "",
    streamLink : streamUrl,
           page = await getPage(),
    async init() {this.outputMovies = await getPopularMovies()},
    async showActions(id){
      this.activeGenre = id;
      this.outputMovies = await getByGenre(id)
    },
    async showSearch(){this.outputMovies = await getBySearch(this.searchTitle);},
  }));
});


//getPopularMovies();
async function getPopularMovies() {
  let resPop = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  );
  let dataPop = await resPop.json();
  return dataPop.results;
}

//getByGenre("16")
async function getByGenre(genreId){
  let resGenre = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${Number(genreId)}&page=${page}`);
  let dataGenre = await resGenre.json();
  return dataGenre.results;
}


async function getBySearch(QueryTitle){
  let resSearch = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${QueryTitle}`);
  let dataSearch = await resSearch.json();
  console.log(dataSearch);
  return dataSearch.results;
}

//getBySearch("batman")









