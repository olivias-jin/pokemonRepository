// IIFE

let pokemonRepository = (function(){
    let pokemonList = [
    {name :"Bulbasaur", height:7, types: ['grass','posion']},
    {name :"Charmander", height:6, types: 'fire' },
    {name :"Squirtle", height:5, types: 'water' }]; //empty array
    return {
        add:function(pokemon){
            pokemonList.push(pokemon);
            },
            getAll: function() {
                return pokemonList;
            }
            };
})();

console.log(pokemonRepository.getAll()); //[]
pokemonRepository.add({name:"Pikachu"});
console.log(pokemonRepository.getAll());//[{name:'Pikachu'}]