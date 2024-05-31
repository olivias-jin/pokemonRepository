// IIFE

let pokemonRepository = (function(){
    let pokemonList = [
    {name :"Bulbasaur", height:0.7, types: ["grass","posion"]},
    {name :"Charmander", height:0.6, types: ["fire"] },
    {name :"Squirtle", height:0.5, types: ["water"] }];
    
    
   function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
    ){
        repository.push(pokemon);
    }else {
        console.log("pokemon is not corret");
    }
   }
   function getAll(){
    return repository;
   }
   function addListItem(pokemon){    
let pokemonList = document.querySelector(".pokemon-list");
   let listpokemon = document.createElement("li");
   let button = document.createElement("button");
   button.innerText = pokemon.name;
   button.classList.add("button-class")
   listpokemon.appendChild(button);
   pokemonList.appendChild(listpokemon);

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