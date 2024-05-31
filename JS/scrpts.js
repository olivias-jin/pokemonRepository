// IIFE

let pokemonRepository = (function(){
    let pokemonList = [
    {name :"Bulbasaur", height:0.7, types: ["grass","posion"]},
    {name :"Charmander", height:0.6, types: ["fire"] },
    {name :"Squirtle", height:0.5, types: ["water"] }];
    return {
        add:function(pokemon){
            pokemonList.push(pokemon);
            },
            getAll: function() {
                return pokemonList;
            }
            };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name:"Pikachu",height:0.4,types:["electric"]});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = "placeholder";
    button.classList.add("button-class")

});

// pokemonList.forEach(function(user){
//     console.log(user.name + ' type is ' + user.types);
// });