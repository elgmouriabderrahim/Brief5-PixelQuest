const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const main = document.querySelector("main");
const cardscontainer = document.querySelector("#cardscontainer");
let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

burger.addEventListener('click', () =>{
  sidebar.classList.toggle('hidden');
  sidebar.classList.toggle('left-0');
  sidebar.classList.toggle('right-0');
  sidebar.classList.toggle('w-[20%]');
  sidebar.classList.toggle('w-[50%]');
});

main.addEventListener('click', () =>{
  sidebar.classList.add('hidden');
  sidebar.classList.add('w-[20%]');
  sidebar.classList.add('left-0');
  sidebar.classList.remove('w-[50%]');
  sidebar.classList.remove('right-0');
});

let page=1;
let limit = 20;
let isLoading = false;

function fetchdata(api){
  isLoading = true;
  fetch(api)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(game => {
      let card = document.createElement("div");
      card.innerHTML = `
        <div class="card flex flex-col w-full min-h-[300px] border rounded-lg border-black shadow-md overflow-hidden bg-[var(--secondaryColor)] transform transition-transform duration-200 ease-in hover:-translate-y-1 hover:scale-[1.03]">
          <div class="upperhalf w-full h-[200px] relative">
            <img class="h-full w-full" src="${game.background_image}" alt="game">
            <span class="absolute right-0 bottom-0 -translate-x-1 -translate-y-2"><i id="${game.id}" class="addFavBtn fa-regular fa-heart text-3xl transform transition-transform duration-100 ease-in hover:scale-110 hover:text-red-600"></i></span>
          </div>
          <div class="pb-7 lg:pb-2 lg:hover:h-auto w-[96%] h-[115px] relative flex flex-col self-center shadow-sm">
            <div class="flex flex-row justify-between">
              <h2 class="GameTitle text-xl w-[80%]">${game.name}</h2>
              <span class="gameplatforms m-2 space-x-0.5 flex"></span>
            </div>
            <p class="Description text-sm">${game.description.slice(0, 180) + " ..."}</p>
            <div class="my-1 w-full border-b border-neutral-700 flex justify-between text-xs">
              <p class="text-white/50">Rating:</p>
              <span>${game.rating}<i class="fa-solid fa-star-half-stroke text-yellow-500"></i></span>
            </div>
            <div class="my-1 w-full border-b border-neutral-700 flex justify-between text-xs">
            <p class="text-white/50">release date:</p>
            <p class="text-white">${game.released}</p>
            </div>
            <div class="my-1 w-full border-b border-neutral-700 flex justify-between text-xs">
              <p class="text-white/50">Genres:</p>
              <p class="genre text-white"></p>
            </div>
            <button class="Showmorebtn lg:hidden self-center border bg-[#5D5A5A] border-white/30 rounded-full w-32 h-6 absolute bottom-1 z-10"><i class="fa-solid fa-angle-down"></i></button>
          </div>
        </div>`;
      cardscontainer.append(card);

      let gameplatforms = card.querySelector(".gameplatforms");
      game.platforms.forEach((platform, index) => {
        if (index < 5) {
          switch (platform.platform.name) {
            case "PlayStation 3":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/playstation 3.png" alt="playstation"></img>`;break;
            case "PlayStation 4":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/playstation 4.png" alt="playstation"></img>`;break;
            case "PlayStation 5":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/playstation 5.png" alt="playstation"></img>`;break;
            case "PC":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/pc.png" alt="pc"></img>`;break;
            case "Xbox 360":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/xbox 360.png" alt="xbox 360"></img>`;break;
            case "Xbox One":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/xbox one.png" alt="xbox one"></img>`;break;
            case "Xbox Series S/X":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/xbox series SX.png" alt="Xbox Series SX"></img>`;break;
            case "Linux":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/linux.png" alt="linux"></img>`;break;
            case "macOS":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/macos.png" alt="macos"></img>`;break;
            case "iOS":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/ios.png" alt="ios"></img>`;break;
            case "Android":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/android.png" alt="android"></img>`;break;
            case "Nintendo Switch":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/nintendo switch.png" alt="nintendo"></img>`;break;
            case "Nintendo 3DS":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/nintendo 3DS.png" alt="nintendo 3DS"></img>`;break;
            case "PS Vita":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/psp.png" alt="psp"></img>`;break;
            case "Wii U":gameplatforms.innerHTML += `<img class="w-4 h-4" src="images/platforms/wii.png" alt="wii"></img>`;break;
          }
        }
      });

      const genres = card.querySelector(".genre");
      game.genres.forEach(e =>{
        const span = document.createElement("span");
        span.innerText = e.name + ', ';
        genres.append(span);
      });
    });

    let Showmorebtn = document.querySelectorAll(".Showmorebtn");
    Showmorebtn.forEach(btn =>{
      btn.addEventListener("click", () => {
        btn.parentNode.classList.toggle("h-[115px]");
        btn.parentNode.classList.toggle("h-auto");
        if(btn.innerHTML == `<i class="fa-solid fa-angle-down"></i>`)
          btn.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
        else
          btn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
      });
    });

    //adding to favourites
    const addFavBtns = document.querySelectorAll(".addFavBtn");
    addFavBtns.forEach(e => {
      e.addEventListener("click", () => {
        if(e.classList.contains("font-bold")){
          e.classList.remove("hover:text-red-600");
        savedGames.splice(savedGames.indexOf(e.id), 1);
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
        }
        else{
          savedGames.push(e.id);
          localStorage.setItem("savedGames", JSON.stringify(savedGames));
        }
        e.classList.toggle("text-red-600");
        e.classList.toggle("font-bold");
        e.classList.toggle("scale-105");
      })
    })



  })
  .catch(error => console.log(error))
  .finally(() => isLoading = false);
}

function toggleSection(id) {
  document.getElementById(id).classList.toggle('hidden');
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (!isLoading && scrollTop + clientHeight >= scrollHeight - 10) {
    page++;
    fetchdata(`https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=${limit}`);
  }
});
fetchdata(`https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=${limit}`);

const searchbar = document.querySelector("[type='search']");
searchbar.addEventListener("search", ()=>{

})