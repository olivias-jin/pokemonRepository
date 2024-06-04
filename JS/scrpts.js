// IIFE

let pokemonRepository = (function(){
    let pokemonList = [];
    let apiurl = 'https://pokeapi.co/api/v2/pokemon/';
    
    
   function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
    ){
        pokemonList.push(pokemon);
    }else {
        console.log("pokemon is not corret");
    }
   }
   function getAll(){
    return pokemonList;
   }
   function showDetails(pokemon){
    console.log(pokemon)
   }
   function addListItem(pokemon){    
let pokemonList = document.querySelector(".pokemon-list");
   let listpokemon = document.createElement("li");
   let button = document.createElement("button");
   button.innerText = pokemon.name;
   button.classList.add("button-class");
   button.addEventListener('click',function(){
    showDetails(pokemon)
   })
   listpokemon.appendChild(button);
   pokemonList.appendChild(listpokemon);

   }

   //promise function
   
   function loadList() {
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item){
            let pokemon = {
                name: item.name,
                detailsURL: item.url
            };
            add(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}


    return{
        add: add,
        getAll: getAll,
    addListItem: addListItem,   };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name:"Pikachu",height:0.4,types:["electric"]});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){

    pokemonRepository.addListItem(pokemon);
});

// pokemonList.forEach(function(user){
//     console.log(user.name + ' type is ' + user.types);
// });