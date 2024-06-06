// IIFE

let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    
    
   function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon
    ){
        pokemonList.push(pokemon);
    }else {
        console.log("pokemon is not corret");
    }
   }
   function getAll(){
    return pokemonList;
   }
//    function showDetails(pokemon){
//     console.log(pokemon)
//    }


   function addListItem(pokemon){    
    let pokemonList = document.querySelector(".pokemon-list");
   let listpokemon = document.createElement("li");
   let button = document.createElement("button");
   button.innerText = pokemon.name;
   button.classList.add("button-class");
//    button.addEventListener('click',function(){
//     showDetails(pokemon)
//    })
   listpokemon.appendChild(button);
   pokemonList.appendChild(listpokemon);
    button.addEventListener("click",function(event){
        showDetails(pokemon);
    });
   }



//    promise function
   function loadList() {
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}

// load details function

function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details){
        //add the details to the item
        item.imageUrl = details.sprites.front_default;
        item;height = details.height;
        item.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
}


function showDetails(pokemon){
loadDetails(pokemon).then(function () {
    console.log(pokemon);
});
}



    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList:loadList
    };
})();


pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});
});


// pokemonList.forEach(function(user){
//     console.log(user.name + ' type is ' + user.types);
// });

function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
  
    // Clear all existing modal content
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
  
  
  
    modalContainer.classList.add('is-visible');
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });