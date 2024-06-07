// // IIFE

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not corret");
        }
    }

    function getAll() {
        return pokemonList;
    }

    // This method will hide the modal by removing the "is-visible class" from the modal container
    function hideModal() {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove("is-visible");
    }

    // This method will populate the pokemon list on load
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");

        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function (event) {
            // When a pokemon is clicked, it will call the should details method to fetch details
            showDetails(pokemon);
        });
    }

    function showModal(pokemon) {
        // We first select the modal container (html element with id="modal-container")
        const modalContainer = document.querySelector("#modal-container");
        // This is required to empty the modal
        modalContainer.innerHTML = "";
        let modal = document.createElement("div");
        modal.classList.add("modal");

        // Add the new modal content
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("model-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click", hideModal);
        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name; // user pokemon name as title

        let contentElement = document.createElement("p");
        contentElement.innerText = "Height: " + pokemon.height; // Display pokemon height

        // Create image element
        let imageElement = document.createElement("img");
        // Set the src as the imageUrl
        imageElement.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");

        // Add an event listener to close the modal when clicking outside
        modalContainer.addEventListener("click", (e) => {
            //Close it if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    // modal.innerText = 'Close';

    // listpokemon.appendChild(modal);
    // pokemonList.appendChild(listpokemon);
    // modal.addEventListener("click", function (event) {
    //     showDetails(pokemon);
    // });

    // modal.classList.add('is-visible');

    // // 추가
    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal();
    //   });
    // }

    //    promise function
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // load details function
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                //add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // This method will first call the API to fetch details and then show the modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // We add an event listener to capture all keyboard input
    // And close the modal only when the "Escape" key is pressed and the modal is open
    window.addEventListener("keydown", (e) => {
        let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
