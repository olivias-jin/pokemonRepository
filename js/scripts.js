let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
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
      let $row = $(".row");

      let $card = $('<div class="card" style="width:400px"></div>');
      let $image = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      let $cardBody = $('<div class="card-body"></div>');
      let $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      let $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $row.append($card);
      //Append the image to each card
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function (event) {
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
    return fetch(apiUrl).then(function (results) {
      return results.json();
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (results) {
        return results.json()
      }).then(function (details) {

        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        //loop for each ofthe pokemon types.
        //Also changing the background color depend on each pokemon type.
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes("grass")) {
          $(".modal-header").css("color", "green");
        } else if (item.types.includes("fire")) {
          $(".modal-header").css("color", "red");
        } else if (item.types.includes("psychic")) {
          $(".modal-header").css("color", "#FF69B4");
        } else if (item.types.includes("poison")) {
          $(".modal-header").css("color", "purple");
        } else if (item.types.includes("Water")) {
          $(".modal-header").css("color", "blue");
        } else if (item.types.includes("Bug")) {
          $(".modal-header").css("color", "#3f000f");
        } else if (item.types.includes("rock")) {
          $(".modal-header").css("color", "#BC8F8F");
        } else if (item.types.includes("flying")) {
          $(".modal-header").css("color", "#2F4F4F");
        } else if (item.types.includes("electric")) {
          $(".modal-header").css("color", "gold");
        } else if (item.types.includes("ice")) {
          $(".modal-header").css("color", "#4169E1");
        } else if (item.types.includes("ghost")) {
          $(".modal-header").css("color", "#8B008B");
        } else if (item.types.includes("ground")) {
          $(".modal-header").css("color", "#D2B48C");
        } else if (item.types.includes("fairy")) {
          $(".modal-header").css("color", "#EE82EE");
        } else if (item.types.includes("steel")) {
          $(".modal-header").css("color", "#708090");
        }
        //loop to get the abilities of a selected pokemon
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }

        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // show the modal content
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear existing content of the model
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");

    //creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    //creating element for height in modal content
    let heightElement = $("<p>" + "Height (M) : " + item.height + "</p>");

    //creating element for weight in modal content
    let weightElement = $("<p>" + "Weight (KG) : " + item.weight + "</p>");

    //creating element for type in modal content
    let typesElement = $("<p>" + "Types : " + item.types + "</p>");

    //creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "Abilities : " + item.abilities + "</p>");

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
    // hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


function searchFunction() {
  let query = document.getElementById('searchInput').value.toLowerCase();
  let filteredPokemon = pokemonRepository.getAll().filter(pokemon => pokemon.name.toLowerCase().includes(query));

  $(".row").empty(); // Clear current displayed Pokémon

  if (filteredPokemon.length > 0) {
    filteredPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  } else {
    alert('No Pokémon found with the name "' + query + '"');
  }
}