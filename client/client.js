console.log("hello");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const prayersElement = document.querySelector('.prayers');
const API_URL = 'http://localhost:5500/prayers';

loadingElement.style.display = '';

listAllPrayers();


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('prayer');

  const prayer = {
    name,
    content
  };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(prayer),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(createdPrayer => {
      form.reset();
      form.style.display = '';
      listAllPrayers();
    });
});

function listAllPrayers() {
  prayersElement.innerHTML = '';
  fetch(API_URL)
    .then(response => response.json())
    .then(prayers => {
      prayers.reverse();
      prayers.forEach(prayer => {
        const div = document.createElement('div');

        const header = document.createElement('h4');
        header.textContent = prayer.name;

        const contents = document.createElement('p');
        contents.textContent = prayer.content;

        const date = document.createElement('small');
        date.textContent = new Date(prayer.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        prayersElement.appendChild(div);
      });
      loadingElement.style.display = "none"
    });
}