    // Sidebar toggle
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector("main");
    const cardscontainer = document.querySelector("#cardscontainer");
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
    function fetchdata(api){
      fetch(api)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(game => {
          let card = document.createElement("div");
          card.innerHTML = `
            <div class="card flex flex-col w-full min-h-[300px] border rounded-lg border-black shadow-md overflow-hidden bg-[var(--secondaryColor)]">
              <div class="upperhalf w-full h-[200px] relative">
                <img class="h-full w-full" src="${game.background_image}" alt="game">
                <span class="absolute right-0 bottom-0 -translate-x-1 -translate-y-2"><i class="fa-regular fa-heart text-3xl"></i></span>
              </div>
              <div class="w-[96%] h-[115px] relative flex flex-col self-center shadow-sm">
                <div class="flex flex-row justify-between">
                  <h2 class="GameTitle text-xl w-[80%]">${game.name}</h2>
                  <span class="gameplatforms m-2 space-x-0.5 flex"></span>
                </div>
                <p class="Description text-sm">${game.description.slice(0, 200) + " ..."}</p>
                <button class="Showmorebtn self-center border bg-[#5D5A5A] border-white/30 rounded-full w-32 h-6 absolute bottom-2"><i class="fa-solid fa-angle-down"></i></button>
              </div>
            </div>`;
          cardscontainer.append(card);
          let gameplatforms = card.querySelector(".gameplatforms");
          game.platforms.forEach((platform, index = 0) => {
            if(index < 5){
              switch(platform.platform.name){
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
              index++;
            }
            })
        });
        let Showmorebtn = document.querySelectorAll(".Showmorebtn");
        Showmorebtn.forEach(btn =>{
          btn.addEventListener("click", () => {
            btn.parentNode.classList.toggle("h-[115px]");
            btn.parentNode.classList.toggle("h-auto");
            if(btn.innerHTML == `<i class="fa-solid fa-angle-down"></i>`){
              btn.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
              btn.classList.add("opacity-40");
            }
            else{
              btn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
              btn.classList.remove("opacity-40");
            }
          })
        })
        window.addEventListener("scrollend", fetchdata(data.next));
      })
      .catch(error => console.log(error));
    }
    fetchdata(`https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=${limit}`);