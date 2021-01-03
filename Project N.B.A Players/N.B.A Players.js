let api = "https://www.balldontlie.io/api/v1/players/";
let arrayNbaPlayers = [];
let playersJson;

window.onload = () => {
  showGifAndAwait();
};

function getPlayersDetails() {
  return fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      playersJson = res;
      addListToArray(playersJson);
    });
}

async function showGifAndAwait() {
  try {
    maindiv.innerHTML = ` <img src="/Image_and_gif/nba_gif.gif" alt="nba_gif">`;
    await getPlayersDetails();
  } catch (err) {
    console.log(err);
  } finally {
    maindiv.innerHTML = "";
  }
}

function addListToArray(namePlayers) {
  for (const iterator of namePlayers.data) {
    arrayNbaPlayers.push(
      `${iterator.id} ${iterator.first_name} ${iterator.last_name}`
    );
  }
}

function addToTable() {
  return fetch(`${api}${playerlistinput.value}`)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      listplayertable.innerHTML += `<tr>
        <td>${res.id}</td>
        <td>${res.first_name}</td>
        <td>${res.last_name}</td>
        <td>${res.team.city}</td>
        <td>${res.team.full_name}</td>
        <td>${res.position}</td>
        </tr>`;
    });
}

$(() => {
  $("#playerlistinput").autocomplete({
    source: arrayNbaPlayers,
  });
});
