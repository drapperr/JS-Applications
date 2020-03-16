function attachEvents() {
    const loadBtn = document.querySelector('.load');
    const catches = document.querySelector('#catches');
    const anglerInput = document.querySelector('#addForm .angler');
    const weightInput = document.querySelector('#addForm .weight');
    const speciesInput = document.querySelector('#addForm .species');
    const locationInput = document.querySelector('#addForm .location');
    const baitInput = document.querySelector('#addForm .bait');
    const captureTimeInput = document.querySelector('#addForm .captureTime');
    const addBtn = document.querySelector('#addForm .add');

    loadBtn.addEventListener('click', loadData);
    addBtn.addEventListener('click', addData);

    function loadData() {
        catches.innerHTML = '';
        fetch('https://fisher-game.firebaseio.com/catches.json')
            .then(x => x.json())
            .then(x => {
                Object.entries(x).forEach(([id, c]) => {
                    let newCatch = generateNewCatch(c.angler, c.weight, c.species, c.location, c.bait, c.captureTime);
                    addCatch(id, newCatch);
                });
            })
    }

    async function addData() {
        let newCatch = generateNewCatch(
            anglerInput.value, weightInput.value, speciesInput.value, locationInput.value, baitInput.value, captureTimeInput.value);
        let request = await fetch('https://fisher-game.firebaseio.com/catches.json', {
            method: 'POST',
            body: JSON.stringify(newCatch)
        })
        let data = await request.json();
        let id = data.name;

        addCatch(id, newCatch);
    }

    function updateCatch(e) {
        let angler = e.target.parentNode.querySelector('.angler').value;
        let weight = e.target.parentNode.querySelector('.weight').value;
        let species = e.target.parentNode.querySelector('.species').value;
        let location = e.target.parentNode.querySelector('.location').value;
        let bait = e.target.parentNode.querySelector('.bait').value;
        let capture = e.target.parentNode.querySelector('.captureTime').value;

        let updatedCatch = generateNewCatch(angler, weight, species, location, bait, capture);
        let id = e.target.parentNode.getAttribute('data-id');

        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedCatch)
        });
    }

    function deleteCatch(e) {
        let id = e.target.parentNode.getAttribute('data-id');
        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
            method: 'DELETE'
        });
        e.target.parentNode.remove();
    }

    function generateNewCatch(angler, weight, species, location, bait, captureTime) {
        return {
            angler, weight, species, location, bait, captureTime
        }
    }

    function addCatch(id, myCatch) {
        let newCatch = createNewElement('div', null, 'catch', null, id);

        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Angler'));
        newCatch.appendChild(createNewElement('input', 'text', 'angler', myCatch.angler));
        newCatch.appendChild(document.createElement('hr'));
        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Weight'));
        newCatch.appendChild(createNewElement('input', 'number', 'weight', myCatch.weight));
        newCatch.appendChild(document.createElement('hr'));
        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Species'));
        newCatch.appendChild(createNewElement('input', 'text', 'species', myCatch.species));
        newCatch.appendChild(document.createElement('hr'));
        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Location'));
        newCatch.appendChild(createNewElement('input', 'text', 'location', myCatch.location));
        newCatch.appendChild(document.createElement('hr'));
        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Bait'));
        newCatch.appendChild(createNewElement('input', 'text', 'bait', myCatch.bait));
        newCatch.appendChild(document.createElement('hr'));
        newCatch.appendChild(createNewElement('label', null, null, null, null, 'Capture Time'));
        newCatch.appendChild(createNewElement('input', 'number', 'captureTime', myCatch.captureTime));
        newCatch.appendChild(document.createElement('hr'));

        let updateBtn = createNewElement('button', null, 'update', null, null, 'Update');
        updateBtn.addEventListener('click', updateCatch);
        let deletBtn = createNewElement('button', null, 'delete', null, null, 'Delete');
        deletBtn.addEventListener('click', deleteCatch);

        newCatch.appendChild(updateBtn);
        newCatch.appendChild(deletBtn);

        catches.appendChild(newCatch);
    }

    function createNewElement(name, type, clas, value, dataId, content) {
        let newElement = document.createElement(name);

        if (type) {
            newElement.type = type;
        }
        if (clas) {
            newElement.classList.add(clas);
        }
        if (dataId) {
            newElement.setAttribute('data-id', dataId);
        }
        if (value) {
            newElement.value = value;
        }
        if (content) {
            newElement.textContent = content;
        }
        return newElement;
    }
}
attachEvents();

