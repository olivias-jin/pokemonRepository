var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      var $row = $(".row");
      var $card = $('<div class="card" style="width:400px"></div>');
      var $image = $('<img class="card-img-top" alt="Card image" style="width:20%" />');
      $image.attr("src", pokemon.imageUrlFront);
      var $cardBody = $('<div class="card-body"></div>');
      var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      var $seeProfile = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>');

      $row.append($card);
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function () {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
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

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map(type => type.type.name);
        item.abilities = details.abilities.map(ability => ability.ability.name);
        item.weight = details.weight;
        
        var typeColors = {
          grass: "green",
          fire: "red",
          psychic: "#FF69B4",
          poison: "purple",
          water: "blue",
          bug: "#3f000f",
          rock: "#BC8F8F",
          flying: "#2F4F4F",
          electric: "gold",
          ice: "#4169E1",
          ghost: "#8B008B",
          ground: "#D2B48C",
          fairy: "#EE82EE",
          steel: "#708090"
        };

        var modalHeader = $(".modal-header");
        item.types.forEach(type => {
          if (typeColors[type]) {
            modalHeader.css("color", typeColors[type]);
          }
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    let heightElement = $("<p>height : " + item.height + "</p>");
    let weightElement = $("<p>weight : " + item.weight + "</p>");
    let typesElement = $("<p>types : " + item.types.join(", ") + "</p>");
    let abilitiesElement = $("<p>abilities : " + item.abilities.join(", ") + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function searchFunction() {
  var query = document.getElementById('searchInput').value;

  if (query.trim() !== '') {
    alert('검색어: ' + query);
  } else {
    alert('검색어를 입력하세요');
  }
  return false;
}
