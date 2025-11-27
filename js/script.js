const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const deleteAll = document.getElementById('deleteAll')


let jokes = JSON.parse(localStorage.getItem('jokes')) || [];

function getChuckNorrisJoke() {
  return fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`)
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data)
      const { id, value } = data;
      const joke = { id, value };

      console.log('La joke nueva: ', joke.value);
      
      saveJoke(id, joke);
      renderJokes(jokes);
    })
    .catch((error) => {
      jokeList.innerHTML = `
        <li>There was an error, so the joke could not be retrieved.</li>
      `
    });
}

// Renderizar el array con las jokes
const renderJokes = (jokes) => {
  const cardJoke = jokes.map((joke) => {
    const template = `
      <li class="cardJoke">
        <p>${joke.value}</p>
        <button class="delete-btn" id=${joke.id}>Eliminar</button>
      </li>
      `
    return template;
  }).join('')
  jokeList.innerHTML = cardJoke;
}

const saveJoke = (id, joke) => {
  const found = jokes.find(j => j.id === id);
  if (!found) {
    jokes.push(joke);
  }
  localStorage.setItem('jokes', JSON.stringify(jokes));
  console.log('Todo el localStorage: ', localStorage.jokes);
}

jokeList.addEventListener('click', (event) => {
  if (!event.target.classList.contains('delete-btn')) return;

  const id = event.target.id

  const filtered = jokes.filter(j => j.id !== id);
  jokes = filtered;
  console.log('filtered', filtered)
  localStorage.setItem('jokes', JSON.stringify(jokes));
  renderJokes(jokes);
})

deleteAll.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})

fetchJoke.addEventListener('click', () => {
  getChuckNorrisJoke();
})

renderJokes(jokes)